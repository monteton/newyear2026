document.addEventListener('DOMContentLoaded', () => {
    // Snow Effect
    const canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const flakes = [];
    const maxFlakes = 50; // Reduced density

    class Flake {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 8 + 8; // Size 8px to 16px to be visible as flakes
            this.speed = Math.random() * 0.5 + 0.25;
            this.opacity = Math.random() * 0.3 + 0.6; // High opacity (0.6-0.9) to shine through overlay
            this.rotation = Math.random() * 360;
            this.spin = (Math.random() - 0.5) * 2; // Random spin direction and speed
        }

        update() {
            this.y += this.speed;
            this.rotation += this.spin;
            if (this.y > height) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.font = `${this.size}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('❄', 0, 0);
            ctx.restore();
        }
    }

    for (let i = 0; i < maxFlakes; i++) {
        flakes.push(new Flake());
    }

    function animateSnow() {
        ctx.clearRect(0, 0, width, height);
        flakes.forEach(flake => {
            flake.update();
            flake.draw();
        });
        requestAnimationFrame(animateSnow);
    }

    animateSnow();

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    // Modal Logic
    const modal = document.getElementById('confirmation-modal');
    const checkbox = document.getElementById('agree-checkbox');
    const proceedBtn = document.getElementById('modal-proceed');
    const closeX = document.getElementById('modal-close-x');
    let currentLink = null; // To store the link of the clicked button

    // Open modal on Buy button click
    document.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real scenario, you'd get the link from the button, e.g., btn.dataset.link
            // currentLink = btn.dataset.link; 
            modal.classList.remove('hidden');
        });
    });

    // Close modal function
    function closeModal() {
        modal.classList.add('hidden');
        checkbox.checked = false;
        proceedBtn.disabled = true;
    }

    // Close on X click
    closeX.addEventListener('click', closeModal);

    // Checkbox toggle
    checkbox.addEventListener('change', () => {
        proceedBtn.disabled = !checkbox.checked;
    });

    // Proceed action
    proceedBtn.addEventListener('click', () => {
        if (checkbox.checked) {
            // Here you would redirect to the stored link
            // if (currentLink) window.location.href = currentLink;

            alert('Переход к оплате...'); // Placeholder for now
            closeModal();
        }
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});




function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        button.textContent = 'СВЕРНУТЬ';
    } else {
        details.classList.add('hidden');
        button.textContent = 'ПОДРОБНЕЕ О ПРОГРАММЕ';
    }
}

function toggleFAQ(button) {
    button.classList.toggle('active');
    const answer = button.nextElementSibling;
}
