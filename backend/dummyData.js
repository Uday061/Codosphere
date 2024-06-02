const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWJlMDI2M2NjNmY3MGQzYzEwYjRkMiIsImlhdCI6MTcxNzEwMDEyMH0.M9sZw-OlfM8vMFHtg_v-czH0nQYL4KfHWodIULGzpcw';
const chatId = '66505f0fa86038df19eab20c'; // The Object ID of the chat
const apiUrl = 'http://localhost:5555/api/messages';

const dummyMessages = [
  "Hello! How are you?",
  "This is a test message.",
  "Hope you are having a great day!",
  "Just checking in.",
  "Here's another dummy message."
];

const sendDummyMessages = async () => {
  try {
    for (const content of dummyMessages) {
      const response = await axios.post(
        apiUrl,
        { sender: '661be0263cc6f70d3c10b4d2', content, chatId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Message sent:', response.data);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

sendDummyMessages();