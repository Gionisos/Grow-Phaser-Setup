export default function LoadMap(scene) {
    // create map and set tileset
    scene.map = scene.add.tilemap(scene.level_data.map.key);


    let tileset_index = 0;
    scene.tilesets = {};
    let tilesetNames = [];

    scene.map.tilesets.forEach(function (tileset) {
        let map_tileset = scene.map.addTilesetImage(tileset.name, scene.level_data.map.tilesets[tileset_index]);
        tilesetNames.push(map_tileset);
        scene.tilesets[scene.level_data.map.tilesets[tileset_index]] = map_tileset;
        tileset_index += 1;
    }, scene);

    // create map layers before groups
    scene.layers = {};

    scene.map.layers.forEach(function (layer) {
        scene.layers[layer.name] = scene.map.createStaticLayer(layer.name, tilesetNames, 0, 0);


        if(layer.name[0] === 'A'){
            scene.layers[layer.name].setDepth(10);
        }
        if (layer.properties.collision) { 
            // collision layer
            scene.map.setCollisionByExclusion([-1]);
        }
    }, scene);

    scene.map.objects.forEach(function (object_layer) {
        object_layer.objects.forEach(scene.create_object, scene);
    }, scene);

}
