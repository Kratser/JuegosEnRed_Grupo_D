class WSPause extends Phaser.Scene {
    constructor(){
        super({key: "ws_pause"});
    }// Fin constructor

    init (data){
        this.data = data;
        data = null;
    }// Fin init

    preload(){
        // Se carga la imagen de fondo
        this.load.image("pause_background", "./Design/Stages/Backgrounds/pause_background.png");
        // Buttons
        this.load.image("resume_button", "./Design/Objects/Buttons/resume_button.png");
        this.load.image("quit_button", "./Design/Objects/Buttons/quit_button.png");
        // // Selected buttons
        this.load.image("resume_button_select", "./Design/Objects/Buttons/resume_button_select.png");
        this.load.image("quit_button_select", "./Design/Objects/Buttons/quit_button_select.png");
        // Sonido
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        // Botones
        this.resumeButton;
        this.quitButton;
        this.resumeButtonSelect;
        this.quitButtonSelect;
        // Teclas
        this.upKey1;
        this.downKey1;
        this.upKey2;
        this.downKey2;
        this.enterKey;
        this.resumeKey;
        // Controlador para botones
        this.cont = 0;
        this.options = [true, false];
        // Efectos de Sonido
        this.change_options;
        this.choose_options;
    }// Fin preload

    create(){
        // Fondo
        this.add.image(0, 0, "pause_background").setOrigin(0,0).setDepth(0);
        // Botones
        this.resumeButton = this.add.image(900, 130, "resume_button").setDepth(1);
        this.quitButton = this.add.image(900, 290, "quit_button").setDepth(1);
        this.resumeButtonSelect = this.add.image(900, 130, "resume_button_select").setDepth(2);
        this.quitButtonSelect = this.add.image(900, 290, "quit_button_select").setDepth(2);
        // Teclas
        this.upKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.upKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.resumeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // Controlador para botones
        this.cont = 0;
        this.options = [true, false];
        // Crear sonido
        this.change_options = this.sound.add("change_options");
        this.choose_options = this.sound.add("choose_options");
    }// Fin create

    update(time, delta){
        // Se esconde la imagen de seleción de los botones
        this.resumeButtonSelect.alpha = 0;
        this.quitButtonSelect.alpha = 0;
        // Selección de botones
        if ((Phaser.Input.Keyboard.JustDown(this.downKey1) || Phaser.Input.Keyboard.JustDown(this.downKey2)) && this.cont<=0){
            this.options[this.cont] = false;
            this.cont++;
            this.options[this.cont] = true;
            this.change_options.play({
                volume: this.data.scene.vol
            });
        } 
        if ((Phaser.Input.Keyboard.JustDown(this.upKey1) || Phaser.Input.Keyboard.JustDown(this.upKey2)) && this.cont>=1){
            this.options[this.cont] = false;
            this.cont--;
            this.options[this.cont] = true;
            this.change_options.play({
                volume: this.data.scene.vol
            });
        } 
        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.resumeButtonSelect.alpha = 1;
        }
        if(this.options[1]){
            this.quitButtonSelect.alpha = 1;
        }
        // Si se pulsa el botón de resume o el escape
        if ((Phaser.Input.Keyboard.JustDown(this.resumeKey)) || (this.options[0] && Phaser.Input.Keyboard.JustDown(this.enterKey))) {
            this.choose_options.play({
                volume: this.data.scene.vol
            });
            this.data.scene.pauseKey.isDown = false;
            //this.scene.resume(this.data.sceneKey);
            this.data.scene.playing = true;
            this.scene.remove("ws_pause");
            this.options[0] = false;
        }  
        // Si se pulsa el botón de salir
        if (this.options[1] && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.choose_options.play({
                volume: this.data.scene.vol
            });
            this.scene.remove("ws_pause");
            // Se para la música
            this.data.scene.loop.stop();
            this.data.scene.intro.stop();
            this.data.scene.birds.stop();
            this.data.scene.connection.send(JSON.stringify({level1: this.data.playing,
                id: this.myPlayer.id}));
            this.data.scene.connection.close();
            this.data.scene.scene.start("main_menu", {volume: this.data.volume});
            this.options[1] = false;
        }
    }// Fin update
}// Fin clase Pause