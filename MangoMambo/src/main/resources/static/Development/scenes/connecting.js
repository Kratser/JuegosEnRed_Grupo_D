class Connecting extends Phaser.Scene{
    constructor(){
        super({key: "connecting"})
    }// Fin constructor

    init(data){
        this.vol = data.volume;
        data = null; 
    }// Fin init

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
        });
        // Se carga la imágenes de los iconos de conectar
        this.load.image("connecting_icon", "./Design/Objects/connecting_icon.png");
        this.load.image("connecting_rock", "./Design/Objects/connecting_rock.png");
        // Se cargan las imágenes de conexión
        this.load.image("connection_failed_rock", "./Design/Objects/connection_failed_rock.png");
        this.load.image("server_full_rock", "./Design/Objects/server_full_rock.png");
        // Se carga la imagen del botón de escape
        this.load.image("big_esc", "./Design/Objects/Buttons/big_esc.png");
        // Imágenes de los iconos de conectar
        this.connecting_rock;
        this.connectingIcon;
        // Teclas
        this.cursors;
        // Se carga la música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");
        // Sonidos
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");

        ///////////////////////////////////
        ///////////LOBBY///////////////////
        ///////////////////////////////////

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

        ///////////////////////////////////
        ////////CHOOSE_CHARACTER///////////
        ///////////////////////////////////

        // Se cargan las imágenes
        this.load.image("character_background", "./Design/Stages/Backgrounds/ws_choose_character_background.png");
        // Imagenes de los personajes
        this.load.image("palm_choose", "./Design/Characters/Palm/palm_choose.png");
        this.load.image("dino_choose", "./Design/Characters/Dino/dino_choose.png");
        this.load.image("toufat_choose", "./Design/Characters/Toucan/toufat_choose.png");
        this.load.image("lemur_choose", "./Design/Characters/Lemur/lemur_choose.png");
        // Nombre de los personajes
        // Verde
        this.load.image("palm_G_name", "./Design/Objects/Text/palm_G_name.png");
        this.load.image("dino_G_name", "./Design/Objects/Text/dino_G_name.png");
        this.load.image("toufat_G_name", "./Design/Objects/Text/toufat_G_name.png");
        this.load.image("lemur_G_name", "./Design/Objects/Text/lemur_G_name.png");
        // Rosa
        this.load.image("palm_P_name", "./Design/Objects/Text/palm_P_name.png");
        this.load.image("dino_P_name", "./Design/Objects/Text/dino_P_name.png");
        this.load.image("toufat_P_name", "./Design/Objects/Text/toufat_P_name.png");
        this.load.image("lemur_P_name", "./Design/Objects/Text/lemur_P_name.png");
        // Azul
        this.load.image("palm_B_name", "./Design/Objects/Text/palm_B_name.png");
        this.load.image("dino_B_name", "./Design/Objects/Text/dino_B_name.png");
        this.load.image("toufat_B_name", "./Design/Objects/Text/toufat_B_name.png");
        this.load.image("lemur_B_name", "./Design/Objects/Text/lemur_B_name.png");
        // Amarillo
        this.load.image("palm_Y_name", "./Design/Objects/Text/palm_Y_name.png");
        this.load.image("dino_Y_name", "./Design/Objects/Text/dino_Y_name.png");
        this.load.image("toufat_Y_name", "./Design/Objects/Text/toufat_Y_name.png");
        this.load.image("lemur_Y_name", "./Design/Objects/Text/lemur_Y_name.png");
        // Descripción habilidades de los personajes
        this.load.image("palm_hab", "./Design/Objects/Text/palm_hab.png");
        this.load.image("dino_hab", "./Design/Objects/Text/dino_hab.png");
        this.load.image("toufat_hab", "./Design/Objects/Text/toufat_hab.png");
        this.load.image("lemur_hab", "./Design/Objects/Text/lemur_hab.png");
        // Texto e imagene que aparece si no te has unido a la partida
        this.load.image("press_key", "./Design/Objects/Keypress/ws_press_key.png");
        // Ready! para cuando el personaje se selecciona
        this.load.image("ready", "./Design/Objects/Text/ready.png");
        // Boton de escape
        this.load.image("escape_button", "./Design/Objects/Buttons/escape_button.png");
        // Sonido
        this.load.audio("menu_begining", "./Design/Audio/MenuSong/menu_begining_with_edit.wav");
        this.load.audio("menu_loop", "./Design/Audio/MenuSong/menu_with_edit.wav");
        this.intro;
        this.loop;
        this.load.audio("hit", "./Design/Audio/SoundFX/hit.wav");
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        // Arrays para los textos
        this.names;
        this.habilities;
        // Jugadores
        this.players;
        // Animación cuenta atrás
        this.mangoMamboAnim;
        this.startingGame;
        this.animTween;
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
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        this.choose_options;
        this.hit;

        ///////////////////////////////////
        ////////////HOW_TO_PLAY////////////
        ///////////////////////////////////

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

        ///////////////////////////////////
        //////////////LEVEL_1//////////////
        ///////////////////////////////////

        // Conexión Web Sockets
        this.connection;
        // Se cargan las imágenes de las plataformas
        this.load.image("lvl1_background", "./Design/Stages/Backgrounds/level_1_background.png");
        // Botón de pausa
        this.load.image("pause_button", "./Design/Objects/Buttons/pause_button.png");
        // 3 2 1 mango mambo
        this.load.spritesheet('3_2_1_mango_mambo', './Design/Objects/Text/3_2_1_mango_mambo.png',
        {
            frameWidth: 500,
            frameHeight: 500 
        });
        // Fondo contador
        this.load.image("cd_background", "./Design/Objects/countdown_background.png");
        // Get the mango
        this.load.image("get_the_mango", "./Design/Objects/Text/get_the_mango.png");
        // Plataformas
        this.load.image("big_plat", "./Design/Stages/Platforms/big_plat.png");
        this.load.image("bott_step1", "./Design/Stages/Platforms/bott_step1.png");
        this.load.image("bott_step2", "./Design/Stages/Platforms/bott_step2.png");
        this.load.image("ground_base", "./Design/Stages/Platforms/ground_base.png");
        this.load.image("tiki_leg", "./Design/Stages/Platforms/tiki_leg.png");
        this.load.image("mid_step1", "./Design/Stages/Platforms/mid_step1.png");
        this.load.image("mid_step2", "./Design/Stages/Platforms/mid_step2.png");
        this.load.image("tiki_arm", "./Design/Stages/Platforms/tiki_arm.png");
        this.load.image("tiki_arm1", "./Design/Stages/Platforms/tiki_arm1.png");
        this.load.image("tiki_plat", "./Design/Stages/Platforms/tiki_plat.png");
        this.load.image("top_step1", "./Design/Stages/Platforms/top_step1.png");
        this.load.image("top_step2", "./Design/Stages/Platforms/top_step2.png");
        this.load.image("yellow_plat", "./Design/Stages/Platforms/yellow_plat.png");
        this.load.image("side_plat", "./Design/Stages/Platforms/side_plat.png");
        // Se cargan las animaciones de los personajes
        // Palm
        this.load.spritesheet('palm_idle', './Design/Characters/Palm/palm_idle.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('palm_walk', './Design/Characters/Palm/palm_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        // Dino
        this.load.spritesheet('dino_idle', './Design/Characters/Dino/dino_idle.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('dino_walk', './Design/Characters/Dino/dino_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        //Lemur
        this.load.spritesheet('lemur_idle', './Design/Characters/Lemur/lemur_idle.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('lemur_walk', './Design/Characters/Lemur/lemur_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        //Toufat
        this.load.spritesheet('toufat_idle', './Design/Characters/Toucan/toufat_idle.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('toufat_walk', './Design/Characters/Toucan/toufat_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        // Explosión del mango
        this.load.spritesheet('mango_explosion', './Design/Objects/mango_explosion.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        // Se cargan los contornos de los pesonajes
        this.load.image("outline", "./Design/Objects/outline.png");
        // Se carga la música
        this.load.audio("minigame_begining", "./Design/Audio/MinigameSong/minigame_begining_with_edit.wav");
        this.load.audio("minigame_loop", "./Design/Audio/MinigameSong/minigame_with_edit.wav");
        this.load.audio("hit", "./Design/Audio/SoundFX/hit.wav");
        this.load.audio("mango_explosion", "./Design/Audio/SoundFX/mango_explosion.mp3");
        this.load.audio("dino_win", "./Design/Audio/SoundFX/dino_win.wav");
        this.load.audio("palm_win", "./Design/Audio/SoundFX/palm_win.mp3");
        this.load.audio("lemur_win", "./Design/Audio/SoundFX/lemur_win.mp3");
        this.load.audio("toucan_win", "./Design/Audio/SoundFX/toucan_win.mp3");
        this.load.audio("birds", "./Design/Audio/SoundFX/birds.mp3");
        // Se carga el mango
        this.load.image("mango", "./Design/Objects/mango.png");
        // Mango
        this.mango;
        // Posiciones inicales de los personajes
        this.positions;
        // Tiempo entre colisiones para cambiar el mango
        this.maxCollisionTime;
        this.collisionTime;
        // Reloj del juego
        this.clock;
        // Música
        this.intro;
        this.loop;
        //Eectos de Sonido
        this.hit;
        this.mango_explosion;
        this.dino_win;
        this.palm_win;
        this.lemur_win;
        this.toucan_win;
        this.birds;
        // Get the Mango
        this.getMango;
        // Mango Mambo animation
        this.mangoMamboAnim;
        // Variable para actualizar el update
        this.play;
        // Variable que detecta si el juego está pausado
        this.playing;
        // Texto del mango
        this.text;
        this.timedEvent;

        ///////////////////////////////////
        ///////////////PAUSA///////////////
        ///////////////////////////////////

        // Se carga la imagen de fondo
        this.load.image("pause_background", "./Design/Stages/Backgrounds/pause_background.png");
        // Buttons
        this.load.image("resume_button", "./Design/Objects/Buttons/resume_button.png");
        this.load.image("quit_button", "./Design/Objects/Buttons/quit_button.png");
        // // Selected buttons
        this.load.image("resume_button_select", "./Design/Objects/Buttons/resume_button_select.png");
        this.load.image("quit_button_select", "./Design/Objects/Buttons/quit_button_select.png");
        // Sonido
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        // Botones
        this.resumeButton;
        this.quitButton;
        this.resumeButtonSelect;
        this.quitButtonSelect;
        // Teclas
        this.upKey1;
        this.downKey1;
        this.upKey2;
        this.downKey2;
        this.enterKey;
        this.resumeKey;
        // Controlador para botones
        this.cont = 0;
        this.options = [true, false];
        // Efectos de Sonido
        this.change_options;
        this.choose_options;

        ///////////////////////////////////
        ///////////////SCORE///////////////
        ///////////////////////////////////

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
    }// Fin preload

    create(){
        this.cameras.main.fadeIn(500);
        // Se pasa la imagen de fondo a profundidad 0 para que la barra de carga quede por detrás
        this.loadingImg.setDepth(0);
        this.add.image(80, 50, "big_esc").setDepth(1);
        this.connecting_rock = this.add.image(600,300,"connecting_rock");
        this.connectingIcon = this.add.image(600,275, "connecting_icon");
        // Animación del icono
        var tweenConnecting = this.tweens.add({
            targets: this.connectingIcon,
            angle: -360,
            duration: 8000,
            repeat: -1
        });
        // Teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("how_to_play_song");
        this.loop.play({
            loop : true,
            volume: this.vol
        });
        this.connectToServer();
    }// Fin create

    update(){
        // Si se pulsa la tecla ESC se vuelve al menú principal
        if (Phaser.Input.Keyboard.JustDown(this.cursors[1])){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("main_menu", {volume: this.vol});
            // Se para la música
            this.loop.stop();
        }
    }// Fin update

    connectToServer(){
        var ip = window.location.host;
        var that = this;
        var getInfo = $.ajax({
            method: "GET",
            url: "http://"+ip+"/mango-mambo"
        });
        // Conexión establecida
        getInfo.done(function(data){
            var numPlayersConnected = 0;
            var numPlayersReady = 0;
            var playersData = data;
            for (var i = 0; i < data.length; i++){
                if (data[i].isConnected){
                    numPlayersConnected++;
                }
                if (data[i].isReady){
                    numPlayersReady++;
                }
            }
            // Si hay espacios disponibles
            if (numPlayersConnected < 4){
                if (numPlayersConnected != numPlayersReady){
                    var myPlayer;
                    console.log("Entrando en sala");
                    $.ajax({
                        method: "POST",
                        url: "http://"+ip+"/mango-mambo"
                    }).done(function(data){
                        myPlayer = data;
                        that.scene.start("online_lobby", {volume: that.vol, players: playersData, client: myPlayer, ip: ip});
                        // Se para la música
                        that.loop.stop();
                    });  
                }else{
                    if (numPlayersConnected < 2){
                        var myPlayer;
                        console.log("Entrando en sala");
                        $.ajax({
                            method: "POST",
                            url: "http://"+ip+"/mango-mambo"
                        }).done(function(data){
                            myPlayer = data;
                            that.scene.start("online_lobby", {volume: that.vol, players: playersData, client: myPlayer, ip: ip});
                            // Se para la música
                            that.loop.stop();
                        });  
                    }else { // Si hay 2 o más jugadores y están listos (están en partida)
                        console.log("Sorry, the server is full, please try again later");
                        that.add.image(600,300, "server_full_rock");
                    }
                }
            }
            // Si no hay espacios disponibles
            else{
                console.log("Sorry, the server is full, please try again later");
                that.add.image(600,300, "server_full_rock");
            }
        });
        // Error de conexión al servidor
        getInfo.error(function(status){
            console.log(status.status);
            console.log("Server Connection failed, please try again later");
            that.add.image(600,300, "connection_failed_rock");
        });
    }// Fin connectToServer
}