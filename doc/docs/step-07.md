---
sidebar_position: 10
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 07

<Branch step="07" />

## Description

Vous faites partie de l'équipe `Book` et vous êtes bien embêté!  
Il y a un bug sur l'application qui ne se produit qu'en lançant l'intégralité de `Bookshelf` et pas en standalone sur `Book`. Vous devez donc tout lancer en mode dev mais votre machine est trop lente pour supporter 3 dev server webpack 🥺.
Vous cherchez à ne charger qu'un seul module en mode dev avec les autres modules déjà compilé pour soulager votre machine.

## Concept

Lancer votre application en mode dev : `pnpm dev`. 

Allez sur la version déployée de l'application : [https://workshop-module-federation-app.vercel.app/?dev=book](https://workshop-module-federation-app.vercel.app/?dev=book) avec le paramètre suivant `dev=book`.

Changez l'année par l'auteur dans `BooklistItem` :

```diff title="apps/book/src/BooklistItem"
-   <span className="italic text-slate-500">{book.year}</span>
+   <span className="italic text-slate-500">{book.author}</span>
```

Vos changements apparaissent sur [https://workshop-module-federation-app.vercel.app/?dev=book](https://workshop-module-federation-app.vercel.app/?dev=book) :astonished:

*Quoi ??! Mais commment est-ce possible ?*
## Exercice

**Charger un module dynamiquement.**

1. Utilisez l'API `promise` pour définir les remotes ([doc](https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes))

Jusqu'à présent, les urls des remotes étaient en dur.

Utilisez la doc webpack ([doc](https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes)) pour charger les remotes de `Bookshelf` et `Booklist` via l'api `promise` :

:::info
Vous avez à disposition une fonction utilitaire `resolveRemote` dans `configs/webpack/index` que vous pouvez réutiliser.
:::


```diff title="apps/bookshelf/webpack.config.js"
    remotes: {
-      booklist: `booklist@${isProd ? '/remote/booklist' : '//localhost:3001'}/remoteEntry.js`,
-      book: `book@${isProd ? '/remote/book' : '//localhost:3002'}/remoteEntry.js`,
+      booklist: resolveRemote({
+        key: 'booklist',
+        dev: 'http://localhost:3001',
+      })
+      book: resolveRemote({
+        key: 'book',
+        dev: 'http://localhost:3002',
+      })
    },
```

```diff title="apps/booklist/webpack.config.js"
    remotes: {
-      book: `book@${isProd ? '/remote/book' : '//localhost:3002'}/remoteEntry.js`,
+      book: resolveRemote({
+        key: 'book',
+        dev: 'http://localhost:3002',
+      })
    },
```

L'application doit se lancer en mode dev `pnpm dev` comme en mode prod `pnpm serve`.

2. L'équipe choisit d'ajouter un paramètre `dev` dans l'url afin de spécifier les modules à lancer en mode dev. L'objectif est d'avoir le module `Book` ou `Booklist` ou les deux en mode dev sur l'application [http://localhost:4000](http://localhost:4000) avec tous les autres modules en mode prod. (*eg.* [http://localhost:4000?dev=book](http://localhost:4000?dev=book) doit charger le module `Book` en mode dev)

Vous n'avez qu'à modifier `resolveRemote` pour se faire. A vous de jouer!

## Bonus

Faire en sorte qu'avec `Bookshelf` en mode dev ([http://localhost:3000](http://localhost:3000)) :

- Tout soit chargé par défaut depuis les bundlers de dev.
- On ne puisse avoir que `Bookshelf` en mode dev et les autres modules en mode prod.
- Choisir `http://localhost:4000` comme étant la production par défaut du mode dev. (On peut choisir n'importe quelle version déployée)

<Solution step="07" />
