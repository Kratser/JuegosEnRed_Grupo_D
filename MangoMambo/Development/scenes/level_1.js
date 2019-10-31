class Level1 extends Phaser.Scene {
    constructor(){
        super({key: "level_1"});

        // Escena, Sprite asociado, Array de Cursores, X, Y, VelMáx, Acel, Altura de salto, Vel Caída
        this.characters; 

        // La intro de la canción
        this.intro;

        // La canción loopeada
        this.loop;
        
    }// Fin constructor

    init (data){

        this.characters = data.characters;
        this.numPlayers = this.characters.length; // Número de jugadores
        data = null;

    }// Fin init

    preload() {

        // Se cargan las imágenes de las plataformas
        this.load.image("lvl1_background", "./Design/Stages/Backgrounds/lvl_1_background.png");
        //Plataformas
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

        // Se carga la imagen de los personajes
        this.load.image("palm", "./Design/Characters/Palm/palm_idle_00.png");
        this.load.image("dino", "./Design/Characters/Dino/dino_idle_00.png");
        this.load.image("toufat", "./Design/Characters/Toucan/toucan_idle_00.png");
        this.load.image("lemur", "./Design/Characters/Lemur/lemur_idle_00.png");
        // Se cargan las animaciones de los personajes
        this.load.spritesheet('dino_idle', './Design/Characters/Dino/dino_idle_00.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        this.load.spritesheet('dino_walk', './Design/Characters/Dino/dino_walk.png',
        {
            frameWidth: 80,
            frameHeight: 80 
        });
        // Se cargan los contornos de los pesonajes
        this.load.image("outline", "./Design/Objects/outline.png");

        // Tiempo entre colisiones para cambiar el mango
        this.maxCollisionTime;
        this.collisionTime;
        
        // Se carga la música
        this.load.audio("minigame_begining", "./Design/Audio/MinigameSong/minigame_begining_with_edit.wav");
        this.load.audio("minigame_loop", "./Design/Audio/MinigameSong/minigame_with_edit.wav");

        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        if (!this.scene.get("pause")){
            this.scene.add("pause", new Pause, true, {scene: this, sceneKey: "level_1"});
        }

        // Se carga el mango
        this.load.image("mango", "./Design/Objects/mango.png");
        this.mango;

        // Reloj del juego
        this.clock;

        // Tiempo de partida
        this.maxMatchTime;
        this.matchTime

    }// Fin preload

    create() {

        // Se inicializa el reloj
        this.clock = new Phaser.Time.Clock(this);
        this.clock.start();
        
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

        platforms.create (287.8, 306, "tiki_leg");
        platforms.create (913, 306, "tiki_leg");

        platforms.create (300, 188, "tiki_arm1");
        platforms.create (900.5, 188, "tiki_arm");

        platforms.create (54.5, 185.50, "side_plat");
        platforms.create (1148.5, 185.50, "side_plat");

        // Se crea el personaje
        for (var i = 0; i < this.characters.length; i++){
            switch(this.characters[i].id){
                case 1:
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0]+"_idle", true, 0, 0);
                    break;

                case 2:
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0]+"_idle", true, 0, 0);
                    break;
                
                case 3:
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0]+"_idle", true, 0, 0);
                    break;

                case 4:
                    this.characters[i] = new Character(this, this.characters[i].id, this.characters[i].type.split("_")[0]+"_idle", true, 0, 0);
                    break;
            }
        }

        for (var i = 0; i < this.characters.length; i++){
            this.characters[i].preload();
            this.characters[i].create();
        }

        // Se crea el mango
        this.mango = new Mango(this, "mango", 600, 260, 30000);

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
        
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.intro = this.sound.add("minigame_begining");
        this.intro.play();
        this.loop = this.sound.add("minigame_loop");
        this.loop.play({
            loop : true,
            delay : 6.87
        });

        // Tiempo de partida
        this.maxMatchTime = 120000;// Tiempo máximo
        this.matchTime = this.time.now;

    }// Fin Create

    update() {

        // Update de los personajes y del mango
        for (var i = 0; i < this.characters.length; i++){
            this.characters[i].update();
        }
        this.mango.update();

        // Pause
        if(Phaser.Input.Keyboard.JustDown(this.pauseKey)){
            this.scene.pause("level_1");
            this.scene.wake("pause");
        }
        // Refresh body de la plataforma que se mueve
        this.upMovePlat.refreshBody();

        // Si el tiempo de partida supera el tiempo máximo, se pasa a la pantalla de puntuaciones
        console.log(this.maxMatchTime - (this.clock.now - this.matchTime)); // Tiempo restante
        if (this.clock.now - this.matchTime >= this.maxMatchTime || this.numPlayers <= 1){
            this.scene.start("score_level", {characters: this.characters});
            // Se para la música
            this.intro.stop();
            this.loop.stop();
        }

    }// Fin Update

    CogerMango(character, mango){
        if (!mango.character){// Si el mango no tiene ningún personaje asociado
            this.mango.time = this.clock.now;
            mango.character = character;// El personaje que lo recoge queda guardado en el mango
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
                        break;
    
                    case character2.id:
                        this.mango.character = character1;
                        break;
    
                    default:
                        break;
                }
                this.collisionTime = this.clock.now;// Se reinicia el tiempo del mango para cambiar de jugador
            }
        }
    }//Fin RobarMango

    EliminarPersonaje(character){ // Al explotar el mango
        for (var i = 0; i < this.characters.length; i++){
            if (character.id == this.characters[i].id){
                this.characters[i].score += this.numPlayers;
                //Quitar al personaje de la escena
                this.characters[i].body.destroy();
                this.characters[i].alpha = 0;
            }
        }
        this.numPlayers--;
    }// Fin EliminarPersonaje

}// Fin clase Level1

