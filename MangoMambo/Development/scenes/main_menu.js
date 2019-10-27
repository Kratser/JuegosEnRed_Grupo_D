class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: "mainMenu"});
        //Array de obciones para selecionar botón
        this.options;
        //Contador para cambiar la posición del array options
        this.cont;
        this.lastPress;
        this.actualTime;
        this.latence;

        // La canción loopeada
        this.loop;
       
    }

    preload() {

        // Cargar la imagen de fondo
        this.load.image("menu_background", "./Design/Stages/Backgrounds/main_menu.png");
        // Buttons
        this.load.image("localButton", "./Design/Objects/local_button.png");
        this.load.image("onlineButton", "./Design/Objects/online_button.png");
        this.load.image("optionsButton", "./Design/Objects/options_button.png");
        // // Selected buttons
        this.load.image("localButtonSelect", "./Design/Objects/local_button_select.png");
        this.load.image("onlineButtonSelect", "./Design/Objects/online_button_select.png");
        this.load.image("optionsButtonSelect", "./Design/Objects/options_button_select.png");
        
        // local  online options
        this.options = [true, false, false];
        
        // Se carga la música
        this.load.audio("menu_begining", "./Design/Audio/MenuSong/menu_begining_with_edit.wav");
        this.load.audio("menu_loop", "./Design/Audio/MenuSong/menu_with_edit.wav");
    }//End preload

    create() {
        
        // Fondo
        this.background = this.add.image(0, 0, "menu_background").setOrigin(0,0).setDepth(0);
        // Botones 
        this.localButton = this.add.image(250, 160, "localButton").setDepth(1);
        this.onlineButton = this.add.image(250, 270, "onlineButton").setDepth(1);
        this.optionsButton = this.add.image(250, 380, "optionsButton").setDepth(1);
        this.localButtonSelect = this.add.image(250, 160, "localButtonSelect").setDepth(2);
        this.onlineButtonSelect = this.add.image(250, 270, "onlineButtonSelect").setDepth(2);
        this.optionsButtonSelect = this.add.image(250, 380, "optionsButtonSelect").setDepth(2);
        
        //     // this.scene.add(testingScene, new TestingScene);
        //     this.scene.start(testingScene);
        // Array de teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[4] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
 
        this.cont = 0;
        this.pulsación = true;
        this.press = true;

        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.sound.play("menu_begining");
        this.loop = this.sound.add("menu_loop");
        this.loop.play({
            loop : true,
            delay : 2.02
        });

    }//End create

    update(time, delta){

        // Se esconde la imagen de seleción de los botones
        this.localButtonSelect.alpha = 0;
        this.onlineButtonSelect.alpha = 0;
        this.optionsButtonSelect.alpha = 0;
        
// NO HE PODIDO ARREGLAR LO DE LA LATENCIA
        // Selección de botones
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[1]) || Phaser.Input.Keyboard.JustDown(this.cursors[3])) && this.cont<=1){
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
            this.scene.start("choose_character");
            // this.scene.add(testingScene, new TestingScene);
            // Se para la música
            this.loop.stop();
        }

        //Cambio de pantalla
        if(this.options[2] && this.cursors[4].isDown ){
            this.scene.start("options");
            // this.scene.add(testingScene, new TestingScene);
            // Se para la música
            this.loop.stop();
        }

    }//End updates

}//End MainMenu
