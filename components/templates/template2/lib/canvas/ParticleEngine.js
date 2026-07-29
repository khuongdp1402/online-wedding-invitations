import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particle } from './Particle';

gsap.registerPlugin(ScrollTrigger);

export class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.scrollVelocity = 0;
    this.isActive = true;
    this.particleCount = window.innerWidth < 768 ? 35 : 60; // Reduced for performance and aesthetics

    this.init();
    this.bindEvents();
    this.start();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize = () => {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // Scale for Retina displays
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    
    this.ctx.scale(dpr, dpr);

    // Dynamic particle count adjustment
    const targetParticleCount = this.width < 768 ? 35 : 60;
    if (this.particleCount !== targetParticleCount) {
      this.particleCount = targetParticleCount;
      this.createParticles();
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.width, this.height));
    }
  }

  bindEvents() {
    window.addEventListener('resize', this.resize);
    
    // Custom Events for Transitions
    window.addEventListener('canvas:launch', this.handleLaunch);
    window.addEventListener('canvas:gravityPull', this.handleGravityPull);

    this.scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        let v = self.getVelocity() / 300;
        this.scrollVelocity = Math.max(-2, Math.min(v, 5));
      }
    });
  }

  handleLaunch = () => {
    // Tăng vọt lượng hạt bụi tạo sương mù
    const extraParticles = 200;
    for (let i = 0; i < extraParticles; i++) {
      const p = new Particle(this.width, this.height);
      // Ép vị trí ở dưới đáy màn hình để bay dồn dập lên
      p.y = this.height + Math.random() * 500;
      this.particles.push(p);
    }
    
    // Đặt lịch để các hạt dư bắt đầu "chết" sau 2 giây
    setTimeout(() => {
      if (!this.isActive) return;
      // Đánh dấu isDead cho các hạt từ index = particleCount trở đi
      for (let i = this.particleCount; i < this.particles.length; i++) {
        this.particles[i].isDead = true;
      }
    }, 2000);
  }

  handleGravityPull = () => {
    // Hạt bụi bị hút vào tâm (hoặc biến mất)
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].isDead = true;
      // Tăng vận tốc vọt lên để tạo cảm giác bị hút
      this.particles[i].baseSpeed *= 3;
    }
  }

  render = () => {
    if (!this.isActive) return;

    this.scrollVelocity *= 0.9;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Lặp ngược mảng để an toàn khi splice
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      const isAlive = p.update(this.scrollVelocity, this.width, this.height);
      
      if (!isAlive) {
        this.particles.splice(i, 1);
      } else {
        p.draw(this.ctx);
      }
    }
  }

  start() {
    gsap.ticker.add(this.render);
  }

  destroy() {
    this.isActive = false;
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('canvas:launch', this.handleLaunch);
    window.removeEventListener('canvas:gravityPull', this.handleGravityPull);
    gsap.ticker.remove(this.render);
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
  }
}
