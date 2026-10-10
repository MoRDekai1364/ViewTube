/**
 * ============================================================================
 *  YouTube Subtitle Pro v3.1.1
 *  Copyright (c) VoidKSA. All rights reserved.
 *  Website: https://extractly.vip/
 * ============================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    const versionTag = document.querySelector('.version-tag');
    if (versionTag && chrome.runtime && chrome.runtime.getManifest) {
        versionTag.textContent = `v${chrome.runtime.getManifest().version}`;
    }
    convertSliderValuesToInputs();
    applyTranslations('en');
    loadSettings();
    loadCustomTemplates();
    wireSupportTracking();
});

// v3.0 — Convert each <span class="slider-value"> into an editable <input type="number">
// that's bidirectionally bound to its sibling range slider, with min/max clamping.
function convertSliderValuesToInputs() {
    document.querySelectorAll('.slider-value').forEach(span => {
        if (span.tagName === 'INPUT') return;
        const wrap = span.parentElement;
        const range = wrap && wrap.querySelector('input[type="range"]');
        if (!range) return;

        const input = document.createElement('input');
        input.type = 'number';
        input.className = span.className;
        input.id = span.id;
        if (range.min !== '') input.min = range.min;
        if (range.max !== '') input.max = range.max;
        input.step = range.step || '1';
        input.value = span.textContent.trim() || range.value;
        input.setAttribute('aria-label', range.id || 'value');

        span.replaceWith(input);

        const isFloat = input.step && String(input.step).includes('.');
        const fmt = (raw) => {
            const n = parseFloat(raw);
            if (isNaN(n)) return '';
            return isFloat ? String(parseFloat(n.toFixed(2))) : String(Math.round(n));
        };

        // Slider → input (just mirror)
        const sliderToInput = () => { input.value = fmt(range.value); };
        range.addEventListener('input', sliderToInput);
        range.addEventListener('change', sliderToInput);

        // Input → slider (clamp + dispatch)
        const inputToSlider = (commit = false) => {
            const raw = input.value.trim();
            if (raw === '' || raw === '-') return;
            let v = parseFloat(raw);
            if (isNaN(v)) {
                input.value = fmt(range.value);
                return;
            }
            const min = parseFloat(range.min);
            const max = parseFloat(range.max);
            if (!isNaN(min) && v < min) v = min;
            if (!isNaN(max) && v > max) v = max;
            if (commit) input.value = fmt(v);
            if (String(range.value) !== String(v)) {
                range.value = v;
                range.dispatchEvent(new Event('input', { bubbles: true }));
            }
        };
        input.addEventListener('input', () => inputToSlider(false));
        input.addEventListener('change', () => inputToSlider(true));
        input.addEventListener('blur', () => inputToSlider(true));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                inputToSlider(true);
                input.blur();
            }
        });
    });
}

let currentLang = 'en';
let currentSurface = 'video';

// Defaults — version 3.1.1
const defaultAr = {
    fontSize: 26, fontColor: '#f5f3ea', fontFamily: "'YouTube Noto', Roboto, Arial, sans-serif",
    shadowIntensity: 5, fontWeight: 600, bottomPos: 10,
    bgColor: '#000000', bgOpacity: 0, bgBlur: 0,
    strokeColor: '#000000', strokeWidth: 1, strokeOpacity: 90, lineHeight: 1.32, letterSpacing: 0,
    padding: 4, borderRadius: 3,
    textOpacity: 100, dyslexiaMode: false, allowNativeCaptionDrag: true,
    selectedPreset: null, customFont: null
};
const defaultEn = {
    fontSize: 22, fontColor: '#f5f3ea', fontFamily: "'YouTube Noto', Roboto, Arial, sans-serif",
    shadowIntensity: 5, fontWeight: 600, bottomPos: 10,
    bgColor: '#000000', bgOpacity: 0, bgBlur: 0,
    strokeColor: '#000000', strokeWidth: 1, strokeOpacity: 90, lineHeight: 1.3, letterSpacing: 0,
    padding: 4, borderRadius: 3,
    textOpacity: 100, dyslexiaMode: false, allowNativeCaptionDrag: true,
    selectedPreset: null, customFont: null
};

const SURFACE_STYLE_KEYS = [
    'fontSize', 'fontColor', 'fontFamily', 'shadowIntensity', 'fontWeight', 'bottomPos',
    'bgColor', 'bgOpacity', 'bgBlur', 'strokeColor', 'strokeWidth', 'strokeOpacity',
    'lineHeight', 'letterSpacing', 'padding', 'borderRadius', 'textOpacity',
    'dyslexiaMode', 'allowNativeCaptionDrag', 'selectedPreset', 'customFont'
];

function pickSurfaceStyle(settings) {
    const picked = {};
    SURFACE_STYLE_KEYS.forEach(key => {
        if (settings && settings[key] !== undefined) {
            picked[key] = key === 'customFont' && settings[key] ? { ...settings[key] } : settings[key];
        }
    });
    return picked;
}

let cachedSettings = {
    ar: { ...defaultAr },
    en: { ...defaultEn },
    shortsAr: pickSurfaceStyle(defaultAr),
    shortsEn: pickSurfaceStyle(defaultEn)
};

function getProfileKey(surface = currentSurface, lang = currentLang) {
    if (surface === 'shorts') return lang === 'ar' ? 'shortsAr' : 'shortsEn';
    return lang === 'ar' ? 'ar' : 'en';
}

function getProfileSettings(surface = currentSurface, lang = currentLang) {
    const baseKey = lang === 'ar' ? 'ar' : 'en';
    if (surface !== 'shorts') return cachedSettings[baseKey];
    return { ...cachedSettings[baseKey], ...(cachedSettings[getProfileKey(surface, lang)] || {}) };
}

function removeDeprecatedTextAlignment(settings) {
    if (!settings || !Object.prototype.hasOwnProperty.call(settings, 'textAlign')) return false;
    delete settings.textAlign;
    return true;
}

function removeDeprecatedTextAlignmentFromTemplates(templates) {
    if (!Array.isArray(templates)) return false;
    let changed = false;
    templates.forEach(template => {
        if (!template || typeof template !== 'object') return;
        ['ar', 'en'].forEach(langKey => {
            if (removeDeprecatedTextAlignment(template[langKey])) changed = true;
        });
    });
    return changed;
}

const langSwitcher = document.getElementById('langSwitcher');
const langOptions = document.querySelectorAll('.lang-btn');
const surfaceOptions = document.querySelectorAll('.surface-btn');
const previewText = document.getElementById('previewText');

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

const inputs = {
    fontSize: document.getElementById('fontSize'),
    fontColor: document.getElementById('fontColor'),
    bgColor: document.getElementById('bgColor'),
    fontFamily: document.getElementById('fontFamily'),
    shadowIntensity: document.getElementById('shadowIntensity'),
    fontWeight: document.getElementById('fontWeight'),
    bottomPos: document.getElementById('bottomPos'),
    bgOpacity: document.getElementById('bgOpacity'),
    strokeColor: document.getElementById('strokeColor'),
    strokeWidth: document.getElementById('strokeWidth'),
    lineHeight: document.getElementById('lineHeight'),
    letterSpacing: document.getElementById('letterSpacing'),
    padding: document.getElementById('padding'),
    borderRadius: document.getElementById('borderRadius'),
    textOpacity: document.getElementById('textOpacity'),
    dyslexiaMode: document.getElementById('dyslexiaMode'),
};

// Map slider id → value-display id (only sliders with tooltips)
const sliderValueIds = {
    fontSize: 'fontSizeValue',
    bottomPos: 'bottomPosValue',
    shadowIntensity: 'shadowIntensityValue',
    bgOpacity: 'bgOpacityValue',
    strokeWidth: 'strokeWidthValue',
    lineHeight: 'lineHeightValue',
    letterSpacing: 'letterSpacingValue',
    padding: 'paddingValue',
    borderRadius: 'borderRadiusValue',
    textOpacity: 'textOpacityValue'
};

function clearActivePresets() {
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
}

function updateSliderValueDisplay(key, value) {
    const id = sliderValueIds[key];
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    // After conversion, the element is an <input type="number">; before, it was a <span>.
    if ('value' in el && el.tagName === 'INPUT') {
        el.value = value;
    } else {
        el.textContent = value;
    }
}

// ===== Tabs =====
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ===== Language toggle =====
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        const selectedLang = option.dataset.lang;
        currentLang = selectedLang;
        updateUIValues(currentLang);
        updatePreview();

        document.documentElement.setAttribute('dir', selectedLang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', selectedLang);
        applyTranslations(selectedLang);

        previewText.textContent = selectedLang === 'ar' ? 'نص تجريبي' : 'Preview Text';
        previewText.style.direction = selectedLang === 'ar' ? 'rtl' : 'ltr';

        chrome.storage.local.set({ uiLanguage: selectedLang });
        loadCustomTemplates();
    });
});

function setCurrentSurface(surface) {
    currentSurface = surface === 'shorts' ? 'shorts' : 'video';
    surfaceOptions.forEach(option => {
        const active = option.dataset.surface === currentSurface;
        option.classList.toggle('active', active);
        option.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    clearActivePresets();
    updateUIValues(currentLang);
    updatePreview();
    loadCustomTemplates();
}

surfaceOptions.forEach(option => {
    option.addEventListener('click', () => setCurrentSurface(option.dataset.surface));
});

function loadSettings() {
    chrome.storage.local.get(['ar', 'en', 'shortsAr', 'shortsEn', 'uiLanguage', 'fullscreenAssistant'], (result) => {
        const cleanedProfiles = {};
        if (result.ar) {
            cachedSettings.ar = { ...defaultAr, ...result.ar };
            if (removeDeprecatedTextAlignment(cachedSettings.ar)) cleanedProfiles.ar = cachedSettings.ar;
        }
        if (result.en) {
            cachedSettings.en = { ...defaultEn, ...result.en };
            if (removeDeprecatedTextAlignment(cachedSettings.en)) cleanedProfiles.en = cachedSettings.en;
        }
        [
            { key: 'shortsAr', lang: 'ar' },
            { key: 'shortsEn', lang: 'en' }
        ].forEach(({ key, lang }) => {
            const inheritedStyle = pickSurfaceStyle(cachedSettings[lang]);
            const storedStyle = result[key] ? pickSurfaceStyle(result[key]) : null;
            cachedSettings[key] = { ...inheritedStyle, ...(storedStyle || {}) };
            if (!storedStyle || Object.keys(inheritedStyle).some(field => storedStyle[field] === undefined)) {
                cleanedProfiles[key] = cachedSettings[key];
            }
        });
        if (Object.keys(cleanedProfiles).length) chrome.storage.local.set(cleanedProfiles);

        if (result.uiLanguage) {
            currentLang = result.uiLanguage;
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            const savedOption = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
            if (savedOption) savedOption.classList.add('active');

            updateUIValues(currentLang);
            updatePreview();

            document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
            document.documentElement.setAttribute('lang', currentLang);
            applyTranslations(currentLang);

            previewText.textContent = currentLang === 'ar' ? 'نص تجريبي' : 'Preview Text';
            previewText.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
        } else {
            applyTranslations('en');
            updateUIValues('en');
            updatePreview();
        }


        if (fullscreenAssistantToggle) {
            const val = result.fullscreenAssistant === undefined ? true : !!result.fullscreenAssistant;
            fullscreenAssistantToggle.checked = val;
        }
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeUrl = tabs[0] && tabs[0].url ? tabs[0].url : '';
            setCurrentSurface(/youtube\.com\/shorts\//i.test(activeUrl) ? 'shorts' : 'video');
        });
    });
}

function updateUIValues(lang) {
    const settings = getProfileSettings(currentSurface, lang);
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (!input) return;
        const value = settings[key];
        if (value === undefined) return;

        if (input.type === 'checkbox') {
            input.checked = !!value;
        } else {
            input.value = value;
        }
        updateSliderValueDisplay(key, value);
    });
}

function saveSetting(key, value) {
    clearActivePresets();

    const profileKey = getProfileKey(currentSurface, currentLang);
    cachedSettings[profileKey] = {
        ...(cachedSettings[profileKey] || {}),
        [key]: value,
        selectedPreset: null
    };
    updateSliderValueDisplay(key, value);

    chrome.storage.local.set({ [profileKey]: cachedSettings[profileKey] });
    updatePreview();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateSettings",
                settings: cachedSettings
            }).catch(() => {});
        }
    });
}

function updatePreview() {
    const s = getProfileSettings(currentSurface, currentLang);

    let fontFamily = s.fontFamily.replace(/'/g, "");
    if (s.dyslexiaMode) {
        fontFamily = "'Comic Sans MS', 'Comic Neue', Verdana, Arial, sans-serif";
    }
    previewText.style.fontFamily = fontFamily;
    previewText.style.fontSize = (s.fontSize * 0.7) + "px";
    previewText.style.color = s.fontColor;
    previewText.style.fontWeight = s.fontWeight;
    previewText.style.lineHeight = s.lineHeight;
    previewText.style.letterSpacing = s.letterSpacing + "px";
    previewText.style.opacity = (s.textOpacity || 100) / 100;

    if (currentLang === 'ar') {
        previewText.style.wordSpacing = s.letterSpacing + "px";
        previewText.style.fontVariantLigatures = "none";
        previewText.style.fontFeatureSettings = '"liga" 0';
    } else {
        previewText.style.wordSpacing = "normal";
        previewText.style.fontVariantLigatures = "normal";
        previewText.style.fontFeatureSettings = "normal";
    }

    previewText.style.padding = (s.padding * 0.6) + "px";
    previewText.style.borderRadius = s.borderRadius + "px";
    previewText.style.textAlign = 'center';
    previewText.style.webkitTextStroke = `${s.strokeWidth}px ${s.strokeColor}`;
    previewText.style.paintOrder = 'stroke fill';

    const shadow = s.shadowIntensity;
    previewText.style.textShadow = `2px 2px ${shadow}px rgba(0,0,0,0.8)`;

    // Background color uses bgColor + bgOpacity (presets like News set red bg, Vlog white, etc.)
    const bgColor = s.bgColor || '#000000';
    const bgR = parseInt(bgColor.slice(1, 3), 16);
    const bgG = parseInt(bgColor.slice(3, 5), 16);
    const bgB = parseInt(bgColor.slice(5, 7), 16);
    const opacity = (s.bgOpacity || 0) / 100;
    previewText.style.backgroundColor = `rgba(${bgR}, ${bgG}, ${bgB}, ${opacity})`;
}

// ===== Input listeners =====
Object.keys(inputs).forEach(key => {
    const input = inputs[key];
    if (!input) return;
    const evt = (input.type === 'checkbox' || input.tagName === 'SELECT') ? 'change' : 'input';
    input.addEventListener(evt, (e) => {
        let value = e.target.value;
        if (input.type === 'checkbox') {
            value = e.target.checked;
        } else if (e.target.type === 'range') {
            if (e.target.step && e.target.step !== '1') {
                value = parseFloat(value);
            } else {
                value = parseInt(value);
            }
        }
        saveSetting(key, value);
    });
});
// ===== Reset =====
document.getElementById('resetBtn').addEventListener('click', () => {
    if (!confirm(currentLang === 'ar' ? 'استعادة الإعدادات الافتراضية؟' : 'Reset to defaults?')) return;
    clearActivePresets();
    const defaults = currentLang === 'ar' ? defaultAr : defaultEn;
    const profileKey = getProfileKey(currentSurface, currentLang);
    cachedSettings[profileKey] = currentSurface === 'shorts'
        ? pickSurfaceStyle(defaults)
        : { ...(cachedSettings[profileKey] || {}), ...pickSurfaceStyle(defaults) };
    chrome.storage.local.set({ [profileKey]: cachedSettings[profileKey] });
    updateUIValues(currentLang);
    updatePreview();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateSettings",
                settings: cachedSettings
            }).catch(() => {});
        }
    });
});

// ===== Translations =====
function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key, lang);
        // For elements that have children (like the toggle-label with hint), only replace the leading text node
        const firstChild = el.firstChild;
        if (firstChild && firstChild.nodeType === Node.TEXT_NODE && el.children.length > 0) {
            firstChild.textContent = translated + ' ';
        } else {
            el.textContent = translated;
        }
    });

    const tmplInput = document.getElementById('templateNameInput');
    if (tmplInput) {
        tmplInput.placeholder = lang === 'ar' ? 'اسم القالب' : 'Template Name';
    }

    const supportBtn = document.getElementById('supportBtn');
    if (supportBtn) {
        supportBtn.href = lang === 'ar'
            ? 'https://creators.sa/ar/voidksa'
            : 'https://creators.sa/en/voidksa';
    }

    renderPreferredSubtitleLanguageOptions();
}

// ===== Presets — match the visual tile previews EXACTLY =====
const presetDefinitions = {
    cinema:      { bgColor: '#000000', bgOpacity: 24, fontColor: '#f5f3ea', strokeColor: '#000000', strokeWidth: 1, shadowIntensity: 5, fontWeight: 600, padding: 4,  borderRadius: 3, lineHeight: 1.32, letterSpacing: 0, textOpacity: 100, strokeOpacity: 90 },
    minimal:     { bgColor: '#000000', bgOpacity: 0,  fontColor: '#ffffff', strokeColor: '#000000', strokeWidth: 0, shadowIntensity: 0, fontWeight: 400, padding: 6,  borderRadius: 0, lineHeight: 1.2,  letterSpacing: 0, textOpacity: 100 },
    contrast:    { bgColor: '#000000', bgOpacity: 32,  fontColor: '#f5f3ea', strokeColor: '#000000', strokeWidth: 1, shadowIntensity: 5, fontWeight: 600, padding: 4,  borderRadius: 3, lineHeight: 1.32, letterSpacing: 0, textOpacity: 100, strokeOpacity: 90 },
    anime:       { bgColor: '#7e2d8a', bgOpacity: 75, fontColor: '#fff7d6', strokeColor: '#5e1a8a', strokeWidth: 2, shadowIntensity: 8, fontWeight: 800, padding: 8,  borderRadius: 12, lineHeight: 1.25, letterSpacing: 0.5, textOpacity: 100 },
    documentary: { bgColor: '#141420', bgOpacity: 90, fontColor: '#f0e6d2', strokeColor: '#000000', strokeWidth: 0, shadowIntensity: 4, fontWeight: 500, padding: 12, borderRadius: 0, lineHeight: 1.4,  letterSpacing: 0.2, textOpacity: 100 },
    news:        { bgColor: '#c8202a', bgOpacity: 100, fontColor: '#ffffff', strokeColor: '#000000', strokeWidth: 0, shadowIntensity: 0, fontWeight: 900, padding: 14, borderRadius: 0, lineHeight: 1.3,  letterSpacing: 0.5, textOpacity: 100 },
    gaming:      { bgColor: '#000000', bgOpacity: 85, fontColor: '#00ff88', strokeColor: '#000000', strokeWidth: 0, shadowIntensity: 8, fontWeight: 700, padding: 10, borderRadius: 6, lineHeight: 1.2,  letterSpacing: 0.3, textOpacity: 100 },
    asmr:        { bgColor: '#3c1e32', bgOpacity: 50, fontColor: '#ffd0e0', strokeColor: '#3a1838', strokeWidth: 0, shadowIntensity: 12, fontWeight: 300, padding: 14, borderRadius: 16, lineHeight: 1.5,  letterSpacing: 0.6, textOpacity: 100 },
    vlog:        { bgColor: '#ffffff', bgOpacity: 92, fontColor: '#0a0a14', strokeColor: '#ffffff', strokeWidth: 0, shadowIntensity: 4, fontWeight: 700, padding: 10, borderRadius: 8, lineHeight: 1.3,  letterSpacing: 0, textOpacity: 100 }
};

function applyPreset(name) {
    const preset = presetDefinitions[name];
    if (!preset) return;

    const profileKey = getProfileKey(currentSurface, currentLang);
    cachedSettings[profileKey] = {
        ...(cachedSettings[profileKey] || {}),
        ...preset,
        selectedPreset: name
    };
    chrome.storage.local.set({ [profileKey]: cachedSettings[profileKey] });
    updateUIValues(currentLang);
    updatePreview();

    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.querySelector(`.preset-card[data-preset="${name}"]`);
    if (activeCard) activeCard.classList.add('active');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateSettings",
                settings: cachedSettings
            }).catch(() => {});
        }
    });
}

document.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('data-preset');
        applyPreset(name);
    });
});

// ===== Export / Import =====
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const fullscreenAssistantToggle = document.getElementById('fullscreenAssistant');

if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        const data = {
            ar: cachedSettings.ar,
            en: cachedSettings.en,
            shortsAr: cachedSettings.shortsAr,
            shortsEn: cachedSettings.shortsEn,
            uiLanguage: currentLang,
            fullscreenAssistant: fullscreenAssistantToggle ? !!fullscreenAssistantToggle.checked : true,
            profileSchema: 2,
            version: chrome.runtime.getManifest().version
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'youtube-subtitle-pro-settings.json';
        a.click();
        URL.revokeObjectURL(url);
    });
}

if (importBtn && importFile) {
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result);
                if (parsed.ar && parsed.en) {
                    cachedSettings.ar = { ...defaultAr, ...parsed.ar };
                    cachedSettings.en = { ...defaultEn, ...parsed.en };
                    cachedSettings.shortsAr = {
                        ...pickSurfaceStyle(cachedSettings.ar),
                        ...pickSurfaceStyle(parsed.shortsAr || {})
                    };
                    cachedSettings.shortsEn = {
                        ...pickSurfaceStyle(cachedSettings.en),
                        ...pickSurfaceStyle(parsed.shortsEn || {})
                    };
                    removeDeprecatedTextAlignment(cachedSettings.ar);
                    removeDeprecatedTextAlignment(cachedSettings.en);
                    currentLang = parsed.uiLanguage === 'ar' || parsed.uiLanguage === 'en'
                        ? parsed.uiLanguage
                        : currentLang;
                    const storagePayload = {
                        ar: cachedSettings.ar,
                        en: cachedSettings.en,
                        shortsAr: cachedSettings.shortsAr,
                        shortsEn: cachedSettings.shortsEn,
                        uiLanguage: currentLang
                    };
                    if (parsed.fullscreenAssistant !== undefined) {
                        storagePayload.fullscreenAssistant = !!parsed.fullscreenAssistant;
                        if (fullscreenAssistantToggle) {
                            fullscreenAssistantToggle.checked = storagePayload.fullscreenAssistant;
                        }
                    }
                    chrome.storage.local.set(storagePayload);
                    updateUIValues(currentLang);
                    updatePreview();
                    const opt = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
                    if (opt) opt.click();
                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        if (tabs[0]?.id) {
                            chrome.tabs.sendMessage(tabs[0].id, {
                                action: "updateSettings",
                                settings: cachedSettings
                            }).catch(() => {});
                        }
                    });
                }
            } catch (err) {
                console.error('Invalid settings file', err);
            }
        };
        reader.readAsText(file);
    });
}

if (fullscreenAssistantToggle) {
    fullscreenAssistantToggle.addEventListener('change', (e) => {
        const enabled = !!e.target.checked;
        chrome.storage.local.set({ fullscreenAssistant: enabled });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleFullscreenAssistant" }).catch(() => {});
            }
        });
    });
}

// ===== Custom Templates =====
const saveTemplateBtn = document.getElementById('saveTemplateBtn');
const templateNameInput = document.getElementById('templateNameInput');
const customTemplatesList = document.getElementById('customTemplatesList');

function getCurrentSurfaceStylePair() {
    return {
        ar: pickSurfaceStyle(getProfileSettings(currentSurface, 'ar')),
        en: pickSurfaceStyle(getProfileSettings(currentSurface, 'en'))
    };
}

function applyTemplateToCurrentSurface(tmpl) {
    const payload = {};
    ['ar', 'en'].forEach(lang => {
        const profileKey = getProfileKey(currentSurface, lang);
        const defaults = lang === 'ar' ? defaultAr : defaultEn;
        const base = currentSurface === 'shorts'
            ? pickSurfaceStyle(defaults)
            : (cachedSettings[profileKey] || defaults);
        cachedSettings[profileKey] = {
            ...base,
            selectedPreset: null,
            ...pickSurfaceStyle(tmpl && tmpl[lang])
        };
        payload[profileKey] = cachedSettings[profileKey];
    });
    return payload;
}

function loadCustomTemplates() {
    chrome.storage.local.get(['customTemplates'], (result) => {
        const templates = result.customTemplates || [];
        if (removeDeprecatedTextAlignmentFromTemplates(templates)) {
            chrome.storage.local.set({ customTemplates: templates });
        }
        renderTemplates(templates);
    });
}

function renderTemplates(templates) {
    if (!customTemplatesList) return;
    customTemplatesList.innerHTML = '';

    if (templates.length === 0) {
        const empty = document.createElement('div');
        empty.style.cssText = 'text-align:center; color:var(--text-faint); font-size:12px; padding:14px 0;';
        empty.textContent = currentLang === 'ar' ? 'لا توجد قوالب محفوظة' : 'No saved templates';
        customTemplatesList.appendChild(empty);
        return;
    }

    templates.forEach((tmpl, index) => {
        const div = document.createElement('div');
        div.className = 'template-item';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = tmpl.name;
        nameSpan.className = 'template-name';
        nameSpan.addEventListener('click', () => applyCustomTemplate(tmpl));

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'template-delete';
        deleteBtn.title = currentLang === 'ar' ? 'حذف' : 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTemplate(index);
        });

        div.appendChild(nameSpan);
        div.appendChild(deleteBtn);
        customTemplatesList.appendChild(div);
    });
}

function saveCustomTemplate() {
    const name = templateNameInput.value.trim() || (currentLang === 'ar' ? 'قالب مخصص' : 'Custom Template');

    chrome.storage.local.get(['customTemplates'], (result) => {
        const templates = result.customTemplates || [];
        removeDeprecatedTextAlignmentFromTemplates(templates);
        templates.push({
            name: name,
            ...getCurrentSurfaceStylePair()
        });

        chrome.storage.local.set({ customTemplates: templates }, () => {
            renderTemplates(templates);
            templateNameInput.value = '';
        });
    });
}

function deleteTemplate(index) {
    chrome.storage.local.get(['customTemplates'], (result) => {
        const templates = result.customTemplates || [];
        if (index >= 0 && index < templates.length) {
            templates.splice(index, 1);
            chrome.storage.local.set({ customTemplates: templates }, () => {
                renderTemplates(templates);
            });
        }
    });
}

function applyCustomTemplate(tmpl) {
    clearActivePresets();
    const storagePayload = applyTemplateToCurrentSurface(tmpl);
    chrome.storage.local.set(storagePayload);
    updateUIValues(currentLang);
    updatePreview();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateSettings",
                settings: cachedSettings
            }).catch(() => {});
            chrome.tabs.sendMessage(tabs[0].id, { action: "updateTemplates" }).catch(() => {});
        }
    });
}

if (saveTemplateBtn) {
    saveTemplateBtn.addEventListener('click', saveCustomTemplate);
}

// ===== Share button =====
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const url = 'https://chromewebstore.google.com/detail/youtube-subtitle-pro-cine/clhoadlllpmdeakgigbbbammfapclcfi';
        const shareData = {
            title: 'YouTube Subtitle Pro',
            text: currentLang === 'ar'
                ? 'إضافة رائعة لتخصيص ترجمات يوتيوب! جربها مجاناً.'
                : 'A great extension for customizing YouTube subtitles! Try it free.',
            url
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(url);
                shareBtn.title = currentLang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!';
                setTimeout(() => { shareBtn.title = 'Share'; }, 2000);
            }
        } catch (err) {
            // User cancelled — silent
        }
    });
}

// ===== Support tracking (silent — no spammy popups) =====
function wireSupportTracking() {
    const supportBtn = document.getElementById('supportBtn');
    if (!supportBtn) return;
    supportBtn.addEventListener('click', () => {
        chrome.storage.local.set({ supportClickedAt: Date.now() });
    });
}
