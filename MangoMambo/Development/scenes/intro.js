class Intro extends Phaser.Scene {
    constructor(){
        super({key: "intro"});
    }// Fin constructor

    preload(){
        // Cargar las imágenes
        this.load.image("black", "./Design/Stages/Backgrounds/black.png");
        this.load.image("core_room_logo", "./Design/Objects/core_room_logo.png");
        // Fondo
        this.background;
        // Título que se mueve
        this.logo;
        // texto
        this.texto;
        // Tecla Enter
        this.enterKey
    }// Fin preload

    create(){
        // Fondo
        this.background = this.add.image(0, 0, "black").setOrigin(0,0);
        // Título que se mueve
        this.logo = this.add.image (600, 300, "core_room_logo");
        // Crear texto
        this.texto = this.add.text(500, 250, "Press ENTER", { fontFamily: '"Bauhaus 93"', fontSize: 40 });
        this.logo.alpha = 0;
        this.texto.alpha = 0;
        // Movimiento
        var tween = this.tweens.add({
            targets: this.logo,
            alpha: 1,
            scaleX: 1.3,
            scaleY: 1.3,
            ease: 'Sine.easeInOut',
            duration: 6000,
        });
        var tween = this.tweens.add({
            targets: this.logo,
            alpha: 0,
            ease: 'Sine.easeInOut',
            duration: 2000,
            delay: 4000
        });
        var tween = this.tweens.add({
            targets: this.texto,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 6000,
            yoyo: true,
            repeat: -1
        });
        // Tecla Enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }// Fin create

    update(){
        // Cambio de pantalla
        if(this.enterKey.isDown){
            this.scene.start("main_menu");
        }
    }// Fin update
}    