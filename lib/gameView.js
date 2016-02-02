(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.MOVES = {
    "w": [ 0, -2],
    "a": [-2,  0],
    "s": [ 0,  2],
    "d": [ 2,  0],
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

    key("space", (function () { this.game.fireBullet() }).bind(this));
  };

})();
