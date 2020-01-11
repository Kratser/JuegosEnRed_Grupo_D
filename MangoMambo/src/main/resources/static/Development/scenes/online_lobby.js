class OnlineLobby extends Phaser.Scene {
    constructor() {
        super({ key: "online_lobby" });
    }// Fin constructor
    init(data) {
        this.players = data.players;
        this.myPlayer = data.client;
        this.ip = data.url;
        this.vol = data.volume;
        data = null;
    }// Fin init
    preload() {
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
        // Boton de escape
        this.load.image("escape_button", "./Design/Objects/Buttons/escape_button.png");
        // Flecha que señala dónde se escribe
        this.load.image("start_msg", "./Design/Objects/start_msg.png");
        // Jugadores
        this.load.image("player1_online", "./Design/Objects/Text/player1_online.png");
        this.load.image("player2_online", "./Design/Objects/Text/player2_online.png");
        this.load.image("player3_online", "./Design/Objects/Text/player3_online.png");
        this.load.image("player4_online", "./Design/Objects/Text/player4_online.png");
        this.playersImg;
        this.load.image("you_G_player", "./Design/Objects/you_G_player.png");
        this.load.image("you_P_player", "./Design/Objects/you_P_player.png");
        this.load.image("you_B_player", "./Design/Objects/you_B_player.png");
        this.load.image("you_Y_player", "./Design/Objects/you_Y_player.png");
        this.myPlayerImg;
        // Imagen de los checks de preparado
        this.load.image("tick", "./Design/Objects/tick.png");
        this.ticks;
        // 3 2 1 mango mambo
        this.load.spritesheet('3_2_1_mango_mambo', './Design/Objects/Text/3_2_1_mango_mambo.png',
        {
            frameWidth: 500,
            frameHeight: 500 
        });
        this.mangoMamboAnim;
        this.startingGame;
        this.animTween;
        // Teclas
        this.cursors;
        // Estado del servidor
        this.refresh;
        this.load.image("connection_failed_rock", "./Design/Objects/connection_failed_rock.png");
        this.serverStatusImg;
        this.serverStatus;
        // Música
        this.load.audio("lobby_music", "./Design/Audio/LobbySong/lobby_music.wav");
        this.loop;
        // Sonidos
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        this.load.audio("hit", "./Design/Audio/SoundFX/hit.wav");
        // Chat
        this.textChat;
        this.chat;
        this.chatMessages;
        // Número de jugadores
        this.numPlayers;
        this.numPlayersReady;
        //ws var
        this.connection;
    }// Fin Preload
    create() {
        // Se crea la imagen de fondo
        this.add.image(0, 0, "lobby_background").setOrigin(0, 0);
        // Boton escape
        this.escapeButton = this.add.image(45, 20, "escape_button").setDepth(1);
        // Flecha que señala dónde se escribe
        this.startMsg = this.add.image(184, 486, "start_msg");
        // Movimiento
        var tweenStart = this.tweens.add({
            targets: this.startMsg,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        // Jugadores
        this.playersImg = [];
        this.playersImg[0] = this.add.image(169.09, 67, "player1_online");
        this.playersImg[0].setAlpha(0);
        this.playersImg[1] = this.add.image(454.08, 67, "player2_online");// Y: 66.06
        this.playersImg[1].setAlpha(0);
        this.playersImg[2] = this.add.image(740.78, 67, "player3_online");// Y: 66.16
        this.playersImg[2].setAlpha(0);
        this.playersImg[3] = this.add.image(1030.02, 67, "player4_online");// Y:66.14
        this.playersImg[3].setAlpha(0);
        // Imagen de los checks de preparado
        this.ticks = [];
        this.ticks[0] = this.add.image(258.50, 66.50, "tick");
        this.ticks[0].setAlpha(0);
        this.ticks[1] = this.add.image(543.50, 66.50, "tick");
        this.ticks[1].setAlpha(0);
        this.ticks[2] = this.add.image(830.50, 66.50, "tick");
        this.ticks[2].setAlpha(0);
        this.ticks[3] = this.add.image(1119.50, 66.50, "tick");
        this.ticks[3].setAlpha(0);
        // Teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // Se añade el cliente a la lista de jugadores
        this.players[this.myPlayer.id] = this.myPlayer;
        switch (this.myPlayer.id) {
            case 0:
                this.myPlayerImg = this.add.image(169.50, 81.88, "you_G_player");
                break;
            case 1:
                this.myPlayerImg = this.add.image(454.50, 81.88, "you_P_player");
                break;
            case 2:
                this.myPlayerImg = this.add.image(741.50, 81.88, "you_B_player");
                break;
            case 3:
                this.myPlayerImg = this.add.image(1029.50, 81.88, "you_Y_player");
                break;
        }
        this.hit = this.sound.add("hit");
        // Texto del chat
        this.textChat = this.make.text({
            x: 202,
            y: 473,
            text: "Texto",
            style: {
                fontSize: '25px',
                fontFamily: 'Berlin Sans FB',
                color: '#ffffff',
                align: 'left'
            }
        });
        this.textChat.text = "";
        var text = [];
        var contLines = 0;
        this.input.keyboard.on("keydown", function (event) {
            var that = this.scene;
            if (event.keyCode == 8) {
                if (that.textChat.text.length == 0) {
                    if (contLines > 0) {
                        that.textChat.text = text[contLines - 1];
                        contLines--;
                    }
                } else {
                    var textDelete = [];
                    for (var i = 0; i < that.textChat.text.length - 1; i++) {
                        textDelete += that.textChat.text[i];
                    }
                    that.textChat.text = textDelete;
                }
            }
            else if (event.keyCode == 13 && that.textChat.text.length > 0) {
                that.hit.play({
                    volume: that.vol
                });
                text[contLines] = that.textChat.text;
                contLines = 0;
                that.textChat.text = "";
                var newMessage = $.ajax({
                    method: "POST",
                    url: "http://" + that.ip + "/mango-mambo/chat/" + that.myPlayer.id,
                    data: JSON.stringify(text),
                    processData: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                newMessage.done(function (data) {
                    text = [];
                    console.log(data);
                    that.chat = data;
                });
                newMessage.error(function (data) {
                    console.log("Error de conexión");
                    that.serverStatus = false;
                    contLines = text.length - 1;
                    that.textChat.text = text[contLines];
                });
            }
            else if (that.textChat.width < 749) {
                if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
                    that.textChat.text += event.key;
                }
                else if (event.keyCode == 32) {
                    that.textChat.text += " ";
                }
            }
            else {
                text[contLines] = that.textChat.text;
                contLines++;
                that.textChat.text = "";
            }
        });
        this.chatMessages = [];
        for (var i = 0; i < 9; i++) {
            this.chatMessages[i] = this.make.text({
                x: 195,
                y: 162.41 + (27 * i),
                text: "",
                style: {
                    fontSize: '23px',
                    fontFamily: 'Berlin Sans FB',
                    color: '#ffffff',
                    align: 'left'
                }
            });
        }
        // Temporizador para comprobar el estado de los jugadores
        this.refresh = this.time.addEvent({ delay: 100, callback: this.checkPlayers, callbackScope: this, repeat: -1 });
        // Imagen del estado del servidor
        this.serverStatus = true;
        this.serverStatusImg = this.add.image(600, 300, "connection_failed_rock");
        this.serverStatusImg.setAlpha(0);
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.change_options = this.sound.add("change_options");
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("lobby_music");
        this.loop.play({
            loop: true,
            volume: this.vol
        });
        // 3 2 1 mango mambo
        this.mangoMamboAnim = this.add.sprite(600, 300, "3_2_1_mango_mambo").setAlpha(0);
        this.mangoMamboAnim.setScale(0.5);
        this.anims.create({
            key: '3_2_1_mango_mambo',
            frames: this.anims.generateFrameNumbers('3_2_1_mango_mambo', { start: 0, end: 2 }),
            frameRate: 1,
        });
        this.mangoMamboAnim.on("animationcomplete", this.animComplete, this);
        this.startingGame = false;
        this.animTween = this.tweens.add({
            targets: [this.mangoMamboAnim],
            scaleY: 1,
            scaleX: 1,
            ease: 'Sine.easeInOut',
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        this.animTween.stop();
        // Número de jugadores
        this.numPlayers = 0;
        this.numPlayersReady = 0;
    }// Fin Create
    update() {
        // Si el servidor está activo
        if (this.serverStatus) {
            this.serverStatusImg.setAlpha(0);
            console.log(this.mangoMamboAnim.scale);
            // Si hay dos o más jugadores listos, comenzar partida
            if (this.numPlayers >= 2 && this.numPlayers == this.numPlayersReady && !this.startingGame){
                // Se pasa a la selección de personaje
                this.startingGame = true;
                // 3 2 1 mango mambo
                this.mangoMamboAnim.setAlpha(1);
                this.mangoMamboAnim.anims.play("3_2_1_mango_mambo");
                this.animTween.play();
            // Si no están los jugadores listos, se cancela el inicio de partida
            }else if (this.numPlayers < 2 || this.numPlayers != this.numPlayersReady){
                this.startingGame = false;
                this.mangoMamboAnim.setAlpha(0);
                this.animTween.stop();
                this.mangoMamboAnim.setScale(0.5);
                // Si la animación se está reproduciendo se para
                if (this.mangoMamboAnim.anims.isPlaying){
                    this.mangoMamboAnim.anims.stop();
                }
            }
            // Mostrar a los jugadores si entran en el lobby
            for (var i = 0; i < this.players.length; i++) {
                if (this.players[i].isConnected && this.players[i].isReady) {
                    this.playersImg[i].setAlpha(1);
                    this.ticks[i].setAlpha(1);
                } else if (this.players[i].isConnected && !this.players[i].isReady) {
                    this.playersImg[i].setAlpha(0.6);
                    this.ticks[i].setAlpha(0);
                } else {
                    this.playersImg[i].setAlpha(0);
                    this.ticks[i].setAlpha(0);
                }
            }
            // Si se pulsa el cursor hacia arriba
            if (Phaser.Input.Keyboard.JustDown(this.cursors[2])) {
                if (this.players[this.myPlayer.id].isReady) {
                    this.change_options.play({
                        volume: this.vol
                    });
                    this.ticks[this.myPlayer.id].setAlpha(0);
                    this.myPlayer.isReady = false;
                    this.players[this.myPlayer.id] = this.myPlayer;
                    this.updatePlayer();
                }
            }
            // Si se pulsa el cursor hacia abajo
            if (Phaser.Input.Keyboard.JustDown(this.cursors[3])) {
                if (!this.players[this.myPlayer.id].isReady) {
                    this.hit.play({
                        volume: this.vol
                    });
                    this.ticks[this.myPlayer.id].setAlpha(1);
                    this.myPlayer.isReady = true;
                    this.players[this.myPlayer.id] = this.myPlayer;
                    this.updatePlayer();
                }
            }
            // Si se pulsa la tecla ESC
            if (Phaser.Input.Keyboard.JustDown(this.cursors[1])) {
                this.choose_options.play({
                    volume: this.vol
                });
                // Se borra al jugador del servidor y de la lista de jugadores, y se vuelve al menú principal
                this.myPlayer.isReady = false;
                this.myPlayer.isConnected = false;
                this.players[this.myPlayer.id] = this.myPlayer;
                this.updatePlayer();
                this.refresh.pause;
                this.scene.start("main_menu", { volume: this.vol });
                //Se para la música
                this.loop.stop();
            }// Fin if se pulsa la tecla ESC
        }// Fin if(serverStatus)
        else { // Si el servidor no está activo
            this.serverStatusImg.setAlpha(1);
            if (Phaser.Input.Keyboard.JustDown(this.cursors[1])) {
                this.myPlayer.isReady = false;
                this.myPlayer.isConnected = false;
                this.players[this.myPlayer.id] = this.myPlayer;
                this.scene.start("main_menu", { volume: this.vol });
                //Se para la música
                this.loop.stop();
            }
        }
    }// Fin Update
    // Función que comprueba el estado de los jugadores y lo actualiza
    checkPlayers() {
        var that = this;
        var checkPlayerStatus = $.ajax({
            method: "GET",
            url: "http://" + this.ip + "/mango-mambo"
        });
        // Si establece conexión con el servidor se actualizan los jugadores
        checkPlayerStatus.done(function (data) {
            that.players = data;
            that.players[that.myPlayer.id] = that.myPlayer;
            console.log(that.players);
            that.serverStatus = true;
            that.updatePlayer();
            // Se actualiza el número de jugadores conectados y listos
            var playersConnected = 0;
            var playersReady = 0;
            for (var i = 0; i < that.players.length; i++){
                if (that.players[i].isConnected){
                    playersConnected++;
                }
                if (that.players[i].isReady){
                    playersReady++;
                }
            }
            that.numPlayers = playersConnected;
            that.numPlayersReady = playersReady;
        });
        // Si no se puede establecer conexión
        checkPlayerStatus.error(function (data) {
            console.log("Error de conexión");
            that.serverStatus = false;
        });
        var checkChatStatus = $.ajax({
            method: "GET",
            url: "http://" + this.ip + "/mango-mambo/chat"
        });
        // Si se establece conexión, se actualiza el chat
        checkChatStatus.done(function (data) {
            that.chat = data;
            for (var i = 0; i < that.chat.length; i++) {
                that.chatMessages[i].text = that.chat[i];
                switch (that.chatMessages[i].text[7]) {
                    case "1":
                        that.chatMessages[i].tint = 0x02ff0a;
                        break;
                    case "2":
                        that.chatMessages[i].tint = 0xf800ff;
                        break;
                    case "3":
                        that.chatMessages[i].tint = 0x00fff5;
                        break;
                    case "4":
                        that.chatMessages[i].tint = 0xffff00;
                        break;
                }
            }
        });
        // Si falla la conexión
        checkChatStatus.error(function (data) {
            console.log("Error de conexión");
            that.serverStatus = false;
        });
    }// Fin CheckPlayers
    // Función que actualiza el estado de nuestro jugador
    updatePlayer() {
        var that = this;
        var playerUpdate = $.ajax({
            method: "PUT",
            url: "http://" + that.ip + "/mango-mambo/" + that.myPlayer.id,
            data: JSON.stringify(that.myPlayer),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        });
        playerUpdate.done(function (data) {
            that.players[data.id] = data;
        });
        playerUpdate.error(function (data) {
            console.log("Error de conexión");
            that.serverStatus = false;
        });
    }// Fin UpdatePlayer
    // Función que se ejecuta tras la animación 3, 2, 1, Mango Mambo!
    animComplete(animation, frame){
        if (this.startingGame) {
            //Se establece la conexión ws
            this.startWS();
            // Cambio de escena
            this.scene.start("ws_choose_character", { volume: this.vol, myPlayer: this.myPlayer, connection: this.connection });
            //Se para la música
            this.loop.stop();
        }
    }// Fin AnimComplete
    startWS(){
        this.connection = new WebSocket('ws://' + this.ip + '/mango-mambo/ws_choose_character');
        this.connection.onopen = function(){
            this.connection.send ('Open');
            console.log("WS Open");
        }
        this.connection.onerror = function(e) {
            console.log("WS error: " + e);
        }
    }// Fin startWS
}// Fin Online_Lobby.js