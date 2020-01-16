// Palmera: Collider: {25, 42}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Dinosaurio: Collider: {25, 64}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Lémur: Collider: {25, 42}, VelMax: , Acel: , Alt Salto: , Vel Caída:
// Tucán: Collider: {25, 20}, VelMax: , Acel: , Alt Salto: , Vel Caída:
class WSCharacter extends Phaser.GameObjects.Sprite{
    constructor (scene, id, type, physics, x, y, score = 0) {
        // Llamada al padre del objeto
        super(scene, x, y, type);
        //Atributos del personaje
        this.scene = scene
        this.id = id;
        //Sprite
        this.type = type; 
        this.physics = physics;
        this.x = x;
        this.y = y;
        this.score = score;
        // Animaciones: 0 idle, 1 walk, 2 jump
        this.anim = [];
        // Teclas: 0 arriba, 1 izquierda, 2 abajo, 3 derecha, movimiento
        this.cursors;
        // Se añade a la escena al hacer el new
        scene.add.existing(this);
        
        // Se activan las físicas de la escena y las colisiones con los bordes del lienzo
        if(this.physics){
            scene.physics.world.enable(this);
            this.body.setCollideWorldBounds(true);
            //Propiedades del personaje como el rozamiento o el escalado
            this.body.setAllowDrag();
            this.body.setDragX(480);
        }
    }// Fin constructor

    preload(){
        // Partículas
        this.emitter;
        this.outline;
        // Teclas
        this.cursors;
    }// Fin preload

    create() {

        // Teclas
        // Jugador 1
        this.cursors = []; // Esto vendrá dado en la clase Player
        this.cursors[0] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[1] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors[2] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[3] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        switch (this.id){
            case 1:
                // Borde de color
                this.outline = this.scene.add.particles("outline").setDepth(-1);
                this.emitter = this.outline.createEmitter({
                    follow: this,
                    followOffset: {
                        y: this.height / 6
                    },
                    angle: { min: 0, max: 360 },
                    scale: { start: 0.8, end: 0.0 },
                    // xxRRGGBB
                    tint: 0xff0eff00,
                    lifespan: 200
                });
                break;
            case 2:
                // Borde de color
                this.outline = this.scene.add.particles("outline").setDepth(-1);
                this.emitter = this.outline.createEmitter({
                    follow: this,
                    followOffset: {
                        y: this.height / 6
                    },
                    scale: { start: 0.8, end: 0.0 },
                    // xxRRGGBB
                    tint: 0xffff00e9,
                    lifespan: 200
                });
                break;
            case 3:
                // Borde de color
                this.outline = this.scene.add.particles("outline").setDepth(-1);
                this.emitter = this.outline.createEmitter({
                    follow: this,
                    followOffset: {
                        y: this.height / 6
                    },
                    scale: { start: 0.8, end: 0.0 },
                    // xxRRGGBB
                    tint: 0xff00fff0,
                    lifespan: 200
                });
                break;
            case 4:
                // Borde de color
                this.outline = this.scene.add.particles("outline").setDepth(-1);
                this.emitter = this.outline.createEmitter({
                    follow: this,
                    followOffset: {
                        y: this.height/6
                    },
                    scale: {start: 0.8, end: 0.0},
                    // xxRRGGBB
                    tint: 0xffffeb00,
                    lifespan: 200
                });
                break;
        }// Fin switch 

        // Animaciones y propiedades
        switch (this.type.split("_")[0]) {
            case "palm":
                this.colliderSize = [25, 42];
                this.maxVelocity = 300;
                this.acceleration = 600;
                this.jumpHeight = 550;
                this.fallSpeed = 2000;
                this.anim[0] = "palm_idle";
                this.anim[1] = "palm_walk";
                this.anim[2] = "palm_jump";
                this.scene.anims.create({
                    key: 'palm_idle',
                    frames: this.scene.anims.generateFrameNumbers('palm_idle', { start: 0, end: 7 }),
                    frameRate: 9,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'palm_walk',
                    frames: this.scene.anims.generateFrameNumbers('palm_walk', { start: 0, end: 7 }),
                    frameRate: 20,
                    repeat: -1
                });
                break;
            case "dino":
                this.colliderSize = [25, 64];
                this.maxVelocity = 275;
                this.acceleration = 3000;
                this.jumpHeight = 550;
                this.fallSpeed = 0;
                this.anim[0] = "dino_idle";
                this.anim[1] = "dino_walk";
                this.anim[2] = "dino_jump";
                this.scene.anims.create({
                    key: 'dino_idle',
                    frames: this.scene.anims.generateFrameNumbers('dino_idle', { start: 0, end: 7 }),
                    frameRate: 11,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'dino_walk',
                    frames: this.scene.anims.generateFrameNumbers('dino_walk', { start: 0, end: 7 }),
                    frameRate: 16,
                    repeat: -1
                });
                break;
            case "lemur":
                this.colliderSize = [25, 42];
                this.maxVelocity = 500;
                this.acceleration = 1000;
                this.jumpHeight = 550;
                this.fallSpeed = 0;
                this.anim[0] = "lemur_idle";
                this.anim[1] = "lemur_walk";
                this.anim[2] = "lemur_jump";
                this.scene.anims.create({
                    key: 'lemur_idle',
                    frames: this.scene.anims.generateFrameNumbers('lemur_idle', { start: 0, end: 7 }),
                    frameRate: 11,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'lemur_walk',
                    frames: this.scene.anims.generateFrameNumbers('lemur_walk', { start: 0, end: 9 }),
                    frameRate: 27,
                    repeat: -1
                });
                break;
            case "toufat":
                this.colliderSize = [25, 20];
                this.maxVelocity = 250;
                this.acceleration = 400;
                this.jumpHeight = 700;
                this.fallSpeed = 0;
                this.anim[0] = "toufat_idle";
                this.anim[1] = "toufat_walk";
                this.anim[2] = "toufat_jump";
                this.scene.anims.create({
                    key: 'toufat_idle',
                    frames: this.scene.anims.generateFrameNumbers('toufat_idle', { start: 0, end: 7 }),
                    frameRate: 8,
                    repeat: -1
                });
                this.scene.anims.create({
                    key: 'toufat_walk',
                    frames: this.scene.anims.generateFrameNumbers('toufat_walk', { start: 0, end: 7 }),
                    frameRate: 18,
                    repeat: -1
                });
                break;
            default:
                this.colliderSize = [,];
                this.maxVelocity = 0;
                this.acceleration = 0;
                this.jumpHeight = 0;
                this.fallSpeed = 0;
                break;
        }// Fin switch
        this.body.setSize(this.colliderSize[0], this.colliderSize[1]); // Para cambiar el collider
        this.body.maxVelocity.x = this.maxVelocity;
    }// Fin create

    update() {
        //Controla el movimiento del personaje
        // Izquierda
        /*
        if (this.cursors[1].isDown) {
            if(this.body.velocity.x > 0){
                this.body.setAccelerationX(-this.acceleration);
            }else{
                this.body.setAccelerationX(-this.acceleration);
            }
            this.anims.play(this.anim[1], true);
            this.flipX = true;
        }
        */
        // Derecha
        /*
        else if (this.cursors[3].isDown) {
            if(this.body.velocity.x > 0){
                this.body.setAccelerationX(this.acceleration);
            }else{
                this.body.setAccelerationX(this.acceleration);
            }
            this.anims.play(this.anim[1], true);
            this.flipX = false;
        }
        */
       /*
        else {
            this.body.setAccelerationX(0);
            this.anims.play(this.anim[0], true);
        }
        */
        // Arriba
        /*
        if (this.cursors[0].isDown && this.body.onFloor()) {
            this.body.setVelocityY(-this.jumpHeight);
        }
        */
        // Abajo
        /*
        if (this.body.velocity.y >= 0){
            this.body.gravity.y = this.fallSpeed;
        }else if (this.body.velocity.y < 0){
            this.body.gravity.y = 0;
        }
        */
    }// Fin update

    action(key, pulsado){
        switch (key){
            // Saltar
            case 'w':
            case 'W':
                if (pulsado == "true"){
                    if (this.body.onFloor()){
                        this.body.setVelocityY(-this.jumpHeight);
                    }
                }
                break;
            // Izquierda
            case 'a':
            case 'A':
                // Si se pulsa
                if (pulsado == "true"){
                    if(this.body.velocity.x > 0){
                        this.body.setAccelerationX(-this.acceleration);
                    }else{
                        this.body.setAccelerationX(-this.acceleration);
                    }
                    this.anims.play(this.anim[1], true);
                    this.flipX = true;
                // Si se suelta
                } else {
                    this.body.setAccelerationX(0);
                    this.anims.play(this.anim[0], true);
                }
                break;
            // Abajo
            case 's':
            case 'S':
                if (this.body.velocity.y >= 0){
                    this.body.gravity.y = this.fallSpeed;
                }else if (this.body.velocity.y < 0){
                    this.body.gravity.y = 0;
                }
                break;
            // Derecha
            case 'd':
            case 'D':
                // Si se pulsa
                if (pulsado == "true"){
                    if(this.body.velocity.x > 0){
                        this.body.setAccelerationX(this.acceleration);
                    }else{
                        this.body.setAccelerationX(this.acceleration);
                    }
                    this.anims.play(this.anim[1], true);
                    this.flipX = false;
                // Si se suelta 
                } else {
                    this.body.setAccelerationX(0);
                    this.anims.play(this.anim[0], true);
                }
                break;
        }
    }
}// Fin clase Character