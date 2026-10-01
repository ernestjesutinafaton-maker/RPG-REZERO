const nom = "Subaru";
let strength = 1;
let magic = 3;
let coins = 1;
let level = 0;
let classe = "";
const adversaires = ["fantome", "paladin", "loup"];
let possedeCle = false;
let possedeChapeau = false;
const objets = ["cle", "chapeau"];

const select_nom = document.getElementById('name');
const select_strength = document.getElementById('strength');
const select_magic = document.getElementById('magic');
const select_niveau = document.getElementById('level');
const select_coins = document.getElementById('coins');
const select_classe = document.getElementById('classe');
const select_possede_cle = document.getElementById('possedeCle');
const select_possede_chapeau = document.getElementById('possedeChapeau');
const select_message = document.getElementById('message');

const bouton_fantome = document.getElementById('battre_fantome');
const bouton_loup = document.getElementById('battre_loup');
const bouton_paladin = document.getElementById('battre_paladin');
const bouton_cle = document.getElementById('acheter_cle');
const bouton_chapeau = document.getElementById('acheter_chapeau');
const bouton_boss = document.getElementById('battre_le_boss');
const bouton_recommencer = document.getElementById('recommencer');

function verifierPersonnage(nom, strength, magic, coins) {
    const valide =
        typeof nom === "string" &&
        typeof strength === "number" &&
        typeof magic === "number" &&
        typeof coins === "number" &&
        strength >= 0 && strength <= 10 &&
        magic >= 0 && magic <= 10 &&
        coins >= 0;

    console.log(valide ? "Personnage valide" : "Personnage invalide");
    return valide;
}

function calculerNiveau() {
    level = strength + magic;
    return level;
}

function calculerClasse() {
    if (strength > 0 && strength >= magic * 2) {
        classe = "Guerrier";
    } else if (magic > 0 && magic >= strength * 2) {
        classe = "Mage";
    } else {
        classe = "Aventurier";
    }
    return classe;
}

function afficherPieces() {
    console.log("Pieces : " + coins);
    return coins;
}

function afficherMessage(message) {
    select_message.textContent = message;
}

function afficherPersonnage() {
    select_nom.textContent = nom;
    select_strength.textContent = strength;
    select_magic.textContent = magic;
    select_niveau.textContent = level;
    select_coins.textContent = coins;
    select_classe.textContent = classe;
    select_possede_cle.textContent = possedeCle ? "Oui" : "Non";
    select_possede_chapeau.textContent = possedeChapeau ? "Oui" : "Non";

    bouton_cle.disabled = possedeCle;
    bouton_chapeau.disabled = possedeChapeau;

    majImages();
}

function battreAdversaire(adversaire) {
    let message = "";

    if (adversaire == "fantome") {
        coins += 2;
        magic += 1;
        message = "Fantôme vaincu ! +2 pièces, +1 magie.";
    } else if (adversaire == "loup") {
        coins += 2;
        strength += 1;
        message = "Loup vaincu ! +2 pièces, +1 force.";
    } else if (adversaire == "paladin") {
        coins += 1;
        strength += 1;
        magic += 1;
        message = "Paladin vaincu ! +1 pièce, +1 force, +1 magie.";
    } else {
        afficherMessage("Adversaire inconnu.");
        return;
    }

    if (magic > 10) {
        magic = 10;
    }
    if (strength > 10) {
        strength = 10;
    }

    calculerNiveau();
    calculerClasse();

    if (level === 20) {
        message += " Niveau maximum atteint : le boss t'attend !";
    }

    afficherMessage(message);
    afficherPieces();
}

function acheterObjet(objet) {
    if (objet == "cle") {
        if (possedeCle === true) {
            afficherMessage("Tu possèdes déjà la clé.");
        } else if (coins >= 3) {
            coins -= 3;
            possedeCle = true;
            afficherMessage("Clé achetée avec succès ! (-3 pièces)");
        } else {
            afficherMessage("Achat impossible : il te faut 3 pièces pour la clé.");
        }
    } else if (objet == "chapeau") {
        if (possedeChapeau === true) {
            afficherMessage("Tu possèdes déjà le chapeau.");
        } else if (coins >= 5) {
            coins -= 5;
            possedeChapeau = true;
            afficherMessage("Chapeau acheté avec succès ! (-5 pièces)");
        } else {
            afficherMessage("Achat impossible : il te faut 5 pièces pour le chapeau.");
        }
    } else {
        afficherMessage("Objet inconnu.");
    }
    afficherPieces();
}

function battreBoss() {
    if (level < 20) {
        afficherMessage("Niveau insuffisant : il faut être niveau 20 (tu es niveau " + level + ").");
    } else if (possedeCle === false) {
        afficherMessage("Tu as le niveau, mais il te manque la clé pour ouvrir la salle du boss.");
    } else {
        coins += 10;
        possedeCle = false;
        afficherMessage("Victoire éclatante contre le boss ! +10 pièces. La clé est consommée.");
        afficherPieces();
        afficherResumeFinal();
    }
}

function recommencer() {
    strength = 1;
    magic = 3;
    coins = 1;
    possedeCle = false;
    possedeChapeau = false;
    calculerNiveau();
    calculerClasse();
    afficherMessage("Nouvelle partie !");
}

function afficherResumeFinal() {
    let resume = "--- RÉSUMÉ FINAL DU PERSONNAGE ---\n" +
                 "Nom : " + nom + "\n" +
                 "Force : " + strength + "\n" +
                 "Magie : " + magic + "\n" +
                 "Niveau : " + level + "\n" +
                 "Classe : " + classe + "\n" +
                 "Pièces d'or : " + coins + "\n" +
                 "Possède la clé : " + possedeCle + "\n" +
                 "Possède le chapeau : " + possedeChapeau;

    console.log(resume);
}

bouton_fantome.addEventListener("click", function () {
    battreAdversaire("fantome");
    afficherPersonnage();
});

bouton_loup.addEventListener("click", function () {
    battreAdversaire("loup");
    afficherPersonnage();
});

bouton_paladin.addEventListener("click", function () {
    battreAdversaire("paladin");
    afficherPersonnage();
});

bouton_cle.addEventListener("click", function () {
    acheterObjet("cle");
    afficherPersonnage();
});

bouton_chapeau.addEventListener("click", function () {
    acheterObjet("chapeau");
    afficherPersonnage();
});

bouton_boss.addEventListener("click", function () {
    battreBoss();
    afficherPersonnage();
});

bouton_recommencer.addEventListener("click", function () {
    recommencer();
    afficherPersonnage();
});

verifierPersonnage(nom, strength, magic, coins);
calculerNiveau();
calculerClasse();
afficherPersonnage();