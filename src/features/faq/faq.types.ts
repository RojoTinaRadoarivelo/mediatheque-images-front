export type FaqItem = {
    id: string;
    category: string;
    question: string;
    answer: string;
};

export const FAQ_DATA: FaqItem[] = [
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