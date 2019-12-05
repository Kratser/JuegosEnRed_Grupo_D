class Mango extends Phaser.GameObjects.Sprite{
    constructor (scene, type, x, y, time = 30, character = null) {
        // Llamada al padre del objeto
        super(scene, x, y, type);
        //Atributos del personaje
        this.scene = scene;
        //Sprite
        this.type = type; 
        this.x = x;
        this.y = y;
        // Personaje al que sigue
        this.character = character; 
        // Físicas
        scene.physics.world.enable(this);
        this.body.allowDrag = false;
        this.body.allowGravity = false;
        // Tiempo de explosión
        this.time = time;
        this.explodeTime = time;
        this.timer;
        // Se añade a la escena al hacer el new
        scene.add.existing(this);
    }// Fin constructor

    preload(){

    }// Fin Preload

    create() {
        this.scene.anims.create({
            key: 'mango_explosion',
            frames: this.scene.anims.generateFrameNumbers('mango_explosion', { start: 0, end: 7 }),
            frameRate: 15
        });
        this.on("animationcomplete", this.AnimComplete, this);
    }// Fin Create

    update() {
        // Cambio de color y de escala en función del tiempo restante
        this.tint = 0xff0000 + (0x00ffff * (this.explodeTime/this.time));
        this.scale = 1 + (0.5 * ((this.time - this.explodeTime) / this.time));
        // Si tiene un personaje asociado, se actualiza el tiempo
        if (this.character){
            this.x = this.character.x;
            this.y = this.character.y - this.character.height*3/4;
            if (this.explodeTime <= 0){
                console.log("PUM!");
                this.y = this.character.y;
                this.anims.play("mango_explosion", true);
                this.tint = 0xffffff;
                if (!this.scene.mango_explosion.isPlaying){
                    this.scene.mango_explosion.play({
                        volume: this.scene.vol
                    });
                }
            }
        }
    }// Fin update
    
    UpdateTime() {
        // Un segundo
        this.explodeTime -= 1; 
        this.scene.text.setText(this.scene.FormatTime(this.explodeTime));
    }

    AnimComplete(animation, frame) {
        this.explodeTime = this.time;
        this.setTexture("mango", 0);
        this.x = 600;
        this.y = -10;
        this.scene.EliminarPersonaje(this.character);
        this.character = null;
        this.timer = null;
        this.scene.text.alpha = 0;
        this.scene.timeImage.alpha = 0;
        // Aparece texto de getMango 
        this.scene.getMango.alpha = 1;
        var tween = this.scene.tweens.add({
            targets: this,
            y: 260,
            duration: 2000
        });
    }
}// Fin clase Mango