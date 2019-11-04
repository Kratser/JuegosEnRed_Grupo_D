class ScoreLevel extends Phaser.Scene {
    constructor(){

        super({key: "score_level"});

    }// Fin constructor

    init (data){

        this.characters = data.characters;
        data = null;

    }// Fin init

    preload() {

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
        // Puntuación máxima
        this.maxScore;
        // Botón next round
        this.load.image("next_round", "./Design/Objects/Buttons/next_round_button.png");
        // ESCAPE
        this.escapeCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // ENTER
        this.enterCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // Array que contiene las coronas de los ganadores
        this.crowns = [];

    }// Fin preload

    create() {

        // Fondo
        this.add.image(0, 0, "score_level_background").setOrigin(0,0);

        // Personas que se mueven
        this.peopleMove = this.add.image (600, 525, "people").setDepth(0);
        // Movimiento
        var tween = this.tweens.add({
            targets: this.peopleMove,
            y: 520,
            ease: 'Sine.easeInOut',
            duration: 600,
            yoyo: true,
            repeat: -1
        });

        // Totems
        this.gTotem = this.add.image (161.50, 687, "g_totem");
        this.pTotem = this.add.image (448.00, 687, "p_totem");
        this.bTotem = this.add.image (742, 687, "b_totem");
        this.yTotem = this.add.image (1039, 687, "y_totem");

        // Corona del ganador
        this.player1_crown = this.add.image(161.50, 55, "crown");
        this.player2_crown = this.add.image(448.00, 55, "crown");
        this.player3_crown = this.add.image(742.00, 55, "crown");
        this.player4_crown = this.add.image(1039, 55, "crown");
        // Movimiento
        var tweenCrown = this.tweens.add({
            targets: [this.player1_crown, this.player2_crown, this.player3_crown, this.player4_crown],
            scaleY: 0.94,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        // Array que contiene las coronas de los ganadores
        this.crowns = [this.player1_crown, this.player2_crown, this.player3_crown, this.player4_crown];

        // Para que no aparezca la corona hasta que no gane
        this.player1_crown.alpha = 0;
        this.player2_crown.alpha = 0;
        this.player3_crown.alpha = 0;
        this.player4_crown.alpha = 0;

        for (var i = 0; i < this.characters.length; i++) {
            switch (this.characters[i].id) {
                // Jugador 1
                case 1:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"],
                    false, 161.50, 532, this.characters[i].score);
                    // y del nuevo sprite (_choose)
                    this.characters[i].y = this.characters[i].y - this.characters[i].height/2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - this.characters[i].score * 21,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.gTotem,
                        y: 687 - this.characters[i].score * 21,
                        duration: 2500
                    });
                    break;
                // Jugador 2
                case 2:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"],
                    false, 448.00, 532, this.characters[i].score);
                    // y del nuevo sprite (_choose)
                    this.characters[i].y = this.characters[i].y - this.characters[i].height/2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - this.characters[i].score * 21,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.pTotem,
                        y: 687 - this.characters[i].score * 21, // 430 max
                        duration: 2500
                    });
                    break;
                // Jugador 3    
                case 3:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"], 
                    false, 742.00, 532, this.characters[i].score);
                    // y del nuevo sprite (_choose)
                    this.characters[i].y = this.characters[i].y - this.characters[i].height/2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - this.characters[i].score * 21,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.bTotem,
                        y: 687 - this.characters[i].score * 21,
                        duration: 2500
                    });
                    break;
                // Jugador 4   
                case 4:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"], 
                    false, 1039, 532, this.characters[i].score);
                    // y del nuevo sprite (_choose)
                    this.characters[i].y = this.characters[i].y - this.characters[i].height/2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - this.characters[i].score * 21,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.yTotem,
                        y: 687 - this.characters[i].score * 21, // 687 min
                        duration: 2500
                    });
                    break;
            }// Fin switch
        }// Fin for

        // Botón escape
        this.escapeButton = this.add.image(45, 20, "escape_button");
        // Botón enter
        this.nextRound = this.add.image(1101.5, 31, "next_round");

        // Máxima puntuación que se puede alcanzar 
        this.maxScore = 10;

    }// Fin Create

    update() {

        // Cuando terminan las rondas vuelve al menu principal
        for (var i = 0; i < this.characters.length; i++) {
            if (this.characters[i].score >= this.maxScore) {
                // Desaparece el siguiente ronda
                this.nextRound.alpha = 0;
                this.crowns[this.characters[i].id - 1].alpha = 1;
                if (Phaser.Input.Keyboard.JustDown(this.enterCursor)){
                    this.scene.start("main_menu", {characters: this.characters});
                }
            }
        }// Fin for

         // ESCAPE para salir al menú principal
         if (Phaser.Input.Keyboard.JustDown(this.escapeCursor)){
            this.scene.start("main_menu");
         }
         // ENTER para pasar a la siguiente ronda
        if (Phaser.Input.Keyboard.JustDown(this.enterCursor)){
            this.scene.start("level_1", {characters: this.characters});//, {characters: this.characters}
        }
      
    }// Fin update
}// Fin clase EndLevel
