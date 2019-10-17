class Player {
    constructor(id, character) { 

        this.id = id;
        this.cursors;
        this.character = new Character(character.scene, character.type, character.x, character.y, this.cursors, 
            character.colliderSize, character.maxVelocity, character.acceleration, character.jumpHeight,
            character.fallSpeed);

    }

    preload() {
        this.cursors1 = []; // Esto vendrá dado en la clase Player
        this.cursors1[0] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors1[1] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors1[2] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors1[3] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.cursors2 = []; // Esto vendrá dado en la clase Player
        this.cursors2[0] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.cursors2[1] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.cursors2[2] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.cursors2[3] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        this.cursors3 = []; // Esto vendrá dado en la clase Player
        this.cursors3[0] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors3[1] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.cursors3[2] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors3[3] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.cursors4 = []; // Esto vendrá dado en la clase Player
        this.cursors4[0] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_8);
        this.cursors4[1] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_4);
        this.cursors4[2] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_5);
        this.cursors4[3] = this.character.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_6);

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

        this.character.cursors = this.cursors;
    }

    create() {
        
    }

    update() {
        this.character.update();
    }
}