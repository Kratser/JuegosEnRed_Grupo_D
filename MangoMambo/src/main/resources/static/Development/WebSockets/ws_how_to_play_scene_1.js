class WSHowToPlay extends Phaser.Scene {
    constructor(){
        super({key: "ws_how_to_play"});
    }// Fin constructor

    init(data){
        this.characters = data.characters;
        this.vol = data.volume;
        this.myPlayer = data.myPlayer;
        this.numPlayers = data.numPlayers;
        this.ip = data.ip;
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
        this.load.on("complete", function(){
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });
        //Conexión web sockets
        this.connection;
        this.connection = new WebSocket('ws://' + this.ip + '/ws-how-to-play');
        this.connection.onopen = function(){
            console.log("WS Open");
        }
        this.connection.onerror = function(e) {
            console.log("WS error: " + e);
        }
        // Cargar imagen
        this.load.image("how_to_play_scene_background", "./Design/Stages/Backgrounds/how_to_play_scene.png");
        // Imágenes de las rocas
        this.load.image("how_to_play_rock", "./Design/Objects/how_to_play_rock.png");
        this.load.image("ws_how_to_play_rock_details", "./Design/Objects/ws_how_to_play_rock_details.png");
        // Cargar botones
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
        this.load.image("ready_htps", "./Design/Objects/Buttons/ready_htps.png");
        // Cargar botones seleccionados
        this.load.image("details_button_select", "./Design/Objects/Buttons/details_button_select.png");
        // Jugadores preparados
        this.load.image("players_ready", "./Design/Objects/players_ready.png");
        this.load.image("g_ready", "./Design/Objects/g_ready.png");
        this.load.image("p_ready", "./Design/Objects/p_ready.png");
        this.load.image("b_ready", "./Design/Objects/b_ready.png");
        this.load.image("y_ready", "./Design/Objects/y_ready.png");
        this.load.image("tick", "./Design/Objects/tick.png");
        // Cargar música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");
        // Sonido
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        // Fondo
        this.howToPlay;
        this.howToPlayRock;
        this.wsHowToPlayRockDetails;
        // Botones
        this.detailsButtonSelect;
        this.bigEsc;
        this.readyHtps;
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
        // Menu de detalles
        this.details;
        // Teclas
        this.enterKey;
        this.escKey;
        // La canción loopeada
        this.loop;
        // Efectos de Sonido
        this.change_options;
        this.choose_options;
        //Jugadores
        this.players;
    }// Fin preload

    create(){
        this.cameras.main.fadeIn(500);
        // Fondo
        this.howToPlay = this.add.image(0, 0, "how_to_play_scene_background").setOrigin(0, 0).setDepth(0);
        this.howToPlayRock = this.add.image(599.50, 321.00, "how_to_play_rock");
        this.wsHowToPlayRockDetails = this.add.image(599.50, 291.00, "ws_how_to_play_rock_details");
        this.wsHowToPlayRockDetails.alpha = 0;
        // Botones
        // this.detailsButton = this.add.image(384.50, 513, "details_button").setDepth(1);BORRAR
        this.bigEsc = this.add.image(100, 50, "big_esc");
        this.bigEsc.alpha = 0;
        this.detailsButtonSelect = this.add.image(384.50, 513, "details_button_select").setDepth(1);
        this.readyHtps = this.add.image(1100, 568, "ready_htps");
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
        // Menú de detalles
        this.details = false;
        // Jugadores conectados recuadro
        for(var i = 0; i < this.numPlayers; i ++){
            console.log(this.characters[i]);
            this.readys[this.characters[i].id].setAlpha(1); 

        }
        // Teclas
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Jugadores
        this.players = [{ready:false},{ready:false},{ready:false},{ready:false}];

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

        var that = this;

        this.input.keyboard.on("keydown", function (event) {
            if (event.which == 40) {
                console.log(that.connection);
                that.connection.send(JSON.stringify({ id: that.myPlayer.id, key: event.key }));
                that.players[that.myPlayer.id].ready = true;
                // Cambio de escena
                that.contReady++;
                if (that.contReady == that.numPlayers) {
                    that.connection.close();
                    that.scene.start("ws_level_1", { characters: that.characters, volume: that.vol, ip: that.ip, myPlayer: that.myPlayer});
                    // Se para la música
                    that.loop.stop();
                    that.choose_options.play({
                        volume: that.vol
                    });
                }
            }
        });

        this.connection.onmessage = function (msg) {
            console.log("message received");
            var data = JSON.parse(msg.data); // Se convierte el mensaje a JSON
            console.log("Id: " + data.id + ", Key: " + data.key);
            that.players[data.id].ready = true;
             // Cambio de escena
             that.contReady++;
             if (that.contReady == that.numPlayers) {
                 that.connection.close();
                 that.scene.start("ws_level_1", { characters: that.characters, volume: that.vol, ip: that.ip, myPlayer: that.myPlayer});
                 // Se para la música
                 that.loop.stop();
                 that.choose_options.play({
                     volume: that.vol
                 });
             }
        }
    }// Fin create

    update(time, delta){
        // Aparece cuando el jugador está listo
        for(var i = 0; i < this.numPlayers; i++){
            if(this.players[i].ready == true){
                this.ticks[i].alpha = 1;
            }
        }
        // Mostrar detalles
        if(Phaser.Input.Keyboard.JustDown(this.enterKey)){
            this.details = true;
            var tween = this.tweens.add({
                targets: [this.howToPlayRock, this.detailsButtonSelect],
                alpha: 0,
                ease: 'Sine.easeInOut',
                duration: 200,
            });
            var tween = this.tweens.add({
                targets: [this.wsHowToPlayRockDetails, this.bigEsc],
                alpha: 1,
                ease: 'Sine.easeInOut',
                duration: 200,
            });
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
                targets: [this.howToPlayRock, this.detailsButtonSelect],
                alpha: 1,
                ease: 'Sine.easeInOut',
                duration: 200,
            });
            var tween = this.tweens.add({
                targets: [this.wsHowToPlayRockDetails, this.bigEsc],
                alpha: 0,
                ease: 'Sine.easeInOut',
                duration: 200,
            });
            this.choose_options.play({
                volume: this.vol
            });
        }
    }// Fin update
}// Fin clase HowToPlayScene