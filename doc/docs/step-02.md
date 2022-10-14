---
sidebar_position: 5
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 02

<Branch step="02" />

## Description

Les squads souhaiteraient désormais développer sur leur périmètre sans avoir à lancer le reste de l'application.

## Exercice

**Lancer l'application `Booklist` en standalone.**

### Dans `packages/booklist` :

Le point d'entrée `index.ts` est déjà spécifié dans la config Webpack par défaut. 

Au lieu d'exporter le composant exposé, on souhaite créer un point d'entrée capable de charger le module en standalone.

1. Créer un fichier `bootstrap.tsx` en vous inspirant de celui du Host `Bookshelf`. Au lieux de charger le composant `App`, on pourra rediriger vers `Booklist` avec une route unique :

```
      <MemoryRouter initialEntries={['/']}>
        <div className="px-8">
          <Routes>
            <Route path="/" element={<Booklist />} />
          </Routes>
        </div>
      </MemoryRouter>
``` 

2. Charger `bootstrap.tsx` depuis l'`index.ts` :

```
import('./bootstrap')
```

3. Lancer `Booklist` uniquement en standalone : 

```
pnpm run -C 'apps/booklist' dev
```

:::info
Tester l'application sur le port 3001
Ouchh les styles ne sont pas appliqués.
Précédemment c'était l'application Host `Bookshelf` qui les chargaient. Il faut désormais que `Booklist` soit capable de les charger.
:::


4. Charge le css via en ajoutant l'import :
```
import 'css/dist/index.css'
```

Tester à nouveau l'application `Booklist`. La squad `Booklist` peut désormais travailler sur son périmètre en s'affranchissant des autres modules de l'application!

5. `Booklist` est un point d'entrée séparé. Vous pouvez déplacer le répertoire dans `/apps` pour qu'elle reflète ce changement.

## Bonus

**Lancer l'application `Book` en standalone.**

La squad `Book` est jalouse! Elle est encore obligé de lancer toute l'application pour travailler sur son périmètre. Aidez les à lancer leur application en standalone.

<Solution step="02" />
