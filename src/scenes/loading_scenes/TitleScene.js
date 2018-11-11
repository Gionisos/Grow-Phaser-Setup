import JSONLevelScene from './JSONLevelScene';
import Prefab from '../../prefabs/Prefab';
import TextPrefab from '../../prefabs/TextPrefab';

export default class TitleScene extends JSONLevelScene {
    constructor() {
        super('TitleScene');
        
        this.prefab_classes = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        }
    }

    start_game() {
        this.scene.start('BootScene', {scene: 'fishing'});
    }
}