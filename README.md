# LinkedIn Post Generator

Transform any article into engaging LinkedIn content using AI.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Update `.env` with your actual LangFlow credentials:
   - `VITE_LANGFLOW_URL`: Your LangFlow API endpoint
   - `VITE_LANGFLOW_TOKEN`: Your LangFlow application token
5. Start the development server: `npm run dev`

## Environment Variables

Create a `.env` file in the root directory with:

```
VITE_LANGFLOW_URL=https://api.langflow.astra.datastax.com/lf/YOUR_PROJECT_ID/api/v1/run/YOUR_FLOW_ID
VITE_LANGFLOW_TOKEN=your_actual_application_token
```

## Features

- Clean, professional interface
- Real-time character counting
- Copy to clipboard functionality
- Generate multiple variations
- Recent URLs history
- Mobile responsive design

## Usage

1. Paste any article URL
2. Click "Generate Post"
3. Edit the generated content if needed
4. Copy to clipboard and share on LinkedIn
