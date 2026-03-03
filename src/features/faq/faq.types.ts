export type FaqItem = {
    id: string;
    category: string;
    question: string;
    answer: string;
};

export const FAQ_DATA_FR: FaqItem[] = [
    /* =======================
       1. GÉNÉRAL
    ======================== */
    {
        id: "general-what-is-platform",
        category: "Général",
        question: "Qu’est-ce que cette plateforme ?",
        answer: `Cette plateforme est une médiathèque d’images qui vous permet de centraliser, organiser, consulter et télécharger vos images en toute simplicité.
Elle est conçue pour faciliter la gestion de grandes collections d’images personnelles ou professionnelles.`,
    },
    {
        id: "general-who-is-it-for",
        category: "Général",
        question: "À qui s’adresse cette application ?",
        answer: `Elle s’adresse à :
• Photographes
• Designers
• Créateurs de contenu
• Entreprises
• Toute personne souhaitant organiser ses images efficacement`,
    },
    {
        id: "general-account-required",
        category: "Général",
        question: "Dois-je créer un compte pour utiliser la plateforme ?",
        answer: `Oui.
Un compte est nécessaire afin de :
• Protéger vos images
• Sauvegarder vos préférences
• Accéder à vos collections personnelles`,
    },

    /* =======================
       2. GALERIE & IMAGES
    ======================== */
    {
        id: "gallery-import-image",
        category: "Galerie & Images",
        question: "Comment importer une image ?",
        answer: `Pour importer une image :
1. Accédez à la page Galerie
2. Cliquez sur le bouton Importer
3. Sélectionnez une ou plusieurs images depuis votre appareil
4. Validez l’importation

Les images apparaîtront automatiquement dans votre galerie.`,
    },
    {
        id: "gallery-supported-formats",
        category: "Galerie & Images",
        question: "Quels formats d’images sont supportés ?",
        answer: `Les formats actuellement supportés sont :
• JPG / JPEG
• PNG
• WEBP

D’autres formats pourront être ajoutés ultérieurement.`,
    },
    {
        id: "gallery-image-size-limit",
        category: "Galerie & Images",
        question: "Y a-t-il une limite de taille pour les images ?",
        answer: `Oui, chaque image ne doit pas dépasser la taille maximale autorisée par la plateforme (ex : 10 Mo).
Si une image dépasse cette limite, elle sera refusée lors de l’importation.`,
    },
    {
        id: "gallery-image-not-visible",
        category: "Galerie & Images",
        question: "Pourquoi mon image n’apparaît-elle pas après l’import ?",
        answer: `Plusieurs raisons possibles :
• Le format n’est pas supporté
• La taille de l’image est trop élevée
• Un problème de connexion est survenu
• L’importation n’a pas été confirmée

Essayez de recharger la page ou de réimporter l’image.`,
    },
    {
        id: "gallery-edit-delete-image",
        category: "Galerie & Images",
        question: "Puis-je modifier ou supprimer une image ?",
        answer: `Oui.
Vous pouvez :
• Modifier les informations de l’image
• Changer son appartenance à une collection
• Supprimer définitivement l’image

⚠️ La suppression est irréversible.`,
    },

    /* =======================
       3. COLLECTIONS
    ======================== */
    {
        id: "collections-what-is-collection",
        category: "Collections",
        question: "Qu’est-ce qu’une collection ?",
        answer:
            "Une collection est un dossier personnalisé qui vous permet de regrouper vos images par thème, projet ou catégorie.",
    },
    {
        id: "collections-create",
        category: "Collections",
        question: "Comment créer une collection ?",
        answer: `1. Accédez à la section Collections
2. Cliquez sur Créer une collection
3. Donnez un nom à la collection
4. Ajoutez des images si vous le souhaitez`,
    },
    {
        id: "collections-multiple",
        category: "Collections",
        question: "Une image peut-elle appartenir à plusieurs collections ?",
        answer:
            "Oui. Une même image peut être ajoutée à plusieurs collections sans duplication du fichier.",
    },

    /* =======================
       4. COMPTE & PROFIL
    ======================== */
    {
        id: "profile-edit-info",
        category: "Compte & Profil",
        question: "Où puis-je modifier mes informations personnelles ?",
        answer: `Rendez-vous dans la section Profil pour :
• Modifier votre nom
• Mettre à jour vos informations
• Changer votre mot de passe`,
    },
    {
        id: "profile-change-password",
        category: "Compte & Profil",
        question: "Comment changer mon mot de passe ?",
        answer:
            "Dans la page Profil, choisissez l’option Changer le mot de passe et suivez les instructions.",
    },
    {
        id: "profile-forgot-password",
        category: "Compte & Profil",
        question: "J’ai oublié mon mot de passe, que faire ?",
        answer:
            "Utilisez la fonction Mot de passe oublié depuis la page de connexion. Un lien de réinitialisation vous sera envoyé par email.",
    },

    /* =======================
       5. PARAMÈTRES
    ======================== */
    {
        id: "settings-purpose",
        category: "Paramètres",
        question: "À quoi servent les paramètres ?",
        answer: `Les paramètres vous permettent de personnaliser votre expérience utilisateur :
• Apparence
• Langue
• Comportement de la galerie
• Préférences de téléchargement`,
    },
    {
        id: "settings-language",
        category: "Paramètres",
        question: "Puis-je changer la langue de l’interface ?",
        answer:
            "Oui. Vous pouvez choisir la langue de l’application depuis la page Paramètres.",
    },
    {
        id: "settings-dark-mode",
        category: "Paramètres",
        question: "Puis-je activer le mode sombre ?",
        answer:
            "Oui. Le mode clair, sombre ou automatique (selon votre système) est disponible dans les paramètres d’apparence.",
    },
    {
        id: "settings-save-preferences",
        category: "Paramètres",
        question: "Mes paramètres sont-ils sauvegardés ?",
        answer:
            "Oui. Vos préférences sont sauvegardées automatiquement et restaurées lors de vos prochaines connexions.",
    },

    /* =======================
       6. SÉCURITÉ
    ======================== */
    {
        id: "security-privacy-images",
        category: "Sécurité & Confidentialité",
        question: "Mes images sont-elles privées ?",
        answer:
            "Oui. Vos images sont strictement privées et accessibles uniquement par vous, sauf si vous choisissez de les partager.",
    },
    {
        id: "security-delete-account",
        category: "Sécurité & Confidentialité",
        question: "Puis-je supprimer mon compte ?",
        answer: `Oui.
Dans la section Paramètres > Sécurité, vous pouvez demander la suppression définitive de votre compte.

⚠️ Cette action supprimera :
• Votre compte
• Vos images
• Vos collections

Elle est irréversible.`,
    },
    {
        id: "security-logout-all-devices",
        category: "Sécurité & Confidentialité",
        question: "Puis-je me déconnecter de tous les appareils ?",
        answer: "Oui. Une option est disponible dans les paramètres de sécurité.",
    },

    /* =======================
       7. PROBLÈMES
    ======================== */
    {
        id: "issues-slow-page",
        category: "Problèmes fréquents",
        question: "La page charge lentement, que faire ?",
        answer: `• Vérifiez votre connexion internet
• Rechargez la page
• Essayez depuis un autre navigateur`,
    },
    {
        id: "issues-feature-not-working",
        category: "Problèmes fréquents",
        question: "Une fonctionnalité ne fonctionne pas correctement",
        answer: `Si un problème persiste :
• Actualisez la page
• Déconnectez-vous puis reconnectez-vous
• Contactez le support`,
    },

    /* =======================
       8. SUPPORT
    ======================== */
    {
        id: "support-contact",
        category: "Support & Contact",
        question: "Comment contacter le support ?",
        answer: `• Email : support@votre-site.com
• Formulaire de contact (si disponible)`,
    },
    {
        id: "support-report-bug",
        category: "Support & Contact",
        question: "Comment signaler un bug ?",
        answer: `Merci de décrire :
• Le problème rencontré
• Les étapes pour le reproduire
• Votre navigateur et appareil

Cela nous aide à corriger le problème plus rapidement.`,
    },

    /* =======================
       9. FUTUR
    ======================== */
    {
        id: "future-features",
        category: "Améliorations futures",
        question: "La plateforme va-t-elle évoluer ?",
        answer: `Oui. De nouvelles fonctionnalités sont prévues :
• Partage d’images
• Collaboration
• Recherche avancée
• Amélioration des performances`,
    },
];

export const FAQ_DATA_EN: FaqItem[] = [
    /* =======================
       1. GENERAL
    ======================== */
    {
        id: "general-what-is-platform",
        category: "General",
        question: "What is this platform?",
        answer: `This platform is an image media library that allows you to centralize, organize, browse, and download your images easily.
It is designed to simplify the management of large collections of personal or professional images.`,
    },
    {
        id: "general-who-is-it-for",
        category: "General",
        question: "Who is this application for?",
        answer: `It is intended for:
• Photographers
• Designers
• Content creators
• Companies
• Anyone who wants to efficiently organize their images`,
    },
    {
        id: "general-account-required",
        category: "General",
        question: "Do I need to create an account to use the platform?",
        answer: `Yes.
An account is required in order to:
• Protect your images
• Save your preferences
• Access your personal collections`,
    },

    /* =======================
       2. GALLERY & IMAGES
    ======================== */
    {
        id: "gallery-import-image",
        category: "Gallery & Images",
        question: "How do I import an image?",
        answer: `To import an image:
1. Go to the Gallery page
2. Click the Import button
3. Select one or more images from your device
4. Confirm the import

The images will automatically appear in your gallery.`,
    },
    {
        id: "gallery-supported-formats",
        category: "Gallery & Images",
        question: "Which image formats are supported?",
        answer: `The currently supported formats are:
• JPG / JPEG
• PNG
• WEBP

Additional formats may be added in the future.`,
    },
    {
        id: "gallery-image-size-limit",
        category: "Gallery & Images",
        question: "Is there a size limit for images?",
        answer: `Yes, each image must not exceed the maximum size allowed by the platform (e.g., 10 MB).
If an image exceeds this limit, it will be rejected during import.`,
    },
    {
        id: "gallery-image-not-visible",
        category: "Gallery & Images",
        question: "Why doesn’t my image appear after importing?",
        answer: `Several possible reasons:
• The format is not supported
• The image size is too large
• A connection issue occurred
• The import was not confirmed

Try refreshing the page or importing the image again.`,
    },
    {
        id: "gallery-edit-delete-image",
        category: "Gallery & Images",
        question: "Can I edit or delete an image?",
        answer: `Yes.
You can:
• Edit the image information
• Change its collection
• Permanently delete the image

⚠️ Deletion is irreversible.`,
    },

    /* =======================
       3. COLLECTIONS
    ======================== */
    {
        id: "collections-what-is-collection",
        category: "Collections",
        question: "What is a collection?",
        answer:
            "A collection is a custom folder that allows you to group your images by theme, project, or category.",
    },
    {
        id: "collections-create",
        category: "Collections",
        question: "How do I create a collection?",
        answer: `1. Go to the Collections section
2. Click Create a collection
3. Give the collection a name
4. Add images if you wish`,
    },
    {
        id: "collections-multiple",
        category: "Collections",
        question: "Can an image belong to multiple collections?",
        answer:
            "Yes. The same image can be added to multiple collections without duplicating the file.",
    },

    /* =======================
       4. ACCOUNT & PROFILE
    ======================== */
    {
        id: "profile-edit-info",
        category: "Account & Profile",
        question: "Where can I edit my personal information?",
        answer: `Go to the Profile section to:
• Edit your name
• Update your information
• Change your password`,
    },
    {
        id: "profile-change-password",
        category: "Account & Profile",
        question: "How do I change my password?",
        answer:
            "On the Profile page, select the Change Password option and follow the instructions.",
    },
    {
        id: "profile-forgot-password",
        category: "Account & Profile",
        question: "I forgot my password, what should I do?",
        answer:
            "Use the Forgot Password feature on the login page. A reset link will be sent to your email.",
    },

    /* =======================
       5. SETTINGS
    ======================== */
    {
        id: "settings-purpose",
        category: "Settings",
        question: "What are the settings used for?",
        answer: `Settings allow you to personalize your user experience:
• Appearance
• Language
• Gallery behavior
• Download preferences`,
    },
    {
        id: "settings-language",
        category: "Settings",
        question: "Can I change the interface language?",
        answer:
            "Yes. You can choose the application language from the Settings page.",
    },
    {
        id: "settings-dark-mode",
        category: "Settings",
        question: "Can I enable dark mode?",
        answer:
            "Yes. Light, dark, or automatic mode (based on your system) is available in the appearance settings.",
    },
    {
        id: "settings-save-preferences",
        category: "Settings",
        question: "Are my settings saved?",
        answer:
            "Yes. Your preferences are automatically saved and restored during your next login.",
    },

    /* =======================
       6. SECURITY
    ======================== */
    {
        id: "security-privacy-images",
        category: "Security & Privacy",
        question: "Are my images private?",
        answer:
            "Yes. Your images are strictly private and accessible only by you, unless you choose to share them.",
    },
    {
        id: "security-delete-account",
        category: "Security & Privacy",
        question: "Can I delete my account?",
        answer: `Yes.
In the Settings > Security section, you can request the permanent deletion of your account.

⚠️ This action will delete:
• Your account
• Your images
• Your collections

It is irreversible.`,
    },
    {
        id: "security-logout-all-devices",
        category: "Security & Privacy",
        question: "Can I log out from all devices?",
        answer: "Yes. An option is available in the security settings.",
    },

    /* =======================
       7. ISSUES
    ======================== */
    {
        id: "issues-slow-page",
        category: "Common Issues",
        question: "The page loads slowly, what should I do?",
        answer: `• Check your internet connection
• Refresh the page
• Try using another browser`,
    },
    {
        id: "issues-feature-not-working",
        category: "Common Issues",
        question: "A feature is not working properly",
        answer: `If a problem persists:
• Refresh the page
• Log out and log back in
• Contact support`,
    },

    /* =======================
       8. SUPPORT
    ======================== */
    {
        id: "support-contact",
        category: "Support & Contact",
        question: "How can I contact support?",
        answer: `• Email: support@yoursite.com
• Contact form (if available)`,
    },
    {
        id: "support-report-bug",
        category: "Support & Contact",
        question: "How do I report a bug?",
        answer: `Please describe:
• The issue encountered
• Steps to reproduce it
• Your browser and device

This helps us fix the problem more quickly.`,
    },

    /* =======================
       9. FUTURE
    ======================== */
    {
        id: "future-features",
        category: "Future Improvements",
        question: "Will the platform evolve?",
        answer: `Yes. New features are planned:
• Image sharing
• Collaboration
• Advanced search
• Performance improvements`,
    },
];
