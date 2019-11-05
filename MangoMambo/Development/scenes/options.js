class Options extends Phaser.Scene {
    constructor(){
        super({key: "options"});
    }// Fin constructor

    preload(){
        // Cargar la imagen de fondo
        this.load.image("options_background", "./Design/Stages/Backgrounds/options_background.png");
        // Buttons
        //this.load.image("tutorial_button", "./Design/Objects/Buttons/tutorial_button.png"); NO SE INCLUYE EN ESTA FASE
        this.load.image("sound_button", "./Design/Objects/Buttons/sound_button.png");
        this.load.image("credits_button", "./Design/Objects/Buttons/credits_button.png");
        this.load.image("back_button", "./Design/Objects/Buttons/back_button.png");
        // Selected buttons
        //this.load.image("tutorial_button_select", "./Design/Objects/Buttons/tutorial_button_select.png"); NO SE INCLUYE EN ESTA FASE
        this.load.image("sound_button_select", "./Design/Objects/Buttons/sound_button_select.png");
        this.load.image("credits_button_select", "./Design/Objects/Buttons/credits_button_select.png");
        this.load.image("back_button_select", "./Design/Objects/Buttons/back_button_select.png");
        // Se carga la música
        this.load.audio("character_selection", "./Design/Audio/CharacterSelectionScreenSong/characte_selection_screen.wav");
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        // Fondo
        this.background;
        // Botones 
        this.soundButton;
        this.creditsButton;
        this.backButton;
        this.soundButtonSelect;
        this.creditsButtonSelect;
        this.backButtonSelect;
        // Array de teclas
        this.cursors;
        // Contador para el array de botones
        this.cont;
        // options
        this.options;
        // La canción loopeada
        this.loop;
        // Efectos de Sonido
        this.change_options;
        this.choose_options;
    }// Fin preload

    create(){
        // Fondo
        this.background = this.add.image(0, 0, "options_background").setOrigin(0,0).setDepth(0);
        // Botones 
        //this.tutorialButton = this.add.image(900, 130, "tutorial_button").setDepth(1); NO SE INCLUYE EN ESTA FASE
        this.soundButton = this.add.image(900, 290, "sound_button").setDepth(1);
        this.creditsButton = this.add.image(900, 130, "credits_button").setDepth(1);
        this.backButton = this.add.image(150, 500, "back_button").setDepth(1);
        //this.tutorialButtonSelect = this.add.image(900, 130, "tutorial_button_select").setDepth(2); NO SE INCLUYE EN ESTA FASE
        this.soundButtonSelect = this.add.image(900, 290, "sound_button_select").setDepth(2);
        this.creditsButtonSelect = this.add.image(900, 130, "credits_button_select").setDepth(2);
        this.backButtonSelect = this.add.image(150, 500, "back_button_select").setDepth(2);
        // Array de teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[4] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[5] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // Contador para el array de botones
        this.cont = 0;
        // Array de botones
        this.options = [true, false, false];
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.change_options = this.sound.add("change_options");
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("character_selection");
        this.loop.play({
            loop : true,
        });
    }// Fin create

    update(time, delta){
        // Se esconde la imagen de seleción de los botones
        //this.tutorialButtonSelect.alpha = 0; NO SE INCLUYE EN ESTA FASE
        this.soundButtonSelect.alpha = 0;
        this.creditsButtonSelect.alpha = 0;
        this.backButtonSelect.alpha = 0;
        // Selección de botones
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[1]) || Phaser.Input.Keyboard.JustDown(this.cursors[3])) && this.cont<=1){
            this.options[this.cont] = false;
            this.cont++;
            this.options[this.cont] = true;
            this.change_options.play();
        } 
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[0]) || Phaser.Input.Keyboard.JustDown(this.cursors[2])) && this.cont>=1){
            this.options[this.cont] = false;
            this.cont--;
            this.options[this.cont] = true;
            this.change_options.play();
        }
        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.creditsButtonSelect.alpha = 1;
            this.choose_options.play();
        }
        if(this.options[1]){
            this.soundButtonSelect.alpha = 1;
            this.choose_options.play();
        }
        if(this.options[2]){
            this.backButtonSelect.alpha = 1;
            this.choose_options.play();
        }
        //Cambio de pantalla
        if((this.options[2] && this.cursors[4].isDown) || this.cursors[5].isDown){
            this.scene.start("main_menu");
            // Se para la música
            this.loop.stop();
        }
        //Cambio de pantalla
        if(this.options[0] && this.cursors[4].isDown){
            this.scene.start("credits");
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}// Fin clase Options