/**
 * ============================================================================
 *  YouTube Subtitle Pro
 *  Copyright (c) VoidKSA. All rights reserved.
 * ============================================================================
 *
 *  Website: https://extractly.vip/
 *
 * ============================================================================
 *  LEGAL NOTICE:
 *  This code is the intellectual property of VoidKSA.
 *  It is strictly PROHIBITED to remove, modify, or hide this copyright header.
 *  Redistribution or commercial use without permission is not allowed.
 * ============================================================================
 */
const YSP_RUNTIME_ACTIONS = new Set(['togglePanel', 'fontSizeUp', 'fontSizeDown']);

function dispatchYspRuntimeAction(action) {
    if (action === 'togglePanel') togglePanel();
    if (action === 'fontSizeUp') changeFontSize(2);
    if (action === 'fontSizeDown') changeFontSize(-2);
}

function handleYspRuntimeMessage(message, _sender, sendResponse) {
    const action = message && message.action;
    const accepted = YSP_RUNTIME_ACTIONS.has(action);

    if (accepted) dispatchYspRuntimeAction(action);

    if (typeof sendResponse === 'function') {
        try {
            sendResponse({
                yspContentScript: true,
                accepted,
                ready: true
            });
        } catch (_) { }
    }
    return false;
}

safeAddRuntimeMessageListener(handleYspRuntimeMessage);

const translations = {
    ar: {
        typography: "الخط والنصوص",
        appearance: "المظهر والألوان",
        position: "الموضع",
        advanced: "متقدم",
        fontSize: "حجم الخط",
        fontColor: "لون النص",
        bgColor: "لون خلفية النص",
        fontFamily: "نوع الخط",
        shadowIntensity: "قوة الظل",
        fontWeight: "سماكة الخط",
        bottomPos: "الارتفاع",
        textOpacity: "شفافية النص",
        dyslexiaMode: "وضع القراءة المريحة",
        dyslexiaHint: "يستخدم خطاً وتباعداً أوضح لتسهيل القراءة.",
        allowNativeCaptionDrag: "سماح بسحب يوتيوب الأصلي",
        allowNativeCaptionDragInfo: "يعمل تلقائياً مثل يوتيوب. أوقفه فقط إذا كنت لا تريد سحب الترجمة بالفأرة أو اللمس.",
        resetNativeCaptionPosition: "إرجاع مكان الترجمة",
        resetNativeCaptionPositionInfo: "يعيد الترجمة إلى الوسط والارتفاع المختار إذا علقت بعد السحب.",
        bgOpacity: "شفافية خلفية النص",
        strokeColor: "لون الحدود",
        strokeWidth: "سماكة الحدود",
        lineHeight: "تباعد الأسطر",
        letterSpacing: "تباعد الحروف",
        padding: "حواف داخلية",
        borderRadius: "انحناء الخلفية",
        presets: "القوالب السريعة",
        presetCinema: "سينمائي",
        presetMinimal: "بسيط",
        presetContrast: "وضوح عالي",
        presetAnime: "أنمي",
        presetDocumentary: "وثائقي",
        presetNews: "إخباري",
        presetGaming: "قيمنق",
        presetAsmr: "ASMR",
        presetVlog: "فلوق",
        export: "تصدير الإعدادات",
        import: "استيراد",
        reset: "استعادة الافتراضي",
        fullscreenOptions: "خيارات ملء الشاشة",
        fullscreenAssistant: "إظهار علامة التخصيص في ملء الشاشة",
        tabMain: "رئيسي",
        tabStyle: "المظهر",
        tabAdvanced: "متقدم",
        normal: "عادي",
        bold: "عريض",
        black: "عريض جداً",
        tajawal: "Tajawal (العربي الأفضل)",
        roboto: "Roboto (الافتراضي)",
        arial: "Arial",
        cinema: "Cinema Typewriter",
        ytFontProportionalSans: "خطوط Sans-Serif التناسبية (افتراضي يوتيوب)",
        ytFontMonospaceSans: "خطوط Sans-Serif أحادية المسافة",
        ytFontProportionalSerif: "خطوط Serif التناسبية",
        ytFontMonospaceSerif: "خطوط Serif أحادية المسافة",
        ytFontCasual: "عادية",
        ytFontCursive: "متصلة",
        ytFontSmallCaps: "أحرف استهلالية صغيرة",
        customTemplates: "القوالب الخاصة",
        templateName: "اسم القالب",
        saveTemplate: "حفظ القالب",
        deleteTemplate: "حذف",
        noTemplates: "لا توجد قوالب محفوظة",
        templateExists: "القالب موجود بالفعل. اضغط مجدداً للتحديث.",
        templateSaved: "تم حفظ القالب بنجاح!",
        updateTemplate: "تحديث القالب",
        applyTemplate: "تطبيق",
        actions: "إجراءات",
        strokeOpacity: "شفافية الحدود",
        bgBlur: "تمويه الخلفية",
        shortcutInfo: "اختصارات: Alt+S (الإعدادات) | Alt+↑/↓ (الحجم)",
        settingsSearchPlaceholder: "ابحث عن إعداد...",
        settingsSearchNoResults: "لا توجد نتائج مطابقة",
        settingsSearchHiddenExperimental: "تم إيقاف هذا الوضع التجريبي مؤقتاً لتحسين الثبات.",
        settingsSearchJumpHint: "اضغط للانتقال",
        editingTarget: "تعديل إعدادات:",
        targetAr: "الترجمة العربية",
        targetEn: "الترجمة الإنجليزية",
        editingSurface: "قالب العرض:",
        surfaceVideo: "الفيديوهات العادية",
        surfaceShorts: "الشورتس",
        panelTitle: "YouTube Subtitle Pro",
        closePanel: "إغلاق",
        supportBadge: "دعم اختياري",
        supportCardTitle: "تستخدم الإضافة باستمرار؟ ساعدنا نخليها مجانية",
        supportCardBody: "نختبرها ونصلحها مع كل تغيير من YouTube. حتى دعم بسيط يصنع فرقًا حقيقيًا.",
        supportUs: "ساهم في استمرارها",
        supportHint: "دعمك الاختياري يمول الاختبار والصيانة وإصلاح المشاكل.",
        supportPromptTitle: "الإضافة أفادتك؟ خلك جزء من استمرارها",
        supportPromptBody: "نطوّرها ونختبرها باستمرار. دعمك اختياري، لكنه يصنع فرقًا حقيقيًا.",
        supportPromptSupportBtn: "ساهم الآن",
        supportPromptLaterBtn: "لاحقاً",
        supportPromptNeverBtn: "لا تظهر مجدداً",
        extractlyProduct: "تابعة لـ Extractly.vip",
        extractlyVisit: "اكتشف Extractly",
        contactSupport: "واجهت مشكلة؟",
        contactEmail: "راسلنا على support@extractly.vip",
        assistantOpenTitle: "إعدادات Subtitle Pro",
        whatsNewTitle: "ما الجديد في التحديث؟",
        whatsNewClose: "إغلاق",
        whatsNewDontShow: "لا تظهر هذا التحديث مرة أخرى",
        rateUs: "قيم الإضافة",
        smartTiming: "توقيت ذكي (إخفاء المؤثرات والصمت)",
        smartTimingInfo: "يخفي سطور المؤثرات/الصمت مثل [موسيقى] و(تصفيق) والأسطر الفارغة تلقائياً.",
        playbackSpeed: "سرعة الفيديو",
        subDelay: "تأخير الترجمة (ثواني)",
        subDelayInfo: "يؤخر ظهور النص لإصلاح المشاكل عندما تسبق الترجمة الصوت.",
        uploadFont: "رفع خط مخصص (من جهازك)",
        uploadFontBtn: "اختر ملف الخط",
        fontUploaded: "تم رفع الخط بنجاح!",
        fontError: "خطأ في رفع الخط. تأكد من الصيغة (ttf, otf, woff).",
        playbackTiming: "التحكم والوقت",
        autoCaptions: "الترجمة التلقائية",
        blockingCleaning: "تنظيف الترجمة",
        customCaptions: "ترجمة مخصصة",
        autoCaptionMode: "طريقة عرض الترجمة التلقائية",
        autoCaptionModeInfo: "اختر كيف تظهر الترجمة التلقائية أثناء المشاهدة.",
        autoCaptionModeWord: "افتراضي يوتيوب",
        autoCaptionModePhrase: "جمل كاملة",
        autoCaptionModeTypewriter: "آلة كتابة",
        newBadge: "جديد",
        phraseMode: "وضع الجمل (للترجمة التلقائية)",
        phraseModeInfo: "يظهر الترجمة جملة كاملة بدلاً من كلمة كلمة، لقراءة أفضل.",
        phraseDelay: "مدة انتظار الجمل (ms)",
        phraseDelayInfo: "الوقت الذي تنتظره الإضافة قبل عرض الجملة الكاملة.",
        srtMode: "ترجمة SRT مخصصة",
        srtModeInfo: "عند التفعيل تستخدم الإضافة ملف SRT الذي رفعته بدلاً من الترجمة التلقائية.",
        srtUploadBtn: "رفع ملف SRT",
        srtClearBtn: "مسح الملف",
        srtNotLoaded: "لا يوجد ملف مرفوع",
        srtLoaded: "تم تحميل الملف:",
        srtError: "تعذر قراءة ملف SRT. تأكد من التنسيق.",
        customBlocking: "كلمات مخصصة للحجب",
        customBlockingInfo: "أضف كلماتك الخاصة للحجب (افصل بينها بفاصلة).",
        statsTitle: "إحصائيات الحجب",
        statsBlocked: "عدد الكلمات المحجوبة",
        statsShow: "عرض الإحصائيات",
        enhancedBlocking: "حجب محسن للكلمات المزعجة",
        enhancedBlockingInfo: "يحجب الرموز والأنماط المزعجة مثل << و♪ و(la la)، ويطبق كلماتك المخصصة للحجب.",
    },
    en: {
        typography: "Typography",
        appearance: "Appearance",
        position: "Position",
        advanced: "Advanced",
        fontSize: "Font Size",
        fontColor: "Text Color",
        bgColor: "Background Color",
        fontFamily: "Font Family",
        shadowIntensity: "Shadow Intensity",
        fontWeight: "Font Weight",
        bottomPos: "Subtitle Height",
        textOpacity: "Text Opacity",
        dyslexiaMode: "Dyslexia-friendly Mode",
        dyslexiaHint: "Uses a friendlier font and spacing for easier reading.",
        allowNativeCaptionDrag: "Allow YouTube native drag",
        allowNativeCaptionDragInfo: "Works automatically like YouTube. Turn it off only if you do not want captions to be draggable.",
        resetNativeCaptionPosition: "Reset caption position",
        resetNativeCaptionPositionInfo: "Returns captions to the centered default height if they get stuck after dragging.",
        bgOpacity: "Background Opacity",
        strokeColor: "Stroke Color",
        strokeWidth: "Stroke Width",
        lineHeight: "Line Height",
        letterSpacing: "Letter Spacing",
        padding: "Padding",
        borderRadius: "Border Radius",
        presets: "Quick Presets",
        presetCinema: "Cinema",
        presetMinimal: "Minimal",
        presetContrast: "High Readability",
        presetAnime: "Anime",
        presetDocumentary: "Documentary",
        presetNews: "News",
        presetGaming: "Gaming",
        presetAsmr: "ASMR",
        presetVlog: "Vlog",
        export: "Export Settings",
        import: "Import",
        reset: "Reset to Default",
        fullscreenOptions: "Fullscreen Options",
        fullscreenAssistant: "Show customization icon in fullscreen",
        tabMain: "Main",
        tabStyle: "Style",
        tabAdvanced: "Pro",
        normal: "Normal",
        bold: "Bold",
        black: "Black",
        tajawal: "Tajawal (Best for Arabic)",
        roboto: "Roboto (Default)",
        arial: "Arial",
        cinema: "Cinema Typewriter",
        ytFontProportionalSans: "Proportional Sans-Serif (YouTube default)",
        ytFontMonospaceSans: "Monospaced Sans-Serif",
        ytFontProportionalSerif: "Proportional Serif",
        ytFontMonospaceSerif: "Monospaced Serif",
        ytFontCasual: "Casual",
        ytFontCursive: "Cursive",
        ytFontSmallCaps: "Small Capitals",
        customTemplates: "Custom Templates",
        templateName: "Template Name",
        saveTemplate: "Save Template",
        deleteTemplate: "Delete",
        noTemplates: "No saved templates",
        templateExists: "Template exists. Click again to update.",
        templateSaved: "Template saved successfully!",
        updateTemplate: "Update Template",
        applyTemplate: "Apply",
        actions: "Actions",
        strokeOpacity: "Stroke Opacity",
        bgBlur: "Background Blur",
        shortcutInfo: "Shortcuts: Alt+S (Settings) | Alt+↑/↓ (Size)",
        settingsSearchPlaceholder: "Search settings...",
        settingsSearchNoResults: "No matching settings",
        settingsSearchHiddenExperimental: "This experimental mode is temporarily hidden for stability.",
        settingsSearchJumpHint: "Click to jump",
        editingTarget: "Editing Settings For:",
        targetAr: "Arabic Subtitles",
        targetEn: "English Subtitles",
        editingSurface: "Playback template:",
        surfaceVideo: "Regular videos",
        surfaceShorts: "Shorts",
        panelTitle: "YouTube Subtitle Pro",
        closePanel: "Close",
        supportBadge: "OPTIONAL SUPPORT",
        supportCardTitle: "Using Subtitle Pro often? Help keep it free",
        supportCardBody: "We test and repair it through every YouTube change. Even a small contribution makes a real difference.",
        supportUs: "Keep it going",
        supportHint: "Optional support funds testing, maintenance, and fixes.",
        supportPromptTitle: "Has Subtitle Pro helped you? Keep it going",
        supportPromptBody: "We keep testing and maintaining it. Support is optional, but it makes a real difference.",
        supportPromptSupportBtn: "Contribute now",
        supportPromptLaterBtn: "Later",
        supportPromptNeverBtn: "Don't show again",
        extractlyProduct: "An Extractly.vip product",
        extractlyVisit: "Discover Extractly",
        contactSupport: "Found a problem?",
        contactEmail: "Email support@extractly.vip",
        assistantOpenTitle: "Subtitle Pro settings",
        whatsNewTitle: "What's new?",
        whatsNewClose: "Close",
        whatsNewDontShow: "Don't show this update again",
        rateUs: "Rate Extension",
        smartTiming: "Smart Timing (Hide Effects & Silence)",
        smartTimingInfo: "Hides effect/silence lines like [Music], (Applause), and empty captions automatically.",
        playbackSpeed: "Playback Speed",
        subDelay: "Subtitle Delay (Seconds)",
        subDelayInfo: "Delays subtitle appearance to fix sync issues where text appears too early.",
        uploadFont: "Upload Custom Font (Local)",
        uploadFontBtn: "Choose Font File",
        fontUploaded: "Font uploaded successfully!",
        fontError: "Error uploading font. Check format (ttf, otf, woff).",
        playbackTiming: "Playback & Timing",
        autoCaptions: "Auto Captions",
        blockingCleaning: "Caption Cleanup",
        customCaptions: "Custom Captions",
        autoCaptionMode: "Auto captions display",
        autoCaptionModeInfo: "Choose how auto captions appear while watching.",
        autoCaptionModeWord: "YouTube default",
        autoCaptionModePhrase: "Complete phrases",
        autoCaptionModeTypewriter: "Typewriter",
        newBadge: "NEW",
        phraseMode: "Phrase Mode (Auto Captions)",
        phraseModeInfo: "Shows complete phrases instead of word-by-word for auto captions.",
        phraseDelay: "Phrase Delay (ms)",
        phraseDelayInfo: "Time to wait before displaying the complete phrase.",
        srtMode: "Custom SRT Captions",
        srtModeInfo: "When enabled, the extension uses your uploaded SRT instead of auto-captions.",
        srtUploadBtn: "Upload SRT",
        srtClearBtn: "Clear File",
        srtNotLoaded: "No file loaded",
        srtLoaded: "Loaded file:",
        srtError: "Unable to parse SRT file. Please check its format.",
        customBlocking: "Custom Blocking Words",
        customBlockingInfo: "Add your own words to block (separate with commas).",
        statsTitle: "Blocking Statistics",
        statsBlocked: "Blocked Words Count",
        statsShow: "Show Statistics",
        enhancedBlocking: "Enhanced Annoying Words Block",
        enhancedBlockingInfo: "Blocks symbols/patterns like <<, ♪, filler repeats (la/oh), and applies your custom blocked words.",
    },
};

const YOUTUBE_PROPORTIONAL_SANS_FONT = "'YouTube Noto', Roboto, Arial, Helvetica, sans-serif";
const YOUTUBE_SMALL_CAPS_FONT_VALUE = '__YSP_YOUTUBE_SMALL_CAPS__';
const LEGACY_AR_DEFAULT_FONT = "'Tajawal', sans-serif";
const DYSLEXIA_FONT_STACK = "'Comic Sans MS', 'Comic Neue', Verdana, Arial, sans-serif";
const ARABIC_DYSLEXIA_FONT_STACK = "'Tajawal', 'Comic Sans MS', 'Comic Neue', Verdana, Arial, sans-serif";
const ENGLISH_DYSLEXIA_FONT_STACK = DYSLEXIA_FONT_STACK;
const YOUTUBE_FONT_OPTIONS = {
    proportionalSans: YOUTUBE_PROPORTIONAL_SANS_FONT,
    monospaceSans: "'Roboto Mono', 'Courier New', Courier, monospace",
    proportionalSerif: "Georgia, 'Times New Roman', serif",
    monospaceSerif: "'Courier New', Courier, monospace",
    casual: "'Comic Sans MS', 'Comic Neue', cursive",
    cursive: "'Segoe Script', 'Comic Sans MS', cursive",
    smallCaps: YOUTUBE_SMALL_CAPS_FONT_VALUE
};

function getEffectiveSubtitleFontFamily(fontFamily, fallback = YOUTUBE_PROPORTIONAL_SANS_FONT) {
    if (!fontFamily) return fallback;
    return fontFamily === YOUTUBE_SMALL_CAPS_FONT_VALUE ? YOUTUBE_PROPORTIONAL_SANS_FONT : fontFamily;
}

function getSubtitleFontVariant(fontFamily) {
    return fontFamily === YOUTUBE_SMALL_CAPS_FONT_VALUE ? 'small-caps' : 'normal';
}

const defaultAr = { fontSize: 26, fontColor: '#f5f3ea', fontFamily: YOUTUBE_FONT_OPTIONS.proportionalSans, shadowIntensity: 5, fontWeight: 600, bottomPos: 10, bgColor: '#000000', bgOpacity: 0, bgBlur: 0, strokeColor: '#000000', strokeWidth: 1, strokeOpacity: 90, lineHeight: 1.32, letterSpacing: 0, padding: 4, borderRadius: 3, textOpacity: 100, allowNativeCaptionDrag: true, dyslexiaMode: false, smartTiming: false, subDelay: 0, customFont: null, phraseMode: false, autoCaptionMode: 'word', enhancedBlocking: true, phraseDelay: 800, customBlocking: "", statsBlocked: 0 };
const defaultEn = { fontSize: 22, fontColor: '#f5f3ea', fontFamily: YOUTUBE_FONT_OPTIONS.proportionalSans, shadowIntensity: 5, fontWeight: 600, bottomPos: 10, bgColor: '#000000', bgOpacity: 0, bgBlur: 0, strokeColor: '#000000', strokeWidth: 1, strokeOpacity: 90, lineHeight: 1.3, letterSpacing: 0, padding: 4, borderRadius: 3, textOpacity: 100, allowNativeCaptionDrag: true, dyslexiaMode: false, smartTiming: false, subDelay: 0, customFont: null, phraseMode: false, autoCaptionMode: 'word', enhancedBlocking: true, phraseDelay: 800, customBlocking: "", statsBlocked: 0 };

function disableExperimentalAutoCaptionModes(settings) {
    if (!settings) return false;
    const changed = settings.autoCaptionMode !== 'word' || settings.phraseMode !== false;
    settings.autoCaptionMode = 'word';
    settings.phraseMode = false;
    return changed;
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

function isLegacyCartoonContrastSettings(settings) {
    if (!settings) return false;
    const color = String(settings.fontColor || '').trim().toLowerCase();
    const bg = String(settings.bgColor || '#000000').trim().toLowerCase();
    const isOldYellow = color === '#ffff00' || color === '#ff0' || color === 'yellow';
    const isOldBlackBg = bg === '#000000' || bg === '#000' || bg === 'black';
    const looksLikeOldPreset =
        isOldYellow &&
        isOldBlackBg &&
        Number(settings.bgOpacity) >= 90 &&
        Number(settings.fontWeight) >= 850 &&
        Number(settings.padding) >= 10 &&
        Number(settings.borderRadius) >= 5;
    return looksLikeOldPreset && (settings.selectedPreset === 'contrast' || Number(settings.shadowIntensity || 0) === 0);
}

function sanitizeLegacyCartoonContrastSettings(settings) {
    if (!isLegacyCartoonContrastSettings(settings)) return false;
    Object.assign(settings, {
        bgColor: '#000000',
        bgOpacity: 32,
        fontColor: '#f5f3ea',
        strokeColor: '#000000',
        strokeWidth: 1,
        strokeOpacity: 90,
        shadowIntensity: 5,
        fontWeight: 600,
        padding: 4,
        borderRadius: 3,
        lineHeight: 1.32,
        letterSpacing: 0,
        bgBlur: 0,
        textOpacity: 100,
        selectedPreset: 'contrast'
    });
    return true;
}

const SURFACE_STYLE_KEYS = [
    'fontSize', 'fontColor', 'fontFamily', 'shadowIntensity', 'fontWeight', 'bottomPos',
    'bgColor', 'bgOpacity', 'bgBlur', 'strokeColor', 'strokeWidth', 'strokeOpacity',
    'lineHeight', 'letterSpacing', 'padding', 'borderRadius', 'textOpacity',
    'dyslexiaMode', 'allowNativeCaptionDrag', 'selectedPreset', 'customFont'
];
const SURFACE_STYLE_KEY_SET = new Set(SURFACE_STYLE_KEYS);

function pickSurfaceStyle(settings) {
    const picked = {};
    SURFACE_STYLE_KEYS.forEach(key => {
        if (settings && settings[key] !== undefined) {
            picked[key] = key === 'customFont' && settings[key]
                ? { ...settings[key] }
                : settings[key];
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

const EXTENSION_VERSION_FALLBACK = '3.1.1';
const SUBTITLE_PROFILE_KEYS = ['ar', 'en', 'shortsAr', 'shortsEn'];
const SUBTITLE_PROFILE_STORAGE_KEYS = [...SUBTITLE_PROFILE_KEYS];

function getSubtitleProfileKey(surface = 'video', lang = 'en') {
    const normalizedLang = lang === 'ar' ? 'ar' : 'en';
    return surface === 'shorts'
        ? (normalizedLang === 'ar' ? 'shortsAr' : 'shortsEn')
        : normalizedLang;
}

function getSubtitleProfileDefaults(profileKey) {
    const defaults = profileKey === 'ar' || profileKey === 'shortsAr' ? defaultAr : defaultEn;
    return profileKey === 'shortsAr' || profileKey === 'shortsEn' ? pickSurfaceStyle(defaults) : defaults;
}

function getCachedSubtitleSettings(surface = 'video', lang = 'en') {
    const key = getSubtitleProfileKey(surface, lang);
    if (surface !== 'shorts') return cachedSettings[key] || getSubtitleProfileDefaults(key);
    const base = cachedSettings[lang === 'ar' ? 'ar' : 'en'] || (lang === 'ar' ? defaultAr : defaultEn);
    return { ...base, ...(cachedSettings[key] || {}) };
}

function updateCachedSubtitleStyles() {
    updateSubtitleStyles(
        cachedSettings.ar,
        cachedSettings.en,
        getCachedSubtitleSettings('shorts', 'ar'),
        getCachedSubtitleSettings('shorts', 'en')
    );
}

const FIRST_PAINT_BOOTSTRAP_CLASS = 'ysp-caption-bootstrapping';
let firstPaintBootstrapTimer = null;
let uiLang = 'en';
let editTarget = 'en';
let editSurface = location.pathname.startsWith('/shorts/') ? 'shorts' : 'video';
function getEditedProfileKey() {
    return getSubtitleProfileKey(editSurface, editTarget);
}
function getEditedSettings() {
    return getCachedSubtitleSettings(editSurface, editTarget);
}
function getEditedStorageKey(settingKey) {
    if (editSurface === 'shorts' && SURFACE_STYLE_KEY_SET.has(settingKey)) {
        return getSubtitleProfileKey('shorts', editTarget);
    }
    return getSubtitleProfileKey('video', editTarget);
}
function setEditedSetting(settingKey, value) {
    const storageKey = getEditedStorageKey(settingKey);
    const defaults = getSubtitleProfileDefaults(storageKey);
    const current = cachedSettings[storageKey] || { ...defaults };
    cachedSettings[storageKey] = { ...current, [settingKey]: value };
    return storageKey;
}
function getSurfaceStylePair(surface = editSurface) {
    return {
        ar: pickSurfaceStyle(getCachedSubtitleSettings(surface, 'ar')),
        en: pickSurfaceStyle(getCachedSubtitleSettings(surface, 'en'))
    };
}
let showFullscreenAssistant = true;
let customTemplates = [];
let selectedTemplateName = null;
let panelVisible = false;
let customSrtEnabled = false;
let customSrtData = null;
let lastVideoKey = '';
let captionTrackRefreshTimer = null;
const CAPTION_LANGUAGE_PENDING_FAILSAFE_MS = 900;
let playerCaptionProfileMemory = new WeakMap();
const stableCaptionDragPositions = {
    video: { ar: null, en: null },
    shorts: { ar: null, en: null }
};
const SUBTITLE_FONT_STYLESHEET_URL = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Roboto:wght@400;500;700;900&family=Roboto+Mono:wght@400;500;700&family=Cairo:wght@400;600;700;900&family=Almarai:wght@300;400;700;800&family=Noto+Kufi+Arabic:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Montserrat:wght@400;600;700;900&family=Lato:wght@400;700;900&display=swap';
const loadedCustomSubtitleFonts = new Set();
const captionFontInlineSnapshots = new WeakMap();
const creatorCustomReflowSnapshots = new WeakMap();
const CREATOR_CUSTOM_FALLBACK_MEMORY_MS = 2500;
let creatorCustomTrackMemory = new WeakMap();
let creatorCustomFallbackMemory = new WeakMap();

const WHATSNEW_MIN_GAP_MS = 2000;

// v3.0 — Defensive guard against "Extension context invalidated" errors.
// When the extension is reloaded/updated, old content scripts on existing tabs
// keep running but lose access to chrome.* APIs. Without this guard, every
// chrome.runtime/storage/tabs call in our long-running observers and listeners
// throws and pollutes the user's console.
function isExtensionAlive() {
    try {
        return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id != null;
    } catch (e) {
        return false;
    }
}
function safeRuntimeCall(fn, fallback) {
    if (!isExtensionAlive()) return fallback;
    try { return fn(); } catch (e) {
        if (!String(e && e.message).includes('Extension context invalidated')) {
            console.warn('[YSP]', e);
        }
        return fallback;
    }
}

function safeGetExtensionURL(path) {
    return safeRuntimeCall(() => chrome.runtime.getURL(path), '');
}

function getStorageLocal() {
    if (!isExtensionAlive()) return null;
    try {
        return chrome && chrome.storage && chrome.storage.local ? chrome.storage.local : null;
    } catch (_) {
        return null;
    }
}

function safeStorageGet(keys, callback, fallback = {}) {
    const storage = getStorageLocal();
    if (!storage || typeof storage.get !== 'function') {
        if (typeof callback === 'function') callback(fallback);
        return false;
    }
    try {
        storage.get(keys, (res) => {
            let lastError = null;
            try { lastError = chrome.runtime && chrome.runtime.lastError; } catch (_) { lastError = null; }
            if (lastError) {
                if (typeof callback === 'function') callback(fallback);
                return;
            }
            if (typeof callback === 'function') callback(res || fallback);
        });
        return true;
    } catch (e) {
        if (!String(e && e.message).includes('Extension context invalidated')) console.warn('[YSP]', e);
        if (typeof callback === 'function') callback(fallback);
        return false;
    }
}

function safeStorageSet(values, callback) {
    const storage = getStorageLocal();
    if (!storage || typeof storage.set !== 'function') {
        if (typeof callback === 'function') callback();
        return false;
    }
    try {
        storage.set(values, () => {
            if (typeof callback === 'function') callback();
        });
        return true;
    } catch (e) {
        if (!String(e && e.message).includes('Extension context invalidated')) console.warn('[YSP]', e);
        if (typeof callback === 'function') callback();
        return false;
    }
}

function safeStorageRemove(keys, callback) {
    const storage = getStorageLocal();
    if (!storage || typeof storage.remove !== 'function') {
        if (typeof callback === 'function') callback();
        return false;
    }
    try {
        storage.remove(keys, () => {
            if (typeof callback === 'function') callback();
        });
        return true;
    } catch (e) {
        if (!String(e && e.message).includes('Extension context invalidated')) console.warn('[YSP]', e);
        if (typeof callback === 'function') callback();
        return false;
    }
}

function safeAddStorageChangeListener(listener) {
    if (!isExtensionAlive()) return false;
    try {
        if (!chrome.storage || !chrome.storage.onChanged || typeof chrome.storage.onChanged.addListener !== 'function') return false;
        chrome.storage.onChanged.addListener(listener);
        return true;
    } catch (e) {
        if (!String(e && e.message).includes('Extension context invalidated')) console.warn('[YSP]', e);
        return false;
    }
}

function safeAddRuntimeMessageListener(listener) {
    if (!isExtensionAlive()) return false;
    try {
        if (!chrome.runtime || !chrome.runtime.onMessage || typeof chrome.runtime.onMessage.addListener !== 'function') return false;
        chrome.runtime.onMessage.addListener(listener);
        return true;
    } catch (e) {
        if (!String(e && e.message).includes('Extension context invalidated')) console.warn('[YSP]', e);
        return false;
    }
}

function safeGetBrowserUiLanguage() {
    return safeRuntimeCall(() => chrome.i18n.getUILanguage(), (navigator.language || 'en'));
}

function getCurrentVideoKey() {
    try {
        const url = new URL(location.href);
        const watchId = url.searchParams.get('v');
        if (watchId) return `watch:${watchId}`;
        const shortsMatch = url.pathname.match(/^\/shorts\/([^/?#]+)/);
        if (shortsMatch) return `shorts:${shortsMatch[1]}`;
        return `${url.pathname}${url.search}`;
    } catch (_) {
        return location.href;
    }
}

function normalizeCaptionText(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
}

function countCaptionCharacters(text) {
    return Array.from(String(text || '')).length;
}

function findCinematicCaptionSplitIndex(text, options) {
    options = options || {};
    const clean = normalizeCaptionText(text);
    if (!clean) return -1;

    const isArabic = options.isArabic !== undefined ? !!options.isArabic : /[\u0600-\u06FF]/.test(clean);
    const maxLine = isArabic ? 30 : 38;
    const hardMaxLine = isArabic ? 34 : 42;
    const minLine = isArabic ? 10 : 12;
    const total = countCaptionCharacters(clean);
    if (total <= maxLine) return -1;

    const midpoint = Math.round(total / 2);
    const punctuationCandidates = [];
    const punctuationRe = /[،,؛;:؟?!…\.]\s+/gu;
    let match;
    while ((match = punctuationRe.exec(clean)) !== null) {
        const split = match.index + match[0].trimEnd().length;
        const left = countCaptionCharacters(clean.slice(0, split).trim());
        const right = countCaptionCharacters(clean.slice(split).trim());
        if (left >= minLine && right >= minLine && left <= hardMaxLine && right <= hardMaxLine) {
            punctuationCandidates.push({ split, score: Math.abs(left - midpoint) + Math.abs(right - midpoint) });
        }
    }
    if (punctuationCandidates.length) {
        punctuationCandidates.sort((a, b) => a.score - b.score);
        return punctuationCandidates[0].split;
    }

    const chars = Array.from(clean);
    let count = 0;
    let bestAcceptableSpace = -1;
    let bestAcceptableScore = Infinity;
    let firstAcceptableSpace = -1;
    for (let i = 0; i < clean.length; i++) {
        const ch = clean[i];
        count += Array.from(ch).length;
        if (/\s/u.test(ch)) {
            const left = countCaptionCharacters(clean.slice(0, i).trim());
            const right = countCaptionCharacters(clean.slice(i).trim());
            if (left >= minLine && right >= minLine && left <= hardMaxLine && right <= hardMaxLine) {
                const score = Math.abs(left - right);
                if (score < bestAcceptableScore) {
                    bestAcceptableScore = score;
                    bestAcceptableSpace = i;
                }
            }
            if (firstAcceptableSpace < 0 && count > maxLine && count <= hardMaxLine) firstAcceptableSpace = i;
        }
    }
    if (bestAcceptableSpace >= 0) return bestAcceptableSpace;
    if (firstAcceptableSpace >= 0) return firstAcceptableSpace;

    // Last resort: split near the visual midpoint, but only on a real space.
    let bestSpace = -1;
    let bestScore = Infinity;
    for (let i = 0; i < clean.length; i++) {
        if (!/\s/u.test(clean[i])) continue;
        const left = countCaptionCharacters(clean.slice(0, i).trim());
        const right = countCaptionCharacters(clean.slice(i).trim());
        if (left < minLine || right < minLine) continue;
        const score = Math.abs(left - right);
        if (score < bestScore) {
            bestScore = score;
            bestSpace = i;
        }
    }
    return bestSpace;
}

function stripDialogueCueMarker(text) {
    return normalizeCaptionText(text)
        .replace(/^[\-–—]+\s*/u, '')
        .replace(/\s*[\-–—]+$/u, '')
        .trim();
}

function formatDialogueCueCaptionText(text, options) {
    options = options || {};
    const clean = normalizeCaptionText(text).replace(/[–—]/g, '-');
    if (!clean || !/^\s*-\s*/u.test(clean)) return '';

    const body = clean.replace(/^\s*-\s*/u, '');
    const rawParts = body
        .split(/\s+-\s+(?=[\p{L}\p{N}\u0600-\u06FF])/u)
        .map(stripDialogueCueMarker)
        .filter(Boolean);

    if (rawParts.length < 2 || rawParts.length > 3) return '';

    const lines = rawParts.map((part, index) => {
        let line = part;
        const previous = index > 0 ? rawParts[index - 1] : '';
        const isLast = index === rawParts.length - 1;
        const previousEnded = /[.!?؟…]$/u.test(previous);
        const currentEnded = /[.!?؟…]$/u.test(line);
        if (options.isArabic && isLast && previousEnded && !currentEnded) {
            line += '.';
        }
        return `- ${line}`;
    });

    return lines.join('\n');
}

function formatCinematicCaptionText(text, options) {
    options = options || {};
    const dialogueCueText = formatDialogueCueCaptionText(text, options);
    if (dialogueCueText) return dialogueCueText;

    const clean = normalizeCaptionText(text);
    if (!clean) return '';
    if (String(text || '').includes('\n')) return String(text || '').split(/\n+/).map(line => normalizeCaptionText(line)).filter(Boolean).join('\n');

    const splitIndex = findCinematicCaptionSplitIndex(clean, options);
    if (splitIndex < 0) return clean;

    const firstLine = clean.slice(0, splitIndex).trim();
    const secondLine = clean.slice(splitIndex).trim();
    if (!firstLine || !secondLine) return clean;
    return `${firstLine}\n${secondLine}`;
}

function stripCaptionDirectionMarkers(text) {
    return String(text || '')
        .split(/\n+/)
        .map(line => normalizeCaptionText(line)
            .replace(/^(?:(?:<<|>>|[\u2190\u2192\u21D0\u21D2])\s*)+/u, '')
            .replace(/(?:\s*(?:<<|>>|[\u2190\u2192\u21D0\u21D2]))+$/u, '')
            .trim())
        .join('\n')
        .trim();
}

// YouTube builds live/automatic captions incrementally and often keeps the
// separator for the next word as trailing whitespace in the current text node.
// Never run normalizeCaptionText()/trim() against those host-owned nodes: doing
// so turns adjacent nodes such as "هذه " + "الجملة" into "هذهالجملة".
// This DOM-only cleaner removes boundary direction markers while preserving all
// other whitespace byte-for-byte.
function stripLiveCaptionDirectionMarkers(text) {
    const raw = String(text || '');
    if (!/(?:<<|>>|[\u2190\u2192\u21D0\u21D2])/u.test(raw)) return raw;

    return raw
        .replace(/^([^\S\r\n]*)(?:(?:<<|>>|[\u2190\u2192\u21D0\u21D2])[^\S\r\n]*)+/gmu, '$1')
        .replace(/(?:[^\S\r\n]*(?:<<|>>|[\u2190\u2192\u21D0\u21D2]))+([^\S\r\n]*)$/gmu, '$1');
}

function getCinematicCaptionLines(text) {
    return String(text || '')
        .split(/\n+/)
        .map(line => stripCaptionDirectionMarkers(line))
        .filter(Boolean);
}

function captionSegmentsNeedCinematicRender(segments, text) {
    const segmentList = Array.from(segments || []);
    const lines = getCinematicCaptionLines(text);
    if (lines.length <= 1 || !segmentList.length) return false;

    const first = segmentList[0];
    if (!first || !first.classList || !first.classList.contains('ysp-cinematic-multiline')) return true;

    const lineNodes = first.querySelectorAll ? Array.from(first.querySelectorAll(':scope > .ysp-caption-line')) : [];
    if (lineNodes.length !== lines.length) return true;
    const renderedLines = lineNodes.map(node => normalizeCaptionText(node.textContent || ''));
    if (!renderedLines.every((line, index) => line === lines[index])) return true;

    for (let i = 1; i < segmentList.length; i++) {
        const sibling = segmentList[i];
        const siblingText = normalizeCaptionText(sibling && sibling.textContent || '');
        if (siblingText) return true;
        if (sibling && sibling.classList && !sibling.classList.contains('ysp-empty-caption-segment')) return true;
    }

    return false;
}

function getCaptionNodePlainText(node) {
    if (!node) return '';
    if (node.classList && node.classList.contains('ysp-empty-caption-segment')) return '';
    if (node.classList && node.classList.contains('ysp-cinematic-multiline')) {
        const lineNodes = node.querySelectorAll ? Array.from(node.querySelectorAll(':scope > .ysp-caption-line')) : [];
        if (lineNodes.length) return lineNodes.map(line => stripCaptionDirectionMarkers(line.textContent || '')).filter(Boolean).join('\n');
    }
    return stripCaptionDirectionMarkers(node.textContent || '');
}

function cleanCaptionDirectionMarkerTextNodes(root) {
    if (!root || !root.childNodes) return false;
    let changed = false;

    Array.from(root.childNodes || []).forEach(child => {
        if (!child) return;
        if (child.nodeType === 3) {
            const nextValue = stripLiveCaptionDirectionMarkers(child.nodeValue || '');
            if (nextValue !== child.nodeValue) {
                child.nodeValue = nextValue;
                changed = true;
            }
            return;
        }
        if (child.nodeType === 1 && cleanCaptionDirectionMarkerTextNodes(child)) {
            changed = true;
        }
    });

    return changed;
}

function applyCaptionDirectionMarkerCleanup(root) {
    if (!root || !root.childNodes) return false;

    // One recursive pass is enough. Visiting the root and every descendant as a
    // separate target repeatedly rewrites the same live text nodes on hot paths.
    return cleanCaptionDirectionMarkerTextNodes(root);
}

function collectCaptionSourceText(win, segments, options = {}) {
    const sourceEntries = Array.from(options.sourceEntries || []).filter(entry => {
        const node = entry && entry.node;
        return entry && entry.text && (!node || !node.classList ||
            !node.classList.contains('ysp-rollup-history-hidden'));
    });
    if (sourceEntries.length) {
        const sourceLines = sourceEntries.map(entry => entry.text).filter(Boolean);
        const selectedLines = options.latestRollupLinesOnly && sourceLines.length > 2
            ? sourceLines.slice(-2)
            : sourceLines;
        if (sourceEntries.some(entry => entry.isVisualLine)) return selectedLines.join('\n');
        if (selectedLines.length > 1 && selectedLines.length <= 3 &&
            selectedLines.every(line => countCaptionCharacters(line) >= 8)) {
            return selectedLines.join('\n');
        }
        return selectedLines.join(' ');
    }

    const visualLineNodes = win && win.querySelectorAll
        ? Array.from(win.querySelectorAll('.caption-visual-line')).filter(node =>
            !node.classList || !node.classList.contains('ysp-rollup-history-hidden')
        )
        : [];
    const allVisualLines = visualLineNodes.map(getCaptionNodePlainText).filter(Boolean);
    const visualLines = options.latestRollupLinesOnly && allVisualLines.length > 2
        ? allVisualLines.slice(-2)
        : allVisualLines;
    if (visualLines.length) return visualLines.join('\n');

    const segmentLines = Array.from(segments || []).map(getCaptionNodePlainText).filter(Boolean);
    if (segmentLines.length > 1 && segmentLines.length <= 3 && segmentLines.every(line => countCaptionCharacters(line) >= 8)) {
        return segmentLines.join('\n');
    }
    if (segmentLines.length) return segmentLines.join(' ');
    return getCaptionNodePlainText(win);
}

function syncShortsRollupHistoryVisibility(win, options) {
    options = options || {};
    const hiddenClass = 'ysp-rollup-history-hidden';
    const firstVisibleClass = 'ysp-rollup-first-visible';
    const isActiveShortsPlayback = !!options.isActiveShortsPlayback;
    const isPlaybackRollup = options.isPlaybackRollup !== undefined
        ? !!options.isPlaybackRollup
        : isActiveShortsPlayback;
    const hasSeenCreatorCustomStyles = !!options.hasSeenCreatorCustomStyles;
    const maxRows = Math.max(1, Number(options.maxRows) || 2);
    const rollupWindow = win && win.matches && win.matches('.caption-window.ytp-caption-window-rollup, .caption-window.ytp-rollup-mode')
        ? win
        : (win && win.querySelector
            ? win.querySelector('.caption-window.ytp-caption-window-rollup, .caption-window.ytp-rollup-mode')
            : null);
    const allLines = win && win.querySelectorAll
        ? Array.from(win.querySelectorAll('.caption-visual-line'))
        : [];
    let changed = false;

    const setClass = (node, className, enabled) => {
        if (!node || !node.classList) return;
        const hadClass = node.classList.contains(className);
        if (hadClass === enabled) return;
        node.classList.toggle(className, enabled);
        changed = true;
    };
    const clearRuntimeClasses = () => {
        allLines.forEach(line => {
            setClass(line, hiddenClass, false);
            setClass(line, firstVisibleClass, false);
        });
    };

    if (!isPlaybackRollup || hasSeenCreatorCustomStyles || !rollupWindow) {
        clearRuntimeClasses();
        return { visibleLines: allLines, hiddenLines: [], changed };
    }

    const captionsText = rollupWindow.querySelector && rollupWindow.querySelector('.captions-text');
    const directLines = captionsText && captionsText.querySelectorAll
        ? Array.from(captionsText.querySelectorAll(':scope > .caption-visual-line'))
        : allLines;
    const candidates = directLines.filter(line => String(line.textContent || '').trim());
    if (!candidates.length) {
        clearRuntimeClasses();
        return { visibleLines: [], hiddenLines: [], changed };
    }

    // Start with the newest two authored lines only. Older roll-up history never
    // needs measurement and is hidden before reads so it cannot inflate geometry.
    const newestCandidates = candidates.slice(-2);
    directLines.forEach(line => {
        setClass(line, hiddenClass, !newestCandidates.includes(line));
        setClass(line, firstVisibleClass, false);
    });

    const getVisualRowCount = (line) => {
        const view = line && line.ownerDocument && line.ownerDocument.defaultView;
        const style = view && view.getComputedStyle
            ? view.getComputedStyle(line)
            : (typeof getComputedStyle === 'function' ? getComputedStyle(line) : null);
        const lineHeight = Math.max(1, parseFloat(style && style.lineHeight) || parseFloat(style && style.fontSize) || 16);
        let rects = [];
        const doc = line && line.ownerDocument;
        if (doc && doc.createRange) {
            try {
                const range = doc.createRange();
                range.selectNodeContents(line);
                rects = Array.from(range.getClientRects ? range.getClientRects() : []);
            } catch (_) { }
        }
        if (!rects.length && line && line.getClientRects) {
            rects = Array.from(line.getClientRects());
        }
        const centers = rects
            .filter(rect => rect && rect.width > 0 && rect.height > 0)
            .map(rect => (rect.top + rect.bottom) / 2)
            .sort((a, b) => a - b);
        let clusteredRows = 0;
        let lastCenter = null;
        const clusterTolerance = Math.max(2, lineHeight * 0.35);
        centers.forEach(center => {
            if (lastCenter === null || Math.abs(center - lastCenter) > clusterTolerance) {
                clusteredRows += 1;
                lastCenter = center;
            }
        });

        const rect = line && line.getBoundingClientRect ? line.getBoundingClientRect() : null;
        const paddingY = (parseFloat(style && style.paddingTop) || 0) + (parseFloat(style && style.paddingBottom) || 0);
        const contentHeight = rect && rect.height > 0 ? Math.max(lineHeight, rect.height - paddingY) : lineHeight;
        const heightRows = Math.max(1, Math.ceil((contentHeight - 0.5) / lineHeight));
        return Math.max(1, clusteredRows, heightRows);
    };

    const latest = newestCandidates[newestCandidates.length - 1];
    const previous = newestCandidates.length > 1 ? newestCandidates[0] : null;
    const latestRows = getVisualRowCount(latest);
    let visibleLines = [latest];
    if (previous && latestRows + getVisualRowCount(previous) <= maxRows) {
        visibleLines = [previous, latest];
    }
    directLines.forEach(line => setClass(line, hiddenClass, !visibleLines.includes(line)));
    setClass(visibleLines[0], firstVisibleClass, true);

    return {
        visibleLines,
        hiddenLines: directLines.filter(line => !visibleLines.includes(line)),
        changed
    };
}

function applyCinematicCaptionLines(segment, text, options) {
    options = options || {};
    if (!segment) return false;

    const clean = String(text || '').trim();
    const lines = getCinematicCaptionLines(clean);
    const shouldUseLineNodes = lines.length > 1;
    const wasMultiline = !!(segment.classList && segment.classList.contains('ysp-cinematic-multiline'));

    if (!shouldUseLineNodes) {
        if (segment.classList) segment.classList.remove('ysp-cinematic-multiline');
        if (segment.textContent !== clean || wasMultiline) {
            segment.textContent = clean;
            return true;
        }
        return false;
    }

    const existingLines = Array.from(segment.querySelectorAll ? segment.querySelectorAll(':scope > .ysp-caption-line') : [])
        .map(node => node.textContent || '');
    const alreadyRendered = wasMultiline && existingLines.length === lines.length && existingLines.every((line, index) => line === lines[index]);
    if (alreadyRendered) {
        return false;
    }

    segment.textContent = '';
    if (segment.classList) segment.classList.add('ysp-cinematic-multiline');
    // Keep the generated line group direction-neutral; individual line nodes carry RTL/LTR.
    // This prevents multiline Arabic captions from drifting toward one side of the player.
    if (segment.setAttribute) segment.setAttribute('dir', 'ltr');

    lines.forEach(line => {
        const lineNode = document.createElement('span');
        lineNode.className = 'ysp-caption-line';
        lineNode.textContent = line;
        lineNode.setAttribute('dir', options.isArabic ? 'rtl' : 'ltr');
        segment.appendChild(lineNode);
    });
    return true;
}

function normalizeInlineFontFamilyForComparison(value) {
    return String(value || '')
        .replace(/!important/gi, '')
        .replace(/['"]/g, '')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function stripExtensionOwnedInlineFontFamily(styleText, ownedFontFamily) {
    const style = String(styleText || '');
    if (!style || !ownedFontFamily) return style;

    const owned = normalizeInlineFontFamilyForComparison(ownedFontFamily);
    if (!owned) return style;

    return style
        .split(';')
        .filter(declaration => {
            const separator = declaration.indexOf(':');
            if (separator < 0) return declaration.trim();
            const property = declaration.slice(0, separator).trim().toLowerCase();
            if (property !== 'font-family') return true;
            const value = normalizeInlineFontFamilyForComparison(declaration.slice(separator + 1));
            return value !== owned;
        })
        .join('; ');
}

function getCaptionNodeCreatorStyleText(node) {
    const style = node && node.getAttribute ? (node.getAttribute('style') || '') : '';
    if (!style) return '';
    const ownedFontFamily = (node.dataset && node.dataset.yspInlineFontFamily) ||
        (node.getAttribute && node.getAttribute('data-ysp-inline-font-family')) ||
        '';
    const withoutOwnedFont = stripExtensionOwnedInlineFontFamily(style, ownedFontFamily);
    if (!node.dataset || (node.dataset.yspDragOffsetX === undefined && node.dataset.yspDragOffsetY === undefined)) {
        return withoutOwnedFont;
    }
    return withoutOwnedFont
        .split(';')
        .filter(declaration => {
            const separator = declaration.indexOf(':');
            if (separator < 0) return declaration.trim();
            return declaration.slice(0, separator).trim().toLowerCase() !== 'transform';
        })
        .join('; ');
}

const YSP_CAPTION_PREVIEW_SELECTOR = '.ytp-inline-preview-ui, .ytp-video-preview, .ytd-video-preview, .ytp-tooltip, .ytp-storyboard';

function getCaptionPlayer(win) {
    if (win && typeof win.closest === 'function') {
        // Tooltips, hover previews and settings samples are not owned by the active
        // playback track, even when YouTube nests them inside the player element.
        if (win.closest(YSP_CAPTION_PREVIEW_SELECTOR)) return null;
        const closestPlayer = win.closest('.html5-video-player');
        if (closestPlayer) return closestPlayer;
        return null;
    }
    return getYouTubePlayer();
}

function getShortsRouteVideoId(pathname = location.pathname) {
    const match = String(pathname || '').match(/^\/shorts\/([^/?#]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

function isActiveShortsPlaybackWindow(win, player = getCaptionPlayer(win)) {
    if (!win || typeof win.closest !== 'function') return false;
    if (win.closest(YSP_CAPTION_PREVIEW_SELECTOR)) return false;

    const routeVideoId = getShortsRouteVideoId();
    const renderer = win.closest('ytd-reel-video-renderer');
    const shortsTree = renderer || win.closest('.ytp-reel-video-player, ytd-shorts');
    if (!routeVideoId || !shortsTree || !player) return false;

    const playerVideoId = safePlayerCall(() => {
        if (typeof player.getVideoData !== 'function') return '';
        const data = player.getVideoData();
        return data && (data.video_id || data.videoId) ? String(data.video_id || data.videoId) : '';
    }, '');
    if (playerVideoId) return playerVideoId === routeVideoId;

    if (renderer && renderer.querySelectorAll) {
        const routeLinks = Array.from(renderer.querySelectorAll('a[href*="/shorts/"]'));
        const matchingRouteLink = routeLinks.some(link => {
            try {
                return getShortsRouteVideoId(new URL(link.href, location.href).pathname) === routeVideoId;
            } catch (_) {
                return false;
            }
        });
        if (routeLinks.length) return matchingRouteLink;
    }

    return player.id === 'shorts-player' && !!renderer && (
        renderer.hasAttribute('is-active') ||
        renderer.hasAttribute('active') ||
        renderer.getAttribute('aria-hidden') !== 'true'
    );
}

function getCaptionInlineStyleText(segment, win) {
    const nodes = [segment];
    ['.captions-text', '.caption-visual-line', '.ytp-caption-window', '.ytp-caption-window-container', '.caption-window'].forEach(selector => {
        const parent = segment && segment.closest ? segment.closest(selector) : null;
        if (parent) nodes.push(parent);
    });
    if (segment && segment.querySelectorAll) {
        segment.querySelectorAll('[style]').forEach(node => nodes.push(node));
    }
    if (win) {
        nodes.push(win);
        if (win.querySelectorAll) {
            win.querySelectorAll('.captions-text[style], .caption-visual-line[style], .ytp-caption-segment[style], .captions-text [style], .caption-visual-line [style], .ytp-caption-segment [style]').forEach(node => nodes.push(node));
        }
    }

    return Array.from(new Set(nodes.filter(Boolean)))
        .map(getCaptionNodeCreatorStyleText)
        .filter(Boolean)
        .join('; ');
}

function parseCaptionCssRgbColor(value) {
    const match = String(value || '').trim().toLowerCase().match(/^rgba?\(([^)]+)\)$/);
    if (!match) return null;
    const parts = match[1].trim().split(/[\s,\/]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const parseChannel = part => {
        const numeric = Number.parseFloat(part);
        if (!Number.isFinite(numeric)) return NaN;
        return String(part).includes('%') ? numeric * 2.55 : numeric;
    };
    const channels = parts.slice(0, 3).map(parseChannel);
    if (channels.some(channel => !Number.isFinite(channel))) return null;
    let alpha = 1;
    if (parts[3] !== undefined) {
        const parsedAlpha = Number.parseFloat(parts[3]);
        if (!Number.isFinite(parsedAlpha)) return null;
        alpha = String(parts[3]).includes('%') ? parsedAlpha / 100 : parsedAlpha;
    }
    return { r: channels[0], g: channels[1], b: channels[2], alpha };
}

function isDefaultCaptionColorValue(value) {
    const clean = String(value || '').toLowerCase().replace(/\s+/g, '');
    const rgb = parseCaptionCssRgbColor(value);
    if (rgb) {
        return rgb.r >= 250 && rgb.g >= 250 && rgb.b >= 250 && rgb.alpha >= 0.95;
    }
    return clean === 'white' ||
        clean === '#fff' ||
        clean === '#ffffff' ||
        clean === '#fefefe';
}

function isDefaultCaptionBackgroundValue(value) {
    const clean = String(value || '').toLowerCase().replace(/\s+/g, '');
    const rgb = parseCaptionCssRgbColor(value);
    if (rgb) {
        return rgb.r <= 12 && rgb.g <= 12 && rgb.b <= 12;
    }
    return clean === 'transparent' ||
        clean === 'none' ||
        clean === 'black' ||
        clean === '#000' ||
        clean === '#000000';
}

function getInlineDeclarations(styleText, propertyPattern) {
    const re = new RegExp(`(?:^|;)\\s*(?:${propertyPattern})\\s*:\\s*([^;]+)`, 'gi');
    const values = [];
    let match;
    while ((match = re.exec(styleText)) !== null) {
        values.push(match[1].trim());
    }
    return values;
}

function hasNonBlackCaptionEffectColor(styleText, propertyPattern) {
    return getInlineDeclarations(styleText, propertyPattern).some(value => {
        const clean = String(value || '').toLowerCase();
        const functionalColors = Array.from(clean.matchAll(/rgba?\(([^)]+)\)/g));
        if (functionalColors.some(match => {
            const color = parseCaptionCssRgbColor(match[0]);
            return !!color && color.alpha > 0 && [color.r, color.g, color.b].some(channel => channel > 12);
        })) return true;

        const hexColors = clean.match(/#[0-9a-f]{3,8}\b/g) || [];
        if (hexColors.some(color => {
            const hex = color.slice(1);
            const rgbHex = hex.length === 3 || hex.length === 4 ? hex.slice(0, 3) : hex.slice(0, 6);
            return !/^0+$/.test(rgbHex);
        })) return true;
        return /\b(?:white|red|green|blue|yellow|cyan|magenta|orange|purple|lime|aqua|fuchsia)\b/i.test(clean);
    });
}

function hasActiveCaptionText(win) {
    const text = normalizeCaptionText((win && (win.innerText || win.textContent)) || '');
    return text.length > 0 && !isYouTubeCaptionSettingsNotice(text, win);
}

function getCaptionWindowInlinePositionText(win) {
    const nodes = [win];
    ['.ytp-caption-window-container', '.ytp-caption-window', '.caption-window'].forEach(selector => {
        const parent = win && win.closest ? win.closest(selector) : null;
        if (parent) nodes.push(parent);
    });

    return Array.from(new Set(nodes.filter(Boolean)))
        .map(node => node.getAttribute ? (node.getAttribute('style') || '') : '')
        .filter(Boolean)
        .join('; ');
}

function getCaptionWindowPositionMetric(style, prop) {
    const raw = getInlineDeclarations(style, prop)[0];
    if (!raw) return null;
    const percent = String(raw).match(/(-?\d+(?:\.\d+)?)%/);
    if (percent) return parseFloat(percent[1]);
    // Pixel coordinates are YouTube/player-size dependent. Comparing raw px values
    // to percentage thresholds caused normal videos to be misclassified as creator-custom.
    return null;
}

function getCaptionWindowPositionSignature(win) {
    const style = getCaptionWindowInlinePositionText(win);
    if (!style) return '';
    return ['left', 'right', 'top', 'bottom', 'transform']
        .map(prop => (getInlineDeclarations(style, prop)[0] || '').toLowerCase().replace(/\s+/g, ''))
        .join('|');
}

function getCaptionWindowSpatialMetrics(win) {
    const style = getCaptionWindowInlinePositionText(win);
    if (!style) return null;
    const left = getCaptionWindowPositionMetric(style, 'left');
    const right = getCaptionWindowPositionMetric(style, 'right');
    const top = getCaptionWindowPositionMetric(style, 'top');
    const bottom = getCaptionWindowPositionMetric(style, 'bottom');
    const width = getCaptionWindowPositionMetric(style, 'width');
    const hasHorizontal = left !== null || right !== null;
    const hasVertical = top !== null || bottom !== null;
    if (!hasHorizontal || !hasVertical) return null;

    const safeWidth = width !== null ? Math.max(0, Math.min(100, width)) : 40;
    let centerX = 50;
    if (left !== null) centerX = left + safeWidth / 2;
    else if (right !== null) centerX = 100 - right - safeWidth / 2;

    const topBand = top !== null ? top : (bottom !== null ? 100 - bottom : null);
    const lowerBand = (top !== null && top >= 65) || (bottom !== null && bottom <= 35);
    const centered = centerX >= 38 && centerX <= 62;

    return { centerX, topBand, width: safeWidth, lowerBand, centered, signature: getCaptionWindowPositionSignature(win) };
}

function hasCaptionWindowPositionSignal(win) {
    return !!getCaptionWindowSpatialMetrics(win);
}

function isStrongMultiPositionCreatorLayout(metrics) {
    if (!metrics || metrics.length < 2) return false;
    for (let i = 0; i < metrics.length; i++) {
        for (let j = i + 1; j < metrics.length; j++) {
            const a = metrics[i];
            const b = metrics[j];
            if (a.signature && a.signature === b.signature) continue;
            const horizontalSeparation = Math.abs(a.centerX - b.centerX);
            const verticalSeparation = Math.abs((a.topBand ?? 0) - (b.topBand ?? 0));
            const bothOrdinaryBottom = a.lowerBand && b.lowerBand && a.centered && b.centered;
            if (bothOrdinaryBottom) continue;
            if (horizontalSeparation >= 25 || verticalSeparation >= 28 || !a.lowerBand || !b.lowerBand) return true;
        }
    }
    return false;
}

function hasStrongSinglePositionCreatorCaptionLayout(win) {
    if (!hasActiveCaptionText(win)) return false;
    const metrics = getCaptionWindowSpatialMetrics(win);
    if (!metrics) return false;

    // WebVTT cue line/position/size/align can intentionally place a cue away from the default
    // bottom-centered box. Preserve clearly authored single-window placement, but keep the
    // ordinary YouTube bottom-centered caption path standard.
    if (!metrics.lowerBand) return true;
    return false;
}

function getCaptionPlayerRoot(win) {
    if (win && win.closest) {
        const root = win.closest('#movie_player, .html5-video-player, ytd-player, ytd-watch-flexy');
        if (root) return root;
    }
    return typeof document !== 'undefined' ? document : null;
}

function hasMultiPositionCreatorCaptionLayout(win, windows) {
    const root = getCaptionPlayerRoot(win);
    const activeWindows = Array.from(windows || []).filter(candidate => {
        if (!candidate || !hasActiveCaptionText(candidate)) return false;
        const candidateRoot = getCaptionPlayerRoot(candidate);
        return !root || !candidateRoot || candidateRoot === root;
    });

    if (activeWindows.length < 2) return false;
    const positionedMetrics = activeWindows
        .map(getCaptionWindowSpatialMetrics)
        .filter(Boolean);
    return isStrongMultiPositionCreatorLayout(positionedMetrics);
}

function getLeafCaptionWindows(root) {
    if (!root) return [];
    if (!root.querySelectorAll) return [root];
    const nested = Array.from(root.querySelectorAll('.caption-window')).filter(candidate =>
        !candidate.querySelector || !candidate.querySelector('.caption-window')
    );
    return nested.length ? nested : [root];
}

function shouldPreserveCreatorCustomCaptionStyle(segment, win, options = {}) {
    const text = segment && (segment.innerText || segment.textContent || '');
    const windowText = win && (win.innerText || win.textContent || '');
    if (isYouTubeCaptionSettingsNotice(text, win) ||
        (windowText && windowText !== text && isYouTubeCaptionSettingsNotice(windowText, win))) return false;
    if (options && options.isAutoTranslatedCaptionTrack) {
        return hasRepeatedCaptionTextLayers(win) && hasCreatorCustomCaptionStyle(segment, win, options);
    }
    return hasCreatorCustomCaptionStyle(segment, win, options);
}

function hasRepeatedCaptionTextLayers(win) {
    if (!win || !win.querySelectorAll) return false;
    // Count one rendering tier only. Counting the normal ancestor chain
    // captions-text > visual-line > segment makes a single cue look repeated.
    const segmentNodes = Array.from(win.querySelectorAll('.ytp-caption-segment'));
    const visualLineNodes = Array.from(win.querySelectorAll('.caption-visual-line'));
    const captionTextNodes = Array.from(win.querySelectorAll('.captions-text'));
    const nodes = segmentNodes.length ? segmentNodes : (visualLineNodes.length ? visualLineNodes : captionTextNodes);
    const counts = new Map();

    nodes.forEach(node => {
        const text = normalizeCaptionText((node && (node.innerText || node.textContent)) || '');
        if (!text || text.length < 2) return;
        counts.set(text, (counts.get(text) || 0) + 1);
    });

    return Array.from(counts.values()).some(count => count >= 2);
}

function hasCreatorCustomCaptionStyle(segment, win, options) {
    options = options || {};
    const hasSemanticEmphasis = !!options.allowAuthoredEmphasis && !!(
        (segment && segment.matches && segment.matches('b, strong, i, em, u')) ||
        (segment && segment.querySelector && segment.querySelector('b, strong, i, em, u'))
    );
    const style = getCaptionInlineStyleText(segment, win);
    if (!style && !hasSemanticEmphasis) return false;

    const colorValues = getInlineDeclarations(style, '-webkit-text-fill-color|color');
    const backgroundValues = getInlineDeclarations(style, 'background(?:-color)?');
    const fontValues = getInlineDeclarations(style, 'font-family');

    const sizeValues = getInlineDeclarations(style, 'font-size|line-height');
    const layoutValues = getInlineDeclarations(style, 'padding|border-radius');
    const ownStyle = segment && segment.getAttribute ? (segment.getAttribute('style') || '') : '';
    const textEffectNodes = [segment];
    ['.captions-text', '.caption-visual-line', '.ytp-caption-segment'].forEach(selector => {
        const textParent = segment && segment.closest ? segment.closest(selector) : null;
        if (textParent) textEffectNodes.push(textParent);
    });
    if (segment && segment.querySelectorAll) {
        segment.querySelectorAll('[style]').forEach(node => textEffectNodes.push(node));
    }
    if (win && win.querySelectorAll) {
        win.querySelectorAll('.captions-text[style], .caption-visual-line[style], .ytp-caption-segment[style], .captions-text [style], .caption-visual-line [style], .ytp-caption-segment [style]').forEach(node => textEffectNodes.push(node));
    }
    const textEffectStyle = Array.from(new Set(textEffectNodes.filter(Boolean)))
        .map(getCaptionNodeCreatorStyleText)
        .filter(Boolean)
        .join('; ');
    const ownTextAlignValues = getInlineDeclarations(ownStyle, 'text-align');
    const authoredFontWeightValues = getInlineDeclarations(textEffectStyle, 'font-weight');
    const authoredFontStyleValues = getInlineDeclarations(textEffectStyle, 'font-style');
    const authoredTextDecorationValues = getInlineDeclarations(textEffectStyle, 'text-decoration(?:-line)?');
    const isCustomColor = colorValues.some(value => !isDefaultCaptionColorValue(value));
    const isCustomBg = backgroundValues.some(value => !isDefaultCaptionBackgroundValue(value));
    const hasShadow = /(?:^|;)\s*text-shadow\s*:/i.test(style);
    const hasStroke = /(?:^|;)\s*-webkit-text-stroke\s*:/i.test(style);
    const hasColoredShadow = hasNonBlackCaptionEffectColor(textEffectStyle, 'text-shadow');
    const hasColoredStroke = hasNonBlackCaptionEffectColor(textEffectStyle, '-webkit-text-stroke(?:-color)?');
    // Opacity alone is often YouTube/native caption preference data; do not let it
    // opt standard captions out of the user's Subtitle Pro size/opacity settings.
    const motionPropertyPattern = options.ignoreLayoutTransform
        ? 'animation(?:-[\\w-]+)?|transition(?:-[\\w-]+)?|filter|-webkit-filter|box-shadow|background-image|clip-path'
        : 'animation(?:-[\\w-]+)?|transition(?:-[\\w-]+)?|transform|filter|-webkit-filter|box-shadow|background-image|clip-path';
    const effectValues = getInlineDeclarations(textEffectStyle, motionPropertyPattern);
    const hasMotionOrEffect = effectValues.some(value => {
        const clean = String(value || '')
            .toLowerCase()
            .replace(/\s*!important\s*$/i, '')
            .trim();
        return !!clean && !/^(?:none|initial|inherit|unset)(?:\s|$)/i.test(clean);
    });
    // YouTube's current native caption renderer uses "YouTube Sans" on some
    // first ASR cues. It is a host font, not creator styling. Treat it like the
    // older YouTube Noto/Roboto stacks so the first cue keeps the user's profile.
    const hasCustomFont = fontValues.some(value => !/roboto|youtube\s*(?:noto|sans)/i.test(value));
    const hasAuthoredEmphasis = !!options.allowAuthoredEmphasis && (hasSemanticEmphasis ||
        authoredFontWeightValues.some(value => {
            const clean = String(value || '').toLowerCase().replace(/\s*!important\s*$/i, '').trim();
            const numericWeight = parseInt(clean, 10);
            return clean === 'bold' || (Number.isFinite(numericWeight) && numericWeight >= 700);
        }) ||
        authoredFontStyleValues.some(value => /^(?:italic|oblique)(?:\s|$)/i.test(String(value || '').trim())) ||
        authoredTextDecorationValues.some(value => /(?:^|\s)(?:underline|overline|line-through)(?:\s|$)/i.test(String(value || '').trim()))
    );
    const hasCreatorSize = sizeValues.length > 0 || layoutValues.length > 0;
    const hasCreatorAlignment = ownTextAlignValues.some(value => !/^(center|initial|inherit|unset)$/i.test(String(value || '').trim()));
    const hasDefaultZeroStroke = getInlineDeclarations(style, '-webkit-text-stroke').every(value => {
        const clean = String(value || '').toLowerCase().replace(/\s+/g, '');
        return !clean || clean.startsWith('0px') || clean === '0transparent' || clean === '0pxtransparent';
    });
    const hasDecorativeTextEffect = hasColoredShadow || hasColoredStroke || ((hasShadow || (hasStroke && !hasDefaultZeroStroke)) &&
        (isCustomColor || isCustomBg || hasMotionOrEffect || hasCustomFont));
    const hasStrongVisualSignal = isCustomColor || isCustomBg || hasDecorativeTextEffect || hasMotionOrEffect || hasCustomFont || hasAuthoredEmphasis;

    // Standard YouTube captions can include inline font-size, line-height, padding, centered layout,
    // and default shadow/stroke declarations. Treat those alone as normal; preserve creator styling
    // when there is a real visual/font signal or an authored non-center text alignment such as
    // WebVTT align:end/right.
    return hasStrongVisualSignal || hasCreatorAlignment || (hasCreatorSize && hasStrongVisualSignal);
}

function hasNativeCaptionRollupLayoutMotion(win) {
    if (!win || !win.querySelectorAll) return false;

    const styleNodes = [
        win,
        ...Array.from(win.querySelectorAll('.caption-window, .captions-text, .caption-visual-line'))
    ];
    const hasClippedRollupViewport = styleNodes.some(node =>
        /(?:^|;)\s*overflow(?:-[xy])?\s*:\s*hidden(?:\s*!important)?\s*(?:;|$)/i.test(
            getCaptionNodeCreatorStyleText(node)
        )
    );
    if (!hasClippedRollupViewport) return false;

    return Array.from(win.querySelectorAll('.captions-text, .caption-visual-line')).some(node => {
        const transformValues = getInlineDeclarations(getCaptionNodeCreatorStyleText(node), 'transform');
        if (!transformValues.length) return false;
        return transformValues.every(value => {
            const clean = String(value || '')
                .replace(/\s*!important\s*$/i, '')
                .trim();
            return /^translateY\(\s*-?\d+(?:\.\d+)?(?:px|%)\s*\)$/i.test(clean);
        });
    });
}

function getYouTubeCaptionNoticeTrackLabels(context) {
    if (context && Array.isArray(context.trackLabels)) {
        return Array.from(new Set(context.trackLabels.map(normalizeCaptionText).filter(Boolean)));
    }

    const win = context && context.win ? context.win : context;
    if (!win ||
        typeof getCaptionPlayer !== 'function' ||
        typeof getSelectedCaptionTrack !== 'function' ||
        typeof getCaptionTrackList !== 'function' ||
        typeof getCaptionTrackNameText !== 'function') return [];

    try {
        const player = getCaptionPlayer(win);
        if (!player) return [];
        const selectedTrack = getSelectedCaptionTrack(player);
        const tracks = [selectedTrack, ...getCaptionTrackList(player)].filter(Boolean);
        return Array.from(new Set(tracks.map(getCaptionTrackNameText).map(normalizeCaptionText).filter(Boolean)));
    } catch (_) {
        return [];
    }
}

function hasYouTubeCaptionSettingsNoticePosition(context) {
    const win = context && context.win ? context.win : context;
    if (!win || typeof getCaptionWindowSpatialMetrics !== 'function') return false;
    try {
        const metrics = getCaptionWindowSpatialMetrics(win);
        if (!metrics || metrics.topBand === null) return false;
        // YouTube's temporary CC settings card is placed in the upper-left band.
        // This geometry is already strong enough to trigger creator preservation,
        // so use the same synchronous evidence to exclude the exact UI prompt even
        // before manual-track metadata becomes available on cue one.
        return !metrics.lowerBand && metrics.topBand <= 42 && metrics.centerX <= 42;
    } catch (_) {
        return false;
    }
}

function isYouTubeCaptionSettingsNotice(text, context) {
    const clean = normalizeCaptionText(text);
    if (!clean) return false;

    // YouTube renders this temporary caption when CC is enabled. ASR tracks add
    // "(auto-generated)" to the label, while manually authored tracks only show
    // the language followed by the settings glyph. The previous detector required
    // the ASR label, so the manual-track notice was mistaken for an authored cue
    // and its top-left placement polluted creator-style memory.
    const hasGeneratedLabel = /\bauto-generated\b/i.test(clean) || /\([^)]*generated[^)]*\)/i.test(clean);
    const settingsPrompt = clean.match(/\bclick\b\s*(\u2699(?:\uFE0F)?\s*)?\bfor settings\b[.!]?$/i);
    if (!settingsPrompt) return false;
    if (hasGeneratedLabel) return true;

    // YouTube sometimes draws the gear as a separate icon, so innerText becomes
    // "Arabic Click for settings" with no U+2699 character. In that case require
    // the prefix to equal a real caption-track label exposed by the owning player.
    // This avoids treating ordinary subtitle prose as a settings notice.
    const trackLabel = normalizeCaptionText(clean.slice(0, settingsPrompt.index));
    if (!trackLabel || trackLabel.length > 96) return false;
    const labelWords = trackLabel.replace(/\([^)]*\)/g, ' ').split(/\s+/).filter(Boolean);
    if (!labelWords.length || labelWords.length > 8) return false;
    if (!/^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}\s'\u2019(),&.\/+-]*$/u.test(trackLabel)) return false;

    if (settingsPrompt[1]) return true;
    const normalizedTrackLabel = trackLabel.toLocaleLowerCase();
    const matchesKnownTrackLabel = getYouTubeCaptionNoticeTrackLabels(context).some(label =>
        normalizeCaptionText(label).toLocaleLowerCase() === normalizedTrackLabel
    );
    if (matchesKnownTrackLabel) return true;
    return hasYouTubeCaptionSettingsNoticePosition(context);
}

function hideYouTubeCaptionSettingsNoticeNodes(win, segments) {
    let hidNoticeSegment = false;
    const segmentList = Array.from(segments || []);
    const windowText = win && (win.innerText || win.textContent || '');
    const isWholeWindowNotice = isYouTubeCaptionSettingsNotice(windowText, win);

    segmentList.forEach(segment => {
        const segmentText = segment.innerText || segment.textContent || '';
        const ownsResidualCaptionText = !!(segment.classList &&
            segment.classList.contains('ysp-caption-style-target'));
        if ((isWholeWindowNotice || isYouTubeCaptionSettingsNotice(segmentText, win)) && !ownsResidualCaptionText) {
            segment.classList.add('ysp-caption-notice-hidden');
            hidNoticeSegment = true;
        } else {
            segment.classList.remove('ysp-caption-notice-hidden');
        }
    });

    if (isWholeWindowNotice) {
        win.classList.add('ysp-smart-hide');
        return true;
    }

    if (hidNoticeSegment) {
        win.classList.remove('ysp-smart-hide');
        return true;
    }

    // YouTube reuses the caption container after its temporary "Click for
    // settings" notice. A later real creator cue must clear the notice-only hide;
    // the strict creator-custom branch intentionally returns before standard
    // cleanup and cannot be relied on to repair stale visibility state.
    if (segmentList.length) {
        win.classList.remove('ysp-smart-hide');
        return false;
    }

    if (!segmentList.length && isYouTubeCaptionSettingsNotice(windowText, win)) {
        win.classList.add('ysp-smart-hide');
        return true;
    }

    return false;
}

function getCaptionRenderTargets(win) {
    if (!win || !win.querySelectorAll) {
        return { segments: [], fallbackStyleTargets: [], sourceEntries: [] };
    }

    const baseSegments = Array.from(win.querySelectorAll('.ytp-caption-segment'));
    const allVisualLineSegments = Array.from(win.querySelectorAll('.caption-visual-line'));
    const captionsTextSegments = Array.from(win.querySelectorAll('.captions-text'));
    const containsNode = (owner, node) => !!(owner && node &&
        (owner === node || (owner.contains && owner.contains(node))));
    const visualLineSegments = allVisualLineSegments.filter(candidate =>
        !allVisualLineSegments.some(other => other !== candidate && containsNode(candidate, other))
    );
    const directCaptionsTextSegments = captionsTextSegments.filter(candidate =>
        !visualLineSegments.some(line => containsNode(line, candidate))
    );
    const removeNodeTexts = (text, nodes) => {
        let residual = normalizeCaptionText(text);
        Array.from(nodes || []).forEach(node => {
            const ownedText = normalizeCaptionText(getCaptionNodePlainText(node));
            if (ownedText) residual = normalizeCaptionText(residual.replace(ownedText, ' '));
        });
        return residual;
    };
    const wholeWindowText = (win.innerText || getCaptionNodePlainText(win) || '');
    const wholeWindowIsNotice = isYouTubeCaptionSettingsNotice(wholeWindowText, win);
    const isRealCaptionText = text => !!text &&
        !wholeWindowIsNotice &&
        !isYouTubeCaptionSettingsNotice(text, win);

    // CC On can briefly render YouTube's "Click for settings" notice through
    // .ytp-caption-segment while the real cue is already visible through a
    // fallback .caption-visual-line/.captions-text renderer. Resolve ownership
    // per DOM branch: a visual-line in one notice branch must not suppress a real
    // captions-text sibling, and ancestor wrappers must not create two backplates.
    const fallbackStyleTargets = [];
    const sourceEntries = [];

    visualLineSegments.forEach(line => {
        const containedBaseSegments = baseSegments.filter(segment => containsNode(line, segment));
        const residualText = removeNodeTexts(getCaptionNodePlainText(line), containedBaseSegments);
        if (isRealCaptionText(residualText)) fallbackStyleTargets.push(line);

        const noticeSegments = containedBaseSegments.filter(segment =>
            isYouTubeCaptionSettingsNotice(getCaptionNodePlainText(segment), win)
        );
        const visibleLineText = removeNodeTexts(getCaptionNodePlainText(line), noticeSegments);
        if (isRealCaptionText(visibleLineText)) {
            sourceEntries.push({ node: line, text: visibleLineText, isVisualLine: true });
        }
    });

    directCaptionsTextSegments.forEach(textNode => {
        const containedVisualLines = visualLineSegments.filter(line => containsNode(textNode, line));
        const directBaseSegments = baseSegments.filter(segment =>
            containsNode(textNode, segment) &&
            !containedVisualLines.some(line => containsNode(line, segment))
        );
        let residualText = removeNodeTexts(getCaptionNodePlainText(textNode), containedVisualLines);
        residualText = removeNodeTexts(residualText, directBaseSegments);
        if (isRealCaptionText(residualText)) {
            fallbackStyleTargets.push(textNode);
            sourceEntries.push({ node: textNode, text: residualText });
        }
        directBaseSegments.forEach(segment => {
            const text = normalizeCaptionText(getCaptionNodePlainText(segment));
            if (isRealCaptionText(text)) sourceEntries.push({ node: segment, text });
        });
    });

    baseSegments.forEach(segment => {
        const ownedByKnownBranch = visualLineSegments.some(line => containsNode(line, segment)) ||
            directCaptionsTextSegments.some(textNode => containsNode(textNode, segment));
        if (ownedByKnownBranch) return;
        const text = normalizeCaptionText(getCaptionNodePlainText(segment));
        if (isRealCaptionText(text)) sourceEntries.push({ node: segment, text });
    });

    return {
        segments: Array.from(new Set([...baseSegments, ...fallbackStyleTargets])),
        fallbackStyleTargets: Array.from(new Set(fallbackStyleTargets)),
        sourceEntries
    };
}

const CAPTION_EFFECT_KEYWORDS = [
    'موسيقى', 'موسيقا', 'موسيقي', 'موسيقية', 'الموسيقى',
    'تصفيق', 'ضحك', 'ضحكات', 'بكاء', 'بكا', 'تنهد', 'تنهيدة',
    'ضجيج', 'صراخ', 'صرخة', 'همس', 'همسة', 'غناء', 'يغني',
    'صفير', 'جرس', 'رياح', 'رعد', 'مطر', 'خطوات', 'خطوة',
    'طرق', 'تحطم', 'نباح', 'زقزقة', 'صوت', 'أصوات', 'دندنة',
    'مؤثرات', 'صمت', 'سعال', 'انفجار', 'تكسير',
    'music', 'applause', 'laughter', 'laughs', 'crying', 'sigh', 'sighs',
    'sound', 'sounds', 'noise', 'screaming', 'screams', 'whispering',
    'singing', 'whistling', 'bell', 'wind', 'thunder', 'rain', 'footsteps',
    'knocking', 'crash', 'barking', 'chirping', 'cheering', 'drama',
    'instrumental', 'humming', 'gasping', 'panting', 'groaning',
    'mumbling', 'static', 'silence', 'cough', 'coughing', 'explosion',
    'sniffing', 'breathing', 'chuckles', 'grunts', 'gasps'
];

function stripCaptionDiacritics(text) {
    return String(text || '').replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');
}

function escapeRegex(text) {
    return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeCaptionFilterText(text) {
    const cleanText = String(text || '').replace(/\s+/g, ' ').trim();
    const stripped = stripCaptionDiacritics(cleanText)
        .replace(/^[\s\[\](){}<>♪♫♬·•★☆✶✷✸\-_*.,!?؟،؛:"'`’‘“”]+/u, '')
        .replace(/[\s\[\](){}<>♪♫♬·•★☆✶✷✸\-_*.,!?؟،؛:"'`’‘“”]+$/u, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    return { cleanText, stripped };
}

function containsCaptionEffectKeyword(text) {
    const value = stripCaptionDiacritics(String(text || '')).toLowerCase();
    if (!value) return false;
    try {
        const keywordRegex = new RegExp(
            '(?:^|[^\\p{L}\\p{N}])(' + CAPTION_EFFECT_KEYWORDS.map(escapeRegex).join('|') + ')(?=[^\\p{L}\\p{N}]|$)',
            'iu'
        );
        return keywordRegex.test(value);
    } catch (_) {
        const keywordRegex = new RegExp(
            '(?:^|[^A-Za-z\\u0600-\\u06FF])(' + CAPTION_EFFECT_KEYWORDS.map(escapeRegex).join('|') + ')(?=[^A-Za-z\\u0600-\\u06FF]|$)',
            'i'
        );
        return keywordRegex.test(value);
    }
}

function isSmartTimingEffectLine(text) {
    const { cleanText, stripped } = normalizeCaptionFilterText(text);
    if (!cleanText) return true;
    if (!stripped) return true;

    const isBracketedAnnotation = /^[\[({<][\s\S]+[\])}>]$/u.test(cleanText);
    if (isBracketedAnnotation && cleanText.length <= 80) {
        return containsCaptionEffectKeyword(stripped);
    }

    const isMusicNoteDelimited = /^[♪♫♬]/.test(cleanText) && /[♪♫♬]$/.test(cleanText);
    if (isMusicNoteDelimited && cleanText.length <= 120) return true;

    if (!containsCaptionEffectKeyword(stripped)) return false;

    const normalized = stripped.replace(/[.!?؟،؛:]+$/u, '').trim();
    if (CAPTION_EFFECT_KEYWORDS.some(keyword => normalized === stripCaptionDiacritics(keyword).toLowerCase())) return true;

    const effectPhrasePattern = /^(?:music|sound|noise|rain|wind|thunder|applause|laughter|laughs|crying|sighs?|singing|instrumental|humming|static|silence|cough(?:ing)?|explosion|breathing|chuckles|gasps?)\s+(?:playing|starts?|continues?|fades?|background|soft|loud|quiet|upbeat|dramatic|sad|tense|theme|effect|effects)$/i;
    const arabicEffectPhrasePattern = /^(?:موسيقى|موسيقا|موسيقي|الموسيقى|تصفيق|ضحك|صوت|أصوات|ضجيج|صمت|مطر|رياح|رعد|انفجار)\s+(?:هادئة|حماسية|مثيرة|خلفية|تبدأ|تستمر|عالية|منخفضة|درامية|مؤثرة)$/i;
    return effectPhrasePattern.test(normalized) || arabicEffectPhrasePattern.test(normalized);
}

function isEnhancedBlockingNoiseLine(text) {
    const { cleanText, stripped } = normalizeCaptionFilterText(text);
    if (!cleanText) return true;
    if (/^(?:<<|>>|\.\.\.|[-_]+)$/u.test(cleanText)) return true;
    if (/^[♪♫♬]+$/u.test(cleanText)) return true;
    if (/^[\u2600-\u26FF\u2700-\u27BF\u2B50-\u2BFF]+$/u.test(cleanText)) return true;
    if (cleanText.length < 5 && /^[^a-zA-Z\u0600-\u06FF]+$/u.test(cleanText)) return true;

    const fillerToken = '(?:la+|oh+|ah+|mm+|hm+|uh+|um+|er+|eh+)';
    const fillerOnly = new RegExp(`^(?:${fillerToken}[\\s,.!?،؛:-]*){1,5}$`, 'i');
    if (fillerOnly.test(cleanText) && !/[\u0600-\u06FF]/.test(cleanText)) return true;

    return isSmartTimingEffectLine(cleanText) && containsCaptionEffectKeyword(stripped);
}

function applyCustomBlockingToCaption(text, rawRules) {
    let modifiedText = String(text || '');
    const originalText = modifiedText;
    const errors = [];
    const rules = String(rawRules || '')
        .split(',')
        .map(rule => rule.trim())
        .filter(Boolean);

    rules.forEach(rule => {
        if (rule.startsWith('/') && rule.endsWith('/') && rule.length > 2) {
            try {
                const pattern = rule.slice(1, -1);
                let regex;
                try {
                    regex = new RegExp(pattern, 'giu');
                } catch (_) {
                    regex = new RegExp(pattern, 'gi');
                }
                modifiedText = modifiedText.replace(regex, ' ');
            } catch (error) {
                errors.push({ rule, message: error && error.message ? error.message : String(error) });
            }
            return;
        }

        const escaped = escapeRegex(rule);
        try {
            modifiedText = modifiedText.replace(new RegExp(`(^|[^\\p{L}\\p{N}_])(${escaped})(?=$|[^\\p{L}\\p{N}_])`, 'giu'), '$1');
        } catch (_) {
            modifiedText = modifiedText.replace(new RegExp(`(^|[^A-Za-z0-9_])(${escaped})(?=$|[^A-Za-z0-9_])`, 'gi'), '$1');
        }
    });

    modifiedText = modifiedText.replace(/\s+/g, ' ').trim();
    const modified = modifiedText !== originalText.replace(/\s+/g, ' ').trim();
    return { modifiedText, modified, shouldHide: modified && modifiedText.length === 0, errors };
}

function evaluateCaptionCleanup(text, settings = {}) {
    const originalText = String(text || '');
    const result = { shouldHide: false, modifiedText: originalText.replace(/\s+/g, ' ').trim(), modified: false, reason: '', errors: [] };
    if (settings.smartTiming && isSmartTimingEffectLine(originalText)) {
        result.shouldHide = true;
        result.reason = 'smartTiming';
        return result;
    }
    if (settings.enhancedBlocking && isEnhancedBlockingNoiseLine(originalText)) {
        result.shouldHide = true;
        result.reason = 'enhancedBlocking';
        return result;
    }
    if (settings.enhancedBlocking && settings.customBlocking && String(settings.customBlocking).trim()) {
        const custom = applyCustomBlockingToCaption(originalText, settings.customBlocking);
        result.modifiedText = custom.modifiedText;
        result.modified = custom.modified;
        result.shouldHide = custom.shouldHide;
        result.reason = custom.shouldHide ? 'customBlockingHide' : (custom.modified ? 'customBlocking' : '');
        result.errors = custom.errors || [];
    }
    return result;
}

function collectCurrentCaptionText() {
    const selector = '.ytp-caption-window-container, .ytp-caption-window, .caption-window';
    return normalizeCaptionText(Array.from(document.querySelectorAll(selector))
        .map(el => el.innerText || el.textContent || '')
        .join(' '));
}

function loadCustomSubtitleFont(settings) {
    if (!settings || !settings.customFont || !settings.customFont.name || !settings.customFont.data) return;
    const key = `${settings.customFont.name}:${settings.customFont.data.length}`;
    if (loadedCustomSubtitleFonts.has(key)) return;
    loadedCustomSubtitleFonts.add(key);
    try {
        const fontFace = new FontFace(settings.customFont.name, `url(${settings.customFont.data})`);
        fontFace.load().then(loadedFace => {
            document.fonts.add(loadedFace);
        }).catch(() => {
            loadedCustomSubtitleFonts.delete(key);
        });
    } catch (_) {
        loadedCustomSubtitleFonts.delete(key);
    }
}

function getPrimaryFontFamilyName(fontFamily) {
    return String(fontFamily || '').split(',')[0].replace(/['"]/g, '').trim();
}

function isSelectedCustomSubtitleFont(settings) {
    if (!settings || !settings.customFont || !settings.customFont.name) return false;
    return getPrimaryFontFamilyName(settings.fontFamily) === settings.customFont.name;
}

function escapeCssString(value) {
    return String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/[\r\n\f]/g, ' ');
}

function buildCustomSubtitleFontFaceCss(settings) {
    if (!settings || !settings.customFont || !settings.customFont.name || !settings.customFont.data) return '';
    const src = String(settings.customFont.data || '').replace(/[\r\n\f]/g, '');
    if (!src.startsWith('data:')) return '';
    const family = escapeCssString(settings.customFont.name);
    return `
        @font-face {
            font-family: "${family}";
            src: url("${src}");
            font-display: swap;
        }
    `;
}

function getSubtitleFontFamilyForSettings(settings, langKey = 'en') {
    const usesCustomFont = isSelectedCustomSubtitleFont(settings);
    if (settings && settings.dyslexiaMode && !usesCustomFont) {
        return langKey === 'ar' ? ARABIC_DYSLEXIA_FONT_STACK : ENGLISH_DYSLEXIA_FONT_STACK;
    }
    return getEffectiveSubtitleFontFamily(settings && settings.fontFamily);
}

const LIVE_CAPTION_FONT_TARGET_SELECTOR = '.caption-window, .ytp-caption-window, .ytp-caption-window-container, .captions-text, .caption-visual-line, .ytp-caption-segment, .caption-window [style], .ytp-caption-window [style], .ytp-caption-window-container [style], .captions-text [style], .caption-visual-line [style], .ytp-caption-segment [style]';
const LIVE_CAPTION_FONT_SELF_SELECTOR = '.caption-window, .ytp-caption-window, .ytp-caption-window-container, .captions-text, .caption-visual-line, .ytp-caption-segment';

function applyCaptionFontFamilyInline(root, fontFamily) {
    if (!root || !fontFamily || !root.querySelectorAll) return false;

    const targets = new Set();
    if (root.matches && root.matches(LIVE_CAPTION_FONT_SELF_SELECTOR)) {
        targets.add(root);
    }
    root.querySelectorAll(LIVE_CAPTION_FONT_TARGET_SELECTOR).forEach(node => targets.add(node));

    let changed = false;
    targets.forEach(node => {
        if (!node || !node.style) return;
        const currentFontFamily = node.style.getPropertyValue('font-family') || '';
        const currentPriority = node.style.getPropertyPriority('font-family') || '';
        let snapshot = captionFontInlineSnapshots.get(node);
        const currentIsExtensionFont = !!snapshot &&
            normalizeInlineFontFamilyForComparison(currentFontFamily) === normalizeInlineFontFamilyForComparison(snapshot.appliedValue);

        // YouTube rewrites live caption inline styles on every cue. If that happens,
        // refresh the native snapshot before applying the user's font again. This lets
        // clearCaptionFontFamilyInline restore the creator's exact value + priority.
        if (!snapshot || !currentIsExtensionFont) {
            snapshot = {
                value: currentFontFamily,
                priority: currentPriority,
                hadProperty: !!currentFontFamily,
                appliedValue: fontFamily
            };
            captionFontInlineSnapshots.set(node, snapshot);
        } else {
            snapshot.appliedValue = fontFamily;
        }

        if (node.dataset) node.dataset.yspInlineFontFamily = fontFamily;
        else if (node.setAttribute) node.setAttribute('data-ysp-inline-font-family', fontFamily);

        if (node.style.getPropertyValue('font-family') === fontFamily &&
            node.style.getPropertyPriority('font-family') === 'important') {
            return;
        }
        node.style.setProperty('font-family', fontFamily, 'important');
        changed = true;
    });
    return changed;
}

function clearCaptionFontFamilyInline(root) {
    if (!root || !root.querySelectorAll) return false;

    const targets = new Set();
    if (root.matches && root.matches(LIVE_CAPTION_FONT_SELF_SELECTOR)) {
        targets.add(root);
    }
    root.querySelectorAll(LIVE_CAPTION_FONT_TARGET_SELECTOR).forEach(node => targets.add(node));

    let changed = false;
    targets.forEach(node => {
        if (!node || !node.style) return;
        const snapshot = captionFontInlineSnapshots.get(node);
        const ownedFontFamily = (node.dataset && node.dataset.yspInlineFontFamily) ||
            (node.getAttribute && node.getAttribute('data-ysp-inline-font-family')) ||
            '';
        const currentFontFamily = node.style.getPropertyValue('font-family') || '';
        const appliedFontFamily = snapshot ? snapshot.appliedValue : ownedFontFamily;
        const currentIsExtensionFont = !!appliedFontFamily &&
            normalizeInlineFontFamilyForComparison(currentFontFamily) === normalizeInlineFontFamilyForComparison(appliedFontFamily);

        if (currentIsExtensionFont) {
            if (snapshot && snapshot.hadProperty) {
                node.style.setProperty('font-family', snapshot.value, snapshot.priority);
            } else {
                node.style.removeProperty('font-family');
            }
            changed = true;
        }
        captionFontInlineSnapshots.delete(node);
        if (node.dataset) delete node.dataset.yspInlineFontFamily;
        if (node.removeAttribute) node.removeAttribute('data-ysp-inline-font-family');
    });
    return changed;
}

function getCreatorCustomCaptionNaturalWidth(win) {
    if (!win || !win.querySelectorAll) return 0;
    const visualLines = Array.from(win.querySelectorAll('.caption-visual-line'));
    const lineRoots = visualLines.length ? visualLines : [win];
    return lineRoots.reduce((widest, line) => {
        const segments = Array.from(line.querySelectorAll ? line.querySelectorAll('.ytp-caption-segment') : []);
        if (!segments.length) {
            const rect = line.getBoundingClientRect ? line.getBoundingClientRect() : null;
            return Math.max(widest, rect && rect.width > 0 ? rect.width : 0);
        }
        const rowWidth = segments.reduce((sum, segment) => {
            const rect = segment && segment.getBoundingClientRect ? segment.getBoundingClientRect() : null;
            return sum + (rect && rect.width > 0 ? rect.width : 0);
        }, 0);
        return Math.max(widest, rowWidth);
    }, 0);
}

function hasCreatorCustomCaptionAccidentalWrap(root) {
    if (!root || !root.querySelectorAll) return false;
    const windows = [];
    if (root.matches && root.matches('.caption-window')) windows.push(root);
    else root.querySelectorAll('.caption-window').forEach(node => windows.push(node));

    return windows.some(win => Array.from(win.querySelectorAll('.caption-visual-line')).some(line => {
        const segments = Array.from(line.querySelectorAll('.ytp-caption-segment'));
        if (segments.length < 2) return false;

        const rects = segments
            .map(segment => segment && segment.getBoundingClientRect ? segment.getBoundingClientRect() : null)
            .filter(rect => rect && rect.width > 0 && rect.height > 0);
        if (rects.length < 2) return false;

        // Separate caption-visual-line nodes are authored rows. Multiple vertical
        // positions inside one visual line mean the browser wrapped an intended
        // composite row (typically after Arabic auto-translation outgrew the
        // source-language box), so expanding this centered box restores intent.
        const firstTop = rects[0].top !== undefined ? rects[0].top : rects[0].y;
        const wrappedAcrossRows = rects.some(rect => {
            const top = rect.top !== undefined ? rect.top : rect.y;
            return Number.isFinite(top) && Number.isFinite(firstTop) && Math.abs(top - firstTop) > 2;
        });
        if (!wrappedAcrossRows) return false;

        const naturalWidth = rects.reduce((sum, rect) => sum + rect.width, 0);
        const winRect = win.getBoundingClientRect ? win.getBoundingClientRect() : null;
        return !!winRect && naturalWidth > winRect.width + 2;
    }));
}

function clearCreatorCustomCaptionReflow(root) {
    if (!root || !root.querySelectorAll) return false;
    const windows = new Set();
    if (root.matches && root.matches('.caption-window')) windows.add(root);
    root.querySelectorAll('.caption-window').forEach(node => windows.add(node));
    let changed = false;

    windows.forEach(node => {
        if (!node || !node.style) return;
        const snapshot = creatorCustomReflowSnapshots.get(node);
        const appliedWidth = (node.dataset && node.dataset.yspCreatorReflowWidth) || '';
        const appliedMargin = (node.dataset && node.dataset.yspCreatorReflowMargin) || '';
        const currentWidth = node.style.getPropertyValue('width') || '';
        const currentMargin = node.style.getPropertyValue('margin-left') || '';

        if (snapshot && currentWidth === appliedWidth && currentMargin === appliedMargin) {
            if (snapshot.width.hadProperty) node.style.setProperty('width', snapshot.width.value, snapshot.width.priority);
            else node.style.setProperty('width', '');
            if (snapshot.margin.hadProperty) node.style.setProperty('margin-left', snapshot.margin.value, snapshot.margin.priority);
            else node.style.setProperty('margin-left', '');
            changed = true;
        }
        creatorCustomReflowSnapshots.delete(node);
        if (node.dataset) {
            delete node.dataset.yspCreatorReflowWidth;
            delete node.dataset.yspCreatorReflowMargin;
        }
    });
    return changed;
}

function syncCreatorCustomCaptionReflow(win, options) {
    options = options || {};
    if (!win || !win.querySelectorAll) return false;

    // detectLanguage intentionally works from the top-most YouTube caption root.
    // The stale translated width, however, belongs to each inner caption-window.
    // Reflow those native windows individually so multi-window creator layouts
    // keep their authored positions instead of measuring the full player overlay.
    if (!(win.matches && win.matches('.caption-window'))) {
        let nestedChanged = false;
        win.querySelectorAll('.caption-window').forEach(node => {
            if (syncCreatorCustomCaptionReflow(node, options)) nestedChanged = true;
        });
        return nestedChanged;
    }

    if (!win.style || !win.getBoundingClientRect) return false;
    const allowWidthRepair = options.allowWidthRepair !== undefined
        ? !!options.allowWidthRepair
        : !!options.isAutoTranslatedCaptionTrack;
    if (!options.isPlaybackContext || !allowWidthRepair) {
        return clearCreatorCustomCaptionReflow(win);
    }

    const naturalWidth = getCreatorCustomCaptionNaturalWidth(win);
    const currentRect = win.getBoundingClientRect();
    if (!Number.isFinite(naturalWidth) || naturalWidth <= currentRect.width + 2) return false;

    const leftValue = win.style.getPropertyValue('left') || '';
    const widthValue = win.style.getPropertyValue('width') || '';
    const marginValue = win.style.getPropertyValue('margin-left') || '';
    const transformValue = win.style.getPropertyValue('transform') || '';
    const leftPercent = /%/.test(leftValue) ? parseFloat(leftValue) : NaN;
    const inlineWidth = parseFloat(widthValue);
    const inlineMargin = parseFloat(marginValue);
    const centeredByInlineWidth = Number.isFinite(inlineWidth) && Number.isFinite(inlineMargin) &&
        Math.abs(inlineMargin + inlineWidth / 2) <= 3;
    const centeredByRenderedWidth = Number.isFinite(inlineMargin) &&
        Math.abs(inlineMargin + currentRect.width / 2) <= 3;
    const centeredByTransform = /translateX\(\s*-50(?:\.0+)?%\s*\)/i.test(transformValue);
    if (!Number.isFinite(leftPercent) || Math.abs(leftPercent - 50) > 0.5 ||
        (!centeredByInlineWidth && !centeredByRenderedWidth && !centeredByTransform)) {
        return false;
    }

    const player = win.closest && win.closest('#movie_player, .html5-video-player');
    const playerRect = player && player.getBoundingClientRect ? player.getBoundingClientRect() : null;
    const maxWidth = playerRect && playerRect.width > 0 ? Math.max(80, playerRect.width - 24) : naturalWidth;
    const targetWidth = Math.ceil(Math.min(naturalWidth + 1, maxWidth));
    if (targetWidth <= currentRect.width + 2) return false;

    let snapshot = creatorCustomReflowSnapshots.get(win);
    const currentMatchesApplied = !!snapshot &&
        widthValue === ((win.dataset && win.dataset.yspCreatorReflowWidth) || '') &&
        marginValue === ((win.dataset && win.dataset.yspCreatorReflowMargin) || '');
    if (!snapshot || !currentMatchesApplied) {
        snapshot = {
            width: {
                value: widthValue,
                priority: win.style.getPropertyPriority('width') || '',
                hadProperty: !!widthValue
            },
            margin: {
                value: marginValue,
                priority: win.style.getPropertyPriority('margin-left') || '',
                hadProperty: !!marginValue
            }
        };
        creatorCustomReflowSnapshots.set(win, snapshot);
    }

    const preserveTransformCenter = centeredByTransform && !centeredByInlineWidth && !centeredByRenderedWidth;
    const nextWidth = `${targetWidth}px`;
    const nextMargin = preserveTransformCenter ? marginValue : `${-(targetWidth / 2)}px`;
    win.style.setProperty('width', nextWidth, 'important');
    if (!preserveTransformCenter) win.style.setProperty('margin-left', nextMargin, 'important');
    if (win.dataset) {
        win.dataset.yspCreatorReflowWidth = nextWidth;
        win.dataset.yspCreatorReflowMargin = nextMargin;
    }
    return true;
}

function requestFontFamilyLoad(fontFamily) {
    if (!document.fonts || !fontFamily) return;
    const primaryFamily = getPrimaryFontFamilyName(fontFamily);
    if (!primaryFamily) return;
    try {
        document.fonts.load(`700 24px "${primaryFamily}"`).catch(() => {});
    } catch (_) {}
}

function ensureSubtitleFontAssetsLoaded(ar, en) {
    if (!document.getElementById('ysp-subtitle-fonts')) {
        const fontLink = document.createElement('link');
        fontLink.id = 'ysp-subtitle-fonts';
        fontLink.rel = 'stylesheet';
        fontLink.href = SUBTITLE_FONT_STYLESHEET_URL;
        const parent = document.head || document.documentElement;
        if (parent) parent.appendChild(fontLink);
        if (!document.head) {
            document.addEventListener('DOMContentLoaded', () => {
                const existing = document.getElementById('ysp-subtitle-fonts');
                if (existing && document.head && existing.parentNode !== document.head) {
                    document.head.appendChild(existing);
                }
            }, { once: true });
        }
    }

    [ar, en].forEach(settings => {
        loadCustomSubtitleFont(settings);
        requestFontFamilyLoad(settings && getEffectiveSubtitleFontFamily(settings.fontFamily));
    });
}

function clearCaptionRuntimeState() {
    creatorCustomTrackMemory = new WeakMap();
    creatorCustomFallbackMemory = new WeakMap();
    const captionPlayers = new Set(Array.from(document.querySelectorAll('.html5-video-player')));
    const activeCaptionPlayer = getYouTubePlayer();
    if (activeCaptionPlayer) captionPlayers.add(activeCaptionPlayer);
    captionPlayers.forEach(clearPlayerCaptionProfileState);
    playerCaptionProfileMemory = new WeakMap();
    if (captionTrackRefreshTimer) {
        clearTimeout(captionTrackRefreshTimer);
        captionTrackRefreshTimer = null;
    }
    ['video', 'shorts'].forEach(surface => {
        stableCaptionDragPositions[surface].ar = null;
        stableCaptionDragPositions[surface].en = null;
    });
    const selector = '.ytp-caption-window-container, .ytp-caption-window, .caption-window';
    document.querySelectorAll(selector).forEach(win => {
        if (win.yspTimeout) {
            clearTimeout(win.yspTimeout);
            win.yspTimeout = null;
        }
        if (win.yspPhraseTimeout) {
            clearTimeout(win.yspPhraseTimeout);
            win.yspPhraseTimeout = null;
        }
        if (win.yspCaptionLanguagePendingTimeout) {
            clearTimeout(win.yspCaptionLanguagePendingTimeout);
            win.yspCaptionLanguagePendingTimeout = null;
        }
        clearCaptionFontFamilyInline(win);
        clearCreatorCustomCaptionReflow(win);
        if (win.classList.contains('ysp-stable-caption-position')) {
            if (win.dataset.yspDragOffsetX !== undefined || win.dataset.yspDragOffsetY !== undefined) {
                win.style.removeProperty('transform');
                delete win.dataset.yspDragOffsetX;
                delete win.dataset.yspDragOffsetY;
            }
            win.querySelectorAll('.captions-text').forEach(text => {
                text.style.removeProperty('transform');
                delete text.dataset.yspDragOffsetX;
                delete text.dataset.yspDragOffsetY;
            });
        }
        win.classList.remove('ysp-delayed', 'ysp-delay-ready', 'ysp-smart-hide', 'ysp-phrase-overlay-active', 'ysp-typewriter-overlay-active', 'ysp-caption-layout-root', 'ysp-active-shorts-playback', 'ysp-auto-translated-caption', 'ysp-native-drag-disabled', 'ysp-native-caption-dragged', 'ysp-native-caption-hit-target', 'ysp-stable-caption-position', 'ysp-caption-language-pending', 'is-arabic', 'is-english', 'has-custom-subtitles');
        win.querySelectorAll('.ysp-native-caption-hit-layer').forEach(layer => layer.remove());
        Object.keys(win.dataset || {}).forEach(key => {
            if (key.startsWith('ysp')) delete win.dataset[key];
        });
        const overlay = win.querySelector(':scope > .ysp-phrase-overlay');
        if (overlay) overlay.textContent = '';
        win.querySelectorAll('.captions-text, .caption-visual-line, .ytp-caption-segment').forEach(node => {
            node.classList.remove('ysp-caption-style-target', 'ytp-custom-active', 'ysp-rollup-history-hidden', 'ysp-rollup-first-visible');
        });
    });
}

function getYouTubePlayer() {
    const shortsVideoId = getShortsRouteVideoId();
    if (shortsVideoId) {
        const candidates = Array.from(new Set(document.querySelectorAll('#shorts-player, .html5-video-player'))).filter(player =>
            player && (player.id === 'shorts-player' ||
                (player.closest && player.closest('ytd-reel-video-renderer, .ytp-reel-video-player, ytd-shorts')))
        );
        const isActiveShortsCandidate = player => {
            const renderer = player && player.closest && player.closest('ytd-reel-video-renderer');
            if (!renderer || renderer.getAttribute('aria-hidden') === 'true') return false;
            if (renderer.hasAttribute('is-active') || renderer.hasAttribute('active')) return true;
            if (typeof player.checkVisibility === 'function') {
                try { return player.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }); } catch (_) { }
            }
            return player.id === 'shorts-player';
        };
        const exactVideoPlayers = candidates.filter(player => safePlayerCall(() => {
            if (typeof player.getVideoData !== 'function') return false;
            const data = player.getVideoData();
            return String(data && (data.video_id || data.videoId) || '') === shortsVideoId;
        }, false));
        const activeExactPlayer = exactVideoPlayers.find(isActiveShortsCandidate);
        if (activeExactPlayer) return activeExactPlayer;

        const routeLinkedPlayers = candidates.filter(player => {
            const renderer = player.closest && player.closest('ytd-reel-video-renderer');
            if (!renderer || !renderer.querySelectorAll) return false;
            return Array.from(renderer.querySelectorAll('a[href*="/shorts/"]')).some(link => {
                try {
                    return getShortsRouteVideoId(new URL(link.href, location.href).pathname) === shortsVideoId;
                } catch (_) {
                    return false;
                }
            });
        });
        const activeRouteLinkedPlayer = routeLinkedPlayers.find(isActiveShortsCandidate);
        if (activeRouteLinkedPlayer) return activeRouteLinkedPlayer;

        const activePlayer = candidates.find(isActiveShortsCandidate);
        if (activePlayer) return activePlayer;

        // A hidden exact match can be the renderer YouTube is retiring while the
        // visible route-linked player is still refreshing getVideoData(). Keep
        // hidden candidates only as a last resort after every active signal.
        return exactVideoPlayers[0] || routeLinkedPlayers[0] || null;
    }

    return document.getElementById('movie_player') ||
        document.querySelector('ytd-watch-flexy .html5-video-player') ||
        document.querySelector('.html5-video-player:not(#shorts-player)');
}

function safePlayerCall(fn, fallback) {
    try {
        return fn();
    } catch (e) {
        return fallback;
    }
}

function asArray(value) {
    return Array.isArray(value) ? value : [];
}

function getCaptionTrackList(player) {
    if (!player) return [];
    const direct = safePlayerCall(() => player.getOption && player.getOption('captions', 'tracklist'), null);
    if (Array.isArray(direct)) return direct;

    const captionsOption = safePlayerCall(() => player.getOption && player.getOption('captions'), null);
    if (captionsOption && Array.isArray(captionsOption.tracklist)) return captionsOption.tracklist;

    const responseTracks = safePlayerCall(() => (
        player.getPlayerResponse &&
        player.getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.captionTracks
    ), null);
    return asArray(responseTracks);
}

function getSelectedCaptionTrack(player) {
    if (!player) return null;
    const captionsOption = safePlayerCall(() => player.getOption && player.getOption('captions'), null);
    const translationLanguage = safePlayerCall(() => player.getOption && (
        player.getOption('captions', 'translationLanguage') ||
        player.getOption('captions', 'translationLanguageCode') ||
        player.getOption('captions', 'translation')
    ), null) ||
        (captionsOption && (
            captionsOption.translationLanguage ||
            captionsOption.translationLanguageCode ||
            captionsOption.translation ||
            captionsOption.targetLanguage ||
            captionsOption.targetLanguageCode
        ));
    const withTranslationMetadata = (track) => {
        if (!track || !translationLanguage || getCaptionTrackTranslationText(track)) return track;
        if (typeof translationLanguage === 'string') {
            return { ...track, translationLanguageCode: translationLanguage };
        }
        return { ...track, translationLanguage };
    };

    const direct = safePlayerCall(() => player.getOption && player.getOption('captions', 'track'), null);
    if (direct) return withTranslationMetadata(direct);

    if (captionsOption && captionsOption.track) return withTranslationMetadata(captionsOption.track);

    const selected = getCaptionTrackList(player).find(track => track && (track.isSelected || track.is_default || track.selected)) || null;
    return withTranslationMetadata(selected);
}

function getCaptionTrackNameText(track) {
    if (!track) return '';
    const name = track.name || track.displayName || track.label;
    if (typeof name === 'string') return name;
    if (name && typeof name.simpleText === 'string') return name.simpleText;
    if (name && Array.isArray(name.runs)) return name.runs.map(run => run && run.text ? run.text : '').join(' ');
    return '';
}

function readCaptionTrackTextValue(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value.simpleText === 'string') return value.simpleText;
    if (Array.isArray(value.runs)) return value.runs.map(run => run && run.text ? run.text : '').join(' ');
    return '';
}

function getCaptionTrackTranslationText(track) {
    if (!track) return '';
    const translation = track.translationLanguage || track.translation_language || track.translation || track.targetLanguage || track.target_language;
    const parts = [
        track.translationLanguageCode,
        track.translation_language_code,
        track.targetLanguageCode,
        track.target_language_code
    ];
    if (translation && typeof translation === 'object') {
        parts.push(
            translation.languageCode,
            translation.language_code,
            translation.id,
            translation.vssId || translation.vss_id,
            readCaptionTrackTextValue(translation.languageName),
            readCaptionTrackTextValue(translation.name),
            readCaptionTrackTextValue(translation.displayName),
            readCaptionTrackTextValue(translation.label)
        );
    } else if (translation) {
        parts.push(translation);
    }
    return parts.map(part => normalizeCaptionText(part)).filter(Boolean).join('|').toLowerCase();
}

function isCaptionTrackAutoTranslated(track) {
    if (!track) return false;
    if (getCaptionTrackTranslationText(track)) return true;
    if (track.isTranslation || track.isTranslated || track.translated || track.translationEnabled) return true;
    const name = getCaptionTrackNameText(track).toLowerCase();
    if (!name) return false;
    if (/\bauto[-\s]?translate\b|ترجمة\s+تلقائية|مترجم\s+تلقائ/i.test(name)) return true;
    const hasDirectionMarker = /(?:>>|<<|→|←|⇒|⇐)/.test(name);
    const hasGeneratedSource = /auto[-\s]?generated|automatic|asr|تم\s+إنشاؤها\s+تلقائ|منشأة\s+تلقائ|تلقائياً|تلقائيا/i.test(name);
    return hasDirectionMarker && hasGeneratedSource;
}

function getCaptionTrackLanguageCode(track) {
    if (!track) return '';
    return normalizeCaptionText(track.languageCode || track.language_code || track.lang || track.language || '').toLowerCase();
}

function isLikelyAutoTranslatedCaptionTextForTrack(track, captionText) {
    const text = String(captionText || '');
    if (!text || !/[\u0600-\u06FF]/.test(text)) return false;
    if (!track) return false;

    const languageCode = getCaptionTrackLanguageCode(track);
    if (!languageCode) return false;
    if (/^(ar|ar-|arabic|العربية)/i.test(languageCode)) return false;

    const name = getCaptionTrackNameText(track).toLowerCase();
    const sourceLooksGenerated = String(track.kind || '').toLowerCase() === 'asr' ||
        /auto[-\s]?generated|automatic|asr|تم\s+إنشاؤها\s+تلقائ|منشأة\s+تلقائ|تلقائياً|تلقائيا/i.test(name);

    // YouTube sometimes exposes the selected source ASR track through the player API
    // even while the visible caption window contains translated Arabic text. Treat
    // that window as standard auto-translate so user styling/centering still applies.
    return sourceLooksGenerated;
}

function getCaptionTrackDisplayLanguageBucket(track) {
    if (!track) return '';
    // Auto-translate keeps the source track in several YouTube player builds, so
    // prefer the target/translation metadata whenever it is available.
    const translation = getCaptionTrackTranslationText(track);
    const source = [
        getCaptionTrackLanguageCode(track),
        getCaptionTrackNameText(track)
    ].map(value => normalizeCaptionText(value)).filter(Boolean).join('|').toLowerCase();
    const value = translation || source;
    if (!value) return '';
    if (/(^|[|:_-])ar(?:[|:_-]|$)|arabic|العربية|عربي/i.test(value)) return 'ar';
    // Every other known YouTube language uses the non-Arabic profile. This also
    // keeps CJK, Cyrillic, Hebrew, numbers and emoji captions visible.
    return 'en';
}

function getCaptionTrackIdentity(track) {
    if (!track) return '';
    const translationText = getCaptionTrackTranslationText(track);
    const parts = [
        track.languageCode,
        track.vssId || track.vss_id,
        track.kind,
        track.id,
        track.trackName,
        getCaptionTrackNameText(track),
        translationText ? `translation:${translationText}` : ''
    ].map(part => normalizeCaptionText(part)).filter(Boolean);
    return parts.join('|').toLowerCase();
}

function getCaptionOwnerVideoKey(player) {
    const playerVideoId = safePlayerCall(() => {
        if (!player || typeof player.getVideoData !== 'function') return '';
        const data = player.getVideoData();
        return data && (data.video_id || data.videoId) ? String(data.video_id || data.videoId) : '';
    }, '');
    const routeKey = getCurrentVideoKey();
    const normalizedRouteKey = String(routeKey || '').replace(/^(?:watch|shorts):/, '');
    return playerVideoId || normalizedRouteKey;
}

function getCurrentCaptionTrackKey(track, player = getYouTubePlayer()) {
    const selectedTrack = track || getSelectedCaptionTrack(player);
    const trackIdentity = getCaptionTrackIdentity(selectedTrack);
    const ownerVideoKey = getCaptionOwnerVideoKey(player);
    return trackIdentity && ownerVideoKey ? `${ownerVideoKey}::${trackIdentity}` : '';
}

function getCaptionLanguageBucket(text) {
    return getCaptionProfileLanguageEvidence(text) || 'other';
}

function areCaptionTrackKeysCompatible(previousKey, nextKey) {
    if (!previousKey || !nextKey) return true;
    if (previousKey === nextKey) return true;
    const splitKey = key => {
        const separator = String(key).indexOf('::');
        if (separator < 0) return { video: '', tokens: [String(key)] };
        return {
            video: String(key).slice(0, separator),
            tokens: String(key).slice(separator + 2).split('|').map(token => token.trim()).filter(Boolean)
        };
    };
    const previous = splitKey(previousKey);
    const next = splitKey(nextKey);
    if (previous.video !== next.video) return false;
    const previousTokens = new Set(previous.tokens);
    const nextTokens = new Set(next.tokens);
    const smaller = previousTokens.size <= nextTokens.size ? previousTokens : nextTokens;
    const larger = smaller === previousTokens ? nextTokens : previousTokens;
    return smaller.size > 0 && Array.from(smaller).every(token => larger.has(token));
}

function areKnownCaptionTrackKeysCompatible(previousKey, nextKey) {
    return !!previousKey && !!nextKey && areCaptionTrackKeysCompatible(previousKey, nextKey);
}

function canReuseCaptionProfileTrack(rememberedKey, currentKey) {
    // A known remembered key may bridge the temporary metadata-free CC Off state.
    // The inverse is unsafe: an unidentified old cue must never claim whichever
    // concrete track YouTube exposes later after a language/track switch.
    if (rememberedKey && !currentKey) return true;
    if (!rememberedKey && currentKey) return false;
    if (!rememberedKey && !currentKey) return true;
    return areCaptionTrackKeysCompatible(rememberedKey, currentKey);
}

function clearPlayerCaptionProfileState(player) {
    if (!player) return false;
    const hadRememberedState = playerCaptionProfileMemory.has(player);
    playerCaptionProfileMemory.delete(player);
    return hadRememberedState;
}

function rememberPlayerCaptionProfileState(player, nextState) {
    if (!player || !nextState) return false;
    const language = nextState.language === 'ar' ? 'ar' : (nextState.language === 'en' ? 'en' : '');
    const videoKey = getCaptionOwnerVideoKey(player);
    if (!language || !videoKey) return false;

    const trackKey = nextState.trackKey || getCurrentCaptionTrackKey(null, player) || '';
    const previousState = playerCaptionProfileMemory.get(player);
    const creatorStateDominates = !!previousState &&
        previousState.mode === 'creator' &&
        previousState.videoKey === videoKey &&
        areKnownCaptionTrackKeysCompatible(previousState.trackKey, trackKey);
    // A creator-authored root is authoritative for the whole active track. A
    // standard-looking sibling (or a transient YouTube placeholder) must not
    // rewrite any part of that decision, including its language/track metadata.
    if (creatorStateDominates && nextState.mode !== 'creator') return previousState;
    const mode = nextState.mode === 'creator' ? 'creator' : 'standard';
    const state = {
        language,
        mode,
        videoKey,
        trackKey
    };
    if (previousState &&
        previousState.language === state.language &&
        previousState.mode === state.mode &&
        previousState.videoKey === state.videoKey &&
        previousState.trackKey === state.trackKey) {
        return previousState;
    }
    playerCaptionProfileMemory.set(player, state);
    return state;
}

function getReusablePlayerCaptionProfileState(player, selectedTrack) {
    if (!player) return null;
    const state = playerCaptionProfileMemory.get(player);
    if (!state) return null;

    const currentVideoKey = getCaptionOwnerVideoKey(player);
    const currentTrackKey = getCurrentCaptionTrackKey(selectedTrack || null, player);
    const sameVideo = !!currentVideoKey && state.videoKey === currentVideoKey;
    const sameTrack = canReuseCaptionProfileTrack(state.trackKey, currentTrackKey);
    if (!sameVideo || !sameTrack) {
        clearPlayerCaptionProfileState(player);
        return null;
    }
    return state.mode === 'standard' ? state : null;
}

function getCaptionProfileLanguageEvidence(text) {
    const letters = Array.from(String(text || '')).filter(character => /\p{L}/u.test(character));
    if (!letters.length) return '';
    return letters.some(character => /\p{Script=Arabic}/u.test(character)) ? 'ar' : 'en';
}

function isCaptionProfileEvidenceNodeVisible(node, boundary = null) {
    if (!node || node.isConnected === false) return false;

    const isHiddenStyle = style => {
        if (!style) return false;
        const read = property => {
            const value = style.getPropertyValue
                ? style.getPropertyValue(property)
                : style[property];
            return String(value == null ? '' : value).trim().toLowerCase();
        };
        const display = read('display');
        const visibility = read('visibility');
        const opacityText = read('opacity');
        const opacity = opacityText === '' ? 1 : Number.parseFloat(opacityText);
        return display === 'none' || visibility === 'hidden' || visibility === 'collapse' ||
            (Number.isFinite(opacity) && opacity <= 0);
    };

    let current = node;
    while (current) {
        if (isHiddenStyle(current.style)) return false;
        if (current === boundary) break;
        current = current.parentElement;
    }

    let visibilityApiChecked = false;
    if (typeof node.checkVisibility === 'function') {
        try {
            if (!node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false;
            visibilityApiChecked = true;
        } catch (_) { }
    }
    if (!visibilityApiChecked) {
        current = node;
        while (current) {
            const view = current.ownerDocument && current.ownerDocument.defaultView;
            const readComputedStyle = view && typeof view.getComputedStyle === 'function'
                ? view.getComputedStyle.bind(view)
                : (typeof getComputedStyle === 'function' ? getComputedStyle : null);
            if (readComputedStyle) {
                try {
                    if (isHiddenStyle(readComputedStyle(current))) return false;
                } catch (_) { }
            }
            if (current === boundary) break;
            current = current.parentElement;
        }
    }
    if (typeof node.getClientRects === 'function') {
        try {
            if (node.getClientRects().length === 0) return false;
        } catch (_) { }
    }
    return true;
}

function isCaptionProfileEvidenceRoot(root, player, options = {}) {
    if (!root || !player || root.isConnected === false) return false;
    if (!options.isPlaybackContext || options.isPreviewSurface) return false;
    if (getCaptionPlayer(root) !== player) return false;
    if (getYouTubePlayer() !== player) return false;
    if (root.closest && root.closest(
        `${YSP_CAPTION_PREVIEW_SELECTOR}, [hidden], [aria-hidden="true"], ` +
        '.ysp-smart-hide, .ysp-caption-notice-hidden, .ysp-rollup-history-hidden, .ysp-empty-caption-segment'
    )) return false;

    return isCaptionProfileEvidenceNodeVisible(root, player);
}

function addPlayerCaptionProfileEvidence(evidenceByPlayer, player, evidence) {
    if (!evidenceByPlayer || !player || !evidence || !evidence.language) return false;
    const current = evidenceByPlayer.get(player) || [];
    current.push(evidence);
    evidenceByPlayer.set(player, current);
    return true;
}

function commitPlayerCaptionProfileEvidence(evidenceByPlayer) {
    let committed = 0;
    if (!evidenceByPlayer || typeof evidenceByPlayer.forEach !== 'function') return committed;
    evidenceByPlayer.forEach((candidates, player) => {
        const valid = Array.from(candidates || []).filter(candidate =>
            candidate && (candidate.language === 'ar' || candidate.language === 'en')
        );
        const languages = new Set(valid.map(candidate => candidate.language));
        if (languages.size !== 1) return;

        const trackKeys = valid.map(candidate => candidate.trackKey).filter(Boolean);
        const compatibleTrack = trackKeys.every(key =>
            trackKeys.every(otherKey => areCaptionTrackKeysCompatible(key, otherKey))
        );
        if (!compatibleTrack) return;

        const state = rememberPlayerCaptionProfileState(player, {
            language: valid[0].language,
            mode: valid.some(candidate => candidate.mode === 'creator') ? 'creator' : 'standard',
            trackKey: trackKeys[0] || ''
        });
        if (state) committed += 1;
    });
    return committed;
}

function getPlayerCaptionProfileInheritancePlan(player, roots) {
    const selectedTrack = getSelectedCaptionTrack(player);
    const state = getReusablePlayerCaptionProfileState(player, selectedTrack);
    if (!state) return null;

    const targets = Array.from(roots || []).filter(root => {
        if (!root || !root.classList) return false;
        if (root.closest && root.closest(YSP_CAPTION_PREVIEW_SELECTOR)) return false;
        if (root.classList.contains('has-custom-subtitles')) return false;
        const hasExpectedLanguage = state.language === 'ar'
            ? root.classList.contains('is-arabic') && !root.classList.contains('is-english')
            : root.classList.contains('is-english') && !root.classList.contains('is-arabic');
        return !root.classList.contains('ysp-caption-layout-root') ||
            !hasExpectedLanguage ||
            root.classList.contains('ysp-caption-language-pending');
    });
    return targets.length ? { state, targets } : null;
}

function applyPlayerCaptionProfileInheritance(plan) {
    if (!plan || !plan.state || !plan.targets || !plan.targets.length) return false;
    plan.targets.forEach(root => {
        root.classList.add('ysp-caption-layout-root');
        root.classList.toggle('is-arabic', plan.state.language === 'ar');
        root.classList.toggle('is-english', plan.state.language === 'en');
        root.classList.remove('ysp-caption-language-pending');
    });
    return true;
}

function inheritPlayerCaptionProfileToRoots(player, roots) {
    return applyPlayerCaptionProfileInheritance(getPlayerCaptionProfileInheritancePlan(player, roots));
}

function rememberCreatorCustomCaptionTrack(player, trackKey, languageBucket = 'other') {
    if (!player) return false;
    const videoKey = getCaptionOwnerVideoKey(player);
    if (!videoKey) return false;
    if (trackKey) {
        let remembered = creatorCustomTrackMemory.get(player);
        if (!remembered) {
            remembered = new Set();
            creatorCustomTrackMemory.set(player, remembered);
        }
        remembered.add(trackKey);
        // Keep a short promotion window as YouTube commonly exposes the same track
        // first without metadata, then with language/vssId/name fields populated.
        creatorCustomFallbackMemory.set(player, {
            videoKey,
            languageBucket,
            trackKey,
            expiresAt: Date.now() + CREATOR_CUSTOM_FALLBACK_MEMORY_MS
        });
        return true;
    }
    creatorCustomFallbackMemory.set(player, {
        videoKey,
        languageBucket,
        trackKey: '',
        expiresAt: Date.now() + CREATOR_CUSTOM_FALLBACK_MEMORY_MS
    });
    return true;
}

function hasRememberedCreatorCustomCaptionTrack(player, trackKey, languageBucket = 'other') {
    if (!player) return false;
    if (trackKey) {
        const remembered = creatorCustomTrackMemory.get(player);
        if (remembered && remembered.has(trackKey)) return true;
    }
    const fallback = creatorCustomFallbackMemory.get(player);
    if (!fallback) return false;
    const compatibleKeys = canReuseCaptionProfileTrack(fallback.trackKey, trackKey);
    const requiresLanguageMatch = !fallback.trackKey || !trackKey;
    const valid = fallback.videoKey === getCaptionOwnerVideoKey(player) &&
        compatibleKeys &&
        (!requiresLanguageMatch || fallback.languageBucket === languageBucket) &&
        fallback.expiresAt >= Date.now();
    if (!valid) creatorCustomFallbackMemory.delete(player);
    // Promote only a compatible earlier exact key. A metadata-free fallback may
    // temporarily bridge root replacement, but must not permanently bless whichever
    // same-language track the user happens to select during that short window.
    if (valid && fallback.trackKey && trackKey) {
        let remembered = creatorCustomTrackMemory.get(player);
        if (!remembered) {
            remembered = new Set();
            creatorCustomTrackMemory.set(player, remembered);
        }
        remembered.add(trackKey);
    }
    return valid;
}

function clearCreatorCustomCaptionFallback(player) {
    if (player) creatorCustomFallbackMemory.delete(player);
}

function clearStaleCreatorCustomCaptionState(relatedNodes, segments, win, currentCaptionTrackKey) {
    let clearedStaleTrack = false;
    Array.from(relatedNodes || []).forEach(node => {
        const rememberedTrack = node && node.dataset ? node.dataset.yspCreatorCustomTrack : '';
        if (!rememberedTrack) return;
        if (!currentCaptionTrackKey || rememberedTrack !== currentCaptionTrackKey) {
            delete node.dataset.yspCreatorCustomTrack;
            if (node.classList) node.classList.remove('has-custom-subtitles');
            clearedStaleTrack = true;
        }
    });

    if (!clearedStaleTrack) return false;

    Array.from(segments || []).forEach(segment => {
        if (segment && segment.classList) segment.classList.remove('ytp-custom-active');
    });
    if (win && win.querySelectorAll) {
        win.querySelectorAll('.captions-text, .caption-visual-line').forEach(node => node.classList.remove('ytp-custom-active'));
    }
    return true;
}

function handleVideoNavigation(reason = 'navigation') {
    const nextVideoKey = getCurrentVideoKey();
    if (nextVideoKey === lastVideoKey && reason !== 'force') return false;

    if (reason === 'yt-navigate-start') {
        clearCaptionRuntimeState();
        return true;
    }

    lastVideoKey = nextVideoKey;
    clearCaptionRuntimeState();
    const nextSurface = getShortsRouteVideoId() ? 'shorts' : 'video';
    if (panelVisible && nextSurface !== editSurface) {
        editSurface = nextSurface;
        selectedTemplateName = null;
        pendingOverwrite = null;
        updatePanelValues();
    }
    updateCachedSubtitleStyles();
    return true;
}

function scheduleCaptionTrackRefresh() {
    if (captionTrackRefreshTimer) clearTimeout(captionTrackRefreshTimer);
    const player = getYouTubePlayer();
    const previousTrackKey = getCurrentCaptionTrackKey(null, player);
    // A radio-menu selection is a track/settings boundary, never a CC Off/On
    // root replacement. Drop only the short metadata-free creator bridge now so
    // an old creator track cannot own cue one of a newly selected standard track.
    // Exact creator-track memory and the user's standard profile remain intact.
    clearCreatorCustomCaptionFallback(player);
    captionTrackRefreshTimer = setTimeout(() => {
        captionTrackRefreshTimer = null;
        const currentPlayer = getYouTubePlayer();
        const nextTrackKey = getCurrentCaptionTrackKey(null, currentPlayer);
        // YouTube uses menuitemradio for captions, quality and speed. Only a
        // confirmed caption-track identity change may invalidate this player.
        // A missing key is the normal CC Off state and must retain the profile.
        if (player && currentPlayer === player && previousTrackKey && nextTrackKey &&
            !areCaptionTrackKeysCompatible(previousTrackKey, nextTrackKey)) {
            clearPlayerCaptionProfileState(player);
            clearCreatorCustomCaptionFallback(player);
        }
        runImmediateCaptionMutationPass();
    }, 160);
}

function initCaptionTrackSelectionRecovery() {
    if (window.__yspCaptionTrackSelectionRecovery) return;
    window.__yspCaptionTrackSelectionRecovery = true;
    document.addEventListener('click', event => {
        const target = event.target;
        const menuItem = target && target.closest ? target.closest('.ytp-menuitem') : null;
        if (!menuItem || menuItem.getAttribute('role') !== 'menuitemradio') return;
        scheduleCaptionTrackRefresh();
    }, true);
}
// Silently swallow "Extension context invalidated" so it doesn't spam the console.
window.addEventListener('error', (e) => {
    const msg = String(e && (e.message || e.error?.message) || '');
    if (msg.includes('Extension context invalidated')) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}, true);
window.addEventListener('unhandledrejection', (e) => {
    const msg = String(e && (e.reason?.message || e.reason) || '');
    if (msg.includes('Extension context invalidated')) {
        e.preventDefault();
    }
});

const UI_ARABIC_FONT_URLS = {
    400: safeGetExtensionURL('fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Regular.woff2'),
    500: safeGetExtensionURL('fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Medium.woff2'),
    600: safeGetExtensionURL('fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-SemiBold.woff2'),
    700: safeGetExtensionURL('fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Bold.woff2')
};
const loadedUiArabicFontWeights = new Set();
let uiArabicFontLoadPromise = null;

async function ensurePackagedUiArabicFont() {
    if (!document.fonts || typeof FontFace !== 'function') return;
    if (uiArabicFontLoadPromise) return uiArabicFontLoadPromise;

    uiArabicFontLoadPromise = Promise.all(Object.entries(UI_ARABIC_FONT_URLS).map(async ([weight, url]) => {
        if (!url || loadedUiArabicFontWeights.has(weight)) return;
        try {
            const response = await fetch(url);
            if (!response.ok) return;
            const bytes = await response.arrayBuffer();
            const face = new FontFace('IBM Plex Sans Arabic', bytes, {
                style: 'normal',
                weight,
                display: 'swap'
            });
            const loadedFace = await face.load();
            document.fonts.add(loadedFace);
            loadedUiArabicFontWeights.add(weight);
        } catch (_) {
            // Segoe UI/Tahoma remain readable fallbacks if an old extension
            // context is reloaded while Chrome is updating the unpacked files.
        }
    }));

    return uiArabicFontLoadPromise;
}

const panelCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
    @font-face { font-family: 'IBM Plex Sans Arabic'; src: url('${UI_ARABIC_FONT_URLS[400]}') format('woff2'); font-style: normal; font-weight: 400; font-display: swap; }
    @font-face { font-family: 'IBM Plex Sans Arabic'; src: url('${UI_ARABIC_FONT_URLS[500]}') format('woff2'); font-style: normal; font-weight: 500; font-display: swap; }
    @font-face { font-family: 'IBM Plex Sans Arabic'; src: url('${UI_ARABIC_FONT_URLS[600]}') format('woff2'); font-style: normal; font-weight: 600; font-display: swap; }
    @font-face { font-family: 'IBM Plex Sans Arabic'; src: url('${UI_ARABIC_FONT_URLS[700]}') format('woff2'); font-style: normal; font-weight: 700; font-display: swap; }

    #ysp-panel-container,
    #ysp-whatsnew-overlay {
        color-scheme: dark;
        --ysp-bg: #0d0d10;
        --ysp-bg-sec: #151518;
        --ysp-bg-strong: #1d1d22;
        --ysp-bg-hover: #27272d;
        --ysp-border: #313138;
        --ysp-border-strong: #45454e;
        --ysp-accent: #FC0235;
        --ysp-accent-deep: #C9012A;
        --ysp-accent-soft: rgba(252, 2, 53, 0.12);
        --ysp-accent-glow: rgba(252, 2, 53, 0.22);
        --ysp-accent-2: #FFD700;
        --ysp-accent-2-soft: rgba(255, 215, 0, 0.12);
        --ysp-accent-2-text: #FFE66A;
        --ysp-focus: var(--ysp-accent);
        --ysp-gold: var(--ysp-accent-2);
        --ysp-gold-glow: rgba(255, 215, 0, 0.20);
        --ysp-blue: var(--ysp-accent-2);
        --ysp-text: #f7f7f8;
        --ysp-text-sec: #aaaab3;
        --ysp-text-faint: #777780;
        --ysp-on-accent: #ffffff;
        --ysp-overlay: rgba(5, 4, 8, 0.72);
        --ysp-radius: 12px;
        --ysp-radius-sm: 9px;
        --ysp-radius-pill: 999px;
        --ysp-font-ui: Roboto, Arial, Helvetica, sans-serif;
        --ysp-font-ar: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif;
        --ysp-font-en: var(--ysp-font-ui);
        --ysp-shadow: 0 18px 48px rgba(0, 0, 0, 0.46);
        --ysp-shadow-soft: 0 2px 10px rgba(0, 0, 0, 0.20);
        --ysp-shadow-glow-red: 0 0 0 3px rgba(252, 2, 53, 0.12);
        --ysp-bg-gradient: none;
        --ysp-transition: 0.16s ease;
        --ysp-spring: 0.22s ease;
    }

    #ysp-panel-container[data-ysp-theme="light"],
    #ysp-whatsnew-overlay[data-ysp-theme="light"] {
        color-scheme: light;
        --ysp-bg: #f7f7f8;
        --ysp-bg-sec: #ffffff;
        --ysp-bg-strong: #f1f1f3;
        --ysp-bg-hover: #e9e9ec;
        --ysp-border: #dedee3;
        --ysp-border-strong: #c9c9d0;
        --ysp-text: #1d1d22;
        --ysp-text-sec: #66666f;
        --ysp-text-faint: #8c8c95;
        --ysp-accent-soft: rgba(252, 2, 53, 0.08);
        --ysp-accent-2-soft: rgba(255, 215, 0, 0.22);
        --ysp-accent-2-text: #6B4E00;
        --ysp-focus: var(--ysp-accent-deep);
        --ysp-overlay: rgba(18, 18, 20, 0.52);
        --ysp-shadow: 0 18px 48px rgba(28, 28, 32, 0.18);
        --ysp-shadow-soft: 0 2px 10px rgba(28, 28, 32, 0.08);
    }

    #ysp-panel-container {
        position: fixed !important;
        top: 0 !important;
        width: 400px !important;
        height: 100vh !important;
        background: var(--ysp-bg) !important;
        background-image: var(--ysp-bg-gradient) !important;
        box-shadow: var(--ysp-shadow) !important;
        z-index: 2147483647 !important;
        font-family: var(--ysp-font-en) !important;
        display: flex !important;
        flex-direction: column !important;
        color: var(--ysp-text);
        box-sizing: border-box;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        right: -420px !important;
        left: auto !important;
        border-left: 1px solid var(--ysp-border) !important;
        border-right: none !important;
        transition: right 0.35s cubic-bezier(0.2, 0, 0.2, 1), left 0.35s cubic-bezier(0.2, 0, 0.2, 1) !important;
    }

    /* Browser RTL mode controls which side the panel slides from. */
    #ysp-panel-container.ysp-browser-rtl {
        left: -420px !important;
        right: auto !important;
        border-right: 1px solid var(--ysp-border) !important;
        border-left: none !important;
    }

    /* Open States */
    #ysp-panel-container.ysp-open { /* Default LTR Open */
        right: 0 !important;
    }
    #ysp-panel-container.ysp-browser-rtl.ysp-open { /* Browser RTL Open */
        left: 0 !important;
        right: auto !important;
    }
    #ysp-panel-container.ysp-rtl {
        font-family: var(--ysp-font-ar) !important;
    }

    #ysp-panel-container * {
        box-sizing: border-box;
        font-family: inherit;
        outline: none;
        user-select: none;
    }

    /* --- HEADER --- */
    .ysp-header {
        position: relative;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--ysp-bg-sec);
        backdrop-filter: blur(24px) saturate(160%);
        -webkit-backdrop-filter: blur(24px) saturate(160%);
        border-bottom: 1px solid var(--ysp-border);
    }
    .ysp-header::after {
        content: '';
        position: absolute;
        inset: auto 0 0 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(252, 2, 53, 0.4), transparent);
    }
    .ysp-brand {
        font-size: 17px;
        font-weight: 800;
        color: var(--ysp-text);
        letter-spacing: 0.3px;
        display: flex; align-items: center; gap: 8px;
        direction: ltr;
    }
    .ysp-brand span {
        background: linear-gradient(135deg, var(--ysp-accent) 0%, var(--ysp-gold) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
    }
    .ysp-version-badge {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        margin-left: 4px;
        background: linear-gradient(135deg, var(--ysp-accent) 0%, var(--ysp-accent-deep) 100%);
        color: white;
        font-family: var(--ysp-font-en);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.5px;
        border-radius: var(--ysp-radius-pill);
        box-shadow: 0 2px 8px rgba(252, 2, 53, 0.45);
    }
    .ysp-close-btn {
        width: 32px; height: 32px;
        border-radius: var(--ysp-radius-sm);
        background: transparent;
        border: 1px solid transparent;
        color: var(--ysp-text-sec);
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: var(--ysp-transition);
    }
    .ysp-close-btn:hover { background: var(--ysp-bg-hover); color: white; transform: rotate(90deg); }
    .ysp-icon { width: 20px; height: 20px; fill: currentColor; }

    /* --- TABS --- */
    .ysp-tabs-wrapper {
        padding: 8px 20px 0;
    }
    .ysp-tabs {
        display: flex;
        background: var(--ysp-bg-strong);
        padding: 4px;
        border-radius: var(--ysp-radius);
        border: 1px solid var(--ysp-border);
        box-shadow: var(--ysp-shadow-soft);
    }
    .ysp-tab {
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 7px 0;
        font-size: 12px;
        font-weight: 600;
        color: var(--ysp-text-sec);
        cursor: pointer;
        border-radius: var(--ysp-radius-sm);
        transition: var(--ysp-transition);
        position: relative;
        text-align: center;
    }
    .ysp-tab-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        color: currentColor;
        flex-shrink: 0;
    }
    .ysp-tab-icon svg { width: 16px; height: 16px; display: block; }
    .ysp-tab-label { font-size: inherit; font-weight: inherit; }
    .ysp-tab:hover { color: var(--ysp-text); }
    .ysp-tab.active {
        background: linear-gradient(135deg, var(--ysp-accent) 0%, var(--ysp-accent-deep) 100%);
        color: white;
        font-weight: 700;
        box-shadow: 0 4px 14px var(--ysp-accent-glow);
        transform: translateY(-0.5px);
    }
    .ysp-tab.active .ysp-tab-icon { color: white; }

    /* --- TARGET BAR --- */
    .ysp-target-bar {
        margin: 10px 20px 0;
        display: flex; gap: 8px;
    }
    .ysp-target-btn {
        flex: 1; padding: 8px;
        text-align: center; font-size: 12px;
        background: transparent;
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius);
        color: var(--ysp-text-sec);
        cursor: pointer; transition: var(--ysp-transition);
        font-weight: 500;
        display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .ysp-target-btn:hover { border-color: rgba(255,255,255,0.3); color: white; }
    .ysp-target-btn.active {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--ysp-accent);
        color: var(--ysp-accent);
        font-weight: 700;
    }
    .ysp-surface-bar {
        margin: 10px 20px 0;
        padding: 8px;
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius);
        background: var(--ysp-bg-strong);
    }
    .ysp-surface-label {
        display: block;
        margin-bottom: 7px;
        color: var(--ysp-text-sec);
        font-size: 10px;
        font-weight: 700;
    }
    .ysp-surface-options { display: flex; gap: 7px; }
    .ysp-surface-btn {
        flex: 1;
        padding: 7px 8px;
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius-sm);
        background: transparent;
        color: var(--ysp-text-sec);
        font: inherit;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: var(--ysp-transition);
    }
    .ysp-surface-btn:hover { color: var(--ysp-text); border-color: rgba(255,255,255,0.3); }
    .ysp-surface-btn.active {
        color: #fff;
        border-color: var(--ysp-accent);
        background: var(--ysp-accent);
        box-shadow: 0 3px 10px rgba(252,2,53,0.24);
    }

    /* --- SETTINGS SEARCH / QUICK JUMP --- */
    .ysp-settings-search {
        margin: 10px 20px 0;
        position: relative;
    }
    .ysp-settings-search-field {
        position: relative;
        display: flex;
        align-items: center;
    }
    .ysp-settings-search-icon {
        position: absolute;
        inset-inline-start: 12px;
        width: 15px;
        height: 15px;
        color: var(--ysp-text-faint);
        pointer-events: none;
        z-index: 1;
    }
    .ysp-settings-search-input {
        width: 100%;
        padding-inline-start: 36px !important;
        padding-inline-end: 12px !important;
        background: rgba(255,255,255,0.045);
        border-color: var(--ysp-border-strong);
    }
    .ysp-rtl .ysp-settings-search-input {
        padding-inline-start: 36px !important;
        padding-inline-end: 12px !important;
    }
    .ysp-settings-search-results {
        margin-top: 6px;
        display: grid;
        gap: 6px;
    }
    .ysp-settings-search-results[hidden] {
        display: none !important;
    }
    .ysp-settings-search-result {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 10px;
        border: 1px solid var(--ysp-border);
        background: rgba(255,255,255,0.045);
        color: var(--ysp-text);
        cursor: pointer;
        text-align: start;
        transition: var(--ysp-transition);
    }
    .ysp-settings-search-result:hover {
        border-color: rgba(252, 2, 53, 0.45);
        background: rgba(252, 2, 53, 0.11);
        transform: translateY(-1px);
    }
    .ysp-settings-search-result-main {
        display: block;
        font-size: 12px;
        font-weight: 800;
        line-height: 1.25;
    }
    .ysp-settings-search-result-sub {
        display: block;
        margin-top: 2px;
        font-size: 10px;
        color: var(--ysp-text-sec);
        line-height: 1.25;
    }
    .ysp-settings-search-result-hint {
        flex: 0 0 auto;
        font-size: 9px;
        color: var(--ysp-text-faint);
        white-space: nowrap;
    }
    .ysp-settings-search-result.is-disabled,
    .ysp-settings-search-empty {
        cursor: default;
        border-color: rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.03);
        color: var(--ysp-text-sec);
    }
    .ysp-settings-search-result.is-disabled:hover,
    .ysp-settings-search-empty:hover {
        transform: none;
        border-color: rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.03);
    }
    .ysp-setting-jump-highlight {
        border-color: var(--ysp-accent) !important;
        background: rgba(252, 2, 53, 0.12) !important;
        box-shadow: 0 0 0 2px rgba(252, 2, 53, 0.18), 0 0 18px rgba(252, 2, 53, 0.18) !important;
        transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    }

    /* --- PREVIEW --- */
    .ysp-preview-card {
        margin: 12px 20px;
        height: 96px;
        border-radius: var(--ysp-radius);
        overflow: hidden;
        position: relative;
        border: 1px solid var(--ysp-border);
        background: #000;
        display: flex; align-items: center; justify-content: center;
        box-shadow: var(--ysp-shadow-soft);
    }
    /* Real-frame preview canvas (filled by JS from YouTube video) */
    .ysp-preview-card canvas.ysp-preview-frame {
        position: absolute; inset: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        z-index: 0;
    }
    /* Fallback animated gradient when no video frame is available */
    .ysp-preview-card::before {
        content: ""; position: absolute; inset: 0;
        background: linear-gradient(135deg, #17171b 0%, #281217 55%, #2b2615 100%);
        background-size: 300% 300%;
        animation: yspPreviewShift 14s ease-in-out infinite;
        z-index: 0;
    }
    .ysp-preview-card.has-frame::before { display: none; }
    @keyframes yspPreviewShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    .ysp-preview-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, transparent 60%);
        z-index: 1;
    }
    /* Live indicator pulse */
    .ysp-preview-badge {
        position: absolute;
        top: 7px;
        inset-inline-start: 10px;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(8px);
        color: #fff;
        font-family: var(--ysp-font-en);
        font-size: 9px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: var(--ysp-radius-pill);
        display: inline-flex;
        align-items: center;
        gap: 5px;
        z-index: 3;
        border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .ysp-preview-badge::before {
        content: '';
        width: 6px; height: 6px;
        background: var(--ysp-accent);
        border-radius: 50%;
        box-shadow: 0 0 8px var(--ysp-accent);
        animation: yspPulse 1.6s ease-in-out infinite;
    }
    @keyframes yspPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.85); }
    }
    .ysp-preview-text {
        position: relative; z-index: 2;
        text-align: center; padding: 0 20px;
        font-size: 18px; line-height: 1.25;
        text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    }

    /* --- CONTENT --- */
    .ysp-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px 20px;
        min-height: 0; /* Fix for flex scrolling */
    }
    .ysp-tab-content { display: none; }
    .ysp-tab-content.active { display: block; animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    /* --- CARDS & SECTIONS — glassmorphism --- */
    .ysp-card {
        background: var(--ysp-bg-sec);
        backdrop-filter: blur(20px) saturate(150%);
        -webkit-backdrop-filter: blur(20px) saturate(150%);
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius);
        padding: 18px;
        margin-bottom: 16px;
        box-shadow: var(--ysp-shadow-soft);
        transition: var(--ysp-transition);
    }
    .ysp-card:hover {
        border-color: var(--ysp-border-strong);
    }
    .ysp-section {
        margin-bottom: 22px;
    }
    .ysp-section:last-child {
        margin-bottom: 0;
    }
    .ysp-section-title {
        font-size: 13px;
        text-transform: uppercase;
        color: var(--ysp-text-sec);
        margin-bottom: 12px;
        font-weight: 700;
        letter-spacing: 1px;
    }

    /* --- CONTROLS --- */
    .ysp-row {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 14px;
        gap: 12px;
    }
    .ysp-row:last-child { margin-bottom: 0; }

    .ysp-label { font-size: 13px; color: var(--ysp-text); flex: 1; font-weight: 500; }

    /* Range Slider — gradient track + value chip */
    .ysp-range-wrap {
        flex: 2;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .ysp-input-range {
        -webkit-appearance: none;
        flex: 1;
        height: 6px;
        background: linear-gradient(90deg,
            rgba(252, 2, 53, 0.5) 0%,
            rgba(255, 215, 0, 0.4) 100%);
        border-radius: var(--ysp-radius-pill);
        outline: none;
        cursor: pointer;
    }
    .ysp-input-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px; height: 18px;
        background: linear-gradient(135deg, #fff 0%, #e8e8ec 100%);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid var(--ysp-accent);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        transition: transform 0.15s, box-shadow var(--ysp-transition);
    }
    .ysp-input-range::-webkit-slider-thumb:hover {
        transform: scale(1.18);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3),
                    0 0 0 6px rgba(252, 2, 53, 0.18);
    }
    .ysp-input-range::-webkit-slider-runnable-track {
        background: transparent;
    }
    .ysp-range-value {
        width: 48px;
        min-width: 48px;
        text-align: center;
        font-family: var(--ysp-font-en);
        font-size: 11.5px;
        font-weight: 700;
        color: var(--ysp-text);
        background: var(--ysp-bg-strong);
        padding: 4px 6px;
        border-radius: var(--ysp-radius-sm);
        border: 1px solid var(--ysp-border);
        outline: none;
        cursor: text;
        transition: var(--ysp-transition);
        -moz-appearance: textfield;
        appearance: textfield;
    }
    .ysp-range-value::-webkit-inner-spin-button,
    .ysp-range-value::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .ysp-range-value:hover {
        border-color: var(--ysp-border-strong);
        background: var(--ysp-bg-hover);
    }
    .ysp-range-value:focus {
        border-color: var(--ysp-accent);
        background: var(--ysp-bg-strong);
        box-shadow: 0 0 0 3px rgba(252, 2, 53, 0.18);
    }

    /* Select */
    .ysp-select {
        flex: 2;
        background: var(--ysp-bg);
        border: 1px solid var(--ysp-border);
        color: var(--ysp-text); padding: 10px 12px;
        border-radius: 8px; font-size: 13px;
        cursor: pointer; transition: var(--ysp-transition);
        appearance: none; -webkit-appearance: none;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
        background-repeat: no-repeat;
        background-position: right 12px top 50%;
        background-size: 10px auto;
        padding-right: 30px; /* Space for arrow in LTR */
    }
    .ysp-rtl .ysp-select {
        background-position: left 12px top 50%;
        padding-left: 30px !important; /* Space for arrow in RTL */
        padding-right: 12px !important; /* Reset right padding */
        text-align: right;
    }

    /* Text Input */
    .ysp-input-text {
        width: 100%;
        background: var(--ysp-bg);
        border: 1px solid var(--ysp-border);
        color: var(--ysp-text);
        padding: 10px 12px;
        border-radius: 8px;
        font-size: 13px;
        transition: var(--ysp-transition);
        box-sizing: border-box;
    }
    .ysp-input-text:focus {
        outline: none;
        border-color: var(--ysp-accent);
        box-shadow: 0 0 8px var(--ysp-accent-glow);
    }
    .ysp-input-text::placeholder {
        color: rgba(255,255,255,0.3);
    }
    .ysp-rtl .ysp-input-text {
        text-align: right;
    }

    /* Button */
    .ysp-button {
        background: var(--ysp-accent);
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        cursor: pointer;
        transition: var(--ysp-transition);
    }
    .ysp-button:hover {
        filter: brightness(1.1);
        box-shadow: 0 0 10px var(--ysp-accent-glow);
    }
    .ysp-button:active {
        transform: scale(0.98);
    }
    .ysp-rtl .ysp-button {
        font-family: var(--ysp-font-ar);
    }

    .ysp-select:hover { border-color: rgba(255,255,255,0.3); }

    /* New Badge */
    .ysp-badge-new {
        background: var(--ysp-accent);
        color: #fff;
        font-size: 9px;
        padding: 2px 5px;
        border-radius: 4px;
        margin-left: 8px;
        vertical-align: middle;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 4px rgba(255,0,0,0.3);
    }
    .ysp-rtl .ysp-badge-new {
        margin-left: 0;
        margin-right: 8px;
    }

    /* Highlight Row */
    .ysp-highlight-row {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 12px 10px;
        margin: 0 -10px 24px -10px; /* Negative margin to expand bg */
    }
    .ysp-select:focus { border-color: var(--ysp-focus); }
    .ysp-select option {
        background-color: var(--ysp-bg);
        color: var(--ysp-text);
        padding: 10px;
    }

    /* Color Input */
    .ysp-color-wrap {
        width: 36px; height: 36px; border-radius: 8px;
        overflow: hidden; border: 1px solid var(--ysp-border);
        position: relative; cursor: pointer;
    }
    .ysp-color-input {
        position: absolute; top: -50%; left: -50%;
        width: 200%; height: 200%; border: none; padding: 0; margin: 0; cursor: pointer;
    }

    /* Presets — glassmorphism with red glow */
    .ysp-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .ysp-preset {
        background: var(--ysp-bg-strong);
        border: 1.5px solid var(--ysp-border);
        border-radius: var(--ysp-radius-sm);
        padding: 12px 6px 10px;
        text-align: center;
        cursor: pointer;
        transition: var(--ysp-transition);
        position: relative;
        overflow: hidden;
    }
    .ysp-preset::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(circle at center, rgba(252, 2, 53, 0.18), transparent 70%);
        opacity: 0;
        transition: var(--ysp-transition);
        pointer-events: none;
    }
    .ysp-preset:hover {
        border-color: var(--ysp-border-strong);
        transform: translateY(-2px);
        box-shadow: var(--ysp-shadow-soft);
    }
    .ysp-preset:hover::before { opacity: 1; }
    .ysp-preset.active {
        border-color: var(--ysp-accent);
        box-shadow: var(--ysp-shadow-glow-red);
        background: linear-gradient(135deg, rgba(252, 2, 53, 0.10) 0%, rgba(252, 2, 53, 0.04) 100%);
    }
    .ysp-preset.active::before { opacity: 1; }
    .ysp-preset > * { position: relative; z-index: 1; }
    .ysp-preset-preview {
        height: 40px; border-radius: 6px; margin-bottom: 8px;
        display: flex; align-items: center; justify-content: center; font-size: 16px;
    }
    .ysp-preset-name {
        font-size: 11.5px;
        font-weight: 600;
        color: var(--ysp-text);
    }

    /* Switch / Toggle */
    .ysp-switch {
        position: relative; display: inline-block; width: 44px; height: 24px;
    }
    .ysp-switch input { opacity: 0; width: 0; height: 0; }
    .ysp-slider {
        position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 24px;
    }
    .ysp-slider:before {
        position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
        background-color: white; transition: .4s; border-radius: 50%;
    }
    input:checked + .ysp-slider { background-color: var(--ysp-accent); }
    input:checked + .ysp-slider:before { transform: translateX(20px); }

    /* Templates */
    .ysp-tmpl-input-group { display: flex; gap: 10px; margin-bottom: 16px; }
    .ysp-input-text {
        flex: 1; background: var(--ysp-bg); border: 1px solid var(--ysp-border);
        color: var(--ysp-text); padding: 10px; border-radius: 8px; font-size: 13px;
    }
    .ysp-btn {
        padding: 8px 16px; border-radius: 8px; border: 1px solid var(--ysp-border);
        background: var(--ysp-bg-sec); color: var(--ysp-text); cursor: pointer; font-size: 12px; font-weight: 600;
        transition: var(--ysp-transition);
    }
    .ysp-btn:hover { background: rgba(255,255,255,0.1); }
    .ysp-btn-primary { background: var(--ysp-accent); border-color: var(--ysp-accent); color: white; }
    .ysp-btn-primary:hover { background: #d4002d; }

    .ysp-tmpl-item {
        display: flex; align-items: center; justify-content: space-between;
        background: var(--ysp-bg); border: 1px solid var(--ysp-border);
        border-radius: 8px; padding: 12px; margin-bottom: 8px;
    }
    .ysp-tmpl-item.selected { border-left: 3px solid var(--ysp-accent); background: rgba(255,255,255,0.02); }
    .ysp-tmpl-name { flex: 1; font-size: 13px; }
    .ysp-tmpl-actions { display: flex; gap: 8px; }
    .ysp-tmpl-apply, .ysp-tmpl-del {
        padding: 6px 10px; border-radius: 6px; border: none; cursor: pointer; font-size: 11px; font-weight: 700;
    }
    .ysp-tmpl-apply { background: rgba(255,255,255,0.1); color: white; }
    .ysp-tmpl-del { background: transparent; color: #ff4444; border: 1px solid rgba(255,68,68,0.3); }

    /* UI Lang */
    .ysp-ui-lang { display: flex; border: 1px solid var(--ysp-border); border-radius: 6px; overflow: hidden; margin-left: 12px; }
    .ysp-ui-lang-btn {
        padding: 6px 10px; font-size: 11px; font-weight: 700; color: var(--ysp-text-sec);
        cursor: pointer; background: transparent; transition: var(--ysp-transition);
    }
    .ysp-ui-lang-btn:hover { color: var(--ysp-text); }
    .ysp-ui-lang-btn.active { background: rgba(255,255,255,0.1); color: white; }

    @media (prefers-color-scheme: light) {
        .ysp-ui-lang-btn { color: #666666; }
        .ysp-ui-lang-btn:hover { color: #000000; background: rgba(0,0,0,0.05); }
        .ysp-ui-lang-btn.active { background: #000000; color: #ffffff; }

        /* Fix Switch / Slider */
        .ysp-slider { background-color: rgba(0,0,0,0.15); }
        .ysp-slider:before { background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }

        /* Fix Range Slider Track */
        .ysp-input-range { background: rgba(0,0,0,0.1); }

        /* Fix Buttons */
        .ysp-btn:hover { background: rgba(0,0,0,0.05); }
        .ysp-tmpl-apply { background: rgba(0,0,0,0.1); color: #000; }
        .ysp-tmpl-del { color: #d00000; border-color: rgba(200,0,0,0.3); }

        /* Fix Target Buttons */
        .ysp-target-btn:hover { border-color: rgba(0,0,0,0.3); color: #000; }
        .ysp-target-btn.active { background: rgba(0,0,0,0.05); border-color: var(--ysp-accent); color: var(--ysp-accent); }

        /* Fix Presets */
        .ysp-preset:hover { border-color: rgba(0,0,0,0.3); }
        .ysp-preset.active { background: rgba(255, 0, 51, 0.05); }

        /* Fix Close Button */
        .ysp-close-btn:hover { background: rgba(0,0,0,0.1); color: #000; }

        /* Fix Highlight Row */
        .ysp-highlight-row {
            background: rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
    }

    /* Persistent support and Extractly ownership card */
    .ysp-footer {
        padding: 6px 8px 8px;
        border-top: 1px solid var(--ysp-border);
        background: var(--ysp-bg-sec);
        flex: 0 0 auto;
    }
    .ysp-support-card {
        position: relative;
        overflow: hidden;
        padding: 8px;
        border: 1px solid rgba(18, 214, 208, 0.34);
        border-radius: 12px;
        background:
            radial-gradient(circle at 12% 0%, rgba(18, 214, 208, 0.16), transparent 42%),
            linear-gradient(135deg, var(--ysp-bg-strong), var(--ysp-bg-sec));
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.22);
    }
    .ysp-support-card::before {
        content: '';
        position: absolute;
        inset: 0 0 auto;
        height: 2px;
        background: linear-gradient(90deg, #12d6d0, var(--ysp-accent-2), var(--ysp-accent));
    }
    .ysp-support-card-main {
        display: grid;
        grid-template-columns: 34px minmax(0, 1fr) auto;
        gap: 7px;
        align-items: center;
    }
    .ysp-extractly-logo {
        width: 34px;
        height: 34px;
        object-fit: contain;
        filter: drop-shadow(0 5px 12px rgba(18, 214, 208, 0.26));
    }
    .ysp-support-card-copy { min-width: 0; }
    .ysp-support-card-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 2px;
        color: #62ebe6;
        font-family: var(--ysp-font-en);
        font-size: 8px;
        font-weight: 900;
        letter-spacing: 0.7px;
    }
    .ysp-support-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #12d6d0;
        box-shadow: 0 0 8px rgba(18, 214, 208, 0.8);
    }
    .ysp-support-card-title {
        color: var(--ysp-text);
        font-size: 11.5px;
        font-weight: 900;
        line-height: 1.25;
    }
    .ysp-support-card-body {
        display: -webkit-box;
        margin-top: 2px;
        color: var(--ysp-text-sec);
        font-size: 9.75px;
        line-height: 1.35;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .ysp-support-card-cta {
        min-width: 84px;
        min-height: 36px;
        padding: 5px 7px;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 3px;
        border: 1px solid rgba(255, 215, 0, 0.82);
        border-radius: 9px;
        background: linear-gradient(135deg, #ffe76a, #ffd000);
        color: #211900;
        text-align: center;
        text-decoration: none;
        font-size: 9.75px;
        font-weight: 900;
        line-height: 1.2;
        box-shadow: 0 7px 18px rgba(255, 208, 0, 0.18);
        transition: transform var(--ysp-transition), box-shadow var(--ysp-transition);
    }
    .ysp-support-card-cta:hover {
        color: #161100;
        transform: translateY(-1px);
        box-shadow: 0 9px 22px rgba(255, 208, 0, 0.28);
    }
    .ysp-rtl .ysp-support-card-badge {
        font-family: var(--ysp-font-ar);
        font-weight: 600;
        letter-spacing: 0;
    }
    .ysp-rtl .ysp-support-card-title,
    .ysp-rtl .ysp-support-card-cta {
        font-weight: 700;
        letter-spacing: 0;
    }
    .ysp-support-card-cta .ysp-heart {
        width: 14px;
        height: 14px;
        color: #b20f2d;
    }
    .ysp-support-card-links {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) 30px;
        align-items: center;
        gap: 5px;
        margin-top: 5px;
        padding-top: 5px;
        border-top: 1px solid var(--ysp-border);
    }
    .ysp-extractly-link,
    .ysp-contact-link {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: var(--ysp-text-sec);
        text-decoration: none;
        font-size: 9px;
        font-weight: 700;
        transition: color var(--ysp-transition);
    }
    .ysp-extractly-link { color: #62ebe6; }
    .ysp-extractly-link:hover,
    .ysp-contact-link:hover { color: var(--ysp-text); }
    .ysp-extractly-link svg,
    .ysp-contact-link svg {
        width: 13px;
        height: 13px;
        flex: 0 0 auto;
    }
    .ysp-contact-link {
        margin-inline-start: auto;
        overflow: hidden;
        white-space: nowrap;
    }
    .ysp-contact-link bdi {
        color: var(--ysp-text);
        font-family: var(--ysp-font-en);
        font-size: 9px;
    }
    .ysp-footer-btn-rate {
        width: 30px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        background: transparent;
        color: var(--ysp-text-sec);
        border: 1px solid var(--ysp-border);
        border-radius: 8px;
        text-decoration: none;
        transition: var(--ysp-transition);
    }
    .ysp-footer-btn-rate .ysp-icon {
        width: 15px;
        height: 15px;
    }
    .ysp-footer-btn-rate:hover {
        background: var(--ysp-accent-2-soft);
        color: var(--ysp-accent-2-text);
        border-color: rgba(255, 215, 0, 0.48);
    }
    @media (max-height: 920px) {
        .ysp-support-card-body { display: none; }
        .ysp-contact-link > span { display: none; }
    }
    @media (max-height: 720px) {
        .ysp-support-card-badge { display: none; }
        .ysp-support-card-title { font-size: 11px; }
    }
    @media (prefers-reduced-motion: reduce) {
        .ysp-support-card-cta { transition: none; }
        .ysp-support-card-cta:hover { transform: none; }
    }

    .ysp-support-prompt {
        margin: 12px 16px 0;
        padding: 12px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(252, 2, 53, 0.16), rgba(255, 153, 102, 0.10));
        display: flex;
        gap: 10px;
        align-items: flex-start;
    }
    .ysp-support-prompt-text { flex: 1; min-width: 0; }
    .ysp-support-prompt-title { font-size: 13px; font-weight: 800; color: var(--ysp-text); margin-bottom: 4px; }
    .ysp-support-prompt-body { font-size: 11px; color: var(--ysp-text-sec); line-height: 1.4; }
    .ysp-support-prompt-actions { display: flex; flex-direction: column; gap: 6px; align-items: stretch; }
    .ysp-support-prompt-actions .ysp-btn { padding: 8px 10px; font-size: 11px; border-radius: 10px; }
    .ysp-support-prompt-never {
        display: block;
        margin-top: 2px;
        font-size: 10px;
        color: rgba(255,255,255,0.65);
        text-decoration: none;
        text-align: center;
    }
    .ysp-support-prompt-never:hover { color: #fff; text-decoration: underline; }

    .ysp-whatsnew-overlay {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        background: rgba(0,0,0,0.72);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
    }
    .ysp-whatsnew {
        width: min(620px, 100%);
        max-height: min(82vh, 740px);
        overflow: auto;
        border-radius: 18px;
        border: 1px solid rgba(255,255,255,0.12);
        background: radial-gradient(circle at top right, rgba(252,2,53,0.12), transparent 34%), linear-gradient(180deg, rgba(18,18,24,0.98), rgba(8,8,12,0.98));
        box-shadow: 0 22px 60px rgba(0,0,0,0.66);
        padding: 16px;
        font-family: var(--ysp-font-en);
    }
    .ysp-whatsnew[dir="rtl"] { font-family: var(--ysp-font-ar); }
    .ysp-whatsnew-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 6px 6px 10px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .ysp-whatsnew-brand {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
    }
    .ysp-whatsnew-logo {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.10);
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
    }
    .ysp-whatsnew-logo img { width: 24px; height: 24px; display: block; }
    .ysp-whatsnew-brand-text { min-width: 0; }
    .ysp-whatsnew-app {
        font-size: 13px;
        font-weight: 900;
        color: var(--ysp-text);
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ysp-whatsnew-ver {
        font-size: 11px;
        font-weight: 900;
        padding: 3px 8px;
        border-radius: 999px;
        background: rgba(252, 2, 53, 0.18);
        border: 1px solid rgba(252, 2, 53, 0.30);
        color: #fff;
        flex: 0 0 auto;
    }
    .ysp-whatsnew-title { font-size: 15px; font-weight: 900; color: var(--ysp-text); }
    .ysp-whatsnew-sub { font-size: 11px; color: var(--ysp-text-sec); margin-top: 2px; }
    .ysp-whatsnew-lang { display: flex; gap: 6px; }
    .ysp-whatsnew-lang button {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.10);
        color: var(--ysp-text);
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
    }
    .ysp-whatsnew-lang button.active {
        background: rgba(252, 2, 53, 0.18);
        border-color: rgba(252, 2, 53, 0.30);
        color: #fff;
    }
    .ysp-whatsnew-close {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.10);
        background: rgba(255,255,255,0.06);
        color: var(--ysp-text);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .ysp-whatsnew-body { padding: 12px 6px 2px; }
    .ysp-whatsnew-list { display: flex; flex-direction: column; gap: 8px; }
    .ysp-whatsnew-item {
        border: 1px solid rgba(255,255,255,0.10);
        border-radius: 12px;
        background: rgba(255,255,255,0.045);
        overflow: hidden;
    }
    .ysp-whatsnew-item[open] {
        border-color: rgba(252, 2, 53, 0.28);
        background: rgba(255,255,255,0.065);
    }
    .ysp-whatsnew-item summary {
        list-style: none;
        cursor: pointer;
        padding: 12px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        font-weight: 900;
        color: var(--ysp-text);
        font-size: 13.5px;
    }
    .ysp-whatsnew-item summary::marker { content: ""; }
    .ysp-whatsnew-item-title { display: inline-flex; min-width: 0; }
    .ysp-whatsnew-item-chevron {
        width: 18px;
        height: 18px;
        opacity: 0.7;
        flex: 0 0 auto;
    }
    .ysp-whatsnew-item summary::-webkit-details-marker { display: none; }
    .ysp-whatsnew-item .ysp-whatsnew-desc {
        padding: 0 14px 14px;
        color: var(--ysp-text-sec);
        font-size: 11.5px;
        line-height: 1.55;
    }
    .ysp-whatsnew-footer {
        padding: 12px 6px 6px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        border-top: 1px solid rgba(255,255,255,0.08);
        margin-top: 12px;
    }
    .ysp-whatsnew-footer a {
        text-decoration: none;
        font-size: 11px;
        font-weight: 900;
        color: #FF9966;
    }
    .ysp-whatsnew-footer a:hover { text-decoration: underline; }
    .ysp-whatsnew-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        color: var(--ysp-text-sec);
        user-select: none;
    }
    .ysp-whatsnew-checkbox input[type="checkbox"] {
        accent-color: var(--ysp-accent);
        width: 14px;
        height: 14px;
        cursor: pointer;
    }

    /* v3.1 — one calm visual system for the drawer and What's New. */
    #ysp-panel-container {
        background: var(--ysp-bg) !important;
        background-image: none !important;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
    }
    #ysp-panel-container button:focus-visible,
    #ysp-panel-container input:focus-visible,
    #ysp-panel-container select:focus-visible,
    #ysp-panel-container [role="button"]:focus-visible,
    #ysp-whatsnew-overlay button:focus-visible,
    #ysp-whatsnew-overlay a:focus-visible,
    #ysp-whatsnew-overlay input:focus-visible {
        outline: 2px solid var(--ysp-focus) !important;
        outline-offset: 2px !important;
    }
    .ysp-header {
        min-height: 50px;
        padding: 8px 12px;
        background: var(--ysp-bg-sec);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
    }
    .ysp-header::after { display: none; }
    .ysp-brand { gap: 5px; font-size: 15px; letter-spacing: 0; }
    .ysp-brand img {
        width: 20px !important;
        height: 20px !important;
        margin-inline-end: 3px !important;
        filter: none !important;
    }
    .ysp-brand > span:not(.ysp-version-badge) {
        background: none;
        color: var(--ysp-accent);
        -webkit-background-clip: initial;
        background-clip: initial;
        -webkit-text-fill-color: currentColor;
    }
    .ysp-version-badge {
        margin-inline-start: 5px;
        margin-left: 0;
        padding: 3px 7px;
        background: var(--ysp-accent-soft);
        border: 1px solid rgba(252, 2, 53, 0.28);
        color: var(--ysp-accent);
        -webkit-text-fill-color: currentColor;
        box-shadow: none;
        letter-spacing: 0.2px;
    }
    .ysp-close-btn { width: 30px; height: 30px; border-color: var(--ysp-border); }
    .ysp-close-btn:hover {
        background: var(--ysp-bg-hover);
        color: var(--ysp-text);
        transform: none;
    }
    .ysp-ui-lang {
        margin: 0 6px;
        border-radius: 8px;
        padding: 2px;
        background: var(--ysp-bg-strong);
    }
    .ysp-ui-lang-btn { min-width: 28px; padding: 4px 7px; border-radius: 6px; }
    .ysp-ui-lang-btn:hover { color: var(--ysp-text); background: var(--ysp-bg-hover); }
    .ysp-ui-lang-btn.active {
        background: var(--ysp-accent-2-soft);
        color: var(--ysp-accent-2-text);
    }
    .ysp-surface-bar {
        margin: 6px 12px 0;
        padding: 5px 6px;
        display: grid;
        grid-template-columns: 92px minmax(0, 1fr);
        align-items: center;
        gap: 6px;
        background: var(--ysp-bg-sec);
        border-color: var(--ysp-border);
        box-shadow: none;
    }
    .ysp-surface-label {
        margin: 0;
        color: var(--ysp-text-sec);
        line-height: 1.2;
    }
    .ysp-surface-options { gap: 4px; }
    .ysp-surface-btn {
        min-height: 30px;
        padding: 5px 6px;
        border-color: transparent;
        background: var(--ysp-bg-strong);
        color: var(--ysp-text-sec);
    }
    .ysp-surface-btn:hover {
        color: var(--ysp-text);
        border-color: var(--ysp-border-strong);
    }
    .ysp-surface-btn.active {
        color: var(--ysp-on-accent);
        border-color: var(--ysp-accent);
        background: var(--ysp-accent);
        box-shadow: none;
    }
    .ysp-target-bar {
        margin: 5px 12px 0;
        gap: 4px;
        padding: 3px;
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius);
        background: var(--ysp-bg-sec);
    }
    .ysp-target-btn {
        min-height: 30px;
        padding: 5px;
        border-color: transparent;
        border-radius: var(--ysp-radius-sm);
    }
    .ysp-target-btn:hover {
        border-color: transparent;
        background: var(--ysp-bg-hover);
        color: var(--ysp-text);
    }
    .ysp-target-btn.active {
        background: var(--ysp-accent-2-soft);
        border-color: transparent;
        color: var(--ysp-accent-2-text);
    }
    .ysp-toolbar-row {
        position: relative;
        z-index: 12;
        display: grid;
        grid-template-columns: minmax(132px, 0.85fr) minmax(0, 1.35fr);
        gap: 6px;
        margin: 6px 12px 0;
    }
    .ysp-settings-search { margin: 0; }
    .ysp-settings-search-input,
    .ysp-input-text,
    .ysp-select,
    .ysp-range-value {
        background-color: var(--ysp-bg-sec);
        border-color: var(--ysp-border);
        color: var(--ysp-text);
    }
    .ysp-settings-search-input {
        min-height: 34px;
        padding-top: 6px !important;
        padding-bottom: 6px !important;
        font-size: 11.5px;
    }
    .ysp-settings-search-results {
        position: absolute;
        top: calc(100% + 5px);
        inset-inline-start: 0;
        z-index: 30;
        width: calc(400px - 24px);
        max-height: min(280px, 46vh);
        margin-top: 0;
        padding: 6px;
        overflow-y: auto;
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius);
        background: var(--ysp-bg-sec);
        box-shadow: var(--ysp-shadow);
    }
    .ysp-settings-search-result {
        background: var(--ysp-bg-sec);
        border-color: var(--ysp-border);
    }
    .ysp-settings-search-result:hover {
        border-color: rgba(252, 2, 53, 0.38);
        background: var(--ysp-accent-soft);
        transform: none;
    }
    .ysp-settings-search-result.is-disabled,
    .ysp-settings-search-empty,
    .ysp-settings-search-result.is-disabled:hover,
    .ysp-settings-search-empty:hover {
        border-color: var(--ysp-border);
        background: var(--ysp-bg-strong);
    }
    .ysp-tabs-wrapper { padding: 0; }
    .ysp-tabs {
        height: 34px;
        padding: 2px;
        background: var(--ysp-bg-sec);
        border-color: var(--ysp-border);
        box-shadow: none;
    }
    .ysp-tab { min-height: 28px; gap: 4px; font-size: 11px; }
    .ysp-tab-icon,
    .ysp-tab-icon svg { width: 14px; height: 14px; }
    .ysp-tab:hover { background: var(--ysp-bg-hover); color: var(--ysp-text); }
    .ysp-tab.active {
        background: var(--ysp-accent);
        color: var(--ysp-on-accent);
        box-shadow: none;
        transform: none;
    }
    .ysp-preview-card {
        margin: 6px 12px 8px;
        height: 72px;
        border-color: var(--ysp-border);
        box-shadow: none;
    }
    .ysp-preview-card::before {
        background: linear-gradient(135deg, #17171b 0%, #281217 55%, #2b2615 100%);
    }
    .ysp-preview-badge {
        top: 5px;
        inset-inline-start: 7px;
        padding: 2px 6px;
        font-size: 8px;
    }
    .ysp-content { padding: 10px 12px; }
    .ysp-tab-content.active { animation-duration: 0.16s; }
    .ysp-section { margin-bottom: 14px; }
    .ysp-section-title {
        margin-bottom: 7px;
        color: var(--ysp-text-sec);
        font-size: 10.5px;
        letter-spacing: 0.6px;
    }
    .ysp-row { margin-bottom: 10px; gap: 10px; }
    .ysp-card {
        padding: 12px;
        margin-bottom: 10px;
        background: var(--ysp-bg-sec);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: none;
    }
    .ysp-input-range {
        background: linear-gradient(90deg, var(--ysp-accent), var(--ysp-accent-2));
    }
    .ysp-range-value:hover,
    .ysp-range-value:focus { background: var(--ysp-bg-hover); }
    .ysp-presets {
        grid-template-columns: none;
        grid-auto-flow: column;
        grid-auto-columns: 88px;
        gap: 6px;
        padding: 1px 0 5px;
        overflow-x: auto;
        overflow-y: hidden;
        overscroll-behavior-inline: contain;
        scroll-snap-type: inline proximity;
        scrollbar-width: thin;
        scrollbar-color: var(--ysp-border-strong) transparent;
    }
    .ysp-presets::-webkit-scrollbar { height: 4px; }
    .ysp-presets::-webkit-scrollbar-track { background: transparent; }
    .ysp-presets::-webkit-scrollbar-thumb {
        background: var(--ysp-border-strong);
        border-radius: var(--ysp-radius-pill);
    }
    .ysp-preset {
        min-height: 64px;
        padding: 6px 5px;
        scroll-snap-align: start;
        background: var(--ysp-bg-sec);
        border-color: var(--ysp-border);
        box-shadow: none;
    }
    .ysp-preset::before { display: none; }
    .ysp-preset:hover {
        border-color: var(--ysp-border-strong);
        background: var(--ysp-bg-hover);
        transform: none;
        box-shadow: none;
    }
    .ysp-preset.active {
        border-color: var(--ysp-accent);
        background: var(--ysp-accent-soft);
        box-shadow: none;
    }
    .ysp-preset-preview {
        height: 27px;
        margin-bottom: 4px;
        font-size: 14px;
    }
    .ysp-preset-name,
    .ysp-preset > span {
        min-height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9.5px;
        line-height: 1.15;
    }
    .ysp-slider { background-color: var(--ysp-bg-hover); }
    .ysp-btn { background: var(--ysp-bg-sec); }
    .ysp-btn:hover { background: var(--ysp-bg-hover); }
    .ysp-btn-primary,
    .ysp-btn-primary:hover {
        background: var(--ysp-accent);
        border-color: var(--ysp-accent);
        color: var(--ysp-on-accent);
    }
    .ysp-support-prompt {
        margin: 10px 16px 0;
        border-color: var(--ysp-border);
        background: var(--ysp-bg-sec);
    }
    .ysp-support-prompt-never { color: var(--ysp-text-sec); }
    .ysp-support-prompt-never:hover { color: var(--ysp-text); }
    .ysp-footer {
        padding: 6px 8px 8px;
        background: var(--ysp-bg-sec);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
    }
    #ysp-panel-container[data-ysp-theme="light"] .ysp-support-card {
        border-color: rgba(0, 132, 128, 0.28);
        background:
            radial-gradient(circle at 12% 0%, rgba(18, 214, 208, 0.12), transparent 42%),
            linear-gradient(135deg, #ffffff, #f5f8f8);
        box-shadow: 0 8px 22px rgba(28, 28, 32, 0.08);
    }
    #ysp-panel-container[data-ysp-theme="light"] .ysp-support-card-badge,
    #ysp-panel-container[data-ysp-theme="light"] .ysp-extractly-link {
        color: #007f7b;
    }

    .ysp-whatsnew-overlay {
        background: var(--ysp-overlay);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        padding: 20px;
    }
    .ysp-whatsnew {
        width: min(580px, 100%);
        max-height: min(86vh, 720px);
        padding: 0;
        overflow-x: hidden;
        overflow-y: auto;
        border-radius: 16px;
        border-color: var(--ysp-border);
        background: var(--ysp-bg-sec);
        color: var(--ysp-text);
        box-shadow: var(--ysp-shadow);
        box-sizing: border-box;
    }
    .ysp-whatsnew *,
    .ysp-whatsnew *::before,
    .ysp-whatsnew *::after { box-sizing: border-box; }
    .ysp-whatsnew-header {
        align-items: flex-start;
        gap: 16px;
        padding: 18px;
        border-color: var(--ysp-border);
        background: var(--ysp-bg-sec);
    }
    .ysp-whatsnew-brand { align-items: flex-start; gap: 12px; }
    .ysp-whatsnew-logo {
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: var(--ysp-bg-strong);
        border-color: var(--ysp-border);
    }
    .ysp-whatsnew-logo img { width: 26px; height: 26px; }
    .ysp-whatsnew-app {
        color: var(--ysp-text-sec);
        font-size: 11px;
        font-weight: 700;
    }
    .ysp-whatsnew-ver {
        padding: 3px 7px;
        background: var(--ysp-accent-soft);
        border-color: rgba(252, 2, 53, 0.28);
        color: var(--ysp-accent);
        font-size: 10px;
    }
    .ysp-whatsnew-title {
        margin-top: 5px;
        color: var(--ysp-text);
        font-size: 21px;
        line-height: 1.25;
    }
    .ysp-whatsnew-sub {
        max-width: 470px;
        margin-top: 5px;
        color: var(--ysp-text-sec);
        font-size: 12px;
        line-height: 1.6;
    }
    .ysp-whatsnew-close {
        flex: 0 0 auto;
        border-color: var(--ysp-border);
        background: var(--ysp-bg-strong);
        color: var(--ysp-text-sec);
    }
    .ysp-whatsnew-close:hover { background: var(--ysp-bg-hover); color: var(--ysp-text); }
    .ysp-whatsnew-body { padding: 16px 18px; }
    .ysp-whatsnew-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }
    .ysp-whatsnew-item,
    .ysp-whatsnew-item[open] {
        min-width: 0;
        min-height: 112px;
        padding: 12px;
        border: 1px solid var(--ysp-border);
        border-radius: 12px;
        background: var(--ysp-bg-strong);
        overflow: visible;
    }
    .ysp-whatsnew-item-title {
        display: block;
        color: var(--ysp-text);
        font-size: 13px;
        font-weight: 800;
        line-height: 1.4;
    }
    .ysp-whatsnew-item .ysp-whatsnew-desc {
        padding: 0;
        margin-top: 6px;
        color: var(--ysp-text-sec);
        font-size: 11.5px;
        line-height: 1.5;
    }
    .ysp-whatsnew-footer {
        margin: 0;
        padding: 14px 18px 16px;
        border-color: var(--ysp-border);
        background: var(--ysp-bg);
    }
    .ysp-whatsnew-footer a {
        color: var(--ysp-accent-2-text);
        font-size: 11px;
        font-weight: 700;
    }
    .ysp-whatsnew-support-note {
        flex: 1 0 100%;
        min-width: 0;
        padding: 11px 12px;
        border: 1px solid var(--ysp-border);
        border-radius: 10px;
        background: var(--ysp-bg-sec);
    }
    .ysp-whatsnew-support-title {
        color: var(--ysp-text);
        font-size: 12px;
        font-weight: 800;
    }
    .ysp-whatsnew-support-body {
        margin-top: 3px;
        color: var(--ysp-text-sec);
        font-size: 11px;
        line-height: 1.55;
    }
    .ysp-whatsnew-checkbox { color: var(--ysp-text-sec); }
    .ysp-whatsnew-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        min-width: 0;
        margin-inline-start: auto;
    }
    .ysp-whatsnew-actions .ysp-whatsnew-support-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 38px;
        padding: 8px 12px;
        border: 1px solid rgba(255, 215, 0, 0.48);
        border-radius: 9px;
        background: var(--ysp-accent-2-soft);
        color: var(--ysp-accent-2-text);
        font-size: 12px;
        font-weight: 800;
        text-decoration: none;
        white-space: normal;
    }
    .ysp-whatsnew-actions .ysp-whatsnew-support-link:hover {
        border-color: var(--ysp-focus);
        background: var(--ysp-accent-2-soft);
        text-decoration: none;
    }
    .ysp-whatsnew-done {
        min-width: 112px;
        padding: 9px 16px;
        border: 1px solid var(--ysp-accent);
        border-radius: 9px;
        background: var(--ysp-accent);
        color: var(--ysp-on-accent);
        font: inherit;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
    }
    .ysp-whatsnew-done:hover { background: var(--ysp-accent-deep); }
    @media (max-width: 560px) {
        .ysp-whatsnew-overlay { padding: 10px; }
        .ysp-whatsnew-header { padding: 15px; }
        .ysp-whatsnew-body { padding: 14px 15px; }
        .ysp-whatsnew-list { grid-template-columns: 1fr; }
        .ysp-whatsnew-item,
        .ysp-whatsnew-item[open] { min-height: 0; }
        .ysp-whatsnew-footer { align-items: stretch; padding: 13px 15px 15px; }
        .ysp-whatsnew-actions { width: 100%; margin-inline-start: 0; justify-content: space-between; }
    }

    /* Scrollbar */
    #ysp-panel-container ::-webkit-scrollbar,
    #ysp-whatsnew-overlay ::-webkit-scrollbar { width: 6px; }
    #ysp-panel-container ::-webkit-scrollbar-track { background: var(--ysp-bg); }
    #ysp-panel-container ::-webkit-scrollbar-thumb,
    #ysp-whatsnew-overlay ::-webkit-scrollbar-thumb { background: var(--ysp-border-strong); border-radius: 3px; }
    #ysp-panel-container ::-webkit-scrollbar-thumb:hover,
    #ysp-whatsnew-overlay ::-webkit-scrollbar-thumb:hover { background: var(--ysp-text-faint); }

    /* Subtitle Overrides */
    .ytp-caption-segment:not(.ytp-custom-active) {
        box-decoration-break: clone; -webkit-box-decoration-break: clone;
        display: inline-block; background-clip: padding-box;
        mix-blend-mode: normal;
    }
    .caption-window:not(.has-custom-subtitles) {
        background: transparent !important;
    }
    /* Hover fix */
    .ytd-video-preview .ytp-caption-segment:not(.ytp-custom-active),
    .ytp-player-content.ytp-video-preview .ytp-caption-segment:not(.ytp-custom-active) {
        font-size: 14px !important; padding: 2px 4px !important; bottom: 5% !important;
    }

    /* Fullscreen Assistant Button */
    .ysp-fs-assist {
        position: fixed !important;
        top: calc(env(safe-area-inset-top, 0px) + 72px) !important;
        right: calc(env(safe-area-inset-right, 0px) + 24px) !important;
        z-index: 2147483647 !important;
        width: 48px;
        height: 48px;
        cursor: pointer;
        opacity: 0.92;
        transition: opacity 0.2s ease, transform 0.2s ease;
        user-select: none;
        filter: drop-shadow(0 4px 10px rgba(0,0,0,0.45));
        border-radius: 14px;
        background: rgba(16,16,16,0.62);
        border: 1px solid rgba(255,255,255,0.16);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
    }
    .ysp-fs-assist:hover {
        opacity: 1;
        transform: scale(1.1);
    }
    .ysp-fs-assist img {
        width: 30px;
        height: 30px;
        display: block;
        image-rendering: auto;
    }
    .ysp-ytp-button {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 48px !important;
        height: 48px !important;
        min-width: 48px !important;
        max-width: 48px !important;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        line-height: 48px !important;
        opacity: 0.92 !important;
    }
    .ysp-ytp-button:hover,
    .ysp-ytp-button:focus {
        opacity: 1 !important;
    }
    .ysp-ytp-button img {
        width: 24px !important;
        height: 24px !important;
        max-width: 24px !important;
        max-height: 24px !important;
        min-width: 24px !important;
        min-height: 24px !important;
        display: block !important;
        object-fit: contain !important;
        pointer-events: none !important;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.65));
    }
    .ytp-big-mode .ysp-ytp-button img {
        width: 28px !important;
        height: 28px !important;
        max-width: 28px !important;
        max-height: 28px !important;
    }
    .ysp-player-tooltip {
        position: fixed !important;
        z-index: var(--yt-button-tooltip-z-index, 2300) !important;
        pointer-events: none !important;
        opacity: 0 !important;
        transform: translate(-50%, -100%) translateY(3px) !important;
        transition: opacity 150ms cubic-bezier(0.4, 0, 1, 1), transform 150ms cubic-bezier(0.4, 0, 1, 1) !important;
        background: rgba(28, 28, 28, 0.92) !important;
        color: #fff !important;
        border-radius: 2px !important;
        padding: 5px 9px !important;
        font-family: Roboto, Arial, Helvetica, sans-serif !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        line-height: 16px !important;
        white-space: nowrap !important;
        box-shadow: 0 1px 2px rgba(0,0,0,0.28) !important;
        text-shadow: none !important;
        -webkit-font-smoothing: antialiased !important;
    }
    .ysp-player-tooltip.ysp-show {
        opacity: 1 !important;
        transform: translate(-50%, -100%) translateY(0) !important;
    }
    .ysp-hidden {
        display: none !important;
    }
`;

function ensurePanelStyles() {
    const styleParent = document.head || document.documentElement;
    if (!styleParent) return null;

    let styleEl = document.getElementById('ysp-panel-styles');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'ysp-panel-styles';
        styleParent.appendChild(styleEl);
    }
    if (styleEl.textContent !== panelCSS) {
        styleEl.textContent = panelCSS;
    }

    return styleEl;
}

let yspThemeObserver = null;

function getYouTubeUITheme() {
    const root = document.documentElement;
    if (root && root.hasAttribute('dark')) return 'dark';

    const host = String(location && location.hostname || '').toLowerCase();
    if (host === 'www.youtube.com' || host === 'youtube.com' || host === 'm.youtube.com') {
        return 'light';
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

function syncYspUITheme(root = null) {
    const theme = getYouTubeUITheme();
    const targets = root
        ? [root]
        : [document.getElementById('ysp-panel-container'), document.getElementById('ysp-whatsnew-overlay')];
    targets.filter(Boolean).forEach(target => target.setAttribute('data-ysp-theme', theme));
    return theme;
}

function ensureYspThemeObserver() {
    if (yspThemeObserver || !document.documentElement || typeof MutationObserver !== 'function') return;
    yspThemeObserver = new MutationObserver(() => syncYspUITheme());
    yspThemeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dark']
    });
}

const getPanelHTML = () => `
    <div class="ysp-header">
        <div class="ysp-brand">
            <img src="${safeGetExtensionURL('icons/icon48.png')}" width="24" height="24" style="margin-inline-end:8px;">
            <span>Subtitle</span> Pro
            <span class="ysp-version-badge">v${(safeRuntimeCall(() => chrome.runtime.getManifest().version, EXTENSION_VERSION_FALLBACK))}</span>
        </div>
        <div style="display:flex; align-items:center;">
            <div class="ysp-ui-lang">
                <div class="ysp-ui-lang-btn" data-lang="ar">AR</div>
                <div class="ysp-ui-lang-btn" data-lang="en">EN</div>
            </div>
            <button class="ysp-close-btn" id="ysp-close" aria-label="Close">
                <svg class="ysp-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg>
            </button>
        </div>
    </div>

    <div class="ysp-surface-bar">
        <span class="ysp-surface-label" data-i18n="editingSurface">Playback template:</span>
        <div class="ysp-surface-options">
            <button type="button" class="ysp-surface-btn" data-surface="video" data-i18n="surfaceVideo">Regular videos</button>
            <button type="button" class="ysp-surface-btn" data-surface="shorts" data-i18n="surfaceShorts">Shorts</button>
        </div>
    </div>

    <div class="ysp-target-bar">
        <div class="ysp-target-btn active" data-target="ar" data-i18n="targetAr">
            <svg class="ysp-icon" style="width:16px;height:16px;" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.09-.02.67-.02zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="currentColor"/></svg>
            Arabic
        </div>
        <div class="ysp-target-btn" data-target="en" data-i18n="targetEn">
            <svg class="ysp-icon" style="width:16px;height:16px;" viewBox="0 0 24 24"><path d="M7 13v-2h14v2H7zm0 6v-2h14v2H7zM7 7v2h14V7H7zM3 8V5H2V4h2v4h2V4h1v4h-4zm0 11v-4H2v-1h2v4h2v-4h1v5H3z" fill="currentColor"/></svg>
            English
        </div>
    </div>

    <div class="ysp-toolbar-row">
        <div class="ysp-settings-search" role="search">
            <div class="ysp-settings-search-field">
                <svg class="ysp-settings-search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9.5 3a6.5 6.5 0 0 1 5.17 10.44l4.45 4.44-1.41 1.42-4.45-4.45A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" fill="currentColor"/>
                </svg>
                <input type="search" id="yspSettingsSearch" class="ysp-input-text ysp-settings-search-input" autocomplete="off" spellcheck="false" data-i18n-placeholder="settingsSearchPlaceholder" placeholder="Search settings...">
            </div>
            <div id="yspSettingsSearchResults" class="ysp-settings-search-results" hidden></div>
        </div>

        <div class="ysp-tabs-wrapper">
            <div class="ysp-tabs">
            <div class="ysp-tab active" data-tab="tab-main">
                <span class="ysp-tab-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="6" width="18" height="12" rx="2"/>
                        <path d="M7 11h10M7 15h6"/>
                    </svg>
                </span>
                <span class="ysp-tab-label" data-i18n="tabMain">Main</span>
            </div>
            <div class="ysp-tab" data-tab="tab-style">
                <span class="ysp-tab-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="13.5" cy="6.5" r="2.5"/>
                        <circle cx="17.5" cy="10.5" r="2.5"/>
                        <circle cx="8.5" cy="7.5" r="2.5"/>
                        <circle cx="6.5" cy="12.5" r="2.5"/>
                        <path d="M12 22a10 10 0 1 1 10-10c0 2-1 3-3 3h-2c-2 0-3 1-3 3 0 2-1 4-2 4z"/>
                    </svg>
                </span>
                <span class="ysp-tab-label" data-i18n="tabStyle">Style</span>
            </div>
            <div class="ysp-tab" data-tab="tab-advanced">
                <span class="ysp-tab-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                </span>
                <span class="ysp-tab-label" data-i18n="tabAdvanced">Advanced</span>
            </div>
        </div>
    </div>
    </div>

    <div class="ysp-preview-card" id="ysp-preview-card">
        <canvas class="ysp-preview-frame" id="ysp-preview-canvas" aria-hidden="true"></canvas>
        <div class="ysp-preview-overlay"></div>
        <div class="ysp-preview-badge"><span data-i18n="livePreview">LIVE</span></div>
        <div id="ysp-preview-text" class="ysp-preview-text">Preview Text</div>
    </div>

    <div id="ysp-support-prompt" class="ysp-support-prompt ysp-hidden">
        <div class="ysp-support-prompt-text">
            <div class="ysp-support-prompt-title" data-i18n="supportPromptTitle">Has Subtitle Pro helped you? Keep it going</div>
            <div class="ysp-support-prompt-body" data-i18n="supportPromptBody">Support is optional, but it makes a real difference.</div>
        </div>
        <div class="ysp-support-prompt-actions">
            <button class="ysp-btn ysp-btn-primary" id="yspSupportNow" data-i18n="supportPromptSupportBtn">Support</button>
            <button class="ysp-btn" id="yspSupportLater" data-i18n="supportPromptLaterBtn">Later</button>
            <a href="#" id="yspSupportNever" class="ysp-support-prompt-never" data-i18n="supportPromptNeverBtn">Don't show again</a>
        </div>
    </div>

    <div class="ysp-content">
        <!-- MAIN TAB -->
        <div id="tab-main" class="ysp-tab-content active">
            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="presets">Presets</div>
                <div class="ysp-presets">
                    <div class="ysp-preset" data-preset="cinema">
                        <div class="ysp-preset-preview" style="background:rgba(0,0,0,0.24); color:#f5f3ea; text-shadow:0 2px 5px rgba(0,0,0,0.72); -webkit-text-stroke:0.5px rgba(0,0,0,0.9); paint-order:stroke fill; font-weight:600;">Aa</div>
                        <span data-i18n="presetCinema">Cinema</span>
                    </div>
                    <div class="ysp-preset" data-preset="minimal">
                        <div class="ysp-preset-preview" style="background:transparent; color:#ffffff; font-weight:400;">Aa</div>
                        <span data-i18n="presetMinimal">Minimal</span>
                    </div>
                    <div class="ysp-preset" data-preset="contrast">
                        <div class="ysp-preset-preview" style="background:rgba(0,0,0,0.32); color:#f5f3ea; font-weight:600; text-shadow:0 2px 5px rgba(0,0,0,0.72); -webkit-text-stroke:0.5px rgba(0,0,0,0.9); paint-order:stroke fill;">Aa</div>
                        <span data-i18n="presetContrast">Contrast</span>
                    </div>
                    <div class="ysp-preset" data-preset="anime">
                        <div class="ysp-preset-preview" style="background:rgba(126,45,138,0.75); color:#fff7d6; -webkit-text-stroke:1.5px #5e1a8a; paint-order:stroke fill; font-weight:800;">Aa</div>
                        <span data-i18n="presetAnime">Anime</span>
                    </div>
                    <div class="ysp-preset" data-preset="documentary">
                        <div class="ysp-preset-preview" style="background:rgba(20,20,32,0.9); color:#f0e6d2; font-weight:500; font-family:Georgia,serif;">Aa</div>
                        <span data-i18n="presetDocumentary">Documentary</span>
                    </div>
                    <div class="ysp-preset" data-preset="news">
                        <div class="ysp-preset-preview" style="background:#c8202a; color:#ffffff; font-weight:900; letter-spacing:0.5px;">Aa</div>
                        <span data-i18n="presetNews">News</span>
                    </div>
                    <div class="ysp-preset" data-preset="gaming">
                        <div class="ysp-preset-preview" style="background:rgba(0,0,0,0.85); color:#00ff88; font-weight:700; text-shadow:0 0 8px #00ff88;">Aa</div>
                        <span data-i18n="presetGaming">Gaming</span>
                    </div>
                    <div class="ysp-preset" data-preset="asmr">
                        <div class="ysp-preset-preview" style="background:rgba(60,30,50,0.5); color:#ffd0e0; font-weight:300; font-style:italic;">Aa</div>
                        <span data-i18n="presetAsmr">ASMR</span>
                    </div>
                    <div class="ysp-preset" data-preset="vlog">
                        <div class="ysp-preset-preview" style="background:rgba(255,255,255,0.92); color:#0a0a14; font-weight:700;">Aa</div>
                        <span data-i18n="presetVlog">Vlog</span>
                    </div>
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="typography">Typography</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="fontSize">Size</label>
                    <input type="range" class="ysp-input-range" id="fontSize" min="15" max="80" step="1">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bottomPos">Position</label>
                    <input type="range" class="ysp-input-range" id="bottomPos" min="0" max="50" step="1">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label">
                        <span data-i18n="dyslexiaMode">Dyslexia-friendly Mode</span>
                        <span style="display:block;font-size:10px;color:#888;margin-top:3px;" data-i18n="dyslexiaHint">Uses friendlier spacing.</span>
                    </label>
                    <label class="ysp-switch">
                        <input type="checkbox" id="dyslexiaMode">
                        <span class="ysp-slider"></span>
                    </label>
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="playbackTiming">Playback & Timing</div>
                <div class="ysp-row" style="margin-bottom: 0;">
                    <label class="ysp-label">
                        <span data-i18n="subDelay">Subtitle Delay</span>
                        <span class="ysp-badge-new" data-i18n="newBadge">NEW</span>
                    </label>
                    <input type="range" class="ysp-input-range" id="subDelay" min="0" max="5.0" step="0.1" value="0">
                    <span id="subDelayVal" style="display:inline-block; font-size:11px; font-weight:700; min-width:56px; text-align:right;">0s</span>
                </div>
                <div style="font-size:10px; color:#888; margin-top:5px;" data-i18n="subDelayInfo">Delays subtitle appearance.</div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="autoCaptions">Auto Captions</div>
            </div>


            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="fullscreenOptions">Fullscreen</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="fullscreenAssistant">Assistant Icon</label>
                    <label class="ysp-switch">
                        <input type="checkbox" id="fullscreenAssistant">
                        <span class="ysp-slider"></span>
                    </label>
                </div>
            </div>
        </div>

        <!-- STYLE TAB -->
        <div id="tab-style" class="ysp-tab-content">
            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="typography">Font</div>
                <div class="ysp-row">
                    <select class="ysp-select" id="fontFamily">
                        <option value="${YOUTUBE_FONT_OPTIONS.proportionalSans}" data-i18n="ytFontProportionalSans">Proportional Sans-Serif</option>
                        <option value="${YOUTUBE_FONT_OPTIONS.monospaceSans}" data-i18n="ytFontMonospaceSans">Monospaced Sans-Serif</option>
                        <option value="${YOUTUBE_FONT_OPTIONS.proportionalSerif}" data-i18n="ytFontProportionalSerif">Proportional Serif</option>
                        <option value="${YOUTUBE_FONT_OPTIONS.monospaceSerif}" data-i18n="ytFontMonospaceSerif">Monospaced Serif</option>
                        <option value="${YOUTUBE_FONT_OPTIONS.casual}" data-i18n="ytFontCasual">Casual</option>
                        <option value="${YOUTUBE_FONT_OPTIONS.cursive}" data-i18n="ytFontCursive">Cursive</option>
                        <option value="${YOUTUBE_FONT_OPTIONS.smallCaps}" data-i18n="ytFontSmallCaps">Small Capitals</option>
                        <option value="'Tajawal', sans-serif" data-i18n="tajawal">Tajawal</option>
                        <option value="'Cairo', sans-serif">Cairo</option>
                        <option value="'Almarai', sans-serif">Almarai</option>
                        <option value="'Noto Kufi Arabic', sans-serif">Noto Kufi</option>
                        <option value="'Roboto', sans-serif" data-i18n="roboto">Roboto</option>
                        <option value="'Open Sans', sans-serif">Open Sans</option>
                        <option value="'Montserrat', sans-serif">Montserrat</option>
                        <option value="'Lato', sans-serif">Lato</option>
                        <option value="'Arial', sans-serif" data-i18n="arial">Arial</option>
                        <option value="'Courier New', monospace" data-i18n="cinema">Cinema</option>
                    </select>
                </div>

                <div class="ysp-row">
                    <label class="ysp-label">
                        <span data-i18n="uploadFont">Upload Custom Font</span>
                    </label>
                    <div style="flex: 2; display: flex; gap: 5px; align-items: center;">
                        <input type="file" id="fontUpload" accept=".ttf,.otf,.woff,.woff2" style="display: none;">
                        <button id="fontUploadBtn" class="ysp-select" style="text-align: center; font-size: 11px; padding: 8px;" data-i18n="uploadFontBtn">Choose File</button>
                    </div>
                </div>

                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="fontWeight">Weight</label>
                    <select class="ysp-select" id="fontWeight">
                        <option value="400" data-i18n="normal">Normal</option>
                        <option value="700" data-i18n="bold">Bold</option>
                        <option value="900" data-i18n="black">Heavy</option>
                    </select>
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="appearance">Colors</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="fontColor">Text Color</label>
                    <div class="ysp-color-wrap"><input type="color" class="ysp-color-input" id="fontColor"></div>
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bgColor">Background Color</label>
                    <div class="ysp-color-wrap"><input type="color" class="ysp-color-input" id="bgColor"></div>
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="strokeColor">Stroke Color</label>
                    <div class="ysp-color-wrap"><input type="color" class="ysp-color-input" id="strokeColor"></div>
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="strokeWidth">Stroke Width</label>
                    <input type="range" class="ysp-input-range" id="strokeWidth" min="0" max="6" step="0.5">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="strokeOpacity">Stroke Opacity</label>
                    <input type="range" class="ysp-input-range" id="strokeOpacity" min="0" max="100" step="5">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="textOpacity">Text Opacity</label>
                    <input type="range" class="ysp-input-range" id="textOpacity" min="20" max="100" step="5">
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="appearance">Effects</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="shadowIntensity">Shadow</label>
                    <input type="range" class="ysp-input-range" id="shadowIntensity" min="0" max="20" step="1">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bgOpacity">Background</label>
                    <input type="range" class="ysp-input-range" id="bgOpacity" min="0" max="100" step="5">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bgBlur">Blur</label>
                    <input type="range" class="ysp-input-range" id="bgBlur" min="0" max="20" step="1">
                </div>

            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="advanced">Fine Tuning</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="lineHeight">Line Height</label>
                    <input type="range" class="ysp-input-range" id="lineHeight" min="1.0" max="2.0" step="0.05">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="letterSpacing">Spacing</label>
                    <input type="range" class="ysp-input-range" id="letterSpacing" min="-1" max="10" step="0.5">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="padding">Padding</label>
                    <input type="range" class="ysp-input-range" id="padding" min="0" max="20" step="1">
                </div>
                 <div class="ysp-row">
                    <label class="ysp-label" data-i18n="borderRadius">Radius</label>
                    <input type="range" class="ysp-input-range" id="borderRadius" min="0" max="20" step="1">
                </div>
            </div>

        </div>

        <!-- ADVANCED TAB -->
        <div id="tab-advanced" class="ysp-tab-content">
            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="customCaptions">Custom Captions</div>
                <div class="ysp-row">
                    <label class="ysp-label">
                        <span data-i18n="srtMode">Custom SRT Captions</span>
                    </label>
                    <label class="ysp-switch">
                        <input type="checkbox" id="customSrtEnabled">
                        <span class="ysp-slider"></span>
                    </label>
                </div>
                <div style="font-size:10px; color:#888; margin-bottom:10px;" data-i18n="srtModeInfo">When enabled, the extension uses your uploaded SRT instead of auto-captions.</div>
                <div class="ysp-row" style="gap:8px; align-items:center;">
                    <input type="file" id="srtUpload" accept=".srt" style="display:none;">
                    <button id="srtUploadBtn" class="ysp-button" data-i18n="srtUploadBtn">Upload SRT</button>
                    <button id="srtClearBtn" class="ysp-button" data-i18n="srtClearBtn">Clear File</button>
                </div>
                <div id="srtStatus" style="font-size:10px; color:#888; margin-bottom:0px;" data-i18n="srtNotLoaded">No file loaded</div>
            </div>


            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="blockingCleaning">Caption Cleanup</div>
                <div class="ysp-row">
                    <label class="ysp-label">
                        <span data-i18n="smartTiming">Smart Timing</span>
                    </label>
                    <label class="ysp-switch">
                        <input type="checkbox" id="smartTiming">
                        <span class="ysp-slider"></span>
                    </label>
                </div>
                <div style="font-size:10px; color:#888; margin-bottom:15px;" data-i18n="smartTimingInfo">Hides subtitles automatically.</div>

                <div class="ysp-row">
                    <label class="ysp-label">
                        <span data-i18n="enhancedBlocking">Enhanced Annoying Words Block</span>
                        <span class="ysp-badge-new" data-i18n="newBadge">NEW</span>
                    </label>
                    <label class="ysp-switch">
                        <input type="checkbox" id="enhancedBlocking">
                        <span class="ysp-slider"></span>
                    </label>
                </div>
                <div style="font-size:10px; color:#888; margin-bottom:15px;" data-i18n="enhancedBlockingInfo">Blocks annoying words like [Music], <<, and unwanted symbols.</div>

                <div id="customBlockingGroup">
                    <div class="ysp-row">
                        <label class="ysp-label">
                            <span data-i18n="customBlocking">Custom Blocking Words</span>
                            <span class="ysp-badge-new" data-i18n="newBadge">NEW</span>
                        </label>
                    </div>
                    <div class="ysp-row">
                        <input type="text" id="customBlocking" class="ysp-input-text" placeholder="word1, word2, word3">
                    </div>
                    <div style="font-size:10px; color:#888; margin-bottom:6px;" data-i18n="customBlockingInfo">Add your own words to block (separate with commas).</div>
                    <div id="ysp-custom-blocking-error" style="display:none;font-size:10px;color:#ff6b6b;margin-bottom:15px;"></div>
                </div>

                <div class="ysp-row">
                    <label class="ysp-label">
                        <span data-i18n="statsTitle">Blocking Statistics</span>
                    </label>
                    <button id="showStatsBtn" class="ysp-button" data-i18n="statsShow">Show Statistics</button>
                </div>
                <div id="statsDisplay" style="display:none; background:rgba(0,0,0,0.1); padding:10px; border-radius:6px; margin-bottom:0px;">
                    <div style="font-size:12px; color:#666;" data-i18n="statsBlocked">Blocked Words Count</div>
                    <div id="statsBlockedCount" style="font-size:24px; font-weight:700; color:#e74c3c;">0</div>
                    <button id="resetStatsBtn" style="margin-top:8px; font-size:11px; padding:4px 8px; background:#e74c3c; color:#fff; border:none; border-radius:4px; cursor:pointer;">Reset</button>
                </div>
            </div>


            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="position">Position</div>
                <div class="ysp-row">
                    <label class="ysp-label">
                        <span data-i18n="allowNativeCaptionDrag">Allow YouTube native drag</span>
                    </label>
                    <label class="ysp-switch">
                        <input type="checkbox" id="allowNativeCaptionDrag">
                        <span class="ysp-slider"></span>
                    </label>
                </div>
                <div style="font-size:10px; color:#888; margin-bottom:8px;" data-i18n="allowNativeCaptionDragInfo">Works automatically like YouTube. Turn it off only if you do not want captions to be draggable.</div>
                <button class="ysp-btn" id="resetNativeCaptionPositionBtn" type="button" style="width:100%;" data-i18n="resetNativeCaptionPosition">Reset caption position</button>
                <div style="font-size:10px; color:#888; margin-top:6px;" data-i18n="resetNativeCaptionPositionInfo">Returns captions to the centered default height if they get stuck after dragging.</div>
            </div>


            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="playbackTiming">Playback & Timing</div>
                <div class="ysp-row">
                    <label class="ysp-label">
                        <span data-i18n="playbackSpeed">Playback Speed</span>
                        <span class="ysp-badge-new" data-i18n="newBadge">NEW</span>
                    </label>
                    <input type="range" class="ysp-input-range" id="playbackSpeed" min="0.25" max="10.0" step="0.25" value="1" style="flex:2; min-width:140px;">
                    <span id="playbackSpeedVal" style="display:inline-block; font-size:11px; font-weight:700; min-width:56px; text-align:right;">1x</span>
                </div>

            </div>


            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="customTemplates">Templates</div>
                <div class="ysp-tmpl-input-group">
                    <input type="text" class="ysp-input-text" id="templateNameInput">
                    <button class="ysp-btn ysp-btn-primary" id="saveTemplateBtn" data-i18n="saveTemplate">Save</button>
                </div>
                <div id="templateMsg" style="font-size:11px; margin-top:5px; min-height:15px; text-align:center;"></div>
                <div id="customTemplatesList"></div>
            </div>


            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="actions">Actions</div>
                <button id="resetBtn" class="ysp-btn" style="width:100%; color:#ff4444; border-color:#ff4444;" data-i18n="reset">Reset Defaults</button>
            </div>

        </div>
    </div>

    <!-- Persistent support, contact, and Extractly ownership card -->
    <div class="ysp-footer">
        <div class="ysp-support-card">
            <div class="ysp-support-card-main">
                <img class="ysp-extractly-logo" src="${safeGetExtensionURL('icons/extractly-mark.png')}" width="42" height="42" alt="Extractly.vip">
                <div class="ysp-support-card-copy">
                    <div class="ysp-support-card-badge"><span class="ysp-support-dot"></span><span data-i18n="supportBadge">OPTIONAL SUPPORT</span></div>
                    <div class="ysp-support-card-title" data-i18n="supportCardTitle">Using Subtitle Pro often? Help keep it free</div>
                    <div class="ysp-support-card-body" data-i18n="supportCardBody">Even a small contribution makes a real difference.</div>
                </div>
                <a href="#" class="ysp-support-card-cta" id="link-support" target="_blank" rel="noopener noreferrer">
                    <svg class="ysp-icon ysp-heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>
                    <span data-i18n="supportUs">Keep it going</span>
                </a>
            </div>
            <div class="ysp-support-card-links">
                <a class="ysp-extractly-link" href="https://extractly.vip/" target="_blank" rel="noopener noreferrer">
                    <span data-i18n="extractlyProduct">An Extractly.vip product</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M10 14 19 5M19 13v6H5V5h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
                <a class="ysp-contact-link" href="mailto:support@extractly.vip">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span data-i18n="contactSupport">Found a problem?</span>
                    <bdi>support@extractly.vip</bdi>
                </a>
                <a href="https://chromewebstore.google.com/detail/youtube-subtitle-pro-cine/clhoadlllpmdeakgigbbbammfapclcfi/reviews" class="ysp-footer-btn-rate" target="_blank" rel="noopener noreferrer" title="Rate" aria-label="Rate">
                    <svg class="ysp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/></svg>
                </a>
            </div>
        </div>
    </div>
`;

const SUPPORT_FIRST_SEEN_KEY = 'yspFirstSeenAt';
const SUPPORT_PROMPT_KEY = 'yspSupportPrompt';
const SUPPORT_TRIGGER_KEY = 'yspSupportTrigger';
const SUPPORT_BLOCK_THRESHOLD = 10;
const SUPPORT_PROMPT_COOLDOWN_MS = 21 * 24 * 60 * 60 * 1000;
const SUPPORT_PROMPT_MIN_AGE_MS = 3 * 24 * 60 * 60 * 1000;
const CUSTOM_SRT_DATA_KEY = 'yspCustomSrtData';
const CUSTOM_SRT_ENABLED_KEY = 'yspCustomSrtEnabled';
const YOUTUBE_FONT_DEFAULT_MIGRATION_KEY = 'yspYouTubeFontDefaultV301';

function getSupportUrl(lang = uiLang) {
    return lang === 'ar'
        ? 'https://creators.sa/ar/voidksa'
        : 'https://creators.sa/en/voidksa';
}

function parseSrtTimeToSeconds(raw) {
    const t = String(raw || '').trim();
    const m = t.match(/(\d{1,2}):(\d{2}):(\d{2})([,.](\d{1,3}))?/);
    if (!m) return NaN;
    const h = parseInt(m[1], 10) || 0;
    const min = parseInt(m[2], 10) || 0;
    const s = parseInt(m[3], 10) || 0;
    const ms = parseInt((m[5] || '0').padEnd(3, '0').slice(0, 3), 10) || 0;
    return h * 3600 + min * 60 + s + (ms / 1000);
}

function parseSrtContent(content) {
    const normalized = String(content || '').replace(/\r/g, '').trim();
    if (!normalized) return [];
    const blocks = normalized.split(/\n{2,}/);
    const cues = [];

    blocks.forEach(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        if (!lines.length) return;

        let timeLineIndex = lines.findIndex(l => l.includes('-->'));
        if (timeLineIndex < 0) return;

        const timeLine = lines[timeLineIndex];
        const parts = timeLine.split('-->').map(p => p.trim());
        if (parts.length !== 2) return;

        const start = parseSrtTimeToSeconds(parts[0]);
        const end = parseSrtTimeToSeconds(parts[1]);
        if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return;

        const textLines = lines.slice(timeLineIndex + 1);
        if (!textLines.length) return;

        const text = textLines
            .join(' ')
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        if (!text) return;

        cues.push({ start, end, text });
    });

    cues.sort((a, b) => a.start - b.start);
    return cues;
}

function isCurrentCustomSrtForVideo() {
    if (!customSrtEnabled || !customSrtData || !Array.isArray(customSrtData.cues) || customSrtData.cues.length === 0) return false;
    const expectedVideoKey = customSrtData.videoKey;
    // Legacy SRT data had no videoKey and could leak onto every video after navigation/reload.
    // Fail closed: the user can re-upload the SRT on the intended video.
    return !!expectedVideoKey && expectedVideoKey === getCurrentVideoKey();
}

function getCurrentSrtText(timeSec) {
    if (!isCurrentCustomSrtForVideo()) return '';
    if (!Number.isFinite(timeSec)) return '';

    const cues = customSrtData.cues;
    let i = Number.isInteger(customSrtData.lastIndex) ? customSrtData.lastIndex : 0;
    if (i < 0) i = 0;
    if (i >= cues.length) i = cues.length - 1;

    if (cues[i] && timeSec >= cues[i].start && timeSec <= cues[i].end) {
        customSrtData.lastIndex = i;
        return cues[i].text;
    }

    if (timeSec > (cues[i]?.end || 0)) {
        while (i < cues.length && timeSec > cues[i].end) i++;
    } else {
        while (i > 0 && timeSec < cues[i].start) i--;
    }

    if (i >= 0 && i < cues.length && timeSec >= cues[i].start && timeSec <= cues[i].end) {
        customSrtData.lastIndex = i;
        return cues[i].text;
    }

    customSrtData.lastIndex = Math.max(0, Math.min(i, cues.length - 1));
    return '';
}

function updateSrtStatusUI() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;
    const status = panel.querySelector('#srtStatus');
    const clearBtn = panel.querySelector('#srtClearBtn');
    if (!status) return;

    if (customSrtData && customSrtData.name) {
        const prefix = translations[uiLang].srtLoaded || 'Loaded file:';
        status.textContent = `${prefix} ${customSrtData.name}`;
    } else {
        status.textContent = translations[uiLang].srtNotLoaded || 'No file loaded';
    }
    if (clearBtn) clearBtn.disabled = !customSrtData;
}

function getWhatsNewData(version) {
    return {
        ar: {
            title: "ما الجديد",
            sub: "إصدار إصلاحي يثبّت الترجمة ويقدّم لوحة إعدادات جانبية أرتب وأسرع.",
            items: [
                { t: "لا تبديل بين شكل يوتيوب وشكل الإضافة", d: "ثبّتنا الترجمة عند تبديل اللغة أو المسار وعند إعادة بناء المشغل، وثبّتنا ارتفاعها مع شريط التحكم، ولم يعد إيقاف الترجمة وتشغيلها من زر CC يجمّد الصفحة." },
                { t: "حفظ أدق لتصميم صاحب الفيديو", d: "أصبح اكتشاف الترجمة المخصصة أكثر ثباتًا للحفاظ على ألوانها ومواضعها وتنسيقاتها مثل العريض والمائل والتسطير وتأثيرات الكلمات، مع تطبيق نوع الخط المختار فقط." },
                { t: "دعم أفضل للترجمة متعددة المواضع", d: "النوافذ والأسطر المتعددة تحتفظ بتنسيقها وموضعها بدل تطبيق شكل الإضافة على جزء منها." },
                { t: "تصميم جديد للوحة الإعدادات", d: "أعدنا تنظيم اللوحة الجانبية بتصميم مضغوط ومساحات أوضح وبحث أسرع، ووحّدنا حالة التحديد باللون الأحمر." },
                { t: "واجهة عربية أوضح وترقيم صحيح", d: "تستخدم الواجهة العربية خط IBM Plex Sans Arabic مع بقاء Roboto للإنجليزية، وتظهر علامات الترقيم في موضعها الصحيح داخل الأسطر العربية." },
                { t: "تحكم كامل وسلس بالألوان", d: "أضفنا اختيار لون خلفية الترجمة، وخففنا تحديثات ألوان النص والخلفية والحدود لتصبح المعاينة سلسة دون تجمد المتصفح." }
            ],
            supportTitle: "تستخدم الإضافة باستمرار؟ ساهم في استمرارها",
            supportBody: "الإضافة مجانية وبدون إعلانات. نختبرها ونصلحها مع كل تغيير من YouTube؛ دعمك اختياري، وحتى المساهمة البسيطة تصنع فرقًا حقيقيًا.",
            supportLinkText: "ساهم الآن",
            dontShow: translations.ar.whatsNewDontShow,
            done: "ابدأ الاستخدام"
        },
        en: {
            title: "What's new",
            sub: "A focused update for stable captions and a cleaner, faster settings panel.",
            items: [
                { t: "No switching between YouTube and Subtitle Pro styles", d: "Captions stay stable when languages or tracks change, their height no longer jumps with YouTube controls, and turning captions off and on again no longer freezes the page." },
                { t: "More complete creator-style preservation", d: "More consistent custom-caption detection preserves colors, positions, bold, italic, underline, and word-level effects while Subtitle Pro applies only the selected font family." },
                { t: "Better multi-position caption support", d: "Multiple caption windows and lines keep their authored styling and placement instead of only preserving one part." },
                { t: "Redesigned compact settings panel", d: "The side panel is now better organized with clearer spacing, faster search, a more compact layout, and one consistent red focus state." },
                { t: "Clearer Arabic UI and punctuation", d: "The Arabic interface now uses IBM Plex Sans Arabic while English keeps Roboto, and Arabic punctuation remains in its correct position." },
                { t: "Complete, smoother color controls", d: "A caption background-color picker was added, while lighter text, background, and stroke previews keep color controls smooth and responsive." }
            ],
            supportTitle: "Using Subtitle Pro often? Help keep it going",
            supportBody: "The extension is free and ad-free. We test and repair it through every YouTube change; support is optional, and even a small contribution makes a real difference.",
            supportLinkText: "Contribute now",
            dontShow: translations.en.whatsNewDontShow,
            done: "Start using"
        }
    };
}

function showWhatsNewModal(version) {
    if (window.__yspWhatsNewShown) return;
    if (window.top !== window) return;
    if (document.getElementById('ysp-whatsnew-overlay')) return;

    // Shorts can show this modal before the settings drawer has ever been opened.
    // Bootstrap the shared UI stylesheet first so the modal never renders as raw HTML.
    ensurePanelStyles();

    window.__yspWhatsNewShown = true;

    const overlay = document.createElement('div');
    overlay.id = 'ysp-whatsnew-overlay';
    overlay.className = 'ysp-whatsnew-overlay';
    syncYspUITheme(overlay);
    ensureYspThemeObserver();
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    const modal = document.createElement('div');
    modal.className = 'ysp-whatsnew';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'ysp-whatsnew-title');
    overlay.appendChild(modal);

    const data = getWhatsNewData(version);

    let lang = (uiLang === 'ar' || uiLang === 'en') ? uiLang : 'en';

    const header = document.createElement('div');
    header.className = 'ysp-whatsnew-header';

    const brand = document.createElement('div');
    brand.className = 'ysp-whatsnew-brand';

    const logo = document.createElement('div');
    logo.className = 'ysp-whatsnew-logo';
    const logoImg = document.createElement('img');
    logoImg.src = safeGetExtensionURL('icons/icon48.png');
    logoImg.width = 24;
    logoImg.height = 24;
    logoImg.alt = 'YouTube Subtitle Pro';
    logo.appendChild(logoImg);

    const brandText = document.createElement('div');
    brandText.className = 'ysp-whatsnew-brand-text';
    const appLine = document.createElement('div');
    appLine.className = 'ysp-whatsnew-app';
    const appName = document.createElement('span');
    const verBadge = document.createElement('span');
    verBadge.className = 'ysp-whatsnew-ver';
    verBadge.textContent = `v${version}`;
    appLine.appendChild(appName);
    appLine.appendChild(verBadge);

    const titleEl = document.createElement('div');
    titleEl.className = 'ysp-whatsnew-title';
    titleEl.id = 'ysp-whatsnew-title';
    const subEl = document.createElement('div');
    subEl.className = 'ysp-whatsnew-sub';

    brandText.appendChild(appLine);
    brandText.appendChild(titleEl);
    brandText.appendChild(subEl);

    brand.appendChild(logo);
    brand.appendChild(brandText);

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.alignItems = 'center';
    controls.style.gap = '10px';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'ysp-whatsnew-close';
    closeBtn.title = translations[lang]?.whatsNewClose || 'Close';
    closeBtn.setAttribute('aria-label', closeBtn.title);
    closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    closeBtn.addEventListener('click', close);

    controls.appendChild(closeBtn);

    header.appendChild(brand);
    header.appendChild(controls);

    const body = document.createElement('div');
    body.className = 'ysp-whatsnew-body';
    const list = document.createElement('div');
    list.className = 'ysp-whatsnew-list';
    body.appendChild(list);

    const footer = document.createElement('div');
    footer.className = 'ysp-whatsnew-footer';

    const supportNote = document.createElement('div');
    supportNote.className = 'ysp-whatsnew-support-note';
    const supportTitle = document.createElement('div');
    supportTitle.className = 'ysp-whatsnew-support-title';
    const supportBody = document.createElement('div');
    supportBody.className = 'ysp-whatsnew-support-body';
    supportNote.appendChild(supportTitle);
    supportNote.appendChild(supportBody);

    const supportLink = document.createElement('a');
    supportLink.className = 'ysp-whatsnew-support-link';
    supportLink.href = getSupportUrl(lang);
    supportLink.target = '_blank';
    supportLink.rel = 'noopener noreferrer';

    const checkboxWrap = document.createElement('label');
    checkboxWrap.className = 'ysp-whatsnew-checkbox';
    const dontShow = document.createElement('input');
    dontShow.type = 'checkbox';
    dontShow.checked = false;
    const dontShowText = document.createElement('span');
    checkboxWrap.appendChild(dontShow);
    checkboxWrap.appendChild(dontShowText);

    footer.appendChild(supportNote);
    footer.appendChild(checkboxWrap);

    const actions = document.createElement('div');
    actions.className = 'ysp-whatsnew-actions';
    const doneBtn = document.createElement('button');
    doneBtn.type = 'button';
    doneBtn.className = 'ysp-whatsnew-done';
    doneBtn.addEventListener('click', close);
    actions.appendChild(supportLink);
    actions.appendChild(doneBtn);
    footer.appendChild(actions);

    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(footer);

    const render = () => {
        const d = data[lang];
        modal.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        appName.textContent = translations[lang]?.panelTitle || 'YouTube Subtitle Pro';
        titleEl.textContent = d.title;
        subEl.textContent = d.sub;
        supportLink.href = getSupportUrl(lang);
        supportLink.textContent = d.supportLinkText;
        supportTitle.textContent = d.supportTitle;
        supportBody.textContent = d.supportBody;
        dontShowText.textContent = d.dontShow;
        doneBtn.textContent = d.done;
        closeBtn.title = translations[lang]?.whatsNewClose || 'Close';
        closeBtn.setAttribute('aria-label', closeBtn.title);

        while (list.firstChild) list.removeChild(list.firstChild);
        d.items.forEach((it) => {
            const item = document.createElement('article');
            item.className = 'ysp-whatsnew-item';
            const st = document.createElement('span');
            st.className = 'ysp-whatsnew-item-title';
            st.textContent = it.t;
            const desc = document.createElement('div');
            desc.className = 'ysp-whatsnew-desc';
            desc.textContent = it.d;
            item.appendChild(st);
            item.appendChild(desc);
            list.appendChild(item);
        });
    };

    const syncLangWithUI = () => {
        const next = (uiLang === 'ar' || uiLang === 'en') ? uiLang : 'en';
        if (next !== lang) {
            lang = next;
            render();
        }
    };

    window.__yspWhatsNewSyncLang = syncLangWithUI;

    const closeOnEsc = (e) => {
        if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', closeOnEsc, true);

    function close() {
        document.removeEventListener('keydown', closeOnEsc, true);
        overlay.remove();
        window.__yspWhatsNewShown = false;
        window.__yspWhatsNewLastCloseAt = Date.now();
        if (window.__yspWhatsNewSyncLang === syncLangWithUI) {
            delete window.__yspWhatsNewSyncLang;
        }
        const current = safeRuntimeCall(() => chrome.runtime.getManifest().version, EXTENSION_VERSION_FALLBACK);
        if (dontShow.checked) {
            safeStorageSet({ [`yspWhatsNewDismissed_${current}`]: true });
        }
    }

    render();
    document.body.appendChild(overlay);
    doneBtn.focus({ preventScroll: true });
}

function maybeShowWhatsNewOnUpdate(attempt = 0) {
    if (window.top !== window) return;
    if (typeof attempt !== 'number') attempt = 0;
    if (!isExtensionAlive()) return;
    let current = safeRuntimeCall(() => chrome.runtime.getManifest().version, null);
    if (!current) return;
    if (!(location.pathname === '/watch' || location.pathname.startsWith('/shorts'))) return;

    safeStorageGet([`yspWhatsNewDismissed_${current}`], (res) => {
        if (res[`yspWhatsNewDismissed_${current}`]) return;
        if (window.__yspWhatsNewShown) return;
        const lastCloseAt = typeof window.__yspWhatsNewLastCloseAt === 'number' ? window.__yspWhatsNewLastCloseAt : 0;
        if (lastCloseAt && Date.now() - lastCloseAt < WHATSNEW_MIN_GAP_MS) return;

        setTimeout(() => {
            if (document.hidden) return;
            if (document.fullscreenElement) return;
            if (document.getElementById('ysp-panel-container')?.classList.contains('ysp-open')) return;
            const video = document.querySelector('video');
            if (!video) {
                if (attempt < 6) {
                    setTimeout(() => maybeShowWhatsNewOnUpdate(attempt + 1), 700);
                }
                return;
            }
            showWhatsNewModal(current);
        }, 900);
    });
}

function hideSupportPrompt(panel) {
    const el = panel ? panel.querySelector('#ysp-support-prompt') : null;
    if (el) el.classList.add('ysp-hidden');
}

function recordSupportTrigger(reason) {
    if (window.__yspSupportTriggerRecorded) return;
    safeStorageGet([SUPPORT_TRIGGER_KEY], (res) => {
        if (res[SUPPORT_TRIGGER_KEY]) {
            window.__yspSupportTriggerRecorded = true;
            return;
        }
        const payload = { reason, at: Date.now() };
        safeStorageSet({ [SUPPORT_TRIGGER_KEY]: payload }, () => {
            window.__yspSupportTriggerRecorded = true;
        });
    });
}

function maybeShowSupportPrompt(panel) {
    if (!panel) return;

    const promptEl = panel.querySelector('#ysp-support-prompt');
    if (!promptEl) return;

    const sAr = cachedSettings.ar || defaultAr;
    const sEn = cachedSettings.en || defaultEn;
    const blocked = Math.max(sAr.statsBlocked || 0, sEn.statsBlocked || 0);
    const hasCustomWords = ((sAr.customBlocking || '').trim().length > 0) || ((sEn.customBlocking || '').trim().length > 0);
    const usesBlocking = (sAr.enhancedBlocking || sEn.enhancedBlocking) && (blocked >= 3 || hasCustomWords);
    const eligibleByUse = usesBlocking || blocked >= SUPPORT_BLOCK_THRESHOLD;

    if (!eligibleByUse) {
        hideSupportPrompt(panel);
        return;
    }

    safeStorageGet([SUPPORT_FIRST_SEEN_KEY, SUPPORT_PROMPT_KEY, SUPPORT_TRIGGER_KEY], (res) => {
        const now = Date.now();
        const firstSeenAt = typeof res[SUPPORT_FIRST_SEEN_KEY] === 'number' ? res[SUPPORT_FIRST_SEEN_KEY] : 0;
        const promptState = res[SUPPORT_PROMPT_KEY] || {};
        const trigger = res[SUPPORT_TRIGGER_KEY];
        const dismissed = !!promptState.dismissed;
        const lastShownAt = typeof promptState.lastShownAt === 'number' ? promptState.lastShownAt : 0;

        if (!firstSeenAt) {
            safeStorageSet({ [SUPPORT_FIRST_SEEN_KEY]: now });
            hideSupportPrompt(panel);
            return;
        }

        if (!trigger && blocked < SUPPORT_BLOCK_THRESHOLD) {
            hideSupportPrompt(panel);
            return;
        }

        if (dismissed) {
            hideSupportPrompt(panel);
            return;
        }

        const qualifiesEarly = !!trigger || blocked >= SUPPORT_BLOCK_THRESHOLD;
        if (!qualifiesEarly && now - firstSeenAt < SUPPORT_PROMPT_MIN_AGE_MS) {
            hideSupportPrompt(panel);
            return;
        }

        if (lastShownAt && now - lastShownAt < SUPPORT_PROMPT_COOLDOWN_MS) {
            hideSupportPrompt(panel);
            return;
        }

        promptEl.classList.remove('ysp-hidden');
        safeStorageSet({
            [SUPPORT_PROMPT_KEY]: {
                ...promptState,
                lastShownAt: now,
                shownCount: (promptState.shownCount || 0) + 1
            }
        });
    });
}

function createPanel() {
    const getIdealParent = () => {

        if (document.fullscreenElement) return document.fullscreenElement;

        return document.body;
    };

    if (document.getElementById('ysp-panel-container')) {
        const panel = document.getElementById('ysp-panel-container');
        syncYspUITheme(panel);
        ensureYspThemeObserver();
        const idealParent = getIdealParent();
        if (panel.parentElement !== idealParent) {
            idealParent.appendChild(panel);
        }
        return;
    }

    ensurePanelStyles();

    const container = document.createElement('div');
    container.id = 'ysp-panel-container';
    syncYspUITheme(container);
    ensureYspThemeObserver();
    // Use DOMParser to avoid unsafe innerHTML assignment warning
    const parser = new DOMParser();
    const doc = parser.parseFromString(getPanelHTML(), 'text/html');
    while (doc.body.firstChild) {
        container.appendChild(doc.body.firstChild);
    }

    const activeLangBtn = container.querySelector(`.ysp-ui-lang-btn[data-lang="${uiLang}"]`);
    if (activeLangBtn) activeLangBtn.classList.add('active');

    const idealParent = getIdealParent();
    idealParent.appendChild(container);

    bindPanelEvents(container);
    updatePanelTexts();
    updatePanelValues();
    enhanceSlidersWithValues(container);
}

// v3.0 — Wrap each range slider with an EDITABLE value chip (number input)
// that updates live and clamps to min/max.
function enhanceSlidersWithValues(panel) {
    const ranges = panel.querySelectorAll('input.ysp-input-range');
    ranges.forEach(input => {
        if (input.dataset.yspValueChip === '1') return;
        const parent = input.parentElement;
        let wrap = parent;
        if (!parent.classList.contains('ysp-range-wrap')) {
            wrap = document.createElement('div');
            wrap.className = 'ysp-range-wrap';
            parent.insertBefore(wrap, input);
            wrap.appendChild(input);
        }

        const chip = document.createElement('input');
        chip.type = 'number';
        chip.className = 'ysp-range-value';
        chip.value = input.value;
        if (input.min !== '') chip.min = input.min;
        if (input.max !== '') chip.max = input.max;
        chip.step = input.step || '1';
        chip.setAttribute('aria-label', input.id || 'value');
        wrap.appendChild(chip);

        const isFloat = chip.step && String(chip.step).includes('.');
        const formatForChip = (raw) => {
            if (raw === '' || raw === null || raw === undefined) return '';
            const n = parseFloat(raw);
            if (isNaN(n)) return '';
            return isFloat ? String(parseFloat(n.toFixed(2))) : String(Math.round(n));
        };

        // Slider → chip (live)
        const sliderToChip = () => {
            chip.value = formatForChip(input.value);
        };
        input.addEventListener('input', sliderToChip);
        input.addEventListener('change', sliderToChip);

        // Chip → slider (clamped + dispatched so settings save)
        const chipToSlider = (commit = false) => {
            let raw = chip.value.trim();
            if (raw === '' || raw === '-') return; // mid-typing — let the user finish
            let v = parseFloat(raw);
            if (isNaN(v)) {
                chip.value = formatForChip(input.value);
                return;
            }
            const min = parseFloat(input.min);
            const max = parseFloat(input.max);
            if (!isNaN(min) && v < min) v = min;
            if (!isNaN(max) && v > max) v = max;

            if (commit) chip.value = formatForChip(v);
            if (String(input.value) !== String(v)) {
                input.value = v;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        };
        chip.addEventListener('input', () => chipToSlider(false));
        chip.addEventListener('change', () => chipToSlider(true));
        chip.addEventListener('blur', () => chipToSlider(true));
        chip.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                chipToSlider(true);
                chip.blur();
            }
        });

        input.dataset.yspValueChip = '1';
    });
}

document.addEventListener('fullscreenchange', () => {
    const panel = document.getElementById('ysp-panel-container');
    if (panel) {

        createPanel();
    }
});

function togglePanel() {
    createPanel();
    const panel = document.getElementById('ysp-panel-container');
    panelVisible = !panelVisible;
    if (panelVisible) {
        editSurface = getShortsRouteVideoId() ? 'shorts' : 'video';
        panel.classList.add('ysp-open');

        runImmediateCaptionMutationPass();
        updatePanelValues();
        maybeShowSupportPrompt(panel);
        capturePreviewFrame();
    } else {
        panel.classList.remove('ysp-open');
    }
}

// v3.0 — Capture a real frame from the YouTube video onto the preview canvas.
// Falls back gracefully if the video isn't ready or the canvas is tainted.
function capturePreviewFrame() {
    const card = document.getElementById('ysp-preview-card');
    const canvas = document.getElementById('ysp-preview-canvas');
    const activePlayer = getYouTubePlayer();
    const video = activePlayer && activePlayer.querySelector ? activePlayer.querySelector('video') : document.querySelector('video');
    if (!card || !canvas || !video) return;

    if (!video.videoWidth || !video.videoHeight || video.readyState < 2) {
        card.classList.remove('has-frame');
        return;
    }

    try {
        const w = 360;
        const h = Math.round(w * (video.videoHeight / video.videoWidth));
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, w, h);
        card.classList.add('has-frame');
    } catch (err) {
        // CORS-tainted canvases will throw on read; just keep the gradient fallback.
        console.warn('[YSP] Preview frame capture failed:', err.message);
        card.classList.remove('has-frame');
    }
}

function closePanel() {
    const panel = document.getElementById('ysp-panel-container');
    if (panel) {
        panelVisible = false;
        panel.classList.remove('ysp-open');
    }
}

function getDisplayedCaptionEditTarget() {
    const selector = '.ytp-caption-window-container, .ytp-caption-window, .caption-window';
    const windows = Array.from(document.querySelectorAll(selector)).filter(win => {
        const parent = win.parentElement ? win.parentElement.closest(selector) : null;
        if (parent) return false;
        if (win.closest('.ytp-inline-preview-ui, .ytp-video-preview, .ytd-video-preview, .ytp-tooltip, .ytp-storyboard')) return false;
        const inShortsTree = !!win.closest('.ytp-reel-video-player, ytd-reel-video-renderer, ytd-shorts');
        const activeShortsWindow = isActiveShortsPlaybackWindow(win, getCaptionPlayer(win));
        if ((inShortsTree || getShortsRouteVideoId()) && !activeShortsWindow) return false;
        return hasActiveCaptionText(win);
    });

    if (!windows.length) return null;

    const text = normalizeCaptionText(windows.map(win => win.innerText || win.textContent || '').join(' '));
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';
    if (/[a-zA-Z]/.test(text)) return 'en';

    if (windows.some(win => win.classList.contains('is-arabic') || !!win.querySelector('.is-arabic'))) return 'ar';
    if (windows.some(win => win.classList.contains('is-english') || !!win.querySelector('.is-english'))) return 'en';
    return null;
}

function syncEditTargetToDisplayedCaptions() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panelVisible || !panel) return false;

    const nextTarget = getDisplayedCaptionEditTarget();
    if (!nextTarget || nextTarget === editTarget) return false;

    editTarget = nextTarget;
    updatePanelValues();
    return true;
}

function activatePanelTab(panel, tabId) {
    if (!panel || !tabId) return;
    panel.querySelectorAll('.ysp-tab').forEach(t => t.classList.remove('active'));
    panel.querySelectorAll('.ysp-tab-content').forEach(c => c.classList.remove('active'));

    const tab = panel.querySelector(`.ysp-tab[data-tab="${tabId}"]`);
    const content = panel.querySelector(`#${tabId}`);
    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');
}

function scrollPanelControlIntoView(panel, selector) {
    const el = panel && panel.querySelector(selector);
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

function normalizeSettingsSearchTerm(value) {
    return String(value || '')
        .toLowerCase()
        .normalize('NFKC')
        .replace(/[\u064B-\u065F\u0670]/g, '')
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/\s+/g, ' ')
        .trim();
}

function getSettingsSearchIndex() {
    return [
        { tab: 'tab-main', selector: '#fontSize', label: { ar: 'حجم الخط', en: 'Font size' }, group: { ar: 'الرئيسي', en: 'Main' }, keywords: ['خط', 'حجم', 'size', 'font'] },
        { tab: 'tab-main', selector: '#bottomPos', label: { ar: 'ارتفاع الترجمة', en: 'Subtitle height' }, group: { ar: 'الرئيسي', en: 'Main' }, keywords: ['ارتفاع', 'رفع', 'خفض', 'bottom', 'height'] },
        { tab: 'tab-main', selector: '#subDelay', label: { ar: 'تأخير الترجمة', en: 'Subtitle delay' }, group: { ar: 'الرئيسي', en: 'Main' }, keywords: ['تاخير', 'تأخير', 'توقيت', 'sync', 'delay', 'subtitle delay'] },
        { tab: 'tab-main', selector: '#dyslexiaMode', label: { ar: 'وضع القراءة المريحة', en: 'Dyslexia-friendly mode' }, group: { ar: 'الرئيسي', en: 'Main' }, keywords: ['قراءة', 'ديسلكسيا', 'dyslexia', 'reading'] },
        { tab: 'tab-main', selector: '#fullscreenAssistant', label: { ar: 'علامة التخصيص في ملء الشاشة', en: 'Fullscreen assistant' }, group: { ar: 'الرئيسي', en: 'Main' }, keywords: ['ملء الشاشة', 'فول سكرين', 'fullscreen', 'assistant'] },

        { tab: 'tab-style', selector: '#fontFamily', label: { ar: 'نوع الخط', en: 'Font family' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['نوع الخط', 'خط', 'font family', 'youtube font'] },
        { tab: 'tab-style', selector: '#fontUploadBtn', label: { ar: 'رفع خط مخصص', en: 'Upload custom font' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['رفع خط', 'خط مخصص', 'upload font', 'custom font'] },
        { tab: 'tab-style', selector: '#fontWeight', label: { ar: 'سماكة الخط', en: 'Font weight' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['سماكة', 'عريض', 'weight', 'bold'] },
        { tab: 'tab-style', selector: '#fontColor', label: { ar: 'لون النص', en: 'Text color' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['لون', 'نص', 'color', 'text color'] },
        { tab: 'tab-style', selector: '#bgColor', label: { ar: 'لون خلفية النص', en: 'Background color' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['لون الخلفية', 'خلفية النص', 'background color', 'caption background'] },
        { tab: 'tab-style', selector: '#strokeColor', label: { ar: 'لون الحدود', en: 'Stroke color' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['حدود', 'لون الحدود', 'stroke', 'outline'] },
        { tab: 'tab-style', selector: '#strokeWidth', label: { ar: 'سماكة الحدود', en: 'Stroke width' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['حدود', 'سماكة الحدود', 'stroke width', 'outline width'] },
        { tab: 'tab-style', selector: '#strokeOpacity', label: { ar: 'شفافية الحدود', en: 'Stroke opacity' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['شفافية الحدود', 'stroke opacity', 'outline opacity'] },
        { tab: 'tab-style', selector: '#textOpacity', label: { ar: 'شفافية النص', en: 'Text opacity' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['شفافية النص', 'opacity', 'text opacity'] },
        { tab: 'tab-style', selector: '#shadowIntensity', label: { ar: 'قوة الظل', en: 'Shadow intensity' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['ظل', 'قوة الظل', 'shadow'] },
        { tab: 'tab-style', selector: '#bgOpacity', label: { ar: 'شفافية خلفية النص', en: 'Background opacity' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['شفافية الخلفية', 'خلفية', 'background opacity', 'opacity'] },
        { tab: 'tab-style', selector: '#bgBlur', label: { ar: 'تمويه الخلفية', en: 'Background blur' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['تمويه', 'بلور', 'blur', 'background blur'] },
        { tab: 'tab-style', selector: '#lineHeight', label: { ar: 'تباعد الأسطر', en: 'Line height' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['تباعد', 'اسطر', 'line height', 'spacing'] },
        { tab: 'tab-style', selector: '#letterSpacing', label: { ar: 'تباعد الحروف', en: 'Letter spacing' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['تباعد الحروف', 'حروف', 'letter spacing', 'spacing'] },
        { tab: 'tab-style', selector: '#padding', label: { ar: 'مساحة داخلية', en: 'Padding' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['مساحة', 'حواف', 'padding'] },
        { tab: 'tab-style', selector: '#borderRadius', label: { ar: 'استدارة الخلفية', en: 'Border radius' }, group: { ar: 'المظهر', en: 'Style' }, keywords: ['استدارة', 'زوايا', 'radius', 'border radius'] },
        { tab: 'tab-advanced', selector: '#allowNativeCaptionDrag', label: { ar: 'سماح بسحب يوتيوب الأصلي', en: 'Allow YouTube native drag' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['سحب', 'تحريك', 'يوتيوب', 'أصلي', 'drag', 'move', 'native', 'youtube'] },
        { tab: 'tab-advanced', selector: '#resetNativeCaptionPositionBtn', label: { ar: 'إرجاع مكان الترجمة', en: 'Reset caption position' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['إرجاع', 'استعادة', 'وسط', 'مكان', 'ترجمة', 'reset', 'caption position', 'center'] },
        { tab: 'tab-advanced', selector: '#customSrtEnabled', label: { ar: 'ترجمة SRT مخصصة', en: 'Custom SRT captions' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['srt', 'ملف', 'ترجمة مخصصة', 'local subtitles'] },
        { tab: 'tab-advanced', selector: '#srtUploadBtn', label: { ar: 'رفع ملف SRT', en: 'Upload SRT' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['srt', 'رفع ملف', 'upload srt'] },
        { tab: 'tab-advanced', selector: '#srtClearBtn', label: { ar: 'حذف ملف SRT', en: 'Clear SRT file' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['srt', 'حذف ملف', 'clear srt', 'remove srt'] },
        { tab: 'tab-advanced', selector: '#smartTiming', label: { ar: 'توقيت ذكي', en: 'Smart timing' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['توقيت', 'موسيقى', 'صمت', 'smart timing', 'music'] },
        { tab: 'tab-advanced', selector: '#enhancedBlocking', label: { ar: 'حجب الكلمات المزعجة', en: 'Enhanced blocking' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['حجب', 'تنظيف', 'كلمات', 'blocking', 'cleanup'] },
        { tab: 'tab-advanced', selector: '#customBlocking', label: { ar: 'كلمات محجوبة مخصصة', en: 'Custom blocked words' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['كلمات', 'فلتر', 'custom blocking', 'blocked words'] },
        { tab: 'tab-advanced', selector: '#showStatsBtn', label: { ar: 'إحصائيات الحجب', en: 'Blocking statistics' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['احصائيات', 'إحصائيات', 'stats', 'statistics'] },
        { tab: 'tab-advanced', selector: '#playbackSpeed', label: { ar: 'سرعة التشغيل', en: 'Playback speed' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['سرعة', 'تشغيل', 'speed', 'playback speed'] },
        { tab: 'tab-advanced', selector: '#templateNameInput', label: { ar: 'اسم القالب', en: 'Template name' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['قالب', 'قوالب', 'template', 'preset'] },
        { tab: 'tab-advanced', selector: '#saveTemplateBtn', label: { ar: 'حفظ القالب', en: 'Save template' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['حفظ', 'قالب', 'save template', 'preset'] },
        { tab: 'tab-advanced', selector: '#resetBtn', label: { ar: 'إعادة الإعدادات الافتراضية', en: 'Reset defaults' }, group: { ar: 'متقدم', en: 'Advanced' }, keywords: ['اعادة', 'إعادة', 'افتراضي', 'reset', 'defaults'] },
        { hiddenExperimental: true, label: { ar: 'وضع الجمل / آلة الكتابة', en: 'Phrase / typewriter mode' }, group: { ar: 'تجريبي', en: 'Experimental' }, keywords: ['جمل', 'عبارات', 'الة كتابة', 'آلة كتابة', 'typewriter', 'phrase', 'phrases'] }
    ];
}

function renderSettingsSearchResults(panel, query) {
    const results = panel && panel.querySelector('#yspSettingsSearchResults');
    if (!results) return;

    const normalizedQuery = normalizeSettingsSearchTerm(query);
    results.textContent = '';

    if (!normalizedQuery) {
        results.hidden = true;
        return;
    }

    const lang = uiLang === 'ar' ? 'ar' : 'en';
    const matches = getSettingsSearchIndex()
        .filter(item => {
            const haystack = [
                item.label?.ar,
                item.label?.en,
                item.group?.ar,
                item.group?.en,
                ...(item.keywords || [])
            ].map(normalizeSettingsSearchTerm).join(' ');
            return haystack.includes(normalizedQuery);
        })
        .slice(0, 6);

    if (matches.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'ysp-settings-search-result ysp-settings-search-empty';
        empty.textContent = translations[lang]?.settingsSearchNoResults || 'No matching settings';
        results.appendChild(empty);
        results.hidden = false;
        return;
    }

    matches.forEach(item => {
        const row = item.hiddenExperimental ? document.createElement('div') : document.createElement('button');
        row.className = 'ysp-settings-search-result';
        if (item.hiddenExperimental) {
            row.classList.add('is-disabled');
            row.dataset.hiddenExperimental = 'true';
        } else {
            row.type = 'button';
            row.dataset.tab = item.tab;
            row.dataset.selector = item.selector;
        }

        const textWrap = document.createElement('span');
        const main = document.createElement('span');
        main.className = 'ysp-settings-search-result-main';
        main.textContent = item.label?.[lang] || item.label?.en || '';

        const sub = document.createElement('span');
        sub.className = 'ysp-settings-search-result-sub';
        sub.textContent = item.hiddenExperimental
            ? (translations[lang]?.settingsSearchHiddenExperimental || 'This experimental mode is temporarily hidden for stability.')
            : (item.group?.[lang] || item.group?.en || '');

        textWrap.appendChild(main);
        textWrap.appendChild(sub);
        row.appendChild(textWrap);

        if (!item.hiddenExperimental) {
            const hint = document.createElement('span');
            hint.className = 'ysp-settings-search-result-hint';
            hint.textContent = translations[lang]?.settingsSearchJumpHint || 'Click to jump';
            row.appendChild(hint);
        }

        results.appendChild(row);
    });

    results.hidden = false;
}

function highlightSettingRow(panel, selector) {
    const el = panel && panel.querySelector(selector);
    if (!el) return;
    const target = el.closest('.ysp-row') || el.closest('.ysp-section') || el;
    panel.querySelectorAll('.ysp-setting-jump-highlight').forEach(node => node.classList.remove('ysp-setting-jump-highlight'));
    target.classList.add('ysp-setting-jump-highlight');
    window.setTimeout(() => {
        target.classList.remove('ysp-setting-jump-highlight');
    }, 950);
}

function jumpToSetting(panel, item) {
    if (!panel || !item || !item.tab || !item.selector) return;
    activatePanelTab(panel, item.tab);
    window.setTimeout(() => {
        scrollPanelControlIntoView(panel, item.selector);
        highlightSettingRow(panel, item.selector);
    }, 40);
}

function bindPanelEvents(panel) {

    const preventShortcuts = (e) => {
        const target = e.target;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA')) {
            if (target.id === 'yspSettingsSearch' && e.key === 'Escape') {
                target.value = '';
                renderSettingsSearchResults(panel, '');
                target.blur();
                e.preventDefault();
            }
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    };
    panel.addEventListener('keydown', preventShortcuts, true);
    panel.addEventListener('keyup', preventShortcuts, true);
    panel.addEventListener('keypress', preventShortcuts, true);

    panel.querySelector('#ysp-close').addEventListener('click', closePanel);

    const supportNowBtn = panel.querySelector('#yspSupportNow');
    if (supportNowBtn) {
        supportNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const now = Date.now();
            safeStorageGet([SUPPORT_PROMPT_KEY], (res) => {
                const promptState = res[SUPPORT_PROMPT_KEY] || {};
                safeStorageSet({
                    [SUPPORT_PROMPT_KEY]: {
                        ...promptState,
                        lastShownAt: now,
                        supportClickedAt: now
                    }
                });
            });
            window.open(getSupportUrl(), '_blank');
            hideSupportPrompt(panel);
        });
    }

    const supportLaterBtn = panel.querySelector('#yspSupportLater');
    if (supportLaterBtn) {
        supportLaterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const now = Date.now();
            safeStorageGet([SUPPORT_PROMPT_KEY], (res) => {
                const promptState = res[SUPPORT_PROMPT_KEY] || {};
                safeStorageSet({
                    [SUPPORT_PROMPT_KEY]: {
                        ...promptState,
                        lastShownAt: now,
                        laterClickedAt: now
                    }
                });
            });
            hideSupportPrompt(panel);
        });
    }

    const supportNeverLink = panel.querySelector('#yspSupportNever');
    if (supportNeverLink) {
        supportNeverLink.addEventListener('click', (e) => {
            e.preventDefault();
            const now = Date.now();
            safeStorageGet([SUPPORT_PROMPT_KEY], (res) => {
                const promptState = res[SUPPORT_PROMPT_KEY] || {};
                safeStorageSet({
                    [SUPPORT_PROMPT_KEY]: {
                        ...promptState,
                        dismissed: true,
                        dismissedAt: now
                    }
                });
            });
            hideSupportPrompt(panel);
        });
    }

    panel.querySelectorAll('.ysp-ui-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            panel.querySelectorAll('.ysp-ui-lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            uiLang = btn.dataset.lang;
            safeStorageSet({ uiLanguage: uiLang });
            updatePanelTexts();
            updateAllRangeBackgrounds();
            loadCustomTemplates();
        });
    });

    panel.querySelectorAll('.ysp-target-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            editTarget = btn.dataset.target;
            updatePanelValues();
        });
    });

    panel.querySelectorAll('.ysp-surface-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextSurface = btn.dataset.surface === 'shorts' ? 'shorts' : 'video';
            if (nextSurface === editSurface) return;
            editSurface = nextSurface;
            selectedTemplateName = null;
            pendingOverwrite = null;
            const templateInput = panel.querySelector('#templateNameInput');
            if (templateInput) templateInput.value = '';
            updatePanelValues();
            updateSaveButtonState();
        });
    });

    panel.querySelectorAll('.ysp-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            activatePanelTab(panel, tab.dataset.tab);
        });
    });

    const settingsSearchInput = panel.querySelector('#yspSettingsSearch');
    const settingsSearchResults = panel.querySelector('#yspSettingsSearchResults');
    if (settingsSearchInput && settingsSearchResults) {
        settingsSearchInput.addEventListener('input', () => {
            renderSettingsSearchResults(panel, settingsSearchInput.value);
        });
        settingsSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                settingsSearchInput.value = '';
                renderSettingsSearchResults(panel, '');
                settingsSearchInput.blur();
            }
        });
        settingsSearchResults.addEventListener('click', (e) => {
            const result = e.target.closest('.ysp-settings-search-result');
            if (!result || result.classList.contains('is-disabled') || !result.dataset.selector) return;
            jumpToSetting(panel, { tab: result.dataset.tab, selector: result.dataset.selector });
            settingsSearchResults.hidden = true;
        });
    }

    const inputs = ['fontSize', 'bottomPos', 'shadowIntensity', 'bgColor', 'bgOpacity', 'bgBlur', 'fontFamily', 'fontWeight', 'fontColor', 'strokeColor', 'strokeWidth', 'strokeOpacity', 'textOpacity', 'lineHeight', 'letterSpacing', 'padding', 'borderRadius', 'allowNativeCaptionDrag', 'dyslexiaMode', 'fullscreenAssistant', 'smartTiming', 'subDelay', 'customBlocking', 'statsBlocked', 'enhancedBlocking', 'customSrtEnabled'];

    inputs.forEach(id => {
        const el = panel.querySelector(`#${id}`);
        if (!el) return;
        const handleSettingInput = (e, options = {}) => {
            const previewOnly = options.previewOnly === true;
            let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            if (e.target.type === 'range') {
                val = parseFloat(val);
                updateRangeBackground(e.target);
            }

            if (id === 'subDelay') {
                const disp = panel.querySelector('#subDelayVal');
                if (disp) disp.textContent = val + 's';
            }

            if (id === 'enhancedBlocking') {
                const group = panel.querySelector('#customBlockingGroup');
                if (group) group.style.display = val ? 'block' : 'none';
                const cb = panel.querySelector('#customBlocking');
                if (cb) cb.disabled = !val;
            }

            if (id === 'customBlocking') {
                const enabled = !!getCachedSubtitleSettings('video', editTarget).enhancedBlocking;
                if (enabled && typeof val === 'string' && val.trim().length > 0) {
                    recordSupportTrigger('customBlocking');
                }
            }

            if (id === 'fullscreenAssistant') {
                showFullscreenAssistant = val;
                safeStorageSet({ fullscreenAssistant: val });
                updateAssistantVisibility();
                return;
            }

            if (id === 'customSrtEnabled') {
                customSrtEnabled = !!val;
                safeStorageSet({ [CUSTOM_SRT_ENABLED_KEY]: customSrtEnabled });
                runImmediateCaptionMutationPass();
                return;
            }

            const storageKey = setEditedSetting(id, val);

            // v3.0 — Manual edit clears the preset highlight (user is customizing away from preset)
            const panelEl = document.getElementById('ysp-panel-container');
            if (SURFACE_STYLE_KEY_SET.has(id) && cachedSettings[storageKey].selectedPreset) {
                cachedSettings[storageKey].selectedPreset = null;
                if (panelEl) panelEl.querySelectorAll('.ysp-preset.active').forEach(p => p.classList.remove('active'));
            }

            // Native color pickers emit a dense stream of `input` events while the
            // user drags through the palette. Rebuilding the full caption stylesheet
            // and writing Chrome storage for every pixel movement can freeze YouTube.
            // Keep that hot path to the tiny drawer preview; the final `change` event
            // commits the color once and refreshes live captions.
            if (previewOnly) {
                updateColorPreview(id);
                return;
            }

            safeStorageSet({ [storageKey]: cachedSettings[storageKey] });

            updateCachedSubtitleStyles();
            if (id === 'allowNativeCaptionDrag' || id === 'bottomPos') {
                runImmediateCaptionMutationPass();
            }
            if (id === 'fontFamily' || id === 'dyslexiaMode') {
                runImmediateCaptionMutationPass();
            }
            updatePreview();
        };
        if (el.tagName === 'SELECT') {
            el.addEventListener('change', handleSettingInput);
        } else if (el.type === 'color') {
            el.addEventListener('input', (e) => handleSettingInput(e, { previewOnly: true }));
            el.addEventListener('change', handleSettingInput);
        } else {
            el.addEventListener('input', handleSettingInput);
        }
    });

    const pbSpeed = panel.querySelector('#playbackSpeed');
    if (pbSpeed) {
        pbSpeed.addEventListener('input', (e) => {
            const requested = parseFloat(e.target.value);
            const video = document.querySelector('video');
            if (!video || Number.isNaN(requested)) return;

            const formatRate = (n) => {
                const str = (Math.round(n * 100) / 100).toString();
                return str.endsWith('.0') ? str.slice(0, -2) : str;
            };

            video.playbackRate = requested;
            video.defaultPlaybackRate = requested;

            const disp = panel.querySelector('#playbackSpeedVal');
            if (disp) disp.textContent = formatRate(requested) + 'x';
            updateRangeBackground(e.target);

            setTimeout(() => {
                const actual = video.playbackRate;
                if (Number.isFinite(actual) && Math.abs(actual - requested) > 0.001) {
                    e.target.value = actual;
                }
                if (disp) disp.textContent = formatRate(video.playbackRate) + 'x';
                updateRangeBackground(e.target);
            }, 60);
        });
    }

    panel.querySelectorAll('.ysp-preset').forEach(p => {
        p.addEventListener('click', () => {
            // Mark this preset as active, deactivate the rest
            panel.querySelectorAll('.ysp-preset').forEach(o => o.classList.remove('active'));
            p.classList.add('active');
            applyPreset(p.dataset.preset);
        });
    });

    panel.querySelector('#resetBtn').addEventListener('click', () => {
        const storageKey = getSubtitleProfileKey(editSurface, editTarget);
        cachedSettings[storageKey] = { ...getSubtitleProfileDefaults(storageKey) };
        safeStorageSet({ [storageKey]: cachedSettings[storageKey] });
        updatePanelValues();
        updateCachedSubtitleStyles();
        runImmediateCaptionMutationPass();
    });

    const resetNativeCaptionPositionBtn = panel.querySelector('#resetNativeCaptionPositionBtn');
    if (resetNativeCaptionPositionBtn) {
        resetNativeCaptionPositionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetNativeCaptionPosition();
        });
    }

    panel.querySelector('#saveTemplateBtn').addEventListener('click', saveCustomTemplate);

    const showStatsBtn = panel.querySelector('#showStatsBtn');
    if (showStatsBtn) {
        showStatsBtn.addEventListener('click', () => {
            const statsDisplay = panel.querySelector('#statsDisplay');
            if (statsDisplay) {
                const isHidden = statsDisplay.style.display === 'none';
                statsDisplay.style.display = isHidden ? 'block' : 'none';
                showStatsBtn.textContent = isHidden ? (uiLang === 'ar' ? 'إخفاء الإحصائيات' : 'Hide Statistics') : (uiLang === 'ar' ? 'عرض الإحصائيات' : 'Show Statistics');
                if (isHidden) {
                    const blockedCount = panel.querySelector('#statsBlockedCount');
                    if (blockedCount) {
                        blockedCount.textContent = getCachedSubtitleSettings('video', editTarget).statsBlocked || 0;
                    }
                }
            }
        });
    }

    const resetStatsBtn = panel.querySelector('#resetStatsBtn');
    if (resetStatsBtn) {
        resetStatsBtn.addEventListener('click', () => {
            const baseKey = getSubtitleProfileKey('video', editTarget);
            cachedSettings[baseKey].statsBlocked = 0;
            safeStorageSet({ [baseKey]: cachedSettings[baseKey] });
            const blockedCount = panel.querySelector('#statsBlockedCount');
            if (blockedCount) {
                blockedCount.textContent = '0';
            }
        });
    }

    const tmplInput = panel.querySelector('#templateNameInput');
    if (tmplInput) {
        tmplInput.addEventListener('input', () => {
            updateSaveButtonState();
        });
    }

    const fontUploadBtn = panel.querySelector('#fontUploadBtn');
    const fontUploadInput = panel.querySelector('#fontUpload');

    if (fontUploadBtn && fontUploadInput) {
        fontUploadBtn.addEventListener('click', () => fontUploadInput.click());

        fontUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Validate file extension
            const validExts = ['.ttf', '.otf', '.woff', '.woff2'];
            const lowerName = (file.name || '').toLowerCase();
            const validExt = validExts.some(ext => lowerName.endsWith(ext));
            if (!validExt) {
                alert(translations[uiLang].fontError + ' (.ttf / .otf / .woff / .woff2)');
                fontUploadInput.value = '';
                return;
            }

            // Validate file size — chrome.storage.local has a 5 MB cap.
            // Embedding a font as data: URL adds ~33% overhead on top of the binary size.
            // Limit to 500KB so two profiles (ar + en) + settings stay well under the cap.
            const MAX_FONT_BYTES = 500 * 1024;
            if (file.size > MAX_FONT_BYTES) {
                const sizeMB = (file.size / 1024 / 1024).toFixed(2);
                alert(`${translations[uiLang].fontError}\nFile too large (${sizeMB} MB). Max 500 KB.`);
                fontUploadInput.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function (event) {
                const fontData = event.target.result;
                const fontName = "CustomFont_" + Date.now();

                const fontFace = new FontFace(fontName, `url(${fontData})`);
                fontFace.load().then(function (loadedFace) {
                    document.fonts.add(loadedFace);

                    const storageKey = getSubtitleProfileKey(editSurface, editTarget);
                    cachedSettings[storageKey] = {
                        ...(cachedSettings[storageKey] || {}),
                        customFont: { name: fontName, data: fontData, fileName: file.name },
                        fontFamily: `'${fontName}', sans-serif`
                    };

                    safeStorageSet({ [storageKey]: cachedSettings[storageKey] });

                    updateFontSelect(fontName, file.name);
                    updatePanelValues();
                    updateCachedSubtitleStyles();
                    runImmediateCaptionMutationPass();

                    alert(translations[uiLang].fontUploaded);
                }).catch(function (error) {
                    console.error("[YSP] Font load error:", error);
                    alert(translations[uiLang].fontError);
                });
            };
            reader.onerror = function (err) {
                console.error("[YSP] Font read error:", err);
                alert(translations[uiLang].fontError);
            };
            reader.readAsDataURL(file);
        });
    }

    const srtUploadBtn = panel.querySelector('#srtUploadBtn');
    const srtUploadInput = panel.querySelector('#srtUpload');
    const srtClearBtn = panel.querySelector('#srtClearBtn');

    if (srtUploadBtn && srtUploadInput) {
        srtUploadBtn.addEventListener('click', () => srtUploadInput.click());
        srtUploadInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (evt) => {
                try {
                    const content = evt.target?.result || '';
                    const cues = parseSrtContent(content);
                    if (!cues.length) throw new Error('empty-cues');
                    customSrtData = { name: file.name, cues, lastIndex: 0, videoKey: getCurrentVideoKey() };
                    customSrtEnabled = true;
                    safeStorageSet({
                        [CUSTOM_SRT_DATA_KEY]: customSrtData,
                        [CUSTOM_SRT_ENABLED_KEY]: true
                    });
                    updateSrtStatusUI();
                    updatePanelValues();
                    runImmediateCaptionMutationPass();
                } catch (err) {
                    alert(translations[uiLang].srtError || 'Unable to parse SRT file.');
                }
            };
            reader.readAsText(file, 'utf-8');
        });
    }

    if (srtClearBtn) {
        srtClearBtn.addEventListener('click', () => {
            customSrtData = null;
            customSrtEnabled = false;
            safeStorageRemove([CUSTOM_SRT_DATA_KEY]);
            safeStorageSet({ [CUSTOM_SRT_ENABLED_KEY]: false });
            const cb = panel.querySelector('#customSrtEnabled');
            if (cb) cb.checked = false;
            updateSrtStatusUI();
            runImmediateCaptionMutationPass();
        });
    }
}

function updateFontSelect(customFontName, customFontDisplayName) {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;
    const select = panel.querySelector('#fontFamily');
    if (!select) return;

    const oldOpt = select.querySelector('option[data-custom="true"]');
    if (oldOpt) oldOpt.remove();

    if (customFontName && customFontDisplayName) {
        const option = document.createElement('option');
        option.value = `'${customFontName}', sans-serif`;
        option.textContent = "📂 " + customFontDisplayName;
        option.dataset.custom = "true";
        option.selected = true;
        select.insertBefore(option, select.firstChild);
    }
}

function updateRangeBackground(el) {
    if (!el || el.type !== 'range') return;
    const min = parseFloat(el.min) || 0;
    const max = parseFloat(el.max) || 100;
    const val = parseFloat(el.value) || 0;
    const percentage = ((val - min) / (max - min)) * 100;

    const isRTL = uiLang === 'ar';

    const direction = isRTL ? 'to left' : 'to right';

    el.style.background = `linear-gradient(${direction}, var(--ysp-accent) ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;
}

function updateAllRangeBackgrounds() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;
    panel.querySelectorAll('input[type="range"]').forEach(el => {
        updateRangeBackground(el);
    });
}

function updatePanelTexts() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;

    const browserLang = safeGetBrowserUiLanguage();
    const isBrowserRTL = browserLang.startsWith('ar') || browserLang.startsWith('he') || browserLang.startsWith('fa');

    panel.classList.toggle('ysp-browser-rtl', isBrowserRTL);
    panel.classList.toggle('ysp-rtl', uiLang === 'ar');
    panel.classList.toggle('ysp-ltr', uiLang !== 'ar');
    if (uiLang === 'ar') ensurePackagedUiArabicFont();

    panel.style.direction = uiLang === 'ar' ? 'rtl' : 'ltr';
    panel.querySelector('.ysp-brand').style.textAlign = uiLang === 'ar' ? 'right' : 'left';

    panel.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[uiLang][key]) {
            el.textContent = translations[uiLang][key];
        }
    });

    panel.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[uiLang][key]) {
            el.placeholder = translations[uiLang][key];
            el.setAttribute('aria-label', translations[uiLang][key]);
        }
    });

    const supportLink = panel.querySelector('#link-support');
    if (supportLink) {
        supportLink.href = getSupportUrl(uiLang);
    }

    const previewText = panel.querySelector('#ysp-preview-text');
    previewText.textContent = uiLang === 'ar' ? 'نص تجريبي' : 'Preview Text';
    previewText.style.direction = uiLang === 'ar' ? 'rtl' : 'ltr';

    const tmplInput = panel.querySelector('#templateNameInput');
    if (tmplInput) {
        tmplInput.placeholder = translations[uiLang].templateName;
    }

    updateSrtStatusUI();
    const settingsSearchInput = panel.querySelector('#yspSettingsSearch');
    if (settingsSearchInput && settingsSearchInput.value) {
        renderSettingsSearchResults(panel, settingsSearchInput.value);
    }
    updateAssistantTooltip();
    if (typeof window.__yspWhatsNewSyncLang === 'function') {
        window.__yspWhatsNewSyncLang();
    }
}

function updatePanelValues() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;

    const s = getEditedSettings();

    // v3.0 — Highlight the currently selected preset (if any)
    panel.querySelectorAll('.ysp-preset').forEach(p => p.classList.remove('active'));
    if (s.selectedPreset) {
        const activeTile = panel.querySelector(`.ysp-preset[data-preset="${s.selectedPreset}"]`);
        if (activeTile) activeTile.classList.add('active');
    }

    if (s.customFont && s.customFont.name && s.customFont.fileName) {
        updateFontSelect(s.customFont.name, s.customFont.fileName);
    }

    Object.keys(s).forEach(key => {
        const el = panel.querySelector(`#${key}`);
        if (el) {
            if (el.type === 'checkbox') el.checked = s[key];
            else el.value = s[key];

            if (el.type === 'range') {
                updateRangeBackground(el);
                // v3.0 — sync the value chip too
                const chip = el.parentElement && el.parentElement.querySelector('.ysp-range-value');
                if (chip) {
                    const v = el.step && String(el.step).includes('.')
                        ? parseFloat(el.value).toFixed(2).replace(/\.?0+$/, '')
                        : el.value;
                    chip.textContent = v;
                }
            }
        }
    });


    const customBlockingGroup = panel.querySelector('#customBlockingGroup');
    if (customBlockingGroup) customBlockingGroup.style.display = s.enhancedBlocking ? 'block' : 'none';
    const customBlockingInput = panel.querySelector('#customBlocking');
    if (customBlockingInput) customBlockingInput.disabled = !s.enhancedBlocking;

    // Update stats display
    const statsBlockedCount = panel.querySelector('#statsBlockedCount');
    if (statsBlockedCount && s.statsBlocked !== undefined) {
        statsBlockedCount.textContent = s.statsBlocked;
    }

    const fa = panel.querySelector('#fullscreenAssistant');
    if (fa) fa.checked = showFullscreenAssistant;
    const srtToggle = panel.querySelector('#customSrtEnabled');
    if (srtToggle) srtToggle.checked = !!customSrtEnabled;
    updateSrtStatusUI();

    const video = document.querySelector('video');
    const speedInput = panel.querySelector('#playbackSpeed');
    const speedVal = panel.querySelector('#playbackSpeedVal');
    if (video && speedInput && speedVal) {
        speedInput.value = video.playbackRate;
        speedVal.textContent = video.playbackRate + 'x';
        updateRangeBackground(speedInput);
    }

    const subDelayVal = panel.querySelector('#subDelayVal');
    if (subDelayVal) {
        subDelayVal.textContent = (s.subDelay || 0) + 's';
    }

    panel.querySelectorAll('.ysp-target-btn').forEach(btn => {
        if (btn.dataset.target === editTarget) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    panel.querySelectorAll('.ysp-surface-btn').forEach(btn => {
        const active = btn.dataset.surface === editSurface;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    updatePreview();
    loadCustomTemplates();
}

function updatePreview() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;
    const pt = panel.querySelector('#ysp-preview-text');
    if (!pt) return;
    const s = getEditedSettings();

    // Use the new sample text matching the editTarget
    pt.textContent = editTarget === 'ar' ? 'نص تجريبي' : 'Preview Text';

    const usesCustomFont = isSelectedCustomSubtitleFont(s);
    let fontFamily = getEffectiveSubtitleFontFamily(s.fontFamily).replace(/'/g, "");
    if (s.dyslexiaMode && !usesCustomFont) fontFamily = (editTarget === 'ar' ? ARABIC_DYSLEXIA_FONT_STACK : ENGLISH_DYSLEXIA_FONT_STACK).replace(/'/g, "");
    pt.style.fontFamily = fontFamily;
    pt.style.fontVariant = s.dyslexiaMode ? 'normal' : getSubtitleFontVariant(s.fontFamily);
    pt.style.fontSize = Math.max(13, Math.min(30, s.fontSize * 0.6)) + "px"; // Compact preview only
    pt.style.color = s.fontColor;
    pt.style.webkitTextFillColor = s.fontColor;
    pt.style.fontWeight = s.fontWeight;
    pt.style.opacity = (s.textOpacity != null ? s.textOpacity : 100) / 100;

    const strokeRgba = hexToRgba(s.strokeColor, s.strokeOpacity !== undefined ? s.strokeOpacity : 100);
    pt.style.webkitTextStroke = `${s.strokeWidth}px ${strokeRgba}`;
    pt.style.paintOrder = "stroke fill"; pt.style.webkitPaintOrder = "stroke fill";
    pt.style.textShadow = `0px 0px ${s.shadowIntensity}px rgba(0,0,0,0.8)`;

    // v3.0 — Use bgColor + bgOpacity (was hardcoded black, ignoring preset's bgColor)
    pt.style.backgroundColor = hexToRgba(s.bgColor || '#000000', s.bgOpacity);

    pt.style.backdropFilter = `blur(${s.bgBlur || 0}px)`;
    pt.style.webkitBackdropFilter = `blur(${s.bgBlur || 0}px)`;
    pt.style.borderRadius = s.borderRadius + "px";
    const previewPadding = Math.min(8, Math.max(0, s.padding || 0));
    pt.style.padding = `${previewPadding}px ${Math.max(7, previewPadding * 1.3)}px`;
    pt.style.letterSpacing = (s.letterSpacing || 0) + "px";
    pt.style.lineHeight = s.lineHeight;
    pt.style.textAlign = 'center';
    pt.style.display = 'inline-block';
    pt.style.maxWidth = '90%';
    pt.style.whiteSpace = 'pre-wrap';
}

function updateColorPreview(settingId) {
    const panel = document.getElementById('ysp-panel-container');
    const pt = panel && panel.querySelector('#ysp-preview-text');
    if (!pt) return;

    const settings = getEditedSettings();
    if (settingId === 'fontColor') {
        pt.style.color = settings.fontColor;
        pt.style.webkitTextFillColor = settings.fontColor;
        return;
    }
    if (settingId === 'strokeColor') {
        const strokeRgba = hexToRgba(
            settings.strokeColor,
            settings.strokeOpacity !== undefined ? settings.strokeOpacity : 100
        );
        pt.style.webkitTextStroke = `${settings.strokeWidth}px ${strokeRgba}`;
        return;
    }
    if (settingId === 'bgColor') {
        pt.style.backgroundColor = hexToRgba(settings.bgColor || '#000000', settings.bgOpacity);
    }
}

function applyPreset(type) {
    const storageKey = getSubtitleProfileKey(editSurface, editTarget);
    const base = { ...(cachedSettings[storageKey] || getSubtitleProfileDefaults(storageKey)) };
    // Each preset is COMPREHENSIVE — sets every visual field so result is deterministic
    // and matches its tile preview EXACTLY (same bgColor, fontColor, weight, spacing, etc.)
    // v3.0 — Sensible defaults so captions don't dominate the screen
    const defaultSize = editTarget === 'ar' ? 26 : 22;
    const baseDefaults = {
        fontSize: defaultSize, bottomPos: 10, bgBlur: 0, strokeOpacity: 100, textOpacity: 100,
        dyslexiaMode: false
    };
    const presets = {
        cinema:      { ...baseDefaults, bgColor: '#000000', bgOpacity: 24, fontColor: '#f5f3ea', strokeColor: '#000000', strokeWidth: 1, shadowIntensity: 5, fontWeight: 600, padding: 4,  borderRadius: 3, lineHeight: 1.32, letterSpacing: 0, strokeOpacity: 90 },
        minimal:     { ...baseDefaults, bgColor: '#000000', bgOpacity: 0,  fontColor: '#ffffff', strokeColor: '#000000', strokeWidth: 0, shadowIntensity: 0, fontWeight: 400, padding: 6,  borderRadius: 0, lineHeight: 1.2,  letterSpacing: 0 },
        contrast:    { ...baseDefaults, bgColor: '#000000', bgOpacity: 32,  fontColor: '#f5f3ea', strokeColor: '#000000', strokeWidth: 1, shadowIntensity: 5, fontWeight: 600, padding: 4,  borderRadius: 3, lineHeight: 1.32, letterSpacing: 0, strokeOpacity: 90 },
        anime:       { ...baseDefaults, bgColor: '#7e2d8a', bgOpacity: 75, fontColor: '#fff7d6', strokeColor: '#5e1a8a', strokeWidth: 2, shadowIntensity: 8, fontWeight: 800, padding: 8,  borderRadius: 12, lineHeight: 1.25, letterSpacing: 0.5 },
        documentary: { ...baseDefaults, bgColor: '#141420', bgOpacity: 90, fontColor: '#f0e6d2', strokeColor: '#000000', strokeWidth: 0, shadowIntensity: 4, fontWeight: 500, padding: 12, borderRadius: 0, lineHeight: 1.4,  letterSpacing: 0.2 },
        news:        { ...baseDefaults, bgColor: '#c8202a', bgOpacity: 100, fontColor: '#ffffff', strokeColor: '#000000', strokeWidth: 0, shadowIntensity: 0, fontWeight: 900, padding: 14, borderRadius: 0, lineHeight: 1.3,  letterSpacing: 0.5 },
        gaming:      { ...baseDefaults, bgColor: '#000000', bgOpacity: 85, fontColor: '#00ff88', strokeColor: '#000000', strokeWidth: 0, shadowIntensity: 8, fontWeight: 700, padding: 10, borderRadius: 6, lineHeight: 1.2,  letterSpacing: 0.3 },
        asmr:        { ...baseDefaults, bgColor: '#3c1e32', bgOpacity: 50, fontColor: '#ffd0e0', strokeColor: '#3a1838', strokeWidth: 0, shadowIntensity: 12, fontWeight: 300, padding: 14, borderRadius: 16, lineHeight: 1.5,  letterSpacing: 0.6 },
        vlog:        { ...baseDefaults, bgColor: '#ffffff', bgOpacity: 92, fontColor: '#0a0a14', strokeColor: '#ffffff', strokeWidth: 0, shadowIntensity: 4, fontWeight: 700, padding: 10, borderRadius: 8, lineHeight: 1.3,  letterSpacing: 0 }
    };
    const preset = presets[type];
    if (!preset) return;
    Object.assign(base, preset);
    // Remember which preset is active so it stays highlighted on next panel open
    base.selectedPreset = type;
    cachedSettings[storageKey] = base;
    safeStorageSet({ [storageKey]: base });
    updatePanelValues();
    updateCachedSubtitleStyles();
}

// --- 6. LOGIC: CUSTOM TEMPLATES ---

function applyTemplateStylesToSurface(tmpl, surface = editSurface) {
    const storagePayload = {};
    ['ar', 'en'].forEach(lang => {
        const storageKey = getSubtitleProfileKey(surface, lang);
        const templateStyle = pickSurfaceStyle(tmpl && tmpl[lang]);
        const base = surface === 'shorts'
            ? getSubtitleProfileDefaults(storageKey)
            : (cachedSettings[storageKey] || getSubtitleProfileDefaults(storageKey));
        cachedSettings[storageKey] = { ...base, selectedPreset: null, ...templateStyle };
        storagePayload[storageKey] = cachedSettings[storageKey];
    });

    return storagePayload;
}

function loadCustomTemplates() {
    const list = document.getElementById('customTemplatesList');
    if (!list) return;
    list.innerHTML = '';

    if (customTemplates.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.style.cssText = "font-size:12px; color:#666; padding:10px; text-align:center;";
        emptyDiv.textContent = translations[uiLang].noTemplates;
        list.appendChild(emptyDiv);
        return;
    }

    customTemplates.forEach((tmpl, idx) => {
        const item = document.createElement('div');
        item.className = 'ysp-tmpl-item';
        if (selectedTemplateName === tmpl.name) {
            item.classList.add('selected');
        }

        // Create elements safely instead of innerHTML
        const nameSpan = document.createElement('span');
        nameSpan.className = 'ysp-tmpl-name';
        nameSpan.textContent = tmpl.name;
        item.appendChild(nameSpan);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'ysp-tmpl-actions';

        const applyBtn = document.createElement('button');
        applyBtn.className = 'ysp-tmpl-apply';
        applyBtn.title = translations[uiLang].applyTemplate;
        applyBtn.textContent = translations[uiLang].applyTemplate;
        actionsDiv.appendChild(applyBtn);

        const delSpan = document.createElement('span');
        delSpan.className = 'ysp-tmpl-del';
        delSpan.title = translations[uiLang].deleteTemplate;
        delSpan.textContent = '✕';
        actionsDiv.appendChild(delSpan);

        item.appendChild(actionsDiv);

        // Select (Click Name)
        item.querySelector('.ysp-tmpl-name').addEventListener('click', () => {
            selectTemplate(tmpl.name);
        });

        // Apply
        item.querySelector('.ysp-tmpl-apply').addEventListener('click', (e) => {
            e.stopPropagation();
            applyTemplate(tmpl);
        });

        // Delete
        item.querySelector('.ysp-tmpl-del').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`${translations[uiLang].deleteTemplate}?`)) {
                deleteTemplate(idx);
            }
        });

        list.appendChild(item);
    });
}

function selectTemplate(name) {
    const tmpl = customTemplates.find(t => t.name === name);
    if (!tmpl) return;

    selectedTemplateName = name;

    const nameInput = document.getElementById('templateNameInput');
    if (nameInput) nameInput.value = name;

    updateSaveButtonState();
    loadCustomTemplates();
}

function applyTemplate(tmpl) {
    const storagePayload = applyTemplateStylesToSurface(tmpl, editSurface);
    safeStorageSet(storagePayload);

    selectedTemplateName = tmpl.name;

    updatePanelValues();
    updateCachedSubtitleStyles();
    updateSaveButtonState();
}

function deleteTemplate(idx) {
    const deletedName = customTemplates[idx].name;
    customTemplates.splice(idx, 1);
    safeStorageSet({ customTemplates });

    if (selectedTemplateName === deletedName) {
        selectedTemplateName = null;
        const input = document.getElementById('templateNameInput');
        if (input) input.value = '';
        updateSaveButtonState();
    }
    loadCustomTemplates();
}

function updateSaveButtonState() {
    const btn = document.getElementById('saveTemplateBtn');
    const input = document.getElementById('templateNameInput');
    if (!btn || !input) return;

    if (selectedTemplateName && input.value.trim() === selectedTemplateName) {
        btn.textContent = translations[uiLang].updateTemplate;
        btn.classList.add('ysp-btn-primary');
    } else {
        btn.textContent = translations[uiLang].saveTemplate;

        btn.classList.add('ysp-btn-primary');
    }
}

let pendingOverwrite = null;

function saveCustomTemplate() {
    const input = document.getElementById('templateNameInput');
    const msg = document.getElementById('templateMsg');
    const name = input.value.trim();

    if (!name) return;

    if (selectedTemplateName && name === selectedTemplateName) {
        const idx = customTemplates.findIndex(t => t.name === name);
        if (idx !== -1) {
            customTemplates[idx] = {
                name: name,
                ...getSurfaceStylePair(editSurface)
            };
            safeStorageSet({ customTemplates }, () => {
                msg.textContent = translations[uiLang].templateSaved;
                msg.style.color = '#4caf50';
                loadCustomTemplates();
                setTimeout(() => { if (msg) msg.textContent = ''; }, 3000);
            });
            return;
        }
    }

    const existingIdx = customTemplates.findIndex(t => t.name === name);

    if (existingIdx !== -1) {
        if (pendingOverwrite !== name) {
            msg.textContent = translations[uiLang].templateExists;
            msg.style.color = '#ffcc00';
            pendingOverwrite = name;
            return;
        }
        customTemplates[existingIdx] = {
            name: name,
            ...getSurfaceStylePair(editSurface)
        };
    } else {
        customTemplates.push({
            name: name,
            ...getSurfaceStylePair(editSurface)
        });
    }

    safeStorageSet({ customTemplates }, () => {

        selectedTemplateName = name;

        msg.textContent = translations[uiLang].templateSaved;
        msg.style.color = '#4caf50';
        pendingOverwrite = null;

        updateSaveButtonState();
        loadCustomTemplates();

        setTimeout(() => { if (msg) msg.textContent = ''; }, 3000);
    });
}

const styleTag = document.createElement('style');
styleTag.id = 'ysp-subtitle-styles';

function attachSubtitleStyleTag() {
    const parent = document.head || document.documentElement;
    if (!parent || styleTag.parentNode === parent) return !!styleTag.parentNode;
    parent.appendChild(styleTag);
    return true;
}

attachSubtitleStyleTag();
if (!document.head) {
    document.addEventListener('DOMContentLoaded', attachSubtitleStyleTag, { once: true });
}

function completeFirstPaintCaptionBootstrap() {
    if (firstPaintBootstrapTimer) {
        clearTimeout(firstPaintBootstrapTimer);
        firstPaintBootstrapTimer = null;
    }
    if (document.documentElement && document.documentElement.classList) {
        document.documentElement.classList.remove(FIRST_PAINT_BOOTSTRAP_CLASS);
    }
}

function completeFirstPaintCaptionBootstrapAfterClassification() {
    const finish = () => {
        runImmediateCaptionMutationPass();
        if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(completeFirstPaintCaptionBootstrap);
        } else {
            completeFirstPaintCaptionBootstrap();
        }
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', finish, { once: true });
        return;
    }
    finish();
}

function applyEarlyStoredCaptionSettings(res) {
    const writeBack = {};
    if (res && res.ar) {
        cachedSettings.ar = { ...defaultAr, ...res.ar };
        ['letterSpacing', 'strokeOpacity', 'bgBlur', 'phraseMode', 'autoCaptionMode', 'enhancedBlocking', 'allowNativeCaptionDrag'].forEach(k => {
            if (cachedSettings.ar[k] === undefined) cachedSettings.ar[k] = defaultAr[k];
        });
        const removedAlignment = removeDeprecatedTextAlignment(cachedSettings.ar);
        const migratedCaptionStyle = sanitizeLegacyCartoonContrastSettings(cachedSettings.ar);
        const migratedAutoMode = disableExperimentalAutoCaptionModes(cachedSettings.ar);
        if (removedAlignment || migratedCaptionStyle || migratedAutoMode) {
            writeBack.ar = cachedSettings.ar;
        }
    }
    if (res && res.en) {
        cachedSettings.en = { ...defaultEn, ...res.en };
        ['letterSpacing', 'strokeOpacity', 'bgBlur', 'phraseMode', 'autoCaptionMode', 'enhancedBlocking', 'allowNativeCaptionDrag'].forEach(k => {
            if (cachedSettings.en[k] === undefined) cachedSettings.en[k] = defaultEn[k];
        });
        const removedAlignment = removeDeprecatedTextAlignment(cachedSettings.en);
        const migratedCaptionStyle = sanitizeLegacyCartoonContrastSettings(cachedSettings.en);
        const migratedAutoMode = disableExperimentalAutoCaptionModes(cachedSettings.en);
        if (removedAlignment || migratedCaptionStyle || migratedAutoMode) {
            writeBack.en = cachedSettings.en;
        }
    }
    if (!res || !res[YOUTUBE_FONT_DEFAULT_MIGRATION_KEY]) {
        const legacyEnDefaultFont = "'Roboto', sans-serif";
        if (!cachedSettings.ar.customFont && cachedSettings.ar.fontFamily === LEGACY_AR_DEFAULT_FONT) {
            cachedSettings.ar.fontFamily = YOUTUBE_FONT_OPTIONS.proportionalSans;
            writeBack.ar = cachedSettings.ar;
        }
        if (!cachedSettings.en.customFont && cachedSettings.en.fontFamily === legacyEnDefaultFont) {
            cachedSettings.en.fontFamily = YOUTUBE_FONT_OPTIONS.proportionalSans;
            writeBack.en = cachedSettings.en;
        }
    }
    [
        { key: 'shortsAr', lang: 'ar' },
        { key: 'shortsEn', lang: 'en' }
    ].forEach(({ key, lang }) => {
        const inheritedStyle = pickSurfaceStyle(cachedSettings[lang]);
        const storedStyle = res && res[key] ? pickSurfaceStyle(res[key]) : null;
        cachedSettings[key] = { ...inheritedStyle, ...(storedStyle || {}) };
        const missingStoredFields = !storedStyle || Object.keys(inheritedStyle).some(field => storedStyle[field] === undefined);
        const migratedCaptionStyle = sanitizeLegacyCartoonContrastSettings(cachedSettings[key]);
        if (missingStoredFields || migratedCaptionStyle) writeBack[key] = cachedSettings[key];
    });
    if (Object.keys(writeBack).length) safeStorageSet(writeBack);
}

function installFirstPaintCaptionBootstrap() {
    if (window.__yspFirstPaintCaptionBootstrap) return;
    window.__yspFirstPaintCaptionBootstrap = true;
    attachSubtitleStyleTag();
    if (document.documentElement && document.documentElement.classList) {
        document.documentElement.classList.add(FIRST_PAINT_BOOTSTRAP_CLASS);
    }
    updateCachedSubtitleStyles();
    firstPaintBootstrapTimer = setTimeout(() => {
        if (document.documentElement && document.documentElement.classList) {
            document.documentElement.classList.remove(FIRST_PAINT_BOOTSTRAP_CLASS);
        }
        firstPaintBootstrapTimer = null;
    }, 1500);
    safeStorageGet([...SUBTITLE_PROFILE_STORAGE_KEYS, YOUTUBE_FONT_DEFAULT_MIGRATION_KEY], (res) => {
        applyEarlyStoredCaptionSettings(res || {});
        updateCachedSubtitleStyles();
        completeFirstPaintCaptionBootstrapAfterClassification();
    }, {});
}

function hexToRgba(hex, alpha) {
    if (!hex) return 'transparent';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
}

function updateSubtitleStyles(ar, en, shortsAr = ar, shortsEn = en) {
    shortsAr = shortsAr || ar;
    shortsEn = shortsEn || en;
    ensureSubtitleFontAssetsLoaded(ar, en);
    ensureSubtitleFontAssetsLoaded(shortsAr, shortsEn);

    const arFontSize = Math.max(10, ar.fontSize);
    const enFontSize = Math.max(10, en.fontSize);
    const shortsArFontSize = Math.max(10, shortsAr.fontSize);
    const shortsEnFontSize = Math.max(10, shortsEn.fontSize);

    const arStroke = hexToRgba(ar.strokeColor, ar.strokeOpacity !== undefined ? ar.strokeOpacity : 100);
    const enStroke = hexToRgba(en.strokeColor, en.strokeOpacity !== undefined ? en.strokeOpacity : 100);
    const shortsArStroke = hexToRgba(shortsAr.strokeColor, shortsAr.strokeOpacity !== undefined ? shortsAr.strokeOpacity : 100);
    const shortsEnStroke = hexToRgba(shortsEn.strokeColor, shortsEn.strokeOpacity !== undefined ? shortsEn.strokeOpacity : 100);

    // v3.0 — Text opacity (apply to color via rgba)
    const arTextColor = hexToRgba(ar.fontColor, ar.textOpacity !== undefined ? ar.textOpacity : 100);
    const enTextColor = hexToRgba(en.fontColor, en.textOpacity !== undefined ? en.textOpacity : 100);
    const shortsArTextColor = hexToRgba(shortsAr.fontColor, shortsAr.textOpacity !== undefined ? shortsAr.textOpacity : 100);
    const shortsEnTextColor = hexToRgba(shortsEn.fontColor, shortsEn.textOpacity !== undefined ? shortsEn.textOpacity : 100);

    // v3.0 — Dyslexia mode improves spacing, but an explicitly uploaded font wins.
    const arUsesCustomFont = isSelectedCustomSubtitleFont(ar);
    const enUsesCustomFont = isSelectedCustomSubtitleFont(en);
    const shortsArUsesCustomFont = isSelectedCustomSubtitleFont(shortsAr);
    const shortsEnUsesCustomFont = isSelectedCustomSubtitleFont(shortsEn);
    const arFontFamily = ar.dyslexiaMode && !arUsesCustomFont
        ? ARABIC_DYSLEXIA_FONT_STACK
        : getEffectiveSubtitleFontFamily(ar.fontFamily);
    const enFontFamily = en.dyslexiaMode && !enUsesCustomFont
        ? ENGLISH_DYSLEXIA_FONT_STACK
        : getEffectiveSubtitleFontFamily(en.fontFamily);
    const shortsArFontFamily = shortsAr.dyslexiaMode && !shortsArUsesCustomFont
        ? ARABIC_DYSLEXIA_FONT_STACK
        : getEffectiveSubtitleFontFamily(shortsAr.fontFamily);
    const shortsEnFontFamily = shortsEn.dyslexiaMode && !shortsEnUsesCustomFont
        ? ENGLISH_DYSLEXIA_FONT_STACK
        : getEffectiveSubtitleFontFamily(shortsEn.fontFamily);
    const arFontVariant = ar.dyslexiaMode ? 'normal' : getSubtitleFontVariant(ar.fontFamily);
    const enFontVariant = en.dyslexiaMode ? 'normal' : getSubtitleFontVariant(en.fontFamily);
    const shortsArFontVariant = shortsAr.dyslexiaMode ? 'normal' : getSubtitleFontVariant(shortsAr.fontFamily);
    const shortsEnFontVariant = shortsEn.dyslexiaMode ? 'normal' : getSubtitleFontVariant(shortsEn.fontFamily);

    // Height-only vertical control. The removed top/middle preset feature used to
    // compete with bottomPos and YouTube's native drag; bottomPos is now the single
    // extension-owned vertical adjustment.
    const arBottom = ar.bottomPos;
    const enBottom = en.bottomPos;
    const shortsArBottom = shortsAr.bottomPos;
    const shortsEnBottom = shortsEn.bottomPos;

    const positionCss = (settings, bottom) => `
        left: 0 !important;
        right: 0 !important;
        bottom: ${bottom}% !important;
        top: auto !important;
        transform: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
    `;
    const centeredInnerWindowCss = `
        left: 0 !important;
        right: 0 !important;
        transform: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        text-align: inherit !important;
        background: transparent !important;
        background-color: transparent !important;
        box-shadow: none !important;
        padding: 0 !important;
        border-radius: 0 !important;
    `;

    // v3.0 — Dyslexia mode also bumps line-height + letter-spacing for readability
    const arLineHeight = ar.dyslexiaMode ? Math.max(1.5, ar.lineHeight) : ar.lineHeight;
    const enLineHeight = en.dyslexiaMode ? Math.max(1.5, en.lineHeight) : en.lineHeight;
    const shortsArLineHeight = shortsAr.dyslexiaMode ? Math.max(1.5, shortsAr.lineHeight) : shortsAr.lineHeight;
    const shortsEnLineHeight = shortsEn.dyslexiaMode ? Math.max(1.5, shortsEn.lineHeight) : shortsEn.lineHeight;
    const arLetterSpacing = ar.dyslexiaMode ? Math.max(0.5, ar.letterSpacing) : ar.letterSpacing;
    const enLetterSpacing = en.dyslexiaMode ? Math.max(0.5, en.letterSpacing) : en.letterSpacing;
    const shortsArLetterSpacing = shortsAr.dyslexiaMode ? Math.max(0.5, shortsAr.letterSpacing) : shortsAr.letterSpacing;
    const shortsEnLetterSpacing = shortsEn.dyslexiaMode ? Math.max(0.5, shortsEn.letterSpacing) : shortsEn.letterSpacing;
    const arPaddingX = Math.min(8, Math.max(4, Math.round((ar.padding || 0) * 1.2)));
    const enPaddingX = Math.min(8, Math.max(4, Math.round((en.padding || 0) * 1.2)));
    const shortsArPaddingX = Math.min(8, Math.max(4, Math.round((shortsAr.padding || 0) * 1.2)));
    const shortsEnPaddingX = Math.min(8, Math.max(4, Math.round((shortsEn.padding || 0) * 1.2)));
    const customFontFaceCss = Array.from(new Set(
        [ar, en, shortsAr, shortsEn]
            .map(buildCustomSubtitleFontFaceCss)
            .filter(Boolean)
    )).join('\n');
    const shortsThemeCss = `
        /* Shorts has its own four-way profile (surface + language). These rules
           intentionally come after the regular-video theme so no visual value can
           bleed from the video profile into active Shorts playback. */
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) {
            ${positionCss(shortsAr, shortsArBottom)}
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) {
            ${positionCss(shortsEn, shortsEnBottom)}
        }

        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            font-family: ${shortsArFontFamily} !important;
            font-size: ${shortsArFontSize}px !important;
            color: ${shortsArTextColor} !important;
            -webkit-text-fill-color: ${shortsArTextColor} !important;
            font-weight: ${shortsAr.fontWeight} !important;
            font-variant: ${shortsArFontVariant} !important;
            font-variant-caps: ${shortsArFontVariant} !important;
            -webkit-text-stroke: ${shortsAr.strokeWidth}px ${shortsArStroke} !important;
            -webkit-paint-order: stroke fill !important;
            paint-order: stroke fill !important;
            text-shadow: 0 0 ${shortsAr.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${shortsArLineHeight}em + ${shortsAr.padding}px) !important;
            letter-spacing: ${shortsArLetterSpacing}px !important;
            word-spacing: normal !important;
            font-variant-ligatures: normal !important;
            font-feature-settings: normal !important;
            text-align: center !important;
            direction: rtl !important;
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            font-family: ${shortsEnFontFamily} !important;
            font-size: ${shortsEnFontSize}px !important;
            color: ${shortsEnTextColor} !important;
            -webkit-text-fill-color: ${shortsEnTextColor} !important;
            font-weight: ${shortsEn.fontWeight} !important;
            font-variant: ${shortsEnFontVariant} !important;
            font-variant-caps: ${shortsEnFontVariant} !important;
            -webkit-text-stroke: ${shortsEn.strokeWidth}px ${shortsEnStroke} !important;
            -webkit-paint-order: stroke fill !important;
            paint-order: stroke fill !important;
            text-shadow: 0 0 ${shortsEn.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${shortsEnLineHeight}em + ${shortsEn.padding}px) !important;
            letter-spacing: ${shortsEnLetterSpacing}px !important;
            text-align: center !important;
            direction: ltr !important;
        }

        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .ysp-phrase-overlay,
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .ysp-caption-line {
            font-family: ${shortsArFontFamily} !important;
            font-size: ${shortsArFontSize}px !important;
            color: ${shortsArTextColor} !important;
            -webkit-text-fill-color: ${shortsArTextColor} !important;
            font-weight: ${shortsAr.fontWeight} !important;
            font-variant: ${shortsArFontVariant} !important;
            font-variant-caps: ${shortsArFontVariant} !important;
            background-color: ${hexToRgba(shortsAr.bgColor || '#000000', shortsAr.bgOpacity)} !important;
            backdrop-filter: blur(${shortsAr.bgBlur || 0}px) !important;
            -webkit-backdrop-filter: blur(${shortsAr.bgBlur || 0}px) !important;
            -webkit-text-stroke: ${shortsAr.strokeWidth}px ${shortsArStroke} !important;
            -webkit-paint-order: stroke fill !important;
            paint-order: stroke fill !important;
            text-shadow: 0 0 ${shortsAr.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${shortsArLineHeight}em + ${shortsAr.padding}px) !important;
            letter-spacing: ${shortsArLetterSpacing}px !important;
            word-spacing: normal !important;
            font-variant-ligatures: normal !important;
            font-feature-settings: normal !important;
            text-align: center !important;
            direction: rtl !important;
            padding: ${shortsAr.padding}px ${shortsArPaddingX}px !important;
            border-radius: ${shortsAr.borderRadius}px !important;
            white-space: pre-wrap !important;
            transform: none !important;
            ${!shortsAr.smartTiming ? 'opacity: 1 !important;' : ''}
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .ysp-phrase-overlay,
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .ysp-caption-line {
            font-family: ${shortsEnFontFamily} !important;
            font-size: ${shortsEnFontSize}px !important;
            color: ${shortsEnTextColor} !important;
            -webkit-text-fill-color: ${shortsEnTextColor} !important;
            font-weight: ${shortsEn.fontWeight} !important;
            font-variant: ${shortsEnFontVariant} !important;
            font-variant-caps: ${shortsEnFontVariant} !important;
            background-color: ${hexToRgba(shortsEn.bgColor || '#000000', shortsEn.bgOpacity)} !important;
            backdrop-filter: blur(${shortsEn.bgBlur || 0}px) !important;
            -webkit-backdrop-filter: blur(${shortsEn.bgBlur || 0}px) !important;
            -webkit-text-stroke: ${shortsEn.strokeWidth}px ${shortsEnStroke} !important;
            -webkit-paint-order: stroke fill !important;
            paint-order: stroke fill !important;
            text-shadow: 0 0 ${shortsEn.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${shortsEnLineHeight}em + ${shortsEn.padding}px) !important;
            letter-spacing: ${shortsEnLetterSpacing}px !important;
            text-align: center !important;
            direction: ltr !important;
            padding: ${shortsEn.padding}px ${shortsEnPaddingX}px !important;
            border-radius: ${shortsEn.borderRadius}px !important;
            white-space: pre-wrap !important;
            transform: none !important;
            ${!shortsEn.smartTiming ? 'opacity: 1 !important;' : ''}
        }

        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            background-color: ${hexToRgba(shortsAr.bgColor || '#000000', shortsAr.bgOpacity)} !important;
            backdrop-filter: blur(${shortsAr.bgBlur || 0}px) !important;
            -webkit-backdrop-filter: blur(${shortsAr.bgBlur || 0}px) !important;
            padding: ${shortsAr.padding}px ${shortsArPaddingX}px !important;
            border-radius: ${shortsAr.borderRadius}px !important;
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            background-color: ${hexToRgba(shortsEn.bgColor || '#000000', shortsEn.bgOpacity)} !important;
            backdrop-filter: blur(${shortsEn.bgBlur || 0}px) !important;
            -webkit-backdrop-filter: blur(${shortsEn.bgBlur || 0}px) !important;
            padding: ${shortsEn.padding}px ${shortsEnPaddingX}px !important;
            border-radius: ${shortsEn.borderRadius}px !important;
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) .ytp-caption-segment:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) .ytp-caption-segment:not(.ytp-custom-active) {
            background: transparent !important;
            background-color: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
        }

        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active) [style],
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active) [style] {
            font-family: ${shortsArFontFamily} !important;
            font-size: ${shortsArFontSize}px !important;
            color: ${shortsArTextColor} !important;
            -webkit-text-fill-color: ${shortsArTextColor} !important;
            font-weight: ${shortsAr.fontWeight} !important;
            font-variant: ${shortsArFontVariant} !important;
            font-variant-caps: ${shortsArFontVariant} !important;
            -webkit-text-stroke: ${shortsAr.strokeWidth}px ${shortsArStroke} !important;
            -webkit-paint-order: stroke fill !important;
            paint-order: stroke fill !important;
            text-shadow: 0 0 ${shortsAr.shadowIntensity}px rgba(0,0,0,0.8) !important;
            letter-spacing: ${shortsArLetterSpacing}px !important;
            word-spacing: normal !important;
            direction: rtl !important;
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active) [style],
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active) [style] {
            font-family: ${shortsEnFontFamily} !important;
            font-size: ${shortsEnFontSize}px !important;
            color: ${shortsEnTextColor} !important;
            -webkit-text-fill-color: ${shortsEnTextColor} !important;
            font-weight: ${shortsEn.fontWeight} !important;
            font-variant: ${shortsEnFontVariant} !important;
            font-variant-caps: ${shortsEnFontVariant} !important;
            -webkit-text-stroke: ${shortsEn.strokeWidth}px ${shortsEnStroke} !important;
            -webkit-paint-order: stroke fill !important;
            paint-order: stroke fill !important;
            text-shadow: 0 0 ${shortsEn.shadowIntensity}px rgba(0,0,0,0.8) !important;
            letter-spacing: ${shortsEnLetterSpacing}px !important;
            direction: ltr !important;
        }

        /* Creator-custom Shorts keep every authored visual/timing declaration.
           Only the selected Shorts font family is allowed to cross this boundary. */
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic.has-custom-subtitles .captions-text,
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic.has-custom-subtitles .caption-visual-line,
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic.has-custom-subtitles .ytp-caption-segment,
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic.has-custom-subtitles .captions-text [style],
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic.has-custom-subtitles .caption-visual-line [style],
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-arabic.has-custom-subtitles .ytp-caption-segment [style] {
            font-family: ${shortsArFontFamily} !important;
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english.has-custom-subtitles .captions-text,
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english.has-custom-subtitles .caption-visual-line,
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english.has-custom-subtitles .ytp-caption-segment,
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english.has-custom-subtitles .captions-text [style],
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english.has-custom-subtitles .caption-visual-line [style],
        .ysp-caption-layout-root.ysp-active-shorts-playback.is-english.has-custom-subtitles .ytp-caption-segment [style] {
            font-family: ${shortsEnFontFamily} !important;
        }
    `;

    const css = `
        ${customFontFaceCss}

        /* First-paint guard: content.js now runs at document_start. Until saved
           settings are loaded and caption windows are classified, suppress YouTube
           Basic white/black text so users do not see a white flash before their
           Subtitle Pro style takes over. A 1.5s fail-safe removes the class. */
        html.ysp-caption-bootstrapping .caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .captions-text,
        html.ysp-caption-bootstrapping .caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .caption-visual-line,
        html.ysp-caption-bootstrapping .caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .ytp-caption-segment,
        html.ysp-caption-bootstrapping .ytp-caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .captions-text,
        html.ysp-caption-bootstrapping .ytp-caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .caption-visual-line,
        html.ysp-caption-bootstrapping .ytp-caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .ytp-caption-segment,
        html.ysp-caption-bootstrapping .ytp-caption-window-container:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .captions-text,
        html.ysp-caption-bootstrapping .ytp-caption-window-container:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .caption-visual-line,
        html.ysp-caption-bootstrapping .ytp-caption-window-container:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .ytp-caption-segment,
        html.ysp-caption-bootstrapping .caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .captions-text [style],
        html.ysp-caption-bootstrapping .caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .caption-visual-line [style],
        html.ysp-caption-bootstrapping .caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .ytp-caption-segment [style],
        html.ysp-caption-bootstrapping .ytp-caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .captions-text [style],
        html.ysp-caption-bootstrapping .ytp-caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .caption-visual-line [style],
        html.ysp-caption-bootstrapping .ytp-caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .ytp-caption-segment [style],
        html.ysp-caption-bootstrapping .ytp-caption-window-container:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .captions-text [style],
        html.ysp-caption-bootstrapping .ytp-caption-window-container:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .caption-visual-line [style],
        html.ysp-caption-bootstrapping .ytp-caption-window-container:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) .ytp-caption-segment [style] {
            color: transparent !important;
            -webkit-text-fill-color: transparent !important;
            text-shadow: 0px 0px 0px rgba(0,0,0,0) !important;
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
        }

        /* v3.0 — REMOVED: hiding YouTube's settings header and Options button.
           That was overreach; the extension has its own panel (Alt+S) and shouldn't
           touch YouTube's native UI. */

        /* General Segment Reset (with Fallbacks) */
        .ytp-caption-segment:not(.ytp-custom-active) {
            box-decoration-break: clone; -webkit-box-decoration-break: clone;
            display: inline !important; background-clip: padding-box;
            mix-blend-mode: normal !important; unicode-bidi: normal;
            direction: inherit; white-space: pre-wrap;
            overflow-wrap: anywhere; word-break: normal;
            max-width: 88vw; margin: 0 !important;
        }

        /* === FIXED-STYLE ZONES (hover/thumbnail previews only) === */
        /* Preview cards ignore user customizations. Active playback, including
           Shorts, always receives the selected Subtitle Pro theme. */
        /* Font stack handles both Arabic (Tajawal/Noto) and English (Roboto) automatically. */

        /* Make all parent containers transparent so ONLY the segment carries the bg pill.
           This prevents the stacked black layers (segment + captions-text + caption-visual-line). */
        .ytp-inline-preview-ui .caption-window:not(.has-custom-subtitles),
        .ytp-inline-preview-ui .ytp-caption-window-container:not(.has-custom-subtitles),
        .ytp-inline-preview-ui .ytp-caption-window:not(.has-custom-subtitles),
        .ytp-inline-preview-ui .captions-text:not(.ytp-custom-active),
        .ytp-inline-preview-ui .caption-visual-line:not(.ytp-custom-active),
        .ytp-video-preview .caption-window:not(.has-custom-subtitles),
        .ytp-video-preview .ytp-caption-window-container:not(.has-custom-subtitles),
        .ytp-video-preview .ytp-caption-window:not(.has-custom-subtitles),
        .ytp-video-preview .captions-text:not(.ytp-custom-active),
        .ytp-video-preview .caption-visual-line:not(.ytp-custom-active),
        .ytd-video-preview .caption-window:not(.has-custom-subtitles),
        .ytd-video-preview .ytp-caption-window-container:not(.has-custom-subtitles),
        .ytd-video-preview .ytp-caption-window:not(.has-custom-subtitles),
        .ytd-video-preview .captions-text:not(.ytp-custom-active),
        .ytd-video-preview .caption-visual-line:not(.ytp-custom-active) {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            filter: none !important;
            -webkit-filter: none !important;
        }

        /* Standard playback wrapper cleanup: YouTube auto-translate can put long
           background/padding bars on wrapper layers; keep the pill on segments only. */
        .is-arabic:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
        .is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
        }

        /* Smart Custom Effects: preserve creator visuals, override font only */
        .is-arabic.has-custom-subtitles .captions-text,
        .is-arabic.has-custom-subtitles .caption-visual-line,
        .is-arabic.has-custom-subtitles .ytp-caption-segment,
        .is-arabic.has-custom-subtitles .captions-text [style],
        .is-arabic.has-custom-subtitles .caption-visual-line [style],
        .is-arabic.has-custom-subtitles .ytp-caption-segment [style],
        .is-arabic .captions-text.ytp-custom-active,
        .is-arabic .caption-visual-line.ytp-custom-active,
        .is-arabic .ytp-caption-segment.ytp-custom-active,
        .is-arabic .captions-text.ytp-custom-active [style],
        .is-arabic .caption-visual-line.ytp-custom-active [style],
        .is-arabic .ytp-caption-segment.ytp-custom-active [style] {
            font-family: ${arFontFamily} !important;
        }
        .is-english.has-custom-subtitles .captions-text,
        .is-english.has-custom-subtitles .caption-visual-line,
        .is-english.has-custom-subtitles .ytp-caption-segment,
        .is-english.has-custom-subtitles .captions-text [style],
        .is-english.has-custom-subtitles .caption-visual-line [style],
        .is-english.has-custom-subtitles .ytp-caption-segment [style],
        .is-english .captions-text.ytp-custom-active,
        .is-english .caption-visual-line.ytp-custom-active,
        .is-english .ytp-caption-segment.ytp-custom-active,
        .is-english .captions-text.ytp-custom-active [style],
        .is-english .caption-visual-line.ytp-custom-active [style],
        .is-english .ytp-caption-segment.ytp-custom-active [style] {
            font-family: ${enFontFamily} !important;
        }

        /* Dragging starts from the real caption text only.  Do not create an
           invisible hover layer: it made a move cursor appear in empty space
           and could intercept YouTube's own caption interaction. */
        .ysp-native-caption-hit-target,
        .ysp-native-caption-hit-target * {
            cursor: default !important;
        }
        .ysp-native-caption-dragging,
        .ysp-native-caption-dragging * {
            cursor: grabbing !important;
            user-select: none !important;
            -webkit-user-select: none !important;
        }
        /* Caption Window Reset */
        .caption-window:not(.has-custom-subtitles),
        .ytp-caption-window-container:not(.has-custom-subtitles),
        .ytp-caption-window:not(.has-custom-subtitles) {
            position: absolute !important;
            box-sizing: border-box !important;
            display: block !important;
            background: transparent !important;
            overflow: visible !important;
        }
        .caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english),
        .ytp-caption-window-container:not(.has-custom-subtitles):not(.is-arabic):not(.is-english),
        .ytp-caption-window:not(.has-custom-subtitles):not(.is-arabic):not(.is-english) {
            text-align: center !important;
        }
        .caption-window:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending),
        .ytp-caption-window-container:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending),
        .ytp-caption-window:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) {
            opacity: 1 !important;
            visibility: visible !important;
        }
        .caption-window:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .captions-text,
        .caption-window:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .caption-visual-line,
        .caption-window:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .ytp-caption-segment:not(.ytp-custom-active),
        .ytp-caption-window-container:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .captions-text,
        .ytp-caption-window-container:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .caption-visual-line,
        .ytp-caption-window-container:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .ytp-caption-segment:not(.ytp-custom-active),
        .ytp-caption-window:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .captions-text,
        .ytp-caption-window:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .caption-visual-line,
        .ytp-caption-window:not(.has-custom-subtitles):not(.ysp-smart-hide):not(.ysp-delayed):not(.ysp-caption-language-pending) .ytp-caption-segment:not(.ytp-custom-active) {
            opacity: 1 !important;
            visibility: visible !important;
        }

        /* Standard caption positioning root */
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles):not(.ysp-native-caption-dragged),
        .ysp-caption-layout-root.is-arabic.ysp-native-drag-disabled:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-arabic.ysp-auto-translated-caption:not(.has-custom-subtitles) {
            ${positionCss(ar, arBottom)}
        }
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) {
            text-align: center !important;
            direction: rtl !important;
        }

        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles):not(.ysp-native-caption-dragged),
        .ysp-caption-layout-root.is-english.ysp-native-drag-disabled:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-english.ysp-auto-translated-caption:not(.has-custom-subtitles) {
            ${positionCss(en, enBottom)}
        }
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) {
            text-align: center !important;
        }

        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles):not(.ysp-native-caption-dragged) .caption-window:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles):not(.ysp-native-caption-dragged) .ytp-caption-window:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles):not(.ysp-native-caption-dragged) .ytp-caption-window-container:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-arabic.ysp-auto-translated-caption:not(.has-custom-subtitles) .caption-window:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-arabic.ysp-auto-translated-caption:not(.has-custom-subtitles) .ytp-caption-window:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-arabic.ysp-auto-translated-caption:not(.has-custom-subtitles) .ytp-caption-window-container:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles):not(.ysp-native-caption-dragged) .caption-window:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles):not(.ysp-native-caption-dragged) .ytp-caption-window:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles):not(.ysp-native-caption-dragged) .ytp-caption-window-container:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-english.ysp-auto-translated-caption:not(.has-custom-subtitles) .caption-window:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-english.ysp-auto-translated-caption:not(.has-custom-subtitles) .ytp-caption-window:not(.has-custom-subtitles),
        .ysp-caption-layout-root.is-english.ysp-auto-translated-caption:not(.has-custom-subtitles) .ytp-caption-window-container:not(.has-custom-subtitles) {
            ${centeredInnerWindowCss}
        }

        /* Movie-like readable line box: .captions-text is the compact drag target,
           while each YouTube visual line is a real block. Keeping those roles
           separate prevents two dialogue lines from sitting side-by-side. */
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active) {
            display: inline-block !important;
            max-width: min(54vw, 42ch, calc(100vw - 96px)) !important;
            width: fit-content !important;
            white-space: normal !important;
            overflow-wrap: anywhere !important;
            word-break: normal !important;
            text-wrap: pretty !important;
            text-align: inherit !important;
            margin-left: auto !important;
            margin-right: auto !important;
            box-sizing: border-box !important;
            vertical-align: bottom !important;
        }
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active),
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            display: block !important;
            max-width: min(54vw, 42ch, calc(100vw - 96px)) !important;
            width: fit-content !important;
            white-space: normal !important;
            overflow-wrap: anywhere !important;
            word-break: normal !important;
            text-wrap: pretty !important;
            text-align: inherit !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
        }
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) + .caption-visual-line:not(.ytp-custom-active),
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) + .caption-visual-line:not(.ytp-custom-active) {
            margin-top: 0.14em !important;
        }
        .html5-video-player:not(.ytp-inline-preview-ui):not(.ytp-video-preview):not(.ytp-tooltip):not(.ytp-storyboard) .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles),
        .html5-video-player:not(.ytp-inline-preview-ui):not(.ytp-video-preview):not(.ytp-tooltip):not(.ytp-storyboard) .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) {
            width: 100% !important;
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: center !important;
        }
        @media (max-width: 720px) {
            .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
            .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active),
            .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
            .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
                max-width: calc(100vw - 32px) !important;
            }
        }

        .ysp-native-drag-disabled:not(.has-custom-subtitles),
        .ysp-native-drag-disabled:not(.has-custom-subtitles) .caption-window {
            pointer-events: none !important;
            cursor: default !important;
        }

        /* Force typography through YouTube's newer wrapper layers too. */
        .is-arabic:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
        .is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            font-family: ${arFontFamily} !important;
            font-size: ${arFontSize}px !important;
            color: ${arTextColor} !important;
            -webkit-text-fill-color: ${arTextColor} !important;
            font-weight: ${ar.fontWeight} !important;
            font-variant: ${arFontVariant} !important;
            font-variant-caps: ${arFontVariant} !important;
            -webkit-text-stroke: ${ar.strokeWidth}px ${arStroke} !important;
            -webkit-paint-order: stroke fill !important; paint-order: stroke fill !important;
            text-shadow: 0px 0px ${ar.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${arLineHeight}em + ${ar.padding}px) !important;
            letter-spacing: ${arLetterSpacing}px !important;
            word-spacing: normal !important;
            font-variant-ligatures: normal !important;
            font-feature-settings: normal !important;
            text-align: center !important;
            direction: rtl !important;
        }

        .is-english:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            font-family: ${enFontFamily} !important;
            font-size: ${enFontSize}px !important;
            color: ${enTextColor} !important;
            -webkit-text-fill-color: ${enTextColor} !important;
            font-weight: ${en.fontWeight} !important;
            font-variant: ${enFontVariant} !important;
            font-variant-caps: ${enFontVariant} !important;
            -webkit-text-stroke: ${en.strokeWidth}px ${enStroke} !important;
            -webkit-paint-order: stroke fill !important; paint-order: stroke fill !important;
            text-shadow: 0px 0px ${en.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${enLineHeight}em + ${en.padding}px) !important;
            letter-spacing: ${enLetterSpacing}px !important;
            text-align: center !important;
        }

        /* Segment Styling */
        .ytp-caption-segment:not(.ytp-custom-active) {
            display: inline !important;
            margin: 0 !important;
        }

        /* Animation Keyframes - REMOVED */

        /* Standard Subtitles (Apply always if not custom or if custom support is off) */
        .is-arabic:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active),
        .is-arabic:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active),
        .is-arabic .ysp-phrase-overlay {
            font-family: ${arFontFamily} !important;
            font-size: ${arFontSize}px !important;
            color: ${arTextColor} !important;
            -webkit-text-fill-color: ${arTextColor} !important;
            font-weight: ${ar.fontWeight} !important;
            font-variant: ${arFontVariant} !important;
            font-variant-caps: ${arFontVariant} !important;
            background-color: ${hexToRgba(ar.bgColor || '#000000', ar.bgOpacity)} !important;
            backdrop-filter: blur(${ar.bgBlur || 0}px) !important; -webkit-backdrop-filter: blur(${ar.bgBlur || 0}px) !important;
            -webkit-text-stroke: ${ar.strokeWidth}px ${arStroke} !important;
            -webkit-paint-order: stroke fill !important; paint-order: stroke fill !important;
            text-shadow: 0px 0px ${ar.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${arLineHeight}em + ${ar.padding}px) !important;
            letter-spacing: ${arLetterSpacing}px !important;
            word-spacing: normal !important;
            font-variant-ligatures: normal !important;
            font-feature-settings: normal !important;
            text-align: center !important;
            direction: rtl !important;
            padding: ${ar.padding}px ${arPaddingX}px !important;
            box-decoration-break: clone !important; -webkit-box-decoration-break: clone !important;
            border-radius: ${ar.borderRadius}px !important;
            white-space: pre-wrap !important;
            transform: none !important;
            ${!ar.smartTiming ? 'opacity: 1 !important;' : ''}
        }

        .is-english:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active),
        .is-english .ysp-phrase-overlay {
            font-family: ${enFontFamily} !important;
            font-size: ${enFontSize}px !important;
            color: ${enTextColor} !important;
            -webkit-text-fill-color: ${enTextColor} !important;
            font-weight: ${en.fontWeight} !important;
            font-variant: ${enFontVariant} !important;
            font-variant-caps: ${enFontVariant} !important;
            background-color: ${hexToRgba(en.bgColor || '#000000', en.bgOpacity)} !important;
            backdrop-filter: blur(${en.bgBlur || 0}px) !important; -webkit-backdrop-filter: blur(${en.bgBlur || 0}px) !important;
            -webkit-text-stroke: ${en.strokeWidth}px ${enStroke} !important;
            -webkit-paint-order: stroke fill !important; paint-order: stroke fill !important;
            text-shadow: 0px 0px ${en.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${enLineHeight}em + ${en.padding}px) !important;
            letter-spacing: ${enLetterSpacing}px !important;
            text-align: center !important;
            padding: ${en.padding}px ${enPaddingX}px !important;
            box-decoration-break: clone !important; -webkit-box-decoration-break: clone !important;
            border-radius: ${en.borderRadius}px !important;
            white-space: pre-wrap !important;
            transform: none !important;
            ${!en.smartTiming ? 'opacity: 1 !important;' : ''}
        }

        /* One backplate per visual line. YouTube can split a sentence into several
           adjacent span segments; painting every span creates visible seams and
           makes stacked dialogue lines touch. Typography stays on each segment,
           while the visual line owns the background geometry. */
        .is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            background-color: ${hexToRgba(ar.bgColor || '#000000', ar.bgOpacity)} !important;
            backdrop-filter: blur(${ar.bgBlur || 0}px) !important;
            -webkit-backdrop-filter: blur(${ar.bgBlur || 0}px) !important;
            padding: ${ar.padding}px ${arPaddingX}px !important;
            border-radius: ${ar.borderRadius}px !important;
            background-clip: padding-box !important;
            box-decoration-break: clone !important;
            -webkit-box-decoration-break: clone !important;
        }
        .is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) {
            background-color: ${hexToRgba(en.bgColor || '#000000', en.bgOpacity)} !important;
            backdrop-filter: blur(${en.bgBlur || 0}px) !important;
            -webkit-backdrop-filter: blur(${en.bgBlur || 0}px) !important;
            padding: ${en.padding}px ${enPaddingX}px !important;
            border-radius: ${en.borderRadius}px !important;
            background-clip: padding-box !important;
            box-decoration-break: clone !important;
            -webkit-box-decoration-break: clone !important;
        }
        .is-arabic:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) .ytp-caption-segment:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .caption-visual-line:not(.ytp-custom-active) .ytp-caption-segment:not(.ytp-custom-active),
        .is-arabic:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active) .caption-visual-line:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active) .caption-visual-line:not(.ytp-custom-active),
        .is-arabic:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active) .ytp-caption-segment:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active) .ytp-caption-segment:not(.ytp-custom-active) {
            background: transparent !important;
            background-color: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background-clip: border-box !important;
        }

        /* YouTube auto-translate may render the visible translated text inside nested
           inline-styled spans under .caption-visual-line/.captions-text. Keep the
           outer selected target as the pill, but force inner text to inherit YSP text
           styling so YouTube Basic/default white styles cannot win. */
        .is-arabic:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active) [style],
        .is-arabic:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active) [style] {
            font-family: ${arFontFamily} !important;
            font-size: ${arFontSize}px !important;
            color: ${arTextColor} !important;
            -webkit-text-fill-color: ${arTextColor} !important;
            font-weight: ${ar.fontWeight} !important;
            font-variant: ${arFontVariant} !important;
            font-variant-caps: ${arFontVariant} !important;
            -webkit-text-stroke: ${ar.strokeWidth}px ${arStroke} !important;
            -webkit-paint-order: stroke fill !important;
            paint-order: stroke fill !important;
            text-shadow: 0px 0px ${ar.shadowIntensity}px rgba(0,0,0,0.8) !important;
            letter-spacing: ${arLetterSpacing}px !important;
            word-spacing: normal !important;
            direction: rtl !important;
            text-align: inherit !important;
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
        }
        .is-english:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active) [style],
        .is-english:not(.has-custom-subtitles) .ysp-caption-style-target:not(.ytp-custom-active) [style] {
            font-family: ${enFontFamily} !important;
            font-size: ${enFontSize}px !important;
            color: ${enTextColor} !important;
            -webkit-text-fill-color: ${enTextColor} !important;
            font-weight: ${en.fontWeight} !important;
            font-variant: ${enFontVariant} !important;
            font-variant-caps: ${enFontVariant} !important;
            -webkit-text-stroke: ${en.strokeWidth}px ${enStroke} !important;
            -webkit-paint-order: stroke fill !important;
            paint-order: stroke fill !important;
            text-shadow: 0px 0px ${en.shadowIntensity}px rgba(0,0,0,0.8) !important;
            letter-spacing: ${enLetterSpacing}px !important;
            text-align: inherit !important;
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
        }

        /* Generated cinematic multiline captions: center each visual line independently.
           Raw RTL newlines inside one span can anchor the short line to a side and look left-shifted. */
        .is-arabic:not(.has-custom-subtitles) .ytp-caption-segment.ysp-cinematic-multiline:not(.ytp-custom-active),
        .is-arabic:not(.has-custom-subtitles) .captions-text.ysp-cinematic-multiline:not(.ytp-custom-active),
        .is-arabic:not(.has-custom-subtitles) .caption-visual-line.ysp-cinematic-multiline:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .ytp-caption-segment.ysp-cinematic-multiline:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .captions-text.ysp-cinematic-multiline:not(.ytp-custom-active),
        .is-english:not(.has-custom-subtitles) .caption-visual-line.ysp-cinematic-multiline:not(.ytp-custom-active) {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.12em !important;
            width: min(54vw, 42ch, calc(100vw - 96px)) !important;
            max-width: calc(100vw - 32px) !important;
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
            direction: ltr !important;
            unicode-bidi: plaintext !important;
            white-space: normal !important;
            background: transparent !important;
            background-color: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
            line-height: normal !important;
            box-shadow: none !important;
        }

        .is-arabic:not(.has-custom-subtitles) .ytp-caption-segment.ysp-cinematic-multiline:not(.ytp-custom-active) .ysp-caption-line,
        .is-arabic:not(.has-custom-subtitles) .captions-text.ysp-cinematic-multiline:not(.ytp-custom-active) .ysp-caption-line,
        .is-arabic:not(.has-custom-subtitles) .caption-visual-line.ysp-cinematic-multiline:not(.ytp-custom-active) .ysp-caption-line {
            display: block !important;
            width: fit-content !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
            direction: rtl !important;
            unicode-bidi: isolate !important;
            font-family: ${arFontFamily} !important;
            font-size: ${arFontSize}px !important;
            color: ${arTextColor} !important;
            -webkit-text-fill-color: ${arTextColor} !important;
            font-weight: ${ar.fontWeight} !important;
            background-color: ${hexToRgba(ar.bgColor || '#000000', ar.bgOpacity)} !important;
            backdrop-filter: blur(${ar.bgBlur || 0}px) !important;
            -webkit-backdrop-filter: blur(${ar.bgBlur || 0}px) !important;
            -webkit-text-stroke: ${ar.strokeWidth}px ${arStroke} !important;
            -webkit-paint-order: stroke fill !important; paint-order: stroke fill !important;
            text-shadow: 0px 0px ${ar.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${arLineHeight}em + ${ar.padding}px) !important;
            letter-spacing: ${arLetterSpacing}px !important;
            word-spacing: normal !important;
            padding: ${ar.padding}px ${arPaddingX}px !important;
            border-radius: ${ar.borderRadius}px !important;
            box-sizing: border-box !important;
        }

        .is-english:not(.has-custom-subtitles) .ytp-caption-segment.ysp-cinematic-multiline:not(.ytp-custom-active) .ysp-caption-line,
        .is-english:not(.has-custom-subtitles) .captions-text.ysp-cinematic-multiline:not(.ytp-custom-active) .ysp-caption-line,
        .is-english:not(.has-custom-subtitles) .caption-visual-line.ysp-cinematic-multiline:not(.ytp-custom-active) .ysp-caption-line {
            display: block !important;
            width: fit-content !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
            direction: ltr !important;
            unicode-bidi: isolate !important;
            font-family: ${enFontFamily} !important;
            font-size: ${enFontSize}px !important;
            color: ${enTextColor} !important;
            -webkit-text-fill-color: ${enTextColor} !important;
            font-weight: ${en.fontWeight} !important;
            background-color: ${hexToRgba(en.bgColor || '#000000', en.bgOpacity)} !important;
            backdrop-filter: blur(${en.bgBlur || 0}px) !important;
            -webkit-backdrop-filter: blur(${en.bgBlur || 0}px) !important;
            -webkit-text-stroke: ${en.strokeWidth}px ${enStroke} !important;
            -webkit-paint-order: stroke fill !important; paint-order: stroke fill !important;
            text-shadow: 0px 0px ${en.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${enLineHeight}em + ${en.padding}px) !important;
            letter-spacing: ${enLetterSpacing}px !important;
            padding: ${en.padding}px ${enPaddingX}px !important;
            border-radius: ${en.borderRadius}px !important;
            box-sizing: border-box !important;
        }

        /* Standard subtitles above intentionally skip .has-custom-subtitles so creator visuals/layout stay intact. */

        /* Collapsed cinematic-line-break segments: setWindowCaptionText moves all text into
           the first segment, so the emptied siblings must not keep the styled black pill. */
        .is-arabic:not(.has-custom-subtitles) .ytp-caption-segment.ysp-empty-caption-segment:empty,
        .is-arabic:not(.has-custom-subtitles) .captions-text.ysp-empty-caption-segment:empty,
        .is-arabic:not(.has-custom-subtitles) .caption-visual-line.ysp-empty-caption-segment:empty,
        .is-english:not(.has-custom-subtitles) .ytp-caption-segment.ysp-empty-caption-segment:empty,
        .is-english:not(.has-custom-subtitles) .captions-text.ysp-empty-caption-segment:empty,
        .is-english:not(.has-custom-subtitles) .caption-visual-line.ysp-empty-caption-segment:empty {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            border: 0 !important;
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }

        /* === Preview Hover Thumbnails — Single Pill on Segment (no parent bg) === */
        /* Background applied to .ytp-caption-segment ONLY. Parents stay transparent (rule above). */
        /* :not(.ytp-no-fix) raises specificity to win over .is-arabic/.is-english user rules. */
        .ytp-inline-preview-ui .ytp-caption-segment:not(.ytp-no-fix):not(.ytp-custom-active),
        .ytp-video-preview .ytp-caption-segment:not(.ytp-no-fix):not(.ytp-custom-active),
        .ytd-video-preview .ytp-caption-segment:not(.ytp-no-fix):not(.ytp-custom-active),
        .ytp-tooltip .ytp-caption-segment:not(.ytp-no-fix):not(.ytp-custom-active),
        .ytp-storyboard .ytp-caption-segment:not(.ytp-no-fix):not(.ytp-custom-active) {
            font-size: 12px !important;
            line-height: 1.25 !important;
            font-family: "YouTube Noto", Tajawal, Roboto, Arial, sans-serif !important;
            font-weight: 700 !important;
            color: #fff !important;
            -webkit-text-fill-color: #fff !important;
            text-shadow: 0 0 4px rgba(0,0,0,0.8) !important;
            background: rgba(0,0,0,0.85) !important;
            backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
            padding: 2px 6px !important;
            border-radius: 5px !important;
            margin: 0 !important;
            -webkit-text-stroke: 0 !important;
            paint-order: fill !important;
            letter-spacing: 0 !important;
            word-spacing: 0 !important;
            font-variant-ligatures: normal !important;
            font-feature-settings: normal !important;
            transform: none !important;
            white-space: pre-wrap !important;
            display: inline-block !important;
            box-decoration-break: clone !important;
            -webkit-box-decoration-break: clone !important;
            background-clip: padding-box !important;
            unicode-bidi: plaintext !important;
            direction: ltr !important;
        }
        /* Preview window positioning (parents already transparent) */
        .ytp-inline-preview-ui .caption-window:not(.has-custom-subtitles),
        .ytp-video-preview .caption-window:not(.has-custom-subtitles),
        .ytd-video-preview .caption-window:not(.has-custom-subtitles),
        .ytp-inline-preview-ui .ytp-caption-window-container:not(.has-custom-subtitles),
        .ytp-video-preview .ytp-caption-window-container:not(.has-custom-subtitles),
        .ytd-video-preview .ytp-caption-window-container:not(.has-custom-subtitles),
        .ytp-inline-preview-ui .ytp-caption-window:not(.has-custom-subtitles),
        .ytp-video-preview .ytp-caption-window:not(.has-custom-subtitles),
        .ytd-video-preview .ytp-caption-window:not(.has-custom-subtitles) {
            position: absolute !important;
            text-align: center !important;
            top: auto !important;
            bottom: 6px !important;
            left: 4px !important;
            right: 4px !important;
            margin: 0 !important;
            width: auto !important;
            max-width: calc(100% - 8px) !important;
            transform: none !important;
            pointer-events: none !important;
            overflow: visible !important;
            display: block !important;
            box-sizing: border-box !important;
        }
        /* Hide stacked older caption frames in preview (keep only the latest) */
        .ytp-inline-preview-ui .caption-window:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active):not(:last-child),
        .ytp-video-preview .caption-window:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active):not(:last-child),
        .ytd-video-preview .caption-window:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active):not(:last-child),
        .ytp-tooltip .caption-window:not(.has-custom-subtitles) .captions-text:not(.ytp-custom-active):not(:last-child),
        .ytp-inline-preview-ui .captions-text:not(.ytp-custom-active):not(:last-child),
        .ytp-video-preview .captions-text:not(.ytp-custom-active):not(:last-child),
        .ytd-video-preview .captions-text:not(.ytp-custom-active):not(:last-child),
        .ytp-tooltip .captions-text:not(.ytp-custom-active):not(:last-child),
        .ytp-inline-preview-ui .caption-visual-line:not(.ytp-custom-active):not(:last-child),
        .ytp-video-preview .caption-visual-line:not(.ytp-custom-active):not(:last-child),
        .ytd-video-preview .caption-visual-line:not(.ytp-custom-active):not(:last-child),
        .ytp-tooltip .caption-visual-line:not(.ytp-custom-active):not(:last-child),
        .ytp-inline-preview-ui .caption-window:not(.has-custom-subtitles):not(:last-child),
        .ytp-video-preview .caption-window:not(.has-custom-subtitles):not(:last-child),
        .ytd-video-preview .caption-window:not(.has-custom-subtitles):not(:last-child),
        .ytp-tooltip .caption-window:not(.has-custom-subtitles):not(:last-child) {
            display: none !important;
        }

        /* === Active YouTube Shorts playback ===
           This block owns shared layout only. Surface-specific position,
           typography, and backplate values come exclusively from shortsThemeCss.
           Preview cards never receive ysp-active-shorts-playback. */
        .ysp-caption-layout-root.ysp-active-shorts-playback:not(.has-custom-subtitles) {
            position: absolute !important;
            display: block !important;
            text-align: center !important;
            opacity: 1 !important;
            visibility: visible !important;
            overflow: visible !important;
            box-sizing: border-box !important;
            z-index: 9999 !important;
        }
        /* YouTube's outer Shorts caption root is player-height, while the inner
           caption-window carries an authored top coordinate. Anchor that inner
           window to the bottom of the root; otherwise changing the outer bottom
           value still leaves the actual text near the top of the video. */
        .ysp-caption-layout-root.ysp-active-shorts-playback:not(.has-custom-subtitles) .caption-window:not(.has-custom-subtitles) {
            position: absolute !important;
            inset: auto !important;
            left: 0 !important;
            right: 0 !important;
            top: auto !important;
            bottom: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            transform: none !important;
            text-align: center !important;
            overflow: visible !important;
            box-sizing: border-box !important;
        }
        /* Shorts roll-up captions otherwise collapse to their min-content width
           (for example 116px inside a 430px player), causing needless wrapping.
           Give the text a real player-relative measure; individual line pills stay
           fit-content and centered inside it. */
        /* YouTube animates native ASR roll-up with translateY on this wrapper.
           Its geometry is no longer native once Subtitle Pro owns line height,
           padding, and width, so that host animation reads as a vertical jump. */
        .ysp-caption-layout-root.ysp-active-shorts-playback:not(.has-custom-subtitles):not(.ysp-stable-caption-position):not(.ysp-native-caption-dragged) .caption-window.ytp-caption-window-rollup .captions-text:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback:not(.has-custom-subtitles):not(.ysp-stable-caption-position):not(.ysp-native-caption-dragged) .caption-window.ytp-rollup-mode .captions-text:not(.ytp-custom-active) {
            display: block !important;
            width: calc(100% - 24px) !important;
            max-width: calc(100% - 24px) !important;
            margin-left: auto !important;
            margin-right: auto !important;
            box-sizing: border-box !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
            will-change: auto !important;
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback:not(.has-custom-subtitles) .caption-window.ytp-caption-window-rollup .captions-text > .caption-visual-line:not(.ytp-custom-active),
        .ysp-caption-layout-root.ysp-active-shorts-playback:not(.has-custom-subtitles) .caption-window.ytp-rollup-mode .captions-text > .caption-visual-line:not(.ytp-custom-active) {
            width: fit-content !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
        }

        /* Regular-video ASR uses the same native rollup DOM as Shorts. Give its
           transparent text wrapper a stable measure so partial generated words do
           not resize/recenter the whole caption on every token. Arabic and English
           still inherit their independent video profiles from the language root. */
        /* Keep standard ASR cues still. Creator captions and intentionally
           dragged captions stay outside this rule and retain their motion. */
        .ysp-caption-layout-root:not(.ysp-active-shorts-playback):not(.has-custom-subtitles):not(.ysp-stable-caption-position):not(.ysp-native-caption-dragged) .caption-window.ytp-caption-window-rollup .captions-text:not(.ytp-custom-active),
        .ysp-caption-layout-root:not(.ysp-active-shorts-playback):not(.has-custom-subtitles):not(.ysp-stable-caption-position):not(.ysp-native-caption-dragged) .caption-window.ytp-rollup-mode .captions-text:not(.ytp-custom-active) {
            display: block !important;
            width: min(54vw, 42ch, calc(100vw - 96px)) !important;
            max-width: calc(100vw - 32px) !important;
            margin-left: auto !important;
            margin-right: auto !important;
            box-sizing: border-box !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
            will-change: auto !important;
        }

        /* The runtime chooses visible cues by visual-row count for both /watch and
           Shorts. Hidden history must leave layout entirely; the first remaining
           line also loses the sibling gap left by older native rollup rows. */
        .ysp-caption-layout-root:not(.has-custom-subtitles) .caption-window.ytp-caption-window-rollup .caption-visual-line.ysp-rollup-history-hidden,
        .ysp-caption-layout-root:not(.has-custom-subtitles) .caption-window.ytp-rollup-mode .caption-visual-line.ysp-rollup-history-hidden {
            display: none !important;
        }
        .ysp-caption-layout-root:not(.has-custom-subtitles) .caption-window.ytp-caption-window-rollup .caption-visual-line.ysp-rollup-first-visible,
        .ysp-caption-layout-root:not(.has-custom-subtitles) .caption-window.ytp-rollup-mode .caption-visual-line.ysp-rollup-first-visible {
            margin-top: 0 !important;
        }
        .ysp-caption-layout-root.ysp-active-shorts-playback:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-no-fix):not(.ytp-custom-active) {
            max-width: 100% !important;
            white-space: pre-wrap !important;
            overflow-wrap: anywhere !important;
            opacity: 1 !important;
            visibility: visible !important;
            unicode-bidi: normal !important;
        }
        /* Treat each complete line as one bidi paragraph. YouTube can put a final
           period in its own span; isolating every span separately moves that
           neutral punctuation to the beginning of an Arabic line. */
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .captions-text,
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .caption-visual-line {
            direction: rtl !important;
            unicode-bidi: isolate !important;
        }
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .captions-text,
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .caption-visual-line {
            direction: ltr !important;
            unicode-bidi: isolate !important;
        }
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active),
        .ysp-caption-layout-root.is-arabic:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active) [style],
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active),
        .ysp-caption-layout-root.is-english:not(.has-custom-subtitles) .ytp-caption-segment:not(.ytp-custom-active) [style] {
            direction: inherit !important;
            unicode-bidi: normal !important;
        }
        /* Smart Timing Hidden Class */
        .ysp-smart-hide {
            display: none !important;
        }
        .ysp-caption-notice-hidden {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
        /* Delay Class */
        .ysp-delayed {
            opacity: 0 !important;
            visibility: hidden !important;
        }
        /* Phrase Overlay (Custom SRT only; hidden by default so stale overlay DOM cannot render Basic captions) */
        .ysp-phrase-overlay {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
        .ysp-phrase-overlay-active > .ysp-phrase-overlay {
            display: inline-block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        .ysp-typewriter-overlay-active .ysp-phrase-overlay {
            padding-inline-end: 5px !important;
            border-inline-end: 2px solid currentColor !important;
            animation: yspTypewriterCaret 0.85s steps(1, end) infinite !important;
        }
        @keyframes yspTypewriterCaret {
            0%, 100% { border-color: currentColor; }
            50% { border-color: transparent; }
        }
        .ysp-phrase-overlay-active.is-arabic .ytp-caption-segment,
        .ysp-phrase-overlay-active.is-english .ytp-caption-segment,
        .ysp-phrase-overlay-active.is-arabic .captions-text,
        .ysp-phrase-overlay-active.is-english .captions-text,
        .ysp-phrase-overlay-active.is-arabic .caption-visual-line,
        .ysp-phrase-overlay-active.is-english .caption-visual-line,
        .ysp-typewriter-overlay-active.is-arabic .ytp-caption-segment,
        .ysp-typewriter-overlay-active.is-english .ytp-caption-segment,
        .ysp-typewriter-overlay-active.is-arabic .captions-text,
        .ysp-typewriter-overlay-active.is-english .captions-text,
        .ysp-typewriter-overlay-active.is-arabic .caption-visual-line,
        .ysp-typewriter-overlay-active.is-english .caption-visual-line {
            opacity: 0 !important;
            visibility: hidden !important;
        }

        ${shortsThemeCss}

        /* Keep a newly-created playback caption invisible until its real text
           establishes Arabic/English. This prevents a one-frame jump between
           independently configured language profile sizes. */
        .ysp-caption-layout-root.ysp-caption-language-pending:not(.has-custom-subtitles) {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }
    `;
    if (typeof attachSubtitleStyleTag === 'function') attachSubtitleStyleTag();
    styleTag.textContent = css;
}

function getCaptionLayoutRoot(win, relatedNodes) {
    const nodes = Array.isArray(relatedNodes) && relatedNodes.length ? relatedNodes : [win];
    return nodes.find(n => n && n.classList && n.classList.contains('ytp-caption-window-container')) ||
        nodes.find(n => n && n.classList && n.classList.contains('ytp-caption-window')) ||
        nodes.find(n => n && n.classList && n.classList.contains('caption-window')) ||
        win;
}

function clearCaptionLanguagePendingFailSafe(root) {
    if (!root || !root.yspCaptionLanguagePendingTimeout) return false;
    clearTimeout(root.yspCaptionLanguagePendingTimeout);
    root.yspCaptionLanguagePendingTimeout = null;
    return true;
}

function resolveCaptionLanguagePendingFailSafe(root, fallbackLanguage = 'en') {
    if (!root || !root.classList || !root.classList.contains('ysp-caption-language-pending')) return false;
    if (root.isConnected === false) return false;

    // Creator-authored captions and previews are outside this recovery path. Their
    // native styling/visibility must remain owned by YouTube and the video author.
    const isPreview = !!(root.closest && root.closest(YSP_CAPTION_PREVIEW_SELECTOR));
    const hasCreatorCustomStyle = root.classList.contains('has-custom-subtitles') ||
        !!(root.closest && root.closest('.has-custom-subtitles')) ||
        !!(root.querySelector && root.querySelector('.has-custom-subtitles'));
    if (isPreview || hasCreatorCustomStyle) return false;

    const text = normalizeCaptionText(root.textContent || '');
    let languageBucket = /[\u0600-\u06FF]/.test(text) ? 'ar' : (text ? 'en' : '');
    if (!languageBucket) {
        const player = getCaptionPlayer(root);
        languageBucket = getCaptionTrackDisplayLanguageBucket(getSelectedCaptionTrack(player));
    }
    if (!languageBucket) languageBucket = fallbackLanguage === 'ar' ? 'ar' : 'en';

    const relatedNodes = [root];
    if (root.querySelectorAll) {
        root.querySelectorAll('.ytp-caption-window-container, .ytp-caption-window, .caption-window')
            .forEach(node => relatedNodes.push(node));
    }
    relatedNodes.forEach(node => {
        if (!node || !node.classList) return;
        node.classList.toggle('is-arabic', languageBucket === 'ar');
        node.classList.toggle('is-english', languageBucket !== 'ar');
        node.classList.remove('ysp-caption-language-pending');
    });
    return true;
}

function scheduleCaptionLanguagePendingFailSafe(root, fallbackLanguage = 'en') {
    if (!root || !root.classList || !root.classList.contains('ysp-caption-language-pending')) return false;
    const isPreview = !!(root.closest && root.closest(YSP_CAPTION_PREVIEW_SELECTOR));
    const hasCreatorCustomStyle = root.classList.contains('has-custom-subtitles') ||
        !!(root.closest && root.closest('.has-custom-subtitles')) ||
        !!(root.querySelector && root.querySelector('.has-custom-subtitles'));
    if (isPreview || hasCreatorCustomStyle || root.yspCaptionLanguagePendingTimeout) return false;

    const safeFallbackLanguage = fallbackLanguage === 'ar' ? 'ar' : 'en';
    root.yspCaptionLanguagePendingTimeout = setTimeout(() => {
        root.yspCaptionLanguagePendingTimeout = null;
        resolveCaptionLanguagePendingFailSafe(root, safeFallbackLanguage);
    }, CAPTION_LANGUAGE_PENDING_FAILSAFE_MS);
    return true;
}

function getNativeCaptionDragNode(root) {
    if (!root) return null;
    if (root.matches && root.matches('.caption-window')) return root;
    return root.querySelector ? root.querySelector('.caption-window') : null;
}

function hasNativeCaptionDragState(root) {
    const node = getNativeCaptionDragNode(root);
    if (!node) return false;

    const draggableAttr = (node.getAttribute && node.getAttribute('draggable')) || '';
    const isDraggable = draggableAttr === 'true' || node.draggable === true;
    if (!isDraggable) return false;

    const inlineStyle = (node.getAttribute && node.getAttribute('style')) || '';
    const touchAction = (node.style && node.style.touchAction) || '';
    const hasTouchDrag = /touch-action\s*:\s*none/i.test(inlineStyle) || /none/i.test(touchAction);
    const readPercent = (property) => {
        const match = inlineStyle.match(new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*(-?\\d+(?:\\.\\d+)?)%`, 'i'));
        return match ? Number(match[1]) : NaN;
    };
    const leftPercent = readPercent('left');
    const topPercent = readPercent('top');
    const hasLeft = Number.isFinite(leftPercent);
    const hasTop = Number.isFinite(topPercent);
    const hasMargin = /(?:^|;)\s*margin-(?:left|top)\s*:\s*-?\d+(?:\.\d+)?px/i.test(inlineStyle);
    const movedHorizontally = hasLeft && Math.abs(leftPercent - 50) > 0.1;

    // YouTube changes only `bottom` when its timeline/control bar appears. That is
    // a temporary safe-area adjustment, not a user drag. Treating it as a drag
    // removes our stable bottomPos rule and makes captions jump on every hover.
    // A real native drag supplies an explicit top position or moves horizontally;
    // Subtitle Pro's own pointer drag is persisted separately as an anchor.
    return hasTouchDrag && hasLeft && hasMargin && (hasTop || movedHorizontally);
}

function syncNativeCaptionDragState(layoutRoot, settings, context = {}) {
    if (!layoutRoot || !layoutRoot.classList) return false;
    const hasSeenCreatorCustomStyles = !!context.hasSeenCreatorCustomStyles;
    const isFixedZone = !!context.isFixedZone;
    const isPlaybackContext = !!context.isPlaybackContext;
    const isAutoTranslatedCaptionTrack = !!context.isAutoTranslatedCaptionTrack;
    const isActiveShortsPlayback = !!context.isActiveShortsPlayback;
    const isBlockedContext = !isPlaybackContext || isFixedZone || hasSeenCreatorCustomStyles || isAutoTranslatedCaptionTrack || layoutRoot.classList.contains('has-custom-subtitles');
    const shouldDisableNativeDrag = !isBlockedContext && !!(settings && settings.allowNativeCaptionDrag === false);
    const shouldEnableNativeDrag = !isBlockedContext && !shouldDisableNativeDrag;
    // Shorts ships with top/left/touch-action inline geometry even before the user
    // drags anything. Do not mistake that host default for a persisted user drag,
    // or the bottom-position rule gets disabled and the caption jumps to the top.
    const shouldMarkNativeDragged = shouldEnableNativeDrag && !isActiveShortsPlayback && hasNativeCaptionDragState(layoutRoot);
    const nativeDragNode = getNativeCaptionDragNode(layoutRoot);

    layoutRoot.classList.toggle('ysp-native-drag-disabled', shouldDisableNativeDrag);
    layoutRoot.classList.toggle('ysp-native-caption-dragged', shouldMarkNativeDragged);
    if (nativeDragNode && nativeDragNode.classList) {
        nativeDragNode.classList.toggle('ysp-native-caption-hit-target', shouldEnableNativeDrag);
        // Remove transparent hover layers left by an earlier build.  The drag
        // guard now uses the visible caption text bounds directly instead.
        if (nativeDragNode.querySelectorAll) {
            nativeDragNode.querySelectorAll('.ysp-native-caption-hit-layer').forEach(layer => layer.remove());
        }
    }

    return shouldMarkNativeDragged;
}

function getVisibleCaptionTextRect(container) {
    if (!container || !container.querySelector) return null;
    const text = container.matches && container.matches('.captions-text')
        ? container
        : container.querySelector('.captions-text');
    if (!text || !text.getBoundingClientRect) return null;

    const visibleLineRects = text.querySelectorAll
        ? Array.from(text.querySelectorAll('.caption-visual-line:not(.ysp-rollup-history-hidden)'))
            .map(line => {
                const view = line.ownerDocument && line.ownerDocument.defaultView;
                const style = view && view.getComputedStyle ? view.getComputedStyle(line) : null;
                if (style && (style.display === 'none' || style.visibility === 'hidden')) return null;
                return line.getBoundingClientRect ? line.getBoundingClientRect() : null;
            })
            .filter(rect => rect && rect.width > 0 && rect.height > 0)
        : [];
    if (!visibleLineRects.length) return text.getBoundingClientRect();

    const left = Math.min(...visibleLineRects.map(rect => rect.left));
    const right = Math.max(...visibleLineRects.map(rect => rect.right));
    const top = Math.min(...visibleLineRects.map(rect => rect.top));
    const bottom = Math.max(...visibleLineRects.map(rect => rect.bottom));
    return {
        x: left,
        y: top,
        left,
        right,
        top,
        bottom,
        width: right - left,
        height: bottom - top
    };
}

function applyStableCaptionDragPosition(layoutRoot, lang, surface = 'video') {
    const position = stableCaptionDragPositions[surface] && stableCaptionDragPositions[surface][lang];
    if (!position || !layoutRoot || !layoutRoot.style || !layoutRoot.getBoundingClientRect) return false;

    const rootRect = layoutRoot.getBoundingClientRect();
    if (!rootRect || rootRect.width <= 0 || rootRect.height <= 0) return false;
    const text = layoutRoot.querySelector && layoutRoot.querySelector('.captions-text');
    if (!text || !text.style || !text.getBoundingClientRect) return false;

    // Migrate the short-lived container-transform implementation without
    // touching any transform owned by YouTube itself.
    if (layoutRoot.dataset.yspDragOffsetX !== undefined || layoutRoot.dataset.yspDragOffsetY !== undefined) {
        layoutRoot.style.removeProperty('transform');
        delete layoutRoot.dataset.yspDragOffsetX;
        delete layoutRoot.dataset.yspDragOffsetY;
    }

    const previousX = Number(text.dataset.yspDragOffsetX) || 0;
    const previousY = Number(text.dataset.yspDragOffsetY) || 0;
    const textRect = getVisibleCaptionTextRect(text);
    if (!textRect || textRect.width <= 0 || textRect.height <= 0) return false;
    const baseTextRect = {
        left: textRect.left - previousX,
        right: textRect.right - previousX,
        top: textRect.top - previousY,
        bottom: textRect.bottom - previousY
    };
    const { x, y } = computeStableCaptionOffsetForAnchor(position, baseTextRect, rootRect);
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    let changed = false;

    if (text.style.getPropertyValue('transform') !== transform || text.style.getPropertyPriority('transform') !== 'important') {
        text.style.setProperty('transform', transform, 'important');
        changed = true;
    }
    if (text.dataset.yspDragOffsetX !== String(x)) {
        text.dataset.yspDragOffsetX = String(x);
        changed = true;
    }
    if (text.dataset.yspDragOffsetY !== String(y)) {
        text.dataset.yspDragOffsetY = String(y);
        changed = true;
    }
    if (layoutRoot.classList && !layoutRoot.classList.contains('ysp-stable-caption-position')) {
        layoutRoot.classList.add('ysp-stable-caption-position');
        changed = true;
    }
    return changed;
}

function restoreNativeCaptionWindowDefaultPosition(node) {
    if (!node || !node.style) return false;

    const previousStyle = (node.getAttribute && node.getAttribute('style')) || '';
    const styleWidth = parseFloat(node.style.getPropertyValue('width'));
    const rect = node.getBoundingClientRect ? node.getBoundingClientRect() : null;
    const rectWidth = rect && Number.isFinite(rect.width) ? rect.width : 0;
    const width = Number.isFinite(styleWidth) && styleWidth > 0 ? styleWidth : rectWidth;

    ['right', 'top', 'margin-right', 'margin-top', 'margin-bottom', 'transform', 'max-width'].forEach(prop => {
        if (node.style.getPropertyValue(prop)) {
            node.style.removeProperty(prop);
        }
    });

    node.style.setProperty('left', '50%');
    node.style.setProperty('bottom', '2%');

    if (Number.isFinite(width) && width > 0) {
        const roundedWidth = Math.round(width * 1000) / 1000;
        node.style.setProperty('width', `${roundedWidth}px`);
        node.style.setProperty('margin-left', `${-(roundedWidth / 2)}px`);
    }

    const nextStyle = (node.getAttribute && node.getAttribute('style')) || '';
    return nextStyle !== previousStyle;
}

function resetNativeCaptionPosition() {
    ['video', 'shorts'].forEach(surface => {
        stableCaptionDragPositions[surface].ar = null;
        stableCaptionDragPositions[surface].en = null;
    });
    let changed = false;
    const seenTargets = new Set();

    document.querySelectorAll('.caption-window, .ytp-caption-window, .ytp-caption-window-container').forEach(node => {
        if (!node) return;
        if (node.closest && node.closest('.has-custom-subtitles')) return;

        const nativeNode = getNativeCaptionDragNode(node) || (node.matches && node.matches('.caption-window') ? node : null);
        if (nativeNode && nativeNode.style && !seenTargets.has(nativeNode)) {
            seenTargets.add(nativeNode);
            if (restoreNativeCaptionWindowDefaultPosition(nativeNode)) {
                changed = true;
            }
        }

        if (node.classList && node.classList.contains('ysp-native-caption-dragged')) {
            node.classList.remove('ysp-native-caption-dragged');
            changed = true;
        }
        if (node.classList && node.classList.contains('ysp-stable-caption-position')) {
            node.classList.remove('ysp-stable-caption-position');
            if (node.dataset.yspDragOffsetX !== undefined || node.dataset.yspDragOffsetY !== undefined) {
                node.style.removeProperty('transform');
                delete node.dataset.yspDragOffsetX;
                delete node.dataset.yspDragOffsetY;
            }
            node.querySelectorAll('.captions-text').forEach(text => {
                text.style.removeProperty('transform');
                delete text.dataset.yspDragOffsetX;
                delete text.dataset.yspDragOffsetY;
            });
            changed = true;
        }
    });

    document.querySelectorAll('.ysp-caption-layout-root.ysp-native-caption-dragged').forEach(node => {
        node.classList.remove('ysp-native-caption-dragged');
        changed = true;
    });

    if (changed) {
        updateCachedSubtitleStyles();
        setTimeout(runImmediateCaptionMutationPass, 0);
    }
    return changed;
}

function clearCreatorCustomExtensionArtifacts(layoutRoot, win) {
    if (!win) return false;
    let changed = false;
    const classTargets = new Set([layoutRoot, win].filter(Boolean));
    if (win.querySelectorAll) {
        win.querySelectorAll('.ytp-caption-window-container, .ytp-caption-window, .caption-window').forEach(node => classTargets.add(node));
    }
    const extensionOnlyClasses = [
        'ysp-delayed', 'ysp-delay-ready', 'ysp-phrase-overlay-active',
        'ysp-typewriter-overlay-active', 'ysp-native-drag-disabled',
        'ysp-native-caption-dragged', 'ysp-native-caption-hit-target',
        'ysp-stable-caption-position'
    ];
    classTargets.forEach(node => {
        if (!node || !node.classList) return;
        extensionOnlyClasses.forEach(className => {
            if (!node.classList.contains(className)) return;
            node.classList.remove(className);
            changed = true;
        });
        if (node.dataset && (node.dataset.yspDragOffsetX !== undefined || node.dataset.yspDragOffsetY !== undefined)) {
            if (node.style) node.style.removeProperty('transform');
            delete node.dataset.yspDragOffsetX;
            delete node.dataset.yspDragOffsetY;
            changed = true;
        }
    });
    if (win.querySelectorAll) {
        win.querySelectorAll('.captions-text').forEach(text => {
            if (!text.dataset || (text.dataset.yspDragOffsetX === undefined && text.dataset.yspDragOffsetY === undefined)) return;
            if (text.style) text.style.removeProperty('transform');
            delete text.dataset.yspDragOffsetX;
            delete text.dataset.yspDragOffsetY;
            changed = true;
        });
        win.querySelectorAll('.caption-visual-line').forEach(line => {
            ['ysp-rollup-history-hidden', 'ysp-rollup-first-visible'].forEach(className => {
                if (!line.classList || !line.classList.contains(className)) return;
                line.classList.remove(className);
                changed = true;
            });
        });
        win.querySelectorAll('.ysp-native-caption-hit-layer').forEach(layer => {
            layer.remove();
            changed = true;
        });
    }
    return changed;
}

function detectLanguage() {
    const selector = '.ytp-caption-window-container, .ytp-caption-window, .caption-window';
    const windows = Array.from(document.querySelectorAll(selector)).filter(win => {
        const parent = win.parentElement ? win.parentElement.closest(selector) : null;
        return !parent;
    });
    const profileEvidenceByPlayer = new Map();
    const queueCaptionProfileEvidence = (win, player, text, segments, mode, trackKey, context) => {
        const segmentList = Array.from(segments || []);
        const visibleSegmentText = segmentList.filter(segment => {
            if (!segment || segment.isConnected === false) return false;
            if (segment.closest && segment.closest(
                '.ysp-caption-notice-hidden, .ysp-rollup-history-hidden, .ysp-empty-caption-segment, ' +
                '[hidden], [aria-hidden="true"]'
            )) return false;
            return isCaptionProfileEvidenceNodeVisible(segment, win);
        }).map(segment => segment.innerText || segment.textContent || '').join(' ');
        const evidenceText = segmentList.length ? visibleSegmentText : text;
        const language = getCaptionProfileLanguageEvidence(evidenceText);
        if (!language || !isCaptionProfileEvidenceRoot(win, player, context)) return false;
        return addPlayerCaptionProfileEvidence(profileEvidenceByPlayer, player, {
            language,
            mode,
            trackKey
        });
    };

    const setWindowCaptionText = (win, segments, text, options) => {
        const clean = (text || '').toString();
        let changed = false;
        if (segments && segments.length > 0) {
            if (segments[0].classList && segments[0].classList.contains('ysp-empty-caption-segment')) {
                segments[0].classList.remove('ysp-empty-caption-segment');
                changed = true;
            }
            if (applyCinematicCaptionLines(segments[0], clean, options)) {
                changed = true;
            }
            for (let i = 1; i < segments.length; i++) {
                if (segments[i].classList) segments[i].classList.remove('ysp-cinematic-multiline');
                if (segments[i].textContent !== '') {
                    segments[i].textContent = '';
                    changed = true;
                }
                if (segments[i].classList && !segments[i].classList.contains('ysp-empty-caption-segment')) {
                    segments[i].classList.add('ysp-empty-caption-segment');
                    changed = true;
                }
            }
        } else {
            const shouldRenderLineNodes = getCinematicCaptionLines(clean).length > 1;
            if (shouldRenderLineNodes && win && win.classList) {
                if (applyCinematicCaptionLines(win, clean, options)) {
                    changed = true;
                }
            } else if (win.textContent !== clean) {
                win.textContent = clean;
                changed = true;
            }
        }
    };

    const ensurePhraseOverlay = (win) => {
        let el = win.querySelector(':scope > .ysp-phrase-overlay');
        if (!el) {
            el = document.createElement('span');
            el.className = 'ysp-phrase-overlay';
            el.textContent = '';
            win.appendChild(el);
        }
        return el;
    };

    const setOverlayText = (overlayEl, text) => {
        const clean = (text || '').toString();
        if (overlayEl.textContent !== clean) {
            overlayEl.textContent = clean;
        }
    };

    windows.forEach(win => {
        const leafCaptionWindows = getLeafCaptionWindows(win);
        const { segments, fallbackStyleTargets, sourceEntries } = getCaptionRenderTargets(win);
        const segmentList = segments;
        const usingFallbackCaptionTextNodes = fallbackStyleTargets.length > 0;
        win.querySelectorAll('.captions-text, .caption-visual-line').forEach(node => {
            node.classList.toggle('ysp-caption-style-target', usingFallbackCaptionTextNodes && fallbackStyleTargets.includes(node));
        });

        const relatedNodesSet = new Set();
        relatedNodesSet.add(win);
        const closestContainer = win.closest('.ytp-caption-window-container');
        if (closestContainer) relatedNodesSet.add(closestContainer);
        const closestWindow = win.closest('.ytp-caption-window');
        if (closestWindow) relatedNodesSet.add(closestWindow);
        leafCaptionWindows.forEach(n => relatedNodesSet.add(n));
        win.querySelectorAll('.ytp-caption-window-container, .ytp-caption-window, .caption-window').forEach(n => relatedNodesSet.add(n));
        const relatedNodes = Array.from(relatedNodesSet).filter(Boolean);
        const layoutRoot = getCaptionLayoutRoot(win, relatedNodes);
        relatedNodes.forEach(n => {
            if (n === layoutRoot) n.classList.add('ysp-caption-layout-root');
            else n.classList.remove('ysp-caption-layout-root');
        });

        const inPreviewContext = !!win.closest(YSP_CAPTION_PREVIEW_SELECTOR);
        const captionPlayer = getCaptionPlayer(win);
        const isInShortsTree = !!win.closest('.ytp-reel-video-player, ytd-reel-video-renderer, ytd-shorts');
        const isActiveShortsPlayback = isInShortsTree && isActiveShortsPlaybackWindow(win, captionPlayer);
        const isPreviewSurface = inPreviewContext || (isInShortsTree && !isActiveShortsPlayback);
        const isWatchPlayback = !isPreviewSurface && location.pathname === '/watch' && !!captionPlayer;
        const isPlaybackContext = isActiveShortsPlayback || isWatchPlayback;
        relatedNodes.forEach(n => {
            if (n.classList) n.classList.toggle('ysp-active-shorts-playback', isActiveShortsPlayback);
        });

        const isNativeRollup = (
            (win.matches && win.matches('.ytp-caption-window-rollup, .ytp-rollup-mode')) ||
            (win.querySelector && !!win.querySelector('.caption-window.ytp-caption-window-rollup, .caption-window.ytp-rollup-mode'))
        );
        const isPlaybackRollup = isPlaybackContext && isNativeRollup;
        let fullText = collectCaptionSourceText(win, segments, {
            latestRollupLinesOnly: isPlaybackRollup,
            sourceEntries
        });
        const selectedCaptionTrack = getSelectedCaptionTrack(captionPlayer);
        // YouTube can write the first rollup translateY() before its track metadata
        // and rollup class exist. Recognize only the clipped, pure vertical host
        // motion; any authored color/font/animation/effect is still detected below.
        const hasEarlyNativeRollupMotion = isPlaybackContext &&
            !isNativeRollup &&
            hasNativeCaptionRollupLayoutMotion(win);
        const currentCaptionTrackKey = getCurrentCaptionTrackKey(selectedCaptionTrack, captionPlayer);
        const captionLanguageBucket = getCaptionLanguageBucket(fullText);
        const isAutoTranslatedCaptionTrack = isCaptionTrackAutoTranslated(selectedCaptionTrack) ||
            isLikelyAutoTranslatedCaptionTextForTrack(selectedCaptionTrack, fullText);
        const trackDisplayLanguageBucket = getCaptionTrackDisplayLanguageBucket(selectedCaptionTrack);
        const reusablePlayerCaptionProfile = isPlaybackContext && captionPlayer
            ? getReusablePlayerCaptionProfileState(captionPlayer, selectedCaptionTrack)
            : null;
        if (layoutRoot && layoutRoot.dataset) {
            if (currentCaptionTrackKey) layoutRoot.dataset.yspCaptionTrackKey = currentCaptionTrackKey;
            layoutRoot.dataset.yspCaptionAutoTranslated = isAutoTranslatedCaptionTrack ? '1' : '0';
        }
        clearStaleCreatorCustomCaptionState(relatedNodes, segments, win, currentCaptionTrackKey);
        const hasExtensionOwnedDragPosition =
            !!(layoutRoot && layoutRoot.classList && layoutRoot.classList.contains('ysp-stable-caption-position')) ||
            Array.from(win.querySelectorAll('.captions-text')).some(node =>
                node && node.dataset &&
                (node.dataset.yspDragOffsetX !== undefined || node.dataset.yspDragOffsetY !== undefined)
            );
        relatedNodes.forEach(n => {
            if (n.classList) n.classList.toggle('ysp-auto-translated-caption', !!isAutoTranslatedCaptionTrack);
        });
        if (isAutoTranslatedCaptionTrack || isNativeRollup) {
            clearCreatorCustomCaptionFallback(captionPlayer);
            relatedNodes.forEach(n => {
                if (n.dataset) delete n.dataset.yspCreatorCustomTrack;
            });
        }

        let hasCustomStyles = false;
        segments.forEach(s => {
            if (shouldPreserveCreatorCustomCaptionStyle(s, win, {
                isAutoTranslatedCaptionTrack,
                // YouTube's native rollup animation writes translateY(...) onto
                // captions-text while a new ASR cue arrives. That host motion is
                // not creator styling and must never disable the user's template.
                ignoreLayoutTransform: isActiveShortsPlayback || isPlaybackRollup || hasEarlyNativeRollupMotion,
                // WebVTT/SAMI/RealText officially support authored bold, italic,
                // and underline. YouTube viewer caption options do not expose these
                // per-word decorations, so they are a strong creator-style signal.
                allowAuthoredEmphasis: true
            })) {
                hasCustomStyles = true;
                s.classList.add('ytp-custom-active');
            } else {
                s.classList.remove('ytp-custom-active');
            }
        });
        const hasSinglePositionCreatorLayout = !isActiveShortsPlayback &&
            !isNativeRollup &&
            !isAutoTranslatedCaptionTrack &&
            !hasExtensionOwnedDragPosition &&
            leafCaptionWindows.some(hasStrongSinglePositionCreatorCaptionLayout);
        const hasMultiPositionCreatorLayout = !isActiveShortsPlayback &&
            !isNativeRollup &&
            !isAutoTranslatedCaptionTrack &&
            !hasExtensionOwnedDragPosition &&
            // Only compare windows under this playback caption root. Tooltips,
            // hover previews and settings samples must never classify the track.
            hasMultiPositionCreatorCaptionLayout(win, leafCaptionWindows);
        const hasRuntimeRememberedCreatorCustomTrack = !isAutoTranslatedCaptionTrack &&
            !isNativeRollup &&
            hasRememberedCreatorCustomCaptionTrack(captionPlayer, currentCaptionTrackKey, captionLanguageBucket);
        const hasDomRememberedCreatorCustomTrack = !isAutoTranslatedCaptionTrack &&
            !isNativeRollup &&
            !!currentCaptionTrackKey &&
            relatedNodes.some(n => n.dataset.yspCreatorCustomTrack === currentCaptionTrackKey);
        const hasRememberedCreatorCustomTrack = hasRuntimeRememberedCreatorCustomTrack || hasDomRememberedCreatorCustomTrack;
        if (hasRuntimeRememberedCreatorCustomTrack && currentCaptionTrackKey) {
            relatedNodes.forEach(n => {
                if (n.dataset && n.dataset.yspCreatorCustomTrack !== currentCaptionTrackKey) {
                    n.dataset.yspCreatorCustomTrack = currentCaptionTrackKey;
                }
            });
        }
        const hasSeenCreatorCustomStyles = hasCustomStyles ||
            hasSinglePositionCreatorLayout ||
            hasMultiPositionCreatorLayout ||
            hasRememberedCreatorCustomTrack;
        if (isPlaybackContext && !isAutoTranslatedCaptionTrack && !isNativeRollup && (hasCustomStyles || hasSinglePositionCreatorLayout || hasMultiPositionCreatorLayout)) {
            rememberCreatorCustomCaptionTrack(captionPlayer, currentCaptionTrackKey, captionLanguageBucket);
            if (currentCaptionTrackKey) {
                relatedNodes.forEach(n => {
                    if (n.dataset && n.dataset.yspCreatorCustomTrack !== currentCaptionTrackKey) {
                        n.dataset.yspCreatorCustomTrack = currentCaptionTrackKey;
                    }
                });
            }
        } else if (!hasSeenCreatorCustomStyles) {
            relatedNodes.forEach(n => n.classList.remove('has-custom-subtitles'));
        }

        hideYouTubeCaptionSettingsNoticeNodes(win, segments);

        const captionLanguageEvidence = getCaptionProfileLanguageEvidence(fullText);
        const hasArabic = captionLanguageEvidence === 'ar';
        const hasEnglish = captionLanguageEvidence === 'en';
        const hasRealCaptionText = !!captionLanguageEvidence;

        // Preview cards stay on their compact fixed style. The active Shorts player
        // is real playback and must receive the user's selected theme and position.
        const isFixedZone = isPreviewSurface;
        const isFixedZoneCreatorCustom = isPreviewSurface && hasSeenCreatorCustomStyles;

        // Previews never receive language/theme classes. Standard previews use the
        // compact fixed CSS; creator-custom previews keep the creator's native look.
        if (isPreviewSurface) {
            if (isFixedZoneCreatorCustom) {
                relatedNodes.forEach(n => {
                    n.classList.remove('is-arabic');
                    n.classList.remove('is-english');
                    n.classList.remove('ysp-caption-language-pending');
                    n.classList.add('has-custom-subtitles');
                    if (currentCaptionTrackKey) n.dataset.yspCreatorCustomTrack = currentCaptionTrackKey;
                });
                win.querySelectorAll('.captions-text, .caption-visual-line').forEach(n => {
                    n.classList.add('ytp-custom-active');
                    n.classList.remove('ysp-caption-style-target');
                });
                segments.forEach(s => s.classList.add('ytp-custom-active'));
            } else {
                // Clean up any stale language/custom classes that might have been set when
                // the same window was previously in a different context (rare, defensive).
                relatedNodes.forEach(n => {
                    n.classList.remove('is-arabic');
                    n.classList.remove('is-english');
                    n.classList.remove('ysp-caption-language-pending');
                    n.classList.remove('has-custom-subtitles');
                    delete n.dataset.yspCreatorCustomTrack;
                });
                win.querySelectorAll('.captions-text, .caption-visual-line').forEach(n => n.classList.remove('ytp-custom-active', 'ysp-caption-style-target'));
            }
        } else if (hasArabic) {
            relatedNodes.forEach(n => {
                n.classList.add('is-arabic');
                n.classList.remove('is-english');
                n.classList.remove('ysp-caption-language-pending');
            });
        } else if (hasEnglish || hasRealCaptionText) {
            relatedNodes.forEach(n => {
                n.classList.add('is-english');
                n.classList.remove('is-arabic');
                n.classList.remove('ysp-caption-language-pending');
            });
        } else {
            const hasLangClass = relatedNodes.some(n => n.classList.contains('is-arabic') || n.classList.contains('is-english'));
            if (hasLangClass) {
                relatedNodes.forEach(n => n.classList.remove('ysp-caption-language-pending'));
            } else if (isPlaybackContext && trackDisplayLanguageBucket) {
                // YouTube exposes the selected/translated language before the first
                // cue on most switches. Apply that profile immediately so an empty
                // replacement root never flashes native styling or disappears.
                relatedNodes.forEach(n => {
                    n.classList.toggle('is-arabic', trackDisplayLanguageBucket === 'ar');
                    n.classList.toggle('is-english', trackDisplayLanguageBucket !== 'ar');
                    n.classList.remove('ysp-caption-language-pending');
                });
            } else if (isPlaybackContext && reusablePlayerCaptionProfile) {
                // CC Off removes YouTube's transient caption DOM, but the selected
                // track/profile belongs to the stable player. Reuse that verified
                // state on the empty replacement root; the first real cue confirms
                // or corrects it synchronously before paint.
                relatedNodes.forEach(n => {
                    n.classList.toggle('is-arabic', reusablePlayerCaptionProfile.language === 'ar');
                    n.classList.toggle('is-english', reusablePlayerCaptionProfile.language === 'en');
                    n.classList.remove('ysp-caption-language-pending');
                });
            } else if (isPlaybackContext) {
                // A new YouTube caption window can exist briefly before its first
                // text or track metadata arrives. Keep this defensive state only for
                // a genuinely unknown empty root; the first real cue bypasses the
                // internal observer guard and is classified before paint.
                relatedNodes.forEach(n => n.classList.add('ysp-caption-language-pending'));
            } else {
                if (editTarget === 'ar') {
                    relatedNodes.forEach(n => {
                        n.classList.add('is-arabic');
                        n.classList.remove('is-english');
                        n.classList.remove('ysp-caption-language-pending');
                    });
                } else {
                    relatedNodes.forEach(n => {
                        n.classList.add('is-english');
                        n.classList.remove('is-arabic');
                        n.classList.remove('ysp-caption-language-pending');
                    });
                }
            }
        }

        const pendingCaptionLanguage = relatedNodes.some(n =>
            n.classList && n.classList.contains('ysp-caption-language-pending')
        );
        if (pendingCaptionLanguage && isPlaybackContext && !isPreviewSurface && !hasSeenCreatorCustomStyles) {
            const rememberedLanguage = reusablePlayerCaptionProfile && reusablePlayerCaptionProfile.language;
            scheduleCaptionLanguagePendingFailSafe(layoutRoot, rememberedLanguage || editTarget);
        } else {
            clearCaptionLanguagePendingFailSafe(layoutRoot);
        }

        if (hasSeenCreatorCustomStyles) {
            relatedNodes.forEach(n => n.classList.add('has-custom-subtitles'));
            segments.forEach(s => s.classList.add('ytp-custom-active'));
            win.querySelectorAll('.captions-text, .caption-visual-line').forEach(n => {
                n.classList.add('ytp-custom-active');
                n.classList.remove('ysp-caption-style-target');
            });
        } else {
            relatedNodes.forEach(n => n.classList.remove('has-custom-subtitles'));
            segments.forEach(s => s.classList.remove('ytp-custom-active'));
            win.querySelectorAll('.captions-text, .caption-visual-line').forEach(n => n.classList.remove('ytp-custom-active'));
        }

        const isAr = relatedNodes.some(n => n.classList.contains('is-arabic'));
        const settings = getCachedSubtitleSettings(isActiveShortsPlayback ? 'shorts' : 'video', isAr ? 'ar' : 'en');
        if (isPlaybackContext && !isFixedZone) {
            applyCaptionFontFamilyInline(win, getSubtitleFontFamilyForSettings(settings, isAr ? 'ar' : 'en'));
        } else {
            clearCaptionFontFamilyInline(win);
        }

        // Strict creator-custom boundary: once a creator-authored track is detected,
        // Subtitle Pro may change the selected font family only. Weight (including
        // per-word Bold), size, color, stroke, background, position, motion and timing
        // remain owned by YouTube/the video author. Auto-translated centered cues get
        // a width-only reflow so longer Arabic words do not stack inside a stale
        // English-sized box; this preserves the authored line composition.
        if (hasSeenCreatorCustomStyles) {
            syncNativeCaptionDragState(layoutRoot, settings, {
                isPlaybackContext,
                isFixedZone,
                hasSeenCreatorCustomStyles: true,
                isAutoTranslatedCaptionTrack,
                isActiveShortsPlayback
            });
            clearCreatorCustomExtensionArtifacts(layoutRoot, win);
            if (isPlaybackContext && !isFixedZone) {
                const shouldRepairCreatorCustomWidth = isAutoTranslatedCaptionTrack ||
                    (isAr && hasCreatorCustomCaptionAccidentalWrap(win));
                syncCreatorCustomCaptionReflow(win, {
                    isPlaybackContext: true,
                    allowWidthRepair: shouldRepairCreatorCustomWidth
                });
            } else {
                clearCreatorCustomCaptionReflow(win);
            }
            queueCaptionProfileEvidence(win, captionPlayer, fullText, segments, 'creator', currentCaptionTrackKey, {
                isPlaybackContext,
                isPreviewSurface
            });
            return;
        }

        clearCreatorCustomCaptionReflow(win);
        applyCaptionDirectionMarkerCleanup(win);

        const rollupVisibility = syncShortsRollupHistoryVisibility(win, {
            isActiveShortsPlayback,
            isPlaybackRollup,
            hasSeenCreatorCustomStyles,
            maxRows: 2
        });
        if (isPlaybackRollup && !hasSeenCreatorCustomStyles) {
            // Re-read after the visual row budget so delay/blocking/language helpers
            // operate on exactly what the viewer can see, never hidden history.
            fullText = collectCaptionSourceText(win, segments, { sourceEntries });
        }

        // Custom SRT and Phrase Mode use the same playback-only language classes.
        // Active Shorts are playback; hover/inactive preview surfaces remain excluded.
        const sourceCaptionText = String(fullText || '').includes('\n')
            ? String(fullText || '').split(/\n+/).map(line => stripCaptionDirectionMarkers(line)).filter(Boolean).join('\n')
            : stripCaptionDirectionMarkers(fullText);
        // Do not rewrite live YouTube captions into ysp-cinematic line nodes.
        // YouTube can paint the original caption first, then our mutation pass would replace it
        // with a basic extension-rendered white/black caption. Keep the host DOM intact and
        // apply styling via CSS only; custom SRT/explicit overlays still use the formatter below.
        fullText = sourceCaptionText;
        syncNativeCaptionDragState(layoutRoot, settings, {
            isPlaybackContext,
            isFixedZone,
            hasSeenCreatorCustomStyles,
            isAutoTranslatedCaptionTrack,
            isActiveShortsPlayback
        });
        if (isPlaybackContext && !isFixedZone && !hasSeenCreatorCustomStyles && !isAutoTranslatedCaptionTrack) {
            applyStableCaptionDragPosition(layoutRoot, isAr ? 'ar' : 'en', isActiveShortsPlayback ? 'shorts' : 'video');
        }

        if (isPlaybackContext && !isFixedZone && !hasSeenCreatorCustomStyles && customSrtEnabled && isCurrentCustomSrtForVideo()) {
            const video = document.querySelector('video');
            const cueText = getCurrentSrtText(video ? video.currentTime : NaN);
            const overlayEl = ensurePhraseOverlay(win);
            if (cueText) {
                win.classList.add('ysp-phrase-overlay-active');
                win.classList.remove('ysp-typewriter-overlay-active');
                setOverlayText(overlayEl, formatCinematicCaptionText(cueText, { isArabic: /[\u0600-\u06FF]/.test(cueText) || isAr }));
            } else {
                win.classList.remove('ysp-phrase-overlay-active');
                win.classList.remove('ysp-typewriter-overlay-active');
                setOverlayText(overlayEl, '');
            }
            win.classList.remove('ysp-smart-hide');
            if (win.yspPhraseTimeout) {
                clearTimeout(win.yspPhraseTimeout);
                win.yspPhraseTimeout = null;
            }
            delete win.dataset.yspPhraseLastText;
            delete win.dataset.yspPhraseLastAt;
            delete win.dataset.yspPhraseCommitted;
            delete win.dataset.yspPhrasePending;
            return;
        }

        // Native Caption Safe Mode: phrase/typewriter display modes are disabled for live
        // YouTube captions. Old stored settings or templates must not hide native captions
        // and render an extension-owned Basic overlay. Custom SRT is handled above only when
        // scoped to the current video.
        if (win.yspPhraseTimeout) {
            clearTimeout(win.yspPhraseTimeout);
            win.yspPhraseTimeout = null;
        }
        win.classList.remove('ysp-phrase-overlay-active');
        win.classList.remove('ysp-typewriter-overlay-active');
        const staleOverlay = win.querySelector(':scope > .ysp-phrase-overlay');
        if (staleOverlay && staleOverlay.textContent !== '') {
            setOverlayText(staleOverlay, '');
        }
        delete win.dataset.yspPhraseShown;
        delete win.dataset.yspPhraseLastSeen;
        delete win.dataset.yspPhraseLastChangeAt;
        delete win.dataset.yspPhraseLastText;
        delete win.dataset.yspPhraseLastAt;
        delete win.dataset.yspPhraseCommitted;
        delete win.dataset.yspPhrasePending;

        if (isPlaybackContext && !isFixedZone && settings.subDelay && !hasSeenCreatorCustomStyles && Math.abs(settings.subDelay) > 0.01) {
            const currentText = fullText.trim();
            if (currentText.length > 0) {
                if (win.dataset.yspLastText !== currentText) {
                    win.dataset.yspLastText = currentText;
                    win.classList.remove('ysp-delay-ready');
                    win.classList.add('ysp-delayed');

                    if (win.yspTimeout) clearTimeout(win.yspTimeout);

                    win.yspTimeout = setTimeout(() => {
                        win.classList.remove('ysp-delayed');
                        win.classList.add('ysp-delay-ready');
                    }, settings.subDelay * 1000);
                }
            } else {
                if (win.yspTimeout) clearTimeout(win.yspTimeout);
                win.classList.remove('ysp-delayed');
                win.dataset.yspLastText = "";
            }
        } else {
            win.classList.remove('ysp-delayed');
            if (win.yspTimeout) clearTimeout(win.yspTimeout);
        }

        if (isPlaybackContext && !isFixedZone && !hasSeenCreatorCustomStyles && (settings.smartTiming || settings.enhancedBlocking)) {
            const currentText = fullText.replace(/\s+/g, ' ').trim();
            const cleanup = evaluateCaptionCleanup(fullText, settings);
            const textKey = isAr ? 'ar' : 'en';

            const showCustomBlockingErrors = (errors) => {
                const errEl = document.querySelector('#ysp-custom-blocking-error');
                if (!errEl) return;
                if (errors && errors.length) {
                    errEl.textContent = (uiLang === 'ar' ? 'نمط غير صالح: ' : 'Invalid pattern: ') + errors.map(e => e.rule).join(', ');
                    errEl.style.display = 'block';
                } else {
                    errEl.textContent = '';
                    errEl.style.display = 'none';
                }
            };
            showCustomBlockingErrors(cleanup.errors);

            const incrementBlockedStats = () => {
                const lastBlockedText = win.dataset.yspLastBlockedText;
                if (lastBlockedText === currentText) return;

                const prevBlocked = cachedSettings[textKey].statsBlocked || 0;
                const nextBlocked = prevBlocked + 1;
                cachedSettings[textKey].statsBlocked = nextBlocked;
                safeStorageSet({ [textKey]: cachedSettings[textKey] });
                win.dataset.yspLastBlockedText = currentText;

                const statsCount = document.querySelector('#statsBlockedCount');
                if (statsCount) statsCount.textContent = cachedSettings[textKey].statsBlocked;
                if (prevBlocked < SUPPORT_BLOCK_THRESHOLD && nextBlocked >= SUPPORT_BLOCK_THRESHOLD) {
                    recordSupportTrigger('blocked10');
                }
            };

            if (cleanup.shouldHide) {
                win.classList.add('ysp-smart-hide');
                incrementBlockedStats();
            } else {
                win.classList.remove('ysp-smart-hide');
                if (cleanup.modified && cleanup.modifiedText !== currentText) {
                    // Native YouTube captions are host-owned. Do not rewrite partial text
                    // for cleanup/custom blocking, because that replaces YouTube's live DOM
                    // with a Basic extension render. Keep hide-only behavior for blocked lines.
                }
            }
        } else {
            win.classList.remove('ysp-smart-hide');
        }
        queueCaptionProfileEvidence(win, captionPlayer, fullText, segments, 'standard', currentCaptionTrackKey, {
            isPlaybackContext,
            isPreviewSurface
        });
    });

    commitPlayerCaptionProfileEvidence(profileEvidenceByPlayer);
    syncEditTargetToDisplayedCaptions();

}

let captionClassificationRunning = false;
let captionClassificationRequested = false;

const CAPTION_WINDOW_MUTATION_SELECTOR = '.caption-window, .ytp-caption-window-container, .ytp-caption-window';
const CAPTION_TEXT_MUTATION_SELECTOR = '.captions-text, .caption-visual-line, .ytp-caption-segment';
const CAPTION_MUTATION_SELECTOR = `${CAPTION_WINDOW_MUTATION_SELECTOR}, ${CAPTION_TEXT_MUTATION_SELECTOR}, .ysp-phrase-overlay`;

function getCaptionMutationElement(node) {
    if (!node) return null;
    if (node.nodeType === 1) return node;
    if (node.nodeType === 3) return node.parentElement || node.parentNode || null;
    return null;
}

function nodeTouchesCaptionTree(node) {
    const element = getCaptionMutationElement(node);
    if (!element) return false;
    if (element.matches && element.matches(CAPTION_MUTATION_SELECTOR)) return true;
    return !!(element.closest && element.closest(CAPTION_MUTATION_SELECTOR));
}

function nodeContainsCaptionTree(node) {
    const element = getCaptionMutationElement(node);
    if (!element) return false;
    if (nodeTouchesCaptionTree(element)) return true;
    return !!(element.querySelector && element.querySelector(CAPTION_MUTATION_SELECTOR));
}

function hasCaptionMutation(mutations) {
    return Array.from(mutations || []).some(mutation => {
        if (nodeTouchesCaptionTree(mutation.target)) return true;
        const added = Array.from(mutation.addedNodes || []);
        const removed = Array.from(mutation.removedNodes || []);
        return added.some(nodeContainsCaptionTree) || removed.some(nodeContainsCaptionTree);
    });
}

function bindMainCaptionObserverTargets(targets) {
    observer.disconnect();
    const connectedTargets = Array.from(targets || [])
        .filter(target => target && target.isConnected !== false);
    connectedTargets.forEach(target => observer.observe(target, MAIN_CAPTION_OBSERVER_OPTIONS));
    mainCaptionObserverTargets = new Set(connectedTargets);
    startMainCaptionObserverDiscovery();
    return connectedTargets;
}

function runImmediateCaptionMutationPass() {
    if (captionClassificationRunning) {
        captionClassificationRequested = true;
        return false;
    }

    do {
        captionClassificationRequested = false;
        captionClassificationRunning = true;
        try {
            try { observer.takeRecords(); } catch (_) { }
            observer.disconnect();
            const currentTargets = findMainCaptionObserverTargets();
            inheritPlayerCaptionProfileToRoots(findMainCaptionObserverHost(), currentTargets);
            detectLanguage();
        } finally {
            // YouTube may replace a caption root while classification is running.
            // Always re-query instead of reconnecting a captured, stale node.
            bindMainCaptionObserverTargets(findMainCaptionObserverTargets());
            captionClassificationRunning = false;
        }
    } while (captionClassificationRequested);
    return true;
}

function handleMainCaptionMutations(mutations) {
    if (!hasCaptionMutation(mutations)) return false;
    const currentVideoKey = getCurrentVideoKey();
    if (lastVideoKey && currentVideoKey !== lastVideoKey) {
        handleVideoNavigation('mutation');
    }
    // MutationObserver delivers this batch before paint. Because every YSP write
    // happens while the observer is disconnected in the transaction above, every
    // record received here belongs to YouTube and must be handled synchronously.
    runImmediateCaptionMutationPass();
    return true;
}

const observer = new MutationObserver(handleMainCaptionMutations);

const MAIN_CAPTION_OBSERVER_OPTIONS = Object.freeze({
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'draggable']
});
const MAIN_CAPTION_PAGE_DISCOVERY_OPTIONS = Object.freeze({
    childList: true,
    subtree: true
});
const MAIN_CAPTION_DISCOVERY_OPTIONS = Object.freeze({
    childList: true,
    subtree: true,
    // YouTube sometimes keeps a generic connected node through CC Off and
    // promotes it to a caption root with a class write on CC On. Watch only the
    // identity attribute (not style/characterData across the player) so that
    // promotion is reconciled before its first cue can paint.
    attributes: true,
    attributeFilter: ['class'],
    attributeOldValue: true
});
const MAIN_CAPTION_TARGET_SELECTOR = '.ytp-caption-window-container, .ytp-caption-window, .caption-window';
let mainCaptionObserverTargets = new Set();
let mainCaptionObserverDiscovery = null;
let mainCaptionObserverDiscoveryTarget = null;
let mainCaptionObserverDiscoveryTimer = null;
let mainCaptionNavigationPending = false;
let mainCaptionNavigationStartKey = '';

function isCaptionPlaybackVideoKey(videoKey = getCurrentVideoKey()) {
    return /^(?:watch|shorts):[^\s]+$/.test(String(videoKey || ''));
}

function findMainCaptionObserverHost() {
    return isCaptionPlaybackVideoKey() ? getYouTubePlayer() : null;
}

function findMainCaptionObserverTargets() {
    const player = findMainCaptionObserverHost();
    if (!player || !player.querySelectorAll) return [];
    return Array.from(player.querySelectorAll(MAIN_CAPTION_TARGET_SELECTOR)).filter(candidate => {
        if (!candidate) return false;
        if (candidate.closest && candidate.closest(YSP_CAPTION_PREVIEW_SELECTOR)) return false;
        if (getCaptionPlayer(candidate) !== player) return false;
        const parentCaptionRoot = candidate.parentElement && candidate.parentElement.closest
            ? candidate.parentElement.closest(MAIN_CAPTION_TARGET_SELECTOR)
            : null;
        return !parentCaptionRoot;
    });
}

function isNodeCoveredByMainCaptionObserverTargets(node) {
    const element = getCaptionMutationElement(node);
    if (!element) return false;
    return Array.from(mainCaptionObserverTargets).some(target =>
        target && (target === element || (target.contains && target.contains(element)))
    );
}

function hasMainCaptionRootIdentityClass(classValue) {
    const classes = new Set(String(classValue || '').split(/\s+/).filter(Boolean));
    return classes.has('ytp-caption-window-container') ||
        classes.has('ytp-caption-window') ||
        classes.has('caption-window');
}

function mutationMayReplaceMainCaptionTarget(mutation) {
    if (!mutation) return false;
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = getCaptionMutationElement(mutation.target);
        const wasCaptionRoot = hasMainCaptionRootIdentityClass(mutation.oldValue);
        const isCaptionRoot = !!(target && target.matches && target.matches(MAIN_CAPTION_TARGET_SELECTOR));
        // Ignore YSP's own language/state class writes. Only gaining or losing a
        // YouTube caption-root identity changes observer coverage.
        return wasCaptionRoot !== isCaptionRoot;
    }
    if (mutation.type !== 'childList') return false;

    // A stale/notice root can remain observed while cue one is inserted into a
    // newly promoted sibling. The added node is then only caption text, so inspect
    // the mutation target itself and reconcile if it sits outside current coverage.
    const mutationTarget = getCaptionMutationElement(mutation.target);
    if (mutationTarget && nodeTouchesCaptionTree(mutationTarget) &&
        !isNodeCoveredByMainCaptionObserverTargets(mutationTarget)) {
        return true;
    }

    const changedNodes = [
        ...Array.from(mutation.addedNodes || []),
        ...Array.from(mutation.removedNodes || [])
    ];
    return changedNodes.some(node => {
        if (!node || node.nodeType !== 1) return false;
        if (node.matches && node.matches(MAIN_CAPTION_TARGET_SELECTOR)) return true;
        return !!(node.querySelector && node.querySelector(MAIN_CAPTION_TARGET_SELECTOR));
    });
}

function stopMainCaptionObserverDiscovery() {
    if (mainCaptionObserverDiscovery) mainCaptionObserverDiscovery.disconnect();
    mainCaptionObserverDiscovery = null;
    mainCaptionObserverDiscoveryTarget = null;
    if (mainCaptionObserverDiscoveryTimer !== null) {
        clearTimeout(mainCaptionObserverDiscoveryTimer);
        mainCaptionObserverDiscoveryTimer = null;
    }
}

function scheduleMainCaptionObserverDiscoveryCheck(delay = 0) {
    if (mainCaptionObserverDiscoveryTimer !== null) return;
    mainCaptionObserverDiscoveryTimer = setTimeout(() => {
        mainCaptionObserverDiscoveryTimer = null;
        synchronizeMainCaptionPipeline();
    }, delay);
}

function isMainCaptionPlayerResolvedForCurrentRoute(player) {
    if (!player) return false;
    const currentVideoKey = getCurrentVideoKey();
    const separator = String(currentVideoKey || '').indexOf(':');
    const routeType = separator >= 0 ? currentVideoKey.slice(0, separator) : '';
    const routeVideoId = separator >= 0 ? currentVideoKey.slice(separator + 1) : '';
    if (!routeVideoId || (routeType !== 'watch' && routeType !== 'shorts')) return false;

    let playerVideoId = '';
    try {
        if (typeof player.getVideoData === 'function') {
            const data = player.getVideoData();
            playerVideoId = String(data && (data.video_id || data.videoId) || '');
        }
    } catch (_) { }
    let routeIdentityMatches = !!playerVideoId && playerVideoId === routeVideoId;
    const renderer = player.closest && player.closest('ytd-reel-video-renderer');
    if (!routeIdentityMatches && routeType === 'shorts' && renderer && renderer.querySelectorAll) {
        routeIdentityMatches = Array.from(renderer.querySelectorAll('a[href*="/shorts/"]')).some(link => {
            try {
                return getShortsRouteVideoId(new URL(link.href, location.href).pathname) === routeVideoId;
            } catch (_) {
                return false;
            }
        });
    }
    if (!routeIdentityMatches) return false;
    if (routeType === 'watch') return true;

    // A hidden preloaded Shorts renderer may already expose the next video id.
    // Route identity alone must not end page-scoped discovery until that concrete
    // player is active/visible; a later visible duplicate still needs to be seen.
    if (renderer && renderer.getAttribute && renderer.getAttribute('aria-hidden') === 'true') return false;
    if (renderer && renderer.hasAttribute &&
        (renderer.hasAttribute('is-active') || renderer.hasAttribute('active'))) return true;
    if (typeof player.checkVisibility === 'function') {
        try {
            return !!player.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
        } catch (_) { }
    }
    return false;
}

function startMainCaptionObserverDiscovery() {
    // During SPA navigation the URL/player replacement can occur before
    // yt-navigate-finish. Stay page-scoped until the route key changes so a new
    // player/root cannot be missed while discovery is still attached to the old one.
    const discoveryRoot = mainCaptionNavigationPending
        ? document.documentElement
        : (findMainCaptionObserverHost() || document.documentElement);
    if (!discoveryRoot) {
        scheduleMainCaptionObserverDiscoveryCheck(50);
        return false;
    }
    if (mainCaptionObserverDiscovery && mainCaptionObserverDiscoveryTarget === discoveryRoot) return false;
    if (mainCaptionObserverDiscovery) mainCaptionObserverDiscovery.disconnect();

    mainCaptionObserverDiscovery = new MutationObserver((mutations) => {
        if (mainCaptionNavigationPending) {
            const currentVideoKey = getCurrentVideoKey();
            if (currentVideoKey !== lastVideoKey) {
                handleVideoNavigation('navigation-discovery');
            }
            if (settleMainCaptionNonPlaybackRoute(currentVideoKey)) return;
            // Keep the page watcher alive while URL, player metadata and the
            // active renderer converge. We may classify a provisional player,
            // but a later player/root insertion is still observed and wins.
            if (currentVideoKey !== mainCaptionNavigationStartKey &&
                isMainCaptionPlayerResolvedForCurrentRoute(getYouTubePlayer())) {
                mainCaptionNavigationPending = false;
                mainCaptionNavigationStartKey = '';
            }
            synchronizeMainCaptionPipeline();
            return;
        }
        const targetDisconnected = Array.from(mainCaptionObserverTargets)
            .some(target => !target || target.isConnected === false);
        const captionRootChanged = Array.from(mutations || []).some(mutationMayReplaceMainCaptionTarget);
        if (targetDisconnected || captionRootChanged) {
            // MutationObserver callbacks run before paint. Rebind and classify
            // synchronously so a replacement or sibling CC root never paints
            // native style. The heavy target can stay the same outer container
            // while YouTube inserts a new notice/cue window beside it.
            synchronizeMainCaptionPipeline();
            return;
        }
        if (!mainCaptionObserverTargets.size) {
            // A generic player child can arrive after the caption root and its
            // first cue were created. Attach and classify now; attaching only the
            // observer would miss that already-existing first cue until cue two.
            if (!synchronizeMainCaptionPipeline()) scheduleMainCaptionObserverDiscoveryCheck();
        }
    });
    mainCaptionObserverDiscoveryTarget = discoveryRoot;
    const discoveryOptions = discoveryRoot === document.documentElement
        ? MAIN_CAPTION_PAGE_DISCOVERY_OPTIONS
        : MAIN_CAPTION_DISCOVERY_OPTIONS;
    mainCaptionObserverDiscovery.observe(discoveryRoot, discoveryOptions);
    return true;
}

function ensureMainCaptionObserverTarget() {
    const nextTargets = findMainCaptionObserverTargets();
    if (!nextTargets.length) {
        if (mainCaptionObserverTargets.size) {
            observer.disconnect();
            mainCaptionObserverTargets = new Set();
        }
        startMainCaptionObserverDiscovery();
        return false;
    }
    const targetsUnchanged = nextTargets.length === mainCaptionObserverTargets.size &&
        nextTargets.every(target => mainCaptionObserverTargets.has(target) && target.isConnected !== false);
    if (targetsUnchanged) {
        startMainCaptionObserverDiscovery();
        return false;
    }

    // Target reconciliation only binds observers. It never drains pending records
    // or writes profile classes; the single transaction below owns those actions.
    bindMainCaptionObserverTargets(nextTargets);
    return true;
}

function synchronizeMainCaptionPipeline() {
    ensureMainCaptionObserverTarget();
    if (!mainCaptionObserverTargets.size) return false;

    // This is the only bind/classify entry point outside MutationObserver itself.
    // It covers already-existing cue one as well as pending records, synchronously
    // in the same task/microtask before the browser can paint native caption style.
    runImmediateCaptionMutationPass();
    return true;
}

function resetMainCaptionObserverForNavigation() {
    mainCaptionNavigationPending = true;
    mainCaptionNavigationStartKey = lastVideoKey || getCurrentVideoKey();
    // Keep the heavy observer on the retiring player's cue root until the new
    // route/player is proven. This protects same-key tracking-only starts and cancelled
    // navigations while a parallel page watcher discovers any replacement player.
    stopMainCaptionObserverDiscovery();
    startMainCaptionObserverDiscovery();
}

function settleMainCaptionNonPlaybackRoute(videoKey = getCurrentVideoKey()) {
    if (isCaptionPlaybackVideoKey(videoKey)) return false;
    mainCaptionNavigationPending = false;
    mainCaptionNavigationStartKey = '';
    observer.disconnect();
    mainCaptionObserverTargets = new Set();
    stopMainCaptionObserverDiscovery();
    // findMainCaptionObserverHost() is route-aware, so this remains a cheap
    // document child-list watcher until the user opens another playback route.
    startMainCaptionObserverDiscovery();
    return true;
}

function changeFontSize(delta) {
    const surface = panelVisible ? editSurface : (getShortsRouteVideoId() ? 'shorts' : 'video');
    const targetLang = panelVisible ? editTarget : (getDisplayedCaptionEditTarget() || editTarget);
    const storageKey = getSubtitleProfileKey(surface, targetLang);
    const s = { ...(cachedSettings[storageKey] || getSubtitleProfileDefaults(storageKey)) };
    const newSize = (parseInt(s.fontSize) || 30) + delta;
    s.fontSize = Math.max(10, Math.min(80, newSize));
    cachedSettings[storageKey] = s;
    safeStorageSet({ [storageKey]: s });
    updateCachedSubtitleStyles();
    updatePanelValues();
}

function computeStableCaptionDragPosition(drag, pointer, rootRect) {
    const candidateX = drag.startOffsetX + (pointer.clientX - drag.startX);
    const candidateY = drag.startOffsetY + (pointer.clientY - drag.startY);
    return {
        x: Math.max(rootRect.left - drag.baseTextRect.left, Math.min(rootRect.right - drag.baseTextRect.right, candidateX)),
        y: Math.max(rootRect.top - drag.baseTextRect.top, Math.min(rootRect.bottom - drag.baseTextRect.bottom, candidateY))
    };
}

function computeStableCaptionAnchorPosition(baseTextRect, offset, rootRect) {
    const centerX = ((baseTextRect.left + baseTextRect.right) / 2) + offset.x;
    const centerY = ((baseTextRect.top + baseTextRect.bottom) / 2) + offset.y;
    return {
        centerX: (centerX - rootRect.left) / rootRect.width,
        centerY: (centerY - rootRect.top) / rootRect.height
    };
}

function computeStableCaptionOffsetForAnchor(position, baseTextRect, rootRect) {
    const baseCenterX = (baseTextRect.left + baseTextRect.right) / 2;
    const baseCenterY = (baseTextRect.top + baseTextRect.bottom) / 2;
    const desiredX = rootRect.left + (position.centerX * rootRect.width) - baseCenterX;
    const desiredY = rootRect.top + (position.centerY * rootRect.height) - baseCenterY;
    return {
        x: Math.max(rootRect.left - baseTextRect.left, Math.min(rootRect.right - baseTextRect.right, desiredX)),
        y: Math.max(rootRect.top - baseTextRect.top, Math.min(rootRect.bottom - baseTextRect.bottom, desiredY))
    };
}

function initMediaDragGhostGuard() {
    if (window.__yspMediaDragGhostGuard) return;
    window.__yspMediaDragGhostGuard = true;

    const captionSelector = '.caption-window, .ytp-caption-window, .ytp-caption-window-container';
    const captionTextHitSelector = '.caption-window[draggable="true"] .captions-text, .ytp-caption-window[draggable="true"] .captions-text';
    const playerSelector = '#movie_player, .html5-video-player';
    const eligibleCaptionSelector = '.caption-window[draggable="true"].ysp-native-caption-hit-target, .ytp-caption-window[draggable="true"].ysp-native-caption-hit-target';
    const mousePointerId = 'mouse';
    const dragStartDistancePx = 5;
    let activeDrag = null;
    let suppressCaptionClickUntil = 0;

    const findCaptionAtPoint = (event) => {
        if (!event || !document.querySelectorAll) return null;
        const x = Number(event.clientX);
        const y = Number(event.clientY);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

        const textNodes = Array.from(document.querySelectorAll(captionTextHitSelector));
        for (const node of textNodes) {
            if (!node || !node.getBoundingClientRect) continue;
            const rect = getVisibleCaptionTextRect(node);
            if (!rect || rect.width <= 0 || rect.height <= 0) continue;
            if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) continue;
            const caption = node.closest && node.closest(eligibleCaptionSelector);
            if (caption) return caption;
        }
        return null;
    };

    const stopCaptionGesture = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
    };

    const getCaptionFromTarget = (target) => {
        if (!target || !target.closest) return null;
        return target.closest(eligibleCaptionSelector);
    };

    const applyDragPosition = (drag, event) => {
        const rootRect = drag.baseRootRect;
        if (!rootRect || rootRect.width <= 0 || rootRect.height <= 0) return;
        const deltaX = Number(event.clientX) - drag.startX;
        const deltaY = Number(event.clientY) - drag.startY;
        if (!drag.hasMoved && Math.hypot(deltaX, deltaY) < dragStartDistancePx) return false;
        drag.hasMoved = true;
        const { x, y } = computeStableCaptionDragPosition(drag, event, rootRect);
        stableCaptionDragPositions[drag.surface][drag.lang] = computeStableCaptionAnchorPosition(drag.baseTextRect, { x, y }, rootRect);

        drag.text.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`, 'important');
        drag.text.dataset.yspDragOffsetX = String(x);
        drag.text.dataset.yspDragOffsetY = String(y);
        drag.layoutRoot.classList.add('ysp-stable-caption-position');
        return true;
    };

    const finishDrag = (event) => {
        if (!activeDrag) return;
        if (event && event.pointerId !== undefined && event.pointerId !== activeDrag.pointerId) return;
        if (event) stopCaptionGesture(event);

        const drag = activeDrag;
        activeDrag = null;
        suppressCaptionClickUntil = performance.now() + 500;
        drag.caption.classList.remove('ysp-native-caption-dragging');
        if (drag.pointerId !== mousePointerId && drag.pointerTarget && drag.pointerTarget.releasePointerCapture) {
            try { drag.pointerTarget.releasePointerCapture(drag.pointerId); } catch (_) { }
        }
        if (drag.hasMoved) setTimeout(runImmediateCaptionMutationPass, 0);
    };

    const startCaptionDrag = (event, pointerId) => {
        if (activeDrag) {
            stopCaptionGesture(event);
            return false;
        }
        const target = event.target;
        const caption = getCaptionFromTarget(target) || findCaptionAtPoint(event);
        if (!caption || event.button !== 0) return false;
        const player = caption.closest(playerSelector);
        if (!player || !caption.getBoundingClientRect || !player.getBoundingClientRect) return false;

        const captionRect = caption.getBoundingClientRect();
        const pointerTarget = target && target.setPointerCapture ? target : caption;
        const layoutRoot = caption.closest('.ysp-caption-layout-root') || caption;
        const text = caption.querySelector('.captions-text');
        const textRect = text && text.getBoundingClientRect ? getVisibleCaptionTextRect(text) : null;
        const startOffsetX = Number(text.dataset.yspDragOffsetX) || 0;
        const startOffsetY = Number(text.dataset.yspDragOffsetY) || 0;
        const baseRootRect = layoutRoot.getBoundingClientRect();
        if (!captionRect || !baseRootRect || !textRect || baseRootRect.width <= 0 || baseRootRect.height <= 0 || textRect.width <= 0 || textRect.height <= 0) return false;
        const pointerX = Number(event.clientX);
        const pointerY = Number(event.clientY);
        const pointerInsideVisibleText = Number.isFinite(pointerX) && Number.isFinite(pointerY) &&
            pointerX >= textRect.left && pointerX <= textRect.right &&
            pointerY >= textRect.top && pointerY <= textRect.bottom;
        if (!pointerInsideVisibleText) return false;
        activeDrag = {
            pointerId,
            pointerTarget,
            caption,
            text,
            layoutRoot,
            player,
            surface: layoutRoot.classList.contains('ysp-active-shorts-playback') ? 'shorts' : 'video',
            lang: caption.closest('.is-arabic') ? 'ar' : 'en',
            startX: event.clientX,
            startY: event.clientY,
            startOffsetX,
            startOffsetY,
            baseRootRect,
            baseTextRect: {
                left: textRect.left - startOffsetX,
                right: textRect.right - startOffsetX,
                top: textRect.top - startOffsetY,
                bottom: textRect.bottom - startOffsetY
            },
            hasMoved: false
        };
        caption.classList.add('ysp-native-caption-dragging');
        if (pointerId !== mousePointerId && pointerTarget && pointerTarget.setPointerCapture) {
            try { pointerTarget.setPointerCapture(pointerId); } catch (_) { }
        }
        stopCaptionGesture(event);
        return true;
    };

    document.addEventListener('pointerdown', (event) => {
        startCaptionDrag(event, event.pointerId);
    }, true);

    // Some Brave/Windows input paths emit compatibility mouse events without
    // a usable PointerEvent sequence. Reuse the exact same drag state/math.
    document.addEventListener('mousedown', (event) => {
        startCaptionDrag(event, mousePointerId);
    }, true);

    document.addEventListener('pointermove', (event) => {
        if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
        if (applyDragPosition(activeDrag, event)) stopCaptionGesture(event);
    }, true);

    document.addEventListener('pointerup', finishDrag, true);
    document.addEventListener('pointercancel', finishDrag, true);

    document.addEventListener('mousemove', (event) => {
        if (!activeDrag) return;
        if (activeDrag.pointerId === mousePointerId && applyDragPosition(activeDrag, event)) stopCaptionGesture(event);
    }, true);

    document.addEventListener('mouseup', (event) => {
        if (activeDrag) finishDrag(event);
    }, true);

    document.addEventListener('dragstart', (event) => {
        const target = event.target;
        if (!target || !target.closest) return;
        if (activeDrag || target.closest(captionSelector) || target.closest(playerSelector) && findCaptionAtPoint(event)) {
            stopCaptionGesture(event);
        }
    }, true);

    document.addEventListener('click', (event) => {
        if (performance.now() >= suppressCaptionClickUntil) return;
        const target = event.target;
        if (target && target.closest && (target.closest(captionSelector) || target.closest(playerSelector))) {
            stopCaptionGesture(event);
        }
    }, true);
}

function initShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (!e.altKey) return;

        if (e.code === 'KeyS') {
            e.preventDefault();
            e.stopPropagation();
            togglePanel();
        }

        if (e.code === 'ArrowUp') {
            e.preventDefault();
            e.stopPropagation();
            changeFontSize(2);
        }

        if (e.code === 'ArrowDown') {
            e.preventDefault();
            e.stopPropagation();
            changeFontSize(-2);
        }
    }, true);
}

function init() {
    if (window.__yspInitDone) return;
    window.__yspInitDone = true;

    if (!window.__yspStorageListenerAdded) {
        window.__yspStorageListenerAdded = true;
        safeAddStorageChangeListener((changes, areaName) => {
            if (areaName !== 'local') return;

            const applyLangSettings = (langKey, newValue) => {
                if (!newValue) return;
                const base = langKey === 'ar' ? defaultAr : defaultEn;
                cachedSettings[langKey] = { ...base, ...newValue };
                ['letterSpacing', 'strokeOpacity', 'bgBlur', 'phraseMode', 'autoCaptionMode', 'enhancedBlocking', 'allowNativeCaptionDrag'].forEach(k => {
                    if (cachedSettings[langKey][k] === undefined) cachedSettings[langKey][k] = base[k];
                });

                const s = cachedSettings[langKey];
                const removedAlignment = removeDeprecatedTextAlignment(s);
                const migratedCaptionStyle = sanitizeLegacyCartoonContrastSettings(s);
                const migratedAutoMode = disableExperimentalAutoCaptionModes(s);
                if (removedAlignment || migratedCaptionStyle || migratedAutoMode) safeStorageSet({ [langKey]: s });
                if (s.customFont && s.customFont.data) {
                    const fontFace = new FontFace(s.customFont.name, `url(${s.customFont.data})`);
                    fontFace.load().then(function (loadedFace) {
                        document.fonts.add(loadedFace);
                    }).catch(() => { });
                }
            };
            const applyShortsStyleSettings = (profileKey, langKey, newValue) => {
                const inheritedStyle = pickSurfaceStyle(cachedSettings[langKey]);
                cachedSettings[profileKey] = {
                    ...inheritedStyle,
                    ...pickSurfaceStyle(newValue || inheritedStyle)
                };
                sanitizeLegacyCartoonContrastSettings(cachedSettings[profileKey]);
                const s = cachedSettings[profileKey];
                if (s.customFont && s.customFont.data) {
                    const fontFace = new FontFace(s.customFont.name, `url(${s.customFont.data})`);
                    fontFace.load().then(function (loadedFace) {
                        document.fonts.add(loadedFace);
                    }).catch(() => { });
                }
            };

            if (changes.ar) applyLangSettings('ar', changes.ar.newValue);
            if (changes.en) applyLangSettings('en', changes.en.newValue);
            if (changes.shortsAr) applyShortsStyleSettings('shortsAr', 'ar', changes.shortsAr.newValue);
            if (changes.shortsEn) applyShortsStyleSettings('shortsEn', 'en', changes.shortsEn.newValue);
            if (changes.uiLanguage && changes.uiLanguage.newValue) uiLang = changes.uiLanguage.newValue;
            if (changes.customTemplates && Array.isArray(changes.customTemplates.newValue)) {
                customTemplates = changes.customTemplates.newValue;
                if (removeDeprecatedTextAlignmentFromTemplates(customTemplates)) {
                    safeStorageSet({ customTemplates });
                }
            }
            if (changes.fullscreenAssistant && changes.fullscreenAssistant.newValue !== undefined) showFullscreenAssistant = changes.fullscreenAssistant.newValue;
            if (changes[CUSTOM_SRT_ENABLED_KEY] && changes[CUSTOM_SRT_ENABLED_KEY].newValue !== undefined) customSrtEnabled = !!changes[CUSTOM_SRT_ENABLED_KEY].newValue;
            if (changes[CUSTOM_SRT_DATA_KEY]) customSrtData = changes[CUSTOM_SRT_DATA_KEY].newValue || null;

            updateCachedSubtitleStyles();
            updateAssistantVisibility();
            runImmediateCaptionMutationPass();

            const panel = document.getElementById('ysp-panel-container');
            if (panel) {
                updatePanelValues();
                updatePanelTexts();
                updatePreview();
            }
        });
    }

    safeStorageRemove(['preferred' + 'Subtitle' + 'Language']);

    safeStorageGet([...SUBTITLE_PROFILE_STORAGE_KEYS, 'uiLanguage', 'fullscreenAssistant', 'customTemplates', SUPPORT_FIRST_SEEN_KEY, CUSTOM_SRT_ENABLED_KEY, CUSTOM_SRT_DATA_KEY, YOUTUBE_FONT_DEFAULT_MIGRATION_KEY], (res) => {
        if (!res[SUPPORT_FIRST_SEEN_KEY]) {
            safeStorageSet({ [SUPPORT_FIRST_SEEN_KEY]: Date.now() });
        }

        applyEarlyStoredCaptionSettings(res || {});

        if (!res[YOUTUBE_FONT_DEFAULT_MIGRATION_KEY]) {
            const fontDefaultWrite = { [YOUTUBE_FONT_DEFAULT_MIGRATION_KEY]: true };
            const legacyEnDefaultFont = "'Roboto', sans-serif";
            if (!cachedSettings.ar.customFont && cachedSettings.ar.fontFamily === LEGACY_AR_DEFAULT_FONT) {
                cachedSettings.ar.fontFamily = YOUTUBE_FONT_OPTIONS.proportionalSans;
                fontDefaultWrite.ar = cachedSettings.ar;
            }
            if (!cachedSettings.en.customFont && cachedSettings.en.fontFamily === legacyEnDefaultFont) {
                cachedSettings.en.fontFamily = YOUTUBE_FONT_OPTIONS.proportionalSans;
                fontDefaultWrite.en = cachedSettings.en;
            }
            safeStorageSet(fontDefaultWrite);
        }

        if (res.uiLanguage) uiLang = res.uiLanguage;
        if (Array.isArray(res.customTemplates)) {
            customTemplates = res.customTemplates;
            if (removeDeprecatedTextAlignmentFromTemplates(customTemplates)) {
                safeStorageSet({ customTemplates });
            }
        }
        if (res.fullscreenAssistant !== undefined) showFullscreenAssistant = res.fullscreenAssistant;
        customSrtEnabled = !!res[CUSTOM_SRT_ENABLED_KEY];
        customSrtData = res[CUSTOM_SRT_DATA_KEY] || null;

        const restoredFontAssets = new Set();
        SUBTITLE_PROFILE_KEYS.forEach(langKey => {
            const s = cachedSettings[langKey];
            if (s.customFont && s.customFont.data) {
                const fontAssetKey = `${s.customFont.name}::${s.customFont.data}`;
                if (restoredFontAssets.has(fontAssetKey)) return;
                restoredFontAssets.add(fontAssetKey);
                const fontFace = new FontFace(s.customFont.name, `url(${s.customFont.data})`);
                fontFace.load().then(function (loadedFace) {
                    document.fonts.add(loadedFace);
                }).catch(e => console.error("Error restoring font:", e));
            }
        });

        updateCachedSubtitleStyles();
        updateAssistantVisibility();
        runImmediateCaptionMutationPass();
        lastVideoKey = getCurrentVideoKey();
        maybeShowWhatsNewOnUpdate();

        if (document.getElementById('ysp-panel-container')) {
            updatePanelValues();
            updatePanelTexts();
        }
    });

    initMediaDragGhostGuard();
    initShortcuts();
    initCaptionTrackSelectionRecovery();

    if (!window.__yspResponsiveStylesHook) {
        window.__yspResponsiveStylesHook = true;
        const refresh = () => {
            updateCachedSubtitleStyles();
            runImmediateCaptionMutationPass();
        };
        window.addEventListener('resize', refresh, { passive: true });
        document.addEventListener('fullscreenchange', refresh, true);
    }

    if (!window.__yspWhatsNewNavHook) {
        window.__yspWhatsNewNavHook = true;
        document.addEventListener('yt-navigate-finish', () => {
            maybeShowWhatsNewOnUpdate();
        }, true);
        document.addEventListener('yt-page-data-updated', () => {
            maybeShowWhatsNewOnUpdate();
        }, true);
    }

    if (!window.__yspVideoNavigationHook) {
        window.__yspVideoNavigationHook = true;
        ['yt-navigate-start', 'yt-navigate-finish', 'yt-page-data-updated', 'yt-player-updated'].forEach(eventName => {
            document.addEventListener(eventName, () => {
                if (eventName === 'yt-navigate-start') {
                    resetMainCaptionObserverForNavigation();
                    handleVideoNavigation(eventName);
                    return;
                }

                // Clear a genuinely changed video's state first, then bind and
                // classify the current player/root immediately. Same-video player
                // replacement must also classify, so this is intentionally not
                // gated on handleVideoNavigation's key-change result.
                handleVideoNavigation(eventName);
                const currentVideoKey = getCurrentVideoKey();
                if (settleMainCaptionNonPlaybackRoute(currentVideoKey)) return;
                const finishedSameKeyNavigation = eventName === 'yt-navigate-finish' &&
                    currentVideoKey === mainCaptionNavigationStartKey;
                if (mainCaptionNavigationPending && (finishedSameKeyNavigation ||
                    (currentVideoKey !== mainCaptionNavigationStartKey &&
                        isMainCaptionPlayerResolvedForCurrentRoute(getYouTubePlayer())))) {
                    mainCaptionNavigationPending = false;
                    mainCaptionNavigationStartKey = '';
                }
                synchronizeMainCaptionPipeline();
            }, true);
        });
        window.addEventListener('popstate', () => {
            const currentVideoKey = getCurrentVideoKey();
            if (!lastVideoKey || currentVideoKey === lastVideoKey) {
                handleVideoNavigation('popstate');
                synchronizeMainCaptionPipeline();
                return;
            }
            resetMainCaptionObserverForNavigation();
            handleVideoNavigation('popstate');
            if (settleMainCaptionNonPlaybackRoute(currentVideoKey)) return;
            if (currentVideoKey !== mainCaptionNavigationStartKey &&
                isMainCaptionPlayerResolvedForCurrentRoute(getYouTubePlayer())) {
                mainCaptionNavigationPending = false;
                mainCaptionNavigationStartKey = '';
            }
            synchronizeMainCaptionPipeline();
        }, true);
    }

    synchronizeMainCaptionPipeline();

    let shortsObserver = null;
    let shortsObserverTarget = null;
    let observedShortsPlayer = null;
    const detachShortsObserver = () => {
        if (shortsObserver) shortsObserver.disconnect();
        shortsObserver = null;
        shortsObserverTarget = null;
        observedShortsPlayer = null;
    };
    const attachShortsObserver = () => {
        if (!getShortsRouteVideoId()) {
            detachShortsObserver();
            return;
        }
        const activeShortsPlayer = getYouTubePlayer();
        const activeRenderer = activeShortsPlayer && activeShortsPlayer.closest
            ? activeShortsPlayer.closest('ytd-reel-video-renderer')
            : null;
        const shortsTarget = document.querySelector('ytd-shorts') ||
            (activeRenderer && (activeRenderer.parentElement || activeRenderer));
        if (shortsTarget === shortsObserverTarget && shortsObserver) {
            observedShortsPlayer = activeShortsPlayer;
            return;
        }
        detachShortsObserver();
        if (!shortsTarget) return;
        // This observer only discovers an active Shorts-player change. Caption
        // text/style is owned exclusively by the main synchronous transaction.
        shortsObserver = new MutationObserver(() => {
            const nextShortsPlayer = getYouTubePlayer();
            if (!nextShortsPlayer || nextShortsPlayer === observedShortsPlayer) return;
            observedShortsPlayer = nextShortsPlayer;
            synchronizeMainCaptionPipeline();
        });
        shortsObserverTarget = shortsTarget;
        observedShortsPlayer = activeShortsPlayer;
        shortsObserver.observe(shortsTarget, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['is-active', 'active', 'aria-hidden']
        });
    };
    attachShortsObserver();
    document.addEventListener('yt-navigate-start', detachShortsObserver, true);
    ['yt-navigate-finish', 'yt-page-data-updated', 'yt-player-updated'].forEach(eventName => {
        document.addEventListener(eventName, () => {
            attachShortsObserver();
        }, true);
    });
    window.addEventListener('popstate', attachShortsObserver, true);

    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('play', () => {
            if (panelVisible) closePanel();
            runImmediateCaptionMutationPass();
        });
        video.addEventListener('ratechange', () => {
            runImmediateCaptionMutationPass();
        });
        video.addEventListener('seeked', () => {
            runImmediateCaptionMutationPass();
        });
    }

}

let fsButton = null;
let playerBarButton = null;
let playerBarTooltip = null;
let playerBarTooltipFrame = null;

function getAssistantOpenTitle() {
    const t = translations[uiLang] || translations.en;
    return t.assistantOpenTitle || 'Open YouTube Subtitle Pro settings';
}

function updateAssistantTooltip() {
    const title = getAssistantOpenTitle();
    if (fsButton) {
        fsButton.title = title;
        fsButton.setAttribute('aria-label', title);
    }
    if (playerBarButton) {
        playerBarButton.title = '';
        playerBarButton.setAttribute('title', '');
        playerBarButton.setAttribute('aria-label', title);
        playerBarButton.setAttribute('data-tooltip-title', title);
        playerBarButton.setAttribute('data-title-no-tooltip', title);
        playerBarButton.setAttribute('data-tooltip-target-id', 'ysp-player-bar-button');
    }
}

function ensurePlayerBarTooltip() {
    if (playerBarTooltip && playerBarTooltip.isConnected) return playerBarTooltip;
    playerBarTooltip = document.createElement('div');
    playerBarTooltip.className = 'ysp-player-tooltip';
    playerBarTooltip.setAttribute('role', 'tooltip');
    playerBarTooltip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(playerBarTooltip);
    return playerBarTooltip;
}

function positionPlayerBarTooltip() {
    if (!playerBarButton || !playerBarTooltip || !playerBarButton.isConnected) return;
    const rect = playerBarButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const top = rect.top - 10;
    const width = playerBarTooltip.offsetWidth || 0;
    const margin = 8;
    const safeLeft = width > 0
        ? Math.max(width / 2 + margin, Math.min(window.innerWidth - width / 2 - margin, centerX))
        : centerX;
    playerBarTooltip.style.left = `${Math.round(safeLeft)}px`;
    playerBarTooltip.style.top = `${Math.max(8, Math.round(top))}px`;
}

function showPlayerBarTooltip() {
    if (!playerBarButton) return;
    const tooltip = ensurePlayerBarTooltip();
    tooltip.textContent = getAssistantOpenTitle();
    tooltip.dir = uiLang === 'ar' ? 'rtl' : 'ltr';
    tooltip.setAttribute('aria-hidden', 'false');
    positionPlayerBarTooltip();
    if (playerBarTooltipFrame) cancelAnimationFrame(playerBarTooltipFrame);
    playerBarTooltipFrame = requestAnimationFrame(() => {
        positionPlayerBarTooltip();
        tooltip.classList.add('ysp-show');
    });
}

function hidePlayerBarTooltip() {
    if (playerBarTooltipFrame) {
        cancelAnimationFrame(playerBarTooltipFrame);
        playerBarTooltipFrame = null;
    }
    if (!playerBarTooltip) return;
    playerBarTooltip.classList.remove('ysp-show');
    playerBarTooltip.setAttribute('aria-hidden', 'true');
}

function placePlayerBarButton(controls, button) {
    if (!controls || !button) return;

    const fullscreenButton = controls.querySelector('.ytp-fullscreen-button');
    const fullscreenParent = fullscreenButton?.parentElement;
    const settingsButton = controls.querySelector('.ytp-settings-button');
    const settingsParent = settingsButton?.parentElement;

    if (fullscreenButton && fullscreenParent) {
        if (button.parentNode === fullscreenParent && button.nextElementSibling === fullscreenButton) return;
        try {
            fullscreenParent.insertBefore(button, fullscreenButton);
        } catch (error) {
            controls.appendChild(button);
        }
        return;
    }

    if (settingsButton && settingsParent) {
        try {
            settingsParent.insertBefore(button, settingsButton);
        } catch (error) {
            controls.appendChild(button);
        }
    } else {
        controls.appendChild(button);
    }
}

function createPlayerBarButton() {
    // The player control is available before the drawer. Load its shared CSS now so
    // the custom tooltip is positioned and visible on the very first hover.
    ensurePanelStyles();
    const controls = document.querySelector('.ytp-right-controls') || document.querySelector('.ytp-left-controls');
    if (!controls) return;

    if (playerBarButton && playerBarButton.isConnected) {
        updateAssistantTooltip();
        placePlayerBarButton(controls, playerBarButton);
        return;
    }

    const existingButton = controls.querySelector('.ysp-ytp-button');
    if (existingButton) {
        playerBarButton = existingButton;
        playerBarButton.dataset.priority = '11';
        const existingImg = playerBarButton.querySelector('img');
        if (existingImg) {
            existingImg.width = 24;
            existingImg.height = 24;
            existingImg.style.width = '24px';
            existingImg.style.height = '24px';
            existingImg.style.maxWidth = '24px';
            existingImg.style.maxHeight = '24px';
        }
        if (playerBarButton.dataset.yspTooltipBound !== 'true') {
            playerBarButton.addEventListener('mouseenter', showPlayerBarTooltip);
            playerBarButton.addEventListener('mousemove', positionPlayerBarTooltip);
            playerBarButton.addEventListener('mouseleave', hidePlayerBarTooltip);
            playerBarButton.addEventListener('focus', showPlayerBarTooltip);
            playerBarButton.addEventListener('blur', hidePlayerBarTooltip);
            playerBarButton.dataset.yspTooltipBound = 'true';
        }
        updateAssistantTooltip();
        placePlayerBarButton(controls, playerBarButton);
        return;
    }

    playerBarButton = document.createElement('button');
    playerBarButton.type = 'button';
    playerBarButton.className = 'ytp-button ysp-ytp-button';
    playerBarButton.dataset.yspPlayerButton = 'true';
    playerBarButton.dataset.priority = '11';

    const img = document.createElement('img');
    img.src = safeGetExtensionURL('icons/icon48.png');
    img.alt = '';
    img.width = 24;
    img.height = 24;
    img.style.width = '24px';
    img.style.height = '24px';
    img.style.maxWidth = '24px';
    img.style.maxHeight = '24px';
    img.decoding = 'async';
    img.loading = 'eager';
    playerBarButton.appendChild(img);

    playerBarButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        hidePlayerBarTooltip();
        togglePanel();
    });
    playerBarButton.addEventListener('mouseenter', showPlayerBarTooltip);
    playerBarButton.addEventListener('mousemove', positionPlayerBarTooltip);
    playerBarButton.addEventListener('mouseleave', hidePlayerBarTooltip);
    playerBarButton.addEventListener('focus', showPlayerBarTooltip);
    playerBarButton.addEventListener('blur', hidePlayerBarTooltip);
    playerBarButton.dataset.yspTooltipBound = 'true';

    updateAssistantTooltip();
    placePlayerBarButton(controls, playerBarButton);
}

function createAssistantUI() {
    if (fsButton) return;
    const player = document.getElementById('movie_player');
    if (!player) return;

    fsButton = document.createElement('div');
    fsButton.className = 'ysp-fs-assist ysp-hidden';
    const img = document.createElement('img');
    img.src = safeGetExtensionURL('icons/icon48.png');
    img.width = 28;
    img.height = 28;
    img.alt = 'YouTube Subtitle Pro';
    img.decoding = 'async';
    img.loading = 'eager';
    img.addEventListener('error', () => {
        if (!fsButton) return;
        fsButton.textContent = 'SP';
        fsButton.style.color = '#fff';
        fsButton.style.fontWeight = '900';
        fsButton.style.fontSize = '14px';
        fsButton.style.letterSpacing = '0.5px';
    }, { once: true });
    fsButton.appendChild(img);
    updateAssistantTooltip();
    fsButton.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePanel();
    });
    player.appendChild(fsButton);
}

function updateAssistantVisibility() {
    const isFs = !!document.fullscreenElement;
    createPlayerBarButton();
    if (!showFullscreenAssistant || !isFs) {
        if (fsButton) {
            fsButton.remove();
            fsButton = null;
        }
        return;
    }

    createAssistantUI();
    if (fsButton) fsButton.classList.remove('ysp-hidden');
}

document.addEventListener('fullscreenchange', updateAssistantVisibility);

installFirstPaintCaptionBootstrap();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
