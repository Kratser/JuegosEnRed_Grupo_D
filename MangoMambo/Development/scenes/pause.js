class Pause extends Phaser.Scene {
    constructor(){
        super({key: "pause"});

    }// Fin constructor

    preload(){

        // Se carga la imagen de fondo
        this.load.image("pause_background", "./Design/Stages/Backgrounds/pause_background.png");

    }// Fin preload

    create(){

        // Fondo
        this.add.image(0, 0, "pause_background").setOrigin(0,0);

    }// Fin create

    update(){

    }// Fin update

}