# Mettre Valoupe en ligne

État au 3 novembre 2026 : **tout est prêt localement** (dépôt Git, site compilé et vérifié sous `/valoupe/`,
déploiement automatique configuré). Il ne manque que les actions qui exigent **votre compte GitHub**.

## Étape 1 — Créer le dépôt (sur github.com, 1 minute)
1. Connectez-vous sur https://github.com → bouton **New repository**.
2. Nom : `valoupe` · **Public** (GitHub Pages gratuit exige un dépôt public) · ne cochez rien d'autre (pas de README).

## Étape 2 — Envoyer le site (dans PowerShell)
```powershell
cd C:\dev\valoupe
git remote add origin https://github.com/<votre-identifiant>/valoupe.git
git push -u origin main
```
Au premier envoi, Git ouvre une fenêtre de connexion GitHub dans le navigateur (Git Credential Manager) : acceptez.

> Remarque : les réglages de Claude Code interdisent à Claude de faire `git push` lui-même. C'est volontaire :
> la publication reste votre décision.

## Étape 3 — Activer Pages (dans le dépôt, 30 secondes)
*Settings → Pages → Build and deployment → Source : **GitHub Actions***. Le premier déploiement démarre
(onglet *Actions*, ~1 minute). L'adresse s'affiche ensuite : `https://<votre-identifiant>.github.io/valoupe/`.

## Ensuite (facultatif)
- **Téléchargements** : dans le dépôt, *Releases → Draft a new release*, joindre `Valoupe-1.1.0.apk` et
  `Valoupe-1.1.0-Windows-installation.exe` (dossier `C:\dev\marge\livraison\`), puis coller les liens dans
  `src/config.ts` (`downloads`), enregistrer, `git commit` et `git push`.
- **Nom de domaine** : réserver valoupe.fr / valoupe.com (payant, ~10 à 15 €/an), puis *Settings → Pages → Custom domain*.
- **Mentions légales** : compléter `editor` dans `src/config.ts` avant toute activité commerciale.
- **Contact pilote** : renseigner une adresse professionnelle dans `contact` (le bouton « Proposer ma boutique » apparaît).
- **Mettre à jour l'app web publiée** : dans `C:\dev\marge`, `npm run build` ; puis ici `npm run app`, `git commit`, `git push`.

## Autre hébergeur
Le site est statique (`dist/`) : Netlify, Cloudflare Pages ou tout hébergeur web conviennent. Pour un sous-dossier,
compiler avec `BASE_PATH=/sous-dossier/` ; à la racine d'un domaine, sans variable.
