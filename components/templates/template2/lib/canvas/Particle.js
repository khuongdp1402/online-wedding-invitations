export class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.reset(canvasWidth, canvasHeight, true);
  }

  reset(canvasWidth, canvasHeight, isInit = false) {
    this.x = Math.random() * canvasWidth;
    // If it's the first initialization, spawn them randomly across the screen.
    // If it's a recycle (isInit = false), spawn them at the top.
    this.y = isInit ? Math.random() * canvasHeight : Math.random() * -100;
    // Size between 1 and 3 for bling effect
    this.radius = Math.random() * 2 + 1;
    this.width = this.radius;
    this.height = this.radius * 2;
    
    // Alpha between 0.3 and 0.9
    this.alpha = Math.random() * 0.6 + 0.3;
    
    // Base speed moving down (Y axis)
    this.baseSpeed = Math.random() * 1.0 + 0.5;
    
    // Sine wave parameters for X axis swinging
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = Math.random() * 0.02 + 0.01;
    this.amplitude = Math.random() * 1 + 0.5;
    
    // Petal rotation
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    
    // Color palette: Dark Red / Gold / Beige
    const colors = [
      [122, 31, 36],   // #7a1f24 (Dark Red)
      [212, 175, 55],  // #D4AF37 (Gold)
      [253, 245, 230]  // #FDF5E6 (Beige)
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Death flag for transition effects
    this.isDead = false;
  }

  update(scrollVelocity, canvasWidth, canvasHeight) {
    // Move down (gravity)
    this.y += (this.baseSpeed + scrollVelocity * 0.5);
    
    // Swing left and right
    this.angle += this.angleSpeed;
    this.x += Math.sin(this.angle) * this.amplitude;
    
    // Spin the petal
    this.rotation += this.rotationSpeed;
    
    // Bling flicker effect
    this.alpha += (Math.random() - 0.5) * 0.1;
    if (this.alpha > 0.9) this.alpha = 0.9;
    if (this.alpha < 0.2) this.alpha = 0.2;

    // Wrap around horizontally if they drift off screen
    if (this.x < -10) this.x = canvasWidth + 10;
    if (this.x > canvasWidth + 10) this.x = -10;

    // Accumulate at the bottom
    if (this.y > canvasHeight - 100) {
      this.baseSpeed = 0;
      this.angleSpeed = 0;
      this.rotationSpeed = 0;
      this.alpha -= 0.005;
      
      if (this.alpha <= 0) {
        if (this.isDead) return false;
        this.reset(canvasWidth, canvasHeight, false);
      }
    } else if (this.y < -100) {
      // Recycle if it goes way above the screen
      if (this.isDead) return false;
      this.reset(canvasWidth, canvasHeight, false);
    }
    
    return true; // Keep this particle alive
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    
    // Draw Rhombus (Hình Thoi)
    const r = this.radius * 2;
    ctx.moveTo(0, -r);
    ctx.lineTo(r * 0.7, 0);
    ctx.lineTo(0, r);
    ctx.lineTo(-r * 0.7, 0);
    ctx.closePath();
    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.4)`;
    ctx.fill();
    ctx.restore();
  }
}
