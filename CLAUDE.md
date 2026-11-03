# Valoupe — site vitrine (mémoire du projet)

Site statique Astro 7 du produit Valoupe (ex-Marge). Dépôt destiné à être PUBLIC : rien d'interne ici.
App (code source privé) : `C:\dev\marge`. Vision : `docs/VISION-PRODUIT.md`. Charte : `marque/CHARTE.md`.

## Règles
- Ne JAMAIS annoncer comme « disponible » une fonction absente de l'app livrée et testée (`src/data/fonctionnalites.ts`).
- Aucun client, partenariat, chiffre ou témoignage inventé. Les exemples chiffrés sont marqués « exemple ».
- Liens internes via `url()` (`src/lib/url.ts`) : le site peut être servi sous `/valoupe/` (GitHub Pages).
- Logos : générés par `outils/generer-marque.mjs` (police → tracés) ; ne pas éditer les SVG à la main.
- Pas de ressource externe (polices auto-hébergées, aucun traceur) : la page Confidentialité l'affirme.
- `git push` interdit à Claude : la publication est faite par l'utilisateur (`docs/DEPLOIEMENT.md`).

## Vérifier
`npm run build; npm run verifier` (et avec `$env:BASE_PATH='/valoupe/'`) → 131 vérifications, 0 échec attendu.
Pièges : animations d'apparition (`.reveal`) — défilement lent dans les tests ; styles scopés d'Astro plus
prioritaires que les styles globaux (ne pas réutiliser un nom de classe global comme `.pin` dans une page) ;
la police Bricolage n'a pas l'espace fine U+202F (remplacer par U+00A0 dans les montants formatés en JS).
