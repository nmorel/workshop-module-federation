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

## Exercice

**Charger un module dynamiquement.**

1. Utilisez des promesses pour définir les remotes ([doc](https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes))

Jusqu'à présent, les urls des remotes étaient en dur dans la config :

```js
      remotes: {
        booklist: `booklist@${isProd ? '/remote/booklist' : '//localhost:3001'}/remoteEntry.js`,
        book: `book@${isProd ? '/remote/book' : '//localhost:3002'}/remoteEntry.js`,
      },
```

Utilisez la doc webpack ([doc](https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes)) pour charger les remotes de `Bookshelf` et `Booklist` via des promesses.

:::info
Un de vos collègues a déja lu la doc et il vous a mis à disposition une fonction utilitaire `resolveRemote` dans `configs/webpack/index` que vous pouvez réutiliser.
:::

L'application doit se lancer en mode dev `pnpm dev` comme en mode prod `pnpm serve`.

2. L'équipe choisit d'ajouter un paramètre `dev` dans l'url afin de spécifier les modules à lancer en mode dev ie. `book`, `booklist`. L'objectif est d'avoir le module `Book` en mode dev sur l'application `localhost:4000?dev=book` avec tous les autres modules en mode production.

:::info
Ne pas oublier de changer les config de `Booklist` et de `Bookshelf` pour la résolution du remote `Book` soit cohérente entre les deux.
:::

## Bonus

Faire en sorte qu'en mode dev :

- Par défaut tout soit chargé depuis les bundler de dev.
- On ne puisse avoir que le Host `Bookshelf` en mode dev.
- Choisir `localhost:4000` comme étant la production du mode dev. (On peut choisir n'importe quelle version déployée)

<Solution step="07" />
