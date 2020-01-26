import Phaser from 'phaser';

export default class MatchEnd extends Phaser.Scene {
    constructor() {
        super({key: "MatchEnd"});
    }

    preload() {

    }

    init (data) {
        this.player = data.player;
    }

    create() {
        this.winText = this.add.text(512, 100, (this.player.name).toUpperCase() + ' WIN!', { fontFamily: 'Arial Black', fontSize: 40, color: '#FFFFFF' });
        this.winText.setOrigin(0.5);
    }

    update() {

    }
}
