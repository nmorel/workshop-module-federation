---
sidebar_position: 9
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 06

<Branch step="06" />

## Description

Les équipes sont contentes, elles peuvent développer en toute autonomie.  
Mais ce n'est pas le cas de l'équipe OPS car ils ne peuvent plus déployer l'application !  
En effet, `Bookshelf` cherche à télécharger les `remoteEntry.js` de `Booklist` et de `Book` depuis `localhost`.

## Exercice

**Générer un bundle pouvant être déployer n'importe où.**

Pour simplifier l'exercice et éviter d'avoir à configurer un nginx ou autre, nous allons créer un bundle contenant notre _host_ et nos deux _remote_ app sous une même arborescence.
Ce bundle sera déployable sur n'importe quel serveur de fichier.

L'arborescence sera la suivante :

- `/`: les fichiers de notre _host_ `Bookshelf`
- `/remote/booklist`: les fichiers du _remote_ `Booklist`
- `/remote/book`: les fichiers du _remote_ `Book`

Le script générant ce bundle est déjà présent (`apps/bookshelf-bundle/scripts/build.mts`).  
Il vous reste donc à modifier la configuration.

1. Déplacez le script `serve` (qui ne fonctionnait plus depuis l'étape 01 😱) vers le nouveau package `bookshelf-bundle`.

```diff title="apps/bookshelf/package.json"
   "scripts": {
     "build": "NODE_ENV=production webpack",
     "dev": "webpack serve",
     "lint": "eslint src/",
-    "serve": "serve -s -p 4000 ./dist",
     "tscheck": "tsc --noEmit"
   },
```

```diff title="apps/bookshelf-bundle/package.json"
   "scripts": {
     "build": "NODE_ENV=production ts-node-esm --swc -- ./scripts/build.mts",
     "lint": "eslint scripts/",
+    "serve": "serve -s -p 4000 ./dist",
     "tscheck": "tsc --noEmit"
   },
```

2. Ajoutez le script `build` sur les _remotes_.

```diff title="apps/book/package.json"
   "scripts": {
+    "build": "NODE_ENV=production webpack",
     "dev": "webpack serve",
     "lint": "eslint src/",
     "tscheck": "tsc"
   },
```

```diff title="apps/booklist/package.json"
   "scripts": {
+    "build": "NODE_ENV=production webpack",
     "dev": "webpack serve",
     "lint": "eslint src/",
     "tscheck": "tsc"
   },
```

3. MàJ la configuration du plugin Module Federation pour remplacer les urls vers `//localhost` par `/remote/xxx`.  
   (Bonus) Utilisez la variable d'environnement `NODE_ENV` pour différencier la production du dev et ainsi conserver `//localhost` en dev.

4. Vérifiez que vos modifications fonctionnent en lançant le script `serve`.

```bash
pnpm serve
```

## Bonus

**Rendre le script plus générique et éviter d'avoir tous les chemins en dur.**

<Solution step="06" />
