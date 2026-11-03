# Valoupe — site vitrine et identité

**Valoupe** (anciennement *Marge*) aide les boutiques d'occasion, les revendeurs et les particuliers à estimer un objet,
l'acheter au bon prix et revendre avec une marge maîtrisée. *L'occasion, à la loupe.*

Ce dépôt contient **le site public**, **l'identité visuelle** et **la vision produit**. Le code de l'application
(Android, Windows, web) est dans un dépôt séparé et privé ; seule sa version web compilée est publiée ici, sous `/app/`.

## Contenu

| Dossier | Rôle |
|---|---|
| `src/pages/` | Une page = un fichier `.astro` (accueil, fonctionnalités, professionnels, feuille de route, vision, marque, télécharger, légal, 404). Ajouter une page : créer un fichier ici, l'ajouter à `NAV` dans `src/config.ts` si besoin. |
| `src/config.ts` | Réglages du site : liens de téléchargement, contact, mentions légales, chiffres du catalogue. **Un champ vide masque l'élément.** |
| `src/data/fonctionnalites.ts` | Liste des fonctions et leur statut réel (disponible / en préparation / envisagé). Le site entier la lit. |
| `src/components/` | Briques réutilisables : logo, pictogrammes, loupe animée de l'accueil, fiche d'estimation. |
| `src/styles/global.css` | Couleurs, typographies, boutons, cartes (tirés de la charte). |
| `marque/` | Logos SVG/PNG et **charte de marque** (`CHARTE.md`). |
| `docs/VISION-PRODUIT.md` | Analyse des besoins des pros, priorités, modèle économique. |
| `public/` | Fichiers servis tels quels (favicon, image de partage, logos téléchargeables, `app/`). |
| `outils/` | Scripts : génération de la marque, intégration de l'app web, vérification du site. |

## Commandes (depuis ce dossier)

```powershell
npm install            # une fois
npm run dev            # site en direct : http://localhost:4321 (se recharge à chaque modification)
npm run build          # compile le site dans dist/
npm run verifier       # vérifie dist/ : 9 pages × 3 écrans, liens, erreurs, débordements, app web (captures/)
npm run marque         # régénère logos et icônes depuis outils/generer-marque.mjs
npm run app            # recopie la version web de l'application (../marge/dist) dans public/app/
```

Voir le site compilé sans serveur de développement : `npm run build` puis `npx astro preview` → http://localhost:4321.

## Mise en ligne (GitHub Pages, gratuit)

Tout est prêt : `.github/workflows/deploy.yml` compile et publie le site à chaque envoi sur `main`.
Étapes restantes, qui demandent **votre compte GitHub** (voir `docs/DEPLOIEMENT.md`) :
1. créer un dépôt public vide nommé `valoupe` sur github.com ;
2. relier ce dossier au dépôt et envoyer (`git remote add origin …` puis `git push -u origin main`) ;
3. dans le dépôt : *Settings → Pages → Source : GitHub Actions*.

Adresse obtenue : `https://<votre-identifiant>.github.io/valoupe/` (un nom de domaine comme valoupe.fr peut être relié ensuite).

## Ce qui n'est jamais publié
Aucun secret, clé, mot de passe ni donnée personnelle : `.gitignore` exclut `.env`, clés de signature, APK et EXE.
Les binaires de l'app se distribuent via les *Releases* GitHub (liens à renseigner dans `src/config.ts`).

## Licence
Tous droits réservés (projet commercial). Polices sous licence SIL Open Font License.
