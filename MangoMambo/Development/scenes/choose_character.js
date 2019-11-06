class ChooseCharacter extends Phaser.Scene {
    constructor(){
        super({key: "choose_character"});
    }//Fin constructor

    init(data){
        this.loop = data.loop;
        this.intro = data.intro;
        this.vol = data.volume;
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
        this.load.on("progress", function(value){
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(110, 510, 980 * value, 30);
        });
        this.load.on("fileprogress", function(file){
            console.log(file.src);
        });
        this.load.on("complete", function(){
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });
        // Se cargan las imágenes
        this.load.image("character_background", "./Design/Stages/Backgrounds/choose_character_background.png");
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
        // Texto e imagenes que aparecen si no te has unido a la partida
        this.load.image("press_g_key", "./Design/Objects/Keypress/press_g_key.png");
        this.load.image("press_p_key", "./Design/Objects/Keypress/press_p_key.png");
        this.load.image("press_b_key", "./Design/Objects/Keypress/press_b_key.png");
        this.load.image("press_y_key", "./Design/Objects/Keypress/press_y_key.png");
        // Ready! para cuando el personaje se selecciona
        this.load.image("ready", "./Design/Objects/Text/ready.png");
        // Boton de escape
        this.load.image("escape_button", "./Design/Objects/Buttons/escape_button.png");
        // Boton de ready para pasar a jugar
        this.load.image("cc_ready_button", "./Design/Objects/Buttons/cc_ready_button.png");
        this.load.image("cc_ready_button_selected", "./Design/Objects/Buttons/cc_ready_button_selected.png");
        //sonido
        this.load.audio("hit", "./Design/Audio/SoundFX/hit.wav");
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
        // Controles de selector jugador 1
        this.cursors1; 
        // Controles de selector jugador 2
        this.cursors2; 
        // Controles de selector jugador 3
        this.cursors3; 
        // Controles de selector jugador 4
        this.cursors4; 
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
        this.add.image(0, 0, "character_background").setOrigin(0,0);
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
        this.gkeys = this.add.image(169, 218, "press_g_key").setDepth(1);
        this.pkeys = this.add.image(457.38, 218, "press_p_key").setDepth(1);
        this.bkeys = this.add.image(746.48, 218, "press_b_key").setDepth(1);
        this.ykeys = this.add.image(1035.23, 218, "press_y_key").setDepth(1);
        // Movimiento
        var tweenKeys = this.tweens.add({
            targets: [this.gkeys, this.pkeys, this.bkeys, this.ykeys],
            scaleX: 0.96,
            scaleY: 0.96,
            y: 220,
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        // Texto ready (seleccionado)
        this.ready1 = this.add.image(171.50, 239.05, "ready").setDepth(1);
        this.ready2 = this.add.image(457.50, 239.05, "ready").setDepth(1);
        this.ready3 = this.add.image(743.50, 239.05, "ready").setDepth(1);
        this.ready4 = this.add.image(1034.50, 239.05, "ready").setDepth(1);
        // Para que no aparezcan de primeras
        this.ready1.alpha = 0;
        this.ready2.alpha = 0;
        this.ready3.alpha = 0;
        this.ready4.alpha = 0;
        // Texto habilidades
        this.player1_hab = this.add.image(167.28, 389.96, "palm_hab");
        this.player2_hab = this.add.image(455, 389.96, "palm_hab");
        this.player3_hab = this.add.image(744.28, 389.96, "palm_hab");
        this.player4_hab = this.add.image(1035.28, 389.96, "palm_hab");
        //Array con habilidades
        this.habilities = [{hab: this.player1_hab, img: "palm_hab"}, 
        {hab: this.player2_hab, img: "dino_hab"}, 
        {hab: this.player3_hab, img: "toufat_hab"}, 
        {hab: this.player4_hab, img: "lemur_hab"}];
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

        this.names = [{name: this.player1_name, img: ["palm_G_name","dino_G_name","toufat_G_name","lemur_G_name"]}, 
        {name: this.player2_name, img: ["palm_P_name","dino_P_name","toufat_P_name","lemur_P_name"]}, 
        {name: this.player3_name, img: ["palm_B_name","dino_B_name","toufat_B_name","lemur_B_name"]}, 
        {name: this.player4_name, img: ["palm_Y_name","dino_Y_name","toufat_Y_name","lemur_Y_name"]}];
        // Jugadores
        this.players = [{active:false, selected: false}, {active:false, selected: false}, 
            {active:false, selected: false}, {active:false, selected: false}]; 
        // Número de jugadores activo
        this.numPlayers = 0;
        // Lista de jugadores
        this.characters = []; 
        this.charactersSelected = [ false, false, false, false];
        // Controles de selección
        // Controles de selector jugador 1
        this.cursors1 = []; 
        this.cursors1[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors1[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors1[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors1[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // Controles de selector jugador 2
        this.cursors2 = []; 
        this.cursors2[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.cursors2[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.cursors2[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.cursors2[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        // Controles de selector jugador 3
        this.cursors3 = []; 
        this.cursors3[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors3[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.cursors3[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors3[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // Controles de selector jugador 4
        this.cursors4 = []; 
        this.cursors4[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT);
        this.cursors4[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);
        this.cursors4[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE);
        this.cursors4[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX);
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
        this.choose_options = this.sound.add("choose_options");
        this.hit = this.sound.add("hit");
        
    }//Fin create

    update() {
        // Creación y cambio del personaje del jugador 1
        if (!this.players[0].active){// Si el jugador 1 no se encuentra activo
            // Si se pulsa la tecla WASD, se añade el jugador 1 a la lista de jugadores
            if (Phaser.Input.Keyboard.JustDown(this.cursors1[0]) || Phaser.Input.Keyboard.JustDown(this.cursors1[1]) || Phaser.Input.Keyboard.JustDown(this.cursors1[2]) || Phaser.Input.Keyboard.JustDown(this.cursors1[3])) {
                this.characters[0] = new Character(this, 1, "palm_choose", false, 163, 224.5);
                this.players[0].active = true;
                this.numPlayers++;
                this.gkeys.alpha = 0;// Desaparecen las teclas
                for (var i = 0; i < this.players.length; i++){
                    if (!this.charactersSelected[i]){
                        this.selectors[0] = i;
                    }
                }
                this.changeCharacter(this.characters, 0, this.selectors[0]);
                this.ChangeText(this.selectors[0], 0);// Que aparezca la habilidad/nombre al empezar a seleccionar
            }
        }else {// Si el jugador 1 ya se encuentra activo
            // A para cambiar de personaje
            if(Phaser.Input.Keyboard.JustDown(this.cursors1[1]) && !this.players[0].selected) {
                this.selectors[0] = (this.selectors[0]-1)%4;
                if (this.selectors[0] < 0){
                    this.selectors[0] = 3;
                }
                while(this.charactersSelected[this.selectors[0]]){
                    this.selectors[0]--;
                    if (this.selectors[0] < 0){
                        this.selectors[0] = 3;
                    }
                }
                this.changeCharacter(this.characters, 0, this.selectors[0]);
            }
            //D para cambiar de personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors1[3]) && !this.players[0].selected){
                this.selectors[0] = (this.selectors[0]+1)%4;
                while(this.charactersSelected[this.selectors[0]]){
                    this.selectors[0]++;
                    if (this.selectors[0] > 3){
                        this.selectors[0] = 0;
                    }
                }
                this.changeCharacter(this.characters, 0, this.selectors[0]);
            }
            // S para seleccionar personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors1[2]) && !this.charactersSelected[this.selectors[0]]){
                this.charactersSelected[this.selectors[0]] = true;
                this.players[0].selected = true;
                this.ready1.alpha = 1;// Personaje seleccionado, preparado para jugar
                this.readyPlayers++;
                this.hit.play({
                    volume: this.vol
                });
            }
            // W para deseleccionar personaje (si ya ha seleccionado alguno)
            else if (Phaser.Input.Keyboard.JustUp(this.cursors1[0]) && this.players[0].selected){
                this.charactersSelected[this.selectors[0]] = false;
                this.players[0].selected = false;
                this.ready1.alpha = 0;
                this.readyPlayers--;
            }
            // W para salir de la partida
            if (Phaser.Input.Keyboard.JustDown(this.cursors1[0]) && !this.players[0].selected){
                this.numPlayers--;
                this.characters[0].destroy();
                this.players[0].active = false;
                this.selectors[0] = 0;
                this.habilities[0].hab.alpha = 0;// Ocultar habilidad
                this.names[0].name.alpha = 0;// Ocultar nombre
                this.gkeys.alpha = 1;// Aparecen las teclas
            }
        }// Fin jugador 1
        // Creación y cambio del personaje del jugador 2
        if (!this.players[1].active){// Si el jugador 2 no se encuentra activo
            // Si se pulsa IJKL, se añade el jugador 2 a la lista de jugadores
            if (Phaser.Input.Keyboard.JustDown(this.cursors2[0]) || Phaser.Input.Keyboard.JustDown(this.cursors2[1]) || Phaser.Input.Keyboard.JustDown(this.cursors2[2]) || Phaser.Input.Keyboard.JustDown(this.cursors2[3])) {
                this.characters[1] = new Character(this, 2, "palm_choose", false, 453, 224.5);
                this.players[1].active = true;
                this.numPlayers++;
                this.pkeys.alpha = 0;// Desaparecen las teclas
                for (var i = 0; i < this.players.length; i++){
                    if (!this.charactersSelected[i]){
                        this.selectors[1] = i;
                    }
                }
                this.changeCharacter(this.characters, 1, this.selectors[1]);
                this.ChangeText(this.selectors[1], 1);// Que aparezca la habilidad/nombre al empezar a seleccionar
            }
        }else {
            // J para cambiar de personaje
            if(Phaser.Input.Keyboard.JustDown(this.cursors2[1]) && !this.players[1].selected) {
                this.selectors[1] = (this.selectors[1]-1)%4;
                if (this.selectors[1] < 0){
                    this.selectors[1] = 3;
                }
                while(this.charactersSelected[this.selectors[1]]){
                    this.selectors[1]--;
                    if (this.selectors[1] < 0){
                        this.selectors[1] = 3;
                    }
                }
                this.changeCharacter(this.characters, 1, this.selectors[1]);
            }
            // L para cambiar de personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors2[3]) && !this.players[1].selected){
                this.selectors[1] = (this.selectors[1]+1)%4;
                while(this.charactersSelected[this.selectors[1]]){
                    this.selectors[1]++;
                    if (this.selectors[1] > 3){
                        this.selectors[1] = 0;
                    }
                }
                this.changeCharacter(this.characters, 1, this.selectors[1]);
            }
            // K para seleccionar personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors2[2]) && !this.charactersSelected[this.selectors[1]]){
                this.charactersSelected[this.selectors[1]] = true;
                this.players[1].selected = true;
                this.ready2.alpha = 1;// Personaje seleccionado, preparado para jugar
                this.readyPlayers++;
                this.hit.play({
                    volume: this.vol
                });
                
            }
            // I para deseleccionar personaje (Si no tiene uno seleccionado)
            else if (Phaser.Input.Keyboard.JustUp(this.cursors2[0]) && this.players[1].selected){
                this.charactersSelected[this.selectors[1]] = false;
                this.players[1].selected = false;
                this.ready2.alpha = 0;
                this.readyPlayers--;
            }
            // I para salir de la partida
            if (Phaser.Input.Keyboard.JustDown(this.cursors2[0]) && !this.players[1].selected){
                this.numPlayers--;
                this.characters[1].destroy();
                this.players[1].active = false;
                this.selectors[1] = 0;
                this.habilities[1].hab.alpha = 0; // Ocultar habilidad
                this.names[1].name.alpha = 0; // Ocultar nombre
                this.pkeys.alpha = 1;// Aparecen las teclas
            }
        }//Fin jugador 2
        // Creación y cambio del personaje del jugador 3
        if (!this.players[2].active){ // Si el jugador 3 no se encuentra activo
            // Si se pulsa alguna flecha de dirección se añade el jugador 3 a la lista de personajes
            if (Phaser.Input.Keyboard.JustDown(this.cursors3[0]) || Phaser.Input.Keyboard.JustDown(this.cursors3[1]) || Phaser.Input.Keyboard.JustDown(this.cursors3[2]) || Phaser.Input.Keyboard.JustDown(this.cursors3[3])) {
                this.characters[2] = new Character(this, 3, "palm_choose", false, 740.50, 224.5);
                this.players[2].active = true;
                this.numPlayers++;
                for (var i = 0; i < this.players.length; i++){
                    if (!this.charactersSelected[i]){
                        this.selectors[2] = i;
                    }
                }
                this.changeCharacter(this.characters, 2, this.selectors[2]);
                this.ChangeText(this.selectors[2], 2);// Que aparezca la habilidad/nombre al empezar a seleccionar
                this.bkeys.alpha = 0;// Desaparecen las teclas
            }
        }else {
            // LEFT para cambiar de personaje
            if(Phaser.Input.Keyboard.JustDown(this.cursors3[1]) && !this.players[2].selected) {
                this.selectors[2] = (this.selectors[2]-1)%4;
                if (this.selectors[2] < 0){
                    this.selectors[2] = 3;
                }
                while(this.charactersSelected[this.selectors[2]]){
                    this.selectors[2]--;
                    if (this.selectors[2] < 0){
                        this.selectors[2] = 3;
                    }
                }
                this.changeCharacter(this.characters, 2, this.selectors[2]);
            }
            // RIGHT para cambiar de personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors3[3]) && !this.players[2].selected){
                this.selectors[2] = (this.selectors[2]+1)%4;
                while(this.charactersSelected[this.selectors[2]]){
                    this.selectors[2]++;
                    if (this.selectors[2] > 3){
                        this.selectors[2] = 0;
                    }
                }
                this.changeCharacter(this.characters, 2, this.selectors[2]);
            }
            // DOWN para seleccionar personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors3[2]) && !this.charactersSelected[this.selectors[2]]){
                this.charactersSelected[this.selectors[2]] = true;
                this.players[2].selected = true;
                this.ready3.alpha = 1;// Personaje seleccionado, preparado para jugar
                this.readyPlayers++;
                this.hit.play({
                    volume: this.vol
                });
            }
            // UP para deseleccionar personaje (si no tiene uno seleccionado) 
            else if (Phaser.Input.Keyboard.JustUp(this.cursors3[0]) && this.players[2].selected){
                this.charactersSelected[this.selectors[2]] = false;
                this.players[2].selected = false;
                this.ready3.alpha = 0;
                this.readyPlayers--;
            }
            // UP para salir de la partida
            if (Phaser.Input.Keyboard.JustDown(this.cursors3[0]) && !this.players[2].selected){
                this.numPlayers--;
                this.characters[2].destroy();
                this.players[2].active = false;
                this.selectors[2] = 0;
                this.habilities[2].hab.alpha = 0;// Ocultar habilidad
                this.names[2].name.alpha = 0;// Ocultar nombre
                this.bkeys.alpha = 1;// Aparecen las teclas
            }
        }//Fin jugador 3
        // Creación y cambio del personaje del jugador 4
        if (!this.players[3].active){ // Si el jugador 4 no se encuentra activo
            // 8456 en el NUMPAD para añadir al jugador 4 a la lista de personajes
            if (Phaser.Input.Keyboard.JustDown(this.cursors4[0]) || Phaser.Input.Keyboard.JustDown(this.cursors4[1]) || Phaser.Input.Keyboard.JustDown(this.cursors4[2]) || Phaser.Input.Keyboard.JustDown(this.cursors4[3])) {
                this.characters[3] = new Character(this, 4, "palm_choose", false, 1022, 224.5);
                this.players[3].active = true;
                this.numPlayers++;
                for (var i = 0; i < this.players.length; i++){
                    if (!this.charactersSelected[i]){
                        this.selectors[3] = i;
                    }
                }
                this.changeCharacter(this.characters, 3, this.selectors[3]);
                this.ChangeText(this.selectors[3], 3);// Que aparezca la habilidad/nombre al empezar a seleccionar
                this.ykeys.alpha = 0;// Desaparecen las teclas
            }
        }else {
            // NUMPAD_4 para cambiar de personaje
            if(Phaser.Input.Keyboard.JustDown(this.cursors4[1]) && !this.players[3].selected) {
                this.selectors[3] = (this.selectors[3]-1)%4;
                if (this.selectors[3] < 0){
                    this.selectors[3] = 3;
                }
                while(this.charactersSelected[this.selectors[3]]){
                    this.selectors[3]--;
                    if (this.selectors[3] < 0){
                        this.selectors[3] = 3;
                    }
                }
                this.changeCharacter(this.characters, 3, this.selectors[3]);
            }
            // NUMPAD_6 para cambiar de personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors4[3]) && !this.players[3].selected){
                this.selectors[3] = (this.selectors[3]+1)%4;
                while(this.charactersSelected[this.selectors[3]]){
                    this.selectors[3]++;
                    if (this.selectors[3] > 3){
                        this.selectors[3] = 0;
                    }
                }
                this.changeCharacter(this.characters, 3, this.selectors[3]);
            }
            // NUMPAD_5 para seleccionar personaje
            else if (Phaser.Input.Keyboard.JustDown(this.cursors4[2]) && !this.charactersSelected[this.selectors[3]]){
                this.charactersSelected[this.selectors[3]] = true;
                this.players[3].selected = true;
                this.ready4.alpha = 1;// Personaje seleccionado, preparado para jugar
                this.readyPlayers++;
                this.hit.play({
                    volume: this.vol
                });
            }
            // NUMPAD_8 para deseleccionar personaje (Si ya tiene uno seleccionado)
            else if (Phaser.Input.Keyboard.JustUp(this.cursors4[0]) && this.players[3].selected){
                this.charactersSelected[this.selectors[3]] = false;
                this.players[3].selected = false;
                this.ready4.alpha = 0;
                this.readyPlayers--;
            }
            // NUMPAD_8 para salir de la partida
            if (Phaser.Input.Keyboard.JustDown(this.cursors4[0]) && !this.players[3].selected){
                this.numPlayers--;
                this.characters[3].destroy();
                this.players[3].active = false;
                this.selectors[3] = 0;
                this.habilities[3].hab.alpha = 0;// Ocultar habilidad
                this.names[3].name.alpha = 0;// Ocultar nombre
                this.ykeys.alpha = 1;// Aparecen las teclas
            }
        }//Fin jugador 4
        // ENTER para cambiar de escena
        if (Phaser.Input.Keyboard.JustDown(this.enterCursor) && this.readyPlayers >= 2) {
            if (this.readyPlayers >= 2) { // Si hay más de dos personajes seleccionados
                for (var i = 0; i < this.characters.length; i++){
                    if (!this.players[i].selected){
                        this.players.splice(i,1);
                        this.characters.splice(i,1);
                        i--;
                    }
                }
                this.scene.start("how_to_play", {characters: this.characters, volume: this.vol});
                // Se para la música
                this.loop.stop();
                this.intro.stop();
            }
        }  
        console.log("Ready" + this.readyPlayers);
        // Cuando haya más de 2 jugadores seleccionados se muestra que ya se puede jugar
        if (this.readyPlayers >= 2) {
            this.readyButton.alpha = 0;
            this.readySelectedButton.alpha = 1;
        }else{
            this.readyButton.alpha = 1;
            this.readySelectedButton.alpha = 0;
        }
        // ESCAPE para salir al menú principal
        if (Phaser.Input.Keyboard.JustDown(this.escapeCursor)){
            this.scene.start("main_menu", {volume: this.vol});
            this.choose_options.play({
                volume: this.vol
            });
            // Se para la música
            this.loop.stop();
            this.intro.stop();
        } 
    }// Fin Update

    changeCharacter(charactersArray, characterid, selector, names){
        switch(selector){
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

    ChangeText(selector, characterid){
        var habilityAux = this.add.image(this.habilities[characterid].hab.x, this.habilities[characterid].hab.y, this.habilities[selector].img);
        this.habilities[characterid].hab.destroy();
        this.habilities[characterid].hab = habilityAux;

        var nameAux = this.add.image(this.names[characterid].name.x, this.names[characterid].name.y, this.names[characterid].img[selector]);
        this.names[characterid].name.destroy();
        this.names[characterid].name = nameAux;
    }// Fin ChangeText
}