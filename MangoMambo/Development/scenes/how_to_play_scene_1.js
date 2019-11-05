class HowToPlay extends Phaser.Scene {
    constructor(){
        super({key: "how_to_play"});
    }// Fin constructor

    init(data){
        this.characters = data.characters;
        this.vol = data.volume;
        data = null;
    }// Fin init

    preload(){
        // Cargar imagen
        this.load.image("how_to_play_scene", "./Design/Stages/Backgrounds/how_to_play_scene.png");
        // Cargar botón
        this.load.image("ready_button", "./Design/Objects/Buttons/ready_button.png");
        this.load.image("details_button", "./Design/Objects/Buttons/details_button.png");
        // Cargar botones seleccionados
        this.load.image("ready_button_select", "./Design/Objects/Buttons/ready_button_select.png");
        this.load.image("details_button_select", "./Design/Objects/Buttons/details_button_select.png");
        // Cargar música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");
        // Sonido
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        // Fondo
        this.howToPlay;
        // Botones
        this.readyButton;
        this.detailsButton;
        this.readyButtonSelect;
        this.detailsButtonSelect;
        // Teclas
        this.aKey;
        this.dKey;
        this.leftKey;
        this.rightKey;
        this.enterKey;
        // Contador para el array de botones
        this.cont;
        // Array de botones
        this.options;
        // La canción loopeada
        this.loop;
        // Efectos de Sonido
        this.change_options;
        this.choose_options;
    }// Fin preload

    create(){
        // Fondo
        this.howToPlay = this.add.image(0, 0, "how_to_play_scene").setOrigin(0, 0).setDepth(0);
        // Botón
        this.readyButton = this.add.image(800, 500, "ready_button").setDepth(1);
        this.detailsButton = this.add.image(400, 490, "details_button").setDepth(1);
        this.readyButtonSelect = this.add.image(800, 500, "ready_button_select").setDepth(2);
        this.detailsButtonSelect = this.add.image(400, 490, "details_button_select").setDepth(2);
        // Movimiento
        var tween = this.tweens.add({
            targets: this.readyButton,
            scaleX: 0.90,
            scaleY: 0.90,
            ease: 'Sine.easeInOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        });
        var tween = this.tweens.add({
            targets: this.readyButtonSelect,
            scaleX: 0.90,
            scaleY: 0.90,
            ease: 'Sine.easeInOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        });
        // Teclas
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // Contador para el array de botones
        this.cont = 1;
        // Array de botones
        this.options = [false, true];
        // Música
        this.sound.pauseOnBlur = false;
        this.loop = this.sound.add("how_to_play_song");
        this.loop.play({
            loop : true,
            volume: this.vol
        });
        // Crear sonido
        this.change_options = this.sound.add("change_options");
        this.choose_options = this.sound.add("choose_options");
    }// Fin create

    update(time, delta){
        // Se esconde la imagen de seleción de los botones
        this.readyButtonSelect.alpha = 0;
        this.detailsButtonSelect.alpha = 0;
        // Selección de botones
        if ((Phaser.Input.Keyboard.JustDown(this.aKey) || Phaser.Input.Keyboard.JustDown(this.leftKey)) && this.cont>=1){
            this.options[this.cont] = false;
            this.cont--;
            this.options[this.cont] = true;
            this.readyButton.alpha = 1;
            this.change_options.play();
        } 
        if ((Phaser.Input.Keyboard.JustDown(this.dKey) || Phaser.Input.Keyboard.JustDown(this.rightKey)) && this.cont<=0){
            this.options[this.cont] = false;
            this.cont++;
            this.options[this.cont] = true;
            this.readyButton.alpha = 0;
            this.change_options.play();
        } 
        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.detailsButtonSelect.alpha = 1;
            this.choose_options.play();
        }
        if(this.options[1]){
            this.readyButtonSelect.alpha = 1;
            this.choose_options.play();
        }
        //Cambio de pantalla
        if(this.options[0] && this.enterKey.isDown){
            this.scene.start("how_to_play_details", {loop: this.loop});
        }
        //Cambio de pantalla
        if(this.options[1] && this.enterKey.isDown){
            this.scene.start("level_1", {characters: this.characters, volume: this.vol});
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}// Fin clase HowToPlayScene