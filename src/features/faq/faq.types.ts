export type FaqItem = {
    id: string;
    category: string;
};

export const FAQ_STRUCTURE: FaqItem[] = [
    { id: "general-what-is-platform", category: "general" },
    { id: "general-who-is-it-for", category: "general" },
    { id: "general-account-required", category: "general" },

    { id: "gallery-import-image", category: "gallery" },
    { id: "gallery-supported-formats", category: "gallery" },
    { id: "gallery-image-size-limit", category: "gallery" },
    { id: "gallery-image-not-visible", category: "gallery" },
    { id: "gallery-edit-delete-image", category: "gallery" },

    { id: "collections-what-is-collection", category: "collections" },
    { id: "collections-create", category: "collections" },
    { id: "collections-multiple", category: "collections" },

    { id: "profile-edit-info", category: "profile" },
    { id: "profile-change-password", category: "profile" },
    { id: "profile-forgot-password", category: "profile" },

    { id: "settings-purpose", category: "settings" },
    { id: "settings-language", category: "settings" },
    { id: "settings-dark-mode", category: "settings" },
    { id: "settings-save-preferences", category: "settings" },

    { id: "security-privacy-images", category: "security" },
    { id: "security-delete-account", category: "security" },
    { id: "security-logout-all-devices", category: "security" },

    { id: "issues-slow-page", category: "issues" },
    { id: "issues-feature-not-working", category: "issues" },

    { id: "support-contact", category: "support" },
    { id: "support-report-bug", category: "support" },

    { id: "future-features", category: "future" }
];