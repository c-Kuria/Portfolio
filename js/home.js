document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.querySelector('.moon');
    const sunIcon = document.querySelector('.sun')

    //check for saved theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark')
    } else {
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme)
        updateThemeIcon(prefersDarkScheme.matches)
    }


    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme)
        updateThemeIcon(newTheme === 'dark')
    })

    function updateThemeIcon(isDark) {
        if (isDark) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }
})

// Testimonial slider
const testimonialSlider = document.querySelector('.testimonial-slider');
let isDown = false;
let startX;
let scrollLeft;

testimonialSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - testimonialSlider.offsetLeft;
    scrollLeft = testimonialSlider.scrollLeft;
});

testimonialSlider.addEventListener('mouseleave', () => {
    isDown = false;
});

testimonialSlider.addEventListener('mouseup', () => {
    isDown = false;
});

testimonialSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = (x - startX) * 3;
    testimonialSlider.scrollLeft = scrollLeft - walk;
});

 // Form submission handling
 const contactForm = document.getElementById('contact-form');

 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();

     // Here you would typically send the form data to a server
     // For this example, we'll just log the form data to the console
     const formData = new FormData(contactForm);
     console.log('Form submitted with the following data:');
     for (let [key, value] of formData.entries()) {
         console.log(`${key}: ${value}`);
     }

     // Clear the form fields
     contactForm.reset();

     // Show a success message
     const successMessage = document.createElement('div');
     successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
     successMessage.classList.add('success-message');
     contactForm.appendChild(successMessage);

     // Remove the success message after 5 seconds
     setTimeout(() => {
         successMessage.remove();
     }, 5000);
 });


 // Smooth scrolling for navigation links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});