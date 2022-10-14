---
sidebar_position: 11
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 08

<Branch step="08" />

## Description

La squad `Booklist` a bien bossé et a crée un super composant de liste (scroll infini, virtualisation, 120+ fps, animation d'entrée/sortie, la totale !).  
Mais maintenant la compilation avec babel montre ses limites et prend beaucoup de temps.

## Exercice

**Utiliser un autre compilateur (esbuild ou swc) sur le module `Booklist`.**

### Pour `esbuild`

1. Ajouter la nouvelle dépendance.

```diff title="apps/booklist/package.json"
   "devDependencies": {
     "@types/react": "18.0.21",
     "@types/react-dom": "^18.0.6",
+    "esbuild-loader": "^2.20.0",
     "eslint": "8.25.0",
     "tsconfig": "workspace:*",
     "typescript": "^4.8.4",
     "webpack": "^5.74.0",
     "webpack-cli": "^4.10.0",
     "webpack-config": "workspace:*",
     "webpack-dev-server": "^4.11.1"
   }
```

2. Surcharger la règle par défaut pour les fichiers js/ts.

```diff title="apps/booklist/webpack.config.js"
   devServer: {
     port: 3001,
   },
+  module: {
+    rules: [
+      {
+        test: /\.[jt]sx?$/,
+        exclude: /node_modules/,
+        use: {
+          loader: 'esbuild-loader',
+          options: {
+            loader: 'tsx',
+            target: 'esnext',
+          },
+        },
+      },
+    ],
+  },
   plugins: [
     new ModuleFederationPlugin({
       name: 'booklist',
```

### Pour `swc`

1. Ajouter la nouvelle dépendance.

```diff title="apps/booklist/package.json"
   "devDependencies": {
+    "@swc/core": "^1.3.4",
     "@types/react": "18.0.21",
     "@types/react-dom": "^18.0.6",
     "eslint": "8.25.0",
+    "swc-loader": "^0.2.3",
     "tsconfig": "workspace:*",
     "typescript": "^4.8.4",
     "webpack": "^5.74.0",
     "webpack-cli": "^4.10.0",
     "webpack-config": "workspace:*",
     "webpack-dev-server": "^4.11.1"
   }
```

2. Surcharger la règle par défaut pour les fichiers js/ts.

```diff title="apps/booklist/webpack.config.js"
   devServer: {
     port: 3001,
   },
+  module: {
+    rules: [
+      {
+        test: /\.[jt]sx?$/,
+        exclude: /node_modules/,
+        use: {
+          loader: 'swc-loader',
+        },
+      },
+    ],
+  },
   plugins: [
     new ModuleFederationPlugin({
       name: 'booklist',
```

## Bonus

**Utiliser un autre compilateur (esbuild ou swc) sur le module `Book`.**

La squad `Book` est de nouveau jalouse, changer également son compilateur.

<Solution step="08" />
