class Level1 extends Phaser.Scene {
    constructor(){
        super({key: "level_1"});

        this.characters; // Escena, Sprite asociado, Array de Cursores, X, Y, VelMáx, Acel, Altura de salto, Vel Caída

        // La intro de la canción
        this.intro;

        // La canción loopeada
        this.loop;
    }

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

        // Se carga la imagen del personaje "palmera"
        this.load.image("palm", "./Design/Characters/Palm/palm_idle_00.png");
        this.load.image("dino", "./Design/Characters/Dino/dino_idle_00.png");
        this.load.image("toucan", "./Design/Characters/Toucan/toucan_idle_00.png");
        this.load.image("lemur", "./Design/Characters/Lemur/lemur_idle_00.png");
        this.characters = [];
        
        // Se carga la música
        this.load.audio("minigame_begining", "./Design/Audio/MinigameSong/minigame_begining_with_edit.wav");
        this.load.audio("minigame_loop", "./Design/Audio/MinigameSong/minigame_with_edit.wav");
    }

    create() {
        // 960 x 720
        // Fondo, revisar
        this.add.image(0, 0, "lvl1_background").setOrigin(0,0);

        // Se crean las plataformas como un grupo
        var platforms = this.physics.add.staticGroup(); 

        //Creación de plataformas
        //Suelo
        platforms.create (53, 497.5, "top_step1");
        platforms.create (156, 524.5, "mid_step1");
        platforms.create (253.5, 552, "bott_step1");
        platforms.create (600, 579, "ground_base");
        platforms.create (946.5, 552, "bott_step2");
        platforms.create (1044, 524.5, "mid_step2");
        platforms.create (1147, 497.5, "top_step2");

        //Aire
        platforms.create (351.5, 199, "tiki_plat");
        platforms.create (849.5, 199, "tiki_plat");

        platforms.create (600, 155, "yellow_plat");
        platforms.create (600, 299, "yellow_plat");

        platforms.create (600, 434, "big_plat");

        platforms.create (287.8, 306, "tiki_leg");
        platforms.create (913, 306, "tiki_leg");

        platforms.create (300, 188, "tiki_arm1");
        platforms.create (900.5, 188, "tiki_arm");

        platforms.create (54.5, 185.50, "side_plat");
        platforms.create (1148.5, 185.50, "side_plat");

        // Se crea el personaje
        this.characters[0] = new Character(this, 1, "palm", true, 0, 0, [25,42]);
        this.characters[1] = new Character(this, 2, "dino", true, 1152/4, 0, [25,64]);
        this.characters[2] = new Character(this, 3, "toucan", true, 1152/2, 0, [25,20]);
        this.characters[3] = new Character(this, 4, "lemur", true, 1152, 0, [25,42]);

        for (var i = 0; i < this.characters.length; i++){
            this.characters[i].preload();
        }

        // Se crea la colisión entre el personaje y las plataformas
        for (var i = 0; i < this.characters.length; i++){
            this.physics.add.collider(this.characters[i], platforms);
        }

        this.scene.add("pause", new Pause);
        
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.intro = this.sound.add("minigame_begining");
        this.intro.play();
        this.loop = this.sound.add("minigame_loop");
        this.loop.play({
            loop : true,
            delay : 6.87
        });
    }

    update() {
        for (var i = 0; i < this.characters.length; i++){
            this.characters[i].update();
        }
    }
}
//setVolume(value)
