import { useState } from "react";
import "./faq.scss";

export type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

export const FAQ_DATA: FaqItem[] = [
  /* =======================
     1. GÉNÉRAL
  ======================== */
  {
    category: "Général",
    question: "Qu’est-ce que cette plateforme ?",
    answer: `Cette plateforme est une médiathèque d’images qui vous permet de centraliser, organiser, consulter et télécharger vos images en toute simplicité.
Elle est conçue pour faciliter la gestion de grandes collections d’images personnelles ou professionnelles.`,
  },
  {
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
    category: "Galerie & Images",
    question: "Quels formats d’images sont supportés ?",
    answer: `Les formats actuellement supportés sont :
• JPG / JPEG
• PNG
• WEBP

D’autres formats pourront être ajoutés ultérieurement.`,
  },
  {
    category: "Galerie & Images",
    question: "Y a-t-il une limite de taille pour les images ?",
    answer: `Oui, chaque image ne doit pas dépasser la taille maximale autorisée par la plateforme (ex : 10 Mo).
Si une image dépasse cette limite, elle sera refusée lors de l’importation.`,
  },
  {
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
    category: "Collections",
    question: "Qu’est-ce qu’une collection ?",
    answer:
      "Une collection est un dossier personnalisé qui vous permet de regrouper vos images par thème, projet ou catégorie.",
  },
  {
    category: "Collections",
    question: "Comment créer une collection ?",
    answer: `1. Accédez à la section Collections
2. Cliquez sur Créer une collection
3. Donnez un nom à la collection
4. Ajoutez des images si vous le souhaitez`,
  },
  {
    category: "Collections",
    question: "Une image peut-elle appartenir à plusieurs collections ?",
    answer:
      "Oui. Une même image peut être ajoutée à plusieurs collections sans duplication du fichier.",
  },

  /* =======================
     4. COMPTE & PROFIL
  ======================== */
  {
    category: "Compte & Profil",
    question: "Où puis-je modifier mes informations personnelles ?",
    answer: `Rendez-vous dans la section Profil pour :
• Modifier votre nom
• Mettre à jour vos informations
• Changer votre mot de passe`,
  },
  {
    category: "Compte & Profil",
    question: "Comment changer mon mot de passe ?",
    answer:
      "Dans la page Profil, choisissez l’option Changer le mot de passe et suivez les instructions.",
  },
  {
    category: "Compte & Profil",
    question: "J’ai oublié mon mot de passe, que faire ?",
    answer:
      "Utilisez la fonction Mot de passe oublié depuis la page de connexion. Un lien de réinitialisation vous sera envoyé par email.",
  },

  /* =======================
     5. PARAMÈTRES
  ======================== */
  {
    category: "Paramètres",
    question: "À quoi servent les paramètres ?",
    answer: `Les paramètres vous permettent de personnaliser votre expérience utilisateur :
• Apparence
• Langue
• Comportement de la galerie
• Préférences de téléchargement`,
  },
  {
    category: "Paramètres",
    question: "Puis-je changer la langue de l’interface ?",
    answer:
      "Oui. Vous pouvez choisir la langue de l’application depuis la page Paramètres.",
  },
  {
    category: "Paramètres",
    question: "Puis-je activer le mode sombre ?",
    answer:
      "Oui. Le mode clair, sombre ou automatique (selon votre système) est disponible dans les paramètres d’apparence.",
  },
  {
    category: "Paramètres",
    question: "Mes paramètres sont-ils sauvegardés ?",
    answer:
      "Oui. Vos préférences sont sauvegardées automatiquement et restaurées lors de vos prochaines connexions.",
  },

  /* =======================
     6. SÉCURITÉ
  ======================== */
  {
    category: "Sécurité & Confidentialité",
    question: "Mes images sont-elles privées ?",
    answer:
      "Oui. Vos images sont strictement privées et accessibles uniquement par vous, sauf si vous choisissez de les partager.",
  },
  {
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
    category: "Sécurité & Confidentialité",
    question: "Puis-je me déconnecter de tous les appareils ?",
    answer: "Oui. Une option est disponible dans les paramètres de sécurité.",
  },

  /* =======================
     7. PROBLÈMES
  ======================== */
  {
    category: "Problèmes fréquents",
    question: "La page charge lentement, que faire ?",
    answer: `• Vérifiez votre connexion internet
• Rechargez la page
• Essayez depuis un autre navigateur`,
  },
  {
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
    category: "Support & Contact",
    question: "Comment contacter le support ?",
    answer: `• Email : support@votre-site.com
• Formulaire de contact (si disponible)`,
  },
  {
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
    category: "Améliorations futures",
    question: "La plateforme va-t-elle évoluer ?",
    answer: `Oui. De nouvelles fonctionnalités sont prévues :
• Partage d’images
• Collaboration
• Recherche avancée
• Amélioration des performances`,
  },
];

function Faq() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaq = FAQ_DATA.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="faq-container">
      <h1>❓ Foire Aux Questions</h1>

      {/* 🔍 Recherche */}
      <input
        type="text"
        placeholder="Rechercher dans la FAQ..."
        className="faq-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📂 FAQ */}
      <div className="faq-list">
        {filteredFaq.length === 0 && (
          <p className="faq-empty">Aucun résultat trouvé.</p>
        )}

        {filteredFaq.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span>{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;
