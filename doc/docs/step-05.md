---
sidebar_position: 8
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 05

<Branch step="05" />

## Description

L'équipe `Book` change le contrat d'interface du composant `BooklistItem` et l'équipe `Booklist` ne s'en aperçoit pas 😱.

## Exercice

**Modifier la configuration Typescript pour avoir le bon typage dans `apps/booklist/src/Booklist`.**

Pour cela, utilisez le [Path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) et les [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference).  
Pour info, tous les fichiers de configuration TS étendent de `configs/ts/base.json`.

## Bonus 01

**Modifier la configuration Typescript pour avoir le bon typage dans `apps/bookshelf/src/App`.**

## Bonus 02

**Essayer le [plugin officiel](https://github.com/module-federation/typescript).**

Nous avons trouvé la solution en pur TS plus simple et plus adapté à cet exemple mais vous pouvez l'essayer pour vous faire votre propre avis 😉.

<Solution step="05" />
