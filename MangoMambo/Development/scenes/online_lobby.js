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
        // Teclas
        this.cursors;
    }
    create(){
        // Se crea la imagen de fondo
        this.add.image(0, 0, "lobby_background").setOrigin(0, 0);
        // Teclas
        this.cursors = [];
        this.cursors[0] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors[1] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.cursors[2] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors[3] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // Se añade el cliente a la lista de jugadores
        this.players[this.myPlayer.id] = this.myPlayer;
        // Temporizador para comprobar el estado de los jugadores
        //this.time.addEvent({ delay: 5000, callback: this.checkPlayers, callbackScope: this, repeat: -1});
    }
    update(){
        // Si se pulsa la tecla ESC
        if (Phaser.Input.Keyboard.JustDown(this.cursors[1])){
            var that = this;
            // Se borra al jugador del servidor y de la lista de jugadores, y se vuelve al menú principal
            $.ajax({
                method: "DELETE",
                url: "http://"+ this.ip +"/mango-mambo/" + this.myPlayer.id
            }).done(function(data){
                that.players[data.id] = null;
                that.scene.start("main_menu", {volume: this.vol});
            });
        }
    }
    // Función que comprueba el estado de los jugadores y lo actualiza
    /*checkPlayers(){
        var that = this;
        $.ajax({
            method: "GET",
            url: "http://"+ this.ip +"/mango-mambo"
        }).done(function(data){
            that.players = data;
            console.log(that.players);
        });
    }*/
}