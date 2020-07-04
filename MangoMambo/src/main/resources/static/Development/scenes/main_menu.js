class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: "main_menu"});
    }// Fin constructor

    init(data){
        this.vol = data.volume;
        data = null; 
    }// Fin init

    preload() {
        // Pantalla de Carga
        var loadingImg = this.add.image(0, 0, "loading_background").setOrigin(0, 0);
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(100, 500, 1000, 50);
        var percentText = this.make.text({
            x: 600,
            y: 525,
            text: "0%",
            style: {
                fontSize: '25px',
                fontFamily: 'Berlin Sans FB',
                fontStyle: 'bold',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        this.load.on("progress", function(value){
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(110, 510, 980 * value, 30);
        });
        this.load.on("complete", function(){
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });
        // Cargar la imagen de fondo
        this.load.image("menu_background", "./Design/Stages/Backgrounds/main_menu_background.png");
        this.load.image("title", "./Design/Stages/Backgrounds/mango_mambo_title.png");
        // Botones
        this.load.image("local_button", "./Design/Objects/Buttons/local_button.png");
        this.load.image("online_button", "./Design/Objects/Buttons/online_button.png");
        this.load.image("options_button", "./Design/Objects/Buttons/options_button.png");
        // Botones seleccionados
        this.load.image("local_button_select", "./Design/Objects/Buttons/local_button_select.png");
        this.load.image("online_button_select", "./Design/Objects/Buttons/online_button_select.png");
        this.load.image("options_button_select", "./Design/Objects/Buttons/options_button_select.png");
        //this.load.image("online_button_disable", "./Design/Objects/Buttons/online_button_disable.png"); FASE 5
        // Se carga la música
        this.load.audio("menu_begining", "./Design/Audio/MenuSong/menu_begining_with_edit.wav");
        this.load.audio("menu_loop", "./Design/Audio/MenuSong/menu_with_edit.wav");
        // Sonidos
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
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
        // Efectos de Sonido
        this.change_options;
        this.choose_options;
        // Opciones para los botones
        this.options;
    }// Fin preload

    create() {
        this.cameras.main.fadeIn(500);
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
        this.localButton = this.add.image(300, 140, "local_button").setOrigin(1, 0).setDepth(1);
        this.onlineButton = this.add.image(300, 250, "online_button").setOrigin(1, 0).setDepth(1);
        //this.onlineDisable = this.add.image(250, 270, "online_button_disable").setDepth(1); FASE 5
        this.optionsButton = this.add.image(300, 360, "options_button").setOrigin(1, 0).setDepth(1);
        this.localButtonSelect = this.add.image(300, 140, "local_button_select").setOrigin(1, 0).setDepth(2);
        this.onlineButtonSelect = this.add.image(300, 250, "online_button_select").setOrigin(1, 0).setDepth(2);
        this.optionsButtonSelect = this.add.image(300, 360, "options_button_select").setOrigin(1, 0).setDepth(2);
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
        this.change_options = this.sound.add("change_options");
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("menu_loop");
        this.loop.play({
            loop : true,
            delay : 2.02,
            volume: this.vol
        });
        //              local online options
        this.options = [true, false, false];
    }// Fin create

    update(time, delta){
        // Se esconde la imagen de seleción de los botones
        this.localButtonSelect.alpha = 0;
        this.onlineButtonSelect.alpha = 0;
        this.optionsButtonSelect.alpha = 0;
        this.localButton.angle = 0;
        this.onlineButton.angle = 0;
        this.optionsButton.angle = 0;
        // Selección de botones
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[1]) || Phaser.Input.Keyboard.JustDown(this.cursors[3])) && this.cont<=1){
            this.options[this.cont] = false;
            this.cont++;
            this.options[this.cont] = true;
            this.change_options.play({
                volume: this.vol
            });
        } 
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[0]) || Phaser.Input.Keyboard.JustDown(this.cursors[2])) && this.cont>0){
            this.options[this.cont] = false;
            this.cont--;
            this.options[this.cont] = true;
            this.change_options.play({
                volume: this.vol
            });
        } 
        // Resaltado de botón seleccionado
        if(this.options[0]){
            this.localButtonSelect.alpha = 1;
            this.localButton.setAngle(-5);
            this.localButtonSelect.setAngle(-5);
        }
        if(this.options[1]){
            this.onlineButtonSelect.alpha = 1;
            this.onlineButton.setAngle(-5);
            this.onlineButtonSelect.setAngle(-5);
        }
        if(this.options[2]){
            this.optionsButtonSelect.alpha = 1;
            this.optionsButton.setAngle(-5);
            this.optionsButtonSelect.setAngle(-5);
        }
        // Cambio de pantalla "Local"
        if(this.options[0] && this.cursors[4].isDown){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("choose_character", {loop: this.loop, intro: this.intro, volume: this.vol});
        }
        // Cambio de pantalla "Online"
        if (this.options[1] && Phaser.Input.Keyboard.JustDown(this.cursors[4])){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("connecting", {volume: this.vol});
            // Se para la música
            this.intro.stop();
            this.loop.stop();
        }
        // Cambio de pantalla "Opciones"
        if(this.options[2] && this.cursors[4].isDown){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("options", {volume: this.vol});
            // Se para la música
            this.intro.stop();
            this.loop.stop();
        }
    }// Fin update
}// Fin clase MainMenu