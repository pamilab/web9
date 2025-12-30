// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Contact Form Handling with Database
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Submitting...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Use LeadGenRuntime to store data
                // This works because we defined the table in databaseSchema
                if (window.LeadGenRuntime && window.LeadGenRuntime.insertData) {
                    await window.LeadGenRuntime.insertData('inquiries', data);
                    alert('Thank you for your inquiry! Your message has been recorded.');
                    contactForm.reset();
                } else {
                    // Fallback if runtime isn't ready (just visual feedback)
                    console.log('Form data captured (demo mode):', data);
                    alert('Thank you! In a live environment, this would save to the database.');
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('There was an error submitting your message. Please try again.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});