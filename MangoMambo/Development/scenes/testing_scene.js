class TestingScene extends Phaser.Scene {
    constructor(){
        super({key: "testing_scene"});

        this.characters; // Escena, Sprite asociado, Array de Cursores, X, Y, VelMáx, Acel, Altura de salto, Vel Caída
    }

    preload() {
        // Se cargan las imágenes de las plataformas
        this.load.image("background", "../Design/Stages/Backgrounds/testing_map_background.png");
        this.load.image("hor_plat", "../Design/Stages/Platforms/hor_platform.jpg");
        this.load.image("vert_plat", "../Design/Stages/Platforms/vert_platform.jpg");

        // Se carga la imagen del personaje "palmera"
        this.load.image("palm", "../Design/Characters/Palm/palm_idle_00.png");
        this.load.image("dino", "../Design/Characters/Dino/dino_idle_00.png");
        this.load.image("toucan", "../Design/Characters/Toucan/toucan_idle_00.png");
        this.load.image("lemur", "../Design/Characters/Lemur/lemur_idle_00.png");
        this.characters = [];
        
        // Se carga la música
        this.load.audio("menu_begining", "../Design/Audio/MenuSong/menu_begining_with_edit.wav");
        this.load.audio("menu_loop", "../Design/Audio/MenuSong/menu_with_edit.wav");
        this.load.audio("minigame_begining", "../Design/Audio/MinigameSong/minigame_begining_with_edit.wav");
        this.load.audio("minigame_loop", "../Design/Audio/MinigameSong/minigame_with_edit.wav");
    }

    create() {
        // 960 x 720
        // Fondo, revisar
        this.add.image(0, 0, "background").setOrigin(0,0);

        // Se crean las plataformas como un grupo
        var platforms = this.physics.add.staticGroup(); 

        platforms.create (281.5, 90, "hor_plat").setScale(0.7, 0.6).refreshBody();
        platforms.create (352, 199, "vert_plat").setScale(0.7, 0.5).refreshBody();
        platforms.create (281.5, 306, "hor_plat").setScale(0.7, 0.6).refreshBody();

        platforms.create (900, 450, "hor_plat").setScale(0.7, 0.6).refreshBody();

        platforms.create (600, 600, "hor_plat").setScale(5,1).refreshBody(); //Suelo

        // Se crea el personaje
        this.cursors = []; // Esto vendrá dado en la clase Player
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.characters[0] = new Character(this, "palm", 0, 0, this.cursors,[25,42]);
        this.characters[1] = new Character(this, "dino", 1152/4, 0, this.cursors, [25,64]);
        this.characters[2] = new Character(this, "toucan", 1152/2, 0, this.cursors,[25,20]);
        this.characters[3] = new Character(this, "lemur", 1152, 0, this.cursors,[25,42]);

        // Se crea la colisión entre el personaje y las plataformas
        
        for (var i = 0; i < this.characters.length; i++){
            this.physics.add.collider(this.characters[i], platforms);
        }
        
        // Se crea la música

        this.sound.pauseOnBlur = false;
        this.sound.play("minigame_begining")
        this.sound.play("minigame_loop",{
            loop : true,
            delay : 6.9
        })

        console.log(game);
    }

    update() {
        for (var i = 0; i < this.characters.length; i++){
            this.characters[i].update();
        }
    }
}
