class Mango extends Phaser.GameObjects.Sprite{
    constructor (scene, type, x, y, time = 30000, character = null) {
        // Llamada al padre del objeto
        super(scene, x, y, type);

        //Atributos del personaje
        this.scene = scene
        this.type = type; //Sprite
        this.x = x;
        this.y = y;
        this.maxTime = time; // Tiempo que tarda en explotar
        this.time = this.scene.time.now;

        this.character = character; // Personaje al que sigue

        scene.physics.world.enable(this);
        this.body.allowDrag = false;
        this.body.allowGravity = false;


        // Se añade a la escena al hacer el new
        scene.add.existing(this);

    }

    preload(){

    }

    create() {

    }

    update() {
        if (this.character){
            this.x = this.character.x;
            this.y = this.character.y - this.character.height*3/4;
            if (this.scene.clock.now - this.time >= this.maxTime){
                console.log("PUM!");
                this.time = this.scene.clock.now;
                this.x = 600;
                this.y = 272;
                this.scene.EliminarPersonaje(this.character);
                this.character = null;
            }
        }
    }
}