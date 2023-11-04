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
        return Math.floor(Math.random() * 4);
    }

    // exécute une fonction lorsqu'on clique sur un bouton
    buttonClick(value) {
        !this.blockedButtons && this.validateChosenColor(value);
    }

    // valide si le bouton sélection correspond à celui de la séquence
    validateChosenColor(value) {
        if (this.sequence[this.userPosition] === value) {
            this.buttonSounds[value].play();
            if (this.round === this.userPosition) {
                this.updateRound(this.round + 1);
                this.speed /= 1.02;
                this.isGameOver();
            } else {
                this.userPosition++;
            }
        } else {
            this.gameLost();
        }
    }

    // vérifie si le jeu n'est pas fini
    isGameOver() {
        if (this.round === this.totalRounds) {
            this.gameWon();
        } else {
            this.userPosition = 0;
            this.showSequence();
        };
    }

    //Montre la séquence à reproduire
    showSequence() {
        this.blockedButtons = true;
        let sequenceIndex = 0;
        let timer = setInterval(() => {
            const button = this.buttons[this.sequence[sequenceIndex]];
            this.buttonSounds[this.sequence[sequenceIndex]].play();
            this.toggleButtonStyle(button);
            setTimeout(() => this.toggleButtonStyle(button), this.speed /2);
            sequenceIndex++;
            if (sequenceIndex > this.round) {
                this.blockedButtons = false;
                clearInterval(timer);
            }
        }, this.speed);
    }

    // colore les boutons lorsque l'ordinateur montre la séquence
    toggleButtonStyle(button) {
        button.classList.toggle('active');
    }

    // actualise Simon lorsque le joueur perd
    gameLost() {
        this.errorSound.play();
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Tu as perdu',
            showConfirmButton: true,
        })
        this.display.startButton.disabled = false;
        this.blockedButtons = true;
    }

    // montre l'animation de victoire et actualise Simon lorsque le joueur gagne
    gameWon() {
        this.display.startButton.disabled = false;
        this.blockedButtons = true;
        this.buttons.forEach(element => {
            element.classList.add('winner');
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu as gagné !!!',
            showConfirmButton: true,
        })
    }
}

const simon = new Simon(simonButtons, startButton, round);
simon.init();