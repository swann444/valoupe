// Fonctionnalités de Valoupe, avec leur statut RÉEL. Règle : « disponible » seulement si c'est dans l'app
// livrée et testé. Le site lit cette liste (accueil, page Fonctionnalités) : la mettre à jour à chaque version.
export type Statut = 'dispo' | 'prep' | 'envisage';
export const STATUT_LABEL: Record<Statut, string> = { dispo: 'Disponible', prep: 'En préparation', envisage: 'Envisagé' };

export interface Fonction { id: string; pilier: 'estimer' | 'decider' | 'gerer' | 'confiance'; icone: string; titre: string; texte: string; statut: Statut }

export const PILIERS = {
  estimer: { titre: 'Estimer', sous: 'Savoir ce que vaut un objet, et à quel point on en est sûr.' },
  decider: { titre: 'Décider', sous: 'Acheter au bon prix, refuser sans hésiter.' },
  gerer: { titre: 'Gérer & vendre', sous: 'Suivre le stock, les frais et la marge réelle.' },
  confiance: { titre: 'Confiance', sous: 'Des chiffres sourcés, des données qui restent chez vous.' },
} as const;

export const FONCTIONS: Fonction[] = [
  // Estimer
  { id: 'radar', pilier: 'estimer', icone: 'radar', statut: 'dispo', titre: 'Radar des prix', texte: 'Recherche tolérante aux fautes et aux références (« s24u », « SM-S928B », « 256 ») dans un catalogue de smartphones, tablettes, enceintes, consoles et jeux.' },
  { id: 'estimation', pilier: 'estimer', icone: 'courbe', statut: 'dispo', titre: 'Valeur d’occasion avec fourchette', texte: 'Valeur estimée, fourchette et niveau de confiance (élevée, moyenne, faible). Les ventes conclues priment sur les annonces, elles-mêmes sur le modèle de décote.' },
  { id: 'etat', pilier: 'estimer', icone: 'oeil', statut: 'dispo', titre: 'État et accessoires', texte: 'De « neuf » à « pour pièces », boîte, chargeur, manettes ou facture manquants : la valeur s’ajuste avec des règles visibles.' },
  { id: 'releves', pilier: 'estimer', icone: 'registre', statut: 'dispo', titre: 'Relevés de prix sourcés', texte: 'Notez une vente conclue, une annonce ou un prix neuf, avec date et source. Vos ventes alimentent l’estimation. Import et export des relevés.' },
  { id: 'liens', pilier: 'estimer', icone: 'fleche', statut: 'dispo', titre: 'Recherche marché en un geste', texte: 'Ouvre la recherche du produit sur eBay (ventes conclues), Leboncoin, Vinted, Back Market, Ledenicheur et idealo, dans votre navigateur.' },
  { id: 'historique', pilier: 'estimer', icone: 'courbe', statut: 'envisage', titre: 'Historique et tendance du marché', texte: 'Courbe de prix par produit et alerte quand un modèle décroche, à partir de relevés partagés avec consentement.' },
  { id: 'vitesse', pilier: 'estimer', icone: 'sablier', statut: 'envisage', titre: 'Vitesse de revente', texte: 'Délai de vente moyen par produit et par canal, calculé sur vos propres ventes.' },
  // Décider
  { id: 'cibles', pilier: 'decider', icone: 'balance', statut: 'dispo', titre: 'Prix d’achat à viser', texte: 'Quatre seuils (excellent, bon, correct, maximum) calculés depuis la revente prudente, la demande, les frais et votre marge minimale.' },
  { id: 'annonce', pilier: 'decider', icone: 'euro', statut: 'dispo', titre: 'Analyse d’une offre', texte: 'Prix demandé, réparation, déplacement, envoi, commission : bénéfice net, offre maximale et verdict immédiat.' },
  { id: 'comptoir', pilier: 'decider', icone: 'comptoir', statut: 'prep', titre: 'Mode comptoir', texte: 'Le rachat auprès d’un particulier en moins d’une minute : identification, état guidé, offre argumentée, bon de rachat.' },
  { id: 'expertise', pilier: 'decider', icone: 'bouclier', statut: 'prep', titre: 'Expertise guidée', texte: 'Listes de contrôle par catégorie (écran, batterie, verrouillage de compte, manettes…) qui ajustent l’offre à chaque réponse.' },
  { id: 'ia', pilier: 'decider', icone: 'ia', statut: 'prep', titre: 'Assistant IA local', texte: 'Rédaction d’annonces et aide à la négociation, avec un modèle qui tourne sur votre ordinateur. Aucune donnée envoyée sans votre accord.' },
  // Gérer
  { id: 'carnet', pilier: 'gerer', icone: 'stock', statut: 'dispo', titre: 'Carnet d’achat-revente', texte: 'Chaque objet avec photo, prix d’achat, état, plateforme et statut. Un produit du Radar s’ajoute au carnet en un geste.' },
  { id: 'marge', pilier: 'gerer', icone: 'euro', statut: 'dispo', titre: 'Marge nette réelle', texte: 'Commissions par plateforme (pourcentage et frais fixes), prix de vente conseillé pour une marge ou un bénéfice visé.' },
  { id: 'tableau', pilier: 'gerer', icone: 'courbe', statut: 'dispo', titre: 'Tableau de bord', texte: 'Bénéfice, chiffre d’affaires, marge nette, stock qui dort depuis trop longtemps. Export CSV des ventes.' },
  { id: 'tva', pilier: 'gerer', icone: 'tva', statut: 'prep', titre: 'TVA sur la marge', texte: 'Le régime des biens d’occasion intégré aux calculs : prix conseillés et bénéfices exprimés comme les voit votre comptable.' },
  { id: 'serie', pilier: 'gerer', icone: 'stock', statut: 'prep', titre: 'Stock professionnel', texte: 'Numéro de série ou IMEI, emplacement, garantie, étiquettes imprimables avec code QR.' },
  { id: 'multi', pilier: 'gerer', icone: 'annonces', statut: 'envisage', titre: 'Annonces multi-plateformes', texte: 'Une fiche, plusieurs canaux : publication et retrait via les interfaces officielles des places de marché quand elles existent.' },
  { id: 'equipe', pilier: 'gerer', icone: 'equipe', statut: 'envisage', titre: 'Boutiques et équipes', texte: 'Plusieurs points de vente, rôles (vendeur, responsable), synchronisation chiffrée entre appareils.' },
  // Confiance
  { id: 'horsligne', pilier: 'confiance', icone: 'horsligne', statut: 'dispo', titre: 'Hors ligne, sans compte', texte: 'Tout fonctionne sans connexion. Vos données restent sur votre appareil ; sauvegarde et restauration en un fichier.' },
  { id: 'appareils', pilier: 'confiance', icone: 'appareils', statut: 'dispo', titre: 'Android, Windows, navigateur', texte: 'La même application sur le téléphone au comptoir, le PC du bureau et le navigateur.' },
  { id: 'registre', pilier: 'confiance', icone: 'registre', statut: 'prep', titre: 'Registre des achats', texte: 'Un registre numérique des objets achetés aux particuliers (identité du vendeur, description, prix), pensé pour les obligations des revendeurs.' },
  { id: 'imei', pilier: 'confiance', icone: 'bouclier', statut: 'envisage', titre: 'Contrôle des objets signalés', texte: 'Vérification d’IMEI ou de numéro de série auprès de services spécialisés, avant d’acheter.' },
];
