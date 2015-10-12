(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (attributes) {
      // attributes.game = attributes.game
      attributes.color = Asteroid.COLOR
      attributes.radius = Asteroids.Util.randomRadius()
      attributes.pos = attributes.pos || Asteroids.Util.randomPosition()
      attributes.velocity = attributes.velocity || Asteroids.Util.randomVector()
      Asteroids.MovingObject.call(this, attributes)
  }

  Asteroid.COLOR = "#00FFFF" //aqua
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
      if (otherObject instanceof Asteroids.Ship) {
        // this.game.remove(this);
        this.game.ship.relocate();
      } else if (otherObject instanceof Asteroids.Bullet) {
        this.game.remove(this);
        this.game.remove(otherObject);
      }
  }
})();
