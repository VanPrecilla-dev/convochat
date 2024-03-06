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
