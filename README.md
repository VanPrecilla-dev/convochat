# CONVO CHAT

## Overview

CONVO CHAT is a real-time chat application designed for private communication between two users. Built with ReactJS, Node.js, Express.js, and leveraging Socket.io for real-time bidirectional event-based communication, it offers a seamless chatting experience. The application supports text messages and video/audio calls, thanks to simple-peer, and adds engaging user interfaces with React Lottie animations.

## Features

- **Two-User Rooms**: Ensures that only two users can occupy a room. Attempts by a third user to join an existing room result in redirection.
- **Data Privacy**: No chat data is stored on the server. Usernames and user lists are temporarily saved in the web browser's session storage and are cleared when the tab is closed.
- **Responsive Design**: The application is responsive, providing an optimal experience across desktop, tablet, and mobile devices.
- **Username Customization**: Users can change their username to personalize their chat experience.
- **Case Sensitive Rooms**: Room names are case-sensitive, adding a layer of specificity and security.
- **Call Features**: Users can choose between video calls and audio-only calls. Switching requires ending the current session, which also resets chat history for privacy.
- **Theme Selection**: Users can switch between light and dark modes, providing comfort and accessibility regardless of the environment or personal preference.

## Project Type

CONVO CHAT is a full-stack website personal project, encompassing both frontend and backend development. It demonstrates proficiency in building modern web applications from the ground up, including real-time communication features, responsive design, and user interface enhancements.

## Technologies Used

- **Frontend**: ReactJS with Tailwind CSS and DaisyUI for responsive design and styling
- **Additional Frontend Libraries**:
  - React Icons: Used for adding icons to the user interface.
  - useSound: Integrated for sound effects or audio playback within the application.
  - react-copy-to-clipboard: Utilized for providing copy-to-clipboard functionality.
  - Context API: Employed for managing application state and sharing data between components.
- **Backend**: Node.js & Express.js
- **Real-time Communication**: Socket.io
- **Video/Audio Calls**: simple-peer
- **Animations**: React Lottie
- **Theme Switching**: Implemented with DaisyUI for streamlined theme management and Tailwind CSS for styling.

## Design and Development with DaisyUI
DaisyUI, in combination with Tailwind CSS, has been instrumental in implementing the theme-switching functionality in CONVO CHAT. DaisyUI extends the capabilities of Tailwind CSS by providing additional UI components and utilities, including pre-designed themes for rapid development.

By utilizing DaisyUI's theme management features, CONVO CHAT seamlessly integrates theme switching between light and dark modes. The predefined themes offered by DaisyUI, along with Tailwind CSS's utility-first approach, enable efficient customization and maintainability of the application's visual design.

DaisyUI's intuitive API and extensive documentation have facilitated the implementation of theme switching, allowing for a smooth user experience without compromising on design consistency or performance.


## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your system to run the project locally.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/CONVO-CHAT.git
Install NPM packages for the server:

cd CONVO-CHAT
npm install

Install NPM packages for the client (assuming a separate client folder):

cd client
npm install

Run the server:
npm start

Run the client (in a new terminal window):
cd client
npm start


Usage
To use CONVO CHAT, navigate to the hosted URL or run it locally. You can join an existing chat room or create a new one. Remember, the room is case-sensitive and can only host two users at a time.

Happy Coding by Van


## HOW TO TEST THIS APP

### DOWNLOAD AND RUN LOCALLY

## Download the Code:
-Download the code from GitHub repository to your local machine.

# Set Up Server:
-Navigate to the server folder in the downloaded code.
-Uncomment the CORS configuration in the index.js file and follow the instructions in the comment.
-Configure the CORS to allow connections from http://localhost:3000 for local testing.

 cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },

-Run the server using the appropriate command (e.g., npm start).

# Set Up Client:
-Navigate to the client folder in the downloaded code.
-Uncomment the socket connection configuration in the AppContext.js file and follow the instructions in the comment.
-Configure the socket connection to connect to http://localhost:3001 for local testing.

const socket = io.connect( "http://localhost:3001", {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Number of reconnection attempts
});

-Run the client using the appropriate command (e.g., npm start).
-Access the App: Open your web browser and navigate to http://localhost:3000 to access the locally running client application.

# Test the App: 
- Interact with the app to test its functionality locally. Make sure that the client and server are communicating properly.

-By following these steps, you can download and run the app locally on your machine for testing purposes. Ensure that both the server and client configurations are set up correctly for local testing, including CORS configuration and socket connection settings.

### OPEN IN VERCEL.APP AS STATIC WEBSITE ONLY FOR UI/UX TESTING
- To test the design and responsiveness of the chat app, you can access the live demo hosted on Vercel.app:



LIVE DEMO : https://van-convochat-client.vercel.app/

Please note that this demo is set up as a static website only and does not include WebSocket functionality or server back-end. Therefore, you won't be able to connect with other users or send/receive real-time messages.

## Instructions for Testing:
- Visit the provided link to access the live demo of the chat app.
- Explore the user interface to test the design and responsiveness on different devices and screen sizes.
- Interact with the available functions and features to understand the overall user experience.

- Please keep in mind that you won't be able to send or receive messages since WebSocket functionality is disabled in this demo.

- By testing the demo, you can evaluate the design, layout, and usability of the chat app across various devices and screen resolutions. If you have any feedback or suggestions, feel free to share them. Thank you for testing!

### OPEN IN RENDER WITH 5 MINS CUT-OFF OF THE SERVER AND NEED TO REENTER THE ROOM BUT YOU CAN CHAT AND CALL REAL-TIME

You can test the chat and real-time calling features of the app deployed on Render. Please note the following limitations and instructions:

- Server Cut-Off: The server is deployed on a free plan and has a 5-minute cut-off. After 5 minutes of inactivity, you'll need to re-enter the room and refresh the page.

- Fl0 Server: The server is hosted on a Fl0 site with free project limitations. If the server is inactive, please message me for assistance.

- Render App: The React app is deployed on Render's free tier plan with limitations. Some functions may not work properly, such as changing the username, and exiting the room or refreshing the page may result in a NOT FOUND error.

- Instructions: Test the chat and real-time calling features continuously within the 5-minute window. If the server becomes inactive or the page shows a NOT FOUND error, refresh the main link and create a new room.

RENDER LINK: https://convochat-vdu0.onrender.com/

Thank you for testing! If you encounter any issues or have feedback, feel free to reach out.