class Credits extends Phaser.Scene {
    constructor(){
        super({key: "credits"});
    }// Fin constructor

    init(data){
        this.vol = data.volume;
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
        this.load.image("credits_background", "./Design/Stages/Backgrounds/credits_background.png");
        // Buttons
        this.load.image("back_button", "./Design/Objects/Buttons/back_button.png");
        // Selected buttons
        this.load.image("back_button_select", "./Design/Objects/Buttons/back_button_select.png");
        // Se carga la música
        this.load.audio("hawaii", "./Design/Audio/CreditsSong/ZitronSound - Hula Lemon.mp3");
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
            volume: 0.2 * this.vol
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
            this.scene.start("options", {volume: this.vol});
            // this.scene.add(testingScene, new TestingScene);
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}// Fin clase Credits