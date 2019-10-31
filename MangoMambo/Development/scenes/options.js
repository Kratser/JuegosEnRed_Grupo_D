class Options extends Phaser.Scene {
    constructor(){
        super({key: "options"});

        // La canción loopeada
        this.loop;
       
    }// Fin constructor

    preload(){

        // Cargar la imagen de fondo
        this.load.image("options_background", "./Design/Stages/Backgrounds/options_background.png");
        // Buttons
        this.load.image("tutorial_button", "./Design/Objects/tutorial_button.png");
        this.load.image("sound_button", "./Design/Objects/sound_button.png");
        this.load.image("credits_button", "./Design/Objects/credits_button.png");
        this.load.image("back_button", "./Design/Objects/back_button.png");
        // Selected buttons
        this.load.image("tutorial_button_select", "./Design/Objects/tutorial_button_select.png");
        this.load.image("sound_button_select", "./Design/Objects/sound_button_select.png");
        this.load.image("credits_button_select", "./Design/Objects/credits_button_select.png");
        this.load.image("back_button_select", "./Design/Objects/back_button_select.png");
        
        // local  online options
        this.options;

        // Se carga la música
        this.load.audio("character_selection", "./Design/Audio/CharacterSelectionScreenSong/characte_selection_screen.wav");

    }// Fin preload

    create(){

        // Fondo
        this.background = this.add.image(0, 0, "options_background").setOrigin(0,0).setDepth(0);
        // Botones 
        this.tutorialButton = this.add.image(900, 130, "tutorial_button").setDepth(1);
        this.soundButton = this.add.image(900, 290, "sound_button").setDepth(1);
        this.creditsButton = this.add.image(900, 470, "credits_button").setDepth(1);
        this.backButton = this.add.image(150, 500, "back_button").setDepth(1);
        this.tutorialButtonSelect = this.add.image(900, 130, "tutorial_button_select").setDepth(2);
        this.soundButtonSelect = this.add.image(900, 290, "sound_button_select").setDepth(2);
        this.creditsButtonSelect = this.add.image(900, 470, "credits_button_select").setDepth(2);
        this.backButtonSelect = this.add.image(150, 500, "back_button_select").setDepth(2);
        // Array de teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[4] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[5] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.cont = 0;

        this.options = [true, false, false, false];

        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.loop = this.sound.add("character_selection");
        this.loop.play({
            loop : true,
        });

    }// Fin create

    update(time, delta){

        // Se esconde la imagen de seleción de los botones
        this.tutorialButtonSelect.alpha = 0;
        this.soundButtonSelect.alpha = 0;
        this.creditsButtonSelect.alpha = 0;
        this.backButtonSelect.alpha = 0;

        // Selección de botones
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[1]) || Phaser.Input.Keyboard.JustDown(this.cursors[3])) && this.cont<=2){
            this.options[this.cont] = false;
            this.cont++;
            this.options[this.cont] = true;
        } 
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[0]) || Phaser.Input.Keyboard.JustDown(this.cursors[2])) && this.cont>=1){
            this.options[this.cont] = false;
            this.cont--;
            this.options[this.cont] = true;
        } 

        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.tutorialButtonSelect.alpha = 1;
        }
        if(this.options[1]){
            this.soundButtonSelect.alpha = 1;
        }
        if(this.options[2]){
            this.creditsButtonSelect.alpha = 1;
        }
        if(this.options[3]){
            this.backButtonSelect.alpha = 1;
        }

        //Cambio de pantalla
        if((this.options[3] && this.cursors[4].isDown) || this.cursors[5].isDown){
            this.scene.start("main_menu");
            // this.scene.add(testingScene, new TestingScene);
            // Se para la música
            this.loop.stop();
        }

        //Cambio de pantalla
        if(this.options[2] && this.cursors[4].isDown){
            this.scene.start("credits");
            // this.scene.add(testingScene, new TestingScene);
            // Se para la música
            this.loop.stop();
        }

    }// Fin update

}// Fin clase Options

