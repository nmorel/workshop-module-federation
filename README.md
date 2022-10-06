# Workshop Module Federation

[Slides](https://docs.google.com/presentation/d/1KyICd4iQKsE5fCh82sbRvj-XYVa_aqh6sKtljDmNwFo/edit?usp=sharing)

Biblio de Jules Verne.

Le projet utilise Turborepo (ajouter un lien vers la doc) et pnpm (ajouter un lien vers la doc). Lien vers les workspace ?  
Appli react / TS / Tailwind / webpack

# Prérequis

Installer les binaires suivants :

- Node 16
- pnpm >= 7

Puis executer la commande suivante :

```bash
pnpm i
```

Après avoir checkout une branche step-x et lorsque vous modifiez des dépendances, rejouer cette commande pour bien mettre à jour les liens symboliques.  
Si vous n'avez pas internet, ajouter le flag `--offline`, il n'y aura pas de nouveaux packages à télécharger pendant le workshop une fois l'install initiale effectuée.

Pour lancer en mode dev (http://localhost:3000) :

```bash
pnpm dev
```

Pour builder et lancer en mode prod (http://localhost:4000) :

```bash
pnpm serve
```

# Step 0

Dans apps/bookshelf, on a notre appli web.  
Dans configs, de la conf eslint / ts / prettier. Vous ne devriez pas y toucher pendant ce workshop.
Dans packages se trouvent quelques api, lib et composants réutilisables.
