---
sidebar_position: 8
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 05

<Branch step="05" />

## Description

Maintenant que l'équipe `Book` se charge de `BooklistItem`, elle effectue des modifications et change le contrat d'interface du composant.
Malheureusement, personne ne s'aperçoit que l'application ne tourne plus 😱.

```diff title="apps/book/src/BooklistItem.tsx"

-export function BooklistItem({item, className = ''}: {item: Bookshelf.Book; className?: string}) {
+export function BooklistItem({book, index}: {book: Bookshelf.Book; index: number}) {
   return (
```

## Exercice

**Modifier la configuration Typescript pour avoir le bon typage dans `apps/booklist/src/Booklist.tsx`.**

Pour cela, nous allons utiliser le [path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) et les [project references](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference).

1. Ajoutez le [path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) et la [project reference](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference).

```diff title="apps/booklist/tsconfig.json"
 {
   "extends": "tsconfig/react-library.json",
-  "include": ["src/**/*", "src/**/*.json"]
+  "include": ["src/**/*", "src/**/*.json"],
+  "compilerOptions": {
+    "paths": {
+      "book/*": ["../book/src/*"]
+    }
+  },
+   "references": [{"path": "../book"}]
 }
```

2. Passez en `composite` tous les packages dans le fichier `configs/ts/base.json`.  
   Il s'agit d'un prérequis pour les [project references](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference).

```diff title="configs/ts/base.json"
   "compilerOptions": {
-    "composite": false,
+    "composite": true,
     "declaration": true,
```

3. Redémarrez le serveur Typescript de votre VSCode.  
   `Cmd/Ctrl + Shift + P` => `Typescript: Restart TS Server`.
   Vous devriez maintenant voir les soucis sur l'utilisation de `BooklistItem`.

4. Corrigez les erreurs dans `apps/booklist/src/Booklist.tsx`.

```diff title="apps/booklist/src/Booklist.tsx"
       <ul className="flex flex-col">
-        {booklist?.map((bookListItem) => (
+        {booklist?.map((bookListItem, index) => (
           <li key={bookListItem.slug}>
-            <BooklistItem item={bookListItem} className="hover:underline" />
+            <BooklistItem book={bookListItem} index={index} />
           </li>
         ))}
       </ul>
```

## Bonus 01

**Modifier la configuration Typescript pour avoir le bon typage dans `apps/bookshelf/src/App`.**

## Bonus 02

**Faire fonctionner le script `pnpm tscheck`.**

Avec les [project references](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference), `tsc` s'attend maintenant à avoir des fichiers de définitions .d.ts sur chacun de nos packages.  
Modifiez les scripts `tscheck` pour _emit_ les fichiers de définitions.

## Bonus 03

**Essayer le [plugin officiel](https://github.com/module-federation/nextjs-mf/tree/main/packages/typescript).**

Nous avons trouvé [la solution en pur TS](https://github.com/module-federation/module-federation-examples/tree/931ea0e5776d1b1f2c68217d9681e5912cda19ec/typescript-project-references) plus simple et plus adaptée à cet exemple mais vous pouvez essayer le plugin pour vous faire votre propre avis 😉.

<Solution step="05" />
