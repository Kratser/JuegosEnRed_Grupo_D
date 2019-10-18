class ChooseCharacter extends Phaser.Scene {
    constructor(){
        super({key: "choose_character"});

        this.players;

        this.numPlayers;

        this.characters;
        this.charactersSelected;

        this.cursors1;
        this.cursors2;
        this.cursors3;
        this.cursors4;
        this.enterCursor;

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

        this.players = [ {active:false, selected: false}, {active:false, selected: false}, {active:false, selected: false}, {active:false, selected: false}]; // Jugadores

        this.numPlayers = 0;

        this.characters = [];
        this.charactersSelected = [ false, false, false, false];

        // Controles de selección
        this.cursors1 = []; // Controles de selector jugador 1
        this.cursors1[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors1[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors1[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors1[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.cursors2 = []; // Controles de selector jugador 2
        this.cursors2[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.cursors2[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.cursors2[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.cursors2[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        this.cursors3 = []; // Controles de selector jugador 3
        this.cursors3[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors3[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.cursors3[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors3[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.cursors4 = []; // Controles de selector jugador 4
        this.cursors4[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_8);
        this.cursors4[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_4);
        this.cursors4[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_5);
        this.cursors4[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_6);

        this.enterCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

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
        if (!this.players[0].active){
            if (Phaser.Input.Keyboard.JustDown(this.cursors1[0]) || Phaser.Input.Keyboard.JustDown(this.cursors1[1]) || Phaser.Input.Keyboard.JustDown(this.cursors1[2]) || Phaser.Input.Keyboard.JustDown(this.cursors1[3])) {
                this.characters[0] = new Character(this, 1, "palm", false, 200, 270);
                this.players[0].active = true;
                this.numPlayers++;
            }
        }else {
            if(Phaser.Input.Keyboard.JustDown(this.cursors1[1]) && !this.players[0].selected) {
                if (this.selector1 <= 0){
                    this.selector1 = 3;
                    this.changeCharacter(this.characters, 0, this.selector1);
                }else{
                    this.selector1--;
                    this.changeCharacter(this.characters, 0, this.selector1);
                }
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors1[3]) && !this.players[0].selected){
                if (this.selector1 >=3){
                    this.selector1 = 0;
                    this.changeCharacter(this.characters, 0, this.selector1);
                }else{
                    this.selector1++;
                    this.changeCharacter(this.characters, 0, this.selector1);
                }
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors1[2]) && !this.players[0].selected){
                this.charactersSelected[this.selector1] = true;
                this.players[0].selected = true;
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors1[0]) && this.players[0].selected){
                this.charactersSelected[this.selector1] = false;
                this.players[0].selected = false;
            }
        }

        // Creación y cambio del personaje del jugador 2
        if (!this.players[1].active){
            if (Phaser.Input.Keyboard.JustDown(this.cursors2[0]) || Phaser.Input.Keyboard.JustDown(this.cursors2[1]) || Phaser.Input.Keyboard.JustDown(this.cursors2[2]) || Phaser.Input.Keyboard.JustDown(this.cursors2[3])) {
                this.characters[1] = new Character(this, 2, "palm", false, 460, 270);
                this.players[1].active = true;
                this.numPlayers++;
            }
        }else {
            if(Phaser.Input.Keyboard.JustDown(this.cursors2[1]) && !this.players[1].selected) {
                if (this.selector2 <= 0){
                    this.selector2 = 3;
                    this.changeCharacter(this.characters, 1, this.selector2);
                }else{
                    this.selector2--;
                    this.changeCharacter(this.characters, 1, this.selector2);
                }
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors2[3]) && !this.players[1].selected){
                if (this.selector2 >=3){
                    this.selector2 = 0;
                    this.changeCharacter(this.characters, 1, this.selector2);
                }else{
                    this.selector2++;
                    this.changeCharacter(this.characters, 1, this.selector2);
                }
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors2[2]) && !this.players[1].selected){
                this.charactersSelected[this.selector2] = true;
                this.players[1].selected = true;
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors2[0]) && this.players[1].selected){
                this.charactersSelected[this.selector2] = false;
                this.players[1].selected = false;
            }
        }
        
        // Creación y cambio del personaje del jugador 3
        if (!this.players[2].active){
            if (Phaser.Input.Keyboard.JustDown(this.cursors3[0]) || Phaser.Input.Keyboard.JustDown(this.cursors3[1]) || Phaser.Input.Keyboard.JustDown(this.cursors3[2]) || Phaser.Input.Keyboard.JustDown(this.cursors3[3])) {
                this.characters[2] = new Character(this, 3, "palm", false, 735, 270);
                this.players[2].active = true;
                this.numPlayers++;
            }
        }else {
            if(Phaser.Input.Keyboard.JustDown(this.cursors3[1]) && !this.players[2].selected) {
                if (this.selector3 <= 0){
                    this.selector3 = 3;
                    this.changeCharacter(this.characters, 2, this.selector3);
                }else{
                    this.selector3--;
                    this.changeCharacter(this.characters, 2, this.selector3);
                }
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors3[3]) && !this.players[2].selected){
                if (this.selector3 >=3){
                    this.selector3 = 0;
                    this.changeCharacter(this.characters, 2, this.selector3);
                }else{
                    this.selector3++;
                    this.changeCharacter(this.characters, 2, this.selector3);
                }
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors3[2]) && !this.players[2].selected){
                this.charactersSelected[this.selector3] = true;
                this.players[2].selected = true;
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors3[0]) && this.players[2].selected){
                this.charactersSelected[this.selector3] = false;
                this.players[2].selected = false;
            }
        }
        
        // Creación y cambio del personaje del jugador 4
        if (!this.players[3].active){
            if (Phaser.Input.Keyboard.JustDown(this.cursors4[0]) || Phaser.Input.Keyboard.JustDown(this.cursors4[1]) || Phaser.Input.Keyboard.JustDown(this.cursors4[2]) || Phaser.Input.Keyboard.JustDown(this.cursors4[3])) {
                this.characters[3] = new Character(this, 4, "palm", false, 990, 270);
                this.players[3].active = true;
                this.numPlayers++;
            }
        }else {
            if(Phaser.Input.Keyboard.JustDown(this.cursors4[1]) && !this.players[3].selected) {
                if (this.selector4 <= 0){
                    this.selector4 = 3;
                    this.changeCharacter(this.characters, 3, this.selector4);
                }else{
                    this.selector4--;
                    this.changeCharacter(this.characters, 3, this.selector4);
                }
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors4[3]) && !this.players[3].selected){
                if (this.selector4 >=3){
                    this.selector4 = 0;
                    this.changeCharacter(this.characters, 3, this.selector4);
                }else{
                    this.selector4++;
                    this.changeCharacter(this.characters, 3, this.selector4);
                }
            }else if (Phaser.Input.Keyboard.JustDown(this.cursors4[2]) && !this.players[3].selected){
                this.charactersSelected[this.selector4] = true;
                this.players[3].selected = true;
            }
            else if (Phaser.Input.Keyboard.JustDown(this.cursors4[0]) && this.players[3].selected){
                this.charactersSelected[this.selector4] = false;
                this.players[3].selected = false;
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.enterCursor) && this.numPlayers >=2 ){
            this.scene.start("testing_scene");
        }

        console.log("Personajes Seleccionados: "+this.charactersSelected);

    }//Fin Update

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