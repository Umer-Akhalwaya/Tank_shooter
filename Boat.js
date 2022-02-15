class Boat {
  constructor(x, y, width, height, boatPos, boatImg) {
   
    this.image = boatImg;
    this.speed = 0.01;
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;

    this.boatPosition = boatPos;
    this.isBroken = false;

    World.add(world, this.body);
  }
  //animate() {
   // this.speed += 0.05;
  //}

  remove(index) {
    this.animation = brokenBoatAnimation;
    this.speed = 0.05;
    this.width = 70;
    this.height = 70;
    this.isBroken = true;
    Matter.Body.applyForce(this.body, {x:0, y: -1}, {x:0, y: -1});

    setTimeout(() => {
      Matter.World.remove(world, boats[index].body);
      boats.splice(index, 1);
    }, 3000);
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    //var index = floor(this.speed % this.image.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.boatPosition, this.width*2, this.height);
    noTint();
    pop();
  }
}
