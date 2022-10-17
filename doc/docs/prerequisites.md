---
sidebar_position: 1
---

# Prérequis

## Installation

Installer les binaires suivants :

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above
- [pnpm](https://pnpm.io/installation) version 7.x

Cloner le repository :

```bash
git clone https://github.com/nmorel/workshop-module-federation.git
```

Puis exécuter la commande suivante :

```bash
cd workshop-module-federation
git checkout step-00
pnpm i
```

:::info

Après avoir checkout une branche step-xx et lorsque vous modifiez des dépendances, rejouer cette commande pour bien mettre à jour les liens symboliques.  
Si vous n'avez pas internet, ajouter le flag `--offline`, il n'y aura pas de nouveaux packages à télécharger pendant le workshop une fois l'installation initiale effectuée.

:::

## Documentation

Pour avoir une version de la documentation hors-ligne ([localhost:4080](http://localhost:4080)) :

```bash
pnpm doc:serve
```

## Développement

Pour lancer l'application en mode dev ([localhost:3000](http://localhost:3000)) :

```bash
pnpm dev
```

## Prod

Pour builder et lancer l'application en mode prod ([localhost:4000](http://localhost:4000)) :

```bash
pnpm serve
```
