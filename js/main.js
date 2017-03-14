enchant(); // enchant.jsの有効化

var shot_frames = 0;

window.onload = function() {
    game = new Core(960, 640);
    sceneGameMain = new Scene();
    game.preload("./img/human.png");
    game.preload("./img/pet_man.png");
    game.fps = 30;

    game.onload = function() {

        sprite = new Sprite(60, 60);
        sprite.x = 0;
        sprite.y = 0;
        sprite.frame = 0;
        sprite.image = game.assets["./img/human.png"];
        game.rootScene.addChild(sprite);

        var enemy_count = 0;
        var enemy_index = [];

        function enemy(y){

            enemy_cha = new Sprite(55,57);
            enemy_cha.frame = 0;
            enemy_cha.scaleX = -1;
            enemy_cha.image = game.assets["./img/pet_man.png"];
            enemy_cha.x = 900;
            enemy_cha.y = y*56;
            game.rootScene.addChild(enemy_cha);
            enemy_cha.tl.moveBy(-960,0,180);
            enemy_index [enemy_count] = enemy_cha;
            enemy_count += 1;

        }

        var num = 1;
        var count = 0;
        var sonzai = 0;

        game.keybind(32, 'sp');
        game.keybind(69, 'e');

        var shikaku_count = 0;
        var shikaku_index = [];
        score_count = 0;

        score_text = new Label("Score:");
        game.rootScene.addChild(score_text);

        score = new Label(score_count);
        score.text = score_count;
        score.x = 70;
        game.rootScene.addChild(score);

        end = 0;

        sprite.addEventListener("enterframe", function() {
            if (shot_frames >= 10){
                shot_frames = 0;
                if (game.input.sp) {
                    shikaku = new Sprite(80, 10);
                    shikaku.frame = 0;
                    shikaku.backgroundColor = "rgba(200, 255, 200, 1)";
                    game.rootScene.addChild(shikaku);
                    shikaku.x = sprite.x + 60;
                    shikaku.y = sprite.y + 25;
                    shikaku.tl.moveBy(900,0,45);
                    shikaku_index[shikaku_count] = shikaku;
                    shikaku_count += 1;
                }
            }

            if (game.input.up) {
                this.y -= 6;
            }
            if (game.input.down) {
                this.y += 6;
            }
            if (game.input.right) {
                this.x += 6;
            }
            if (game.input.left) {
                this.x -= 6;
            }
            if (this.y < 0) {
                this.y = 0
            }
            if (this.x < 0) {
                this.x = 0
            }
            if (count % 25 == 0){
                var rand = Math.floor( Math.random() * 11 ) ;
                enemy(rand);

            }

            if (shot_frames > 50){
                shot_frames = 0;
            }

            if (enemy_count >= 1){
                for(var i=0;i<enemy_index.length;i++){
                    if(shikaku_count >= 1){
                        for(var j=0;j<shikaku_index.length;j++){
                            if(shikaku_index[j].intersect(enemy_index[i])) {
                                game.rootScene.removeChild(score);
                                score_count ++;
                                score = new Label(score_count);
                                score.text = score_count;
                                score.x = 70;
                                game.rootScene.addChild(score);

                            }
                        }
                    }
                }
            }


            if (enemy_count >= 1){
                for(var i=0;i<enemy_index.length;i++){
                    if(sprite.intersect(enemy_index[i])) {
                        end = 1;
                    }
                }
            }        

            if (end == 1){
                alert("Score:" + score_count);
                location.reload();
            }

            count++;
            shot_frames += 1 ;
            sprite.frame += num;

        });
    }
    game.start();
};
