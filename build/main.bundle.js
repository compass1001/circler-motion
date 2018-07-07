'use strict';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var colorArray = ['#133046', '#15959F', '#15959F', '#EC9770', '#C7402D'];

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Particle(x, y, radius, dx, dy, radian, color) {
    var _this = this;

    this.x = x;
    this.y = y;
    this.distanceFromCenter = Math.floor(Math.random() * 60) + 80;
    this.radius = Math.random() * 10;
    this.radian = Math.random() * 2 * Math.PI * 100;
    this.velocity = 0.05;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.lastMouse = {
        x: x,
        y: y
    };

    this.draw = function (position) {
        ctx.strokeStyle = _this.color;
        _this.radian += _this.velocity;

        //Drag
        _this.lastMouse.x += (mouse.x - _this.lastMouse.x) * 0.05;
        _this.lastMouse.y += (mouse.y - _this.lastMouse.y) * 0.05;

        //Circler Motion
        _this.x = _this.lastMouse.x + Math.cos(_this.radian) * _this.distanceFromCenter;
        _this.y = _this.lastMouse.y + Math.sin(_this.radian) * _this.distanceFromCenter;
        ctx.beginPath();
        ctx.lineWidth = _this.radius;
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(_this.x, _this.y);
        ctx.stroke();
        ctx.closePath();
    };

    this.update = function () {
        var lastPosition = {
            x: _this.x,
            y: _this.y
        };
        _this.draw(lastPosition);
    };
}

var particle = new Particle();

var particles = [];

for (var i = 0; i < 100; i++) {
    particles.push(new Particle(canvas.width / 2, canvas.height / 2));
}

// particles.forEach(particle => {
//     particle.draw();
// })

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (particle) {
        particle.update();
    });
}

animate();
