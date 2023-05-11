import Phaser from 'phaser';

import backGround from '../assets/img_1.png';
import gitHub from '../assets/github.png';
import gameover from '../assets/gameover.png';

import { relaoadButton } from '../components/buttonStart';

export default class GameOver extends Phaser.Scene
{
    constructor ()
    {
        super('GameOver');
        this.relaoadButton = new relaoadButton(this);
    }

    preload ()
    {
        this.load.image('back', backGround);
        this.load.image('over', gameover);
        this.load.image('github', gitHub);
        this.load.spritesheet('playbutton', './src/images/playbutton.png', { frameWidth: 200, frameHeight: 49 });

    }

    create (data)
    {
        this.add.image(400,300,'back')
        this.relaoadButton.create();
        const over = this.add.image(430, 50, 'over');

        this.scoreText = this.add.text(430, 830, 'Score: '+ data.score, { fontSize: '32px', fill: '#fff' });


        this.githubVal = this.add.image(95,460,'github').setInteractive();
        this.githubVal.setScale(0.39);
        this.githubVal.on('pointerdown', () => {
            var s = window.open('https://github.com/AleixMS5/AmsTronaut', '_blank');
            s.focus();
        });


        this.tweens.add({
            targets: over,
            y: 200,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}