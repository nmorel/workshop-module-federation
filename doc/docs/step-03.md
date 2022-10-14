---
sidebar_position: 6
---

import Branch from './partials/\_branch.mdx';
import Solution from './partials/\_solution.mdx';

# Étape 03

<Branch step="03" />

## Description

Que se cache-t-il derrière les `shared` options de Module Fédération ? 

## Explication

## Exercice

**Partager 2 versions différentes de react**

Ouvres tes dev tools de ton navigateur sur l'onglet Network. Tu remarqueras que tes dépendences partagés jusqu'à présent `react`, `react-dom`, `react-query` et `react-dom-router` ne sont chargés qu'une seule fois depuis le Host (localhost:3000). Les autres modules les réutilisent! Ceux qui connaissent `react` save qu'il ne peut pas y avoir 2 instances en parallèles. Tu peux d'ailleurs essayer d'enlever `react` des dépendences partagés pour voir ce qu'il se passe.


**Partager le module `api` entre `Book` et `Booklist`**

Depuis l'onglet Network des dev tools, retrouve le chargement du module `Booklist`. Tu y trouveras le chargement du package api ` ../../packages/api`. Bizarrement (ou pas) tu retrouves ces mêmes fichiers chargés une séparemment fois par le module `Book`. Les équipes aimerait ne pas avoir à retélécharger le module une 2ème fois.

1. Jouer avec les config 

<Solution step="03" />
