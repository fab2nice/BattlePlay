
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    update,
    onValue,
    onChildAdded,
    remove,
    runTransaction,
    onDisconnect,
    push,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhvh33VvY1xhSgz3LDllBhGQlCundULa8",
  authDomain: "battleplay-fc422.firebaseapp.com",
  databaseURL: "https://battleplay-fc422-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "battleplay-fc422",
  storageBucket: "battleplay-fc422.firebasestorage.app",
  messagingSenderId: "308517201149",
  appId: "1:308517201149:web:ad1bf9cd6998b749828a94",
  measurementId: "G-7C3P8BQ59P"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const accueil = document.getElementById("accueil");
const compteurParties =
    document.getElementById(
        "compteurParties"
    );
const lobby = document.getElementById("lobby");
const partiesPubliques =
    document.getElementById(
        "partiesPubliques"
    );
const jeu = document.getElementById("jeu");
const howToPlay =
    document.getElementById("howToPlay");
const finPartie = document.getElementById("finPartie");

const champPseudo = document.getElementById("pseudo");
const partiePublique =
    document.getElementById(
        "partiePublique"
    );
const champCode = document.getElementById("codePartie");

const boutonCreer = document.getElementById("creerPartie");
const boutonRejoindre = document.getElementById("boutonRejoindre");
const connectProfile =
    document.getElementById(
        "connectProfile"
    );

const profileModal =
    document.getElementById(
        "profileModal"
    );
console.log(profileModal);
const cancelProfile =
    document.getElementById(
        "cancelProfile"
    );
const boutonCommencer = document.getElementById("commencer");
const boutonNouvellePartie = document.getElementById("nouvellePartie");
const boutonRejouer = document.getElementById("rejouer");
const changerMode =
    document.getElementById("changerMode");
    console.log(changerMode);

const codeLobby = document.getElementById("codeLobby");
const listeJoueurs = document.getElementById("listeJoueurs");

const plateau = document.getElementById("plateau");
const affichageTour = document.getElementById("tour");
const affichageTimer =
    document.getElementById("timer");
   

const affichageScore = document.getElementById("score");
const affichageCouleurs =
    document.getElementById("etatCouleurs");
   const readySwitch =
    document.getElementById(
        "readySwitch"
    );
const affichageScoresJoueurs = document.getElementById("scores");
const classement = document.getElementById("classement");
const sonJoueur =
    new Audio("sons/joueur.mp3");
const reglesDuel =
    document.getElementById("reglesDuel");
    const salonVideo =
    document.getElementById(
        "salonVideo"
    );
    const chatLobby =
    document.getElementById("chatLobby");

const messageChat =
    document.getElementById("messageChat");

const envoyerMessage =
    document.getElementById("envoyerMessage");
   const badgeJoueurs =
    document.getElementById("badgeJoueurs");

const modeLobby =
    document.getElementById("modeLobby");

    const chatAccueilRef =
    ref(db, "chatAccueil");

    const chatAccueil =
    document.getElementById("chatAccueil");
    

const messageAccueil =
    document.getElementById("messageAccueil");

const envoyerAccueil =
    document.getElementById("envoyerAccueil");
    const saveProfile =
    document.getElementById("saveProfile");
  
    const profileNickname =
    document.getElementById("profileNickname");

const profilePassword =
    document.getElementById("profilePassword");

const profileConfirmPassword =
    document.getElementById("profileConfirmPassword");
    

const profileCountry = document.getElementById("profileCountry");
const loginProfile =
    document.getElementById("loginProfile");
    const logoutProfile =
    document.getElementById("logoutProfile");
    const viewProfileModal =
    document.getElementById(
        "viewProfileModal"
    );

const viewProfileContent =
    document.getElementById(
        "viewProfileContent"
    );

const closeProfile =
    document.getElementById(
        "closeProfile"
    );
    closeProfile.addEventListener(
    "click",
    function () {

        viewProfileModal.style.display =
            "none";

    }
);
    
    

let codePartieActuelle = "";
let pseudoActuel = "";
let monNumero = 0;
let partieActuelle = null;
let intervalTimer = null;
let timerTraite = false;
let joueurExcluDetecte = false;
let tutorielVu = false;
let ancienNombreJoueurs = 0;
let anciensJoueurs = [];
let derniereNotification = 0;
let premiereLectureNotifications = true;
let joueursEnLigne = 0;
let nombrePartiesPubliques = 0;
let profilConnecte = null;

const profilSauvegarde =
    localStorage.getItem(
        "profilConnecte"
    );

if (profilSauvegarde) {

    reconnecterProfil(
        profilSauvegarde
    );

}

const cartesDeBase = [

"images/humainarc.png","images/humainarc.png",
"images/humainepee.png","images/humainepee.png",
"images/humainhache.png","images/humainhache.png",


"images/orcarc.png","images/orcarc.png",
"images/orcepee.png","images/orcepee.png",
"images/orchache.png","images/orchache.png",


"images/nainarc.png","images/nainarc.png",
"images/naindague.png","images/naindague.png",
"images/nainhache.png","images/nainhache.png",


"images/elfearc.png","images/elfearc.png",
"images/elfedague.png","images/elfedague.png",
"images/elfeepee.png","images/elfeepee.png",


];
const cartesDeBase3Joueurs = [
    "images/humainarc.png","images/humainarc.png",
"images/humainepee.png","images/humainepee.png",
"images/humainhache.png","images/humainhache.png",
"images/humainmagicien.png", "images/humainmagicien.png",

"images/nainarc.png","images/nainarc.png",
"images/naindague.png","images/naindague.png",
"images/nainhache.png","images/nainhache.png",
"images/nainpioche.png","images/nainpioche.png",

"images/elfearc.png","images/elfearc.png",
"images/elfedague.png","images/elfedague.png",
"images/elfeepee.png","images/elfeepee.png",
"images/elfemagie.png","images/elfemagie.png",


];
const cartesDeBaseDuel = [

    "images/humainarc.png","images/humainarc.png",
"images/humainepee.png","images/humainepee.png",
"images/humainhache.png","images/humainhache.png",
"images/humainlance.png","images/humainlance.png",
"images/humainmagicien.png", "images/humainmagicien.png",
"images/humainlmasse.png", "images/humainlmasse.png",

"images/nainarc.png","images/nainarc.png",
"images/naindague.png","images/naindague.png",
"images/nainhache.png","images/nainhache.png",
"images/nainpioche.png","images/nainpioche.png",
"images/nainchamane.png", "images/nainchamane.png",
"images/nainmasse.png", "images/nainmasse.png",
    

    "images/sablier.png", "images/sablier.png",
    "images/grimoire.png", "images/grimoire.png"

];
async function updatePartie(
    partieRef,
    donnees
) {

    return await update(
        partieRef,
        donnees
    );

}

function prechargerImages() {

    const images =
        [...new Set(cartesDeBase)];

    images.push("images/dos.png");

    for (let chemin of images) {

        const image =
            new Image();

        image.src =
            chemin;

    }

}
function surveillerPartiesPubliques() {

    const partiesRef =
        ref(db, "parties");

    onValue(partiesRef, function (snapshot) {

        const parties =
            snapshot.val();

        partiesPubliques.innerHTML = "";

        if (!parties) {
            return;
        }

        for (let code in parties) {

            const partie =
                parties[code];
                if (
    partie.publique !== true
    
) {
    continue;
    
}
                const age =
    Date.now() -
    (partie.dateCreation || 0);

if (
    age >
    15 * 60 * 1000
) {
    continue;
}

            if (
                partie.etat !== "lobby"
            ) {
                continue;
            }

            const nbJoueurs =
                Object.keys(
                    partie.joueurs
                ).length;

            const mode =
                partie.mode || 4;
                if (nbJoueurs >= mode) {
    continue;
}

            let nomMode;

if (mode === 2) {

    nomMode = "🎯 Duel";

} else if (mode === 3) {

    nomMode = "👥 3 Players";

} else {

    nomMode = "👥 4 Players";

}

partiesPubliques.innerHTML +=
    '<button class="partiePublique" onclick="rejoindrePartiePublique(\'' +
    code +
    '\')">' +
    nomMode +
    "<br>" +
    "By " +
    partie.createur +
    "<br>" +
    nbJoueurs +
    " / " +
    mode +
    " players" +
    "</button><br>";

        }

    });

}
function surveillerJoueursEnLigne() {

    const joueursEnLigne =
        document.getElementById(
            "joueursEnLigne"
        );

    onValue(

        ref(db, "presence"),

        function (snapshot) {

            joueursEnLigne.innerHTML = "";

            if (!snapshot.exists()) {

                joueursEnLigne.innerHTML =
                    "<i>No player online.</i>";

                return;
                

            }

            const joueurs =
                snapshot.val();
                let nbGuests = 0;

           for (let id in joueurs) {

    const profil =
    joueurs[id].pseudo;

if (profil === "") {

    nbGuests++;

    continue;

}

const pseudo =
    profil.nickname;

    if (pseudo === "") {

        continue;

    }

    const div =
        document.createElement("div");

    div.innerHTML =
        "<span style='cursor:pointer;color:#ffd700;font-weight:bold'>" +
        pseudo +
        "</span>";

    div.onclick = function () {

        voirProfil(
            pseudo
        );

    };

    joueursEnLigne.appendChild(
        div
    );

}
if (nbGuests > 0) {

    const divGuest =
        document.createElement("div");

    divGuest.innerHTML =
        "👥 Guests : " +
        nbGuests;

    joueursEnLigne.appendChild(
        divGuest
    );

}

        }

    );

}

function genererCode() {
    const lettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";

    for (let i = 0; i < 4; i++) {
        code += lettres[Math.floor(Math.random() * lettres.length)];
    }

    return code;
}

function melangerCartes(tableau) {
    const copie = [...tableau];

    copie.sort(function () {
        return Math.random() - 0.5;
    });

    return copie;
}

function afficherScores(scores) {

    let texte = "🏆 Scores<br><br>";

    const joueurs =
        partieActuelle.joueurs;

    for (let pseudo in joueurs) {

        const numero =
            joueurs[pseudo].numero;
            let icone = "";

if (numero === 1) {
    icone = "🔵";
}

if (numero === 2) {
    icone = "🔴";
}

if (numero === 3) {
    icone = "🟡";
}

if (numero === 4) {
    icone = "🟢";
}

        texte +=
    icone +
    " " +
    pseudo +
    " : " +
    scores[numero - 1];
if (
    partieActuelle.createur === pseudoActuel &&
    pseudo !== pseudoActuel
) {
    texte +=
    ' <span style="cursor:pointer;color:red;font-weight:bold;" onclick="exclureJoueur(\'' +
    pseudo +
    '\')"> ❌</span>';
}

texte += "<br>";

    }

    affichageScoresJoueurs.innerHTML =
        texte;

}


function afficherFinPartie(scores) {
    let meilleurScore = Math.max(...scores);
    let gagnants = [];

    for (let i = 0; i < scores.length; i++) {
        if (scores[i] === meilleurScore) {
            gagnants.push(i + 1);
        }
    }

    classement.innerHTML =
        "J1 : " + scores[0] + " paire(s)<br>" +
        "J2 : " + scores[1] + " paire(s)<br>" +
        "J3 : " + scores[2] + " paire(s)<br>" +
        "J4 : " + scores[3] + " paire(s)<br><br>" +
        "🥇 Vainqueur(s) : Joueur(s) " + gagnants.join(", ");

    jeu.style.display = "none";
    finPartie.style.display = "block";
    boutonNouvellePartie.style.display = "block";
}

function nouvellePartie() {
    location.reload();
}

function afficherDos(bouton) {
    bouton.innerHTML = "<img src='images/dos.png'>";
}

function afficherCarte(bouton, carte) {
    bouton.innerHTML = "<img src='" + carte + "'>";
}
function lancerTimer() {
    

if (affichageTimer) {
        affichageTimer.style.display = "none";
    }

    return;

    if (intervalTimer !== null) {
        clearInterval(intervalTimer);
    }

    intervalTimer = setInterval(async function () {

        if (
            !partieActuelle ||
            !partieActuelle.game
        ) {
            return;
        }

        const tempsRestant = Math.max(
            0,
            Math.ceil(
                (
                    partieActuelle.game.timerFin -
                    Date.now()
                ) / 1000
            )
        );

        affichageTimer.innerHTML =
            "⏱️ " +
            tempsRestant;

        if (
            tempsRestant <= 0 &&
            timerTraite === false
        ) {

            timerTraite = true;

            if (
                monNumero !==
                partieActuelle.game.joueurActuel
            ) {
                return;
            }

            await gererExpirationTimer();

        }

    }, 200);

}
async function gererExpirationTimer() {

    const partieRef =
        ref(
            db,
            "parties/" +
            codePartieActuelle
        );

    const snapshot =
        await get(partieRef);

    if (!snapshot.exists()) {
        return;
    }

    const partie =
        snapshot.val();

    const game =
        partie.game;

    const selection =
        game.selection || [];
        console.log(
    "Expiration timer, selection =",
    selection.length
);

    const cartesVisibles =
        game.cartesVisibles || {};

    let prochainJoueur =
        game.joueurActuel + 1;

    if (prochainJoueur > 4) {
        prochainJoueur = 1;
    }

    if (selection.length === 1) {

        const indexCarte =
            selection[0];

        cartesVisibles[indexCarte] =
            false;

    }

    if (selection.length < 2) {

        console.log(
    "Passage au joueur",
    prochainJoueur
);

        await update(partieRef, {

            "game/cartesVisibles":
                cartesVisibles,

            "game/selection":
                [],

    "game/verrouille":
        false,

            "game/joueurActuel":
                prochainJoueur,

            "game/timerFin":
                Date.now() + 20000

        });

    }
    

}
function afficherEtatCouleurs(cartesTrouvees, cartes) {

    let humain = 0;
let nain = 0;
let elfe = 0;
let orque = 0;

    for (let index in cartesTrouvees) {

        if (
            cartesTrouvees[index] !== true
        ) {
            continue;
        }

        const carte =
            cartes[index];

        if (
            carte.includes("humain")
        ) {
            humain++;
        }

        if (
            carte.includes("nain")
        ) {
            nain++;
        }

        if (
            carte.includes("elfe")
        ) {
            elfe++;
        }

        if (
            carte.includes("orque")
        ) {
            orque++;
        }

    }

   const restantHumain =
    3 - humain / 2;

const restantNain =
    3 - nain / 2;

const restantElfe =
    3 - elfe / 2;

const restantOrque =
    3 - orque / 2;
affichageCouleurs.innerHTML = "🔵 Humans : " + restantHumain + " | 🔴 Dwarves : " + restantNain + " | 🟡 Elves : " + restantElfe + " | 🟢 Orcs : " + restantOrque;

}
function dessinerPlateau(partie) {
    partieActuelle = partie;
   
    timerTraite = false;
    lancerTimer();
    const cartes = partie.plateau;
    const game = partie.game;

    const cartesVisibles = game.cartesVisibles || {};
    const cartesTrouvees = game.cartesTrouvees || {};
    const scores = game.scores || [0, 0, 0, 0];
    const joueurActuel = game.joueurActuel || 1;
    const pairesTrouvees = game.pairesTrouvees || 0;
    let pseudoTour = "Joueur " + joueurActuel;

for (let pseudo in partie.joueurs) {

    if (
        partie.joueurs[pseudo].numero ===
        joueurActuel
    ) {

        pseudoTour = pseudo;
        break;

    }

}

    plateau.innerHTML = "";

    affichageTour.innerHTML =
    "▶ " +
    pseudoTour.toUpperCase() +
    "'S TURN ◀";
    const tempsRestant = Math.max(
    0,
    Math.ceil(
        (game.timerFin - Date.now()) / 1000
    )
);

affichageTimer.innerHTML =
    "⏱️ " +
    tempsRestant;
    affichageTour.className = "joueur" + joueurActuel;

    affichageScore.innerHTML = "Score : " + pairesTrouvees;
    afficherScores(scores);
    afficherEtatCouleurs(
    cartesTrouvees,
    cartes
);

    for (let i = 0; i < cartes.length; i++) {
        const bouton = document.createElement("button");

        const visible = cartesVisibles[i] === true;
        const trouvee = cartesTrouvees[i] === true;

        if (visible || trouvee) {
            afficherCarte(bouton, cartes[i]);
        } else {
            afficherDos(bouton);
        }

        if (trouvee || game.verrouille === true) {
            bouton.disabled = true;
        }

        bouton.addEventListener("click", function () {
            console.error("CLICK", i);
            jouerCarte(i);
        });

        plateau.appendChild(bouton);
    }

    const victoireBattle =
     verifierVictoireBattle(
        cartesTrouvees,
        cartes,
        partie.joueurs
    );
    

if (
    victoireBattle === false &&
    pairesTrouvees === cartes.length / 2
) {
    afficherFinPartie(scores);
}
}
function traiterStatistiques(
    partie,
    cartesTrouvees,
    cartes
) {

    console.log("traiterStatistiques appelée");

for (let pseudo in partie.joueurs) {

        const numero =
            partie.joueurs[pseudo].numero;

        if (
            joueurEstNaked(
                numero,
                cartesTrouvees,
                cartes
            )
        ) {

            console.log(
                pseudo +
                " est devenu NAKED"
            );

        }

    }

}
function joueurEstNaked(
    numeroJoueur,
    cartesTrouvees,
    cartes
) {

    const factionsJoueurs = {
    1: "humain",
    2: "nain",
    3: "elfe",
    4: "orque"
};

const faction =
    factionsJoueurs[numeroJoueur];

    let cartesTrouveesCouleur = 0;

    for (let index in cartesTrouvees) {

        if (
            cartesTrouvees[index] !== true
        ) {
            continue;
        }

        if (
    cartes[index].includes(faction)
) {
    cartesTrouveesCouleur++;
}
    }

    let seuilNaked = 6;

if (
    partieActuelle &&
    partieActuelle.mode === 2
) {

    seuilNaked = 12;

} else if (
    partieActuelle &&
    partieActuelle.mode === 3
) {

    seuilNaked = 8;

}

return cartesTrouveesCouleur >= seuilNaked;

}

function trouverProchainJoueur(
    joueurActuel,
    cartesTrouvees,
    cartes,
    joueurs
) {

    let prochainJoueur =
        joueurActuel;

    for (let i = 0; i < 4; i++) {

        prochainJoueur++;

        if (prochainJoueur > 4) {
            prochainJoueur = 1;
        }

        let joueurExiste =
            false;

        for (let pseudo in joueurs) {

            if (
                joueurs[pseudo].numero ===
                prochainJoueur
            ) {
                joueurExiste = true;
            }

        }

        if (
            joueurExiste === true &&
            joueurEstNaked(
                prochainJoueur,
                cartesTrouvees,
                cartes
            ) === false
        ) {

            return prochainJoueur;

        }

    }

    return joueurActuel;

}


async function verifierVictoireBattle(
    cartesTrouvees,
    cartes,
    joueurs
) {

    let joueursEncoreHabilles = [];

    for (let pseudo in joueurs) {

        const numero =
            joueurs[pseudo].numero;

        if (
            joueurEstNaked(
                numero,
                cartesTrouvees,
                cartes
            ) === false
        ) {

            joueursEncoreHabilles.push(
                pseudo
            );

        }

    }

    if (joueursEncoreHabilles.length === 1) {

        classement.innerHTML =
    "🏆 VICTORY<br><br>" +
    "⚔️ Winner: " + joueursEncoreHabilles[0] + "<br><br>" +
    "All enemy factions have been defeated.";

        jeu.style.display = "none";
        finPartie.style.display = "block";
        boutonNouvellePartie.style.display = "block";
 incrementerStatProfil(
    joueursEncoreHabilles[0],
    "victories"
);
        return true;

    }

    return false;

}


async function jouerCarte(indexCarte) {
     console.error("jouerCarte", indexCarte);
    if (codePartieActuelle === "") {
        return;
    }
const partieRef =
    ref(
        db,
        "parties/" +
        codePartieActuelle
    );

const snapshot =
    await get(partieRef);

if (!snapshot.exists()) {
    return;
}


    const partie = snapshot.val();
    const cartes = partie.plateau;
    const game = partie.game;
    const cartesTrouvees =
    game.cartesTrouvees || {};

if (
    joueurEstNaked(
        monNumero,
        cartesTrouvees,
        cartes
    )
) {
    return;
}
    if (monNumero !== game.joueurActuel) {
    return;
}

    if (!game || game.verrouille === true) {
        return;
    }

    const cartesVisibles = game.cartesVisibles || {};
    
    const selection = game.selection || [];
    const scores = game.scores || [0, 0, 0, 0];

    if (cartesTrouvees[indexCarte] === true) {
        return;
    }

    if (cartesVisibles[indexCarte] === true) {
        return;
    }

    const bonusGrimoire = game.bonusGrimoire || {};

const limiteSelection =
    bonusGrimoire[game.joueurActuel] === true
        ? 3
        : 2;

if (selection.length >= limiteSelection) {
    return;
}

    cartesVisibles[indexCarte] = true;
    selection.push(indexCarte);

    if (selection.length === 1) {
        await update(partieRef, {
            "game/cartesVisibles": cartesVisibles,
            "game/selection": selection
        });

        return;
    }
    if (
    bonusGrimoire[game.joueurActuel] === true &&
    selection.length === 2
) {
    await update(partieRef, {
        "game/cartesVisibles": cartesVisibles,
        "game/selection": selection
    });

    return;
}

    let premiereIndex = selection[0];
let deuxiemeIndex = selection[1];

const grimoireActif =
    bonusGrimoire[game.joueurActuel] === true;

if (grimoireActif && selection.length === 3) {

    const index1 = selection[0];
    const index2 = selection[1];
    const index3 = selection[2];

    if (cartes[index1] === cartes[index2]) {

        premiereIndex = index1;
        deuxiemeIndex = index2;

    } else if (cartes[index1] === cartes[index3]) {

        premiereIndex = index1;
        deuxiemeIndex = index3;

    } else if (cartes[index2] === cartes[index3]) {

        premiereIndex = index2;
        deuxiemeIndex = index3;
    }
}
let carteRestanteGrimoire = null;

if (grimoireActif && selection.length === 3) {
    carteRestanteGrimoire =
        selection.find(index =>
            index !== premiereIndex &&
            index !== deuxiemeIndex
        );
}
console.error("Avant le if");
    if (cartes[premiereIndex] === cartes[deuxiemeIndex]) {
console.log("Paire trouvée");
    cartesTrouvees[premiereIndex] = true;
    cartesTrouvees[deuxiemeIndex] = true;
    if (grimoireActif) {

    bonusGrimoire[game.joueurActuel] = false;

    if (carteRestanteGrimoire !== null) {
        cartesVisibles[carteRestanteGrimoire] = false;
    }
}
    let bonusSablier = game.bonusSablier || {};

if (cartes[premiereIndex].includes("sablier")) {
    bonusSablier[game.joueurActuel] = true;
}

if (cartes[premiereIndex].includes("grimoire")) { bonusGrimoire[game.joueurActuel] = true; }
console.log("BONUS GRIMOIRE :", bonusGrimoire);

    traiterStatistiques(
        partie,
        cartesTrouvees,
        cartes
    );

    scores[game.joueurActuel - 1]++;
    const prochainJoueurApresPaire =
    joueurEstNaked(
        game.joueurActuel,
        cartesTrouvees,
        cartes
    )
        ? trouverProchainJoueur(
            game.joueurActuel,
            cartesTrouvees,
            cartes,
            partie.joueurs
        )
        : game.joueurActuel;

        await update(partieRef, {

    "game/cartesVisibles": cartesVisibles,
    "game/cartesTrouvees": cartesTrouvees,
    "game/selection": [],
    "game/scores": scores,
    "game/pairesTrouvees": game.pairesTrouvees + 1,
    "game/joueurActuel": prochainJoueurApresPaire,
    "game/bonusSablier": bonusSablier,
    "game/bonusGrimoire": bonusGrimoire,
    "game/timerFin": Date.now() + 20000

});

        return;
    }

    await update(partieRef, {
        "game/cartesVisibles": cartesVisibles,
        "game/selection": selection,
        "game/verrouille": true
    });

    setTimeout(async function () {
        const nouveauSnapshot = await get(partieRef);

        if (!nouveauSnapshot.exists()) {
            return;
        }

        const nouvellePartie = nouveauSnapshot.val();
        const nouveauGame = nouvellePartie.game;

        const nouvellesCartesVisibles =
            nouveauGame.cartesVisibles || {};

        nouvellesCartesVisibles[premiereIndex] = false;
        nouvellesCartesVisibles[deuxiemeIndex] = false;
        if (grimoireActif && selection.length === 3) {
    const troisiemeIndex = selection[2];
    nouvellesCartesVisibles[troisiemeIndex] = false;
}

      let bonusSablier =
    nouveauGame.bonusSablier || {};
let nouveauBonusGrimoire =
    nouveauGame.bonusGrimoire || {};

if (grimoireActif) {
    nouveauBonusGrimoire[nouveauGame.joueurActuel] = false;
}
let prochainJoueur;

if (bonusSablier[nouveauGame.joueurActuel] === true) {

    // Le joueur consomme son sablier et garde la main
    prochainJoueur = nouveauGame.joueurActuel;

    bonusSablier[nouveauGame.joueurActuel] = false;

} else {

    prochainJoueur =
        trouverProchainJoueur(
            nouveauGame.joueurActuel,
            nouveauGame.cartesTrouvees || {},
            cartes,
            nouvellePartie.joueurs
        );
}
        await update(partieRef, {
    "game/cartesVisibles": nouvellesCartesVisibles,
    "game/selection": [],
    "game/verrouille": false,
    "game/joueurActuel": prochainJoueur,
    "game/bonusSablier": bonusSablier,
    "game/bonusGrimoire": nouveauBonusGrimoire,
    "game/timerFin": Date.now() + 20000
});

    }, 1200);
}
window.exclureJoueur =
async function (nom) {

    if (
        confirm(
            "Remove " +
            nom +
            " from the game?"
        ) === false
    ) {
        return;
    }

    const partieRef =
        ref(
            db,
            "parties/" +
            codePartieActuelle
        );

    const snapshot =
        await get(partieRef);

    if (!snapshot.exists()) {
        return;
    }

    const partie =
        snapshot.val();

    const joueurs =
        partie.joueurs || {};

    const joueurExclu =
        joueurs[nom];

    if (!joueurExclu) {
        return;
    }

    await remove(
        ref(
            db,
            "parties/" +
            codePartieActuelle +
            "/joueurs/" +
            nom
        )
    );

    delete joueurs[nom];

    if (!partie.game) {
        return;
    }

    const joueurActuel =
        partie.game.joueurActuel;

    let joueurActuelExiste =
        false;

    for (let pseudo in joueurs) {

        if (
            joueurs[pseudo].numero ===
            joueurActuel
        ) {
            joueurActuelExiste = true;
        }

    }

    if (joueurActuelExiste) {
        return;
    }

    let prochainJoueur =
        joueurActuel;

    for (let i = 0; i < 4; i++) {

        prochainJoueur++;

        if (prochainJoueur > 4) {
            prochainJoueur = 1;
        }

        for (let pseudo in joueurs) {

            if (
                joueurs[pseudo].numero ===
                prochainJoueur
            ) {

                await update(partieRef, {
                    "game/joueurActuel": prochainJoueur,
                    "game/verrouille": false,
                    "game/selection": []
                });

                return;

            }

        }

    }

};
function surveillerJoueurs(code) {

    const joueursRef =
        ref(db, "parties/" + code + "/joueurs");

    onValue(joueursRef, function (snapshot) {

        const joueurs =
            snapshot.val();
           
           
        listeJoueurs.innerHTML = "";

        if (!joueurs) {
            return;
        }
        const totalJoueurs =
    Object.keys(joueurs).length;

const joueursReady =
    Object.values(joueurs)
        .filter(j => j.ready)
        .length;

compteurReady.innerHTML =
    "Ready Players : " +
    joueursReady +
    " / " +
    totalJoueurs;

       if (
    joueurs[pseudoActuel]
) {

    readySwitch.checked =
        joueurs[pseudoActuel].ready === true;

}

        for (let nom in joueurs) {

            let statut =
                joueurs[nom].ready
                    ? "🟢 "
                    : "⚪ ";

            let ligne =
    "<li class='carteJoueur'>" +

        "<div class='nomJoueur' onclick=\"voirProfil('" +
nom +
"')\">" +
            statut +
            nom +
        "</div>" +

        "<div class='etatJoueur'>" +
           (joueurs[nom].ready
    ? "✅ READY"
    : "⏳ WAITING") +
        "</div>";
            if (
                partieActuelle &&
                partieActuelle.createur === pseudoActuel &&
                nom !== pseudoActuel
            ) {

                ligne +=
                    ' <button class="bouton-exclure" onclick="exclureJoueur(\'' +
                    nom +
                    '\')">❌</button>';

            }

            ligne += "</li>";

            listeJoueurs.innerHTML += ligne;

        }

    });

}

function surveillerPartie(code) {

    const partieRef =
        ref(db, "parties/" + code);

    onValue(partieRef, function (snapshot) {

        const partie =
            snapshot.val();

        if (!partie) {
            return;
        }

        let maxJoueurs = 4;

        if (partie.mode === 2) {

            maxJoueurs = 2;

        }
        else if (partie.mode === 3) {

            maxJoueurs = 3;

        }

        const nbJoueurs =
            Object.keys(
                partie.joueurs || {}
            ).length;

        badgeJoueurs.innerHTML =
            nbJoueurs +
            " / " +
            maxJoueurs;

        if (partie.mode === 2) {

            modeLobby.innerHTML =
                "Mode : Duel";

        }
        else if (partie.mode === 3) {

            modeLobby.innerHTML =
                "Mode : 3 Players";

        }
        else {

            modeLobby.innerHTML =
                "Mode : 4 Players";

        }

        partieActuelle = partie;
        if (
    partie.etat === "lobby" &&
    Object.keys(partie.joueurs || {}).length === 3
) {

    conseilMode.style.display = "block";

} else {

    conseilMode.style.display = "none";

}

        // <<< À partir d'ici, tu gardes exactement ton code actuel >>>

if (
    partie.etat === "lobby" &&
    partie.createur === pseudoActuel
) {

    
    commencer.style.display =
        "inline-block";

} else {

   
    commencer.style.display =
        "none";

}
    
    if (
        pseudoActuel &&
        partie.joueurs &&
        !partie.joueurs[pseudoActuel] &&
        joueurExcluDetecte === false
    ) {
        joueurExcluDetecte = true;
        alert("You have been excluded.");
        location.reload();
        return;
    }

    if (partie.etat === "jeu" && partie.plateau && partie.game) {

    accueil.style.display = "none";
    lobby.style.display = "none";
    finPartie.style.display = "none";

    jeu.style.display = "block";
           
            if (partie.mode === 2) {

    reglesDuel.style.display = "block";

} else {

    reglesDuel.style.display = "none";

}
            boutonNouvellePartie.style.display = "none";

            dessinerPlateau(partie);
        }
    });
}


boutonCreer.addEventListener("click", async function () {
    pseudoActuel = champPseudo.value.trim();
    const partiesRef =
    ref(db, "parties");

const snapshot =
    await get(partiesRef);

if (snapshot.exists()) {

    const parties =
        snapshot.val();

    for (let code in parties) {

        const partie =
            parties[code];

       if (

    partie.createur === pseudoActuel &&

    partie.etat === "lobby"

) {
    console.log("Lobby existant trouvé :", code);

    codePartieActuelle = code;

    accueil.style.display = "none";
    lobby.style.display = "block";
    jeu.style.display = "none";
    finPartie.style.display = "none";

    codeLobby.innerHTML =
        code;

    surveillerChat();
    surveillerJoueurs(code);
    surveillerNotifications(code);
    surveillerPartie(code);

    return;

}
    }

}
    const modeChoisi =
    parseInt(
        document.querySelector(
            'input[name="modeJoueurs"]:checked'
        ).value
    );

    if (pseudoActuel === "") {
        alert("Choose nickname");
        return;
    }

    codePartieActuelle = genererCode();

    await set(ref(db, "parties/" + codePartieActuelle), {
    createur: pseudoActuel,
    mode: modeChoisi,
    etat: "lobby",
    publique:
    partiePublique.checked,
    dateCreation: Date.now(),
    chat: {},

  joueurs: {
        [pseudoActuel]: {
            numero: 1
        }
    }
    
});
monNumero = 1;

await incrementerStat(
    "partiesCreees"
);

    codeLobby.innerHTML = codePartieActuelle;

    accueil.style.display = "none";
    lobby.style.display = "block";
    jeu.style.display = "none";
    surveillerChat();
    finPartie.style.display = "none";

    surveillerJoueurs(codePartieActuelle);
    surveillerNotifications(codePartieActuelle);
    surveillerPartie(codePartieActuelle);
});
envoyerAccueil.addEventListener(
    "click",
    envoyerMessageAccueil
);
messageAccueil.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            envoyerMessageAccueil();

        }

    }
);

boutonRejoindre.addEventListener("click", async function () {
    pseudoActuel = champPseudo.value.trim();
    codePartieActuelle = champCode.value.trim().toUpperCase();

    if (pseudoActuel === "") {
        alert("Choose nickname");
        return;
    }

    if (codePartieActuelle === "") {
        alert("Enter game code");
        return;
    }

    const partieRef = ref(db, "parties/" + codePartieActuelle);
    const snapshot = await get(partieRef);

    if (!snapshot.exists()) {
        alert("part not found");
        return;
    }

    const partie = snapshot.val();
    if (partie.etat === "enCours") {
    alert("The game has already begun");
    return;
}

const nbJoueurs =
    Object.keys(partie.joueurs).length;

const mode =
    partie.mode || 4;

if (nbJoueurs >= mode) {

    alert(
        "the game is complete"
    );

    return;

}

let numerosUtilises = [];

for (let nom in partie.joueurs) {

    numerosUtilises.push(
        partie.joueurs[nom].numero
    );

}

for (let i = 1; i <= mode; i++) {

    if (
        numerosUtilises.includes(i) === false
    ) {

        monNumero = i;
        break;

    }

}

await updatePartie(
    ref(
        db,
        "parties/" +
        codePartieActuelle +
        "/joueurs"
    ),
    {
        [pseudoActuel]: {
            numero: monNumero
        }
    }
);

await envoyerNotification(
    codePartieActuelle,
    "join",
    pseudoActuel
);
await incrementerStat(
    "partiesRejointes"
);

    codeLobby.innerHTML = codePartieActuelle;

    accueil.style.display = "none";
    lobby.style.display = "block";
    surveillerChat();
    jeu.style.display = "none";
    finPartie.style.display = "none";

    surveillerJoueurs(codePartieActuelle);
    surveillerNotifications(codePartieActuelle);
    surveillerPartie(codePartieActuelle);
});

envoyerMessage.addEventListener(
    "click",
    envoyerMessageChat
);

boutonCommencer.addEventListener("click", async function () {
    if (
    partieActuelle.createur !==
    pseudoActuel
) {
    return;
}

    if (codePartieActuelle === "") {
        alert("no game in progress");
        return;
    }

    const partieRef =
        ref(db, "parties/" + codePartieActuelle);

    const snapshot =
        await get(partieRef);

    if (!snapshot.exists()) {
        return;
    }

    const partie =
        snapshot.val();
        const joueurs =
    partie.joueurs || {};

const tousReady =
    Object.values(joueurs)
        .every(joueur => joueur.ready === true);

if (!tousReady) {
    alert("All players must be ready before starting.");
    return;
}

    const nbJoueurs =
    Object.keys(partie.joueurs).length;

const mode =
    partie.mode || 4;

if (nbJoueurs < mode) {

    alert(
        "You need " +
        mode +
        " players to start"
    );

    return;

}
let cartes;

if (partie.mode === 2) {

    cartes = cartesDeBaseDuel;

} else if (partie.mode === 3) {

    cartes = cartesDeBase3Joueurs;

} else {

    cartes = cartesDeBase;

}

const plateauMelange =
    melangerCartes(cartes);
        await update(partieRef, {
        etat: "jeu",
        plateau: plateauMelange,
        game: {
            cartesVisibles: {},
            cartesTrouvees: {},
            selection: [],
            verrouille: false,
            joueurActuel: 1,
            scores: [0, 0, 0, 0],
            pairesTrouvees: 0,
            timerFin: Date.now() + 20000, 
            
        }
    });
    for (let pseudo in joueurs) {

    await incrementerStatProfil(
        pseudo,
        "gamesPlayed"
    );

}
    await incrementerStat(
    "partiesDemarrees"
);
    
    

});
connectProfile.addEventListener(
    "click",
    function () {
         console.log("Create Profile");

        profileModal.style.display =
            "block";

    }
);
logoutProfile.addEventListener("click", function () {

    profilConnecte = null;

    localStorage.removeItem(
        "profilConnecte"
    );

    pseudo.disabled = false;

    pseudo.value = "";

    connectProfile.innerHTML =
        "👤<br>Connect";

    logoutProfile.style.display =
        "none";

});

cancelProfile.addEventListener(
    "click",
    function () {

        profileModal.style.display =
            "none";

    }
);

boutonNouvellePartie.addEventListener("click", nouvellePartie);
boutonRejouer.addEventListener("click", nouvellePartie);


prechargerImages();
surveillerPresence();
compterJoueursEnLigne();
compterPartiesOuvertes();
nettoyerAnciennesParties();
surveillerChatAccueil();
surveillerJoueursEnLigne();

if (
    sessionStorage.getItem(
        "playbattleVisite"
    ) === null
) {

    compterVisiteur();

}
async function surveillerPresence() {

    const identifiant =
        pseudoActuel !== ""
            ? pseudoActuel
            : "Visiteur-" + Date.now();

    const connectedRef =
        ref(db, ".info/connected");

    const presenceRef =
        ref(
            db,
            "presence/" + identifiant
        );

    onValue(
        connectedRef,
        async function (snapshot) {

            if (snapshot.val() !== true) {
                return;
            }

            await onDisconnect(
                presenceRef
            ).remove();

            await set(
    presenceRef,
    {
        pseudo:
            profilConnecte ||
            ""
    }
);

        }
    );

}
async function compterJoueursEnLigne() {

    const presenceRef =
        ref(
            db,
            "presence"
        );

    onValue(
        presenceRef,
        function(snapshot) {

            if (!snapshot.exists()) {

                joueursEnLigne = 0;

afficherDashboard();

return;

            }

            joueursEnLigne =
    Object.keys(
        snapshot.val()
    ).length;

afficherDashboard();
        }
    );

}
function compterPartiesOuvertes() {

    const partiesRef =
        ref(
            db,
            "parties"
        );

    onValue(
        partiesRef,
        function(snapshot) {

            if (!snapshot.exists()) {

                nombrePartiesPubliques = 0;

afficherDashboard();

return;

            }

            const parties =
                snapshot.val();

            let nombre = 0;

            for (let code in parties) {

                if (
    parties[code].etat === "lobby" &&
    parties[code].publique === true
) {

    nombre++;

}

            }

nombrePartiesPubliques = nombre;

afficherDashboard();

        }
    );

}
async function envoyerMessageChat() {

    const texte =
        messageChat.value.trim();

    if (texte === "") {
        return;
    }

    await push(
        ref(
            db,
            "parties/" +
            codePartieActuelle +
            "/chat"
        ),
        {
            pseudo: pseudoActuel,
            message: texte,
            date: Date.now()
        }
    );

    messageChat.value = "";

}
function surveillerChatAccueil() {

    onValue(chatAccueilRef, function (snapshot) {

        const messages = snapshot.val();
        const maintenant =
    Date.now();
    

        chatAccueil.innerHTML = "";

        if (!messages) {
            return;
        }

        for (let id in messages) {
        

    if (

    messages[id].date &&

    maintenant -
    messages[id].date >

    30 * 60 * 1000

) {

    continue;

}

            chatAccueil.innerHTML +=

    "<div class='messageAccueil'>" +

        "<div class='pseudoAccueil'>" +

            messages[id].pseudo +

        "</div>" +

        "<div class='texteAccueil'>" +

            messages[id].texte +

        "</div>" +

    "</div>";

        }

        chatAccueil.scrollTop =
            chatAccueil.scrollHeight;

    });

}
async function envoyerMessageAccueil() {
    console.log("envoyerMessageAccueil");

    const texte =
        messageAccueil.value.trim();

    if (texte === "") {
        return;
    }

    await push(chatAccueilRef, {

        pseudo: pseudo.value.trim(),

        texte: texte,

        date: Date.now()

    });
    const snapshot =
    await get(chatAccueilRef);

const messages =
    snapshot.val();
    const maintenant =
    Date.now();
   

if (messages) {

    const ids =
        Object.keys(messages).sort(
            (a, b) =>
            messages[a].date -
            messages[b].date
        );

    // Suppression des messages
    // de plus de 30 minutes

    for (const id of ids) {

        if (

            maintenant -
            messages[id].date >

            30 * 60 * 1000

        ) {

            await remove(

                ref(
                    db,
                    "chatAccueil/" +
                    id
                )

            );

        }

    }

    // Limite à 30 messages

    const idsRestants =
        Object.keys(messages);

    if (idsRestants.length > 30) {

        await remove(

            ref(
                db,
                "chatAccueil/" +
                idsRestants[0]
            )

        );

    }

}

    messageAccueil.value = "";

}


function surveillerChat() {

    const chatRef =
        ref(
            db,
            "parties/" +
            codePartieActuelle +
            "/chat"
        );

    onValue(

        chatRef,

        function(snapshot) {

            chatLobby.innerHTML = "";

            if (!snapshot.exists()) {
                return;
            }

            const messages =
                snapshot.val();

            for (let id in messages) {

                const ligne =
                    "<p><b>" +
                    messages[id].pseudo +
                    " :</b> " +
                    messages[id].message +
                    "</p>";

                chatLobby.innerHTML +=
                    ligne;
                    

            }

        }

    );

}

function afficherDashboard() {

    console.clear();

    console.log(
        "=============================="
    );

    console.log(
        "📊 PLAYBATTLE LIVE"
    );

    console.log("");

    console.log(
        "👥 Joueurs en ligne :",
        joueursEnLigne
    );

    console.log(
    "🎮 Parties publiques :",
    nombrePartiesPubliques
);

    console.log(
        "=============================="
    );

}
async function nettoyerAnciennesParties() {

    const partiesRef =
        ref(
            db,
            "parties"
        );

    const snapshot =
        await get(partiesRef);

    if (!snapshot.exists()) {
        return;
    }

    const parties =
        snapshot.val();

    const maintenant =
        Date.now();

    for (let code in parties) {

        const partie =
            parties[code];

        if (
            partie.etat === "lobby" &&
            partie.dateCreation &&
            maintenant -
                partie.dateCreation >
                30 * 60 * 1000
        ) {

            await remove(
                ref(
                    db,
                    "parties/" + code
                )
            );

            console.log(
                "Partie supprimée :",
                code
            );

        }

    }

}
console.log(
    "VERSION PLAYBATTLE V1.01 - compteur + verrouillage"
);
mode2.addEventListener(
    "click",
    async function () {
        if (
    partieActuelle.createur !==
    pseudoActuel
) {
    return;
}

        const snapshot =
            await get(
                ref(
                    db,
                    "parties/" +
                    codePartieActuelle
                )
            );

        const partie =
            snapshot.val();

        const nbJoueurs =
            Object.keys(
                partie.joueurs
            ).length;

        if (nbJoueurs > 2) {

            alert(
                "Too many players"
            );

            return;

        }

        await update(
            ref(
                db,
                "parties/" +
                codePartieActuelle
            ),
            {
                mode: 2
            }
        );

    }
);
mode3.addEventListener(
    "click",
    async function () {
        

        const snapshot =
            await get(
                ref(
                    db,
                    "parties/" +
                    codePartieActuelle
                )
            );

        const partie =
            snapshot.val();

        const nbJoueurs =
            Object.keys(
                partie.joueurs
            ).length;

        if (nbJoueurs > 3) {

            alert(
                "Too many players"
            );

            return;

        }

        await update(
            ref(
                db,
                "parties/" +
                codePartieActuelle
            ),
            {
                mode: 3
            }
        );

    }
);
mode4.addEventListener(
    "click",
    async function () {

        await update(
            ref(
                db,
                "parties/" +
                codePartieActuelle
            ),
            {
                mode: 4
            }
        );

    }
);
window.rejoindrePartiePublique =
    function (code) {

        champCode.value = code;

        boutonRejoindre.click();

    };
surveillerPartiesPubliques();
salonVideo.addEventListener(
    "click",
    function () {

        window.open(
            "https://kmeet.infomaniak.com/playbattle-" +
            codePartieActuelle,
            "_blank"
        );

    }
);
readySwitch.addEventListener(
    "click",
    async function () {

        const joueurRef =
            ref(
                db,
                "parties/" +
                codePartieActuelle +
                "/joueurs/" +
                pseudoActuel
            );

        const snapshot =
            await get(joueurRef);

        if (!snapshot.exists()) {
            return;
        }

        const joueur =
            snapshot.val();

       await updatePartie(
    joueurRef,
    {
        ready: !joueur.ready
    }
);

    }
);
async function envoyerNotification(
    codePartie,
    type,
    joueur
) {

    const notificationRef =
        ref(
            db,
            "parties/" +
            codePartie +
            "/notification"
        );

    await set(
        notificationRef,
        {
            id: Date.now(),
            type: type,
            joueur: joueur,
            date: Date.now()
        }
    );

}
async function incrementerStat(nomStat) {

    console.log(
        "Incrémentation :",
        nomStat
    );

    const statRef =
        ref(
            db,
            "stats/" + nomStat
        );

    await runTransaction(
        statRef,
        function(valeur) {

            console.log(
                "Ancienne valeur :",
                valeur
            );

            return (valeur || 0) + 1;

        }
    );

    console.log(
        "Stat terminée"
    );

}
async function incrementerStatProfil(
    pseudo,
    stat
) {

    const profilRef =
        ref(
            db,
            "profils/" + pseudo
        );

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {
        return;
    }

    const profil =
        snapshot.val();

    const valeur =
        profil[stat] || 0;

    await update(
        profilRef,
        {
            [stat]:
                valeur + 1
        }
    );

}
async function incrementerVisiteHeure() {

    const heure =
    new Date()
        .toLocaleString(
            "fr-FR",
            {
                timeZone: "Europe/Paris",
                hour: "2-digit",
                hour12: false
            }
        )
        .padStart(2, "0");

    await incrementerStat(
        "visitesParHeure/" + heure
    );

}
async function compterVisiteur() {

    sessionStorage.setItem(
        "playbattleVisite",
        "oui"
    );

    await incrementerStat(
        "visiteurs"
    );
    await incrementerVisiteHeure();

}
function surveillerNotifications(code) {

    const notificationRef =
        ref(
            db,
            "parties/" +
            code +
            "/notification"
        );

    onValue(
        notificationRef,
        function (snapshot) {

            const notification =
                snapshot.val();

            if (!notification) {
                return;
            }

            if (
                notification.id === derniereNotification
            ) {
                return;
            }

            derniereNotification =
                notification.id;

            if (
                notification.type === "join" &&
                partieActuelle &&
                partieActuelle.createur === pseudoActuel
            ) {

                sonJoueur.currentTime = 0;
                sonJoueur.play();

            }

        }
    );

}
function afficherRegles() {

    alert(
`⚔️ BATTLEPLAY

HOW TO WIN

🎯 Find your opponents' faction pairs,
NOT YOUR OWN!

⚔️ Every pair found
weakens its faction.

💀 A faction that loses all its cards
is eliminated.

📹 Click VIDEO & CHAT
to see and chat with your friends.

🏆 Be the last faction standing
to win the battle!`
    );

}
saveProfile.addEventListener("click", async function () {

    
    if (profileNickname.value.trim() === "") {

        alert("Please choose a nickname.");

        return;

    }

    if (profilePassword.value === "") {

        alert("Please enter a password.");

        return;

    }
    if (profilePassword.value.length < 6) {

    alert("Password must contain at least 6 characters.");

    return;

}

    if (profilePassword.value !== profileConfirmPassword.value) {

        alert("Passwords do not match.");

        return;

    }
    const profilRef =
    ref(db, "profils/" + profileNickname.value);

const snapshot =
    await get(profilRef);

if (snapshot.exists()) {

    alert("Nickname already exists.");

    return;

}

    await set(profilRef, {

    nickname: profileNickname.value,

    password: await hashPassword(
    profilePassword.value
),

    gender: document.querySelector(
        'input[name="gender"]:checked'
    ).value,

    

    country: profileCountry.value.trim(),
    gamesPlayed: 0,
    victories: 0,

    createdAt: Date.now()

});

alert("Profile created successfully!");

});
async function hashPassword(password) {

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

}
loginProfile.addEventListener("click", async function () {

    const profilRef =
        ref(db, "profils/" + profileNickname.value);

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {

        alert("Unknown nickname.");

        return;

    }

   const profil =
    snapshot.val();

const passwordHash =
    await hashPassword(
        profilePassword.value
    );

if (profil.password !== passwordHash) {

    alert("Wrong password.");

    return;

}

profileModal.style.display = "none";
profilConnecte = profil;
pseudo.value =
    profil.nickname;
    pseudo.disabled = true;
    localStorage.setItem(
    "profilConnecte",
    profil.nickname
);
logoutProfile.style.display =
    "inline-block";
    });
async function reconnecterProfil(
    pseudoSauvegarde
) {

    const profilRef =
        ref(
            db,
            "profils/" +
            pseudoSauvegarde
        );

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {

        localStorage.removeItem(
            "profilConnecte"
        );

        return;

    }

    const profil =
        snapshot.val();

    profilConnecte =
        profil;

    pseudo.value =
        profil.nickname;

    pseudo.disabled =
        true;
logoutProfile.style.display =
    "inline-block";

}
async function voirProfil(nom) {

    const profilRef =
        ref(
            db,
            "profils/" + nom
        );

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {

        alert(
            "This player has no profile."
        );

        return;

    }

    const profil =
        snapshot.val();
        

    viewProfileContent.innerHTML =

    "<h4>📊 STATISTICS</h4>" +

    "<b>🎮 Games Played</b><br>" +
    (profil.gamesPlayed || 0) +

    "<br><br>" +

    "<b>🏆 Victories</b><br>" +
    (profil.victories || 0) +

    "<hr>" +

    "<h4>👤 PLAYER</h4>" +

    "<b>🌍 Country</b><br>" +
    (profil.country || "-") +

    "<br><br>" +

    "<b>📅 Member Since</b><br>" +
    new Date(profil.createdAt).toLocaleDateString() +

    "<br><br>" +

    "<b>👤 Gender</b><br>" +
(profil.gender || "-");
viewProfileModal.style.display = "block";

}

window.voirProfil = voirProfil;