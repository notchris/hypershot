import Phaser from 'phaser';
import PlayerA from '../classes/PlayerA';
import PlayerB from '../classes/PlayerB';
import Ball from '../classes/Ball';
import GoalA from '../classes/GoalA';
import GoalB from '../classes/GoalB';
import UI from '../classes/UI';

export default class SceneA extends Phaser.Scene {
    constructor() {
        super({key: "SceneA"});
    }

    preload() {
        this.load.glsl('bundle', './src/assets/shaders/bundle.glsl.js');
        this.load.image('red', './src/assets/img/red.png');
        this.load.image('hexagon', './src/assets/img/hexagon.png');
        this.load.image('logo', './src/assets/img/logo.png');
        this.load.image('playerA', './src/assets/img/paddleA.png');
        this.load.image('playerB', './src/assets/img/paddleA.png');
    }

    init (data) {
        this.gameActive = false;
        this.scoreA = 0;
        this.scoreB = 0;
        this.maxScore = 1;
    }

    create() {
        this.s = this.add.shader('Test1', 0, 0, 1024, 512);

        const pat = this.add.image(0, 0, 'hexagon', 0);
        pat.setAlpha(0.2);

        const logo = this.add.image(0, 0, 'logo', 0);
        logo.setAlpha(0.5);
        logo.setScale(0.75);

        // Test Center Divider
        const centerLine = this.add.graphics();
        centerLine.fillStyle(0xffffff, 1);
        centerLine.fillRect(0, -256, 1, 512);
        centerLine.setAlpha(0.5);
        this.createBounds();

        this.goalA = new GoalA(this, -512 - 30, 0, null, 0);
        this.goalB = new GoalB(this, 512 + 30, 0, null, 0);

        this.playerA = new PlayerA(this, -512 + 10, 0, null, 0);
        this.playerB = new PlayerB(this, 512 - 10, 0, null, 0);
        this.ball = new Ball(this, 0, 0, null, 0);

        let ballParticles = this.add.particles('red');
        this.emitter = ballParticles.createEmitter({
            speed: 20,
            scale: { start: 0.3, end: 0 },
            blendMode: 'ADD'
        });
        this.emitter.startFollow(this.ball);

        this.cameras.main.setBounds(-512, -256, 1024, 512);

        // Create UI
        this.ui = new UI(this);

        // PlayerA Score
        this.matterCollision.addOnCollideStart({
            objectA: this.goalB,
            objectB: this.ball,
            callback: eventData => {
                this.score(this.playerA);
            }
        });
        // PlayerB Score
        this.matterCollision.addOnCollideStart({
            objectA: this.goalA,
            objectB: this.ball,
            callback: eventData => {
                this.score(this.playerB);
            }
        });

        this.serve();
    }

    score(player) {
        // Update Score
        if (player === this.playerA) {
            this.scoreA++;
        } else if (player === this.playerB) {
            this.scoreB++;
        }

        // Update Score on the UI
        this.ui.updateScore();

        // Check if a player wins
        if (this.scoreA === this.maxScore) {
            this.ball.setVisible(false);
            this.win(this.playerA)
        } else if (this.scoreB === this.maxScore) {
            this.ball.setVisible(false);
            this.win(this.playerB)
        } else {
            this.serve();
        }

        // Reset Ball
        this.ball.setVelocity(0, 0);
        this.ball.setAngularVelocity(0);
        this.ball.x = 0;
        this.ball.y = 0;
    }

    win(player) {
        // This method fires when a player wins a match.
        this.gameActive = false;
        this.scene.launch('MatchEnd', { player: player})
    }

    serve() {
        // This method begins a serve.

        this.gameActive = false;
        // 3 Second count-down
        this.ui.startServe();
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.gameActive = true;
                this.ball.setAngularVelocity(0.01);
                this.ball.setVelocity(9, Phaser.Math.Between(-9, 9));
            },
            callbackScope: this,
        });
    }

    createBounds() {
        // These are the actual colliding bodies that make up the bounds of the course.
        const boundGraphicA = this.add.graphics();
        boundGraphicA.fillStyle(0x773cc1, 1);
        boundGraphicA.fillRect(0, 0, 20, 60);
        boundGraphicA.generateTexture('boundCornerA', 20, 60);
        boundGraphicA.destroy();

        const boundGraphicB = this.add.graphics();
        boundGraphicB.fillStyle(0xd609f8, 1);
        boundGraphicB.fillRect(0, 0, 20, 60);
        boundGraphicB.generateTexture('boundCornerB', 20, 60);
        boundGraphicB.destroy();

        const boundGraphicTop = this.add.graphics();
        boundGraphicTop.fillStyle(0x773cc1, 1);
        boundGraphicTop.fillRect(0, 0, 1024, 20);
        boundGraphicTop.generateTexture('boundGraphicTop', 1024, 20);
        boundGraphicTop.destroy();

        const boundGraphicBottom = this.add.graphics();
        boundGraphicBottom.fillStyle(0xd609f8, 1);
        boundGraphicBottom.fillRect(0, 0, 1024, 20);
        boundGraphicBottom.generateTexture('boundGraphicBottom', 1024, 20);
        boundGraphicBottom.destroy();

        let boundCornerA = this.matter.add.sprite(0, 0, 'boundCornerA', 0);
        boundCornerA.setPosition(-512, -256 + 30);
        boundCornerA.setIgnoreGravity(true);
        boundCornerA.setFixedRotation(true);
        boundCornerA.setStatic(true);
        boundCornerA.setFriction(0, 0, 0);
        let boundCornerB = this.matter.add.sprite(0, 0, 'boundCornerA', 0);
        boundCornerB.setPosition(512, -256 + 30);
        boundCornerB.setIgnoreGravity(true);
        boundCornerB.setFixedRotation(true);
        boundCornerB.setStatic(true);
        boundCornerB.setFriction(0, 0, 0);
        let boundCornerC = this.matter.add.sprite(0, 0, 'boundCornerB', 0);
        boundCornerC.setPosition(-512, 256 - 30);
        boundCornerC.setIgnoreGravity(true);
        boundCornerC.setFixedRotation(true);
        boundCornerC.setStatic(true);
        boundCornerC.setFriction(0, 0, 0);
        let boundCornerD = this.matter.add.sprite(0, 0, 'boundCornerB', 0);
        boundCornerD.setPosition(512, 256 - 30);
        boundCornerD.setIgnoreGravity(true);
        boundCornerD.setFixedRotation(true);
        boundCornerD.setStatic(true);
        boundCornerD.setFriction(0, 0, 0);

        let boundTop = this.matter.add.sprite(0, 0, 'boundGraphicTop', 0);
        boundTop.setPosition(0, -256);
        boundTop.setIgnoreGravity(true);
        boundTop.setFixedRotation(true);
        boundTop.setStatic(true);
        boundTop.setFriction(0, 0, 0);

        let boundBottom = this.matter.add.sprite(0, 0, 'boundGraphicBottom', 0);
        boundBottom.setPosition(0, 256);
        boundBottom.setIgnoreGravity(true);
        boundBottom.setFixedRotation(true);
        boundBottom.setStatic(true);
        boundBottom.setFriction(0, 0, 0);



    }

    update() {
        if (this.playerA && this.playerB) {
            this.ball.update();
            this.playerA.update();
            this.playerB.update();
        }
    }
}
