class WSChooseCharacter extends Phaser.Scene {
    constructor() {
        super({ key: "ws_choose_character" });
    }//Fin constructor

    init(data) {
        this.vol = data.volume;
        this.myPlayer = data.myPlayer;
        this.connection = data.connection;
        this.numPlayers = data.numPlayers;
        this.ip = data.ip;
        data = null;
    }

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
        // Sonido
        this.intro;
        this.loop;
        // Arrays para los textos
        this.names;
        this.habilities;
        // Jugadores
        this.players;
        // Lista de jugadores
        this.characters;
        this.charactersSelected;
        // Controles de selección
        this.cursors;
        // ENTER
        this.enterCursor;
        // ESCAPE
        this.escapeCursor;
        // Contador de personajes seleccionados
        this.readyPlayers;
        // Selector para cada jugador
        this.selectors;
        // Efectos de Sonido
        this.choose_options;
        this.hit;
    }//Fin preload

    create() {
        this.cameras.main.fadeIn(500);
        // Fondo
        this.add.image(0, 0, "character_background").setOrigin(0, 0);
        // Movimiento
        var tweenReadySelected = this.tweens.add({
            targets: [this.readySelectedButton],
            scaleX: 0.95,
            scaleY: 0.95,
            ease: 'Sine.easeInOut',
            duration: 900,
            yoyo: true,
            repeat: -1
        });
        // Boton escape
        this.escapeButton = this.add.image(45, 20, "escape_button");
        // Texto e imagenes que aparecen si no te has unido a la partida
        this.keys = [];
        switch (this.myPlayer.id) {
            case 0:
                this.keys[0] = this.add.image(169, 218, "press_key").setDepth(1);
                this.keys[0].tint = 0x0eff00;
                this.keys[0].alpha = 1;
                this.keys[1] = this.add.image(457.38, 218, "press_key").setDepth(1);
                this.keys[1].alpha = 0;
                this.keys[2] = this.add.image(746.48, 218, "press_key").setDepth(1);
                this.keys[2].alpha = 0;
                this.keys[3] = this.add.image(1035.07, 218, "press_key").setDepth(1);
                this.keys[3].alpha = 0;
                break;
            case 1:
                this.keys[0] = this.add.image(169, 218, "press_key").setDepth(1);
                this.keys[0].alpha = 0;
                this.keys[1] = this.add.image(457.38, 218, "press_key").setDepth(1);
                this.keys[1].tint = 0xff00e9;
                this.keys[1].alpha = 1;
                this.keys[2] = this.add.image(746.48, 218, "press_key").setDepth(1);
                this.keys[2].alpha = 0;
                this.keys[3] = this.add.image(1035.07, 218, "press_key").setDepth(1);
                this.keys[3].alpha = 0;
                break;
            case 2:
                this.keys[0] = this.add.image(169, 218, "press_key").setDepth(1);
                this.keys[0].alpha = 0;
                this.keys[1] = this.add.image(457.38, 218, "press_key").setDepth(1);
                this.keys[1].alpha = 0;
                this.keys[2] = this.add.image(746.48, 218, "press_key").setDepth(1);
                this.keys[2].tint = 0x00fff0;
                this.keys[2].alpha = 1;
                this.keys[3] = this.add.image(1035.07, 218, "press_key").setDepth(1);
                this.keys[3].alpha = 0;
                break;
            case 3:
                this.keys[0] = this.add.image(169, 218, "press_key").setDepth(1);
                this.keys[0].alpha = 0;
                this.keys[1] = this.add.image(457.38, 218, "press_key").setDepth(1);
                this.keys[1].alpha = 0;
                this.keys[2] = this.add.image(746.48, 218, "press_key").setDepth(1);
                this.keys[2].alpha = 0;
                this.keys[3] = this.add.image(1035.07, 218, "press_key").setDepth(1);
                this.keys[3].tint = 0xffff00;
                this.keys[3].alpha = 1;
                break;
        }
        // Movimiento   
        var tweenKeys = this.tweens.add({
            targets: [this.keys[0], this.keys[1], this.keys[2], this.keys[3]],
            scaleX: 0.96,
            scaleY: 0.96,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        // Texto ready (seleccionado)
        this.ready = [];
        this.ready[0] = this.add.image(171.50, 239.05, "ready").setDepth(1);
        this.ready[1] = this.add.image(457.50, 239.05, "ready").setDepth(1);
        this.ready[2] = this.add.image(743.50, 239.05, "ready").setDepth(1);
        this.ready[3] = this.add.image(1034.50, 239.05, "ready").setDepth(1);
        // Para que no aparezcan de primeras
        this.ready[0].alpha = 0;
        this.ready[1].alpha = 0;
        this.ready[2].alpha = 0;
        this.ready[3].alpha = 0;
        // Texto habilidades
        this.player1_hab = this.add.image(167.28, 389.96, "palm_hab");
        this.player2_hab = this.add.image(455, 389.96, "palm_hab");
        this.player3_hab = this.add.image(744.28, 389.96, "palm_hab");
        this.player4_hab = this.add.image(1035.28, 389.96, "palm_hab");
        //Array con habilidades
        this.habilities = [{ hab: this.player1_hab, img: "palm_hab" },
        { hab: this.player2_hab, img: "dino_hab" },
        { hab: this.player3_hab, img: "toufat_hab" },
        { hab: this.player4_hab, img: "lemur_hab" }];
        // Para que no aparezcan de primeras
        this.player1_hab.alpha = 0;
        this.player2_hab.alpha = 0;
        this.player3_hab.alpha = 0;
        this.player4_hab.alpha = 0;
        // Texto nombres
        this.player1_name = this.add.image(167.28, 63, "palm_G_name");
        this.player2_name = this.add.image(459.28, 63, "palm_P_name");
        this.player3_name = this.add.image(744.28, 63, "palm_B_name");
        this.player4_name = this.add.image(1035.28, 63, "palm_Y_name");
        // Para que no aparezcan de primeras
        this.player1_name.alpha = 0;
        this.player2_name.alpha = 0;
        this.player3_name.alpha = 0;
        this.player4_name.alpha = 0;

        this.names = [{ name: this.player1_name, img: ["palm_G_name", "dino_G_name", "toufat_G_name", "lemur_G_name"] },
        { name: this.player2_name, img: ["palm_P_name", "dino_P_name", "toufat_P_name", "lemur_P_name"] },
        { name: this.player3_name, img: ["palm_B_name", "dino_B_name", "toufat_B_name", "lemur_B_name"] },
        { name: this.player4_name, img: ["palm_Y_name", "dino_Y_name", "toufat_Y_name", "lemur_Y_name"] }];
        // Jugadores
        this.players = [{ active: false, selected: false }, { active: false, selected: false },
        { active: false, selected: false }, { active: false, selected: false }];
        // Lista de jugadores
        this.characters = [];
        this.charactersSelected = [false, false, false, false];
        // Controles de selección
        // Controles de selector jugador 1
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // ENTER
        this.enterCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // ESCAPE
        this.escapeCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // Contador de personajes seleccionados
        this.readyPlayers = 0;
        // Selector para cada jugador
        this.selectors = [0, 0, 0, 0];
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.intro = this.sound.add("menu_begining");
        this.intro.play({
            volume: this.vol
        });
        this.loop = this.sound.add("menu_loop");
        this.loop.play({
            loop: true,
            delay: 2.02,
            volume: this.vol
        });
        this.choose_options = this.sound.add("choose_options");
        this.change_options = this.sound.add("change_options");
        this.hit = this.sound.add("hit");

        // Eventos WebSockets
        this.input.keyboard.on("keydown", function (event) {
            var that = this.scene;
            if (event.key == 'a' || event.key == 'A' || event.key == 'w' || event.key == 'W'
                || event.key == 'd' || event.key == 'D' || event.key == 's' || event.key == 'S') {
                that.connection.send(JSON.stringify({ type: "event", id: that.myPlayer.id, key: event.key }));
            } else if (event.key == "Escape") { // Si se pulsa scape, se vuelve al menú principal
                that.connection.send(JSON.stringify({ type: "event", id: that.myPlayer.id, key: event.key }));
                that.connection.close();
                
                // Update de API REST
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
                that.choose_options.play({
                    volume: that.vol
                });
                // Se para la música
                that.loop.stop();
                that.intro.stop();
            }
        });
        var that = this;
        this.connection.onmessage = function (msg) {
            console.log("message received");
            console.log(that.connection);
            var data = JSON.parse(msg.data); // Se convierte el mensaje a JSON
            if(data.type == "event"){
            	console.log("Id: " + data.id + ", Key: " + data.key);
                if (data.key == 'a' || data.key == 'A' || data.key == 'w' || data.key == 'W'
                    || data.key == 'd' || data.key == 'D' || data.key == 's' || data.key == 'S') {
                    that.change(data.id, data.key);
                } else if (data.key == "Escape") { // Si el mensaje recibido es Escape, un jugador abandona la partida
                    console.log("El jugador " + data.id + " ha abandonado la partida :(");
                    that.leaveGame(data.id);
                    // Si me quedo sólo en la sala, vuelvo al lobby
                    if (that.numPlayers <= 1) {
                        var newPlayers = [{ id: 0, isConnected: false, isReady: false }, { id: 1, isConnected: false, isReady: false },
                        { id: 2, isConnected: false, isReady: false }, { id: 3, isConnected: false, isReady: false }];
                        newPlayers[that.myPlayer.id] = that.myPlayer;
                        that.connection.send(JSON.stringify({ type: "event", id: that.myPlayer.id, key: data.key }));
                        that.connection.close();
                        that.scene.start("online_lobby", { client: that.myPlayer, volume: that.vol, ip: that.ip, players: newPlayers });
                    }
                }
            }else if (data.type == "check"){
            	console.log("Checking por aquí");
            	that.connection.send(JSON.stringify({ type: "check", id: that.myPlayer.id }))
            }
            else if (data.type == "leave"){
                if (data.id == that.myPlayer.id){
                	that.connection.close();
                	that.myPlayer.isReady = false;
                    that.myPlayer.isConnected = false;
                    // Update de API REST
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
                    that.choose_options.play({
                        volume: that.vol
                    });
                    // Se para la música
                    that.loop.stop();
                    that.intro.stop();
                }else{
                	console.log("El jugador " + data.id + " ha abandonado la partida :(");
                    that.leaveGame(data.id);
                    // Si me quedo sólo en la sala, vuelvo al lobby
                    if (that.numPlayers <= 1) {
                        var newPlayers = [{ id: 0, isConnected: false, isReady: false }, { id: 1, isConnected: false, isReady: false },
                        { id: 2, isConnected: false, isReady: false }, { id: 3, isConnected: false, isReady: false }];
                        newPlayers[that.myPlayer.id] = that.myPlayer;
                        that.connection.send(JSON.stringify({ type: "event", id: that.myPlayer.id, key: "Escape" }));
                        that.connection.close();
                        that.scene.start("online_lobby", { client: that.myPlayer, volume: that.vol, ip: that.ip, players: newPlayers });
                    }
                }
            }
        }
    }//Fin create

    update() {
        // Si hay dos o más jugadores listos, comenzar partida
        if (this.numPlayers >= 2 && this.numPlayers == this.readyPlayers){
        	// Se pasa a la pantalla de explicación
        	this.connection.send(JSON.stringify({ type: "leave", id: this.myPlayer.id }));
            this.connection.close();
            // Cambio de escena
            this.scene.start("ws_how_to_play", { characters: this.characters.filter(function(el){return el != undefined}), volume: this.vol, myPlayer: this.myPlayer, numPlayers: this.numPlayers, ip: this.ip });
            //Se para la música
            this.loop.stop();
        }
    }// Fin Update

    changeCharacter(charactersArray, characterid, selector) {
    	console.log(selector);
        switch (selector) {
            case 0:
                this.characterAux = new WSCharacter(this, characterid, "palm_choose", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
            case 1:
                this.characterAux = new WSCharacter(this, characterid, "dino_choose", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
            case 2:
                this.characterAux = new WSCharacter(this, characterid, "toufat_choose", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
            case 3:
                this.characterAux = new WSCharacter(this, characterid, "lemur_choose", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
        }
    	console.log(this.characterAux);
        // Cambia el texto explicativo de la habilidad y el nombre en función del personaje y el jugador
        this.ChangeText(selector, characterid);
    }// Fin changeCharacter

    ChangeText(selector, characterid) {
        var habilityAux = this.add.image(this.habilities[characterid].hab.x, this.habilities[characterid].hab.y, this.habilities[selector].img);
        this.habilities[characterid].hab.destroy();
        this.habilities[characterid].hab = habilityAux;
        var nameAux = this.add.image(this.names[characterid].name.x, this.names[characterid].name.y, this.names[characterid].img[selector]);
        this.names[characterid].name.destroy();
        this.names[characterid].name = nameAux;
    }// Fin ChangeText

    change(id, keypressed) {
        var posX;
        var posY;
        var idInt = parseInt(id);
        switch (idInt) {
            case 0:
                posX = 163;
                posY = 224.5;
                break;
            case 1:
                posX = 453;
                posY = 224.5;
                break;
            case 2:
                posX = 740.50;
                posY = 224.5;
                break;
            case 3:
                posX = 1022;
                posY = 224.5;
                break;
        }
        if (!this.players[idInt].active) {// Si el jugador id no se encuentra activo
            this.characters[idInt] = new WSCharacter(this, idInt, "palm_choose", false, posX, posY);
            this.players[idInt].active = true;
            this.keys[idInt].alpha = 0;// Desaparecen las teclas
            for (var i = 0; i < this.players.length; i++) {
                if (!this.charactersSelected[i]) {
                    this.selectors[idInt] = i;
                }
            }
            this.changeCharacter(this.characters, idInt, this.selectors[idInt]);
            this.ChangeText(this.selectors[idInt], idInt);// Que aparezca la habilidad/nombre al empezar a seleccionar
            this.change_options.play({
                volume: this.vol
            });
        } else {
            switch (keypressed) {
                case 'a':
                case 'A':
                    if (!this.players[idInt].selected) {
                        this.selectors[idInt] = (this.selectors[idInt] - 1) % 4;
                        if (this.selectors[idInt] < 0) {
                            this.selectors[idInt] = 3;
                        }
                        while (this.charactersSelected[this.selectors[idInt]]) {
                            this.selectors[idInt]--;
                            if (this.selectors[idInt] < 0) {
                                this.selectors[idInt] = 3;
                            }
                        }
                        this.changeCharacter(this.characters, idInt, this.selectors[idInt]);
                        this.change_options.play({
                            volume: this.vol
                        });
                    }
                    break;
                case 'd':
                case 'D':
                    if (!this.players[idInt].selected) {
                        this.selectors[idInt] = (this.selectors[idInt] + 1) % 4;
                        while (this.charactersSelected[this.selectors[idInt]]) {
                            this.selectors[idInt]++;
                            if (this.selectors[idInt] > 3) {
                                this.selectors[idInt] = 0;
                            }
                        }
                        this.changeCharacter(this.characters, idInt, this.selectors[idInt]);
                        this.change_options.play({
                            volume: this.vol
                        });
                    }
                    break;
                case 's':
                case 'S':
                    if (!this.charactersSelected[this.selectors[idInt]]) {
                        this.charactersSelected[this.selectors[idInt]] = true;
                        this.players[idInt].selected = true;
                        this.ready[idInt].alpha = 1; // Personaje seleccionado, preparado para jugar
                        this.readyPlayers++;
                        this.hit.play({
                            volume: this.vol
                        });
                    }
                    break;
                case 'w':
                case 'W':
                    if (this.players[idInt].selected) {
                        this.charactersSelected[this.selectors[idInt]] = false;
                        this.players[idInt].selected = false;
                        this.ready[idInt].alpha = 0;
                        this.readyPlayers--;
                        this.change_options.play({
                            volume: this.vol
                        });
                    }
                    break;
            }
        }
    }

    leaveGame(id) {
    	var that = this;
        if (this.players[id].selected) {
            this.readyPlayers--;
        }
        this.charactersSelected[this.selectors[id]] = false;
        this.players[id].selected = false;
        this.ready[id].alpha = 0;
        this.numPlayers--;
        if (this.players[id].active) {
            this.characters[id].destroy();
            this.characters[id] = null;
        }
        this.players[id].active = false;
        this.selectors[id] = 0;
        this.habilities[id].hab.alpha = 0;// Ocultar habilidad
        this.names[id].name.alpha = 0;// Ocultar nombre
        // Cerrar conexión API
        var player = {id: id, isReady: false, isConnected: false};
        console.log(player);
        // Update de API REST
        var playerUpdate = $.ajax({
            method: "PUT",
            url: "http://" + that.ip + "/mango-mambo/" + id,
            data: JSON.stringify(player),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}