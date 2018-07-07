const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const colorArray = [
    '#133046',
	'#15959F',
	'#15959F',
	'#EC9770',
	'#C7402D'
];

const mouse = {
    x : canvas.width/2,
    y : canvas.height/2
}

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

function Particle(x,y,radius,dx,dy,radian,color){
    this.x = x;
    this.y = y;
    this.distanceFromCenter = Math.floor(Math.random() * 60) + 80;
    this.radius = Math.random() * 10;
    this.radian = Math.random() * 2 * Math.PI * 100;
    this.velocity = 0.05;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.lastMouse = {
        x : x,
        y : y
    }

    this.draw = (position) => {
        ctx.strokeStyle = this.color;
        this.radian += this.velocity;


        //Drag
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //Circler Motion
        this.x = this.lastMouse.x + Math.cos(this.radian) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radian) * this.distanceFromCenter;
        ctx.beginPath();
        ctx.lineWidth = this.radius;
        ctx.moveTo(position.x,position.y);
        ctx.lineTo(this.x,this.y);
        ctx.stroke();
        ctx.closePath();
    }

    this.update = () => {
        const lastPosition = {
            x : this.x,
            y : this.y
        }
        this.draw(lastPosition);
    }
}


var particle = new Particle();

let particles = [];

for(let i = 0; i < 100; i++){
    particles.push(new Particle(canvas.width/2, canvas.height/2));
}

// particles.forEach(particle => {
//     particle.draw();
// })

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(particle => {
        particle.update();
    })
}

animate();
