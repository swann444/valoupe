# Valoupe — vision produit

> Document de travail (3 novembre 2026). Il explique **à qui** sert Valoupe, **quels problèmes** il résout,
> et **dans quel ordre** construire les fonctions. À relire avec les premières boutiques pilotes.

> **État au 3 novembre 2026 (application v1.2)** — disponibles : prix neufs et promotions (fraîcheur, conditions,
> comparatif par revendeur), protocole d'expertise par catégorie avec contrôle d'IMEI, décision d'achat expliquée
> (acheter / négocier / refuser / vérifier, risque, délai de vente), TVA sur la marge et règles d'achat, import
> CSV/Excel de l'historique, enregistrement de chaque décision. Prochaine étape locale : apprentissage à partir des
> ventes de la boutique, pilotage du stock, bon de rachat et registre. Puis serveur : équipes, multi-boutiques,
> prix actualisés depuis des sources autorisées, diagnostic photo, tendances, réseau d'échanges entre pros.
## 1. En une phrase

Valoupe est l'outil de décision de l'achat-revente d'occasion : il dit **ce que vaut un objet**, **jusqu'où
l'acheter** et **ce qu'il rapporte vraiment**. Il fonctionne au comptoir comme au bureau, hors ligne.

## 2. Pour qui

| Profil | Situation | Ce qu'il veut | Ce qui le freine aujourd'hui |
|---|---|---|---|
| **Boutique de réseau** (franchise de type dépôt-vente / rachat cash) | 10 à 60 rachats par jour, plusieurs vendeurs, outils internes du réseau | Offres homogènes entre vendeurs, rapidité, conformité | Outils internes parfois lents ou limités à certaines catégories ; formation des nouveaux vendeurs |
| **Boutique indépendante** | 1 à 3 personnes, tout l'électronique, souvent un logiciel de caisse générique | Cote fiable sans abonnement coûteux, stock, marge réelle | Estimation « à l'œil », recherches sur 5 sites, tableur maison |
| **Revendeur en ligne** (pro ou semi-pro) | Achète sur Leboncoin / Vinted / brocantes, revend en ligne | Repérer les bonnes affaires, frais et commissions par plateforme | Marge réelle invisible (commissions, envois, réparations) |
| **Particulier** | Vend son téléphone, achète une console d'occasion | Ne pas se faire avoir | Prix affichés ≠ prix payés |

**Cible prioritaire : les boutiques indépendantes et les revendeurs**, puis les boutiques de réseau.
Les grands réseaux peuvent disposer d'outils internes ; Valoupe doit d'abord convaincre ceux qui n'en ont pas,
puis devenir le complément (cote transparente, mobilité, hors ligne) des autres. On ne prétend à aucun
partenariat tant qu'il n'existe pas.

## 3. Les besoins du métier (analyse)

Un rachat au comptoir se déroule en 5 temps. Pour chacun : le besoin, et la réponse de Valoupe.

1. **Identifier** l'objet (modèle exact, capacité, édition). → Recherche tolérante, références constructeur (A2846, SM-S928B, CFI-2016). *Disponible.*
2. **Expertiser** (état, accessoires, défauts, verrouillage de compte, batterie). → État et accessoires *disponibles* ; liste de contrôle par catégorie *à faire*.
3. **Chiffrer l'offre** (valeur de revente, demande, frais, marge cible). → Prix d'achat à viser sur 4 niveaux, analyse d'une offre. *Disponible.*
4. **Enregistrer le rachat** (registre des objets achetés aux particuliers, identité du vendeur, bon de rachat, entrée en stock avec n° de série). → *À faire* : c'est le plus gros manque pour un pro.
5. **Revendre** (prix conseillé, plateformes, suivi du stock dormant, bénéfice réel). → *Disponible* (carnet, commissions, tableau de bord, stock dormant).

Besoins transverses :
- **TVA sur la marge** (régime des biens d'occasion) : un pro raisonne en marge HT après TVA sur marge. Sans cela, les bénéfices affichés sont faux pour lui. *À faire, priorité haute.*
- **Équipe** : mêmes règles d'achat pour tous, rôles, plusieurs appareils. *Plus tard.*
- **Preuve et confiance** : montrer au client d'où vient l'offre (prix neuf, ventes constatées) aide à la faire accepter. *Disponible en partie* (sources et confiance affichées).
- **Objets signalés volés** : contrôle IMEI avant achat. *À étudier* (services spécialisés, souvent payants).

## 4. Ce qui différencie Valoupe

1. **Transparence** : fourchette + niveau de confiance + sources datées. Aucun prix inventé.
2. **Ventes conclues d'abord** : les prix réellement payés (vos ventes, vos relevés) priment sur les annonces.
3. **Hors ligne et local** : utilisable sans réseau en boutique ; les données restent chez le commerçant.
4. **Multi-appareil réel** : téléphone au comptoir, PC au bureau, navigateur — même application.
5. **Marge réelle** : commissions par plateforme, frais, (bientôt) TVA sur marge.
6. **Respect des plateformes** : pas d'aspiration de sites (risque juridique et technique évité).

## 5. Priorités (ce qu'il faut construire, dans l'ordre)

Critères : gain de temps au comptoir, impact sur la marge, demande des pros, effort.

| Priorité | Fonction | Pourquoi maintenant | Effort |
|---|---|---|---|
| **P1** | **Mode comptoir** (rachat express : recherche → état guidé → offre → bon de rachat) | C'est le moment où un pro gagne ou perd de l'argent, plusieurs fois par jour | Moyen (réutilise Radar + analyse d'offre) |
| **P1** | **TVA sur la marge** dans tous les calculs | Sans elle, les chiffres sont faux pour un pro | Faible (logique pure + tests) |
| **P1** | **N° de série / IMEI, état détaillé** sur chaque objet | Prérequis du registre et du SAV | Faible |
| **P1** | **Recalibrer la décote** avec de vraies ventes conclues | Le modèle générique sous-estime les smartphones récents (ex. iPhone 13 à ~142 € sans relevé) | Moyen (collecte de données) |
| **P2** | **Registre des achats** (objets achetés aux particuliers) + export imprimable | Obligation des revendeurs ; grosse valeur perçue | Moyen (à valider avec un juriste) |
| **P2** | **Expertise guidée** par catégorie | Homogénéise les offres entre vendeurs | Moyen |
| **P2** | **Assistant IA local** (Ollama) : annonces, négociation | Gain de temps à la mise en vente ; local = confidentialité | Moyen |
| **P2** | **Étiquettes QR** imprimables | Lien rayon ↔ fiche | Faible |
| **P3** | Synchronisation chiffrée, équipe, multi-boutiques | Nécessite un serveur (coût, sécurité) | Élevé |
| **P3** | Données de marché mutualisées (consenties, anonymes) | Effet réseau : la cote s'améliore avec les utilisateurs | Élevé |
| **P3** | Interfaces officielles des places de marché (ex. API eBay) | Prix vendus fiables, publication d'annonces | Moyen + comptes développeur |
| **P3** | Contrôle IMEI, nouvelles catégories, autres langues | Élargissement | Variable |

## 6. Modèle économique (hypothèse à valider)

- **Gratuit** pour les particuliers et les revendeurs occasionnels (application locale complète).
- **Valoupe Pro** par boutique : mode comptoir, registre, TVA sur marge, équipe, synchronisation.
- **Valoupe Réseau** : tableaux de bord multi-boutiques, données de marché mutualisées.
- Aucun tarif annoncé tant que le pilote n'a pas mesuré la valeur réelle.

## 7. Risques et parades

| Risque | Parade |
|---|---|
| Estimations jugées fausses → perte de confiance | Toujours afficher la confiance ; prioriser les ventes conclues ; recalibrage (P1) |
| Dépendance à des sites tiers | Pas d'aspiration ; interfaces officielles seulement, avec accord |
| Obligations légales mal interprétées | Registre et TVA validés par un expert-comptable / juriste avant mise en avant |
| Les réseaux ont déjà leurs outils | Cibler d'abord indépendants et revendeurs ; se positionner en complément |

## 8. Indicateurs à suivre pendant le pilote

Temps moyen d'un rachat · écart entre offre Valoupe et offre finale · taux d'offres acceptées ·
marge réelle à la revente vs marge visée · fonctions réellement utilisées.
