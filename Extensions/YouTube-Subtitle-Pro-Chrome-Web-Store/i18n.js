/**
 * ============================================================================
 *  YouTube Subtitle Pro v3.1.1
 *  Copyright (c) VoidKSA. All rights reserved.
 *  Website: https://extractly.vip/
 * ============================================================================
 */
const translations = {
    ar: {
        // Tabs
        tabMain: "رئيسي",
        tabStyle: "المظهر",
        tabAdvanced: "متقدم",

        // Sections
        typography: "الخط والنصوص",
        appearance: "الألوان والشفافية",
        effects: "التأثيرات",
        position: "الموقع",
        advanced: "تفاصيل دقيقة",
        presets: "القوالب السريعة",
        customTemplates: "قوالبي المحفوظة",
        fullscreenOptions: "خيارات إضافية",
        editingSurface: "قالب العرض",
        surfaceVideo: "الفيديوهات العادية",
        surfaceShorts: "الشورتس",

        // Controls
        fontSize: "الحجم",
        fontColor: "لون النص",
        bgColor: "لون خلفية النص",
        fontFamily: "نوع الخط",
        shadowIntensity: "قوة الظل",
        fontWeight: "السماكة",
        bottomPos: "الارتفاع",
        bgOpacity: "شفافية الخلفية",
        textOpacity: "شفافية النص",
        strokeColor: "لون الحدود",
        strokeWidth: "سماكة الحدود",
        lineHeight: "تباعد الأسطر",
        letterSpacing: "تباعد الحروف",
        padding: "حواف داخلية",
        borderRadius: "انحناء الخلفية",

        // Toggles
        fullscreenAssistant: "إظهار علامة التخصيص في ملء الشاشة",
        dyslexiaMode: "وضع عسر القراءة",
        dyslexiaHint: "خط أوضح + تباعد محسّن",

        // Presets
        presetCinema: "سينمائي",
        presetMinimal: "بسيط",
        presetContrast: "وضوح عالي",
        presetAnime: "أنمي",
        presetDocumentary: "وثائقي",
        presetNews: "إخباري",
        presetGaming: "قيمنق",
        presetAsmr: "ASMR",
        presetVlog: "فلوق",

        // Buttons
        export: "تصدير",
        import: "استيراد",
        reset: "استعادة الافتراضي",
        saveTemplate: "حفظ",
        deleteTemplate: "حذف",
        loadTemplate: "تطبيق",
        noTemplates: "لا توجد قوالب محفوظة",

        // Footer
        supportBadge: "دعم اختياري",
        supportTitle: "تستخدم الإضافة باستمرار؟ ساعدنا نخليها مجانية",
        supportBody: "نختبرها ونصلحها مع كل تغيير من YouTube. حتى دعم بسيط يصنع فرقًا حقيقيًا.",
        supportDeveloper: "ساهم في استمرارها",
        extractlyProduct: "تابعة لـ Extractly.vip",
        extractlyVisit: "اكتشف Extractly",
        contactSupport: "واجهت مشكلة؟",
        contactEmail: "راسلنا على support@extractly.vip",
        livePreview: "معاينة مباشرة",

        // Font weights
        normal: "عادي",
        bold: "عريض",
        black: "عريض جداً",

        // Other
        cinema: "Cinema Typewriter",
        templateName: "اسم القالب"
    },
    en: {
        tabMain: "Main",
        tabStyle: "Style",
        tabAdvanced: "Pro",

        typography: "Typography",
        appearance: "Color & Opacity",
        effects: "Effects",
        position: "Position",
        advanced: "Fine-tune",
        presets: "Quick Presets",
        customTemplates: "My Saved Templates",
        fullscreenOptions: "Extra Options",
        editingSurface: "Playback template",
        surfaceVideo: "Regular videos",
        surfaceShorts: "Shorts",

        fontSize: "Size",
        fontColor: "Text Color",
        bgColor: "Background Color",
        fontFamily: "Font Family",
        shadowIntensity: "Shadow",
        fontWeight: "Weight",
        bottomPos: "Vertical",
        bgOpacity: "Background Opacity",
        textOpacity: "Text Opacity",
        strokeColor: "Stroke Color",
        strokeWidth: "Stroke Width",
        lineHeight: "Line Height",
        letterSpacing: "Letter Spacing",
        padding: "Padding",
        borderRadius: "Border Radius",

        fullscreenAssistant: "Show customization icon in fullscreen",
        dyslexiaMode: "Dyslexia mode",
        dyslexiaHint: "Readable font + enhanced spacing",

        presetCinema: "Cinema",
        presetMinimal: "Minimal",
        presetContrast: "High Readability",
        presetAnime: "Anime",
        presetDocumentary: "Documentary",
        presetNews: "News",
        presetGaming: "Gaming",
        presetAsmr: "ASMR",
        presetVlog: "Vlog",

        export: "Export",
        import: "Import",
        reset: "Reset",
        saveTemplate: "Save",
        deleteTemplate: "Delete",
        loadTemplate: "Apply",
        noTemplates: "No saved templates",

        supportBadge: "OPTIONAL SUPPORT",
        supportTitle: "Using Subtitle Pro often? Help keep it free",
        supportBody: "We test and repair it through every YouTube change. Even a small contribution makes a real difference.",
        supportDeveloper: "Keep it going",
        extractlyProduct: "An Extractly.vip product",
        extractlyVisit: "Discover Extractly",
        contactSupport: "Found a problem?",
        contactEmail: "Email support@extractly.vip",
        livePreview: "Live Preview",

        normal: "Normal",
        bold: "Bold",
        black: "Black",

        cinema: "Cinema Typewriter",
        templateName: "Template Name"
    }
};

function t(key, lang) {
    return (translations[lang] && translations[lang][key]) || key;
}
