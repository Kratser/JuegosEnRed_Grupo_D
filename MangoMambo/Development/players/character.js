// Dinosaurio: Collider: {25, 96}, VelMax: , Acel: ,
// Palmera: Collider: {}, VelMax: ,
// Lémur: Collider: 
// 
class Character extends Phaser.GameObjects.Sprite{
    constructor (scene, type, x, y, cursors, colliderSize = [,], maxVelocity = 300, acceleration = 480, jumpHeight = 400, fallSpeed = 100) {
        // Llamada al padre del objeto
        super(scene, x, y, type);

        // Se añade a la escena al hacer el new
        scene.add.existing(this);

        // Se activan las físicas de la escena y las colisiones con los bordes del lienzo
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        //Se crean los cursores para mover al personaje
        // this.cursors = scene.input.keyboard.createCursorKeys();
        this.cursors = cursors;// 0 arriba, 1 izquierda, 2 abajo, 3 derecha 

        //Propiedades del personaje como el rozamiento o el escalado (revisar)
        this.body.maxVelocity.x = maxVelocity;
        this.acceleration = acceleration;
        this.jumpHeight = jumpHeight;
        this.fallSpeed = fallSpeed;
        this.body.setAllowDrag();
        this.body.setDragX(480);
        this.body.setSize(colliderSize[0], colliderSize[1]); // Para cambiar el collider

    }

    preload(){
        
    }

    create() {

    }

    update() {
        //Controla el movimiento del personaje
        if (this.cursors[1].isDown) {

            if(this.body.velocity.x > 0){
                this.body.setAccelerationX(-this.acceleration);
            }else{
                this.body.setAccelerationX(-this.acceleration);
            }

            
        }
        else if (this.cursors[3].isDown) {

            if(this.body.velocity.x > 0){
                this.body.setAccelerationX(this.acceleration);
            }else{
                this.body.setAccelerationX(this.acceleration);
            }
        }
        else {
            this.body.setAccelerationX(0);
        }

        if (this.cursors[0].isDown && this.body.touching.down) {
            this.body.setVelocityY(-this.jumpHeight);
        }

    }
}