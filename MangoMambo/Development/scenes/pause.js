class Pause extends Phaser.Scene {
    constructor(){
        super({key: "pause"});

    }// Fin constructor

    init (data){
        this.data = data;
    }

    preload(){

        // Se carga la imagen de fondo
        this.load.image("pause_background", "./Design/Stages/Backgrounds/pause_background.png");

        this.resumeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }// Fin preload

    create(){

        // Fondo
        this.add.image(0, 0, "pause_background").setOrigin(0,0);

        this.scene.sleep("pause");
    }// Fin create

    update(){
        
        if (Phaser.Input.Keyboard.JustDown(this.resumeKey)) {
            this.scene.resume(this.data.sceneKey);
            this.scene.sleep("pause");
        }  

    }// Fin update

}