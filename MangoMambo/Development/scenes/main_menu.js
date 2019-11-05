class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: "main_menu"});
    }// Fin constructor

    init(data){
        this.vol = data.volume;
        data = null; 
    }

    preload() {
        // Cargar la imagen de fondo
        this.load.image("menu_background", "./Design/Stages/Backgrounds/main_menu_background.png");
        this.load.image("title", "./Design/Stages/Backgrounds/mango_mambo_title.png");
        // Botones
        this.load.image("local_button", "./Design/Objects/Buttons/local_button.png");
        //this.load.image("online_button", "./Design/Objects/Buttons/online_button.png"); NO SE INCLUYE EN ESTA FASE
        this.load.image("options_button", "./Design/Objects/Buttons/options_button.png");
        // Botones seleccionados
        this.load.image("local_button_select", "./Design/Objects/Buttons/local_button_select.png");
        //this.load.image("online_button_select", "./Design/Objects/Buttons/online_button_select.png"); NO SE INCLUYE EN ESTA FASE
        this.load.image("options_button_select", "./Design/Objects/Buttons/options_button_select.png");
        this.load.image("options_button_disable", "./Design/Objects/Buttons/online_button_disable.png");
        // Se carga la música
        this.load.audio("menu_begining", "./Design/Audio/MenuSong/menu_begining_with_edit.wav");
        this.load.audio("menu_loop", "./Design/Audio/MenuSong/menu_with_edit.wav");
        // Fondo
        this.background;
        // Título 
        this.titleMove;
        // Botones
        this.localButton;
        this.onlineDisable;
        this.optionsButton;
        this.localButtonSelect;
        this.optionsButtonSelect;
        // Teclas
        this.cursors;
        // Contador para moverse por el array de botones
        this.cont;
        // Música de inicio
        this.intro;
        this.loop;
        // Opciones para los botones
        this.options;
    }// Fin preload

    create() {
        // Fondo
        this.background = this.add.image(0, 0, "menu_background").setOrigin(0,0).setDepth(0);
        // Título que se mueve
        this.titleMove = this.add.image (712, 245, "title");
        // Movimiento
        var tween = this.tweens.add({
            targets: this.titleMove,
            
            scaleX: 0.93,
            scaleY: 0.93,
            y: 260,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        // Botones 
        this.localButton = this.add.image(250, 160, "local_button").setDepth(1);
        //this.onlineButton = this.add.image(250, 270, "online_button").setDepth(1); NO SE INCLUYE EN ESTA FASE
        this.onlineDisable = this.add.image(250, 270, "options_button_disable").setDepth(1);
        this.optionsButton = this.add.image(250, 380, "options_button").setDepth(1);
        this.localButtonSelect = this.add.image(250, 160, "local_button_select").setDepth(2);
        //this.onlineButtonSelect = this.add.image(250, 270, "online_button_select").setDepth(2); NO SE INCLUYE EN ESTA FASE
        this.optionsButtonSelect = this.add.image(250, 380, "options_button_select").setDepth(2);
        // Array de teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[4] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // Contador para moverse por el array de botones
        this.cont = 0;
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.intro = this.sound.add("menu_begining");
        this.intro.play({
            volume: this.vol
        });
        this.loop = this.sound.add("menu_loop");
        this.loop.play({
            loop : true,
            delay : 2.02,
            volume: this.vol
        });
        //              local options
        this.options = [true, false];
    }// Fin create

    update(time, delta){
        // Se esconde la imagen de seleción de los botones
        this.localButtonSelect.alpha = 0;
        //this.onlineButtonSelect.alpha = 0; NO SE INCLUYE EN ESTA FASE
        this.optionsButtonSelect.alpha = 0;
        // Selección de botones
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[1]) || Phaser.Input.Keyboard.JustDown(this.cursors[3])) && this.cont<=0){
            this.options[this.cont] = false;
            this.cont++;
            this.options[this.cont] = true;
        } 
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[0]) || Phaser.Input.Keyboard.JustDown(this.cursors[2])) && this.cont>0){
            this.options[this.cont] = false;
            this.cont--;
            this.options[this.cont] = true;
        } 
        // Resaltado de botón seleccionado
        if(this.options[0]){
            this.localButtonSelect.alpha = 1;
        }
        if(this.options[1]){
            this.optionsButtonSelect.alpha = 1;
        }
        // Cambio de pantalla
        if(this.options[0] && this.cursors[4].isDown){
            this.scene.start("choose_character", {loop: this.loop, intro: this.intro, volume: this.vol});
        }
        //Cambio de pantalla
        if(this.options[1] && this.cursors[4].isDown ){
            this.scene.start("options", {volume: this.vol});
            // Se para la música
            this.intro.stop();
            this.loop.stop();
        }
    }// Fin update
}// Fin clase MainMenu