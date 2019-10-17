// Dinosaurio: Collider: {25, 64}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Palmera: Collider: {25, 42}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Lémur: Collider: {25, 42}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Tucán: Collider: {25, 20}, VelMax: , Acel: , Alt Salto: , Vel Caída:
class Character extends Phaser.GameObjects.Sprite{
    constructor (scene, type, x, y, cursors, colliderSize = [,], maxVelocity = 300, acceleration = 480, jumpHeight = 400, fallSpeed = 100) {
        // Llamada al padre del objeto
        super(scene, x, y, type);

        //Atributos del personaje
        this.scene = scene
        this.type = type; //Sprite
        this.cursors = cursors;// 0 arriba, 1 izquierda, 2 abajo, 3 derecha, movimiento
        this.colliderSize = colliderSize;
        this.maxVelocity = maxVelocity;
        this.acceleration = acceleration;
        this.jumpHeight = jumpHeight;
        this.fallSpeed = fallSpeed;
        // Se añade a la escena al hacer el new
        scene.add.existing(this);

        // Se activan las físicas de la escena y las colisiones con los bordes del lienzo
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        //Propiedades del personaje como el rozamiento o el escalado (revisar)
        this.body.maxVelocity.x = this.maxVelocity;
        this.body.setAllowDrag();
        this.body.setDragX(480);
        this.body.setSize(this.colliderSize[0], this.colliderSize[1]); // Para cambiar el collider

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