// Réglages du site : tout ce qui change sans toucher au design se règle ici.
// Un champ vide masque proprement l'élément correspondant (lien de téléchargement, contact…).
export const SITE = {
  name: 'Valoupe',
  tagline: 'L’occasion, à la loupe.',
  description:
    'Valoupe aide les boutiques d’occasion et les revendeurs à estimer, acheter au bon prix et revendre avec une marge maîtrisée. Hors ligne, sur Android, Windows et navigateur.',
  /** Liens de téléchargement publics (ex. page « Releases » GitHub). Vide = « bientôt disponible ». */
  downloads: { android: '', windows: '' },
  /** Adresse de contact publique (pro). Vide = formulaire masqué. Ne jamais mettre d'adresse personnelle. */
  contact: '',
  /** Dépôt public du projet, s'il existe. */
  repo: '',
  /** Mentions légales : à compléter avant toute mise en ligne commerciale (obligatoire en France). */
  editor: { name: '', status: '', address: '', email: '', host: 'GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis' },
} as const;

/** Chiffres réels de l'application (catalogue du 2 novembre 2026). À mettre à jour avec le catalogue. */
export const FACTS = { products: 426, variants: 741, brands: 40, categories: 5 };

export const NAV = [
  { href: 'fonctionnalites/', label: 'Fonctionnalités' },
  { href: 'professionnels/', label: 'Professionnels' },
  { href: 'feuille-de-route/', label: 'Feuille de route' },
  { href: 'vision/', label: 'Vision' },
];
