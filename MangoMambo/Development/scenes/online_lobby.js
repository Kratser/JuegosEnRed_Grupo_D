class OnlineLobby extends Phaser.Scene{
    constructor(){
        super({key: "online_lobby"});
    }// Fin constructor
    init(data){
        this.players = data.players;
        this.myPlayer = data.client;
        this.ip = data.url;
        this.vol = data.volume;
        data = null; 
    }
    preload(){
        // Pantalla de Carga
        var loadingImg = this.add.image(0, 0, "loading_background").setOrigin(0, 0).setDepth(-1);
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
        this.load.on("progress", function (value) {
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(110, 510, 980 * value, 30);
        });
        this.load.on("complete", function () {
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });
        // Se carga la imagen de fondo
        this.load.image("lobby_background", "./Design/Stages/Backgrounds/lobby_background.png");
        // Jugadores
        this.load.image("player1_online", "./Design/Objects/Text/player1_online.png");
        this.load.image("player2_online", "./Design/Objects/Text/player2_online.png");
        this.load.image("player3_online", "./Design/Objects/Text/player3_online.png");
        this.load.image("player4_online", "./Design/Objects/Text/player4_online.png");
        this.playersImg;
        // Teclas
        this.cursors;
        // Estado del servidor
        this.load.image("connection_failed_rock", "./Design/Objects/connection_failed_rock.png");
        this.serverStatusImg;
        this.serverStatus;
    }
    create(){
        // Se crea la imagen de fondo
        this.add.image(0, 0, "lobby_background").setOrigin(0, 0);
        // Jugadores
        this.playersImg = [];
        this.playersImg[0] = this.add.image(273.20, 138.95, "player1_online");
        this.playersImg[0].setAlpha(0);
        this.playersImg[1] = this.add.image(273.20, 238.50, "player2_online");
        this.playersImg[1].setAlpha(0);
        this.playersImg[2] = this.add.image(273.20, 341.19, "player3_online");
        this.playersImg[2].setAlpha(0);
        this.playersImg[3] = this.add.image(273.20, 442.83, "player4_online");
        this.playersImg[3].setAlpha(0);
        // Teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // Se añade el cliente a la lista de jugadores
        this.players[this.myPlayer.id] = this.myPlayer;
        // Tween de la imagen del jugador
        var tweenPlayer = this.tweens.add({
            targets: this.playersImg[this.myPlayer.id],
            alpha: { from: 0.35, to: 1 },
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        // Temporizador para comprobar el estado de los jugadores
        this.time.addEvent({ delay: 5000, callback: this.checkPlayers, callbackScope: this, repeat: -1});
        // Imagen del estado del servidor
        this.serverStatus = true;
        this.serverStatusImg = this.add.image(600, 300, "connection_failed_rock");
        this.serverStatusImg.setAlpha(0);
    }
    update(){
        // Si el servidor está activo
        if (this.serverStatus){
            this.serverStatusImg.setAlpha(0);
            // Si se pulsa la tecla ESC
            if (Phaser.Input.Keyboard.JustDown(this.cursors[1])) {
                var that = this;
                // Se borra al jugador del servidor y de la lista de jugadores, y se vuelve al menú principal
                var deletePlayer = $.ajax({
                    method: "DELETE",
                    url: "http://" + this.ip + "/mango-mambo/" + this.myPlayer.id
                });
                deletePlayer.done(function (data) {
                    that.players[data.id] = data;
                    that.scene.start("main_menu", { volume: this.vol });
                });
                deletePlayer.error(function (data) {
                    console.log("Error de conexión");
                    that.serverStatus = false;
                });
            }// Fin if se pulsa la tecla ESC
        }// Fin if(serverStatus)
        else{ // Si el servidor no está activo
            this.serverStatusImg.setAlpha(1);
            if (Phaser.Input.Keyboard.JustDown(this.cursors[1])) {
                this.scene.start("main_menu", { volume: this.vol });
            }
        }
    }
    // Función que comprueba el estado de los jugadores y lo actualiza
    checkPlayers(){
        var that = this;
        var checkStatus = $.ajax({
            method: "GET",
            url: "http://"+ this.ip +"/mango-mambo"
        });
        // Si establece conexión con el servidor se actualizan los jugadores
        checkStatus.done(function(data){
            that.players = data;
            console.log(that.players);
            that.serverStatus = true;
            that.myPlayer.isConnected = true;
            $.ajax({
            	method: "PUT",
            	url: "http://"+ that.ip +"/mango-mambo/" + that.myPlayer.id,
            	data: JSON.stringify(that.myPlayer),
            	processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function(data){
                that.players[data.id] = data;
            });
         // Mostrar a los jugadores si entran en el lobby
            if (that.players[0] && that.players[0].isConnected && that.players[0].isReady) {
            	that.playersImg[0].setAlpha(1);
            } else if(that.players[0] && that.players[0].isConnected && !that.players[0].isReady){
            	that.playersImg[0].setAlpha(0.6);
            } else {
            	that.playersImg[0].setAlpha(0);
            }
            if (that.players[1] && that.players[1].isConnected && that.players[1].isReady) {
            	that.playersImg[1].setAlpha(1);
            } else if (that.players[1] && that.players[1].isConnected && !that.players[1].isReady){
            	that.playersImg[1].setAlpha(0.6);
            } else {
            	that.playersImg[1].setAlpha(0);
            }
            if (that.players[2] && that.players[2].isConnected && that.players[2].isReady) {
            	that.playersImg[2].setAlpha(1);
            } else if (that.players[2] && that.players[2].isConnected && !that.players[2].isReady){
            	that.playersImg[2].setAlpha(0.6);
            } else {
            	that.playersImg[2].setAlpha(0);
            }
            if (that.players[3] && that.players[3].isConnected && that.players[3].isReady) {
            	that.playersImg[3].setAlpha(1);
            } else if(that.players[3] && that.players[3].isConnected && !that.players[3].isReady){
            	that.playersImg[3].setAlpha(0.6);
            } else {
            	that.playersImg[3].setAlpha(0);
            }
        });
        // Si no se puede establecer conexión
        checkStatus.error(function(data){
            console.log("Error de conexión");
            that.serverStatus = false;
        });
    }
}