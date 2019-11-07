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
        // Cargar texto de créditos
        this.load.image("credits_text", "./Design/Objects/Text/credits_text.png");
        // Buttons
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
        // Se carga la música
        this.load.audio("hawaii", "./Design/Audio/CreditsSong/ZitronSound - Hula Lemon.mp3");
        // Fondo
        this.background;
        // Texto
        this.creditsText;
        // Botones
        this.bigEsc;
        // La canción loopeada
        this.loop;
    }// Fin preload

    create(){
        this.cameras.main.fadeIn(500);
        // Fondo
        this.background = this.add.image(0, 0, "credits_background").setOrigin(0,0).setDepth(0);
        // Texto
        this.creditsText = this.add.image(600, 200, "credits_text").setOrigin(0.5,0).setDepth(1);
        var tweenScroll = this.tweens.add({
            targets: [this.creditsText],
            y: -650,
            duration: 15100
        });
        // Botones 
        this.bigEsc = this.add.image(80, 50, "big_esc").setDepth(1);
        // Array de teclas
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // Sonido
        this.sound.pauseOnBlur = false;
        this.loop = this.sound.add("hawaii");
        this.loop.play({
            loop : true,
            volume: 0.2 * this.vol
        });
    }// Fin create

    update(){
        //Cambio de pantalla
        if(this.escKey.isDown){
            this.scene.start("options", {volume: this.vol});
            // this.scene.add(testingScene, new TestingScene);
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}// Fin clase Credits