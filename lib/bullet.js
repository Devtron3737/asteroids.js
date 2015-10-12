(function () {
  if (typeof Asteroids === "udefined") {
    window.Asteroids = {}
  }

  var Bullet = Asteroids.Bullet = function (attributes) {
    attributes.color = attributes.color || Bullet.COLOR
    attributes.radius = Bullet.RADIUS
    Asteroids.MovingObject.call(this, attributes)
  }

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject)
  Bullet.COLOR = "#FFD700" //gold
  Bullet.VEL_MULT = 2
  Bullet.RADIUS = 4
})()
