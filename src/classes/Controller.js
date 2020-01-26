import Phaser from 'phaser';

export default class Controller {
    constructor(scene){
        this.scene = scene;
        this.input = scene.input.keyboard.createCursorKeys();
        this.keyboard = scene.input.keyboard;
        this.keyW = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    up() {
        return this.input.up.isDown || this.keyW.isDown;
    }
    down() {
        return this.input.down.isDown || this.keyS.isDown;
    }
    left() {
        return this.input.left.isDown || this.keyA.isDown;
    }
    right() {
        return this.input.right.isDown|| this.keyD.isDown;
    }
}