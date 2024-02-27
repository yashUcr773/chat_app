# SwiftChat

## Functionality

- **Real-time chat app**
- **Signin:** Allows users to sign in to their accounts.
- **Signup:** Enables users to create new accounts.
- **Search Users:** Provides a feature to search for other users.
- **Send and Receive Messages in Real Time:** Users can send and receive messages instantly.
- **Message Storage:** Messages are stored in MongoDB for future retrieval.
- **Authentication and Session Management using JWT:** Utilizes JSON Web Tokens for authentication and managing user sessions.
- **Persistent Login:** Stores access tokens in memory and refresh tokens in HttpOnly cookies.
- **Automatic Access Token Renewal:** Refreshes the access token automatically upon expiry.
- **Configurable Token Lifetimes:** Allows configuration of access and refresh token lifetimes, defaulting to 1 day and 7 days, respectively.

## Tech Stack

### Frontend:
- Built with React, Recoil for state management, and Tailwind CSS for styling.
- Utilizes socket.io for real-time messages and notifications
- Hosted on Render at [chat.swiftchat.dev](https://chat.swiftchat.dev).

### Backend:
- Developed using Express.js and Node.js, with MongoDB for data storage.
- Utilizes socket.io for real-time messages and notifications.
- Hosted on Render at [www.swiftchat.dev](https://www.swiftchat.dev).
- Domain provider: Cloudflare.

## Running Locally

- clone the `repo`
- cd `repo`
- cd backend
- npm i
- cd ../frontend
- npm i
- npm run start:both
- backend runs on `localhost:3000`
- frontend runs on `localhost:5173`

# Environment Variables

Ensure to add the following environment variables in a `.env` file within the `backend` directory:

- `MONGO_CONNECTION_STRING`: MongoDB connection string.
- `ENV`: Set to `development`.
- `ACCESS_TOKEN_SECRET`: Secret key for generating access tokens.
- `REFRESH_TOKEN_SECRET`: Secret key for generating refresh tokens.
- `ACCESS_TOKEN_EXPIRY`: Expiry duration for access tokens (default: 1 hour).
- `REFRESH_TOKEN_EXPIRY`: Expiry duration for refresh tokens (default: 2 days).
- `PORT`: Port number for the backend server (default: 3000).

Generate secure access token using `require('crypto').randomBytes(64).toString('hex')` in any Node environment.

## Attribution

- Tailwind styles inspired from [Flowbite](https://flowbite.com/).
- Project idea inspired from [Dave Gray](https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd).


## Planned Features
- [x] Add signup / signin functionality
- [x] Connect to DB
- [x] Implement send and receive messages feature
- [x] Add sockets for real-time messages
- [x] Show when a user is online
- [x] Add notifications
- [ ] Show notification message instead of just count
- [ ] Do not show new message when users already is in that chat.
- [ ] Add group Chat
- [ ] Message Encryption and decryption
- [ ] Multimedia support
- [ ] Add emojis
- [ ] Edit and delete message
- [ ] Read Recipts
- [ ] Time when the message was sent
- [x] Scroll to new messages
- [ ] Scroll issue on reopening the chat
- [ ] Search Functionality for messages
- [ ] Update info
- [ ] Add avatars photos