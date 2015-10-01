// Define an Asteroids.GameView class in lib/gameView.js. The GameView should store a Game and a drawing ctx.
//
// Write a GameView#start method. It should call setInterval to call Game#moveObjects and Game#draw once every 20ms, say.

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step();
      this.game.draw(this.ctx);
    }, 20);
    this.bindKeyHandlers();
  }

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship
    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    // key("space", function () { this.ship.fireBullet() });
  };

})();
