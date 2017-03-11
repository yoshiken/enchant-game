enchant(); // enchant.jsの有効化

var exist = 0;

window.onload = function() {
    var game = new Core(960, 640);
    var sceneGameMain = new Scene();
    game.preload("./img/human.png");
    game.fps = 30;


    game.onload = function() {
        var sprite = new Sprite(60, 60);
        sprite.x = 0;
        sprite.y = 0;
        sprite.frame = 0;
        sprite.image = game.assets["./img/human.png"]
        game.rootScene.addChild(sprite);

        var ShikakuCreate = function() {

        };

        var num = 1;
        var count = 0;

        game.keybind(32, 'a');

        sprite.addEventListener("enterframe", function() {
          exist = 0;
            if (game.input.a) {
                var shikaku = new Sprite(100, 10);
                shikaku.frame = 0;
                shikaku.backgroundColor = "rgba(200, 255, 200, 0.5)";
                game.rootScene.addChild(shikaku);
                shikaku.x = sprite.x + 60;
                shikaku.y = sprite.y + 25;
                exist = 1;

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
            if (count == 1) {
                count = 0
                sprite.frame += num;
            }
            count++;
            sprite.frame += num;

            if (exist == 1) {
                console.log(shikaku.x);
          }

        });
    }

    game.start();

};