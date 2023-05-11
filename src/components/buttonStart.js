import { Button } from './button.js';

export class PlayButton extends Button {
    constructor(scene) {
        super(scene, 'playbutton', 540, 450);
    }

    doClick() {

        this.relatedScene.scene.start('ScenaB',{score:1,vidas:3});
    }

}

export class relaoadButton extends Button {
    constructor(scene) {
        super(scene, 'playbutton', 540, 450);
    }

    doClick() {
       window.location.reload()
    }

}