var config = {
    type: Phaser.AUTO,
    backgroundColor: "#fff",
    width: 1200,
    height: 600, // Resolución del canvas
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [
        Intro,
        MainMenu,
        ChooseCharacter,
        Level1,
        ScoreLevel,
        Options,
        Credits,
        HowToPlay,
        HowToPlayDetails
    ]
};

var game = new Phaser.Game(config);
