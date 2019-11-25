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
        // Imágenes de flechas de selección
        this.load.image("D_arrow_G", "./Design/Objects/Buttons/D_arrow_G.png");
        this.load.image("U_arrow_G", "./Design/Objects/Buttons/U_arrow_G.png");
        this.load.image("D_arrow_P", "./Design/Objects/Buttons/D_arrow_P.png");
        this.load.image("U_arrow_P", "./Design/Objects/Buttons/U_arrow_P.png");
        this.load.image("D_arrow_B", "./Design/Objects/Buttons/D_arrow_B.png");
        this.load.image("U_arrow_B", "./Design/Objects/Buttons/U_arrow_B.png");
        this.load.image("D_arrow_Y", "./Design/Objects/Buttons/D_arrow_Y.png");
        this.load.image("U_arrow_Y", "./Design/Objects/Buttons/U_arrow_Y.png");
        this.upArrows;
        this.downArrows;
        this.load.image("you_G_player", "./Design/Objects/you_G_player.png");
        this.load.image("you_P_player", "./Design/Objects/you_P_player.png");
        this.load.image("you_B_player", "./Design/Objects/you_B_player.png");
        this.load.image("you_Y_player", "./Design/Objects/you_Y_player.png");
        this.myPlayerImg;
        // Imagen de los checks de preparado
        this.load.image("tick", "./Design/Objects/tick.png");
        this.ticks;
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
        // Imágenes de flechas de selección 
        this.upArrows = [];
        this.upArrows[0] = this.add.image(416.55, 138.95, "U_arrow_G");
        this.upArrows[0].setAlpha(0);
        this.upArrows[1] = this.add.image(416.55, 238.50, "U_arrow_P");
        this.upArrows[1].setAlpha(0);
        this.upArrows[2] = this.add.image(416.55, 341.19, "U_arrow_B");
        this.upArrows[2].setAlpha(0);
        this.upArrows[3] = this.add.image(416.55, 442.83, "U_arrow_Y");
        this.upArrows[3].setAlpha(0);
        this.downArrows = [];
        this.downArrows[0] = this.add.image(416.55, 141.80, "D_arrow_G");
        this.downArrows[0].setAlpha(0);
        this.downArrows[1] = this.add.image(416.55, 238.50, "D_arrow_P");
        this.downArrows[1].setAlpha(0);
        this.downArrows[2] = this.add.image(416.55, 341.19, "D_arrow_B");
        this.downArrows[2].setAlpha(0);
        this.downArrows[3] = this.add.image(416.55, 442.83, "D_arrow_Y");
        this.downArrows[3].setAlpha(0);
        this.downArrows[this.myPlayer.id].setAlpha(1);
        // Imagen de los checks de preparado
        this.ticks = [];
        this.ticks[0] = this.add.image(488.50, 137, "tick");
        this.ticks[0].setAlpha(0);
        this.ticks[1] = this.add.image(488.50, 237, "tick");
        this.ticks[1].setAlpha(0);
        this.ticks[2] = this.add.image(488.50, 341, "tick");
        this.ticks[2].setAlpha(0);
        this.ticks[3] = this.add.image(488.50, 441, "tick");
        this.ticks[3].setAlpha(0);
        // Teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // Se añade el cliente a la lista de jugadores
        this.players[this.myPlayer.id] = this.myPlayer;
        switch(this.myPlayer.id){
            case 0:
                this.myPlayerImg = this.add.image(74.50, 138, "you_G_player");
                break;
            case 1:
                this.myPlayerImg = this.add.image(74.50, 238, "you_P_player");
                break;
            case 2:
                this.myPlayerImg = this.add.image(74.50, 344, "you_B_player");
                break;
            case 3:
                this.myPlayerImg = this.add.image(74.50, 443, "you_Y_player");
                break;
        }
        // Tween de la imagen del jugador
        var tweenPlayer = this.tweens.add({
            targets: this.myPlayerImg,
            props: {
            	x: {
            		value: 50.50,
            		duration: 500,
            		yoyo: true,
            		hold: 500
            	},
            	angle: {
            		value: 360,
            		duration: 500,
            		delay: 500,
            		repeatDelay: 1000
            	}
            },
            ease: 'Sine.easeInOut',
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
            // Mostrar a los jugadores si entran en el lobby
            for (var i = 0; i < this.players.length; i++){
                if (this.players[i].isConnected && this.players[i].isReady) {
                    this.playersImg[i].setAlpha(1);
                    this.upArrows[i].setAlpha(1);
                    this.downArrows[i].setAlpha(0);
                    this.ticks[i].setAlpha(1);
                } else if(this.players[i].isConnected && !this.players[i].isReady){
                    this.playersImg[i].setAlpha(0.6);
                    this.upArrows[i].setAlpha(0);
                    this.downArrows[i].setAlpha(1);
                    this.ticks[i].setAlpha(0);
                } else {
                    this.playersImg[i].setAlpha(0);
                    this.upArrows[i].setAlpha(0);
                    this.downArrows[i].setAlpha(0);
                    this.ticks[i].setAlpha(0);
                }
            }
            // Si se pulsa el cursor hacia arriba
            if (Phaser.Input.Keyboard.JustDown(this.cursors[2])){
                if (this.players[this.myPlayer.id].isReady){
                    this.players[this.myPlayer.id].isReady = false;
                    this.upArrows[this.myPlayer.id].setAlpha(0);
                    this.downArrows[this.myPlayer.id].setAlpha(1);
                    this.ticks[this.myPlayer.id].setAlpha(0);
                    this.updatePlayer();
                }
            }
            // Si se pulsa el cursor hacia abajo
            if (Phaser.Input.Keyboard.JustDown(this.cursors[3])){
                if (!this.players[this.myPlayer.id].isReady){
                    this.players[this.myPlayer.id].isReady = true;
                    this.upArrows[this.myPlayer.id].setAlpha(1);
                    this.downArrows[this.myPlayer.id].setAlpha(0);
                    this.ticks[this.myPlayer.id].setAlpha(1);
                    this.updatePlayer();
                }
            }
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
            that.updatePlayer();
        });
        // Si no se puede establecer conexión
        checkStatus.error(function(data){
            console.log("Error de conexión");
            that.serverStatus = false;
        });
    }
    updatePlayer(){
        var that = this;
        $.ajax({
            method: "PUT",
            url: "http://"+ that.ip +"/mango-mambo/" + that.myPlayer.id,
            data: JSON.stringify(that.players[that.myPlayer.id]),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function(data){
            that.players[data.id] = data;
        });
    }
}