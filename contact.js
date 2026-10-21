function doPost(e) {
  try {
    // Replace this with your actual Sheet ID
    const sheetId = '1qnLCPm-6_5sHe95h7RU92WJd5O68-OKITHKBmMVCqIc';
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    
    // Parse the JSON data from the form
    const data = JSON.parse(e.postData.contents);
    
    // Get current date and time
    const timestamp = new Date();
    
    // Extract form data
    const name = data.name || 'Not provided';
    const email = data.email || 'Not provided';
    const subject = data.subject || 'Not provided';
    const message = data.message || 'Not provided';
    
    // Add headers if sheet is empty (only if first row is empty)
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Subject', 'Message']]);
    }
    
    // Append the new row
    sheet.appendRow([timestamp, name, email, subject, message]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Message received successfully!',
        timestamp: timestamp.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - you can run this to check if it works
function testDoPost() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    subject: "Test Inquiry",
    message: "This is a test message"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

// Simple GET function for testing
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'OK', 
      message: 'Contact form API is working!',
      timestamp: new Date().toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}