/** Lien interne qui tient compte du sous-dossier de déploiement (ex. /valoupe/ sur GitHub Pages). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
