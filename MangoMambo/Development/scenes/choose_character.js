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

        this.player1_img;
        this.player2_img;
        this.player3_img;
        this.player4_img;

        this.selector1;
        this.selector2;
        this.selector3;
        this.selector4;

    }

    preload() {
        // Se cargan las imágenes
        this.load.image("background", "../Design/Stages/Backgrounds/choose_player.png");

        this.load.image("palm", "../Design/Characters/Palm/palm_idle_00.png");
        this.load.image("dino", "../Design/Characters/Dino/dino_idle_00.png");
        this.load.image("toucan", "../Design/Characters/Toucan/toucan_idle_00.png");
        this.load.image("lemur", "../Design/Characters/Lemur/lemur_idle_00.png");

        this.players = [ false, false, false, false]; // Jugadores

        this.numPlayers = 0;

        // this.characters = []; // Personajes
        // this.characters[0] = new Character(this, "palm", 0, 0, undefined, [25,42]);
        // this.characters[1] = new Character(this, "dino", 1152/4, 0, undefined, [25,64]);
        // this.characters[2] = new Character(this, "toucan", 1152/2, 0, undefined,[25,20]);
        // this.characters[3] = new Character(this, "lemur", 1152, 0, undefined,[25,42]);

        this.cursors1 = []; // 
        this.cursors1[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors1[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.cursors2 = []; // 
        this.cursors2[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.cursors2[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.cursors3 = []; //
        this.cursors3[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors3[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.cursors4 = []; // 
        this.cursors4[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_8);
        this.cursors4[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_5);

        this.selector1 = 0;
        this.selector2 = 0;
        this.selector3 = 0;
        this.selector4 = 0;
    }

    create() {
        this.add.image(0, 0, "background").setOrigin(0,0);

        this.images = [];
        this.images[0] = "palm";
        this.images[1] = "dino";
        this.images[2] = "toucan";
        this.images[3] = "lemur";
    }

    update() {
        // Creación y cambio del personaje del jugador 1
        if (this.cursors1[0].isDown) {
            if (!this.players[0]){
                this.players[0] = true;
                this.numPlayers++;
                this.player1_img = this.add.image(200, 270, this.images[this.selector1]);
            }else{
                if (this.selector1 < 3){
                    this.selector1++;
                    this.player1_img.destroy();
                    this.player1_img = this.add.image(200, 270, this.images[this.selector1]);
                }else{
                    this.selector1 = 0;
                    this.player1_img.destroy();
                    this.player1_img = this.add.image(200, 270, this.images[this.selector1]);
                }
            }
        }
        // Creación y cambio del personaje del jugador 2
        if (this.cursors2[0].isDown) {
            if (!this.players[1]){
                this.players[1] = true;
                this.numPlayers++;
                this.player2_img = this.add.image(460, 270, this.images[this.selector2]);
            }else{
                if (this.selector2 < 3){
                    this.selector2++;
                    this.player2_img.destroy();
                    this.player2_img = this.add.image(460, 270, this.images[this.selector2]);
                }else{
                    this.selector2 = 0;
                    this.player2_img.destroy();
                    this.player2_img = this.add.image(460, 270, this.images[this.selector2]);
                }
            }

        }
        // Creación y cambio del personaje del jugador 3
        if (this.cursors3[0].isDown) {
            if (!this.players[2]){
                this.players[2] = true;
                this.numPlayers++;
                this.player3_img = this.add.image(735, 270, this.images[this.selector3]);
            }else{
                if (this.selector3 < 3){
                    this.selector3++;
                    this.player3_img.destroy();
                    this.player3_img = this.add.image(735, 270, this.images[this.selector3]);
                }else{
                    this.selector3 = 0;
                    this.player3_img.destroy();
                    this.player3_img = this.add.image(735, 270, this.images[this.selector3]);
                }
            }
        }
        // Creación y cambio del personaje del jugador 4
        if (this.cursors4[0].isDown) {
            if (!this.players[3]){
                this.players[3] = true;
                this.numPlayers++;
                this.player4_img = this.add.image(990, 270, this.images[this.selector4]);
            }else{
                if (this.selector4 < 3){
                    this.selector4++;
                    this.player4_img.destroy();
                    this.player4_img = this.add.image(990, 270, this.images[this.selector4]);
                }else{
                    this.selector4 = 0;
                    this.player2_img.destroy();
                    this.player4_img = this.add.image(990, 270, this.images[this.selector4]);
                }
            }
        }
    }
}