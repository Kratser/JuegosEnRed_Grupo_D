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

    }//Fin constructor

    preload() {
        // Se cargan las imágenes
        this.load.image("character_background", "../Design/Stages/Backgrounds/choose_player.png");

        this.load.image("palm", "../Design/Characters/Palm/palm_idle_00.png");
        this.load.image("dino", "../Design/Characters/Dino/dino_idle_00.png");
        this.load.image("toucan", "../Design/Characters/Toucan/toucan_idle_00.png");
        this.load.image("lemur", "../Design/Characters/Lemur/lemur_idle_00.png");

        this.players = [ {active:false, selected: false}, {active:false, selected: false}, 
                         {active:false, selected: false}, {active:false, selected: false}]; // Jugadores

        this.numPlayers = 0; // Número de jugadores activo

        this.characters = []; // Lista de jugadores
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

        // ENTER
        this.enterCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.selector1 = 0;
        this.selector2 = 0;
        this.selector3 = 0;
        this.selector4 = 0;

    }//Fin preload

    create() {
        this.add.image(0, 0, "character_background").setOrigin(0,0); // Fondo
    }//Fin create

    update() {
        // Creación y cambio del personaje del jugador 1
        if (!this.players[0].active){// Si el jugador 1 no se encuentra activo
            // Si se pulsa la tecla WASD, se añade el jugador 1 a la lista de jugadores
            if (Phaser.Input.Keyboard.JustDown(this.cursors1[0]) || Phaser.Input.Keyboard.JustDown(this.cursors1[1]) || Phaser.Input.Keyboard.JustDown(this.cursors1[2]) || Phaser.Input.Keyboard.JustDown(this.cursors1[3])) {
                this.characters[0] = new Character(this, 1, "palm", false, 200, 270);
                this.players[0].active = true;
                this.numPlayers++;  
            }
        }else {// Si el jugador 1 ya se encuentra activo
            // A para cambiar de personaje
            if(Phaser.Input.Keyboard.JustDown(this.cursors1[1]) && !this.players[0].selected) {
                this.selector1 = (this.selector1-1)%4;
                if (this.selector1 < 0){
                    this.selector1 = 3;
                }
                while(this.charactersSelected[this.selector1]){
                    this.selector1--;
                    if (this.selector1 < 0){
                        this.selector1 = 3;
                    }
                }
                this.changeCharacter(this.characters, 0, this.selector1);
            }
            //D para cambiar de personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors1[3]) && !this.players[0].selected){
                this.selector1 = (this.selector1+1)%4;
                while(this.charactersSelected[this.selector1]){
                    this.selector1++;
                    if (this.selector1 > 3){
                        this.selector1 = 0;
                    }
                }
                this.changeCharacter(this.characters, 0, this.selector1);
            }
            // S para seleccionar personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors1[2]) && !this.charactersSelected[this.selector1]){
                this.charactersSelected[this.selector1] = true;
                this.players[0].selected = true;
            }
            // W para deseleccionar personaje (si ya ha seleccionado alguno)
            else if (Phaser.Input.Keyboard.JustUp(this.cursors1[0]) && this.players[0].selected){
                this.charactersSelected[this.selector1] = false;
                this.players[0].selected = false;
            }
            // W para salir de la partida
            if (Phaser.Input.Keyboard.JustDown(this.cursors1[0]) && !this.players[0].selected){
                this.numPlayers--;
                this.characters[0].destroy();
                this.players[0].active = false;
                this.selector1 = 0;
            }
        }//Fin jugador 1

        // Creación y cambio del personaje del jugador 2
        if (!this.players[1].active){// Si el jugador 2 no se encuentra activo
            // Si se pulsa IJKL, se añade el jugador 2 a la lista de jugadores
            if (Phaser.Input.Keyboard.JustDown(this.cursors2[0]) || Phaser.Input.Keyboard.JustDown(this.cursors2[1]) || Phaser.Input.Keyboard.JustDown(this.cursors2[2]) || Phaser.Input.Keyboard.JustDown(this.cursors2[3])) {
                this.characters[1] = new Character(this, 2, "palm", false, 460, 270);
                this.players[1].active = true;
                this.numPlayers++;
            }
        }else {
            // J para cambiar de personaje
            if(Phaser.Input.Keyboard.JustDown(this.cursors2[1]) && !this.players[1].selected) {
                this.selector2 = (this.selector2-1)%4;
                if (this.selector2 < 0){
                    this.selector2 = 3;
                }
                while(this.charactersSelected[this.selector2]){
                    this.selector2--;
                    if (this.selector2 < 0){
                        this.selector2 = 3;
                    }
                }
                this.changeCharacter(this.characters, 1, this.selector2);
            }
            // L para cambiar de personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors2[3]) && !this.players[1].selected){
                this.selector2 = (this.selector2+1)%4;
                while(this.charactersSelected[this.selector2]){
                    this.selector2++;
                    if (this.selector2 > 3){
                        this.selector2 = 0;
                    }
                }
                this.changeCharacter(this.characters, 1, this.selector2);
            }
            // K para seleccionar personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors2[2]) && !this.charactersSelected[this.selector2]){
                this.charactersSelected[this.selector2] = true;
                this.players[1].selected = true;
            }
            // I para deseleccionar personaje (Si no tiene uno seleccionado)
            else if (Phaser.Input.Keyboard.JustUp(this.cursors2[0]) && this.players[1].selected){
                this.charactersSelected[this.selector2] = false;
                this.players[1].selected = false;
            }
            // I para salir de la partida
            if (Phaser.Input.Keyboard.JustDown(this.cursors2[0]) && !this.players[1].selected){
                this.numPlayers--;
                this.characters[1].destroy();
                this.players[1].active = false;
                this.selector2 = 0;
            }
        }//Fin jugador 2
        
        // Creación y cambio del personaje del jugador 3
        if (!this.players[2].active){ // Si el jugador 3 no se encuentra activo
            // Si se pulsa alguna flecha de dirección se añade el jugador 3 a la lista de personajes
            if (Phaser.Input.Keyboard.JustDown(this.cursors3[0]) || Phaser.Input.Keyboard.JustDown(this.cursors3[1]) || Phaser.Input.Keyboard.JustDown(this.cursors3[2]) || Phaser.Input.Keyboard.JustDown(this.cursors3[3])) {
                this.characters[2] = new Character(this, 3, "palm", false, 735, 270);
                this.players[2].active = true;
                this.numPlayers++;
            }
        }else {
            // LEFT para cambiar de personaje
            if(Phaser.Input.Keyboard.JustDown(this.cursors3[1]) && !this.players[2].selected) {
                this.selector3 = (this.selector3-1)%4;
                if (this.selector3 < 0){
                    this.selector3 = 3;
                }
                while(this.charactersSelected[this.selector3]){
                    this.selector3--;
                    if (this.selector3 < 0){
                        this.selector3 = 3;
                    }
                }
                this.changeCharacter(this.characters, 2, this.selector3);
            }
            // RIGHT para cambiar de personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors3[3]) && !this.players[2].selected){
                this.selector3 = (this.selector3+1)%4;
                while(this.charactersSelected[this.selector3]){
                    this.selector3++;
                    if (this.selector3 > 3){
                        this.selector3 = 0;
                    }
                }
                this.changeCharacter(this.characters, 2, this.selector3);
            }
            // DOWN para seleccionar personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors3[2]) && !this.charactersSelected[this.selector3]){
                this.charactersSelected[this.selector3] = true;
                this.players[2].selected = true;
            }
            // UP para deseleccionar personaje (si no tiene uno seleccionado) 
            else if (Phaser.Input.Keyboard.JustUp(this.cursors3[0]) && this.players[2].selected){
                this.charactersSelected[this.selector3] = false;
                this.players[2].selected = false;
            }
            // UP para salir de la partida
            if (Phaser.Input.Keyboard.JustDown(this.cursors3[0]) && !this.players[2].selected){
                this.numPlayers--;
                this.characters[2].destroy();
                this.players[2].active = false;
                this.selector3 = 0;
            }
        }//Fin jugador 3
        
        // Creación y cambio del personaje del jugador 4
        if (!this.players[3].active){ // Si el jugador 4 no se encuentra activo
            // 8456 en el NUMPAD para añadir al jugador 4 a la lista de personajes
            if (Phaser.Input.Keyboard.JustDown(this.cursors4[0]) || Phaser.Input.Keyboard.JustDown(this.cursors4[1]) || Phaser.Input.Keyboard.JustDown(this.cursors4[2]) || Phaser.Input.Keyboard.JustDown(this.cursors4[3])) {
                this.characters[3] = new Character(this, 4, "palm", false, 990, 270);
                this.players[3].active = true;
                this.numPlayers++;
            }
        }else {
            // NUMPAD_4 para cambiar de personaje
            if(Phaser.Input.Keyboard.JustDown(this.cursors4[1]) && !this.players[3].selected) {
                this.selector4 = (this.selector4-1)%4;
                if (this.selector4 < 0){
                    this.selector4 = 3;
                }
                while(this.charactersSelected[this.selector4]){
                    this.selector4--;
                    if (this.selector4 < 0){
                        this.selector4 = 3;
                    }
                }
                this.changeCharacter(this.characters, 3, this.selector4);
            }
            // NUMPAD_6 para cambiar de personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors4[3]) && !this.players[3].selected){
                this.selector4 = (this.selector4+1)%4;
                while(this.charactersSelected[this.selector4]){
                    this.selector4++;
                    if (this.selector4 > 3){
                        this.selector4 = 0;
                    }
                }
                this.changeCharacter(this.characters, 3, this.selector4);
            }
            // NUMPAD_5 para seleccionar personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors4[2]) && !this.charactersSelected[this.selector4]){
                this.charactersSelected[this.selector4] = true;
                this.players[3].selected = true;
            }
            // NUMPAD_8 para deseleccionar personaje (Si ya tiene uno seleccionado)
            else if (Phaser.Input.Keyboard.JustUp(this.cursors4[0]) && this.players[3].selected){
                this.charactersSelected[this.selector4] = false;
                this.players[3].selected = false;
            }
            // NUMPAD_8 para salir de la partida
            if (Phaser.Input.Keyboard.JustDown(this.cursors4[0]) && !this.players[3].selected){
                this.numPlayers--;
                this.characters[3].destroy();
                this.players[3].active = false;
                this.selector4 = 0;
            }
        }//Fin jugador 4

        // ENTER para cambiar de escena
        if(Phaser.Input.Keyboard.JustDown(this.enterCursor) && this.numPlayers >=2 ){
            this.scene.start("level_1");
        }

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
    }//Fin changeCharacter
}
