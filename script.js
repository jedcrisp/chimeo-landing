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
            const requiresOrg = this.getAttribute('data-requires-org');
            
            if (plan === 'free') {
                // Handle free trial signup - now also requires org request
                checkOrgRequestStatus(plan, price);
            } else if (requiresOrg === 'true') {
                // Check if organization request is required
                checkOrgRequestStatus(plan, price);
            } else {
                // Handle paid subscription - redirect to Stripe Checkout
                handlePaidSubscription(plan, price);
            }
        });
    });
    
    // Handle organization request form submission
    const orgForm = document.getElementById('org-request-form');
    if (orgForm) {
        orgForm.addEventListener('submit', handleOrgRequestSubmission);
        
        // Handle organization type change
        const orgTypeSelect = document.getElementById('org-type');
        const otherOrgTypeGroup = document.getElementById('other-org-type-group');
        const otherOrgTypeInput = document.getElementById('other-org-type');
        
        if (orgTypeSelect && otherOrgTypeGroup && otherOrgTypeInput) {
            orgTypeSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    otherOrgTypeGroup.style.display = 'block';
                    otherOrgTypeGroup.classList.add('show');
                    otherOrgTypeInput.required = true;
                    // Focus on the input field for better UX
                    setTimeout(() => otherOrgTypeInput.focus(), 100);
                } else {
                    otherOrgTypeGroup.style.display = 'none';
                    otherOrgTypeGroup.classList.remove('show');
                    otherOrgTypeInput.required = false;
                    otherOrgTypeInput.value = '';
                }
            });
        }
    }
    
    function handleFreeTrial() {
        // Redirect to signup page
        window.location.href = 'https://chimeo.app/signup?plan=free';
    }

    function checkOrgRequestStatus(plan, price) {
        // Check if user has already submitted organization request
        const orgRequestSubmitted = localStorage.getItem('orgRequestSubmitted');
        const orgRequestEmail = localStorage.getItem('orgRequestEmail');
        
        if (orgRequestSubmitted && orgRequestEmail) {
            // Check if organization request was approved
            checkOrgApprovalStatus(orgRequestEmail, plan, price);
        } else {
            // Redirect to organization request form (required for all users)
            window.location.href = `org-request.html?plan=${plan}&price=${price}`;
        }
    }

    function checkOrgApprovalStatus(email, plan, price) {
        // In a real implementation, this would check with your backend
        // For now, we'll simulate checking approval status
        const orgApproved = localStorage.getItem(`orgApproved_${email}`);
        
        if (orgApproved === 'true') {
            // Organization approved, proceed to payment
            handlePaidSubscription(plan, price);
        } else {
            // Organization not yet approved, show pending message
            showOrgPendingMessage();
        }
    }

    function showOrgPendingMessage() {
        alert('Your organization request is still being reviewed. You will receive an email once it\'s approved and you can proceed with your subscription.');
    }

    // Handle organization request form submission
    async function handleOrgRequestSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const orgData = Object.fromEntries(formData.entries());
        
        // Validate required fields
        const requiredFields = ['orgName', 'orgType', 'orgStreet', 'orgCity', 'orgState', 'orgZip', 'contactName', 'officeEmail', 'contactEmail', 'contactPhone', 'orgSize', 'expectedUsage', 'useCase', 'termsAgreement'];
        const missingFields = requiredFields.filter(field => !orgData[field]);
        
        // If "other" is selected, also require the otherOrgType field
        if (orgData.orgType === 'other' && !orgData.otherOrgType) {
            missingFields.push('otherOrgType');
        }
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields.');
            return;
        }
        
        try {
            // Show loading state
            const submitBtn = form.querySelector('.org-request-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';
            submitBtn.disabled = true;
            
            // Store in Firestore
            if (window.db) {
                // Process organization type - if "other" is selected, use the custom input
                const finalOrgType = orgData.orgType === 'other' ? orgData.otherOrgType : orgData.orgType;
                
                // Combine address fields for full address
                const fullAddress = `${orgData.orgStreet}, ${orgData.orgCity}, ${orgData.orgState} ${orgData.orgZip}`;
                
                const orgRequestData = {
                    ...orgData,
                    orgType: finalOrgType, // Use the processed organization type
                    originalOrgType: orgData.orgType, // Keep original selection for reference
                    orgAddress: fullAddress, // Combined full address
                    // Keep individual address fields for better data structure
                    address: {
                        street: orgData.orgStreet,
                        city: orgData.orgCity,
                        state: orgData.orgState,
                        zip: orgData.orgZip
                    },
                    status: 'pending',
                    submittedAt: window.serverTimestamp(),
                    trialStartDate: null,
                    trialEndDate: null,
                    currentTier: 'none',
                    approvedAt: null,
                    approvedBy: null
                };
                
                const docRef = await window.addDoc(window.collection(window.db, 'organizationRequests'), orgRequestData);
                console.log('Organization request submitted with ID:', docRef.id);
                
                // Store locally for immediate UI updates
                localStorage.setItem('orgRequestSubmitted', 'true');
                localStorage.setItem('orgRequestEmail', orgData.contactEmail);
                localStorage.setItem('orgRequestId', docRef.id);
                localStorage.setItem('orgRequestData', JSON.stringify(orgData));
                
                // Store organization request for approval
                await storeOrganizationRequest(orgData, docRef.id);
            } else {
                // Fallback to localStorage if Firestore not available
                localStorage.setItem('orgRequestSubmitted', 'true');
                localStorage.setItem('orgRequestEmail', orgData.contactEmail);
                localStorage.setItem('orgRequestData', JSON.stringify(orgData));
                showOrgRequestSuccess();
            }
        } catch (error) {
            console.error('Error submitting organization request:', error);
            alert('There was an error submitting your request. Please try again.');
            
            // Reset button
            const submitBtn = form.querySelector('.org-request-btn');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    function showOrgRequestSuccess() {
        const successMessage = `
            <div style="text-align: center; padding: 2rem; background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 12px; margin: 2rem 0;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #0ea5e9; margin-bottom: 1rem;"></i>
                <h2 style="color: #0c4a6e; margin-bottom: 1rem;">Organization Request Submitted!</h2>
                <p style="color: #0c4a6e; margin-bottom: 1.5rem;">Thank you for your interest in Chimeo. We'll review your organization request within 24-72 hours and send you an email with next steps.</p>
                <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
                    <i class="fas fa-gift" style="color: #10b981; margin-right: 0.5rem;"></i>
                    <strong style="color: #065f46;">Once approved, you'll receive a 30-day Premium trial!</strong>
                </div>
                <button onclick="window.location.href='pricing.html'" style="background: #0ea5e9; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    Return to Pricing
                </button>
            </div>
        `;
        
        document.querySelector('.org-request-content').innerHTML = successMessage;
    }

    // Send email notification to admin about new organization request
    async function sendOrgRequestNotification(orgData, requestId) {
        // In a real implementation, this would call your backend API
        // to send an email to the admin about the new request
        console.log('Sending notification to admin about request:', requestId);
        
        // For now, just log the notification
        const notificationData = {
            type: 'new_org_request',
            requestId: requestId,
            organizationName: orgData.orgName,
            contactName: orgData.contactName,
            officeEmail: orgData.officeEmail,
            adminEmail: orgData.contactEmail,
            orgType: orgData.orgType,
            submittedAt: new Date().toISOString()
        };
        
        console.log('Admin notification data:', notificationData);
    }

    // Check organization approval status from Firestore
    async function checkOrgApprovalStatus(email, plan, price) {
        try {
            if (window.db) {
                // Query Firestore for organization request by email
                const orgRequestsRef = window.collection(window.db, 'organizationRequests');
                const querySnapshot = await orgRequestsRef.where('contactEmail', '==', email).get();
                
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const orgData = doc.data();
                    
                    if (orgData.status === 'approved') {
                        // Organization approved, check trial status
                        await handleApprovedOrganization(orgData, doc.id, plan, price);
                    } else if (orgData.status === 'pending') {
                        showOrgPendingMessage();
                    } else if (orgData.status === 'rejected') {
                        showOrgRejectedMessage();
                    }
                } else {
                    // No organization request found, redirect to form
                    window.location.href = `org-request.html?plan=${plan}&price=${price}`;
                }
            } else {
                // Fallback to localStorage
                const orgApproved = localStorage.getItem(`orgApproved_${email}`);
                if (orgApproved === 'true') {
                    handlePaidSubscription(plan, price);
                } else {
                    showOrgPendingMessage();
                }
            }
        } catch (error) {
            console.error('Error checking approval status:', error);
            showOrgPendingMessage();
        }
    }

    // Store organization request for approval
    async function storeOrganizationRequest(orgData, requestId) {
        // Send email notification to admin about new organization request
        await sendOrgRequestNotification(orgData, requestId);
        
        // Show success message
        showOrgRequestSuccess();
    }

    // Handle organization request - automatically start 30-day Premium trial
    async function handleOrganizationRequest(orgData, requestId) {
        const now = new Date();
        const trialEndDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
        
        try {
            if (window.db) {
                // Update organization request with trial information
                const orgRequestRef = window.doc(window.db, 'organizationRequests', requestId);
                await window.updateDoc(orgRequestRef, {
                    status: 'approved',
                    currentTier: 'premium_trial',
                    trialStartDate: window.serverTimestamp(),
                    trialEndDate: trialEndDate,
                    approvedAt: window.serverTimestamp(),
                    approvedBy: 'automatic' // Automatic approval
                });
                
                // Create user account in Firestore
                const userData = {
                    email: orgData.contactEmail,
                    organizationName: orgData.orgName,
                    organizationType: orgData.orgType,
                    currentTier: 'premium_trial',
                    trialStartDate: window.serverTimestamp(),
                    trialEndDate: trialEndDate,
                    subscriptionStatus: 'trial',
                    createdAt: window.serverTimestamp(),
                    lastLoginAt: window.serverTimestamp()
                };
                
                const userRef = window.doc(window.db, 'users', orgData.contactEmail);
                await window.setDoc(userRef, userData);
                
                // Send trial started email notification
                await sendTrialStartedNotification(orgData, trialEndDate);
                
                // Start trial expiration check
                scheduleTrialExpirationCheck(orgData.contactEmail, trialEndDate);
                
                // Show trial started message
                showTrialStartedMessage(orgData, trialEndDate);
            } else {
                // Fallback to localStorage
                localStorage.setItem(`orgApproved_${orgData.contactEmail}`, 'true');
                localStorage.setItem(`trialEndDate_${orgData.contactEmail}`, trialEndDate.toISOString());
                showTrialStartedMessage(orgData, trialEndDate);
            }
        } catch (error) {
            console.error('Error processing organization request:', error);
            alert('There was an error processing your request. Please try again.');
        }
    }

    // Send approval email notification
    async function sendApprovalNotification(orgData, trialEndDate) {
        // In a real implementation, this would call your backend API
        // to send an email to the organization contact
        console.log('Sending approval notification to:', orgData.contactEmail);
        
        const emailData = {
            to: orgData.contactEmail,
            subject: 'Your Chimeo Organization Request Has Been Approved!',
            template: 'org_approval',
            data: {
                organizationName: orgData.orgName,
                contactName: orgData.contactName,
                trialEndDate: trialEndDate.toLocaleDateString(),
                loginUrl: 'https://chimeo.app/login'
            }
        };
        
        console.log('Approval email data:', emailData);
    }

    // Show trial started message
    function showTrialStartedMessage(orgData, trialEndDate) {
        const trialMessage = `
            <div style="text-align: center; padding: 2rem; background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; margin: 2rem 0;">
                <i class="fas fa-rocket" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                <h2 style="color: #065f46; margin-bottom: 1rem;">Welcome to Chimeo!</h2>
                <p style="color: #065f46; margin-bottom: 1rem;">Your organization has been approved and you now have access to a 30-day Premium trial.</p>
                <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
                    <strong style="color: #065f46;">Trial ends: ${trialEndDate.toLocaleDateString()}</strong>
                </div>
                <div style="background: #fef3c7; border: 1px solid #d97706; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
                    <i class="fas fa-info-circle" style="color: #d97706; margin-right: 0.5rem;"></i>
                    <strong style="color: #92400e;">After your trial, you'll need to choose a Pro or Premium plan to continue using Chimeo.</strong>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
                    <button onclick="window.location.href='https://chimeo.app/login'" style="background: #10b981; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Start Your Trial
                        <br><small style="font-size: 0.8rem; opacity: 0.9;">From the web or iOS app</small>
                    </button>
                    <button onclick="window.location.href='pricing.html'" style="background: #6b7280; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        View Pricing Plans
                    </button>
                </div>
            </div>
        `;
        
        document.querySelector('.org-request-content').innerHTML = trialMessage;
    }

    // Schedule trial expiration check
    function scheduleTrialExpirationCheck(email, trialEndDate) {
        const now = new Date();
        const timeUntilExpiration = trialEndDate.getTime() - now.getTime();
        
        if (timeUntilExpiration > 0) {
            setTimeout(async () => {
                await checkTrialExpiration(email);
            }, timeUntilExpiration);
        }
    }

    // Check if trial has expired and require payment
    async function checkTrialExpiration(email) {
        try {
            if (window.db) {
                const userRef = window.doc(window.db, 'users', email);
                const userDoc = await window.getDoc(userRef);
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const now = new Date();
                    const trialEndDate = userData.trialEndDate.toDate();
                    
                    if (now > trialEndDate && userData.currentTier === 'premium_trial') {
                        // Mark trial as expired and require payment
                        await window.updateDoc(userRef, {
                            currentTier: 'trial_expired',
                            subscriptionStatus: 'trial_expired',
                            trialExpiredAt: window.serverTimestamp()
                        });
                        
                        // Send payment required notification
                        await sendPaymentRequiredNotification(email, userData.organizationName);
                        
                        console.log('Trial expired for user:', email, '- Payment required');
                    }
                }
            }
        } catch (error) {
            console.error('Error checking trial expiration:', error);
        }
    }

    // Send trial started notification
    async function sendTrialStartedNotification(orgData, trialEndDate) {
        // In a real implementation, this would call your backend API
        console.log('Sending trial started notification to:', orgData.contactEmail);
        
        const emailData = {
            to: orgData.contactEmail,
            subject: 'Welcome to Chimeo! Your 30-Day Premium Trial Has Started',
            template: 'trial_started',
            data: {
                organizationName: orgData.orgName,
                contactName: orgData.contactName,
                trialEndDate: trialEndDate.toLocaleDateString(),
                loginUrl: 'https://chimeo.app/login'
            }
        };
        
        console.log('Trial started email data:', emailData);
    }

    // Send payment required notification
    async function sendPaymentRequiredNotification(email, organizationName) {
        // In a real implementation, this would call your backend API
        console.log('Sending payment required notification to:', email);
        
        const emailData = {
            to: email,
            subject: 'Your Chimeo Trial Has Ended - Choose Your Plan',
            template: 'payment_required',
            data: {
                organizationName: organizationName,
                pricingUrl: 'https://chimeo.app/pricing'
            }
        };
        
        console.log('Payment required email data:', emailData);
    }

    function showOrgRejectedMessage() {
        alert('Your organization request has been rejected. Please contact support for more information.');
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
            
            // For Pro monthly, always use Stripe
            if (plan === 'pro' && billingType === 'monthly') {
                window.location.href = 'https://buy.stripe.com/test_6oU8wO45c73J1bj0W5eAg00';
            } else if (paymentLink && !paymentLink.includes('test_1234567890abcdef')) {
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
