class TestingScene extends Phaser.Scene {
    constructor(){
        super({key: "testingScene"});

        this.characters; // Escena, Sprite asociado, Array de Cursores, X, Y, VelMáx, Acel, Altura de salto, Vel Caída
    }

    preload() {
        // Se cargan las imágenes de las plataformas
        this.load.image("background", "./assets/background.png");
        this.load.image("plat_hor", "./assets/plat_horizontal.jpg");
        this.load.image("plat_vert", "./assets/plat_vertical.jpg");

        // Se carga la imagen del personaje "palmera"
        this.load.image("palm", "./assets/palm_tree_00.png");
        this.load.image("cube", "./assets/cuadradoRojo.png");
        this.load.image("dino", "./assets/dino.png");
        this.characters = [];
    }

    create() {
        // 960 x 720
        // Fondo, revisar
        this.add.image(0, 0, "background").setOrigin(0,0);

        // Se crean las plataformas como un grupo
        var platforms = this.physics.add.staticGroup(); 

        platforms.create (281.5, 90, "plat_hor").setScale(0.7, 0.6).refreshBody();
        platforms.create (352, 199, "plat_vert").setScale(0.7, 0.5).refreshBody(); // 352
        platforms.create (281.5, 306, "plat_hor").setScale(0.7, 0.6).refreshBody();

        platforms.create (900, 450, "plat_hor").setScale(0.7, 0.6).refreshBody();

        platforms.create (600, 600, "plat_hor").setScale(5,1).refreshBody(); //Suelo

        // Se crea el personaje
        this.cursors = []; // Esto vendrá dado en la clase Player
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.characters[0] = new Character(this, "palm", 0, 0, this.cursors);
        this.characters[1] = new Character(this, "cube", 1152/2, 0, this.cursors);
        this.characters[2] = new Character(this, "dino", 1152, 0, this.cursors,[25,96], undefined,
        undefined);

        // Se crea la colisión entre el personaje y las plataformas
        
        for (var i = 0; i < this.characters.length; i++){
            this.physics.add.collider(this.characters[i], platforms);
        }

        console.log(game);
    }

    update() {
        for (var i = 0; i < this.characters.length; i++){
            this.characters[i].update();
        }
    }
}