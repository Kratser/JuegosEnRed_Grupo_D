class HowToPlayDetails extends Phaser.Scene {
    constructor(){
        super({key: "how_to_play_details"});

        // La canción loopeada
        // this.loop;
       
    }// Fin constructor

    init(data){
        this.loop = data.loop;
        data = null;
    }

    preload(){

        // Cargar imagen
        this.load.image("how_to_play_scene_details", "./Design/Stages/Backgrounds/how_to_play_scene_details.png");

        // Cargar botón
        this.load.image("back_button", "./Design/Objects/Buttons/back_button.png");

        // Cargar botón seleccionados
        this.load.image("back_button_select", "./Design/Objects/Buttons/back_button_select.png");

        // Opciones
        this.options;

        // Cargar música
        // this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");

    }// Fin preload

    create(){

        // Fondo
        this.howToPlay = this.add.image(0, 0, "how_to_play_scene_details").setOrigin(0, 0).setDepth(0);

        // Botón
        this.backButton = this.add.image(100, 50, "back_button").setDepth(1);
        this.backButtonSelect = this.add.image(100, 50, "back_button_select").setDepth(2);

        // Teclas
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Contador para el array de botones
        this.cont = 1;

        // Array de botones
        this.options = [false];

        // Música
        this.sound.pauseOnBlur = false;
        // this.loop = this.sound.add("how_to_play_song");
        // this.loop.play({
        //     loop : true,
        // });

    }// Fin create

    update(time, delta){

        // Se esconde la imagen de seleción de los botones
        this.backButtonSelect.alpha = 0;

        // Selección de botones
        if (Phaser.Input.Keyboard.JustDown(this.wKey) || Phaser.Input.Keyboard.JustDown(this.upKey)){
            this.options[0] = true;
        } 
        if (Phaser.Input.Keyboard.JustDown(this.sKey) || Phaser.Input.Keyboard.JustDown(this.downKey)){
            this.options[0] = false;
        } 

        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.backButtonSelect.alpha = 1;
        }

        //Cambio de pantalla
        if((this.options[0] && this.enterKey.isDown) || this.escapeKey.isDown){
            this.scene.start("how_to_play");
            // Se para la música
            this.loop.stop();
        }

    }// Fin update

}// Fin clase HowToPlayScene