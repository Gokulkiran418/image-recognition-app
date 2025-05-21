# Image Recognition Web App
A full-stack web app for recognizing objects in images using TensorFlow.js and Flask, with Vercel-deployable files.

## Tech Stack
- AI: TensorFlow.js (4.x), TensorFlow (2.17.0)
- Back-end: Flask (3.x)
- Front-end: React (18.x), Vite (5.x), Tailwind CSS (3.x)
- Deployment: Vercel (files prepared)

## Features
- Upload images and preview them in a responsive UI.
- Recognize objects using TensorFlow.js (MobileNet) or Flask API (MobileNetV2).
- Toggle between TensorFlow.js and Flask API with styled buttons.
- Display predictions (label, confidence) with animations.
- Responsive design with dark mode, blue accents, and fade-in effects.

## Setup
### Back-end
1. Install: `pip install -r api/requirements.txt` (global Python)
2. Set `api/.env`: `FLASK_ENV=development`
3. Run: `cd api && python app.py`

### Front-end
1. Install: `npm install`
2. Run: `npm run dev`
3. Build: `npm run build` (generates `dist/`)