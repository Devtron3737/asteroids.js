(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({
      pos: Asteroids.Util.shipStartPosition(),
      game: this
    })
  }

  Game.BG_COLOR = "#B0C4DE" // blue steel
  Game.DIM_X = 1000
  Game.DIM_Y = 700
  // Game.NUM_ASTEROIDS = 4
  Game.NUM_ASTEROIDS = 28

  Game.prototype.addAsteroids = function () {
      for (var asteroid = 0; asteroid < Game.NUM_ASTEROIDS; asteroid++) {
        var newAsteroid = new Asteroids.Asteroid({
          pos: Asteroids.Util.randomPosition(),
          game: this
        });
        this.asteroids.push(newAsteroid);
      }
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship, this.bullets)
  }

  Game.prototype.draw = function (ctx) {
    // clearRect(x of upperleft, y of upper left, width, height)

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    var objects = this.allObjects()
    for (var i = 0; i < objects.length; i++) {
      objects[i].draw(ctx)
    }
  }

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects()
    for (var i = 0; i < objects.length; i++) {
      objects[i].move();
    }
  }

  Game.prototype.wrap = function (pos) {
    if (pos[0] >= 1100) {
      pos[0] = -100
    } else if (pos[0] <= -101) {
      pos[0] = 1099
    }

    if (pos[1] >= 800) {
      pos[1] = -100
    } else if (pos[1] <= -101) {
      pos[1] = 799
    }
    return pos
  }

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    for (var subObj = 0; subObj < objects.length; subObj++) {
      for (var obj = 0; obj < objects.length; obj++) {
        if (subObj === obj) {
          // do nothing because they are the same object
        } else if (objects[subObj].isCollidedWith(objects[obj])) {
          objects[subObj].collideWith(objects[obj]);
        }
      }
    }
  }

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  }

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      for (var i = 0; i < this.asteroids.length; i++) {
        if (object === this.asteroids[i]) {
          this.asteroids.splice(i, 1);
        }
      }
    } else {
      for (var i = 0; i < this.bullets.length; i++) {
        if (object === this.bullets[i]) {
          this.bullets.splice(i, 1);
        }
      }
    }
  }

  Game.prototype.fireBullet = function () {
    if (this.ship.velocity[0] == 0 && this.ship.velocity[1] == 0) {
      return;
    }
    var shipPos = this.ship.pos.slice(0);
    var newVel = Asteroids.Util.speedMult(this.ship.velocity, Asteroids.Bullet.VEL_MULT)
    var bullet = new Asteroids.Bullet({velocity: newVel,
                                       pos: shipPos,
                                       game: this
    });
    this.bullets.push(bullet);
  }
})();
