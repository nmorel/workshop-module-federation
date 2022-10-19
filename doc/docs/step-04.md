---
sidebar_position: 7
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 04

<Branch step="04" />

## Description

L'équipe `Book` souhaite faire évoluer l'affichage des livres dans la liste.  
Elle en détient les connaissances métier et elle souhaite rapatrier le composant dans son module afin de l'exposer à `Booklist`.

## Exercice

#### Déplacer le composant `apps/booklist/src/BooklistItem` dans `apps/book` et l'exposer via Module Federation.

:::info
Depuis l'onglet Network de vos devtools, vous remarquerez qu'un module (ici `Book`) est capable d'exposer plusieurs composants (`BooklistItem` & `Book`) sans pour autant avoir à tous les télécharger dès que le module est sollicité.  
Sur la page d'accueil, seul le composant `BooklistItem` est chargé et le composant `Book`, utilisé en asynchrone (`React.lazy`), n'est chargé que lorsque l'on visite la page des livres pour la 1ère fois.
:::

<Solution step="04" />
