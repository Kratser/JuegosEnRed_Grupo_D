class HowToPlay extends Phaser.Scene {
    constructor(){
        super({key: "how_to_play"});
       
    }// Fin constructor

    init(data){
        this.characters = data.characters;
    }

    preload(){

        // Cargar imágenes
        this.load.image("how_to_play_scene", "./Design/Stages/Backgrounds/how_to_play_scene.png");

    }// Fin preload

    create(){

        // Fondo
        this.howToPlay = this.add.image(0, 0, "how_to_play_scene").setOrigin(0, 0);

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