class ChooseCharacter extends Phaser.Scene {
    constructor(){
        super({key: "choose_character"});

        this.players;

        this.numPlayers;

        this.characters;

        this.cursors1;
        this.cursors2;
        this.cursors3;
        this.cursors4;

        this.selector1;
        this.selector2;
        this.selector3;
        this.selector4;

    }

    preload() {
        // Se cargan las imágenes
        this.load.image("character_background", "../Design/Stages/Backgrounds/choose_player.png");

        this.load.image("palm", "../Design/Characters/Palm/palm_idle_00.png");
        this.load.image("dino", "../Design/Characters/Dino/dino_idle_00.png");
        this.load.image("toucan", "../Design/Characters/Toucan/toucan_idle_00.png");
        this.load.image("lemur", "../Design/Characters/Lemur/lemur_idle_00.png");

        this.players = [ false, false, false, false]; // Jugadores

        this.numPlayers = 0;

        this.characters = [];

        // Controles de selección
        this.cursors1 = []; // Controles de selector jugador 1
        this.cursors1[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors1[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cursors1[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.cursors2 = []; // Controles de selector jugador 2
        this.cursors2[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.cursors2[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.cursors2[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.cursors3 = []; // Controles de selector jugador 3
        this.cursors3[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.cursors3[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.cursors3[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.cursors4 = []; // Controles de selector jugador 4
        this.cursors4[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_4);
        this.cursors4[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_6);
        this.cursors4[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_5);

        this.selector1 = 0;
        this.selector2 = 0;
        this.selector3 = 0;
        this.selector4 = 0;
    }

    create() {
        this.add.image(0, 0, "character_background").setOrigin(0,0);
    }

    update() {
        // Creación y cambio del personaje del jugador 1
        if (!this.players[0]){
            if (this.cursors1[0].isDown || this.cursors1[1].isDown || this.cursors1[2].isDown) {
                this.characters[0] = new Character(this, 1, "palm", false, 200, 270);
                this.players[0] = true;
                this.numPlayers++;
            }
        }else {
            if(this.cursors1[0].isDown) {
                if (this.selector1 <= 0){
                    this.selector1 = 3;
                    this.changeCharacter(this.characters, 0, this.selector1);
                }else{
                    this.selector1--;
                    this.changeCharacter(this.characters, 0, this.selector1);
                }
            }else if (this.cursors1[1].isDown){
                if (this.selector1 >=3){
                    this.selector1 = 0;
                    this.changeCharacter(this.characters, 0, this.selector1);
                }else{
                    this.selector1++;
                    this.changeCharacter(this.characters, 0, this.selector1);
                }
            }
        }

        // Creación y cambio del personaje del jugador 2
        if (!this.players[1]){
            if (this.cursors2[0].isDown || this.cursors2[1].isDown || this.cursors2[2].isDown) {
                this.characters[1] = new Character(this, 2, "palm", false, 460, 270);
                this.players[1] = true;
                this.numPlayers++;
            }
        }else {
            if(this.cursors2[0].isDown) {
                if (this.selector2 <= 0){
                    this.selector2 = 3;
                    this.changeCharacter(this.characters, 1, this.selector2);
                }else{
                    this.selector2--;
                    this.changeCharacter(this.characters, 1, this.selector2);
                }
            }else if (this.cursors2[1].isDown){
                if (this.selector2 >=3){
                    this.selector2 = 0;
                    this.changeCharacter(this.characters, 1, this.selector2);
                }else{
                    this.selector2++;
                    this.changeCharacter(this.characters, 1, this.selector2);
                }
            }
        }
        
        // Creación y cambio del personaje del jugador 3
        if (!this.players[2]){
            if (this.cursors3[0].isDown || this.cursors3[1].isDown || this.cursors3[2].isDown) {
                this.characters[2] = new Character(this, 3, "palm", false, 735, 270);
                this.players[2] = true;
                this.numPlayers++;
            }
        }else {
            if(this.cursors3[0].isDown) {
                if (this.selector3 <= 0){
                    this.selector3 = 3;
                    this.changeCharacter(this.characters, 2, this.selector3);
                }else{
                    this.selector3--;
                    this.changeCharacter(this.characters, 2, this.selector3);
                }
            }else if (this.cursors3[1].isDown){
                if (this.selector3 >=3){
                    this.selector3 = 0;
                    this.changeCharacter(this.characters, 2, this.selector3);
                }else{
                    this.selector3++;
                    this.changeCharacter(this.characters, 2, this.selector3);
                }
            }
        }
        
        // Creación y cambio del personaje del jugador 4
        if (!this.players[3]){
            if (this.cursors4[0].isDown || this.cursors4[1].isDown || this.cursors4[2].isDown) {
                this.characters[3] = new Character(this, 4, "palm", false, 990, 270);
                this.players[3] = true;
                this.numPlayers++;
            }
        }else {
            if(this.cursors4[0].isDown) {
                if (this.selector4 <= 0){
                    this.selector4 = 3;
                    this.changeCharacter(this.characters, 3, this.selector4);
                }else{
                    this.selector4--;
                    this.changeCharacter(this.characters, 3, this.selector4);
                }
            }else if (this.cursors4[1].isDown){
                if (this.selector4 >=3){
                    this.selector4 = 0;
                    this.changeCharacter(this.characters, 3, this.selector4);
                }else{
                    this.selector4++;
                    this.changeCharacter(this.characters, 3, this.selector4);
                }
            }
        }
        console.log(this.characters[2]);
    }

    changeCharacter(charactersArray, characterid, selector){
        switch(selector){
            case 0:
                this.characterAux = new Character(this, characterid+1, "palm", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
            case 1:
                    this.characterAux = new Character(this, characterid+1, "dino", false, charactersArray[characterid].x, charactersArray[characterid].y);
                    this.characters[characterid].destroy();
                    this.characters[characterid] = this.characterAux;
                break;
            case 2:
                    this.characterAux = new Character(this, characterid+1, "lemur", false, charactersArray[characterid].x, charactersArray[characterid].y);
                    this.characters[characterid].destroy();
                    this.characters[characterid] = this.characterAux;
                break;
            case 3:
                    this.characterAux = new Character(this, characterid+1, "toucan", false, charactersArray[characterid].x, charactersArray[characterid].y);
                    this.characters[characterid].destroy();
                    this.characters[characterid] = this.characterAux;
                break;
        }
    }
}