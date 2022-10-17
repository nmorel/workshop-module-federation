---
sidebar_position: 6
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 03

<Branch step="03" />

## Description

Comment gérer les versions des paquets partagés via l'option `shared` ? Vous allez aidez l'équipe `Booklist` à comprendre l'utilisation de l'option `shared`. ([doc](https://webpack.js.org/plugins/module-federation-plugin/#sharing-hints))

## Exercice

**MàJ de `react`**

1. Lancez le script `dev` : `pnpm dev`

Ouvrez les dev tools de votre navigateur sur l'onglet Network. Vous remarquerez que vos dépendances partagées (`react`, `react-dom`, `react-query` et `react-dom-router`) ne sont chargées qu'une seule fois depuis le Host ([localhost:3000](http://localhost:3000)). Les autres modules les réutilisent! 

2. Si vous regardez vos dev tools, la version de `react` est la 18.1.0. Depuis la version 18.1.0 de `react` est disponible. L'équipe `Booklist` a à coeur d'avoir ses dépendances à jour et décide de MaJ `react` à la version 18.2.0.

MàJ la version de `react` de l'app `Booklist` dans le package.json.

L'équipe ne comprends pas le fonctionnement de l'option `shared`.
Elle décide de MàJ les `requiredVersion` dans la configuration de MF dans `Booklist` :
```json
        'react': {
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          requiredVersion: '^18.2.0',
        }
```
Installez à nouveau les dépendances via `pnpm i`. Executes à nouveau : `pnpm dev`

Depuis tes dev tools, vous remarquerez que c'est la version 18.2.0 qui est chargé qu'une seule fois encore mais depuis le remote `Booklist` cette fois ([localhost:3001](http://localhost:3001)).

:::info
Module Federation utilise le `Semantic Versionning` pour récupérer la version compatible la plus à jour. Ici le Host `Bookshelf` enregistre dans le contexte partagé `react:18.1.0` alors que `Booklist` enregistre `react:18.2.0`. Sachant que la dépendence `react` est spécifié via `^18.1.0` dans les `shared`, elle est compatible avec une montée de patch vers la version `18.2.0`, c'est donc la version `18.2.0` de `Booklist` qui est utilisée.
:::

3. Fixez la version de `react` de manière strict dans la config de MF de `Bookshelf` :
```json
	'react': {
          requiredVersion: '18.1.0',
        },
  'react-dom': {
          requiredVersion: '18.1.0',
        }
```
Relance `pnpm dev`.

Ouchh si vous ouvrez vos dev tools vous verrez 2 versions de react téléchargées. 

L'option `singleton` a la rescousse! Rajoutes la à la configuration de `Bookshelf` :

```json
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
L'option `singleton` utilise la version la plus élevée indépendamment du semantic versioning. Vous pouvez utiliser l'option `strictVersion` pour lancer une exception dés qu'il y a un mismatch de version. Vous pouvez essayer en utilisant `react` à version `17.2.0` sur le Host par exemple.
:::

4. `react` est chargé depuis le remote `Booklist`([localhost:3001](http://localhost:3001)). Si on veut utiliser la version du Host quoiqu'il arrive on peut utiliser la config suivante sur les remotes `Booklist` et `Book` :
```json
          'react': {
            singleton: true,
            requiredVersion: false,
            version: '0',
          },
```

En spécifiant `version: '0'`, ils utiliseront désormais la version de `react` du Host quoiqu'il arrive.

**Partager le module `api` entre `Book` et `Booklist`**

Depuis l'onglet Network des dev tools, retrouvez le chargement du module `Booklist`. Vous y trouverez le chargement du package api ` ../../packages/api`. Bizarrement (ou pas) vous retrouvez ces mêmes fichiers chargés séparemment à la fois par le module `Book` et par le module `Booklist` qui l'utilisent tous les deux. Les équipes aimerait ne pas avoir à retélécharger le module une 2ème fois.

1. MaJ les configs webpack de `Book` et `Booklist` pour ne charger qu'une seule fois le module `api`.

<Solution step="03" />
