class Connecting extends Phaser.Scene{
    constructor(){
        super({key: "connecting"})
    }

    init(data){
        this.vol = data.volume;
        data = null; 
    }
    preload(){
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
            console.log("Cargado: " + value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(110, 510, 980 * value, 30);
        });
        this.load.on("complete", function(){
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
        });
        // Se carga la imagen del icono de conectar
        this.load.image("connecting_icon", "./Design/Objects/connecting_icon.png");
        this.load.image("connecting_rock", "./Design/Objects/connecting_rock.png");

        this.connecting_rock;
        this.connectingIcon;
    }
    create(){
        this.connecting_rock = this.add.image(600,300,"connecting_rock");
        this.connectingIcon = this.add.image(600,300, "connecting_icon");
        var tweenConnecting = this.tweens.add({
            targets: this.connectingIcon,
            angle: 360,
            duration: 2000,
            repeat: -1
        });
        /**
        $.ajax({
            method: "GET",
            url: "http://10.10.106.34:8080/mango-mambo"
        }).done(function(data){
            console.log(data);
        });
        /**/
    }
    update(){

    }
}