import Phaser from 'phaser';
import Portada from './scenes/portada';
import ScenaB from './scenes/scenaB';
import Scena2 from './scenes/scena2';
import GameOver from "./scenes/gameOver";
import Victory from "./scenes/victory";
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [Portada,ScenaB,Scena2,GameOver,Victory],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
};

new Phaser.Game(config);
