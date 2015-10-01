(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var MovingObject = Asteroids.MovingObject = function (attributes) {
    this.game = attributes.game
    this.pos = attributes.pos
    this.velocity = attributes.velocity
    this.radius = attributes.radius
    this.color = attributes.color
  }

  MovingObject.prototype.draw = function (ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
    // x,y,rad,startAngle,endAngle
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
  }

  MovingObject.prototype.move = function () {
      this.pos[0] += this.velocity[0];
      this.pos[1] += this.velocity[1];
      this.pos = this.game.wrap(this.pos)
    }

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var radSum = this.radius + otherObject.radius;
    var dist = Asteroids.Util.distance(this.pos, otherObject.pos);
    if (radSum > dist) {
      return true
    } else {
      return false
    }
  }

  MovingObject.prototype.collideWith = function (otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
  }

})();
