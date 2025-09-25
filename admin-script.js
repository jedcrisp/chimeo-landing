// Admin Dashboard Script
let allRequests = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    loadOrganizationRequests();
    setupEventListeners();
});

function setupEventListeners() {
    // Status filter
    document.getElementById('status-filter').addEventListener('change', function(e) {
        currentFilter = e.target.value;
        filterRequests();
    });

    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('request-modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Approve/Reject buttons
    document.getElementById('approve-btn').addEventListener('click', approveRequest);
    document.getElementById('reject-btn').addEventListener('click', rejectRequest);
}

async function loadOrganizationRequests() {
    try {
        if (!window.db) {
            console.error('Firebase not initialized');
            showError('Firebase not initialized. Please check your configuration.');
            return;
        }

        const requestsRef = window.collection(window.db, 'organizationRequests');
        const q = window.query(requestsRef, window.orderBy('submittedAt', 'desc'));
        const querySnapshot = await window.getDocs(q);
        
        allRequests = [];
        querySnapshot.forEach((doc) => {
            allRequests.push({
                id: doc.id,
                ...doc.data()
            });
        });

        updateStats();
        renderRequests();
    } catch (error) {
        console.error('Error loading requests:', error);
        showError('Error loading organization requests. Please try again.');
    }
}

function updateStats() {
    const pending = allRequests.filter(req => req.status === 'pending').length;
    const approved = allRequests.filter(req => req.status === 'approved').length;
    const rejected = allRequests.filter(req => req.status === 'rejected').length;
    const trial = allRequests.filter(req => req.currentTier === 'premium_trial').length;

    document.getElementById('pending-count').textContent = pending;
    document.getElementById('approved-count').textContent = approved;
    document.getElementById('rejected-count').textContent = rejected;
    document.getElementById('trial-count').textContent = trial;
}

function filterRequests() {
    let filteredRequests = allRequests;
    
    if (currentFilter !== 'all') {
        filteredRequests = allRequests.filter(req => req.status === currentFilter);
    }
    
    renderRequests(filteredRequests);
}

function renderRequests(requests = null) {
    const requestsToRender = requests || allRequests;
    const requestsList = document.getElementById('requests-list');
    
    if (requestsToRender.length === 0) {
        requestsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No requests found</p>
            </div>
        `;
        return;
    }

    requestsList.innerHTML = requestsToRender.map(request => `
        <div class="request-card" data-request-id="${request.id}">
            <div class="request-header">
                <div class="org-info">
                    <h3>${request.orgName}</h3>
                    <p class="org-type">${formatOrgType(request.orgType)}</p>
                </div>
                <div class="request-status">
                    <span class="status-badge ${request.status}">${request.status}</span>
                </div>
            </div>
            <div class="request-details">
                <div class="detail-row">
                    <span class="label">Contact:</span>
                    <span class="value">${request.contactName} (${request.officeEmail || request.contactEmail})</span>
                </div>
                <div class="detail-row">
                    <span class="label">Size:</span>
                    <span class="value">${request.orgSize} members</span>
                </div>
                <div class="detail-row">
                    <span class="label">Expected Usage:</span>
                    <span class="value">${request.expectedUsage} alerts/month</span>
                </div>
                <div class="detail-row">
                    <span class="label">Submitted:</span>
                    <span class="value">${formatDate(request.submittedAt)}</span>
                </div>
            </div>
            <div class="request-actions">
                <button class="btn btn-outline view-details" data-request-id="${request.id}">
                    <i class="fas fa-eye"></i> View Details
                </button>
                ${request.status === 'pending' ? `
                    <button class="btn btn-danger reject-request" data-request-id="${request.id}">
                        <i class="fas fa-times"></i> Reject
                    </button>
                    <button class="btn btn-success approve-request" data-request-id="${request.id}">
                        <i class="fas fa-check"></i> Approve
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');

    // Add event listeners to action buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const requestId = e.target.closest('button').dataset.requestId;
            showRequestDetails(requestId);
        });
    });

    document.querySelectorAll('.approve-request').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const requestId = e.target.closest('button').dataset.requestId;
            approveRequest(requestId);
        });
    });

    document.querySelectorAll('.reject-request').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const requestId = e.target.closest('button').dataset.requestId;
            rejectRequest(requestId);
        });
    });
}

function showRequestDetails(requestId) {
    const request = allRequests.find(req => req.id === requestId);
    if (!request) return;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="request-detail">
            <div class="detail-section">
                <h3>Organization Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Organization Name:</label>
                        <span>${request.orgName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Organization Type:</label>
                        <span>${formatOrgType(request.orgType)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Organization Size:</label>
                        <span>${request.orgSize} members</span>
                    </div>
                    <div class="detail-item">
                        <label>Address:</label>
                        <span>${request.address ? 
                            `${request.address.street}, ${request.address.city}, ${request.address.state} ${request.address.zip}` : 
                            request.orgAddress || 'N/A'
                        }</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>Contact Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Contact Name:</label>
                        <span>${request.contactName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Office Email:</label>
                        <span>${request.officeEmail || request.contactEmail}</span>
                    </div>
                    <div class="detail-item">
                        <label>Admin Email:</label>
                        <span>${request.contactEmail}</span>
                    </div>
                    <div class="detail-item">
                        <label>Phone:</label>
                        <span>${request.contactPhone}</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>Usage Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Expected Usage:</label>
                        <span>${request.expectedUsage} alerts/month</span>
                    </div>
                    <div class="detail-item">
                        <label>Primary Use Case:</label>
                        <span>${formatUseCase(request.useCase)}</span>
                    </div>
                </div>
            </div>

            ${request.additionalInfo ? `
                <div class="detail-section">
                    <h3>Additional Information</h3>
                    <p>${request.additionalInfo}</p>
                </div>
            ` : ''}

            <div class="detail-section">
                <h3>Request Status</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="status-badge ${request.status}">${request.status}</span>
                    </div>
                    <div class="detail-item">
                        <label>Submitted:</label>
                        <span>${formatDate(request.submittedAt)}</span>
                    </div>
                    ${request.approvedAt ? `
                        <div class="detail-item">
                            <label>Approved:</label>
                            <span>${formatDate(request.approvedAt)}</span>
                        </div>
                    ` : ''}
                    ${request.approvedBy ? `
                        <div class="detail-item">
                            <label>Approved By:</label>
                            <span>${request.approvedBy}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // Store current request ID for approve/reject actions
    document.getElementById('approve-btn').dataset.requestId = requestId;
    document.getElementById('reject-btn').dataset.requestId = requestId;

    document.getElementById('request-modal').style.display = 'block';
}

async function approveRequest(requestId = null) {
    const id = requestId || document.getElementById('approve-btn').dataset.requestId;
    if (!id) return;

    const request = allRequests.find(req => req.id === id);
    if (!request) return;

    try {
        // Update request status
        const requestRef = window.doc(window.db, 'organizationRequests', id);
        await window.updateDoc(requestRef, {
            status: 'approved',
            approvedAt: window.serverTimestamp(),
            approvedBy: 'admin', // In real implementation, this would be the actual admin ID
            currentTier: 'premium_trial',
            trialStartDate: window.serverTimestamp(),
            trialEndDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)) // 30 days from now
        });

        // Create user account
        const userData = {
            email: request.contactEmail,
            organizationName: request.orgName,
            organizationType: request.orgType,
            currentTier: 'premium_trial',
            trialStartDate: window.serverTimestamp(),
            trialEndDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
            subscriptionStatus: 'trial',
            createdAt: window.serverTimestamp(),
            lastLoginAt: window.serverTimestamp()
        };

        const userRef = window.doc(window.db, 'users', request.contactEmail);
        await window.setDoc(userRef, userData);

        // Update local data
        const requestIndex = allRequests.findIndex(req => req.id === id);
        if (requestIndex !== -1) {
            allRequests[requestIndex].status = 'approved';
            allRequests[requestIndex].currentTier = 'premium_trial';
            allRequests[requestIndex].approvedAt = new Date();
            allRequests[requestIndex].approvedBy = 'admin';
        }

        // Send approval email (in real implementation)
        console.log('Sending approval email to:', request.contactEmail);

        updateStats();
        renderRequests();
        closeModal();

        showSuccess(`Organization "${request.orgName}" has been approved and granted a 30-day Premium trial!`);

    } catch (error) {
        console.error('Error approving request:', error);
        showError('Error approving request. Please try again.');
    }
}

async function rejectRequest(requestId = null) {
    const id = requestId || document.getElementById('reject-btn').dataset.requestId;
    if (!id) return;

    const request = allRequests.find(req => req.id === id);
    if (!request) return;

    const reason = prompt('Please provide a reason for rejection (optional):');
    
    try {
        // Update request status
        const requestRef = window.doc(window.db, 'organizationRequests', id);
        await window.updateDoc(requestRef, {
            status: 'rejected',
            rejectedAt: window.serverTimestamp(),
            rejectedBy: 'admin',
            rejectionReason: reason || 'No reason provided'
        });

        // Update local data
        const requestIndex = allRequests.findIndex(req => req.id === id);
        if (requestIndex !== -1) {
            allRequests[requestIndex].status = 'rejected';
            allRequests[requestIndex].rejectedAt = new Date();
            allRequests[requestIndex].rejectedBy = 'admin';
            allRequests[requestIndex].rejectionReason = reason || 'No reason provided';
        }

        // Send rejection email (in real implementation)
        console.log('Sending rejection email to:', request.contactEmail);

        updateStats();
        renderRequests();
        closeModal();

        showSuccess(`Organization "${request.orgName}" has been rejected.`);

    } catch (error) {
        console.error('Error rejecting request:', error);
        showError('Error rejecting request. Please try again.');
    }
}

function closeModal() {
    document.getElementById('request-modal').style.display = 'none';
}

function formatOrgType(type) {
    const types = {
        'school': 'School',
        'church': 'Church',
        'town-hall': 'Town Hall',
        'community-center': 'Community Center',
        'non-profit': 'Non-Profit',
        'business': 'Business',
        'other': 'Other'
    };
    // If it's not in our predefined list, it's likely a custom "other" type
    return types[type] || type;
}

function formatUseCase(useCase) {
    const cases = {
        'emergency-alerts': 'Emergency Alerts',
        'event-notifications': 'Event Notifications',
        'schedule-changes': 'Schedule Changes',
        'general-announcements': 'General Announcements',
        'multiple': 'Multiple Use Cases'
    };
    return cases[useCase] || useCase;
}

function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    
    let date;
    if (timestamp.toDate) {
        date = timestamp.toDate();
    } else if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
    } else {
        date = new Date(timestamp);
    }
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function showSuccess(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
