(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  // wont be making instances of util. Therefore, can
  // just make it a regular object, with all the utility
  // methods defined per a key (ex: inherits)
  var Util = Asteroids.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate;
    ChildClass.prototype.constructor = ChildClass;
  }

  // should take a velocity, and return a new velocty that is
  // x times greater (in x n y directions)
  Util.speedMult = function (velocity, multiplier) {
    var xvel = velocity[0] * multiplier
    var yvel = velocity[1] * multiplier
    return [xvel, yvel]
  }

  Util.randomVector = function () {
    var token = Math.floor(Math.random() * 2)
    var direction = 1
    if (token == 0) {
      direction = -1
    }
    var x = (Math.random() * 6) * direction
    var y = (Math.random() * 4) * direction
    return [x, y]
  }

  Util.randomPosition = function () {
    var x = Math.random() * (Asteroids.Game.DIM_X + 400)
    var y = Math.random() * (Asteroids.Game.DIM_Y + 400)
    return [x, y]
  }

  Util.shipStartPosition = function () {
    var x = Math.random() * (400) + 400
    var y = Math.random() * (300) + 200
    return [x, y]
  }

  Util.randomRadius = function () {
    return (Math.random() * 60) + 15
  }

  Util.distance = function (pos1, pos2) {
    var xDist = Math.abs(pos1[0] - pos2[0])
    var yDist = Math.abs(pos1[1] - pos2[1])
    var xDistSq = Math.pow(xDist, 2)
    var yDistSq = Math.pow(yDist, 2)
    return Math.sqrt(xDistSq + yDistSq)
  }
})();
