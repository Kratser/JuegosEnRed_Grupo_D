// Palmera: Collider: {25, 42}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Dinosaurio: Collider: {25, 64}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Lémur: Collider: {25, 42}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Tucán: Collider: {25, 20}, VelMax: , Acel: , Alt Salto: , Vel Caída:
class Character extends Phaser.GameObjects.Sprite{
    constructor (scene, id, type, physics, x, y, score = 0) {
        // Llamada al padre del objeto
        super(scene, x, y, type);

        //Atributos del personaje
        this.scene = scene
        this.id = id;
        this.type = type; //Sprite
        this.physics = physics;
        this.x = x;
        this.y = y;
        this.score = score;
<<<<<<< HEAD
=======
        this.anim = [];// 0 idle, 1 walk, 2 jump
>>>>>>> 5c26ece41964000c7035bc30bff63a56d931d3af

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
        this.emitter;
        this.outline;

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
                // Borde de color
                this.outline = this.scene.add.particles("outline").setDepth(-1);
                this.emitter = this.outline.createEmitter({
                    follow: this,
                    followOffset: {
                        y: this.height/4
                    },
                    angle: {min: 0, max: 360},
                    scale: {start: 0.8, end: 0.0},
                    // xxRRGGBB
                    tint: 0xff0eff00,
                    lifespan: 200
                });
                break;
            case 2:
                this.cursors = this.cursors2;
                // Borde de color
                this.outline = this.scene.add.particles("outline").setDepth(-1);
                this.emitter = this.outline.createEmitter({
                    follow: this,
                    followOffset: {
                        y: this.height/4
                    },
                    scale: {start: 0.8, end: 0.0},
                    // xxRRGGBB
                    tint: 0xffff00e9,
                    lifespan: 200
                });
                break;
            case 3:
                this.cursors = this.cursors3;
                // Borde de color
                this.outline = this.scene.add.particles("outline").setDepth(-1);
                this.emitter = this.outline.createEmitter({
                    follow: this,
                    followOffset: {
                        y: this.height/4
                    },
                    scale: {start: 0.8, end: 0.0},
                    // xxRRGGBB
                    tint: 0xff00fff0,
                    lifespan: 200
                });
                break;
            case 4:
                this.cursors = this.cursors4;
                // Borde de color
                this.outline = this.scene.add.particles("outline").setDepth(-1);
                this.emitter = this.outline.createEmitter({
                    follow: this,
                    followOffset: {
                        y: this.height/4
                    },
                    scale: {start: 0.8, end: 0.0},
                    // xxRRGGBB
                    tint: 0xffffeb00,
                    lifespan: 200
                });
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
                this.fallSpeed = 2000;

                this.anim[0] = "palm_idle";
                this.anim[1] = "palm_walk";
                this.anim[2] = "palm_jump";
                break;
            case "dino":
                this.colliderSize = [, ];
                this.maxVelocity = 275;
                this.acceleration = 3000;
                this.jumpHeight = 510;
                this.fallSpeed = 0;

                this.anim[0] = "dino_idle";
                this.anim[1] = "dino_walk";
                this.anim[1] = "dino_jump";
                this.scene.anims.create({
                    key: 'dino_idle',
                    frames: this.scene.anims.generateFrameNumbers('dino_idle', { start: 0, end: 0 }),
                    frameRate: 1,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'dino_walk',
                    frames: this.scene.anims.generateFrameNumbers('dino_walk', { start: 0, end: 7 }),
                    frameRate: 9,
                    repeat: -1
                });
                break;
            case "lemur":
                this.colliderSize = [25, 42];
                this.maxVelocity = 600;
                this.acceleration = 1000;
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
<<<<<<< HEAD
        }        
=======
        }
>>>>>>> 5c26ece41964000c7035bc30bff63a56d931d3af

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
            this.anims.play(this.anim[1], true);
            this.flipX = true;

        }
        else if (this.cursors[3].isDown) {// Derecha

            if(this.body.velocity.x > 0){
                this.body.setAccelerationX(this.acceleration);
            }else{
                this.body.setAccelerationX(this.acceleration);
            }
<<<<<<< HEAD
=======
            this.anims.play(this.anim[1], true);
>>>>>>> 5c26ece41964000c7035bc30bff63a56d931d3af
            this.flipX = false;
        }
        else {
            this.body.setAccelerationX(0);
            this.anims.play(this.anim[0], true);
        }

        if (this.cursors[0].isDown && this.body.onFloor()) {// Arriba
            this.body.setVelocityY(-this.jumpHeight);
        }

        if (this.cursors[2].isDown /*&& this.body.velocity.y >= 0*/){// Abajo
            this.body.gravity.y = this.fallSpeed;
        }else if (this.body.velocity.y >= 0){
            this.body.gravity.y = 0;
        }

    }
}
