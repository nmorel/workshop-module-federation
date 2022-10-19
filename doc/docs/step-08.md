---
sidebar_position: 11
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 08

<Branch step="08" />

## Description

L'équipe `Booklist` a bien bossé et a crée un super composant de liste (scroll infini, virtualisation, 120+ fps, animation d'entrée/sortie, la totale !).  
Mais maintenant la compilation avec `babel` montre ses limites et prend beaucoup de temps.

## Exercice

#### Utiliser un autre compilateur ([esbuild](https://github.com/privatenumber/esbuild-loader), [swc](https://github.com/swc-project/swc-loader)) sur le module `Booklist`.

#### Pour [esbuild](https://github.com/privatenumber/esbuild-loader)

1. Ajoutez les dépendances nécessaires.

```diff title="apps/booklist/package.json"
   "devDependencies": {
     "@types/react": "18.0.21",
     "@types/react-dom": "^18.0.6",
+    "esbuild-loader": "^2.20.0",
     "eslint": "8.25.0",
     "tsconfig": "workspace:*",
     "typescript": "^4.8.4",
```

2. Remplacer le loader `babel` par le loader `esbuild`.

```diff title="apps/booklist/webpack.config.js"
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
```

#### Pour [swc](https://github.com/swc-project/swc-loader)

1. Ajoutez les dépendances nécessaires.

```diff title="apps/booklist/package.json"
   "devDependencies": {
+    "@swc/core": "^1.3.4",
     "@types/react": "18.0.21",
     "@types/react-dom": "^18.0.6",
     "eslint": "8.25.0",
+    "swc-loader": "^0.2.3",
     "tsconfig": "workspace:*",
```

2. Remplacer le loader `babel` par le loader `swc`.

```diff title="apps/booklist/webpack.config.js"
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
```

#### Vérifier que le nouveau compilateur fonctionne

```bash
pnpm i
pnpm serve
```

## Bonus

#### Utiliser un autre compilateur sur le module `Book`.

<Solution step="08" />
