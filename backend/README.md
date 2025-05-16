# FinBuddy Backend

This is the Flask backend for the FinBuddy application. It provides a REST API that integrates with Firebase for data storage and authentication.

## Setup Instructions

1. Create a Python virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file:
- Copy `.env.example` to `.env`
- Fill in your Firebase configuration details

5. Run the development server:
```bash
python app.py
```

The server will start at `http://localhost:5000`

## API Endpoints

- `GET /api/health`: Health check endpoint to verify the server is running

## Firebase Integration

To set up Firebase:
1. Create a Firebase project in the Firebase Console
2. Generate a new private key from Project Settings > Service Accounts
3. Add the Firebase configuration details to your `.env` file

## Development

The backend is configured with CORS enabled for development. Make sure your frontend is configured to communicate with the correct backend URL. 