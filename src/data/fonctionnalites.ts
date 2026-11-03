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
  { id: 'neuf', pilier: 'estimer', icone: 'euro', statut: 'dispo', titre: 'Prix neufs et promotions', texte: 'Prix habituel, meilleur prix immédiat, meilleur prix sous condition (code, remboursement, carte), comparatif par revendeur, date de vérification et fraîcheur. L’occasion est comparée au neuf réellement accessible.' },
  { id: 'estimation', pilier: 'estimer', icone: 'courbe', statut: 'dispo', titre: 'Valeur d’occasion avec fourchette', texte: 'Valeur estimée, fourchette et niveau de confiance. Les ventes conclues priment sur les annonces, elles-mêmes sur le modèle de décote.' },
  { id: 'etat', pilier: 'estimer', icone: 'oeil', statut: 'dispo', titre: 'État et accessoires', texte: 'De « neuf » à « pour pièces », boîte, chargeur, manettes ou facture manquants : la valeur s’ajuste avec des règles visibles.' },
  { id: 'releves', pilier: 'estimer', icone: 'registre', statut: 'dispo', titre: 'Relevés de prix sourcés', texte: 'Ventes conclues, annonces, prix neufs et offres datés, avec leur source. Vos propres ventes alimentent l’estimation.' },
  { id: 'apprentissage', pilier: 'estimer', icone: 'ia', statut: 'prep', titre: 'Estimations qui apprennent de vos ventes', texte: 'Chaque décision est enregistrée avec le prix finalement obtenu : Valoupe ajuste ses estimations à votre clientèle, catégorie par catégorie.' },
  { id: 'photo', pilier: 'estimer', icone: 'photo', statut: 'envisage', titre: 'Diagnostic par photo', texte: 'Prise de vue guidée, identification du modèle, défauts visibles et accessoires repérés. L’IA explique et signale ses doutes ; elle ne certifie jamais une authenticité.' },
  { id: 'tendances', pilier: 'estimer', icone: 'courbe', statut: 'envisage', titre: 'Tendances du marché', texte: 'Hausses de demande, baisses de prix, produits qui ralentissent : des alertes uniquement quand le signal est solide, avec une recommandation concrète.' },
  // Décider
  { id: 'decision', pilier: 'decider', icone: 'balance', statut: 'dispo', titre: 'Décision d’achat expliquée', texte: 'Acheter, négocier, refuser ou vérifier : avec les raisons, la contre-offre, le prix plafond, le niveau de risque et le délai de vente estimé.' },
  { id: 'expertise', pilier: 'decider', icone: 'bouclier', statut: 'dispo', titre: 'Protocole d’expertise', texte: 'Tests par catégorie (écran, compte associé, IMEI, batterie, lecteur, manettes…), points d’authenticité et défauts connus. Chaque défaut ajuste l’offre.' },
  { id: 'annonce', pilier: 'decider', icone: 'euro', statut: 'dispo', titre: 'Analyse d’une offre', texte: 'Prix demandé, réparation, déplacement, envoi, commission : bénéfice net, offre maximale et revente nécessaire.' },
  { id: 'regles', pilier: 'decider', icone: 'tva', statut: 'dispo', titre: 'Vos règles d’achat', texte: 'TVA sur la marge, niveau d’achat visé, provision garantie : les prix conseillés suivent votre stratégie, pas une règle unique.' },
  { id: 'comptoir', pilier: 'decider', icone: 'comptoir', statut: 'prep', titre: 'Bon de rachat et scanner', texte: 'Bon de rachat imprimable, lecture du code-barres et du numéro de série, prise de vue guidée.' },
  { id: 'ia', pilier: 'decider', icone: 'ia', statut: 'prep', titre: 'Assistant IA local', texte: 'Rédaction d’annonces et aide à la négociation, avec un modèle qui tourne sur votre ordinateur.' },
  // Gérer
  { id: 'import', pilier: 'gerer', icone: 'stock', statut: 'dispo', titre: 'Import de votre historique', texte: 'CSV ou Excel depuis un tableur ou votre logiciel : colonnes reconnues, aperçu, doublons détectés, ligne d’origine conservée. Aucune ressaisie.' },
  { id: 'carnet', pilier: 'gerer', icone: 'stock', statut: 'dispo', titre: 'Stock et ventes', texte: 'Chaque objet avec photo, n° de série ou IMEI, état, prix d’achat, plateforme, statut et expertise du rachat.' },
  { id: 'marge', pilier: 'gerer', icone: 'euro', statut: 'dispo', titre: 'Marge nette réelle', texte: 'Commissions par plateforme, frais, TVA sur la marge : le bénéfice tel que le voit votre comptable.' },
  { id: 'tableau', pilier: 'gerer', icone: 'courbe', statut: 'dispo', titre: 'Tableau de bord', texte: 'Bénéfice, marge nette, délai moyen de vente, argent immobilisé, stock qui dort. Export CSV.' },
  { id: 'pilotage', pilier: 'gerer', icone: 'sablier', statut: 'prep', titre: 'Pilotage des achats et du stock', texte: 'Objectifs par catégorie, couverture de stock, rotation, démarques proposées : « assez de consoles, il manque des smartphones de milieu de gamme ».' },
  { id: 'equipe', pilier: 'gerer', icone: 'equipe', statut: 'envisage', titre: 'Boutiques et équipes', texte: 'Plusieurs points de vente, rôles et plafonds par employé, historique des décisions, synchronisation chiffrée.' },
  { id: 'multi', pilier: 'gerer', icone: 'annonces', statut: 'envisage', titre: 'Annonces multi-plateformes', texte: 'Une fiche, plusieurs canaux, via les interfaces officielles des places de marché.' },
  { id: 'reseau', pilier: 'gerer', icone: 'equipe', statut: 'envisage', titre: 'Réseau d’échanges entre pros', texte: 'Surstock chez l’un, manque chez l’autre : transferts et ventes entre boutiques volontaires, avec confidentialité et paiement sécurisé.' },
  // Confiance
  { id: 'horsligne', pilier: 'confiance', icone: 'horsligne', statut: 'dispo', titre: 'Hors ligne, sans compte', texte: 'Tout fonctionne sans connexion. Vos données restent sur votre appareil ; sauvegarde et restauration en un fichier.' },
  { id: 'appareils', pilier: 'confiance', icone: 'appareils', statut: 'dispo', titre: 'Android, Windows, navigateur', texte: 'La même application sur le téléphone au comptoir, la tablette d’expertise et le PC du bureau.' },
  { id: 'imei', pilier: 'confiance', icone: 'bouclier', statut: 'dispo', titre: 'Contrôle de l’IMEI', texte: 'Validité de l’IMEI vérifiée à la saisie (clé de contrôle). La vérification « déclaré volé » reste à faire auprès d’un service spécialisé.' },
  { id: 'registre', pilier: 'confiance', icone: 'registre', statut: 'prep', titre: 'Registre des achats', texte: 'Un registre numérique des objets achetés aux particuliers, pensé pour les obligations des revendeurs.' },
];