const round = document.getElementById('round');
const simonButtons = document.getElementsByClassName('square');
const startButton = document.getElementById('start');

class Simon {
    constructor(simonButtons, startButton, round) {
        this.round = 0;
        this.userPosition = 0;
        this.totalRounds = 10;
        this.sequence = [];
        this.speed = 1000;
        this.blockedButtons = true;
        this.buttons = Array.from(simonButtons);
        this.display = {
            startButton,
            round
        }
        this.errorSound = new Audio('./sounds/error.wmv');
        this.buttonSounds = [
            new Audio('./sounds/1.mp3'),
            new Audio('./sounds/2.mp3'),
            new Audio('./sounds/3.mp3'),
            new Audio('./sounds/4.mp3')
        ]
    }

    //initialiser Simon et commencer le jeu
    init() {
        this.display.startButton.onclick = () => this.startGame();
    }
    startGame() {
        this.display.startButton.disabled = true;
        this.updateRound(0);
        this.userPosition = 0;
        this.sequence = this.createSequence();
        this.buttons.forEach((element, i) => {
            element.classList.remove('winner');
            element.onclick = () => this.buttonClick(i);
        });
        this.showSequence();
    }

    //actualiser le tour et l'affichage
    updateRound(value) {
        this.round = value;
        this.display.round.textContent = `Round ${this.round}`;

    }

    // créer la séquence aléatoire des boutons et choisir un numéro entre 0 et 3
    createSequence() {
        return Array.from({length: this.totalRounds}, () => this.getRandomColor());
    }

    getRandomColor() {

    }

    // exécute une fonction lorsqu'on clique sur un bouton
    buttonClick(value) {

    }

    // valide si le bouton sélection correspond à celui de la séquence
    validateChosenColor(value) {

    }

    // vérifie si le jeu n'est pas fini
    isGameOver() {

    }

    //Montre la séquence à reproduire
    showSequence() {

    }

    // colore les boutons lorsque l'ordinateur montre la séquence
    toggleButtonStyle(button) {

    }

    // actualise Simon lorsque le joueur perd
    gameLost() {

    }

    // montre l'animation de victoire et actualise Simon lorsque le joueur gagne
    gameWon() {
        
    }
}

const simon = new Simon(simonButtons, startButton, round);
simon.init();