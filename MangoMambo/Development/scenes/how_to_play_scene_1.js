class HowToPlay extends Phaser.Scene {
    constructor(){
        super({key: "how_to_play"});

        // La canción loopeada
        this.loop;
       
    }// Fin constructor

    init(data){

        this.characters = data.characters;
        data = null;

    }// Fin init

    preload(){

        // Cargar imagen
        this.load.image("how_to_play_scene", "./Design/Stages/Backgrounds/how_to_play_scene.png");

        // Cargar botón
        this.load.image("ready_button", "./Design/Objects/Buttons/ready_button.png");

        // Cargar música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");

    }// Fin preload

    create(){

        // Fondo
        this.howToPlay = this.add.image(0, 0, "how_to_play_scene").setOrigin(0, 0).setDepth(0);

        // Botón
        this.readyButton = this.add.image(800, 500, "ready_button").setDepth(0);

        // Movimiento
        var tween = this.tweens.add({
            targets: this.readyButton,
            
            scaleX: 0.90,
            scaleY: 0.90,
            ease: 'Sine.easeInOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        // Tecla
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Música
        this.sound.pauseOnBlur = false;
        this.loop = this.sound.add("how_to_play_song");
        this.loop.play({
            loop : true,
        });

    }// Fin create

    update(time, delta){

        //Cambio de pantalla
        if(this.enterKey.isDown){
            this.scene.start("level_1", {characters: this.characters});
            // Se para la música
            this.loop.stop();
        }

    }// Fin update

}// Fin clase HowToPlayScene