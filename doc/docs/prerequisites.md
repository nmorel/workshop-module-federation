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

Après avoir checkout une branche step-xx et lorsque vous modifiez des dépendances, rejouez la commande `pnpm i` pour bien mettre à jour les liens symboliques.  
Si vous n'avez pas internet, vous pouvez ajouter le flag `--offline`, il ne devrait pas y avoir de nouveaux packages à télécharger (🤞) pendant le workshop une fois l'installation initiale effectuée.

:::

import Commands from './partials/\_commands.mdx';

<Commands />
