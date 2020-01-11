class WSChooseCharacter extends Phaser.Scene {
    constructor() {
        super({ key: "ws_choose_character" });
    }//Fin constructor

    init(data) {
        this.vol = data.volume;
        this.myPlayer = data.myPlayer;
        this.connection = data.connection;
        data = null;
    }

    preload() {
        // Pantalla de Carga
        var loadingImg = this.add.image(0, 0, "loading_background").setOrigin(0, 0);
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(100, 500, 1000, 50);
        var percentText = this.make.text({
            x: 600,
            y: 525,
            text: "0%",
            style: {
                fontSize: '25px',
                fontFamily: 'Berlin Sans FB',
                fontStyle: 'bold',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        this.load.on("progress", function (value) {
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(110, 510, 980 * value, 30);
        });
        this.load.on("complete", function () {
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });
        // Se cargan las imágenes
        this.load.image("character_background", "./Design/Stages/Backgrounds/ws_choose_character_background.png");
        // Imagenes de los personajes
        this.load.image("palm_choose", "./Design/Characters/Palm/palm_choose.png");
        this.load.image("dino_choose", "./Design/Characters/Dino/dino_choose.png");
        this.load.image("toufat_choose", "./Design/Characters/Toucan/toufat_choose.png");
        this.load.image("lemur_choose", "./Design/Characters/Lemur/lemur_choose.png");
        // Nombre de los personajes
        // Verde
        this.load.image("palm_G_name", "./Design/Objects/Text/palm_G_name.png");
        this.load.image("dino_G_name", "./Design/Objects/Text/dino_G_name.png");
        this.load.image("toufat_G_name", "./Design/Objects/Text/toufat_G_name.png");
        this.load.image("lemur_G_name", "./Design/Objects/Text/lemur_G_name.png");
        // Rosa
        this.load.image("palm_P_name", "./Design/Objects/Text/palm_P_name.png");
        this.load.image("dino_P_name", "./Design/Objects/Text/dino_P_name.png");
        this.load.image("toufat_P_name", "./Design/Objects/Text/toufat_P_name.png");
        this.load.image("lemur_P_name", "./Design/Objects/Text/lemur_P_name.png");
        // Azul
        this.load.image("palm_B_name", "./Design/Objects/Text/palm_B_name.png");
        this.load.image("dino_B_name", "./Design/Objects/Text/dino_B_name.png");
        this.load.image("toufat_B_name", "./Design/Objects/Text/toufat_B_name.png");
        this.load.image("lemur_B_name", "./Design/Objects/Text/lemur_B_name.png");
        // Amarillo
        this.load.image("palm_Y_name", "./Design/Objects/Text/palm_Y_name.png");
        this.load.image("dino_Y_name", "./Design/Objects/Text/dino_Y_name.png");
        this.load.image("toufat_Y_name", "./Design/Objects/Text/toufat_Y_name.png");
        this.load.image("lemur_Y_name", "./Design/Objects/Text/lemur_Y_name.png");
        // Descripción habilidades de los personajes
        this.load.image("palm_hab", "./Design/Objects/Text/palm_hab.png");
        this.load.image("dino_hab", "./Design/Objects/Text/dino_hab.png");
        this.load.image("toufat_hab", "./Design/Objects/Text/toufat_hab.png");
        this.load.image("lemur_hab", "./Design/Objects/Text/lemur_hab.png");
        // Texto e imagene que aparece si no te has unido a la partida
        this.load.image("press_key", "./Design/Objects/Keypress/ws_press_key.png");
        // Ready! para cuando el personaje se selecciona
        this.load.image("ready", "./Design/Objects/Text/ready.png");
        // Boton de escape
        this.load.image("escape_button", "./Design/Objects/Buttons/escape_button.png");
        // Boton de ready para pasar a jugar
        this.load.image("cc_ready_button", "./Design/Objects/Buttons/cc_ready_button.png");
        this.load.image("cc_ready_button_selected", "./Design/Objects/Buttons/cc_ready_button_selected.png");
        //sonido
        this.load.audio("menu_begining", "./Design/Audio/MenuSong/menu_begining_with_edit.wav");
        this.load.audio("menu_loop", "./Design/Audio/MenuSong/menu_with_edit.wav");
        this.intro;
        this.loop;
        this.load.audio("hit", "./Design/Audio/SoundFX/hit.wav");
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        // Arrays para los textos
        this.names;
        this.habilities;
        // Jugadores
        this.players;
        // Número de jugadores activo
        this.numPlayers;
        // Lista de jugadores
        this.characters;
        this.charactersSelected;
        // Controles de selección
        this.cursors;
        // ENTER
        this.enterCursor;
        // ESCAPE
        this.escapeCursor;
        // Contador de personajes seleccionados
        this.readyPlayers;
        // Ready
        this.readyButton;
        this.readySelectedButton;
        // Selector para cada jugador
        this.selectors;
        // Efectos de Sonido
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        this.choose_options;
        this.hit;
    }//Fin preload

    create() {
        this.cameras.main.fadeIn(500);
        // Fondo
        this.add.image(0, 0, "character_background").setOrigin(0, 0);
        // Ready botón
        this.readyButton = this.add.image(1135.50, 568.50, "cc_ready_button").setDepth(1);
        this.readySelectedButton = this.add.image(1135.50, 568.50, "cc_ready_button_selected").setDepth(2);
        this.readySelectedButton.alpha = 0;
        // Movimiento
        var tweenReadySelected = this.tweens.add({
            targets: [this.readySelectedButton],
            scaleX: 0.95,
            scaleY: 0.95,
            ease: 'Sine.easeInOut',
            duration: 900,
            yoyo: true,
            repeat: -1
        });
        // Boton escape
        this.escapeButton = this.add.image(45, 20, "escape_button");
        // Texto e imagenes que aparecen si no te has unido a la partida
        this.keys = [];
        switch (this.myPlayer.id) {
            case 0:
                this.keys[0] = this.add.image(169, 218, "press_key").setDepth(1);
                this.keys[0].tint = 0x0eff00;
                this.keys[0].alpha = 1;
                this.keys[1] = this.add.image(457.38, 218, "press_key").setDepth(1);
                this.keys[1].alpha = 0;
                this.keys[2] = this.add.image(746.48, 218, "press_key").setDepth(1);
                this.keys[2].alpha = 0;
                this.keys[3] = this.add.image(1035.07, 218, "press_key").setDepth(1);
                this.keys[3].alpha = 0;
                break;
            case 1:
                this.keys[0] = this.add.image(169, 218, "press_key").setDepth(1);
                this.keys[0].alpha = 0;
                this.keys[1] = this.add.image(457.38, 218, "press_key").setDepth(1);
                this.keys[1].tint = 0xff00e9;
                this.keys[1].alpha = 1;
                this.keys[2] = this.add.image(746.48, 218, "press_key").setDepth(1);
                this.keys[2].alpha = 0;
                this.keys[3] = this.add.image(1035.07, 218, "press_key").setDepth(1);
                this.keys[3].alpha = 0;
                break;
            case 2:
                this.keys[0] = this.add.image(169, 218, "press_key").setDepth(1);
                this.keys[0].alpha = 0;
                this.keys[1] = this.add.image(457.38, 218, "press_key").setDepth(1);
                this.keys[1].alpha = 0;
                this.keys[2] = this.add.image(746.48, 218, "press_key").setDepth(1);
                this.keys[2].tint = 0x00fff0;
                this.keys[2].alpha = 1;
                this.keys[3] = this.add.image(1035.07, 218, "press_key").setDepth(1);
                this.keys[3].alpha = 0;
                break;
            case 3:
                this.keys[0] = this.add.image(169, 218, "press_key").setDepth(1);
                this.keys[0].alpha = 0;
                this.keys[1] = this.add.image(457.38, 218, "press_key").setDepth(1);
                this.keys[1].alpha = 0;
                this.keys[2] = this.add.image(746.48, 218, "press_key").setDepth(1);
                this.keys[2].alpha = 0;
                this.keys[3] = this.add.image(1035.07, 218, "press_key").setDepth(1);
                this.keys[3].tint = 0xffff00;
                this.keys[3].alpha = 1;
                break;
        }
        // Movimiento   
        var tweenKeys = this.tweens.add({
            targets: [this.keys[0], this.keys[1], this.keys[2], this.keys[3]],
            scaleX: 0.96,
            scaleY: 0.96,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        // Texto ready (seleccionado)
        this.ready = [];
        this.ready[0] = this.add.image(171.50, 239.05, "ready").setDepth(1);
        this.ready[1] = this.add.image(457.50, 239.05, "ready").setDepth(1);
        this.ready[2] = this.add.image(743.50, 239.05, "ready").setDepth(1);
        this.ready[3] = this.add.image(1034.50, 239.05, "ready").setDepth(1);
        // Para que no aparezcan de primeras
        this.ready[0].alpha = 0;
        this.ready[1].alpha = 0;
        this.ready[2].alpha = 0;
        this.ready[3].alpha = 0;
        // Texto habilidades
        this.player1_hab = this.add.image(167.28, 389.96, "palm_hab");
        this.player2_hab = this.add.image(455, 389.96, "palm_hab");
        this.player3_hab = this.add.image(744.28, 389.96, "palm_hab");
        this.player4_hab = this.add.image(1035.28, 389.96, "palm_hab");
        //Array con habilidades
        this.habilities = [{ hab: this.player1_hab, img: "palm_hab" },
        { hab: this.player2_hab, img: "dino_hab" },
        { hab: this.player3_hab, img: "toufat_hab" },
        { hab: this.player4_hab, img: "lemur_hab" }];
        // Para que no aparezcan de primeras
        this.player1_hab.alpha = 0;
        this.player2_hab.alpha = 0;
        this.player3_hab.alpha = 0;
        this.player4_hab.alpha = 0;
        // Texto nombres
        this.player1_name = this.add.image(167.28, 63, "palm_G_name");
        this.player2_name = this.add.image(459.28, 63, "palm_P_name");
        this.player3_name = this.add.image(744.28, 63, "palm_B_name");
        this.player4_name = this.add.image(1035.28, 63, "palm_Y_name");
        // Para que no aparezcan de primeras
        this.player1_name.alpha = 0;
        this.player2_name.alpha = 0;
        this.player3_name.alpha = 0;
        this.player4_name.alpha = 0;

        this.names = [{ name: this.player1_name, img: ["palm_G_name", "dino_G_name", "toufat_G_name", "lemur_G_name"] },
        { name: this.player2_name, img: ["palm_P_name", "dino_P_name", "toufat_P_name", "lemur_P_name"] },
        { name: this.player3_name, img: ["palm_B_name", "dino_B_name", "toufat_B_name", "lemur_B_name"] },
        { name: this.player4_name, img: ["palm_Y_name", "dino_Y_name", "toufat_Y_name", "lemur_Y_name"] }];
        // Jugadores
        this.players = [{ active: false, selected: false }, { active: false, selected: false },
        { active: false, selected: false }, { active: false, selected: false }];
        // Número de jugadores activo
        this.numPlayers = 0;
        // Lista de jugadores
        this.characters = [];
        this.charactersSelected = [false, false, false, false];
        // Controles de selección
        // Controles de selector jugador 1
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // ENTER
        this.enterCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // ESCAPE
        this.escapeCursor = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // Contador de personajes seleccionados
        this.readyPlayers = 0;
        // Selector para cada jugador
        this.selectors = [0, 0, 0, 0];
        // Se crea la música
        this.sound.pauseOnBlur = false;
        this.intro = this.sound.add("menu_begining");
        this.intro.play({
            volume: this.vol
        });
        this.loop = this.sound.add("menu_loop");
        this.loop.play({
            loop: true,
            delay: 2.02,
            volume: this.vol
        });
        this.choose_options = this.sound.add("choose_options");
        this.change_options = this.sound.add("change_options");
        this.hit = this.sound.add("hit");

        this.input.keyboard.on("keydown", function (event) {
            var that = this.scene;
            if (event.key == 'a' || event.key == 'A' || event.key == 'w' || event.key == 'W'
                || event.key == 'd' || event.key == 'D' || event.key == 's' || event.key == 'S') {
                that.change(that.myPlayer.id, event.key);
            }
        });
    }//Fin create

    update() {
        // ENTER para cambiar de escena
        if (Phaser.Input.Keyboard.JustDown(this.enterCursor) && this.readyPlayers >= 2) {
            if (this.readyPlayers >= 2) { // Si hay más de dos personajes seleccionados
                for (var i = 0; i < this.characters.length; i++) {
                    if (!this.players[i].selected) {
                        this.players.splice(i, 1);
                        this.characters.splice(i, 1);
                        i--;
                    }
                }
                this.scene.start("ws_how_to_play", { characters: this.characters, volume: this.vol });
                // Se para la música
                this.loop.stop();
                this.intro.stop();
                this.choose_options.play({
                    volume: this.vol
                });
            }
        }
        // Cuando haya más de 2 jugadores seleccionados se muestra que ya se puede jugar
        if (this.readyPlayers >= 2) {
            this.readyButton.alpha = 0;
            this.readySelectedButton.alpha = 1;
        } else {
            this.readyButton.alpha = 1;
            this.readySelectedButton.alpha = 0;
        }
        // ESCAPE para salir al menú principal
        if (Phaser.Input.Keyboard.JustDown(this.escapeCursor)) {
            this.scene.start("main_menu", { volume: this.vol });
            this.choose_options.play({
                volume: this.vol
            });
            // Se para la música
            this.loop.stop();
            this.intro.stop();
        }
    }// Fin Update

    changeCharacter(charactersArray, characterid, selector, names) {
        switch (selector) {
            case 0:
                this.characterAux = new Character(this, characterid + 1, "palm_choose", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
            case 1:
                this.characterAux = new Character(this, characterid + 1, "dino_choose", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
            case 2:
                this.characterAux = new Character(this, characterid + 1, "toufat_choose", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
            case 3:
                this.characterAux = new Character(this, characterid + 1, "lemur_choose", false, charactersArray[characterid].x, charactersArray[characterid].y);
                this.characters[characterid].destroy();
                this.characters[characterid] = this.characterAux;
                break;
        }

        // Cambia el texto explicativo de la habilidad y el nombre en función del personaje y el jugador
        this.ChangeText(selector, characterid);
    }// Fin changeCharacter

    ChangeText(selector, characterid) {
        var habilityAux = this.add.image(this.habilities[characterid].hab.x, this.habilities[characterid].hab.y, this.habilities[selector].img);
        this.habilities[characterid].hab.destroy();
        this.habilities[characterid].hab = habilityAux;

        var nameAux = this.add.image(this.names[characterid].name.x, this.names[characterid].name.y, this.names[characterid].img[selector]);
        this.names[characterid].name.destroy();
        this.names[characterid].name = nameAux;
    }// Fin ChangeText

    change(id, keypressed) {
        var posX;
        var posY;
        switch (id) {
            case 0:
                posX = 163;
                posY = 224.5;
                break;
            case 1:
                posX = 453;
                posY = 224.5;
                break;
            case 2:
                posX = 740.50;
                posY = 224.5;
                break;
            case 3:
                posX = 1022;
                posY = 224.5;
                break;
        }
        if (!this.players[id].active) {// Si el jugador id no se encuentra activo
            this.characters[id] = new Character(this, id + 1, "palm_choose", false, posX, posY);
            this.players[id].active = true;
            this.numPlayers++;
            this.keys[0].alpha = 0;// Desaparecen las teclas
            for (var i = 0; i < this.players.length; i++) {
                if (!this.charactersSelected[i]) {
                    this.selectors[id] = i;
                }
            }
            this.changeCharacter(this.characters, id, this.selectors[id]);
            this.ChangeText(this.selectors[id], id);// Que aparezca la habilidad/nombre al empezar a seleccionar
            this.change_options.play({
                volume: this.vol
            });
        } else {
            switch (keypressed) {
                case 'a':
                case 'A':
                    if (!this.players[id].selected) {
                        this.selectors[id] = (this.selectors[id] - 1) % 4;
                        if (this.selectors[id] < 0) {
                            this.selectors[id] = 3;
                        }
                        while (this.charactersSelected[this.selectors[id]]) {
                            this.selectors[id]--;
                            if (this.selectors[id] < 0) {
                                this.selectors[id] = 3;
                            }
                        }
                        this.changeCharacter(this.characters, id, this.selectors[id]);
                        this.change_options.play({
                            volume: this.vol
                        });
                    }
                    break;
                case 'd':
                case 'D':
                    if (!this.players[id].selected) {
                        this.selectors[id] = (this.selectors[id] + 1) % 4;
                        while (this.charactersSelected[this.selectors[id]]) {
                            this.selectors[id]++;
                            if (this.selectors[id] > 3) {
                                this.selectors[id] = 0;
                            }
                        }
                        this.changeCharacter(this.characters, id, this.selectors[id]);
                        this.change_options.play({
                            volume: this.vol
                        });
                    }
                    break;
                case 's':
                case 'S':
                    if (!this.charactersSelected[this.selectors[id]]) {
                        this.charactersSelected[this.selectors[id]] = true;
                        this.players[id].selected = true;
                        this.ready[id].alpha = 1;// Personaje seleccionado, preparado para jugar
                        this.readyPlayers++;
                        this.hit.play({
                            volume: this.vol
                        });
                    }
                    break;
                case 'w':
                case 'W':
                    if (this.players[id].selected) {
                        this.charactersSelected[this.selectors[id]] = false;
                        this.players[id].selected = false;
                        this.ready[id].alpha = 0;
                        this.readyPlayers--;
                        this.change_options.play({
                            volume: this.vol
                        });
                    } else {
                        this.numPlayers--;
                        this.characters[id].destroy();
                        this.players[id].active = false;
                        this.selectors[id] = 0;
                        this.habilities[id].hab.alpha = 0;// Ocultar habilidad
                        this.names[id].name.alpha = 0;// Ocultar nombre
                        if (id == this.myPlayer.id) {
                            this.keys[id].alpha = 1;// Aparecen las teclas
                        }
                        this.change_options.play({
                            volume: this.vol
                        });
                    }
                    break;
            }
        }
    }
}
