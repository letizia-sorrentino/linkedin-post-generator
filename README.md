# PostSwift

A modern React application that transforms articles into engaging LinkedIn posts using AI. Built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **AI-Powered Content Generation** - Transform any article URL into professional LinkedIn posts
- **Source Attribution** - Automatically add proper source attribution with publication names
- **Smart Character Management** - Intelligent truncation to fit posts within LinkedIn's 3000 character limit
- **Post Variations** - Generate multiple versions of the same content
- **Draft Management** - Save and organize your drafts with localStorage persistence
- **Favorites System** - Mark and store your favorite posts
- **LinkedIn Preview** - See how your posts will look on LinkedIn
- **Word Cloud Analysis** - Visual representation of key terms in your content
- **Emoji Picker** - Add emojis to enhance your posts
- **Dark/Light Mode** - Toggle between themes
- **Character Counter** - Real-time character limit tracking with attribution (max 3,000 chars)
- **Export Functionality** - Download posts as text files
- **Recent URLs** - Quick access to previously processed URLs
- **Responsive Design** - Works seamlessly on desktop and mobile

## 📚 Related Documentation

- [PostSwift_Design_System.md](./PostSwift_Design_System.md) - Design guidelines and styling
- [PostSwift_Presentation.md](./PostSwift_Presentation.md) - Project overview and architecture
- [ATTRIBUTION_FEATURES.md](./ATTRIBUTION_FEATURES.md) - Detailed source attribution documentation

## 🏗️ Architecture

This project follows a modern, modular React architecture:

```
src/
├── components/           # Reusable UI components
│   ├── ui/             # Basic UI components (Notification)
│   ├── layout/         # Layout components (Header, Sidebar, Footer, MainContent)
│   └── features/       # Feature-specific components (UrlInput, PostEditor, etc.)
├── hooks/              # Custom React hooks for state management
├── services/           # API and storage services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # App constants and configuration
└── pages/              # Route-based page components
```

### Key Architectural Decisions

- **Separation of Concerns**: UI, business logic, and data management are clearly separated
- **Custom Hooks**: State management is abstracted into reusable hooks
- **Service Layer**: API calls and storage operations are centralized
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Component Composition**: Small, focused components that can be easily tested and maintained

## 🛠️ Technology Stack

- **React 18.3.1** - UI framework with modern hooks
- **TypeScript 5.5.3** - Type safety and better developer experience
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful, customizable icons
- **LangFlow API** - AI content generation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkedin-post-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_LANGFLOW_URL=https://api.langflow.astra.datastax.com/lf/YOUR_PROJECT_ID/api/v1/run/YOUR_FLOW_ID
   VITE_LANGFLOW_TOKEN=your_actual_application_token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎯 Usage

### Basic Workflow

1. **Paste an Article URL** - Enter any article URL from sources like:
   - Harvard Business Review
   - TechCrunch
   - McKinsey Insights
   - MIT Technology Review
   - Industry blogs

2. **Generate Post** - Click "Generate Post" to create LinkedIn content

3. **Edit & Customize** - Modify the generated content as needed:
   - Add emojis using the emoji picker
   - Check character count (max 3,000 characters including attribution)
   - Preview how it looks on LinkedIn
   - Toggle source attribution on/off

4. **Save & Share** - Use the action buttons to:
   - Copy to clipboard (with or without attribution)
   - Save as draft
   - Add to favorites
   - Export as text file
   - Generate variations

### Source Attribution Features

- **Automatic Attribution**: Posts automatically include source information
- **Publication Mapping**: Recognizes 20+ major publications with clean names
- **Smart Truncation**: Automatically truncates posts if attribution exceeds character limit
- **User Control**: Toggle attribution on/off as needed
- **Professional Format**: "Source: [Publication Name]\n[URL]" format

### Advanced Features

- **Draft Management**: Save multiple drafts and load them later
- **Favorites**: Mark your best posts for quick access
- **Recent URLs**: Quickly re-process previously used URLs
- **Word Cloud**: Visualize key terms in your content
- **Theme Toggle**: Switch between light and dark modes

## 🏛️ Project Structure

### Components

#### Layout Components
- `Header.tsx` - App header with title and theme toggle
- `Sidebar.tsx` - Navigation with statistics and theme toggle
- `Footer.tsx` - App footer
- `MainContent.tsx` - Main content area with card layout
- `PageHeader.tsx` - Page headers with breadcrumbs
- `Breadcrumb.tsx` - Breadcrumb navigation component

#### Feature Components
- `UrlInput.tsx` - URL input with validation and error handling
- `PostEditor.tsx` - Post editing interface with emoji picker and attribution controls
- `PostPreview.tsx` - LinkedIn-style post preview with attribution display
- `WordCloud.tsx` - Key terms visualization
- `DraftsPanel.tsx` - Drafts management interface
- `FavoritesPanel.tsx` - Favorites management interface
- `RecentUrls.tsx` - URL history display

#### UI Components
- `Notification.tsx` - Toast notification system

### Custom Hooks

- `useTheme.ts` - Theme management with localStorage persistence
- `useNotifications.ts` - Toast notifications with auto-dismiss
- `usePostGeneration.ts` - Post generation with API integration and attribution logic
- `useDrafts.ts` - Drafts management with localStorage
- `useFavorites.ts` - Favorites management with localStorage
- `useRecentUrls.ts` - URL history management
- `usePostsToday.ts` - Daily post counter with date reset

### Services

- `api.ts` - LangFlow API integration with error handling
- `storage.ts` - localStorage operations with type safety

### Pages

- `GeneratorPage.tsx` - Main post generation interface
- `ContentPage.tsx` - Drafts and favorites management
- `KnowledgeBasePage.tsx` - Knowledge base management
- `StatsPage.tsx` - Statistics and analytics
- `TipsPage.tsx` - Usage tips and guidance

### Types

- `index.ts` - All TypeScript interfaces and type definitions

## 🔌 API Integration

The application integrates with LangFlow API for AI-powered content generation:

- **Endpoint**: Configurable via environment variables
- **Authentication**: Bearer token authentication
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Response Parsing**: Robust parsing of various API response formats

## 💾 Data Persistence

All user data is persisted in localStorage:

- **Drafts**: Saved post drafts with timestamps
- **Favorites**: Favorite posts with metadata
- **Recent URLs**: Recently processed URLs for quick access
- **Posts Today**: Daily post generation counter
- **Theme Preference**: User's dark/light mode preference

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive Design**: Mobile-first responsive layout
- **Custom Animations**: Smooth transitions and hover effects

## 🧪 Testing

The modular architecture makes testing straightforward:

```bash
# Example test structure (to be implemented)
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   └── services/
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables for Production

Ensure your production environment has the required environment variables:

```env
VITE_LANGFLOW_URL=your_production_api_endpoint
VITE_LANGFLOW_TOKEN=your_production_api_token
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code structure and patterns
- Add TypeScript types for new features
- Write tests for new components and hooks
- Update documentation for new features
- Ensure responsive design for new components

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LangFlow** for AI content generation capabilities
- **Lucide** for beautiful, customizable icons
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool and development experience

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Built with ❤️ using modern React and TypeScript**