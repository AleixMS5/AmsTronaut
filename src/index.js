import Phaser from 'phaser';
import Portada from './scenes/portada';
import ScenaB from './scenes/scenaB';
import Scena2 from './scenes/scena2';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [Portada,ScenaB,Scena2],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
};

new Phaser.Game(config);
