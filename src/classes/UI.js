export default class UI {
    constructor(scene){
        this.scene = scene;
        this.scoreAText = this.scene.add.text(-30, -242, '0', { fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff' });
        this.scoreBText = this.scene.add.text(10, -242, '0', { fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff' });
        const scoreBackground = this.scene.add.graphics();
        scoreBackground.lineStyle(3, 0x773cc1, 1);
        scoreBackground.strokeRoundedRect(-40, -306, 80, 100, 6);
        this.roundCounter = this.scene.add.text(0, 0, '', { fontFamily: 'Arial', fontSize: 120, color: '#FFFFFF' });
        this.roundCounter.setOrigin(0.5);
        this.roundCounter.setVisible(false);
        this.counter = 3;
    }
    updateScore() {
        this.scoreAText.text = this.scene.scoreA;
        this.scoreBText.text = this.scene.scoreB;
    }
    startServe() {
        this.roundCounter.setVisible(true);
        this.roundCounter.text = this.counter;
        this.scene.time.addEvent({
            delay: 1000,                // ms
            callback: () => {
                this.counter -= 1;
                this.roundCounter.text = this.counter;
                if (this.counter === 0) {
                    this.counter = 3;
                    this.roundCounter.setVisible(false);
                }
            },
            callbackScope: this.scene,
            repeat: 2
        });
    }
}