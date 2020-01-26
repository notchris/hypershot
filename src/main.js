import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import './style.css';
import SceneA from "./scenes/SceneA.js";
import MatchEnd from "./scenes/MatchEnd.js";

const config = {
    type: Phaser.WEBGL,
    canvas: document.querySelector('#render'),
    antialias: true,
    pixelArt: false,
    disableContextMenu: true,
    width: 1024,
    height: 512,
    physics: {
        default: 'matter',
        matter: {
          debug: false,
          gravity: { y: 0, x: 0 },
          enableSleep: true
        }
    },
    plugins: {
        scene: [
          {
            plugin: PhaserMatterCollisionPlugin,
            key: "matterCollision",
            mapping: "matterCollision"
          }
        ]
    },
    scene: [SceneA, MatchEnd],
};

const game = new Phaser.Game(config);