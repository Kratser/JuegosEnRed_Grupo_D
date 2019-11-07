class Options extends Phaser.Scene {
    constructor(){
        super({key: "options"});
    }// Fin constructor

    init(data){
        // Inicializamos vol
        if(data.volume == undefined){
            this.vol = 1;
        }else{
        this.vol = data.volume;
        }
        data = null;
    }

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
        // Cargar la imagen de fondo
        this.load.image("options_background", "./Design/Stages/Backgrounds/options_background.png");
        // Buttons
        //this.load.image("tutorial_button", "./Design/Objects/Buttons/tutorial_button.png"); NO SE INCLUYE EN ESTA FASE
        this.load.image("sound_button", "./Design/Objects/Buttons/sound_button.png");
        this.load.image("credits_button", "./Design/Objects/Buttons/credits_button.png");
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
        // Selected buttons
        //this.load.image("tutorial_button_select", "./Design/Objects/Buttons/tutorial_button_select.png"); NO SE INCLUYE EN ESTA FASE
        this.load.image("sound_button_select", "./Design/Objects/Buttons/sound_button_select.png");
        this.load.image("credits_button_select", "./Design/Objects/Buttons/credits_button_select.png");
        // Imagenes para modificar el sonido
        this.load.image("volume_background", "./Design/Objects/volume_background.png");
        this.load.image("minus", "./Design/Objects/Buttons/minus.png");
        this.load.image("plus", "./Design/Objects/Buttons/plus.png");
        this.load.image("rectangle", "./Design/Objects/rectangle.png");
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
        // Array de booleanos para ver si tiene que aparecer
        this.boolStripes;
        // Array con las lineas del volumen
        this.volumeStripes;
        // Contador para moverse por el array de sonidos
        this.cont2;
    }// Fin preload

    create(){
        this.cameras.main.fadeIn(500);
        // Fondo
        this.background = this.add.image(0, 0, "options_background").setOrigin(0,0).setDepth(0);
        // Botones 
        //this.tutorialButton = this.add.image(900, 130, "tutorial_button").setDepth(1); NO SE INCLUYE EN ESTA FASE
        this.soundButton = this.add.image(900, 290, "sound_button").setDepth(1);
        this.creditsButton = this.add.image(900, 130, "credits_button").setDepth(1);
        this.bigEsc = this.add.image(90.50, 538.50, "big_esc").setDepth(1);
        //this.tutorialButtonSelect = this.add.image(900, 130, "tutorial_button_select").setDepth(2); NO SE INCLUYE EN ESTA FASE
        this.soundButtonSelect = this.add.image(900, 290, "sound_button_select").setDepth(2);
        this.creditsButtonSelect = this.add.image(900, 130, "credits_button_select").setDepth(2);
        // Imagenes para modificar el sonido
        this.volumeBackground = this.add.image(900, 469, "volume_background").setDepth(0);
        this.volumeBackground.alpha = 0;
        this.minus = this.add.image(724.50, 468.50, "minus").setDepth(2);
        this.minus.alpha = 0;
        this.plus = this.add.image(1080, 465.50, "plus").setDepth(2);
        this.plus.alpha = 0;
        // Marcadores de subir volumen
        this.rec1 = this.add.image(798.99, 467.64, "rectangle").setDepth(1);
        this.rec2 = this.add.image(826.99, 467.64, "rectangle").setDepth(1);
        this.rec3 = this.add.image(855.99, 467.64, "rectangle").setDepth(1);
        this.rec4 = this.add.image(884.99, 467.64, "rectangle").setDepth(1);
        this.rec5 = this.add.image(913.99, 467.64, "rectangle").setDepth(1);
        this.rec6 = this.add.image(942.99, 467.64, "rectangle").setDepth(1);
        this.rec7 = this.add.image(971.99, 467.64, "rectangle").setDepth(1);
        this.rec8 = this.add.image(1001.99, 467.64, "rectangle").setDepth(1);
        // Array de lineas de volumen
        this.volumeStripes = [this.rec1, this.rec2, this.rec3, this.rec4, this.rec5, this.rec6, this.rec7, this.rec8];
        // Array de visibilidad de lineas de volumen
        this.boolStripes = [false, false, false, false, false, false, false, false];
        // Array de teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[4] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[5] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors[6] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors[7] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cursors[8] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.cursors[9] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // Contador para el array de botones
        this.cont = 0;
        // Array de botones
        this.options = [true, false];
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.change_options = this.sound.add("change_options");
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("character_selection");
        this.loop.play({
            loop : true,
            volume: this.vol
        });
        // Contador para el array de lineas de volumen
        this.cont2 = 8 * this.vol;
    }// Fin create

    update(time, delta){
        // Se esconde la imagen de seleción de los botones
        //this.tutorialButtonSelect.alpha = 0; NO SE INCLUYE EN ESTA FASE
        this.soundButtonSelect.alpha = 0;
        this.creditsButtonSelect.alpha = 0;
        // Selección de botones
        if ((Phaser.Input.Keyboard.JustDown(this.cursors[1]) || Phaser.Input.Keyboard.JustDown(this.cursors[3])) && this.cont<=0){
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
            this.creditsButtonSelect.alpha = 1;
        }
        if(this.options[1]){
            this.soundButtonSelect.alpha = 1;
        }

        // Aparece la configuración de sonido
        if (this.options[1]) {
            this.volumeBackground.alpha = 1;
            // Comprueba las lineas de sonido
            for (var i = 0; i < this.boolStripes.length; i++) {
                if(i < this.cont2){
                    this.boolStripes[i] = true;
                }else{
                    this.boolStripes[i] = false;
                }
            }// Fin for
            // Bajar volumen
            if ((Phaser.Input.Keyboard.JustDown(this.cursors[6]) || Phaser.Input.Keyboard.JustDown(this.cursors[8])) && this.cont2 >= 1) {
                this.minus.alpha = 1;
                this.cont2--;
                this.change_options.play({
                    volume: this.vol
                });
                this.vol = this.cont2/8;
                this.loop.setVolume(this.vol);
            } else {
                this.minus.alpha = 0;
            }
            // Subir volumen
            if ((Phaser.Input.Keyboard.JustDown(this.cursors[7]) || Phaser.Input.Keyboard.JustDown(this.cursors[9])) && this.cont2 <= 7) {
                this.plus.alpha = 1;
                this.cont2++;
                this.change_options.play({
                    volume: this.vol
                });
                this.vol = this.cont2/8;
                // console.log(this.vol);
                this.loop.setVolume(this.vol);
            } else {
                this.plus.alpha = 0;
            }
        } else {
            this.volumeBackground.alpha = 0;
            for (var i = 0; i < this.boolStripes.length; i++) {
                this.boolStripes[i] = false;
            }
        }// Fin if aparece sonido
        // Aparezcen las lineas de sonido
        for (var i = 0; i < this.boolStripes.length; i++) {
            if (this.boolStripes[i]) {
                this.volumeStripes[i].alpha = 1;
            } else {
                this.volumeStripes[i].alpha = 0;
            }
        }
        // Vuelta al menú de inicio
        if((this.options[2] && this.cursors[4].isDown) || this.cursors[5].isDown){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("main_menu", {volume: this.vol});
            // Se para la música
            this.loop.stop();
        }
        // Cambio de pantalla
        if(this.options[0] && this.cursors[4].isDown){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("credits", {volume: this.vol});
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}// Fin clase Options