class SelectMap extends Phaser.Scene {
    constructor(){
        super({key: "select_map"});
    }// Fin constructor

    init(data){
        this.characters = data.characters;
        this.vol = data.volume;
        data = null; 
    }// Fin init

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
        this.load.on("complete", function(){
            console.log("Complete");
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            loadingImg.destroy();
        });

        // Cargar la imagen de fondo
        this.load.image("select_map_background", "./Design/Stages/Backgrounds/select_map_background.png");
        // Botones seleccionados
        this.load.image("select_map_button_left", "./Design/Objects/Buttons/change_map_button_left.png");
        this.load.image("select_map_button_right", "./Design/Objects/Buttons/change_map_button_right.png");
        // Imágenes de los mapas
        this.load.image("tiki_jungle_map", "./Design/Objects/tiki_jungle_map.png");
        this.load.image("neon_caves_map", "./Design/Objects/neon_caves_map.png");
        // Imágenes de los iconos de los mapas
        this.load.image("tiki_jungle_icon", "./Design/Objects/tiki_jungle_icon.png");
        this.load.image("neon_caves_icon", "./Design/Objects/neon_caves_icon.png");
        // Boton de ready para pasar a jugar
        this.load.image("cc_ready_button", "./Design/Objects/Buttons/cc_ready_button.png");
        this.load.image("cc_ready_button_selected", "./Design/Objects/Buttons/cc_ready_button_selected.png");
        // Cargar música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");
        // Efectos de Sonido
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        this.load.audio("change_options", "./Design/Audio/SoundFX/change_options.mp3");
        // Fondo
        this.background;
        // Imágenes de los mapas
        this.tikiJungleImage;
        this.neonCavesImage;
        // Imágenes de los iconos de los mapas
        this.tikiJungleIcon;
        this.neonCavesIcon;
        // Botón de Listo
        this.readyButton;
        this.leftButton;
        this.rightButton;
        // Indicador de mapa seleccionado
        this.maps;
        this.map;
        this.selector;
        // Música
        this.loop;
        // Efectos de sonido
        this.choose_options;
        this.change_options;
       
    }// Fin preload

    create() {
        var that = this;
        this.cameras.main.fadeIn(500);
        // Fondo
        this.background = this.add.image(0, 0, "select_map_background").setOrigin(0,0).setDepth(0);
        this.leftButton = this.add.image(72, 282, "select_map_button_left");
        this.leftButton.alpha = 0;
        this.rightButton = this.add.image(1131, 282, "select_map_button_right");
        this.rightButton.alpha = 0;
        // Imágenes de los mapas
        this.tikiJungleImage = this.add.image(598, 316, "tiki_jungle_map").setDepth(1);
        this.neonCavesImage = this.add.image(599.50, 312.50, "neon_caves_map").setDepth(1);
        this.neonCavesImage.alpha = 0;
        // Imágenes de los iconos de los mapas
        this.tikiJungleIcon = this.add.image(218, 477.50, "tiki_jungle_icon").setDepth(2);
        var tweenTikiJungleIcon = this.tweens.add({
            targets: this.tikiJungleIcon,
            scaleX: 0.95,
            scaleY: 0.95,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        this.neonCavesIcon= this.add.image(236, 456.50, "neon_caves_icon").setDepth(2);
        this.neonCavesIcon.alpha = 0;
        var tweenNeonCavesIcon = this.tweens.add({
            targets: this.neonCavesIcon,
            scaleX: 0.95,
            scaleY: 0.95,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        // Botón de listo
        this.readyButton = this.add.image(1135.50, 568.50, "cc_ready_button").setDepth(1);
        // Indicador de mapa seleccionado
        this.maps = ["tiki_jungle", "neon_caves"];
        this.map = this.maps[0];
        this.selector = 0;
        // Música
        this.sound.pauseOnBlur = false;
        this.loop = this.sound.add("how_to_play_song");
        this.loop.play({
            loop : true,
            volume: this.vol
        });
        // Efectos de sonido
        this.choose_options = this.sound.add("choose_options");
        this.change_options = this.sound.add("change_options");
        // Eventos de teclado
        this.input.keyboard.on("keydown", function (event) {
            switch (event.key){
                case "ArrowRight":
                case "D":
                case "d":
                    that.selector = (that.selector + 1) % that.maps.length;
                    that.changeMap(that.selector);
                    that.map = that.maps[that.selector];
                    that.change_options.play({
                        volume: that.vol
                    });
                    that.rightButton.alpha = 1;
                break;

                case "ArrowLeft":
                case "A":
                case "a":
                    if (that.selector != 0){
                        that.selector = (that.selector - 1) % that.maps.length;
                    }else{
                        that.selector = that.maps.length - 1;
                    }
                    that.changeMap(that.selector);
                    that.map = that.maps[that.selector];
                    that.change_options.play({
                        volume: that.vol
                    });
                    that.leftButton.alpha = 1;
                break;

                case "Enter":
                    that.choose_options.play({
                        volume: that.vol
                    });
                    that.scene.start("how_to_play", {characters: that.characters, volume: that.vol, map: that.map});
                    that.loop.stop();
                break;

                case "Escape":
                    that.choose_options.play({
                        volume: that.vol
                    });
                    that.scene.start("main_menu", {volume: that.vol});
                    that.loop.stop();
                break;
            }
        });
        this.input.keyboard.on("keyup", function (event) {
            switch (event.key){
                case "ArrowRight":
                case "D":
                case "d":
                    that.rightButton.alpha = 0;
                break;

                case "ArrowLeft":
                case "A":
                case "a":
                    that.leftButton.alpha = 0;
                break;
            }
        });
    }// Fin create

    update(time, delta){

    }// Fin update

    changeMap(selector){
        switch(this.maps[selector]){
            case "tiki_jungle":
                var tweenAppear = this.tweens.add({
                    targets: [this.tikiJungleImage, this.tikiJungleIcon],
                    alpha: 1,
                    ease: 'Sine.easeInOut',
                    duration: 200,
                });
                var tweenDisappear = this.tweens.add({
                    targets: [this.neonCavesImage, this.neonCavesIcon],
                    alpha: 0,
                    ease: 'Sine.easeInOut',
                    duration: 200,
                });
            break;

            case "neon_caves":
                var tweenAppear = this.tweens.add({
                    targets: [this.neonCavesImage, this.neonCavesIcon],
                    alpha: 1,
                    ease: 'Sine.easeInOut',
                    duration: 200,
                });
                var tweenDisappear = this.tweens.add({
                    targets: [this.tikiJungleImage, this.tikiJungleIcon],
                    alpha: 0,
                    ease: 'Sine.easeInOut',
                    duration: 200,
                });
            break;

            default:
                var tweenAppear = this.tweens.add({
                    targets: [this.tikiJungleImage, this.tikiJungleIcon],
                    alpha: 1,
                    ease: 'Sine.easeInOut',
                    duration: 200,
                });
                var tweenDisappear = this.tweens.add({
                    targets: [this.neonCavesImage, this.neonCavesIcon],
                    alpha: 0,
                    ease: 'Sine.easeInOut',
                    duration: 200,
                });
            break;
        }
        
    }
}// Fin clase MainMenu