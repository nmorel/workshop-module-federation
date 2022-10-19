---
sidebar_position: 5
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 02

<Branch step="02" />

## Description

Les équipes souhaitent désormais développer sur leur périmètre sans avoir à lancer le reste de l'application.

## Exercice

#### Lancer l'application `Booklist` en standalone

#### Dans `packages/booklist` :

Le point d'entrée `index.ts` est déjà spécifié dans la config Webpack par défaut.

Au lieu d'exporter le composant exposé, on souhaite créer un point d'entrée capable de charger le module en standalone.

1. Créez un fichier `App.tsx` en vous inspirant de celui de `Bookshelf`.  
   Au lieu d'utiliser `BrowserRouter`, vous pouvez utiliser `MemoryRouter` avec une unique route vers `Booklist` :

```tsx title="packages/booklist/src/App.tsx"
<MemoryRouter initialEntries={['/']}>
  <div className="px-8">
    <Routes>
      <Route path="/" element={<Booklist />} />
    </Routes>
  </div>
</MemoryRouter>
```

2. Copiez/collez le fichier `bootstrap.tsx` de `Bookshelf` et chargez le depuis l'`index.ts` :

```ts title="packages/booklist/src/index.ts"
import('./bootstrap')
```

3. Lancez `Booklist` uniquement en standalone :

```bash
pnpm run -F booklist dev
```

Ouvrez l'application `Booklist` sur [localhost:3001](http://localhost:3001).

:::info
Ouchh les styles ne sont pas appliqués.  
Précédemment c'était l'application host `Bookshelf` qui les chargeaient.  
Il faut désormais que `Booklist` soit capable de les charger.
:::info

4. Chargez le css en ajoutant l'import dans `index.ts` :

```ts title="packages/booklist/src/index.ts"
import 'css/dist/index.css'
import('./bootstrap')
```

N'oubliez pas de spécifier la dépendance `css` :

```diff title="packages/booklist/package.json"
  "dependencies": {
    "api": "workspace:*",
    "classnames": "^2.3.2",
+   "css": "workspace:*",
```

Réinstallez les dépendances via `pnpm i`

Testez à nouveau l'application `Booklist` en lançant la commande :

```bash
pnpm run -F booklist... --parallel dev
```

L'équipe `Booklist` peut désormais travailler sur son périmètre en s'affranchissant des autres modules de l'application!

5. `Booklist` est un point d'entrée séparé.  
   Vous pouvez déplacer le répertoire dans `/apps` pour qu'elle reflète ce changement.

:::info
Au lieu d'importer le fichier `bootstrap.tsx` dynamiquement, essayez de l'importer statiquement via `import './bootstrap'`.  
Oops... `Shared module is not available for eager consumption`.  
En enlevant le chargement asynchrone, Webpack n'est plus capable de charger toutes les librairies requises par `bootstrap.tsx`.  
Les librairies `shared` comme `react` ne sont disponibles qu'en asynchrone sans le mode `eager`.  
https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption
:::

## Bonus

#### Lancer l'application `Book` en standalone

L'équipe `Book` est jalouse! Elle est encore obligée de lancer toute l'application pour travailler sur son périmètre. Aidez les à lancer leur application en standalone.

:::info
Configurez le router pour afficher un livre par défaut à l'aide de `initialEntries` :

```tsx
<MemoryRouter initialEntries={[`/books/${defaultBook.slug}`]}>
```

:::

<Solution step="02" />
