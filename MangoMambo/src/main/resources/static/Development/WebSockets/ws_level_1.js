class WSLevel1 extends Phaser.Scene {
    constructor(){
        super({key: "ws_level_1"});
    }// Fin constructor

    init (data){
        this.characters = data.characters;
        this.numPlayers = this.characters.length; // Número de jugadores
        if (data.volume != undefined){
            this.vol = data.volume;
        }else{
            this.vol = 1;
        }
        this.ip = data.ip;
        this.myPlayer = data.myPlayer;
        data = null;
    }// Fin init

    preload() {
        // Pantalla de Carga
        var loadingImg = this.add.image(0, 0, "loading_background").setOrigin(0, 0).setDepth(-5);
        var progressBar = this.add.graphics().setDepth(-5);
        var progressBox = this.add.graphics().setDepth(-5);
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
        percentText.setOrigin(0.5, 0.5).setDepth(-5);
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
        // Conexión Web Sockets
        var that = this;
        this.connection;
        this.connection = new WebSocket('ws://' + this.ip + '/ws-level-1');
        this.connection.onopen = function(){
            console.log("WS Open");
            this.send(JSON.stringify({ type: "connect", id: that.myPlayer.id, numPlayers: that.numPlayers}));
        }
        this.connection.onerror = function(e) {
            console.log("WS error: " + e);
        }
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
        // Evento para actualizar con los datos del jugador
        this.playerUpdate;
    }// Fin preload

    create() {
        this.cameras.main.fadeIn(500);
        // Se crea el fondo
        this.add.image(0, 0, "lvl1_background").setOrigin(0,0).setDepth(-2);
        //Botón de pausa
        this.pauseButton = this.add.image (60, 565, "pause_button").setDepth(1);
       
        // Se crean las plataformas como un grupo
        var platforms = this.physics.add.staticGroup(); 
        // Creación de plataformas
        // Suelo
        platforms.create (53, 497.5, "top_step1");
        platforms.create (156, 524.5, "mid_step1");
        platforms.create (253.5, 552, "bott_step1");
        platforms.create (600, 579, "ground_base");
        platforms.create (946.5, 552, "bott_step2");
        platforms.create (1044, 524.5, "mid_step2");
        platforms.create (1147, 497.5, "top_step2");
        // Aire
        platforms.create (351.5, 199, "tiki_plat");
        platforms.create (849.5, 199, "tiki_plat");
        // Plataforma que se mueve
        this.upMovePlat = platforms.create (500, 155, "yellow_plat");
        // Movimiento
        var tween = this.tweens.add({
            targets: this.upMovePlat,
            x: 700,
            ease: 'Sine.easeInOut',
            duration: 5000,
            yoyo: true,
            repeat: -1
        });
        platforms.create (600, 299, "yellow_plat");

        platforms.create (600, 434, "big_plat");

        platforms.create (287, 306, "tiki_leg");
        platforms.create (913, 306, "tiki_leg");

        platforms.create (300, 188, "tiki_arm1");
        platforms.create (900.5, 188, "tiki_arm");

        platforms.create (54.5, 185.50, "side_plat");
        platforms.create (1148.5, 185.50, "side_plat");
        // Tecla de pausa
        // this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); BORRAR
        // Posiciones iniciales de los personajes
        this.positions = [{x: 50, y: 50}, {x: 1150, y: 50},
                          {x: 400, y: 500}, {x: 800, y: 500}];
        // Se crean los personajes
        for (var i = 0; i < this.characters.length; i++) {
            switch (this.characters[i].id) {
                case 0:
                    this.characters[i] = new WSCharacter(this, this.characters[i].id,
                        this.characters[i].type.split("_")[0] + "_idle", true, this.positions[0].x, this.positions[0].y, this.characters[i].score);
                    break;
                case 1:
                    this.characters[i] = new WSCharacter(this, this.characters[i].id,
                        this.characters[i].type.split("_")[0] + "_idle", true, this.positions[1].x, this.positions[1].y, this.characters[i].score);
                    this.characters[i].flipX = true;
                    break;
                case 2:
                    this.characters[i] = new WSCharacter(this, this.characters[i].id,
                        this.characters[i].type.split("_")[0] + "_idle", true, this.positions[2].x, this.positions[2].y, this.characters[i].score);
                    break;
                case 3:
                    this.characters[i] = new WSCharacter(this, this.characters[i].id,
                        this.characters[i].type.split("_")[0] + "_idle", true, this.positions[3].x, this.positions[3].y, this.characters[i].score);
                    this.characters[i].flipX = true;
                    break;
            }
        }
        for (var i = 0; i < this.characters.length; i++){
            this.characters[i].preload();
            this.characters[i].create();
        }
        // Se crea el mango
        this.mango = new Mango(this, "mango", 600, 260, 30);
        this.mango.preload();
        this.mango.create();
        // Se crea la colisión entre los personajes y las plataformas
        for (var i = 0; i < this.characters.length; i++){
            this.physics.add.collider(this.characters[i], platforms);
        }
        // Se crea la colisión entre los personajes y el mango
        for (var i = 0; i < this.characters.length; i++){
            this.physics.add.overlap(this.characters[i], this.mango, this.cogerMango, null, this);
        }
        // Se crea la colisión entre los personajes
        this.maxCollisionTime = 1000;
        this.collisionTime = 0;
        for (var i = 0; i <this.characters.length-1; i++){
            for (var j = i+1; j < this.characters.length; j++){
                if (i != j){
                    this.physics.add.overlap(this.characters[i], this.characters[j], this.robarMango, null, this);
                }
            }
        }
        // Se inicializa el reloj
        this.clock = new Phaser.Time.Clock(this);
        this.clock.start();
        // Se crea la música
        console.log(this.vol);
        this.sound.pauseOnBlur = false;
        this.intro = this.sound.add("minigame_begining");
        this.intro.play({
            volume: this.vol
        });
        this.loop = this.sound.add("minigame_loop");
        this.loop.play({
            loop : true,
            delay : 6.87,
            volume: this.vol
        });
        //Se crean los efectos de sonido
        this.hit = this.sound.add("hit");
        this.dino_win = this.sound.add("dino_win");
        this.palm_win = this.sound.add("palm_win");
        this.toucan_win = this.sound.add("toucan_win");
        this.lemur_win = this.sound.add("lemur_win");
        this.mango_explosion = this.sound.add("mango_explosion");
        this.birds = this.sound.add("birds");
        this.birds.play({
            loop : true,
            delay : 4.87,
            volume: this.vol * 0.1
        });
        // Get the Mango
        this.getMango = this.add.image(594, 53, "get_the_mango");
        // Movimiento
        var tweenGetMango = this.tweens.add({
            targets: [this.getMango],
            scaleY: 0.85,
            scaleX: 0.85,
            ease: 'Sine.easeInOut',
            duration: 700,
            yoyo: true,
            repeat: -1
        });
        // Tiempo de partida
        this.timeImage = this.add.image(600, 25.50, "cd_background");
        this.timeImage.alpha = 0;
        this.timeImage.setDepth(-1);
        // Texto que aparece en pantalla
        var tconfig = {
            x: 565,
            y: 6,
            text: this.formatTime(this.mango.explodeTime),
            style: {
              fontSize: '30px',
              fontFamily: 'Berlin Sans FB',
              fontStyle: 'bold',
              color: '#06c614',
              align: 'center',
              strokeThickness: '5',
              shadow: (5, 5, 'rgba(170,255,117,0.5)', 5)
            }
          };
        this.text = this.make.text(tconfig);
        this.text.alpha = 0;
        this.text.setDepth(-1);
        // 3 2 1 mango mambo
        this.mangoMamboAnim = this.add.sprite(600,300, "3_2_1_mango_mambo");
        this.anims.create({
            key: '3_2_1_mango_mambo',
            frames: this.anims.generateFrameNumbers('3_2_1_mango_mambo', { start: 0, end: 3 }),
            frameRate: 1,
        });
        this.mangoMamboAnim.on("animationcomplete", this.animComplete, this);
        this.play = false;
        this.playing = true;
        
        var that = this;

        // Si se pulsa una tecla
        this.input.keyboard.on("keydown", function (event) {
            // Si el juego no está pausado
            if (that.playing) {
                /*
                // Si se pulsa WASD, se envía una señal
                if (event.key == 'a' || event.key == 'A' || event.key == 's' || event.key == 'S'
                    || event.key == 'd' || event.key == 'D' || event.key == 'w' || event.key == 'W') {
                    that.connection.send(JSON.stringify({ id: that.myPlayer.id, key: event.key, press: true, playing: that.playing }));
                }
                // Si se pulsa ESCAPE se pausa el juego de forma local
                if (event.key == "Escape") {
                    if (that.playing) {
                        if (!that.scene.get("ws_pause")) {
                            that.playing = false;
                            that.scene.add("ws_pause", new WSPause, true, { scene: that, sceneKey: "ws_level_1", volume: that.vol });
                        }
                    }
                }
                */
            }
        });// Fin pulsar tecla
        // Si se deja de pulsar una tecla
        this.input.keyboard.on("keyup", function (event) {
            // Si el juego no está pausado
            if (that.playing) {
                /*
                // Si se pulsa WASD, se envía una señal
                if (event.key == 'a' || event.key == 'A' || event.key == 's' || event.key == 'S'
                    || event.key == 'd' || event.key == 'D' || event.key == 'w' || event.key == 'W') {
                    that.connection.send(JSON.stringify({ id: that.myPlayer.id, key: event.key, press: false, playing: that.playing }));
                }
                */
            }
        });// Fin soltar tecla

        // Evento para actualizar a los jugadores con mis datos
        this.playerUpdate = setInterval(function(){
        	console.log("Updating...");
        	that.connection.send(JSON.stringify({ type: "update", id: that.myPlayer.id }));
        }, 50);

        // Recibir mensajes
        this.connection.onmessage = function(msg){
            var data = JSON.parse(msg.data); // Se convierte el mensaje a JSON
            console.log(data.type + " message received");

            switch(data.type){
                case "update":
                    var id = data.id;
                    break;

                case "event":
                    var id = data.id;
                    break;

                case "start":
                    if (that.mangoMamboAnim) {
                        that.startAnim();
                    } else {
                        that.play = true;
                    }
                    break;

                case "leave":
                    var id = data.id;
                    break;

                default:
                    console.log("Tipo de mensaje no controlado");
                    break;
            }
            //Si el mensaje viene desde el juego
            /*
            if (data.playing == "true"){ 
                for (var i = 0;  i < that.characters.length; i++){
                    if (that.characters[i].id-1 == parseInt(data.id)){
                        that.characters[i].action(data.key, data.press);
                    }
                }
            // Si el mensaje viene del menú de pausa
            }else{
                // Se identifica al jugador que manda el mensaje y se elimina de la partida
                for (var i = 0;  i < that.characters.length; i++){
                    if (that.characters[i].id-1 == parseInt(data.id)){
                        that.deleteCharacter(that.characters[i]);
                        that.characters.splice(i,1);
                    }
                }
            }
            */
        }// Fin recibir mensaje
    }// Fin Create

    update() {
        if (this.play) {
            // Update de mi personaje
            /*
            if (this.playing){
                for (var i = 0; i < this.characters.length; i++){
                    if (this.characters[i].id == this.myPlayer.id){
                        this.characters[this.myPlayer.id].update();
                    }
                }
            }
            */
            this.mango.update();
            // Refresh body de la plataforma que se mueve
            this.upMovePlat.refreshBody();
            // Si solo queda un personaje, se pasa a la pantalla de puntuaciones
            /*
            if (this.numPlayers <= 1) {
                this.scene.remove("ws_pause");
                this.connection.close();
                this.scene.start("ws_score_level", { characters: this.characters, volume: this.vol , myPlayer: this.myPlayer, numPlayers: this.characters.length, ip: this.ip});
                // Se para la música
                this.intro.stop();
                this.loop.stop();
                this.birds.stop();
            }
            */
            if (this.mango.explodeTime <= 10) {
                this.loop.setRate(1.05);
                this.birds.setRate(1.05);
            } if (this.mango.explodeTime <= 5) {
                this.loop.setRate(1.15);
                this.birds.setRate(1.15);
            } if (this.mango.explodeTime > 10) {
                this.loop.setRate(1);
                this.birds.setRate(1);
            }
        }
    }// Fin Update

    cogerMango(character, mango){
        if (!mango.character){// Si el mango no tiene ningún personaje asociado
            this.mango.timer = this.time.addEvent({ delay: 1000, callback: this.mango.UpdateTime, callbackScope: this.mango, repeat: this.mango.time-1 });
            // El personaje que lo recoge queda guardado en el mango
            mango.character = character;
            this.timeImage.alpha = 1;
            this.text.alpha = 1;
            // Desaparece el texto de getMango
            this.getMango.alpha = 0;
        }
    }// Fin cogerMango
    
    robarMango(character1, character2){
        if (this.mango.character){ // Si el mango tiene un personaje asociado
            // Si ha pasado el tiempo suficiente para cambiar el mango de jugador
            if (this.clock.now - this.collisionTime >= this.maxCollisionTime){ 
                // Se detecta qué personaje tiene el mango, y se le da al que no lo tiene
                switch(this.mango.character.id){
                    case character1.id:
                        this.mango.character = character2;
                        this.hit.play({
                            volume: this.vol
                        });
                        break;
    
                    case character2.id:
                        this.mango.character = character1;
                        this.hit.play({
                            volume: this.vol
                        });
                        break;
                    default:
                        break;
                }
                this.collisionTime = this.clock.now;// Se reinicia el tiempo del mango para cambiar de jugador
            }
        }
    }//Fin robarMango

    // Al explotar el mango
    deleteCharacter(character){ 
        for (var i = 0; i < this.characters.length; i++){
            if (character.id == this.characters[i].id){
                this.characters[i].score += this.numPlayers - 1;
                //Quitar al personaje de la escena
                this.characters[i].body.destroy();
                this.characters[i].alpha = 0;

                switch(character.type.split("_")[0]){
                    case "palm":
                        this.palm_win.play({
                            volume: this.vol
                        });
                        break;
                    case "dino":
                            this.dino_win.play({
                                volume: this.vol
                            });
                        break;
                    case "toufat":
                            this.toucan_win.play({
                                volume: this.vol
                            });
                        break;
                    case "lemur":
                            this.lemur_win.play({
                                volume: this.vol
                            });
                        break;
                }
            }
        }
        this.numPlayers--;
    }// Fin deleteCharacter
    
    formatTime(seconds) {
        // Minutos
        var minutes = Math.floor(seconds / 60);
        // Segundos
        var partInSeconds = seconds % 60;
        // Añade ceros a la izquierda a los segundos
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Devuelve el tiempo formateado
        return `${minutes}:${partInSeconds}`;
    }// Fin formatTime

    startAnim(){
        this.mangoMamboAnim.anims.play("3_2_1_mango_mambo");
        this.mangoMamboAnim.setScale(0.5);
        var tween = this.tweens.add({
            targets: [this.mangoMamboAnim],
            scaleY: 1,
            scaleX: 1,
            ease: 'Sine.easeInOut',
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    animComplete(animation, frame){
        //this.play = true;
        this.mangoMamboAnim.destroy();
        this.mangoMamboAnim = undefined;
        this.connection.send(JSON.stringify({ type: "ready", id: this.myPlayer.id }));
    }// Fin animComplete

    actualizar(i, positionX, positionY, accelerationX, accelerationY){
        /*
        this.characters[i].body.x = positionX;
        this.characters[i].body.y = positionY;
        this.characters[i].body.setAccelerationX(accelerationX);
        this.characters[i].body.setAccelerationY(accelerationY);

        if (this.characters[i].body.acceleration.x < 0){
            this.characters[i].flipX = true;
            this.characters[i].anims.play(this.characters[i].anim[1], true);
        }else if (this.characters[i].body.acceleration.x > 0){
            this.characters[i].flipX = false;
            this.characters[i].anims.play(this.characters[i].anim[1], true);
        }else if (this.characters[i].body.acceleration.x == 0){
            this.characters[i].anims.play(this.characters[i].anim[0], true);
        }
        */
    }
}// Fin clase Level1