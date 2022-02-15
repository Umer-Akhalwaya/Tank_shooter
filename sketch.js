const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, boat;
var backgroundMusic, gameOverSound, cannonShoot, splash;
var bullets = [];
var boats = [];
var score = 0;

var brokenBoatAnimation;

var floor;

var waterSplashAnimation;

var boatImg;

var isGameOver = false;
var isLaughing = false;

function preload() {
  //backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("towerr0000.png");
 
  boatImg = loadImage("tankk0000.png");

 // brokenBoatAnimation = loadAnimation ("tankkExplode0000.png","tankkExplode0002.png","tankkExplode0004.png","tankkExplode0006.png","tankkExplode0008.png","tankkExplode0010.png","tankkExplode0012.png");

 // backgroundMusic = loadSound ("assets/background_music.mp3");
  gameOverSound = loadSound ("pirate_laugh.mp3");
  cannonShoot = loadSound ("cannon_explosion.mp3");
  splash = loadSound ("cannon_water.mp3");

  backgroundImg = loadImage("background.gif");
 // boatSpritedata = loadJSON("assets/boat/boat.json");
  //boatSpritesheet = loadImage("assets/boat/boat.png");
  //brokenBoatSpritedata = loadJSON("assets/boat/broken_boat.json");
 // brokenBoatSpritesheet = loadImage("assets/boat/broken_boat.png");
 // waterSplashSpritedata = loadJSON("assets/water_splash/water_splash.json");
 // waterSplashSpritesheet = loadImage("assets/water_splash/water_splash.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15


  ground = Bodies.rectangle(-20, height + 10, 20000, 12, { isStatic: true});
  World.add(world, ground);

  tower = Bodies.rectangle(160, height/2, 2, 630, { density: 50 });
  
  World.add (world, tower);

  cannon = new Cannon(185, height/1.5, 100, 50, angle);

 // var boatFrames = boatSpritedata.frames;
 // for (var i = 0; i < boatFrames.length; i++) {
 //   var pos = boatFrames[i].position;
 //   var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
 //   boatAnimation.push(img);
//  }

 // var brokenBoatFrames = brokenBoatSpritedata.frames;
 // for (var i = 0; i < brokenBoatFrames.length; i++) {
//    var pos = brokenBoatFrames[i].position;
/////    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
 //   brokenBoatAnimation.push(img);
//  }

 // var waterSplashFrames = waterSplashSpritedata.frames;
 // for (var i = 0; i < waterSplashFrames.length; i++) {
 //   var pos = waterSplashFrames[i].position;
 //   var img = waterSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
 //   waterSplashAnimation.push(img);
 // }
}



function draw() {
  background(189);
  //image(backgroundImg, 0, 0, width, height);
 // if (!backgroundMusic.isPlaying()) {
 //   backgroundMusic.play();
 //   backgroundMusic.setVolume(1);
 // }

  Engine.update(engine);
 
  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, -30, 120, 260, 410);
  pop();

  showBoats();

   for (var i = 0; i < bullets.length; i++) {
    showCannonBalls(bullets[i], i);
    collisionWithBoat(i);
  }

  cannon.display();
  

  fill("#6d4c41");
  textSize(40);
  text(`Score:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);
}

function collisionWithBoat(index) {
  for (var i = 0; i < boats.length; i++) {
    if (bullets[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(bullets[index].body, boats[i].body);

      if (collision.collided) {
        score+=5
          boats[i].remove(i);
          //boat.changeAnimation(brokenBoatAnimation);

        Matter.World.remove(world, bullets[index].body);
        delete bullets[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    bullets.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      setTimeout(() => {
        ball.remove(index);
     }, 500);
   }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [0, 0];
      var position = random(positions);
      var boat = new Boat(width, height - 10, 70,70, position, boatImg);
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -1.5,
          y: 0
        });
        boats[i].display();
      //  boats[i].animate();
      var collision = Matter.SAT.collides(this.tower, boats[i].body);
      if (collision.collided && !boats[i].isBroken) {
        if (!isLaughing && !gameOverSound.isPlaying()) {
          gameOverSound.play();
          isLaughing = true;
        }
        isGameOver = true;
        gameOver();
      }
    }
  } else {
    var boat = new Boat(width, height - 10, 70, 70, 0, boatImg);
    boats.push(boat);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cannonShoot.play();
    cannonShoot.setVolume(0.2);
    bullets[bullets.length - 1].shoot();

  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
