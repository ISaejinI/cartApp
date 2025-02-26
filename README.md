# Instant Café

Bienvenue dans **Instant Café**, une application de commerce électronique développée avec **React**, **Redux Toolkit** et **TypeScript**. Cette application permet aux utilisateurs de parcourir une liste de produits, d'ajouter des articles à leur panier et de gérer leurs favoris.

## Fonctionnalités

- **Affichage des produits** : Parcourez une liste de produits provenant de l'API [dummyjson](https://dummyjson.com/products).
- **Recherche** : Recherchez des produits spécifiques via la barre de recherche.
- **Pagination** : Naviguez entre les pages de produits.
- **Panier** : Ajoutez des produits au panier et gérez les quantités.
- **Liste de souhaits** : Ajoutez ou retirez des produits de votre liste de souhaits.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/ISaejinI/cartApp.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd cartApp
   ```

3. Installez les dépendances :

   ```bash
   # Avec npm

    npm install

    # Ou avec yarn

    yarn install

   ```

## Démarrage

Pour lancer l'application en mode développement

   ```bash
    # Avec npm

    npm run dev

    # Ou avec yarn

    yarn dev

   ```

## Structure du projet

```
cartApp/
│── src/                # Code source de l'application
│   ├── components/     # Composants réutilisables
│   ├── store/          # Configuration Redux (products, cart, wishlist)
│   ├── App.tsx         # Composant principal
│── public/             # Ressources images
│── index.html          # Fichier HTML principal
```

## API

Les données des produits sont récupérées depuis [dummyjson](https://dummyjson.com/products)
