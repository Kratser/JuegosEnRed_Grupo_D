class Credits extends Phaser.Scene {
    constructor(){
        super({key: "credits"});
    }// Fin constructor

    preload(){
        // Cargar la imagen de fondo
        this.load.image("credits_background", "./Design/Stages/Backgrounds/credits_background.png");
        // Buttons
        this.load.image("back_button", "./Design/Objects/Buttons/back_button.png");
        // Selected buttons
        this.load.image("back_button_select", "./Design/Objects/Buttons/back_button_select.png");
        // Se carga la música
        this.load.audio("hawaii", "./Design/Audio/CreditsSong/hawaii.wav");
        // Fondo
        this.background;
        // Botones
        this.backButton;
        this.backButtonSelect;
        // Array de teclas
        this.cursors;
        // local  online options
        this.options;
        // La canción loopeada
        this.loop;
    }// Fin preload

    create(){
        // Fondo
        this.background = this.add.image(0, 0, "credits_background").setOrigin(0,0).setDepth(0);
        // Botones 
        this.backButton = this.add.image(150, 100, "back_button").setDepth(1);
        this.backButtonSelect = this.add.image(150, 100, "back_button_select").setDepth(2);
        // Array de teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[4] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[5] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // local  online options
        this.options = [false];
        // Sonido
        this.sound.pauseOnBlur = false;
        this.loop = this.sound.add("hawaii");
        this.loop.play({
            loop : true,
        });
    }// Fin create

    update(){
        // Se esconde la imagen de seleción de los botones
        this.backButtonSelect.alpha = 0;
        // Selección de botones
        if (Phaser.Input.Keyboard.JustDown(this.cursors[0]) || Phaser.Input.Keyboard.JustDown(this.cursors[2])){
            this.options[0] = true;
        } 
        if (Phaser.Input.Keyboard.JustDown(this.cursors[1]) || Phaser.Input.Keyboard.JustDown(this.cursors[3])){
            this.options[0] = false;
        } 
        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.backButtonSelect.alpha = 1;
        }
        //Cambio de pantalla
        if((this.options[0] && this.cursors[4].isDown) || this.cursors[5].isDown){
            this.scene.start("options");
            // this.scene.add(testingScene, new TestingScene);
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}// Fin clase Credits