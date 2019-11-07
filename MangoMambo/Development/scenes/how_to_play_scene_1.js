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
        this.load.on("fileprogress", function(file){
            console.log(file.src);
        });
        this.load.on("complete", function(){
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });
        // Cargar imagen
        this.load.image("how_to_play_scene_background", "./Design/Stages/Backgrounds/how_to_play_scene.png");
        // Imágenes de las rocas
        this.load.image("how_to_play_rock", "./Design/Objects/how_to_play_rock.png");
        this.load.image("how_to_play_rock_details", "./Design/Objects/how_to_play_rock_details.png");
        // Cargar botones
        this.load.image("ready_button", "./Design/Objects/Buttons/ready_button.png");
        this.load.image("details_button", "./Design/Objects/Buttons/details_button.png");
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
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
        this.howToPlayRock;
        this.howToPlayRockDetails;
        // Botones
        this.readyButton;
        this.detailsButton;
        this.readyButtonSelect;
        this.detailsButtonSelect;
        this.bigEsc;
        // Menu de detalles
        this.details;
        // Teclas
        this.aKey;
        this.dKey;
        this.leftKey;
        this.rightKey;
        this.enterKey;
        this.escKey;
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
        this.cameras.main.fadeIn(500);
        // Fondo
        this.howToPlay = this.add.image(0, 0, "how_to_play_scene_background").setOrigin(0, 0).setDepth(0);
        this.howToPlayRock = this.add.image(600, 300, "how_to_play_rock");
        this.howToPlayRockDetails = this.add.image(600, 300, "how_to_play_rock_details");
        this.howToPlayRockDetails.alpha = 0;
        // Botones
        this.readyButton = this.add.image(800, 500, "ready_button").setDepth(1);
        this.detailsButton = this.add.image(400, 490, "details_button").setDepth(1);
        this.bigEsc = this.add.image(100, 50, "big_esc");
        this.bigEsc.alpha = 0;
        this.readyButtonSelect = this.add.image(800, 500, "ready_button_select").setDepth(2);
        this.detailsButtonSelect = this.add.image(400, 490, "details_button_select").setDepth(2);
        // Menú de detalles
        this.details = false;
        // Movimiento
        var tweenReadyButton = this.tweens.add({
            targets: [this.readyButton, this.readyButtonSelect],
            scaleX: 0.97,
            scaleY: 0.97,
            ease: 'Sine.easeInOut',
            duration: 3000,
            yoyo: true,
            repeat: -1
        });
        // Teclas
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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
        if (((Phaser.Input.Keyboard.JustDown(this.aKey) || Phaser.Input.Keyboard.JustDown(this.leftKey)) && this.cont>=1) && !this.details){
            this.options[this.cont] = false;
            this.cont--;
            this.options[this.cont] = true;
            this.readyButton.alpha = 1;
            this.change_options.play({
                volume: this.vol
            });
        } 
        if (((Phaser.Input.Keyboard.JustDown(this.dKey) || Phaser.Input.Keyboard.JustDown(this.rightKey)) && this.cont<=0) && !this.details){
            this.options[this.cont] = false;
            this.cont++;
            this.options[this.cont] = true;
            this.readyButton.alpha = 0;
            this.change_options.play({
                volume: this.vol
            });
        } 
        //Resaltado de botón seleccionado
        if(this.options[0]){
            this.detailsButtonSelect.alpha = 1;
        }
        if(this.options[1]){
            this.readyButtonSelect.alpha = 1;
        }
        // Mostrar detalles
        if(this.options[0] && Phaser.Input.Keyboard.JustDown(this.enterKey)){
            this.details = true;
            var tween = this.tweens.add({
                targets: [this.howToPlayRock, this.detailsButton, this.detailsButtonSelect,
                          this.readyButton, this.readyButtonSelect],
                alpha: 0,
                ease: 'Sine.easeInOut',
                duration: 200,
            });
            var tween = this.tweens.add({
                targets: [this.howToPlayRockDetails, this.bigEsc],
                alpha: 1,
                ease: 'Sine.easeInOut',
                duration: 200,
            });
            this.options[0] = false;
            this.choose_options.play({
                volume: this.vol
            });
        }
        // Cambio de pantalla
        if(this.options[1] && this.enterKey.isDown){
            this.scene.start("level_1", {characters: this.characters, volume: this.vol});
            // Se para la música
            this.loop.stop();
            this.choose_options.play({
                volume: this.vol
            });
        }
        // Esconder los detalles
        if(this.escKey.isDown && this.details){
            this.choose_options.play({
                volume: this.vol
            });
            this.details = false;
            var tween = this.tweens.add({
                targets: [this.howToPlayRock, this.detailsButton, this.detailsButtonSelect,
                          this.readyButton, this.readyButtonSelect],
                alpha: 1,
                ease: 'Sine.easeInOut',
                duration: 200,
            });
            var tween = this.tweens.add({
                targets: [this.howToPlayRockDetails, this.bigEsc],
                alpha: 0,
                ease: 'Sine.easeInOut',
                duration: 200,
                onComplete: function(){this.options[0] = true;}.bind(this)
            });
            this.options[0] = false;
            this.choose_options.play({
                volume: this.vol
            });
        }
    }// Fin update
}// Fin clase HowToPlayScene