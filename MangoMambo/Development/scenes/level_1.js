class Level1 extends Phaser.Scene {
    constructor(){
        super({key: "level_1"});
    }// Fin constructor

    init (data){
        this.characters = data.characters;
        this.numPlayers = this.characters.length; // Número de jugadores
        this.vol = data.volume;
        data = null;
    }// Fin init

    preload() {
        // Se cargan las imágenes de las plataformas
        this.load.image("lvl1_background", "./Design/Stages/Backgrounds/level_1_background.png");
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
        this.load.audio("mango_explosion", "./Design/Audio/SoundFX/mango_explosion.wav");
        this.load.audio("dino_win", "./Design/Audio/SoundFX/dino_win.wav");
        this.load.audio("palm_win", "./Design/Audio/SoundFX/palm_win.mp3");
        this.load.audio("lemur_win", "./Design/Audio/SoundFX/lemur_win.mp3");
        this.load.audio("toucan_win", "./Design/Audio/SoundFX/toucan_win.mp3");
        // Se carga el mango
        this.load.image("mango", "./Design/Objects/mango.png");
        // Tecla de pausa
        this.pauseKey;
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
        // Get the Mango
        this.getMango;
        // Texto del mango
        this.text;
        this.timedEvent;
    }// Fin preload

    create() {
        // Se crea el fondo
        this.add.image(0, 0, "lvl1_background").setOrigin(0,0).setDepth(-2);
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
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // Posiciones iniciales de los personajes
        this.positions = [{x: 50, y: 50}, {x: 1150, y: 50},
                          {x: 400, y: 500}, {x: 800, y: 500}];
        // Se crea el personaje
        for (var i = 0; i < this.characters.length; i++){
            switch(this.characters[i].id){
                case 1:
                    this.characters[i] = new Character(this, this.characters[i].id, 
                        this.characters[i].type.split("_")[0]+"_idle", true, this.positions[0].x, this.positions[0].y, this.characters[i].score);
                    break;
                case 2:
                    this.characters[i] = new Character(this, this.characters[i].id, 
                        this.characters[i].type.split("_")[0]+"_idle", true, this.positions[1].x, this.positions[1].y, this.characters[i].score);
                        this.characters[i].flipX = true;
                    break;
                case 3:
                    this.characters[i] = new Character(this, this.characters[i].id, 
                        this.characters[i].type.split("_")[0]+"_idle", true, this.positions[2].x, this.positions[2].y, this.characters[i].score);
                        this.characters[i].flipX = true;
                    break;
                case 4:
                    this.characters[i] = new Character(this, this.characters[i].id, 
                        this.characters[i].type.split("_")[0]+"_idle", true, this.positions[3].x, this.positions[3].y, this.characters[i].score);
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
            this.physics.add.overlap(this.characters[i], this.mango, this.CogerMango, null, this);
        }
        // Se crea la colisión entre los personajes
        this.maxCollisionTime = 1000;
        this.collisionTime = 0;
        for (var i = 0; i <this.characters.length-1; i++){
            for (var j = i+1; j < this.characters.length; j++){
                if (i != j){
                    this.physics.add.overlap(this.characters[i], this.characters[j], this.RobarMango, null, this);
                }
            }
        }
        // Se inicializa el reloj
        this.clock = new Phaser.Time.Clock(this);
        this.clock.start();
        // Se crea la música
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
            x: 577,
            y: 7,
            text: this.FormatTime(this.mango.explodeTime),
            style: {
              fontSize: '24px',
              fontFamily: 'Arial',
              color: '#aaff75',
              align: 'center',
              strokeThickness: '3',
              shadow: (5, 5, 'rgba(170,255,117,0.5)', 5)
            }
          };
        this.text = this.make.text(tconfig);
        this.text.alpha = 0;
        this.text.setDepth(-1);
    }// Fin Create

    update() {
        // Update de los personajes y del mango
        for (var i = 0; i < this.characters.length; i++){
            this.characters[i].update();
        }
        this.mango.update();
        // Pause
        if(Phaser.Input.Keyboard.JustDown(this.pauseKey)){
            if (!this.scene.get("pause")) {
                this.scene.add("pause", new Pause, true, {scene: this, sceneKey: "level_1", volume: this.vol});
                this.scene.pause("level_1");
            }
        }
        // Refresh body de la plataforma que se mueve
        this.upMovePlat.refreshBody();
        // Si el tiempo de partida baja de 0, se pasa a la pantalla de puntuaciones
        if (this.numPlayers <= 1){
            this.scene.remove("pause");
            this.scene.start("score_level", {characters: this.characters, volume: this.vol});
            // Se para la música
            this.intro.stop();
            this.loop.stop();
        }
        if(this.mango.explodeTime <= 10){
            this.loop.setRate(1.05);
        }if(this.mango.explodeTime <= 5){
            this.loop.setRate(1.15);
        }if(this.mango.explodeTime > 10){
            this.loop.setRate(1);
        }
    }// Fin Update

    CogerMango(character, mango){
        if (!mango.character){// Si el mango no tiene ningún personaje asociado
            this.mango.timer = this.time.addEvent({ delay: 1000, callback: this.mango.UpdateTime, callbackScope: this.mango, repeat: this.mango.time-1 });
            // El personaje que lo recoge queda guardado en el mango
            mango.character = character;
            this.timeImage.alpha = 1;
            this.text.alpha = 1;
            // Desaparece el texto de getMango
            this.getMango.alpha = 0;
        }
    }// Fin CogerMango
    
    RobarMango(character1, character2){
        if (this.mango.character){ // Si el mango tiene un personaje asociado
            // Si ha pasado el tiempo suficiente para cambiar el mango de jugador
            if (this.clock.now - this.collisionTime >= this.maxCollisionTime){ 
                // Se detecta qué personaje tiene el mango, y se le da al que no lo tiene
                switch(this.mango.character.id){
                    case character1.id:
                        this.mango.character = character2;
                        this.hit.play();
                        break;
    
                    case character2.id:
                        this.mango.character = character1;
                        this.hit.play();
                        break;
                    default:
                        break;
                }
                this.collisionTime = this.clock.now;// Se reinicia el tiempo del mango para cambiar de jugador
            }
        }
    }//Fin RobarMango

    // Al explotar el mango
    EliminarPersonaje(character){ 
        for (var i = 0; i < this.characters.length; i++){
            if (character.id == this.characters[i].id){
                this.characters[i].score += this.numPlayers;
                //Quitar al personaje de la escena
                this.characters[i].body.destroy();
                this.characters[i].alpha = 0;

                switch(character.type.split("_")[0]){
                    case "palm":
                        this.palm_win.play();
                        break;
                    case "dino":
                            this.dino_win.play();
                        break;
                    case "toufat":
                            this.toucan_win.play();
                        break;
                    case "lemur":
                            this.lemur_win.play();
                        break;
                }
            }
        }
        this.numPlayers--;
    }// Fin EliminarPersonaje
    
    FormatTime(seconds) {
        // Minutos
        var minutes = Math.floor(seconds / 60);
        // Segundos
        var partInSeconds = seconds % 60;
        // Añade ceros a la izquierda a los segundos
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Devuelve el tiempo formateado
        return `${minutes}:${partInSeconds}`;
    }// Fin FormatTime
}// Fin clase Level1