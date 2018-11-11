import 'phaser';

// Loading Scenes
import BootScene from './scenes/loading_scenes/BootScene'
import LoadingScene from './scenes/loading_scenes/LoadingScene'
import JSONLevelScene from './scenes/loading_scenes/JSONLevelScene'
import TitleScene from './scenes/loading_scenes/TitleScene'

// Pomodoro
import FishingGround from './scenes/pomodoro/FishingGround'


const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        LoadingScene,
        JSONLevelScene,
        TitleScene,
        FishingGround
    ]
};

const game = new Phaser.Game(config);

game.scene.start('BootScene', {scene: 'title'});