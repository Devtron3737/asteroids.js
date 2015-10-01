(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
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
  //returns array of all game objects (asteroids, ships, bullets)
  Game.prototype.allObjects = function () {
    var shipsAndAsteroids = this.asteroids.concat(this.ship)
    return shipsAndAsteroids;
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
    // this.allObjects.forEach( function (obj) {
    //   obj.move();
    // })
  }

  Game.prototype.wrap = function (pos) {
    if (pos[0] >= 1100) {
      pos[0] = -100
    } else if (pos[0] <= -100) {
      pos[0] = 1100
    }

    if (pos[1] >= 800) {
      pos[1] = -100
    } else if (pos[0] <= -100) {
      pos[1] = 800
    }
    return pos
  }

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    for (var subObj = 0; subObj < objects.length; subObj++) {
      for (var obj = 0; obj < objects.length; obj++) {
        if (subObj === obj) {
        }else if (objects[subObj].isCollidedWith(objects[obj])) {
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
    }
  }

})();
