// Palmera: Collider: {25, 42}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Dinosaurio: Collider: {25, 64}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Lémur: Collider: {25, 42}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Tucán: Collider: {25, 20}, VelMax: , Acel: , Alt Salto: , Vel Caída:
class Character extends Phaser.GameObjects.Sprite{
    constructor (scene, id, type, physics, x, y) {
        // Llamada al padre del objeto
        super(scene, x, y, type);

        //Atributos del personaje
        this.scene = scene
        this.id = id;
        this.type = type; //Sprite
        this.physics = physics;
        this.x = x;
        this.y = y;
        
        

        this.cursors;// 0 arriba, 1 izquierda, 2 abajo, 3 derecha, movimiento
        // Se añade a la escena al hacer el new
        scene.add.existing(this);

        // Se activan las físicas de la escena y las colisiones con los bordes del lienzo
        if(this.physics){
            scene.physics.world.enable(this);
            this.body.setCollideWorldBounds(true);
        
        //Propiedades del personaje como el rozamiento o el escalado (revisar)
        this.body.setAllowDrag();
        this.body.setDragX(480);
        
        }
    }

    preload(){
        this.cursors1 = []; // Esto vendrá dado en la clase Player
        this.cursors1[0] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors1[1] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors1[2] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors1[3] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.cursors2 = []; // Esto vendrá dado en la clase Player
        this.cursors2[0] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.cursors2[1] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.cursors2[2] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.cursors2[3] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        this.cursors3 = []; // Esto vendrá dado en la clase Player
        this.cursors3[0] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors3[1] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.cursors3[2] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors3[3] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.cursors4 = []; // Esto vendrá dado en la clase Player
        this.cursors4[0] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_8);
        this.cursors4[1] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_4);
        this.cursors4[2] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_5);
        this.cursors4[3] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_6);

        switch (this.id){
            case 1:
                this.cursors = this.cursors1;
                break;
            case 2:
                this.cursors = this.cursors2;
                break;
            case 3:
                this.cursors = this.cursors3;
                break;
            case 4:
                this.cursors = this.cursors4;
                break;
        }
    }

    create() {
        switch (this.type) {
            case "palm":
                this.colliderSize = [25, 42];
                this.maxVelocity = 300;
                this.acceleration = 600;
                this.jumpHeight = 510;
                this.fallSpeed = 500;
                break;
            case "dino":
                this.colliderSize = [25, 64];
                this.maxVelocity = 300;
                this.acceleration = 600;
                this.jumpHeight = 510;
                this.fallSpeed = 0;
                break;
            case "lemur":
                this.colliderSize = [25, 42];
                this.maxVelocity = 400;
                this.acceleration = 600;
                this.jumpHeight = 510;
                this.fallSpeed = 0;
                break;
            case "toufat":
                this.colliderSize = [25, 20];
                this.maxVelocity = 250;
                this.acceleration = 400;
                this.jumpHeight = 700;
                this.fallSpeed = 0;
                break;
            default:
                this.colliderSize = [,];
                this.maxVelocity = 0;
                this.acceleration = 0;
                this.jumpHeight = 0;
                this.fallSpeed = 0;
                break;
        }
        this.body.setSize(this.colliderSize[0], this.colliderSize[1]); // Para cambiar el collider
        this.body.maxVelocity.x = this.maxVelocity;
    }

    update() {
        //Controla el movimiento del personaje
        if (this.cursors[1].isDown) {// Izquierda

            if(this.body.velocity.x > 0){
                this.body.setAccelerationX(-this.acceleration);
            }else{
                this.body.setAccelerationX(-this.acceleration);
            }

            
        }
        else if (this.cursors[3].isDown) {// Derecha

            if(this.body.velocity.x > 0){
                this.body.setAccelerationX(this.acceleration);
            }else{
                this.body.setAccelerationX(this.acceleration);
            }
        }
        else {
            this.body.setAccelerationX(0);
        }

        if (this.cursors[0].isDown && this.body.touching.down) {// Arriba
            this.body.setVelocityY(-this.jumpHeight);
        }

        if (this.cursors[2].isDown && this.body.velocity.y >= 0){// Abajo
            this.body.gravity.y = this.fallSpeed;
        }else if (this.body.velocity.y >= 0){
            this.body.gravity.y = 0;
        }

    }
}
