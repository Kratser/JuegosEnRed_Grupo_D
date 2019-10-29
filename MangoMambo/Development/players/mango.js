class Mango extends Phaser.GameObjects.Sprite{
    constructor (scene, type, x, y, character = null) {
        // Llamada al padre del objeto
        super(scene, x, y, type);

        //Atributos del personaje
        this.scene = scene
        this.type = type; //Sprite
        this.x = x;
        this.y = y;

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
        }
    }
}