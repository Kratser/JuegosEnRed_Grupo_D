class EscenaJuego extends Phaser.Scene {

    constructor() {
        // Constructor y variables globales
        super({key:"escenaJuego"});
        this.platforms;
        this.player;
    }

    preload() {
        // Se cargan las imágenes que voy a usar
        this.load.image("sky", "./assets/sky.png");
        this.load.image("ground", "./assets/platform.png");
        this.load.image("star", "./assets/star.png");
        this.load.image("bomb", "./assets/bomb.png");
        this.load.spritesheet("dude", "./assets/dude.png", { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        // Fondo
        this.add.image(400, 300, 'sky');

        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // Suelo
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // Se inicializa el jugador con el spritesheet "dude"
        this.player = new Player(this, 100, 450,"dude");
        // Se llama a su función preload para cargar todas sus animaciones, controladores, etc
        this.player.preload(this);
        

        // Se activa la colisión del jugador con las plataformas
        this.physics.add.collider(this.player, this.platforms);
    }

    update() {
        // Se llama al método update del jugador, donde se comprueba si se está pulsando alguna tecla
        this.player.update();
    }
}
