// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple FAQ database
const faqData = {
  "admission": {
    "How do I apply?": "You can apply online through our official admissions portal at xxx or visit the Admissions Office in the SJ Building.",
    "What are the requirements?": "You'll need: 1) Completed application form, 2) High school transcript, 3) Two recommendation letters, 4) Personal essay, 5) Valid ID",
    "When is the application deadline?": "The application deadline for the Fall semester is July 15th and for the Spring semester is December 10th.",
    "What is the application fee?": "The application fee is $50 for domestic students and $75 for international students.",
    "Do you accept transfer students?": "Yes, we accept transfer students. You'll need to provide transcripts from all previously attended institutions."
  },
  "tuition": {
    "How much is tuition?": "Undergraduate tuition is approximately xxxx per semester. Graduate programs vary from $18,000-$22,000 per semester.",
    "Do you offer scholarships?": "Yes! We offer academic scholarships, athletic scholarships, and need-based financial aid. Visit the Financial Aid Office in BVM Building.",
    "What payment methods are accepted?": "We accept bank transfers, credit cards (Visa/MasterCard), and installment plans through our payment portal.",
    "Are there payment plans available?": "Yes, we offer monthly installment plans. Contact the Bursar's Office for more information."
  },
  "campus": {
    "Are there dormitories?": "Yes! We have 3 residence halls with options for single, double, and suite-style rooms. Apply early as spaces fill quickly!",
    "What clubs are available?": "We have over 50 student clubs including: Tech Club, Debate Society, Sports Clubs, Arts & Music, and Cultural Organizations.",
    "What are the library hours?": "Main Library hours: Mon-Thu: 7AM-10PM, Fri: 7AM-8PM, Sat: 9AM-6PM, Sun: 12PM-8PM",
    "Is there campus WiFi?": "Yes, free WiFi is available across campus. Connect to 'LaSalle-Student' network with your student credentials."
  },
  "general": {
    "hello": "Hello! 👋 I'm here to help with information about La Salle University. You can ask me about admissions, tuition, campus life, or anything else!",
    "hi": "Hi there! How can I help you today? Feel free to ask about admissions, tuition fees, campus facilities, or student life!",
    "thank you": "You're welcome! 😊 Let me know if you need any other information about La Salle University.",
    "thanks": "You're welcome! Is there anything else I can help you with?"
  }
};

// Function to find the best answer
function findAnswer(question) {
  const lowerQuestion = question.toLowerCase();
  
  // Check for greetings first
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
    return faqData.general.hello;
  }
  
  if (lowerQuestion.includes('thank')) {
    return faqData.general['thank you'];
  }
  
  // Check each category
  for (const [category, questions] of Object.entries(faqData)) {
    for (const [faqQuestion, answer] of Object.entries(questions)) {
      if (lowerQuestion.includes(faqQuestion.toLowerCase()) || 
          checkSimilarity(lowerQuestion, faqQuestion.toLowerCase())) {
        return answer;
      }
    }
  }
  
  // Default response if no match found
  return "I'm not sure about that specific question. Could you try rephrasing? You can ask me about:\n• Admissions process\n• Tuition fees\n• Campus facilities\n• Student life\n• Application requirements";
}

// Simple similarity check
function checkSimilarity(input, target) {
  const inputWords = input.split(' ');
  const targetWords = target.split(' ');
  
  let matches = 0;
  for (const word of inputWords) {
    if (targetWords.some(tWord => tWord.includes(word) || word.includes(tWord))) {
      matches++;
    }
  }
  
  return matches >= 2; // At least 2 words should match
}

// Chat endpoint
app.post('/chat', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  console.log('Received question:', message);
  
  // Simulate some processing time
  setTimeout(() => {
    const answer = findAnswer(message);
    res.json({ 
      response: answer,
      timestamp: new Date().toLocaleTimeString()
    });
  }, 1000); // 1 second delay to feel more natural
});

// Get initial options
app.get('/chat/options', (req, res) => {
  res.json({
    categories: [
      {
        name: "Admission Information",
        questions: [
          "How do I apply?",
          "What are the requirements?",
          "When is the application deadline?",
          "What is the application fee?",
          "Do you accept transfer students?"
        ]
      },
      {
        name: "Tuition Fees", 
        questions: [
          "How much is tuition?",
          "Do you offer scholarships?",
          "What payment methods are accepted?",
          "Are there payment plans available?"
        ]
      },
      {
        name: "Campus Life",
        questions: [
          "Are there dormitories?",
          "What clubs are available?",
          "What are the library hours?",
          "Is there campus WiFi?"
        ]
      }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 AI Chatbot server running on http://localhost:${PORT}`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/chat`);
});