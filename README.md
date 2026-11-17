# RPG Re:Zero

Un mini jeu de rôle dans le navigateur, inspiré de l'univers de *Re:Zero*.
Tu incarnes **Subaru** : bats des adversaires pour gagner de la force, de la magie et des pièces,
achète des objets chez le marchand, puis affronte le boss.

## Règles

- **Combats**
  - Fantôme : +2 pièces, +1 magie
  - Loup : +2 pièces, +1 force
  - Paladin : +1 pièce, +1 force, +1 magie
- **Niveau** : force + magie. Chacune plafonne à 10, donc le niveau maximum est 20.
- **Classe**, selon tes statistiques :
  - **Guerrier** si ta force vaut au moins le double de ta magie ;
  - **Mage** dans le cas inverse ;
  - **Aventurier** sinon.
- **Le marchand** vend la clé (3 pièces) et le chapeau (5 pièces). L'image de Subaru change selon ce qu'il porte.
- **Le boss** : il faut être niveau 20 **et** avoir la clé pour ouvrir sa salle.
- Le **journal de jeu** raconte chaque action, et « Recommencer » remet tout à zéro.

## Technologies

HTML, CSS et JavaScript, sans librairie : manipulation du DOM et gestion des événements.

| Fichier | Rôle |
|---|---|
| `index.html` | la page du jeu : fiche personnage, combats, marchand, boss, journal |
| `index.js` | la logique du jeu (statistiques, niveau, classe, achats, boss) |
| `images.js` | l'affichage : images du personnage et barres de progression |
| `style.css` | la mise en page |
| `assets/` | les images (personnage, marchand, boss) |

## Jouer

Ouvre `index.html` dans un navigateur, sans rien installer.
