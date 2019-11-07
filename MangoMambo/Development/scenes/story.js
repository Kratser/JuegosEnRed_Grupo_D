class Story extends Phaser.Scene {
    constructor(){
        super({key: "story"});
    }// Fin constructor

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
        // Imagen de fondo de carga
        this.load.image("story_background", "./Design/Stages/Backgrounds/story_background.png");
        // Cargar las imágenes
        this.load.image("story_1", "./Design/Objects/story_1.png");
        this.load.image("story_2", "./Design/Objects/story_2.png");
        this.load.image("story_3", "./Design/Objects/story_3.png");
        this.load.image("story_4", "./Design/Objects/story_4.png");
        this.load.image("mango_mambo_title", "./Design/Stages/Backgrounds/mango_mambo_title.png");
        // Cargar el botón
        this.load.image("skip_button", "./Design/Objects/Buttons/skip_button.png");
        // Cargar música
        this.load.audio("how_to_play_song", "./Design/Audio/HowToPlaySong/how_to_play_song.wav");
        // Se carga el efecto
        this.load.audio("choose_options", "./Design/Audio/SoundFX/choose_options.mp3");
        // Fondo
        this.background;
        // Historia
        this.story1;
        this.story2;
        this.story3;
        this.story4;
        // Título que se mueve
        this.mangoMamboTitle;
        // Botón
        this.skipButton;
        // Tecla Enter
        this.enterKey;
        // La canción loopeada
        this.loop;
    }// Fin preload

    create(){
        this.cameras.main.fadeIn(500);
        // Fondo
        this.background = this.add.image(0, 0, "story_background").setOrigin(0,0).setDepth(0);
        // Crear texto de historia
        this.story1 = this.add.image(237, 151, "story_1").setDepth(1);
        this.story2 = this.add.image(240, 436, "story_2").setDepth(1);
        this.story3 = this.add.image(832, 191, "story_3").setDepth(1);
        this.story4 = this.add.image(657, 470, "story_4").setDepth(1);
        this.story1.alpha = 0;
        this.story2.alpha = 0;
        this.story3.alpha = 0;
        this.story4.alpha = 0;
        // Movimiento story 1
        var tween = this.tweens.add({
            targets: this.story1,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
        });
        // Movimiento story 2
        var tween = this.tweens.add({
            targets: this.story2,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 5000
        });
        // Movimiento story 3
        var tween = this.tweens.add({
            targets: this.story3,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 10000
        });
        // Movimiento story 4.1
        var tween = this.tweens.add({
            targets: this.story4,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 17000
        });
        // Movimiento story 4.2
        var tween = this.tweens.add({
            targets: this.story4,
            angle: 2,
            ease: 'Sine.easeInOut',
            duration: 100,
            yoyo: true,
            repeat: -1,
            delay: 17000
        });
        // Título que se mueve
        this.mangoMamboTitle = this.add.image (989, 456, "mango_mambo_title").setScale(0.65, 0.65).setAngle(10).setDepth(1);
        this.mangoMamboTitle.alpha = 0;
        // Movimiento título 1
        var tween = this.tweens.add({
            targets: this.mangoMamboTitle,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 500,
            delay: 18500
        });
        // Movimiento título 2
        var tween = this.tweens.add({
            targets: this.mangoMamboTitle,
            scaleX: 0.70,
            scaleY: 0.70,
            ease: 'Sine.easeInOut',
            duration: 500,
            yoyo: true,
            repeat: -1,
            delay: 18500
        });
        // Crear botón
        this.skipButton = this.add.image(1130, 30, "skip_button").setDepth(1);
        // Tecla Enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // Música
        this.sound.pauseOnBlur = false;
        this.choose_options = this.sound.add("choose_options");
        this.loop = this.sound.add("how_to_play_song");
        this.loop.play({
            loop : true,
            volume: this.vol
        });
    }// Fin create

    update(){
        // Cambio de pantalla
        if(this.enterKey.isDown){
            this.choose_options.play({
                volume: this.vol
            });
            this.scene.start("main_menu");
            // Se para la música
            this.loop.stop();
        }
    }// Fin update
}    