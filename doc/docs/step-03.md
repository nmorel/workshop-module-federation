---
sidebar_position: 6
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 03

<Branch step="03" />

## Description

Comment gérer les versions des paquets partagés via l'option `shared` ? Vous allez aider l'équipe `Booklist` à comprendre l'utilisation de l'option `shared`. ([doc](https://webpack.js.org/plugins/module-federation-plugin/#sharing-hints))

## Exercice

#### Mise à jour de `react`

1. Lancez le script `dev` :

```bash
pnpm dev
```

:::info
A chaque modification de la configuration Webpack, il vous faudra relancer `pnpm dev` pour qu'elle soit prise en compte.
:::

Ouvrez les devtools de votre navigateur sur l'onglet Network. Vous remarquerez que vos dépendances partagées (`react`, `react-dom`, `react-query` et `react-dom-router`) ne sont chargées qu'une seule fois depuis le _host_ ([localhost:3000](http://localhost:3000)). Les autres modules les réutilisent!

2. Si vous regardez vos devtools, la version de `react` est la 18.1.0.  
   L'équipe `Booklist` a à coeur d'avoir ses dépendances à jour et décide de mettre à jour `react` à la version 18.2.0.

Commencez par mettre à jour la version de `react` de l'app `Booklist` :

```diff title="apps/booklist/package.json"
   "dependencies": {
     "api": "workspace:*",
     "classnames": "^2.3.2",
     "css": "workspace:*",
     "query-provider": "workspace:*",
-    "react": "18.1.0",
-    "react-dom": "18.1.0",
+    "react": "18.2.0",
+    "react-dom": "18.2.0",
     "react-query": "^3.39.2",
     "react-router-dom": "^6.4.2"
   },
```

Installez à nouveau les dépendances : `pnpm i`.

L'équipe ne comprends pas encore le fonctionnement de l'option `shared`.  
Elle repart d'une configuration simple en ne spécifiant que la `requiredVersion`.

Mettez à jour les `requiredVersion` dans `Booklist` :

```diff title="apps/booklist/webpack.config.js"
    'react': {
-      requiredVersion: '^18.1.0',
+      requiredVersion: '^18.2.0',
    },
    'react-dom': {
-      requiredVersion: '^18.1.0',
+      requiredVersion: '^18.2.0',
    }
```

Exécutez à nouveau : `pnpm dev`

Depuis vos devtools, vous remarquerez que c'est toujours la version 18.2.0 qui est chargée mais depuis le remote `Booklist` ([localhost:3001](http://localhost:3001)) cette fois-ci.

:::info
Module Federation utilise le `Semantic Versionning` pour récupérer la version compatible la plus à jour. Ici le Host `Bookshelf` enregistre dans le contexte partagé `react:18.1.0` alors que `Booklist` enregistre `react:18.2.0`. Sachant que la dépendance `react` est spécifié via `^18.1.0` dans les `shared`, elle est compatible avec une montée de patch vers la version `18.2.0`, c'est donc la version `18.2.0` de `Booklist` qui est utilisée.
:::

3. Fixez la version de `react` de manière strict dans `Bookshelf` :

```diff title="apps/bookshelf/webpack.config.js"
    'react': {
-      requiredVersion: '^18.1.0',
+      requiredVersion: '18.1.0',
    },
    'react-dom': {
-      requiredVersion: '^18.1.0',
+      requiredVersion: '18.1.0',
    }
```

Relancez `pnpm dev`.

Ouchh si vous ouvrez vos devtools vous verrez 2 versions de `react` téléchargées.

L'option `singleton` à la rescousse! Rajoutez la à la configuration de `Bookshelf` :

```diff title="apps/bookshelf/webpack.config.js"
    'react': {
+     singleton: true,
      requiredVersion: '18.1.0',
    },
    'react-dom': {
+     singleton: true,
      requiredVersion: '18.1.0',
    },
```

On ne charge plus qu'une seule version de `react`.

:::info
L'option `singleton` utilise la version la plus élevée indépendamment du semantic versioning. Vous pouvez utiliser l'option `strictVersion` pour lancer une exception dès qu'il y a un mismatch de version.
:::

4. `react` est chargé depuis le remote `Booklist`([localhost:3001](http://localhost:3001)). Si nous voulons utiliser la version du _host_ quoiqu'il arrive nous pouvons utiliser la configuration suivante sur les remotes `Booklist` et `Book` :

```diff title="apps/booklist/webpack.config.js"
    'react': {
-     requiredVersion: '^18.2.0',
+     singleton: true,
+     requiredVersion: false,
+     version: '0',
    },
    'react-dom': {
-     requiredVersion: '^18.2.0',
+     singleton: true,
+     requiredVersion: false,
+     version: '0',
  },
```

```diff title="apps/book/webpack.config.js"
    'react': {
-     requiredVersion: '^18.1.0',
+     singleton: true,
+     requiredVersion: false,
+     version: '0',
    },
    'react-dom': {
-     requiredVersion: '^18.1.0',
+     singleton: true,
+     requiredVersion: false,
+     version: '0',
  },
```

En spécifiant `version: '0'`, ils utiliseront désormais la version de `react` du _host_ quoiqu'il arrive.

#### Partager le module `api` entre `Book` et `Booklist`

Depuis l'onglet Network des devtools, retrouvez le chargement du module `Booklist`. Vous y trouverez le chargement du package api ` ../../packages/api`. Bizarrement (ou pas) vous retrouvez ces mêmes fichiers chargés séparément à la fois par le module `Book` et par le module `Booklist` qui l'utilisent tous les deux. Les équipes aimeraient ne pas avoir à re-télécharger le module une 2nde fois.

1. Mettez à jour les configurations Webpack de `Book` et `Booklist` pour ne charger qu'une seule fois le module `api` :

```diff title="apps/booklist/webpack.config.js"
+   'api': {
+     singleton: true,
+     requiredVersion: false,
+   },
```

```diff title="apps/book/webpack.config.js"
+   'api': {
+     singleton: true,
+     requiredVersion: false,
+   },
```

2. Rejouez `pnpm dev`.  
   Testez l'application en ouvrant les devtools.  
   `api` n'est chargé qu'une seule fois lorsque vous naviguez entre la page `Book` et la page `Booklist`.

<Solution step="03" />
