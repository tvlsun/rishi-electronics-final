// ========================================
// RISHI ELECTRONICS - INTERACTIVE JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initNavigation();
    initBookingForm();
    initSmoothScroll();
    initDatePicker();
    initScrollEffects();
    initTechAnimation();
});

//* ========================================
   TECH BACKGROUND ANIMATION
    ======================================== */
const initTechAnimation = () => {
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60;
    const connectionDistance = 150;
    const speed = 0.5;

    // Resize handling
    const resize = () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    };

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * speed;
            this.vy = (Math.random() - 0.5) * speed;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'; // Light Blue
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize Particles
    const initParticles = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    };

    // Animation Loop
    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)'; // Faint Blue Lines
        ctx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    };

    // Start everything
    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    resize();
    initParticles();
    animate();
};

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');

            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active')
                ? 'rotate(45deg) translate(5px, 5px)'
                : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active')
                ? 'rotate(-45deg) translate(7px, -6px)'
                : 'none';
        });
    }

    // Close mobile menu when clicking a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');

            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// BOOKING FORM
// ========================================

function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    const modal = document.getElementById('confirmationModal');
    const modalClose = document.getElementById('modalClose');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Get form data
            const formData = getFormData();

            // In a production environment, you would send this data to a server
            // For now, we'll just show the confirmation modal
            console.log('Booking Data:', formData);

            // Show confirmation modal
            showConfirmationModal();

            // Reset form
            bookingForm.reset();
        });
    }

    // Modal close button
    if (modalClose) {
        modalClose.addEventListener('click', function () {
            hideConfirmationModal();
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                hideConfirmationModal();
            }
        });
    }
}

function validateForm() {
    const form = document.getElementById('bookingForm');
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showInputError(input, 'This field is required');
            isValid = false;
        } else {
            clearInputError(input);
        }
    });

    // Validate phone number
    const phoneInput = document.getElementById('phone');
    const phonePattern = /^[0-9]{10}$/;
    if (phoneInput.value && !phonePattern.test(phoneInput.value)) {
        showInputError(phoneInput, 'Please enter a valid 10-digit phone number');
        isValid = false;
    }

    // Validate email if provided
    const emailInput = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailPattern.test(emailInput.value)) {
        showInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate date (must be today or future)
    const dateInput = document.getElementById('date');
    if (dateInput.value) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showInputError(dateInput, 'Please select today or a future date');
            isValid = false;
        }
    }

    return isValid;
}

function showInputError(input, message) {
    // Remove existing error
    clearInputError(input);

    // Add error styling
    input.style.borderColor = '#ef4444';

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    // Insert error message
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '';
}

function getFormData() {
    return {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        device: document.getElementById('device').value,
        problem: document.getElementById('problem').value,
        timestamp: new Date().toISOString()
    };
}

function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// DATE PICKER
// ========================================

function initDatePicker() {
    const dateInput = document.getElementById('date');

    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        // Set maximum date to 30 days from now
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
}

// ========================================
// SCROLL EFFECTS
// ========================================

function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========================================
// FORM INPUT ENHANCEMENTS
// ========================================

// Add real-time validation feedback
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookingForm');

    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            // Clear error on focus
            input.addEventListener('focus', function () {
                clearInputError(this);
            });

            // Validate on blur for required fields
            if (input.hasAttribute('required')) {
                input.addEventListener('blur', function () {
                    if (!this.value.trim()) {
                        // Don't show error on first blur, only after form submission attempt
                        return;
                    }

                    // Validate specific fields
                    if (this.id === 'phone') {
                        const phonePattern = /^[0-9]{10}$/;
                        if (!phonePattern.test(this.value)) {
                            showInputError(this, 'Please enter a valid 10-digit phone number');
                        }
                    } else if (this.id === 'email' && this.value) {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(this.value)) {
                            showInputError(this, 'Please enter a valid email address');
                        }
                    }
                });
            }
        });
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format phone number as user types
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        // Remove any non-digit characters
        this.value = this.value.replace(/\D/g, '');

        // Limit to 10 digits
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });
}

// Service selection change handler
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', function () {
        // You could add service-specific fields or messages here
        console.log('Selected service:', this.value);
    });
}

// ========================================
// CONSOLE GREETING
// ========================================

console.log('%c👋 Welcome to Rishi Electronics!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cFor the best electronics repair services, book your appointment through our website.', 'color: #374151;');
