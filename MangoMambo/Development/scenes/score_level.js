class ScoreLevel extends Phaser.Scene {
    constructor(){
        super({key: "score_level"});

    }// Fin constructor

    init (data){
        this.scores = data.scores;
    }// Fin init

    preload() {

       // Cargar la imagen de fondo
       this.load.image("score_level_background", "./Design/Stages/Backgrounds/score_level_background.png");
        // Personas de fondo
       this.load.image("people", "./Design/Stages/Backgrounds/people_end_level.png");

       //Totems
       this.load.image("g_totem", "./Design/Objects/Totems/green_totem.png");
       this.load.image("p_totem", "./Design/Objects/Totems/pink_totem.png");
       this.load.image("b_totem", "./Design/Objects/Totems/blue_totem.png");
       this.load.image("y_totem", "./Design/Objects/Totems/yellow_totem.png");

    }// Fin preload

    create() {
        // Fondo
        this.add.image(0, 0, "score_level_background").setOrigin(0,0);

        // Totems
        this.gTotem = this.add.image (161.50, 687, "g_totem").setDepth(2);
        this.pTotem = this.add.image (448.00, 687, "p_totem").setDepth(2);
        this.bTotem = this.add.image (742, 687, "b_totem").setDepth(2);
        this.yTotem = this.add.image (1039, 687, "y_totem").setDepth(2);
        // Movimiento
        var tween = this.tweens.add({
            targets: this.gTotem,
            y: 500,
            // ease: 'Sine.easeInOut',
            duration: 4000
            // yoyo: true,
            // repeat: -1
        });

        var tween = this.tweens.add({
            targets: this.pTotem,
            y: 430,
            duration: 4000
        });

        var tween = this.tweens.add({
            targets: this.bTotem,
            y: 600,
            duration: 4000
        });

        var tween = this.tweens.add({
            targets: this.yTotem,
            y: 670,
            duration: 4000
        });

        // Personas que se mueven
        this.peopleMove = this.add.image (600, 525, "people").setDepth(1);;
        // Movimiento
        var tween = this.tweens.add({
            targets: this.peopleMove,
            y: 520,
            ease: 'Sine.easeInOut',
            duration: 700,
            yoyo: true,
            repeat: -1
        });

    }// Fin Create

    update() {

      
    }// Fin update
}// Fin clase EndLevel
