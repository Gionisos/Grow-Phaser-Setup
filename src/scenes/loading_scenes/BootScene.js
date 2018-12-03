// See if it makes any difference replacing title with TitleScene, seems a bit cleaner to me
// I think it is different because there will be multiple loadings of the same map with different content?

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'});
        
        this.levels = {
            title: {key: 'TitleScene', path: 'assets/levels/loading_scenes/title_screen.json'},
            fishing: {key: 'FishingGround', path: 'assets/levels/pomodoro/fishing_ground.json'}
        };
    }
    
    preload () {
        for (let level_name in this.levels) {
            let level = this.levels[level_name];
            this.load.json(level_name, level.path);
        }

        // LOAD Player_details
        this.load.json('player_information', '../../../assets/levels/player_information.json');  


    }
    
    create (data) {
        let level_data = this.cache.json.get(data.scene);
        this.scene.start('LoadingScene', {level_data: level_data, scene: this.levels[data.scene].key});
    }
}
