---
sidebar_position: 6
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 03

<Branch step="03" />

## Description

Comment gérer les versions des paquets partagés via l'option `shared` ?

## Explication

https://webpack.js.org/plugins/module-federation-plugin/#sharing-hints

## Exercice

**MaJ de `react`**

1. Installer les dépendences : `pnpm i`. Executes : `pnpm dev`

Ouvres tes dev tools de ton navigateur sur l'onglet Network. Tu remarqueras que tes dépendences partagés jusqu'à présent `react`, `react-dom`, `react-query` et `react-dom-router` ne sont chargés qu'une seule fois depuis le Host (localhost:3000). Les autres modules les réutilisent! 

2. Si tu regardes tes dev tools, la version de `react` est la 18.0.1. Depuis la version 18.0.2 de `react` est disponible. L'équipe `Booklist` ont a coeur d'avoir ses dépendences à jour décide de MaJ `react` à la version 18.0.2. 

Mets à jour la version de `react` de l'app `Booklist` dans le package.json.

MaJ les `requiredVersion` dans la configuration de MF dans `Booklist` :
```
        'react': {
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          requiredVersion: '^18.2.0',
        }
```
Installes à nouveau les dépendences via `pnpm i`. Executes à nouveau : `pnpm dev`

Depuis tes dev tools, tu remarqueras que c'est la version 18.0.2 qui est chargé qu'une seule fois encore mais depuis le remote `Booklist` cette fois (localhost:3001).

:::info
Module Federation utilise le `Semantic Versionning` pour récupérer la version compatible la plus à jour. Ici le Host `Bookshelf` enregistre dans le contexte partagé `react:18.0.1` alors que `Booklist` enregistre `react:18.0.2`. Sachant que la dépendence `react` est spécifié via `^18.0.1` dans les `shared`, elle est compatible avec une montée de patch vers la version `18.0.2`, c'est donc la version `18.0.2` de `Booklist` qui est utilisée.
:::

3. Fixe la version de `react` de manière strict dans la config de MF de `Bookshelf` :
```
	'react': {
          requiredVersion: '18.0.1',
        },
  'react-dom': {
          requiredVersion: '18.1.0',
        }
```
Relance `pnpm dev`.

Ouchh si tu ouvres tes dev tools tu verras 2 versions de react téléchargées. 

L'option `singleton` a la rescousse! Rajoutes la à la configuration de `Bookshelf` :

```
        'react': {
          singleton: true,
          requiredVersion: '18.1.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.1.0',
        },
```

:::info
L'option `singleton` utilise la version la plus élevée indépendemment du semantic versioning. Tu peux utiliser l'option `strictVersion` pour lancer une exception dés qu'il y a un mismatch de version. Tu peux essayer en utilisant `react` à version `17.0.2` sur le Host par exemple.
:::

4. `react` est chargé depuis le remote `Booklist`(localhost:3001). Si on veut utiliser la version du Host quoiqu'il arrive on peut utiliser la config suivante sur les remotes `Booklist` et `Book` :
```
          'react': {
            singleton: true,
            requiredVersion: false,
            version: '0',
          },
```

En spécifiant `version: '0'`, ils utiliseront désormais la version de `react` du Host quoiqu'il arrive.

**Partager le module `api` entre `Book` et `Booklist`**

Depuis l'onglet Network des dev tools, retrouve le chargement du module `Booklist`. Tu y trouveras le chargement du package api ` ../../packages/api`. Bizarrement (ou pas) tu retrouves ces mêmes fichiers chargés séparemment à la fois par le module `Book` et par le module `Booklist` qui l'utilisent tous les deux. Les équipes aimerait ne pas avoir à retélécharger le module une 2ème fois.

1. MaJ les configs webpack de `Book` et `Booklist` pour ne charger qu'une seule fois le module `api`.

<Solution step="03" />
