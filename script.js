// Chatbot functionality - UPDATED WITH NODE.JS SUPPORT
const chatBtn = document.getElementById('chatBtn');
const chatBox = document.getElementById('chatBox');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

// Server URL - Update this if your server is on a different URL
const SERVER_URL = 'http://localhost:3000';

chatBtn.onclick = () => {
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
  if (chatBox.style.display === 'flex') {
    chatInput.focus();
  }
};

// Allow pressing Enter to send message
chatInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('msg', sender);
  msg.innerText = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addLoadingIndicator() {
  const loading = document.createElement('div');
  loading.id = 'loading';
  loading.classList.add('msg', 'bot', 'loading');
  loading.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  chatBody.appendChild(loading);
  chatBody.scrollTop = chatBody.scrollHeight;
  return loading;
}

function removeLoadingIndicator() {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.remove();
  }
}

// Send message to Node.js server
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message
  addMessage('user', message);
  chatInput.value = '';
  
  // Show loading indicator
  const loading = addLoadingIndicator();

  try {
    const response = await fetch(`${SERVER_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    // Remove loading indicator
    removeLoadingIndicator();
    
    // Add bot response
    addMessage('bot', data.response);
    
  } catch (error) {
    console.error('Error:', error);
    removeLoadingIndicator();
    addMessage('bot', "Sorry, I'm having trouble connecting right now. Please try again later or contact the admissions office directly.");
  }
}

// Load initial options from server
async function loadInitialOptions() {
  try {
    const response = await fetch(`${SERVER_URL}/chat/options`);
    const data = await response.json();
    
    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');
    
    data.categories.forEach(category => {
      const categoryTitle = document.createElement('div');
      categoryTitle.className = 'category-title';
      categoryTitle.textContent = category.name;
      optionsDiv.appendChild(categoryTitle);
      
      category.questions.forEach(question => {
        const btn = document.createElement('button');
        btn.innerText = question;
        btn.onclick = () => {
          chatInput.value = question;
          sendMessage();
        };
        optionsDiv.appendChild(btn);
      });
    });
    
    chatBody.appendChild(optionsDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
  } catch (error) {
    console.error('Error loading options:', error);
    // Fallback to local options
    showLocalOptions();
  }
}

function showLocalOptions() {
  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('options');
  
  const categories = [
    {
      name: "Admission Information",
      questions: [
        "How do I apply?",
        "What are the requirements?",
        "When is the application deadline?"
      ]
    },
    {
      name: "Tuition Fees",
      questions: [
        "How much is tuition?",
        "Do you offer scholarships?",
        "What payment methods are accepted?"
      ]
    },
    {
      name: "Campus Life", 
      questions: [
        "Are there dormitories?",
        "What clubs are available?",
        "What are the library hours?"
      ]
    }
  ];
  
  categories.forEach(category => {
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = category.name;
    optionsDiv.appendChild(categoryTitle);
    
    category.questions.forEach(question => {
      const btn = document.createElement('button');
      btn.innerText = question;
      btn.onclick = () => {
        chatInput.value = question;
        sendMessage();
      };
      optionsDiv.appendChild(btn);
    });
  });
  
  chatBody.appendChild(optionsDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Initialize chatbot when window loads
window.addEventListener('load', () => {
  addMessage('bot', "Hello! 👋 I'm the La Salle University AI Assistant. I can help you with:\n\n• Admission Information\n• Tuition Fees & Scholarships\n• Campus Life & Facilities\n• Application Process\n\nChoose a question below or type your own!");
  loadInitialOptions();
});