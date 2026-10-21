// Simple Admin System
console.log('✅ Admin system loaded');

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "lsu2024";

function loginAsAdmin() {
    console.log('Login button clicked');
    
    const usernameInput = document.getElementById('admin-username');
    const passwordInput = document.getElementById('admin-password');
    
    if (!usernameInput || !passwordInput) {
        console.error('Login inputs not found');
        alert('Error: Login form not loaded properly');
        return;
    }
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    console.log('Login attempt:', username, password);
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Success
        localStorage.setItem('admin_logged_in', 'true');
        
        const loginDiv = document.getElementById('admin-login');
        const panelDiv = document.getElementById('admin-panel');
        
        if (loginDiv) loginDiv.style.display = 'none';
        if (panelDiv) panelDiv.style.display = 'block';
        
        showEditButtons();
        alert('✅ Admin access granted! You can now edit building information.');
    } else {
        alert('❌ Invalid login. Use:\nUsername: admin\nPassword: lsu2024');
    }
}

function logoutAdmin() {
    localStorage.removeItem('admin_logged_in');
    
    const loginDiv = document.getElementById('admin-login');
    const panelDiv = document.getElementById('admin-panel');
    
    if (loginDiv) loginDiv.style.display = 'block';
    if (panelDiv) panelDiv.style.display = 'none';
    
    hideEditButtons();
    alert('Logged out of admin mode.');
}

function showEditButtons() {
    console.log('Showing edit buttons...');
    
    // Add to About section
    const aboutCard = document.querySelector('.info-card:first-child');
    if (aboutCard && !aboutCard.querySelector('.edit-btn')) {
        const btn = document.createElement('button');
        btn.className = 'edit-btn';
        btn.innerHTML = '✏️ Edit Description';
        btn.style.cssText = `
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 15px;
            font-size: 14px;
            font-weight: 500;
        `;
        btn.onclick = function() {
            const p = aboutCard.querySelector('p');
            const currentText = p.textContent;
            const newText = prompt('Edit building description:', currentText);
            if (newText && newText !== currentText) {
                p.textContent = newText;
                localStorage.setItem('sj_about_text', newText);
            }
        };
        aboutCard.appendChild(btn);
        console.log('Added edit button to About section');
    }
    
    // Add to Features section
    const featuresCard = document.querySelector('.info-card:last-child');
    if (featuresCard && !featuresCard.querySelector('.edit-btn')) {
        const btn = document.createElement('button');
        btn.className = 'edit-btn';
        btn.innerHTML = '✏️ Edit Features';
        btn.style.cssText = `
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 15px;
            font-size: 14px;
            font-weight: 500;
        `;
        btn.onclick = function() {
            const items = featuresCard.querySelectorAll('li');
            let features = [];
            items.forEach(item => {
                features.push(item.textContent.replace('✓', '').trim());
            });
            
            const currentFeatures = features.join('\n');
            const newFeaturesText = prompt('Edit features (one per line):', currentFeatures);
            
            if (newFeaturesText && newFeaturesText !== currentFeatures) {
                const list = featuresCard.querySelector('.features-list');
                list.innerHTML = '';
                newFeaturesText.split('\n').forEach(feature => {
                    if (feature.trim()) {
                        const li = document.createElement('li');
                        li.innerHTML = `<i class='bx bx-check'></i> ${feature.trim()}`;
                        list.appendChild(li);
                    }
                });
                localStorage.setItem('sj_features', newFeaturesText);
            }
        };
        featuresCard.appendChild(btn);
        console.log('Added edit button to Features section');
    }
}

function hideEditButtons() {
    const editButtons = document.querySelectorAll('.edit-btn');
    console.log('Hiding', editButtons.length, 'edit buttons');
    editButtons.forEach(btn => btn.remove());
}

function loadSavedContent() {
    // Load saved about text
    const savedAbout = localStorage.getItem('sj_about_text');
    if (savedAbout) {
        const aboutParagraph = document.querySelector('.info-card:first-child p');
        if (aboutParagraph) {
            aboutParagraph.textContent = savedAbout;
        }
    }
    
    // Load saved features
    const savedFeatures = localStorage.getItem('sj_features');
    if (savedFeatures) {
        const featuresCard = document.querySelector('.info-card:last-child');
        if (featuresCard) {
            const list = featuresCard.querySelector('.features-list');
            list.innerHTML = '';
            savedFeatures.split('\n').forEach(feature => {
                if (feature.trim()) {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class='bx bx-check'></i> ${feature.trim()}`;
                    list.appendChild(li);
                }
            });
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing admin system...');
    
    // Load any saved content
    loadSavedContent();
    
    // Check if admin is already logged in
    if (localStorage.getItem('admin_logged_in') === 'true') {
        console.log('Admin already logged in');
        const loginDiv = document.getElementById('admin-login');
        const panelDiv = document.getElementById('admin-panel');
        
        if (loginDiv) loginDiv.style.display = 'none';
        if (panelDiv) panelDiv.style.display = 'block';
        
        showEditButtons();
    } else {
        console.log('Admin not logged in');
    }
    
    // Debug: Check if elements exist
    console.log('Admin login div exists:', !!document.getElementById('admin-login'));
    console.log('Admin panel div exists:', !!document.getElementById('admin-panel'));
    console.log('Username input exists:', !!document.getElementById('admin-username'));
    console.log('Password input exists:', !!document.getElementById('admin-password'));
});

// Also run initialization when window loads (backup)
window.addEventListener('load', function() {
    console.log('Window fully loaded');
});