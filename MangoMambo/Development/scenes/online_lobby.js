class OnlineLobby extends Phaser.Scene{
    constructor(){
        super({key: "online_lobby"});
    }// Fin constructor
    init(data){
        this.players = data.players;
        this.myPlayer = data.client;
        this.ip = data.url;
        this.vol = data.volume;
        data = null; 
    }
    preload(){
        // Pantalla de Carga
        var loadingImg = this.add.image(0, 0, "loading_background").setOrigin(0, 0).setDepth(-1);
        var progressBar = this.add.graphics().setDepth(-1);
        var progressBox = this.add.graphics().setDepth(-1);
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(100, 500, 1000, 50);
        var percentText = this.make.text({
            x: 600,
            y: 525,
            text: "0%",
            depth: -1,
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
        // Se carga la imagen de fondo
        this.load.image("lobby_background", "./Design/Stages/Backgrounds/lobby_background.png");
        // Boton de escape
        this.load.image("escape_button", "./Design/Objects/Buttons/escape_button.png");
        // Jugadores
        this.load.image("player1_online", "./Design/Objects/Text/player1_online.png");
        this.load.image("player2_online", "./Design/Objects/Text/player2_online.png");
        this.load.image("player3_online", "./Design/Objects/Text/player3_online.png");
        this.load.image("player4_online", "./Design/Objects/Text/player4_online.png");
        this.playersImg;
        this.load.image("you_G_player", "./Design/Objects/you_G_player.png");
        this.load.image("you_P_player", "./Design/Objects/you_P_player.png");
        this.load.image("you_B_player", "./Design/Objects/you_B_player.png");
        this.load.image("you_Y_player", "./Design/Objects/you_Y_player.png");
        this.myPlayerImg;
        // Imagen de los checks de preparado
        this.load.image("tick", "./Design/Objects/tick.png");
        this.ticks;
        // Teclas
        this.cursors;
        // Estado del servidor
        this.load.image("connection_failed_rock", "./Design/Objects/connection_failed_rock.png");
        this.serverStatusImg;
        this.serverStatus;
        // Chat
        this.textChat;
        this.chat;
    }
    create(){
        // Se crea la imagen de fondo
        this.add.image(0, 0, "lobby_background").setOrigin(0, 0);
        // Boton escape
        this.escapeButton = this.add.image(45, 20, "escape_button");
        // Jugadores
        this.playersImg = [];
        this.playersImg[0] = this.add.image(169.09, 67, "player1_online");
        this.playersImg[0].setAlpha(0);
        this.playersImg[1] = this.add.image(454.08, 67, "player2_online");// Y: 66.06
        this.playersImg[1].setAlpha(0);
        this.playersImg[2] = this.add.image(740.78, 67, "player3_online");// Y: 66.16
        this.playersImg[2].setAlpha(0);
        this.playersImg[3] = this.add.image(1030.02, 67, "player4_online");// Y:66.14
        this.playersImg[3].setAlpha(0);
        // Imagen de los checks de preparado
        this.ticks = [];
        this.ticks[0] = this.add.image(258.50, 66.50, "tick");
        this.ticks[0].setAlpha(0);
        this.ticks[1] = this.add.image(543.50, 66.50, "tick");
        this.ticks[1].setAlpha(0);
        this.ticks[2] = this.add.image(830.50, 66.50, "tick");
        this.ticks[2].setAlpha(0);
        this.ticks[3] = this.add.image(1119.50, 66.50, "tick");
        this.ticks[3].setAlpha(0);
        // Teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // Se añade el cliente a la lista de jugadores
        this.players[this.myPlayer.id] = this.myPlayer;
        switch(this.myPlayer.id){
            case 0:
                this.myPlayerImg = this.add.image(169.50, 81.88, "you_G_player");
                break;
            case 1:
                this.myPlayerImg = this.add.image(454.50, 81.88, "you_P_player");
                break;
            case 2:
                this.myPlayerImg = this.add.image(741.50, 81.88, "you_B_player");
                break;
            case 3:
                this.myPlayerImg = this.add.image(1029.50, 81.88, "you_Y_player");
                break;
        }
        
        /*
        //CHAT
        var x = document.getElementById("TEXTAREA");

        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
        this.formUtil.showNumbers();
        //
        //
        //
        this.formUtil.scaleToGameW("TEXTAREA", .3);
        this.formUtil.placeElementAt(16, 'TEXTAREA', true);
        //
        //
        //
        this.formUtil.scaleToGameW("TEXTAREA", .8);
        this.formUtil.scaleToGameH("TEXTAREA", .5);
        this.formUtil.placeElementAt(60, "TEXTAREA", true, true);
        this.formUtil.addChangeCallback("TEXTAREA", this.textAreaChanged, this);
        //
        //
        //
        */
        
       // Temporizador para comprobar el estado de los jugadores
       this.time.addEvent({ delay: 100, callback: this.checkPlayers, callbackScope: this, repeat: -1});
       // Imagen del estado del servidor
       this.serverStatus = true;
       this.serverStatusImg = this.add.image(600, 300, "connection_failed_rock");
       this.serverStatusImg.setAlpha(0);
       // Texto del chat
       this.textChat = this.make.text({
    	   x: 580,
           y: 524,
           text: "Texto",
           style: {
               fontSize: '25px',
               fontFamily: 'Berlin Sans FB',
               color: '#ffffff',
               align: 'left'
             }
       });
       this.textChat.text = "";
       var text = [];
       var contLines = 0;
       this.input.keyboard.on("keydown", function(event){ 
    	   var that = this.scene;
    	   if(event.keyCode == 8){
    		   if (that.textChat.text.length == 0){
    			   if (contLines > 0){
    				   that.textChat.text = text[contLines-1];
        			   contLines--;
    			   }
    		   }else{
        		   var textDelete = [];
        		   for (var i = 0; i < that.textChat.text.length-1; i++){
        			   textDelete += that.textChat.text[i];
        		   }
        		   that.textChat.text = textDelete;
    		   }
    	   }
    	   else if (event.keyCode == 13 && that.textChat.text.length > 0) {
    		   text[contLines] = that.textChat.text;
    		   contLines = 0;
    		   that.textChat.text = "";
    		   var newMessage = $.ajax({
    			   method: "POST",
    			   url: "http://"+ that.ip +"/mango-mambo/chat/" + that.myPlayer.id,
    	           data: JSON.stringify(text),
    	           processData: false,
    	           headers: {
    	               "Content-Type": "application/json"
    	           }
    		   });
    		   newMessage.done(function(data){
    			   text = [];
    			   console.log(data);
    			   that.chat = data;
    		   });
    		   newMessage.error(function(data){
    			   console.log("Error de conexión");
    			   that.serverStatus = false;
    			   contLines = text.length-1;
    			   that.textChat.text = text[contLines];
    		   });
    	   }
    	   else if (that.textChat.width < 1468){
    		   if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)){
    			   that.textChat.text += event.key;
        	   }
        	   else if(event.keyCode == 32){
        		   that.textChat.text += " ";
        	   }
    	   }
    	   else{
    		   text[contLines] = that.textChat.text;
    		   contLines++;
    		   that.textChat.text = "";
    	   }
       });
    }
    /*
    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("TEXTAREA");
        console.log(text);
    }
    */
    update(){
        // Si el servidor está activo
        if (this.serverStatus){
            this.serverStatusImg.setAlpha(0);
            // Mostrar a los jugadores si entran en el lobby
            for (var i = 0; i < this.players.length; i++){
                if (this.players[i].isConnected && this.players[i].isReady) {
                    this.playersImg[i].setAlpha(1);
                    this.ticks[i].setAlpha(1);
                } else if(this.players[i].isConnected && !this.players[i].isReady){
                    this.playersImg[i].setAlpha(0.6);
                    this.ticks[i].setAlpha(0);
                } else {
                    this.playersImg[i].setAlpha(0);
                    this.ticks[i].setAlpha(0);
                }
            }
            // Si se pulsa el cursor hacia arriba
            if (Phaser.Input.Keyboard.JustDown(this.cursors[2])){
                if (this.players[this.myPlayer.id].isReady){
                    this.ticks[this.myPlayer.id].setAlpha(0);
                    this.myPlayer.isReady = false;
                    this.players[this.myPlayer.id] = this.myPlayer;
                    this.updatePlayer();
                }
            }
            // Si se pulsa el cursor hacia abajo
            if (Phaser.Input.Keyboard.JustDown(this.cursors[3])){
                if (!this.players[this.myPlayer.id].isReady){
                    this.ticks[this.myPlayer.id].setAlpha(1);
                    this.myPlayer.isReady = true;
                    this.players[this.myPlayer.id] = this.myPlayer;
                    this.updatePlayer();
                }
            }
            // Si se pulsa la tecla ESC
            if (Phaser.Input.Keyboard.JustDown(this.cursors[1])) {
            	// Se borra al jugador del servidor y de la lista de jugadores, y se vuelve al menú principal
                this.myPlayer.isReady = false;
                this.myPlayer.isConnected = false;
                this.players[this.myPlayer.id] = this.myPlayer;
                this.updatePlayer();
                this.scene.start("main_menu", { volume: this.vol });
            }// Fin if se pulsa la tecla ESC
        }// Fin if(serverStatus)
        else{ // Si el servidor no está activo
            this.serverStatusImg.setAlpha(1);
            if (Phaser.Input.Keyboard.JustDown(this.cursors[1])) {
                this.scene.start("main_menu", { volume: this.vol });
            }
        }
    }
    // Función que comprueba el estado de los jugadores y lo actualiza
    checkPlayers(){
        var that = this;
        var checkPlayerStatus = $.ajax({
            method: "GET",
            url: "http://"+ this.ip +"/mango-mambo"
        });
        // Si establece conexión con el servidor se actualizan los jugadores
        checkPlayerStatus.done(function(data){
            that.players = data;
            that.players[that.myPlayer.id] = that.myPlayer;
            console.log(that.players);
            that.serverStatus = true;
            that.players[that.myPlayer.id] = that.myPlayer;
            that.updatePlayer();
        });
        // Si no se puede establecer conexión
        checkPlayerStatus.error(function(data){
            console.log("Error de conexión");
            that.serverStatus = false;
        });
        var checkChatStatus = $.ajax({
            method: "GET",
            url: "http://"+ this.ip +"/mango-mambo/chat"
        });
        // Si se establece conexión, se actualiza el chat
        checkChatStatus.done(function(data){
        	that.chat = data;
        	console.log(data);
        });
        // Si falla la conexión
        checkChatStatus.error(function(data){
        	console.log("Error de conexión");
            that.serverStatus = false;
        });
    }
    updatePlayer(){
        var that = this;
        var playerUpdate = $.ajax({
            method: "PUT",
            url: "http://"+ that.ip +"/mango-mambo/" + that.myPlayer.id,
            data: JSON.stringify(that.players[that.myPlayer.id]),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        });
        playerUpdate.done(function(data){
            that.players[data.id] = data;
        });
        playerUpdate.error(function(data){
            console.log("Error de conexión");
            that.serverStatus = false;
        });
    }
}