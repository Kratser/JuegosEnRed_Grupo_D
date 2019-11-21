class Connecting extends Phaser.Scene{
    constructor(){
        super({key: "connecting"})
    }// Fin constructor
    init(data){
        this.vol = data.volume;
        data = null; 
    }
    preload(){
        // Pantalla de Carga
        this.loadingImg = this.add.image(0, 0, "loading_background").setOrigin(0, 0).setDepth(-1);
        var progressBar = this.add.graphics().setDepth(-1);
        var progressBox = this.add.graphics().setDepth(-1);
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(100, 500, 1000, 50);
        var percentText = this.make.text({
            x: 600,
            y: 525,
            text: "0%",
            depth: -1,
            style: {
                fontSize: '25px',
                fontFamily: 'Berlin Sans FB',
                fontStyle: 'bold',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        this.load.on("progress", function(value){
            console.log("Cargado: " + value);
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
        });
        // Se carga la imágenes de los iconos de conectar
        this.load.image("connecting_icon", "./Design/Objects/connecting_icon.png");
        this.load.image("connecting_rock", "./Design/Objects/connecting_rock.png");
        // Se carga la imagen del botón de escape
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
        // Se cargan las imágenes de conexión
        this.load.image("connection_failed_rock", "./Design/Objects/connection_failed_rock.png");
        this.load.image("server_full_rock", "./Design/Objects/server_full_rock.png");
        // Imágenes de los iconos de conectar
        this.connecting_rock;
        this.connectingIcon;
        // Teclas
        this.cursors;
        // Se carga la música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");
        // Sonidos
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
    }
    create(){
        this.cameras.main.fadeIn(500);
        // Se pasa la imagen de fondo a profundidad 0 para que la barra de carga quede por detrás
        this.loadingImg.setDepth(0);
        this.add.image(80, 50, "big_esc");
        this.connecting_rock = this.add.image(600,300,"connecting_rock");
        this.connectingIcon = this.add.image(600,275, "connecting_icon");
        // Animación del icono
        var tweenConnecting = this.tweens.add({
            targets: this.connectingIcon,
            angle: -360,
            duration: 8000,
            repeat: -1
        });
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.connectToServer();
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("how_to_play_song");
        this.loop.play({
            loop : true,
            volume: this.vol
        });
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.cursors[1])){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("main_menu", {volume: this.vol});
            // Se para la música
            this.loop.stop();
        }
    }
    connectToServer(){
        var ip1 = 0;
        var ip2 = 0;
        var that = this;
        var getInfo = $.ajax({
            method: "GET",
            url: "http://10.10.105.197:8080/mango-mambo"
        });
        getInfo.done(function(data){
            // Conexión establecida
            // Si hay espacios disponibles
            if (data.length < 4){
                console.log("Entrando en sala");
                $.ajax({
                	method: "POST",
                	url: "http://10.10.105.197:8080/mango-mambo"
                });
                that.scene.start("online_lobby", {volume: that.vol, players: data});
            }
            // Si no hay espacios disponibles
            else{
                console.log("Sorry, the server is full, please try again later");
                that.add.image(600,300, "server_full_rock");
            }
        });
        getInfo.error(function(){
            // Error de conexión al servidor
            console.log("Server Connection failed, please try again later");
            that.add.image(600,300, "connection_failed_rock");
        });
    }
}