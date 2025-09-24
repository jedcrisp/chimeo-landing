// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Pricing Toggle Functionality
const billingToggle = document.getElementById('billing-toggle');
const priceAmounts = document.querySelectorAll('.amount');

billingToggle.addEventListener('change', function() {
    priceAmounts.forEach(amount => {
        const monthlyPrice = amount.getAttribute('data-monthly');
        const annualPrice = amount.getAttribute('data-annual');
        
        if (this.checked) {
            // Switch to annual pricing
            amount.textContent = annualPrice;
        } else {
            // Switch to monthly pricing
            amount.textContent = monthlyPrice;
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .team-member, .mv-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Add click handler to question
        question.style.cursor = 'pointer';
        question.style.position = 'relative';
        
        // Add plus/minus icon
        const icon = document.createElement('span');
        icon.innerHTML = '+';
        icon.style.position = 'absolute';
        icon.style.right = '0';
        icon.style.top = '0';
        icon.style.fontSize = '1.5rem';
        icon.style.fontWeight = 'bold';
        icon.style.color = '#6366f1';
        question.appendChild(icon);
        
        // Initially hide answer
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            
            if (isOpen) {
                answer.style.maxHeight = '0';
                icon.innerHTML = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.innerHTML = '−';
            }
        });
    });
});

// Form validation and submission (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Add loading states to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    // Remove loading state after 2 seconds (adjust as needed)
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Add click handlers to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Start') || button.textContent.includes('Get Started')) {
            button.addEventListener('click', (e) => {
                // Add loading state
                addLoadingState(button);
                
                // Here you would typically handle the actual signup/redirect
                // For now, we'll just prevent the default action
                e.preventDefault();
                
                // Simulate redirect after loading
                setTimeout(() => {
                    // window.location.href = 'signup.html'; // Uncomment when signup page exists
                    console.log('Redirecting to signup...');
                }, 2000);
            });
        }
    });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .team-member, .mv-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
});

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #6366f1;
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #6366f1';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Performance optimization: Lazy load images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Stripe Payment Integration
document.addEventListener('DOMContentLoaded', function() {
    // Handle Stripe payment buttons
    const stripeButtons = document.querySelectorAll('.stripe-button');
    
    stripeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            
            if (plan === 'free') {
                // Handle free trial signup
                handleFreeTrial();
            } else {
                // Handle paid subscription - redirect to Stripe Checkout
                handlePaidSubscription(plan, price);
            }
        });
    });
    
    function handleFreeTrial() {
        // Redirect to signup page
        window.location.href = 'https://chimeo.app/signup?plan=free';
    }
    
    function handlePaidSubscription(plan, price) {
        // Add loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
        
        // Stripe Payment Links (create these in Stripe Dashboard > Payment Links)
        const stripePaymentLinks = {
            pro: {
                monthly: 'https://buy.stripe.com/test_6oU8wO45c73J1bj0W5eAg00', // Your Pro monthly payment link
                annual: 'https://buy.stripe.com/test_0987654321fedcba'    // Replace with your actual Pro annual payment link
            },
            premium: {
                monthly: 'https://buy.stripe.com/test_abcdef1234567890', // Replace with your actual Premium monthly payment link
                annual: 'https://buy.stripe.com/test_fedcba0987654321'    // Replace with your actual Premium annual payment link
            }
        };
        
        // Check if annual billing is selected
        const billingToggle = document.getElementById('billing-toggle');
        const isAnnual = billingToggle ? billingToggle.checked : false;
        
        // Redirect to Stripe Payment Link
        if (stripePaymentLinks[plan]) {
            const billingType = isAnnual ? 'annual' : 'monthly';
            const paymentLink = stripePaymentLinks[plan][billingType];
            
            // Check if it's a real payment link (not placeholder)
            if (paymentLink && !paymentLink.includes('test_1234567890abcdef') && !paymentLink.includes('test_0987654321fedcba') && !paymentLink.includes('test_abcdef1234567890') && !paymentLink.includes('test_fedcba0987654321')) {
                window.location.href = paymentLink;
            } else {
                // Fallback: redirect to checkout page
                window.location.href = `checkout.html?plan=${plan}&price=${price}`;
            }
        } else {
            // Fallback: redirect to checkout page
            window.location.href = `checkout.html?plan=${plan}&price=${price}`;
        }
        
        // Re-enable button after 2 seconds if redirect fails
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }
});
