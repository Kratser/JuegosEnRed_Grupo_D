class Credits extends Phaser.Scene {
    constructor(){
        super({key: "credits"});

        // La canción loopeada
        this.loop;
       
    }// Fin constructor

    preload(){

        // Cargar la imagen de fondo
        this.load.image("credits_background", "./Design/Stages/Backgrounds/credits_background.png");
        // Buttons
        this.load.image("back_button", "./Design/Objects/back_button.png");
        // Selected buttons
        this.load.image("back_button_select", "./Design/Objects/back_button_select.png");

        // local  online options
        this.options;

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

        this.pulsación = true;
        this.press = true;

        this.options = [false];

    }// Fin create

    update(){
        
        // Se esconde la imagen de seleción de los botones
        this.backButtonSelect.alpha = 0;

        // Selección de botones
        if (Phaser.Input.Keyboard.JustDown(this.cursors[0]) || Phaser.Input.Keyboard.JustDown(this.cursors[1]) || Phaser.Input.Keyboard.JustDown(this.cursors[2]) || Phaser.Input.Keyboard.JustDown(this.cursors[3])){
            this.options[0] = true;
        } 

        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.backButtonSelect.alpha = 1;
        }

        //Cambio de pantalla
        if((this.options[0] && this.cursors[4].isDown) || this.cursors[5].isDown){
            this.scene.start("options");
            // this.scene.add(testingScene, new TestingScene);
        }

    }// Fin update

}// Fin clase