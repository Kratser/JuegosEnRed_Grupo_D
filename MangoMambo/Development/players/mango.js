class Mango extends Phaser.GameObjects.Sprite{
    constructor (scene, type, x, y, time = 30, character = null) {
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

        this.time = time;
        this.explodeTime = time;
        this.timer;
        // Se añade a la escena al hacer el new
        scene.add.existing(this);

    }// Fin constructor

    preload(){

    }

    create() {
        
    }

    update() {
        // Cambio de color y de escala en función del tiempo restante
        this.tint = 0xff0000 + (0x00ffff * (this.explodeTime/this.time));
        this.scale = 1 + (0.5 * ((this.time - this.explodeTime) / this.time));
        
        if (this.character){
            this.x = this.character.x;
            this.y = this.character.y - this.character.height*3/4;
            if (this.explodeTime <= 0){
                console.log("PUM!");
                this.explodeTime = this.time;
                // this.x = 600;
                // this.y = 260;
                this.x = 600;
                this.y = -10;
                this.scene.EliminarPersonaje(this.character);
                this.character = null;
                this.timer = null;
                this.scene.text.alpha = 0;
                this.scene.timeImage.alpha = 0;
                var tween = this.scene.tweens.add({
                    targets: this,
                    y: 260,
                    duration: 2000
                });
            }
        }
    }// Fin update
    
    UpdateTime() {
        this.explodeTime -= 1; // Un segundo
        this.scene.text.setText(this.scene.FormatTime(this.explodeTime));
    }

}// Fin clase Mango