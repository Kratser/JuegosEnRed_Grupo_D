class WSScoreLevel extends Phaser.Scene {
    constructor() {
        super({ key: "ws_score_level" });
    }// Fin constructor

    init(data) {
        this.characters = data.characters;
        this.vol = data.volume;
        this.myPlayer = data.myPlayer;
        this.numPlayers = this.characters.length;
        this.ip = data.ip;
        this.myPlayerIdx = this.characters.findIndex(function(p){return p.id == data.myPlayer.id});
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
        //Conexión web sockets
        var that = this;
        this.connection;
        this.connection = new WebSocket('ws://' + this.ip + '/ws-score-level');
        this.connection.onopen = function () {
            console.log("WS Open");
            this.send(JSON.stringify({ type: "connect", id: that.myPlayer.id, numPlayers: that.numPlayers}));
        }
        this.connection.onerror = function (e) {
            console.log("WS error: " + e);
        }
        // Cargar la imagen de fondo
        this.load.image("score_level_background", "./Design/Stages/Backgrounds/score_level_background.png");
        // Personas de fondo
        this.load.image("people", "./Design/Stages/Backgrounds/people_end_level.png");
        // Corona del ganador
        this.load.image("crown", "./Design/Objects/crown.png");
        // Totems
        this.load.image("g_totem", "./Design/Objects/Totems/green_totem.png");
        this.load.image("p_totem", "./Design/Objects/Totems/pink_totem.png");
        this.load.image("b_totem", "./Design/Objects/Totems/blue_totem.png");
        this.load.image("y_totem", "./Design/Objects/Totems/yellow_totem.png");
        // Leyenda ready
        this.load.image("ready_htps", "./Design/Objects/Buttons/ready_htps.png");
        // Se carga la música
        this.load.audio("score_level_music", "./Design/Audio/ScoreLevelSong/score_level_music.wav");
        // Se carga el efecto
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        // Jugadores preparados
        this.load.image("players_ready", "./Design/Objects/players_ready.png");
        this.load.image("g_ready", "./Design/Objects/g_ready.png");
        this.load.image("p_ready", "./Design/Objects/p_ready.png");
        this.load.image("b_ready", "./Design/Objects/b_ready.png");
        this.load.image("y_ready", "./Design/Objects/y_ready.png");
        this.load.image("tick", "./Design/Objects/tick.png");
        // Personas que se mueven
        this.peopleMove;
        // Totems
        this.gTotem;
        this.pTotem;
        this.bTotem;
        this.yTotem;
        // Array que contiene las coronas de los ganadores
        this.crowns;
        // Botón escape
        this.escapeButton;
        // Leyenda ready
        this.readyHtps;
        // Puntuación máxima
        this.maxScore;
        // ESCAPE
        this.escapeCursor;
        // Jugadores preparados
        this.playersReady;
        this.gReady;
        this.pReady;
        this.bReady;
        this.yReady;
        this.tick1;
        this.tick2;
        this.tick3;
        this.tick4;
        this.ticks;
        this.readys;
        this.contReady;
        // Puntuaciones de los jugadores
        this.scores;
        // La canción loopeada
        this.loop;
        // Jugadores
        this.players;
        // Temporizador para comprobar si el jugador ha abandonado la partida
        this.playerCheck;
    }// Fin preload

    create() {
        var that = this;
        this.cameras.main.fadeIn(500);
        // Fondo
        this.add.image(0, 0, "score_level_background").setOrigin(0, 0);
        // Personas que se mueven
        this.peopleMove = this.add.image(600, 525, "people").setDepth(0);
        // Movimiento
        var tween = this.tweens.add({
            targets: this.peopleMove,
            y: 510,
            ease: 'Sine.easeInOut',
            duration: 400,
            yoyo: true,
            repeat: -1
        });
        // Jugadores preparados
        this.playersReady = this.add.image(1081.80, 28, "players_ready");
        this.gReady = this.add.image(997.50, 28.5, "g_ready").setDepth(2);
        this.gReady.alpha = 0;
        this.pReady = this.add.image(1054.73, 28.5, "p_ready").setDepth(2);
        this.pReady.alpha = 0;
        this.bReady = this.add.image(1110.25, 28.5, "b_ready").setDepth(2);
        this.bReady.alpha = 0;
        this.yReady = this.add.image(1166.23, 28.5, "y_ready").setDepth(2);
        this.yReady.alpha = 0;
        this.tick1 = this.add.image(997.50, 28.5, "tick").setScale(0.8).setDepth(3);
        this.tick1.alpha = 0;
        this.tick2 = this.add.image(1054.73, 28.5, "tick").setScale(0.8).setDepth(3);
        this.tick2.alpha = 0;
        this.tick3 = this.add.image(1110.25, 28.5, "tick").setScale(0.8).setDepth(3);
        this.tick3.alpha = 0;
        this.tick4 = this.add.image(1166.23, 28.5, "tick").setScale(0.8).setDepth(3);
        this.tick4.alpha = 0;
        this.ticks = [this.tick1, this.tick2, this.tick3, this.tick3];
        this.readys = [];
        this.readys = [this.gReady, this.pReady, this.bReady, this.yReady];
        this.contReady = 0;
        // Jugadores conectados recuadro
        for (var i = 0; i < this.characters.length; i++) {
            console.log(this.characters[i]);
            if (this.characters[i]) {
                this.readys[this.characters[i].id].setAlpha(1);
            }
        }
        this.readyHtps = this.add.image(1100, 568, "ready_htps").setDepth(3);
        //Jugadores
        this.players = [{ready:false},{ready:false},{ready:false},{ready:false}];
        // Máxima puntuación que se puede alcanzar 
        this.maxScore = 3;
        // Totems
        this.gTotem = this.add.image(161.50, 687, "g_totem");
        this.pTotem = this.add.image(448.00, 687, "p_totem");
        this.bTotem = this.add.image(742, 687, "b_totem");
        this.yTotem = this.add.image(1039, 687, "y_totem");
        // Corona del ganador
        this.player1_crown = this.add.image(161.50, -40, "crown");
        this.player2_crown = this.add.image(448.00, -40, "crown");
        this.player3_crown = this.add.image(742.00, -40, "crown");
        this.player4_crown = this.add.image(1039, -40, "crown");
        // Array que contiene las coronas de los ganadores
        this.crowns = [this.player1_crown, this.player2_crown, this.player3_crown, this.player4_crown];
        // Movimiento
        var tweenCrownDown = this.tweens.add({
            targets: [this.player1_crown, this.player2_crown, this.player3_crown, this.player4_crown],
            y: 55,
            ease: 'Sine.easeInOut',
            duration: 3000,
        });
        var tweenCrown = this.tweens.add({
            targets: [this.player1_crown, this.player2_crown, this.player3_crown, this.player4_crown],
            scaleX: 0.90,
            scaleY: 0.90,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        // Para que no aparezca la corona hasta que no gane
        this.player1_crown.alpha = 0;
        this.player2_crown.alpha = 0;
        this.player3_crown.alpha = 0;
        this.player4_crown.alpha = 0;

        for (var i = 0; i < this.characters.length; i++) {
            switch (this.characters[i].id) {
                // Jugador 1
                case 0:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"],
                        false, 161.50, 532, this.characters[i].score);
                    this.characters[i].y = this.characters[i].y - this.characters[i].height / 2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.gTotem,
                        y: 687 - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    break;
                // Jugador 2
                case 1:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"],
                        false, 448.00, 532, this.characters[i].score);
                    this.characters[i].y = this.characters[i].y - this.characters[i].height / 2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.pTotem,
                        y: 687 - (this.characters[i].score / this.maxScore) * 210, // 430 max
                        duration: 2500
                    });
                    break;
                // Jugador 3    
                case 2:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"],
                        false, 742.00, 532, this.characters[i].score);
                    // y del nuevo sprite (_choose)
                    this.characters[i].y = this.characters[i].y - this.characters[i].height / 2;
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.bTotem,
                        y: 687 - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    break;
                // Jugador 4   
                case 3:
                    // Personaje
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0] + ["_choose"],
                        false, 1039, 532, this.characters[i].score);
                    this.characters[i].y = this.characters[i].y - this.characters[i].height / 2;
                    // Animación subida personaje
                    var tweenCha = this.tweens.add({
                        targets: this.characters[i],
                        y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210,
                        duration: 2500
                    });
                    // Animación subida tótem
                    var tweenTot = this.tweens.add({
                        targets: this.yTotem,
                        y: 687 - (this.characters[i].score / this.maxScore) * 210, // 687 min
                        duration: 2500
                    });
                    break;
            }// Fin switch
        }// Fin for
        // Botón escape
        this.escapeButton = this.add.image(45, 20, "escape_button");
        // Máxima puntuación que se puede alcanzar 
        //this.maxScore = 10;
        // ESCAPE
        this.escapeCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // ENTER
        this.enterCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // Puntuaciones de los jugadores
        this.scores = [];
        for (var i = 0; i < this.characters.length; i++) {
            this.scores[i] = this.make.text({
                x: this.characters[i].x - 100,
                y: this.characters[i].y - this.characters[i].height,
                text: this.characters[i].score + " pts",
                style: {
                    fontSize: '30px',
                    fontFamily: 'Berlin Sans FB',
                    fontStyle: 'bold',
                    color: '#06c614',
                    align: 'center',
                    strokeThickness: '5',
                    shadow: (5, 5, 'rgba(170,255,117,0.5)', 5)
                }
            });
            this.scores[i].angle = 20;
            var tween = this.tweens.add({
                targets: this.scores[i],
                y: this.characters[i].y - (this.characters[i].score / this.maxScore) * 210 - this.characters[i].height,
                duration: 2500
            });
        }
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("score_level_music");
        this.loop.play({
            loop: true,
            volume: this.vol
        });

        // Mensajes websockets
        var that = this;
        this.input.keyboard.on("keydown", function (event) {
            if (event.which == 40) {
                that.connection.send(JSON.stringify({ type: "event", id: that.myPlayer.id, idx: that.myPlayerIdx, key: event.key }));
                /*
                console.log(that.connection);
                that.connection.send(JSON.stringify({ id: that.myPlayer.id, key: event.key }));
                that.players[that.myPlayer.id].ready = true;
                that.contReady++;
                // Cuando terminan las rondas vuelve al menu principal
                for (var i = 0; i < that.characters.length; i++) {
                    if (that.characters[i].score >= that.maxScore) {
                        // Aparece la corona del ganador
                        that.crowns[that.characters[i].id - 1].alpha = 1;
                        // Comprobamos los jugadores listos
                        //that.contReady++;
                        if (that.contReady == that.numPlayers) {
                            that.connection.close();
                            that.choose_options.play({
                                volume: that.vol
                            });
                            //API REST
                            that.myPlayer.isReady = false;
                            that.myPlayer.isConnected = false;
                            var playerUpdate = $.ajax({
                                method: "PUT",
                                url: "http://" + that.ip + "/mango-mambo/" + that.myPlayer.id,
                                data: JSON.stringify(that.myPlayer),
                                processData: false,
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                            // Volvemos al menú
                            that.scene.start("main_menu", { volume: that.vol });
                            // Se para la música
                            that.loop.stop();
                        }
                    // Si no se ha llegado a la puntución máxima vuelve a repetir la ronda
                    } else {
                        // Se comprueba que todos los jugadores estén listos
                        if (that.contReady == that.numPlayers) {
                            that.connection.close();
                            that.scene.start("ws_level_1", { characters: that.characters, volume: that.vol, ip: that.ip, myPlayer: that.myPlayer });
                            // Se para la música
                            that.loop.stop();
                            that.choose_options.play({
                                volume: that.vol
                            });
                        }
                        
                    }// Fin if comprobación de la puntución.
                }// Fin for
                */
            //} else if (event.key == "Escape") {
                /*
                that.connection.send(JSON.stringify({ id: that.myPlayer.id, key: event.key }));
                that.connection.close();
                that.myPlayer.isReady = false;
                that.myPlayer.isConnected = false;
                var playerUpdate = $.ajax({
                    method: "PUT",
                    url: "http://" + that.ip + "/mango-mambo/" + that.myPlayer.id,
                    data: JSON.stringify(that.myPlayer),
                    processData: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                */
            }else if (event.key == "Escape") {
                that.connection.send(JSON.stringify({ type: "leave", id: that.myPlayer.id }));
                // Desconectar al jugador
                that.connection.close();
                that.myPlayer.isReady = false;
                that.myPlayer.isConnected = false;
                var playerUpdate = $.ajax({
                    method: "PUT",
                    url: "http://" + that.ip + "/mango-mambo/" + that.myPlayer.id,
                    data: JSON.stringify(that.myPlayer),
                    processData: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                that.scene.start("main_menu", { volume: this.vol });
                // Se para la música
                that.loop.stop();
            }
        });

        this.connection.onmessage = function (msg) {
            var data = JSON.parse(msg.data); // Se convierte el mensaje a JSON
            console.log(data.type + " message received");

            switch (data.type) {
                case "event":
                    if (data.key == "ArrowDown"){
                        // El jugador id, idx se encuentra listo
                        if (that.players[data.idx].ready == false){
                        	that.players[data.idx].ready = true;
                            that.contReady++;
                        }
                    }
                break;

                case "leave":
                    // El jugador id ha abandonado la partida
                	var playerIdx = that.characters.findIndex(function(p){
            			if (p){
            				return p.id == data.id
            			}
            		});
                	if (that.players[playerIdx].ready == true){
                        that.players[playerIdx].ready = false;
                        that.contReady--;
                    }
                    that.numPlayers--;
                    that.readys[data.id].setAlpha(0);

                    var player = {id: data.id, isReady: false, isConnected: false};
                    var playerUpdate = $.ajax({
                        method: "PUT",
                        url: "http://" + that.ip + "/mango-mambo/" + player.id,
                        data: JSON.stringify(player),
                        processData: false,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (that.numPlayers <= 1){
                        console.log("Me quedo solo :C");
                        that.connection.send(JSON.stringify({ type: "leave", id: that.myPlayer.id }));
                        // Desconectar al jugador
                        that.connection.close();
                        that.myPlayer.isReady = false;
                        that.myPlayer.isConnected = false;
                        var playerUpdate = $.ajax({
                            method: "PUT",
                            url: "http://" + that.ip + "/mango-mambo/" + that.myPlayer.id,
                            data: JSON.stringify(that.myPlayer),
                            processData: false,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        that.scene.start("main_menu", { volume: this.vol });
                        //  Se para la música
                        that.loop.stop();
                    }
                break;
            
                default:
                	console.log("Tipo de mensaje no controlado");
                break;
            }
            /*
            console.log("message received");
            var data = JSON.parse(msg.data); // Se convierte el mensaje a JSON
            console.log("Id: " + data.id + ", Key: " + data.key);
            if (data.key == "ArrowDown") {
                if (that.players[data.id].ready == false){
                    that.contReady++;
                }
                that.players[data.id].ready = true;
                // Cuando terminan las rondas vuelve al menu principal
                for (var i = 0; i < that.characters.length; i++) {
                    if (that.characters[i].score >= that.maxScore) {
                        // Aparece la corona del ganador
                        that.crowns[that.characters[i].id - 1].alpha = 1;
                        // Comprobamos los jugadores listos
                        //that.contReady++;
                        if (that.contReady == that.numPlayers) {
                            //API REST
                            that.myPlayer.isReady = false;
                            that.myPlayer.isConnected = false;
                            var playerUpdate = $.ajax({
                                method: "PUT",
                                url: "http://" + that.ip + "/mango-mambo/" + that.myPlayer.id,
                                data: JSON.stringify(that.myPlayer),
                                processData: false,
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                            that.connection.close();
                            that.choose_options.play({
                                volume: that.vol
                            });
                            that.scene.start("main_menu", { volume: that.vol });
                            // Se para la música
                            that.loop.stop();
                        }
                    // Si no ha alcanzado la máxima puntuación nadie
                    } else {
                        if (that.contReady == that.numPlayers) {
                            that.connection.close();
                            that.scene.start("ws_level_1", { characters: that.characters, volume: that.vol, ip: that.ip, myPlayer: that.myPlayer });
                            // Se para la música
                            that.loop.stop();
                            that.choose_options.play({
                                volume: that.vol
                            });
                        }
                    }// Fin if comprobación de la puntución.
                }// Fin for
            }// Fin pulsar abajo
            // Al pulsar el esc vuelves al menú principal
            if (data.key == "Escape") {
                that.connection.close();
                that.myPlayer.isReady = false;
                that.myPlayer.isConnected = false;
                var playerUpdate = $.ajax({
                    method: "PUT",
                    url: "http://" + that.ip + "/mango-mambo/" + that.myPlayer.id,
                    data: JSON.stringify(that.myPlayer),
                    processData: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                that.choose_options.play({
                    volume: that.vol
                });
                that.scene.start("main_menu", { volume: that.vol });
                // Se para la música
                that.loop.stop();
            }// Fin Escape
            */
        }// Fin onmessage

        this.connection.onclose = function (msg) {
            clearInterval(that.playerCheck);
        }

        this.playerCheck = setInterval(function(){
        	that.connection.send(JSON.stringify({ type: "check", id: that.myPlayer.id }));
        }, 30);

    }// Fin Create

    update() {
        // Aparece cuando el jugador está listo
        for(var i = 0; i < this.characters.length; i++){
            if (this.characters[i]){
                if(this.players[this.characters[i].id].ready == true){
                    this.ticks[this.characters[i].id].alpha = 1;
                }else{
                    this.ticks[this.characters[i].id].alpha = 0;
                }
            }
        }

        if (this.contReady == this.numPlayers && this.numPlayers >= 2) {
            console.log("Volvemos a jugar :D");
        }
        /* Cuando terminan las rondas vuelve al menu principal
        for (var i = 0; i < this.characters.length; i++) {
            if (this.characters[i].score >= this.maxScore) {
                // Desaparece el siguiente ronda
                this.nextRound.alpha = 0;
                this.crowns[this.characters[i].id - 1].alpha = 1;
                if (Phaser.Input.Keyboard.JustDown(this.enterCursor)) {
                    this.choose_options.play({
                        volume: this.vol
                    });
                    this.scene.start("main_menu", { volume: this.vol });
                    // Se para la música
                    this.loop.stop();
                }
            }
        }*/// Fin for
        /* ESCAPE para salir al menú principal
        if (Phaser.Input.Keyboard.JustDown(this.escapeCursor)) {
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("main_menu", { volume: this.vol });
            // Se para la música
            this.loop.stop();
        }*/
        /* ENTER para pasar a la siguiente ronda
        if (Phaser.Input.Keyboard.JustDown(this.enterCursor)) {
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("ws_level_1", { characters: this.characters, volume: this.vol });//, {characters: this.characters}
            // Se para la música
            this.loop.stop();
        }*/
    }// Fin update
}// Fin clase EndLevel