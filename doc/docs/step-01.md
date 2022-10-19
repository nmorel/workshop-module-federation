---
sidebar_position: 4
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 01

<Branch step="01" />

## Description

L'application de `Bookshelf` grossit et nous avons désormais 2 équipes travaillant sur le projet, une pour la vue liste et une pour la vue de détails d'un roman.  
Pour augmenter l'autonomie et la productivité de ces équipes, nous allons mettre en place Module Federation.

## Exercice

#### Charger le composant `Booklist` via Module Federation.

#### Dans `packages/booklist` :

1. Ajoutez le script `dev` dans le `package.json`. Nous avons déjà ajouté les devDependencies pour webpack.

```diff title="packages/booklist/package.json"
   "scripts": {
+    "dev": "webpack serve",
     "lint": "eslint src/",
     "tscheck": "tsc --noEmit"
   },
```

2. Créez un fichier `webpack.config.js`.

```js title="packages/booklist/webpack.config.js"
const {createConfig} = require('webpack-config')
const {ModuleFederationPlugin} = require('webpack').container

module.exports = createConfig('Booklist', {
  output: {
    // Voir https://webpack.js.org/concepts/module-federation/#infer-publicpath-from-script
    publicPath: 'auto',
  },
  devServer: {
    // Nous utilisons un port différent que Bookshelf afin de lancer tous les serveurs de dev en parallèle
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'TODO',
      filename: 'TODO',
      exposes: {
        TODO: 'TODO',
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: '18.1.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.1.0',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.4.2',
        },
        'react-query': {
          singleton: true,
          requiredVersion: '^3.39.2',
        },
      },
    }),
  ],
})
```

:::info

`webpack-config` est un package interne fournissant une configuration Webpack par défaut.  
Vous pouvez la surcharger en passant à la fonction `createConfig` une config Webpack en second paramètre.  
Le merge est effectué à l'aide de [webpack-merge](https://github.com/survivejs/webpack-merge).

:::

3. Configurez le plugin Module Federation en remplaçant les TODO.  
   `booklist` est un `remote` module qui doit exposer le composant `Booklist`.  
   Aidez-vous de l'exemple situé [ici](./intro/module-federation.md/#signification-des-param%C3%A8tres).

#### Dans `apps/bookshelf` :

1. Supprimez la dépendance `booklist`, vous n'en aurez plus besoin !  
   Puis rejouez la commande `pnpm i` pour appliquer la suppression.

```diff title="apps/bookshelf/package.json"
   "dependencies": {
     "book": "workspace:*",
-    "booklist": "workspace:*",
     "css": "workspace:*",
     "query-provider": "workspace:*",
     "react": "18.2.0",
     "react-dom": "18.2.0",
     "react-query": "^3.39.2",
     "react-router-dom": "^6.4.2"
   },
```

2. Configurez le plugin Module Federation.  
   Il s'agit du `host` qui va charger le `remote` module `booklist`.  
   Aidez-vous de l'exemple situé [ici](./intro/module-federation.md/#signification-des-param%C3%A8tres).

3. Modifiez l'import vers le composant `Booklist` dans le fichier `app/bookshelf/src/App.tsx`.  
   Aidez-vous de l'exemple situé [ici](./intro/module-federation.md/#signification-des-param%C3%A8tres).  
   Typescript ne sera pas content, ajouter un `// @ts-ignore`, nous y reviendrons plus tard 😉

#### Vérifier que tout fonctionne

1. Jouez la commande `pnpm dev`, elle va lancer les scripts `dev` de `bookshelf` et `booklist`.
1. Vérifiez que l'application fonctionne à l'adresse suivante : [http://localhost:3000](http://localhost:3000).
   Si ce n'est pas le cas, vérifiez votre configuration et ce [schéma](./intro/module-federation.md/#signification-des-param%C3%A8tres).
1. Dans vos devtools, onglet Network, regardez les fichiers JS chargés.
   Le composant `Booklist` est chargé depuis le port 3001.

## Bonus 01

#### Charger le composant `Book` via Module Federation.

## Bonus 02

#### Charger les composants `Booklist` et `Book` en asynchrone (hint: `React.lazy`).

## Bonus 03

#### Récupérer les versions des librairies shared depuis le package.json.

<Solution step="01" />
