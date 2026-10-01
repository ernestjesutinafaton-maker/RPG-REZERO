/* ==========================================================
   images.js — gestion des images et des barres (affichage seul)
   Lit l'état du jeu défini dans index.js (strength, magic,
   level, possedeCle, possedeChapeau) et met à jour les visuels.
   Appelle  majImages()  à la fin de afficherPersonnage().
   ========================================================== */

const NIVEAU_MAX = 20;   // niveau du boss
const STAT_MAX   = 10;   // plafond visuel force / magie

const IMAGES_PERSO = {
    base:         "assets/subaru.png",
    chapeau:      "assets/subaru_avec_chapeau.png",
    cle:          "assets/subaru_avec_cle.png",
    cleEtChapeau: "assets/subaru_avec_cle_et_chapeau.png",
    // Pas d'image « niveau max » fournie : on ajoute juste l'aura CSS.
    // Si tu en crées une, mets son chemin ici, ex. "assets/subaru_max.png"
    niveauMax:    null
};

/* Choisit l'image du personnage selon ce qu'il possède */
function choisirImagePerso(chapeau, cle, niveau) {
    if (niveau >= NIVEAU_MAX && IMAGES_PERSO.niveauMax) return IMAGES_PERSO.niveauMax;
    if (chapeau && cle) return IMAGES_PERSO.cleEtChapeau;
    if (chapeau)        return IMAGES_PERSO.chapeau;
    if (cle)            return IMAGES_PERSO.cle;
    return IMAGES_PERSO.base;
}

/* Largeur d'une barre en % (bornée entre 0 et 100) */
function pourcentage(valeur, max) {
    return Math.max(0, Math.min(100, (valeur / max) * 100));
}

/* Met à jour image, barres et thème de niveau max.
   Sans argument, lit les variables globales d'index.js. */
function majImages(etat) {
    const e = etat || {
        chapeau: typeof possedeChapeau !== "undefined" ? possedeChapeau : false,
        cle:     typeof possedeCle     !== "undefined" ? possedeCle     : false,
        niveau:  typeof level          !== "undefined" ? level          : 0,
        force:   typeof strength       !== "undefined" ? strength       : 0,
        magie:   typeof magic          !== "undefined" ? magic          : 0
    };

    // 1. Image du personnage
    const img = document.querySelector("#img_perso");
    img.src = choisirImagePerso(e.chapeau, e.cle, e.niveau);

    // 2. Aura de niveau max
    document.querySelector(".portrait-cadre")
            .classList.toggle("niveau-max", e.niveau >= NIVEAU_MAX);

    // 3. Barre de niveau de la bannière (0 → 20)
    document.querySelector("#barre_niveau").style.width = pourcentage(e.niveau, NIVEAU_MAX) + "%";

    // 4. Barres force / magie (plafonnées visuellement à 10)
    document.querySelector("#barre_force").style.width = pourcentage(e.force, STAT_MAX) + "%";
    document.querySelector("#barre_magie").style.width = pourcentage(e.magie, STAT_MAX) + "%";
}

// Premier affichage au chargement
document.addEventListener("DOMContentLoaded", () => majImages());
