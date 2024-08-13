document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('dynamicImage');
    const title = document.getElementById('title');
    const track1 = document.getElementById('track1');
    const track2 = document.getElementById('track2');
    const body = document.body;
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');

    // Function to play track1 and stop track2
    function playTrack1() {
        track1.play();
        track2.pause();
        track2.currentTime = 0; // Reset track2 to the beginning
    }

    // Function to play track2 and stop track1
    function playTrack2() {
        track2.play();
        track1.pause();
        track1.currentTime = 0; // Reset track1 to the beginning
    }

    // Play track1 initially
    playTrack1();

    // Fireworks animation
    function createFireworks() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const particles = [];
        
        function Particle(x, y, color, speed, direction) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.speed = speed;
            this.direction = direction;
            this.size = Math.random() * 5 + 1;
            this.life = 0;
        }

        Particle.prototype.update = function() {
            this.x += this.speed * Math.cos(this.direction);
            this.y += this.speed * Math.sin(this.direction);
            this.life++;
        }

        Particle.prototype.draw = function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        function generateFireworks(x, y) {
            for (let i = 0; i < 100; i++) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const speed = Math.random() * 5 + 1;
                const direction = Math.random() * Math.PI * 2;
                particles.push(new Particle(x, y, color, speed, direction));
            }
        }

        function animateFireworks() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            particles.filter(p => p.life < 100); // Remove old particles
            requestAnimationFrame(animateFireworks);
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        image.addEventListener('mouseover', () => {
            generateFireworks(image.offsetLeft + image.width / 2, image.offsetTop + image.height / 2);
            canvas.style.display = 'block';
            animateFireworks();
        });

        image.addEventListener('mouseout', () => {
            canvas.style.display = 'none';
            particles.length = 0; // Clear particles
        });
    }

    createFireworks();

    image.addEventListener('mouseover', () => {
        image.src = './happy.jpg'; // Change to the new image on hover
        image.classList.add('hover-effect'); // Apply the hover effect class
        body.classList.add('hover-background'); // Add the rainbow background animation
        title.classList.add('hidden'); // Hide the title on hover
        playTrack2(); // Play track2 and stop track1
    });

    image.addEventListener('mouseout', () => {
        image.src = './sad.jpg'; // Revert back to the original image when not hovering
        image.classList.remove('hover-effect'); // Remove the hover effect class
        body.classList.remove('hover-background'); // Remove the rainbow background animation
        title.classList.remove('hidden'); // Show the title when not hovering
        playTrack1(); // Play track1 and stop track2
    });
});
