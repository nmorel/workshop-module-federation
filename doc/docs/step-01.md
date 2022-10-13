---
sidebar_position: 4
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 01

<Branch step="01" />

## Description

L'équipe de Bookshelf grossit et souhaite créer 2 squads, une pour la page de listing et une pour la page de description d'un livre.  
Pour augmenter l'autonomie et la productivité de ces squads, nous allons utiliser Module Federation.

## Exercice

**Charger le composant `Booklist` via Module Federation.**

### Dans `packages/booklist` :

1. Ajouter le script de build et les devDependencies pour webpack dans le `package.json`

```diff title="packages/booklist/package.json"
   "scripts": {
+    "dev": "webpack serve",
     "lint": "eslint src/",
     "tscheck": "tsc --noEmit"
   },
   "devDependencies": {
     "@types/react": "18.0.21",
     "@types/react-dom": "^18.0.6",
     "eslint": "8.25.0",
     "tsconfig": "workspace:*",
-    "typescript": "^4.8.4"
+    "typescript": "^4.8.4",
+    "webpack": "^5.74.0",
+    "webpack-cli": "^4.10.0",
+    "webpack-config": "workspace:*",
+    "webpack-dev-server": "^4.11.1"
   }
```

2. Créer un fichier `webpack.config.js`.

```js title="packages/booklist/webpack.config.js"
const {createConfig} = require('webpack-config')

module.exports = createConfig('Booklist', {
  output: {
    // 'auto' so resources are loaded from the correct location
    // see https://webpack.js.org/concepts/module-federation/#infer-publicpath-from-script
    publicPath: 'auto',
  },
  devServer: {
    // use a different port than Bookshelf to be able to launch all the dev server in parallel
    port: 3001,
  },
  plugins: [
    // Add Module Federation plugin configuration here
  ],
})
```

:::info

`webpack-config` est un package interne fournissant une configuration Webpack par défaut.  
Vous pouvez la surcharger en passant à la fonction `createConfig` une config Webpack en second paramètre.  
Le merge est effectué à l'aide de [webpack-merge](https://github.com/survivejs/webpack-merge).

:::

3. Configurer le plugin Module Federation.  
   Il s'agit d'un _remote_ qui doit exposer le composant `Booklist`.  
   Inspirez-vous de l'exemple situé [ici](./intro/module-federation.md/#exemple).

### Dans `apps/bookshelf` :

1. Supprimer la dépendance `booklist`, vous n'en aurez plus besoin !  
   Puis rejouer la commande `pnpm i --offline` pour appliquer la suppression.

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

2. Configurer le plugin Module Federation.  
   Il s'agit du _host_. Inspirez-vous de l'exemple situé [ici](./intro/module-federation.md/#exemple).

3. Modifier l'import vers le composant `Booklist` dans le fichier `app/bookshelf/src/App.tsx`.  
   Typescript ne sera pas content, ajouter un `// @ts-ignore`, nous y reviendrons plus tard 😉

### Vérifier que tout fonctionne

1. Jouer la commande `pnpm dev`, elle va lancer les scripts `dev` de `bookshelf` et `booklist`.
1. Vérifier que l'application fonctionne à l'adresse suivante : [http://localhost:3000](http://localhost:3000).  
   Si ce n'est pas le cas, vérifier votre configuration et notamment la partie `shared` 🙂
1. Dans vos devtools, onglet Network, regarder les fichiers JS chargés.  
   Le composant `Booklist` est chargé depuis le port 3001.

## Bonus 01

**Charger le composant `Book` via Module Federation.**

## Bonus 02

**Charger les composants `Booklist` et `Book` en asynchrone (hint: `React.lazy`).**

<Solution step="01" />
