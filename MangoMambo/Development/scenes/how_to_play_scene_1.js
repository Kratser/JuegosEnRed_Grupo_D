class HowToPlay extends Phaser.Scene {
    constructor(){
        super({key: "how_to_play"});
       
    }// Fin constructor

    init(data){
        this.characters = data;
    }

    preload(){

        // Cargar imágenes
        this.load.image("lvl_1_background", "./Design/Stages/Backgrounds/lvl_1_background.png");
        this.load.image("how_to_play_scene", "./Design/Stages/Backgrounds/how_to_play_scene.png");

    }// Fin preload

    create(){

        // Fondo
        this.background = this.add.image(0, 0, "lvl_1_background").setOrigin(0,0).setDepth(0);
        // Dibujo de how to play
        this.howToPlayButton = this.add.image(600, 300, "how_to_play_scene").setDepth(1);

        // Tecla
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }// Fin create

    update(time, delta){

        //Cambio de pantalla
        if(this.enterKey.isDown){
            this.scene.start("level_1", {characters: this.characters});
        }

    }// Fin update

}// Fin clase