class ScoreLevel extends Phaser.Scene {
    constructor(){
        super({key: "score_level"});
    }// Fin constructor

    init (data){
        this.characters = data.characters;
        this.vol = data.volume;
        data = null;
    }// Fin init

    preload() {
        // Pantalla de Carga
        var loadingImg = this.add.image(0, 0, "loading_background").setOrigin(0, 0);
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(100, 500, 1000, 50);
        var percentText = this.make.text({
            x: 600,
            y: 525,
            text: "0%",
            style: {
                fontSize: '25px',
                fontFamily: 'Berlin Sans FB',
                fontStyle: 'bold',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        this.load.on("progress", function(value){
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(110, 510, 980 * value, 30);
        });
        this.load.on("complete", function(){
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });
       // Cargar la imagen de fondo
       this.load.image("score_level_background", "./Design/Stages/Backgrounds/score_level_background.png");
        // Personas de fondo
       this.load.image("people", "./Design/Stages/Backgrounds/people_end_level.png");
        // Corona del ganador
        this.load.image("crown", "./Design/Objects/crown.png");
       // Totems
       this.load.image("g_totem", "./Design/Objects/Totems/green_totem.png");
        this.load.image("p_totem", "./Design/Objects/Totems/pink_totem.png");
        this.load.image("b_totem", "./Design/Objects/Totems/blue_totem.png");
        this.load.image("y_totem", "./Design/Objects/Totems/yellow_totem.png");
        // Botón next round
        this.load.image("next_level_button_selected", "./Design/Objects/Buttons/next_level_button_selected.png");
        // Se carga la música
        this.load.audio("score_level_music", "./Design/Audio/ScoreLevelSong/score_level_music.wav");
        // Se carga el efecto
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        // Personas que se mueven
        this.peopleMove;
        // Totems
        this.gTotem;
        this.pTotem;
        this.bTotem;
        this.yTotem;
        // Array que contiene las coronas de los ganadores
        this.crowns;
        // Botón escape
        this.escapeButton;
        // Botón enter
        this.nextRound;
        // Puntuación máxima
        this.maxScore;
        // ESCAPE
        this.escapeCursor;
        // ENTER
        this.enterCursor;
        // Puntuaciones de los jugadores
        this.scores;
        // La canción loopeada
        this.loop;
    }// Fin preload

    create() {
        this.cameras.main.fadeIn(500);
        // Fondo
        this.add.image(0, 0, "score_level_background").setOrigin(0,0);
        // Personas que se mueven
        this.peopleMove = this.add.image (600, 525, "people").setDepth(0);
        // Movimiento
        var tween = this.tweens.add({
            targets: this.peopleMove,
            y: 510,
            ease: 'Sine.easeInOut',
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        // Máxima puntuación que se puede alcanzar 
        this.maxScore = 10;
        // Totems
        this.gTotem = this.add.image (161.50, 687, "g_totem");
        this.pTotem = this.add.image (448.00, 687, "p_totem");
        this.bTotem = this.add.image (742, 687, "b_totem");
        this.yTotem = this.add.image (1039, 687, "y_totem");
        // Corona del ganador
        this.player1_crown = this.add.image(161.50, -40, "crown");
        this.player2_crown = this.add.image(448.00, -40, "crown");
        this.player3_crown = this.add.image(742.00, -40, "crown");
        this.player4_crown = this.add.image(1039, -40, "crown");
        // Array que contiene las coronas de los ganadores
        this.crowns = [this.player1_crown, this.player2_crown, this.player3_crown, this.player4_crown];
        // Movimiento
        var tweenCrownDown = this.tweens.add({
            targets: [this.player1_crown, this.player2_crown, this.player3_crown, this.player4_crown],
            y: 55,
            ease: 'Sine.easeInOut',
            duration: 3000,
        });
        var tweenCrown = this.tweens.add({
            targets: [this.player1_crown, this.player2_crown, this.player3_crown, this.player4_crown],
            scaleX: 0.90,
            scaleY: 0.90,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        // Para que no aparezca la corona hasta que no gane
        this.player1_crown.alpha = 0;
        this.player2_crown.alpha = 0;
        this.player3_crown.alpha = 0;
        this.player4_crown.alpha = 0;

        for (var i = 0; i < this.characters.length; i++) {
            switch (this.characters[i].id) {
                // Jugador 1
                case 0:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"],
                    false, 161.50, 532, this.characters[i].score);
                    this.characters[i].y = this.characters[i].y - this.characters[i].height/2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.gTotem,
                        y: 687 - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    break;
                // Jugador 2
                case 1:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"],
                    false, 448.00, 532, this.characters[i].score);
                    this.characters[i].y = this.characters[i].y - this.characters[i].height/2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.pTotem,
                        y: 687 - (this.characters[i].score / this.maxScore) * 210, // 430 max
                        duration: 2500
                    });
                    break;
                // Jugador 3    
                case 2:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"], 
                    false, 742.00, 532, this.characters[i].score);
                    this.characters[i].y = this.characters[i].y - this.characters[i].height/2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.bTotem,
                        y: 687 - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    break;
                // Jugador 4   
                case 3:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"], 
                    false, 1039, 532, this.characters[i].score);
                    this.characters[i].y = this.characters[i].y - this.characters[i].height/2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.yTotem,
                        y: 687 - (this.characters[i].score / this.maxScore) * 210, // 687 min
                        duration: 2500
                    });
                    break;
            }// Fin switch
        }// Fin for
        // Botón escape
        this.escapeButton = this.add.image(45, 20, "escape_button");
        // Botón enter
        this.nextRound = this.add.image(1101.5, 30, "next_level_button_selected");
        // Movimiento
        var tweenNextRound = this.tweens.add({
            targets: [this.nextRound],
            scaleX: 0.97,
            scaleY: 0.97,
            ease: 'Sine.easeInOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        });
        // Máxima puntuación que se puede alcanzar 
        this.maxScore = 10;
        // ESCAPE
        this.escapeCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // ENTER
        this.enterCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // Puntuaciones de los jugadores
        this.scores = [];
        for (var i = 0; i < this.characters.length; i++){
            this.scores[i] = this.make.text({
                x: this.characters[i].x - 100,
                y: this.characters[i].y - this.characters[i].height,
                text: this.characters[i].score+" pts",
                style: {
                    fontSize: '30px',
                    fontFamily: 'Berlin Sans FB',
                    fontStyle: 'bold',
                    color: '#06c614',
                    align: 'center',
                    strokeThickness: '5',
                    shadow: (5, 5, 'rgba(170,255,117,0.5)', 5)
                  }
            });
            this.scores[i].angle = 20;
            var tween = this.tweens.add({
                targets: this.scores[i],
                y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210 - this.characters[i].height,
                duration: 2500
            });
        }
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("score_level_music");
        this.loop.play({
            loop: true,
            volume: this.vol
        });
    }// Fin create

    update() {
        // Cuando terminan las rondas vuelve al menu principal
        for (var i = 0; i < this.characters.length; i++) {
            if (this.characters[i].score >= this.maxScore) {
                // Desaparece el siguiente ronda
                this.nextRound.alpha = 0;
                this.crowns[this.characters[i].id - 1].alpha = 1;
                if (Phaser.Input.Keyboard.JustDown(this.enterCursor)){
                    this.choose_options.play({
                        volume: this.vol
                    });
                    this.scene.start("main_menu", {volume: this.vol});
                    // Se para la música
                    this.loop.stop();
                }
            }
        }// Fin for
         // ESCAPE para salir al menú principal
         if (Phaser.Input.Keyboard.JustDown(this.escapeCursor)){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("main_menu", {volume: this.vol});
            // Se para la música
            this.loop.stop();
         }
         // ENTER para pasar a la siguiente ronda
        if (Phaser.Input.Keyboard.JustDown(this.enterCursor)){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("level_1", {characters: this.characters, volume: this.vol});
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}// Fin clase ScoreLevel