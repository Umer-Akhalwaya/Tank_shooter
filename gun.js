class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannon_image = loadImage("gunr0000.png");
    this.cannon_base = loadImage("man0000.png");
  }
  display() {
    if (keyIsDown(RIGHT_ARROW) && this.angle<50  ) {
      this.angle += 1;
    }

    if (keyIsDown(LEFT_ARROW) && this.angle>-0 ) {
      this.angle -= 1;
    }


    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannon_image, 0, 0, this.width*1.2, this.height*2.1);
    
    pop();

    image(this.cannon_base, -30, height/2.6 , 300, 300);
    noFill();
  }
}
