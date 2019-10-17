class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: "mainMenu", active: true});
        //Array de obciones para selecionar botón
        this.options;
        //Contador para cambiar la posición del array options
        this.cont;
        this.lastPress;
        this.actualTime;
        this.latence;
       
    }

    preload() {

        // Cargar la imagen de fondo
        this.load.image("background", "../Design/Stages/Backgrounds/main_menu.png");
        // Buttons
        this.load.image("localButton", "../Design/Objects/local_button.png");
        this.load.image("onlineButton", "../Design/Objects/online_button.png");
        this.load.image("optionsButton", "../Design/Objects/options_button.png");
        // // Selected buttons
        this.load.image("localButtonSelect", "../Design/Objects/local_button_select.png");
        this.load.image("onlineButtonSelect", "../Design/Objects/online_button_select.png");
        this.load.image("optionsButtonSelect", "../Design/Objects/options_button_select.png");
        
        //             local   online options
        this.options = [true, false, false];

        // Audio
        // this.load.audio("tittle", "sjfw.wav");
    }//End preload

    create() {
        
        // Fondo
        this.background = this.add.image(0, 0, "background").setOrigin(0,0).setDepth(0);
        // Botones 
        this.localButton = this.add.image(250, 160, "localButton").setDepth(1);
        this.onlineButton = this.add.image(250, 270, "onlineButton").setDepth(1);
        this.optionsButton = this.add.image(250, 380, "optionsButton").setDepth(1);
        this.localButtonSelect = this.add.image(250, 160, "localButtonSelect").setDepth(2);
        this.onlineButtonSelect = this.add.image(250, 270, "onlineButtonSelect").setDepth(2);
        this.optionsButtonSelect = this.add.image(250, 380, "optionsButtonSelect").setDepth(2);
        
        //     // this.scene.add(testingScene, new TestingScene);
        //     this.scene.start(testingScene);
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[4] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
 
        this.cont = 0;
        this.pulsación = true;
        this.press = true;

        // Audio
        // // this.sound.pauseOnBlur = false;
        // // this.sound.play("tittle",{
        //     // loop = true
        // // })

    }//End create

    update(time, delta){

        // Se esconde la imagen de seleción de los botones
        this.localButtonSelect.alpha = 0;
        this.onlineButtonSelect.alpha = 0;
        this.optionsButtonSelect.alpha = 0;
        
// NO HE PODIDO ARREGLAR LO DE LA LATENCIA
        // Selección de botones
        if ((this.cursors[1].isDown || this.cursors[3].isDown) && this.cont<=2){
            this.options[this.cont] = false;
            this.cont++;
             console.log(this.cont);
            this.options[this.cont] = true;
        } 
        if ((this.cursors[0].isDown || this.cursors[2].isDown) && this.cont>=0){
            this.options[this.cont] = false;
            this.cont--;
            console.log(this.cont);
            this.options[this.cont] = true;
        } 
          
        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.localButtonSelect.alpha = 1;
        }
        if(this.options[1]){
            this.onlineButtonSelect.alpha = 1;
        }
        if(this.options[2]){
            this.optionsButtonSelect.alpha = 1;
        }
    
        //Cambio de pantalla
        if(this.options[0] && this.cursors[4].isDown ){
            this.scene.start(TestingScene);
            // this.scene.add(testingScene, new TestingScene);
        }

    }//End updates

}//End MainMenu
