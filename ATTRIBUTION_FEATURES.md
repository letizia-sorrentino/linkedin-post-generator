# PostSwift Source Attribution Features
## Technical Documentation

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Feature Details](#feature-details)
3. [Technical Implementation](#technical-implementation)
4. [User Interface](#user-interface)
5. [API Integration](#api-integration)
6. [Data Flow](#data-flow)
7. [Configuration](#configuration)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The Source Attribution feature automatically adds proper source information to generated LinkedIn posts, ensuring professional content creation while maintaining compliance with LinkedIn's character limits.

### **Key Benefits**
- **Professional Credibility**: Always gives proper credit to original sources
- **Character Management**: Smart truncation to fit within LinkedIn's 3000 character limit
- **User Control**: Toggle attribution on/off as needed
- **Publication Recognition**: Maps domains to clean, professional publication names

---

## ✨ Feature Details

### **Automatic Attribution**
- **Format**: `Source: [Publication Name]\n[URL]`
- **Placement**: Added below the main post content
- **Separator**: Double line break (`\n\n`) between post and attribution

### **Publication Mapping**
The system recognizes 20+ major publications with clean, professional names:

#### **Business & Technology**
- `hbr.org` → "Harvard Business Review"
- `techcrunch.com` → "TechCrunch"
- `forbes.com` → "Forbes"
- `bloomberg.com` → "Bloomberg"
- `reuters.com` → "Reuters"
- `wsj.com` → "The Wall Street Journal"

#### **News & Media**
- `nytimes.com` → "The New York Times"
- `washingtonpost.com` → "The Washington Post"
- `theguardian.com` → "The Guardian"
- `cnn.com` → "CNN"
- `bbc.com` → "BBC"
- `npr.org` → "NPR"

#### **Technology & Development**
- `github.com` → "GitHub"
- `stackoverflow.com` → "Stack Overflow"
- `dev.to` → "Dev.to"
- `hashnode.dev` → "Hashnode"
- `substack.com` → "Substack"

#### **Fallback Handling**
- **Mapped Domains**: Use clean publication names
- **Unmapped Domains**: Extract clean names from domain (e.g., `example.com` → "Example")
- **Invalid URLs**: Display "Unknown Source"

### **Smart Truncation**
- **Trigger**: When (post + attribution) > 3000 characters
- **Strategy**: Truncate at sentence boundaries when possible
- **Fallback**: Word boundary truncation if needed
- **Indicator**: Adds "..." for truncated content
- **Warning**: Visual indicator when truncation occurs

---

## 🛠️ Technical Implementation

### **Core Functions**

#### **Publication Name Extraction**
```typescript
export const extractPublicationName = (url: string): string => {
  try {
    const domain = new URL(url).hostname.toLowerCase();
    const cleanDomain = domain.replace(/^www\./, '');
    
    // Check mapped publications
    if (PUBLICATION_MAPPING[cleanDomain]) {
      return PUBLICATION_MAPPING[cleanDomain];
    }
    
    // Fallback to domain-based names
    const domainParts = cleanDomain.split('.');
    if (domainParts.length >= 2) {
      const mainDomain = domainParts[domainParts.length - 2];
      return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
    }
    
    return cleanDomain;
  } catch {
    return "Unknown Source";
  }
};
```

#### **Attribution Text Generation**
```typescript
export const generateAttributionText = (url: string): string => {
  const publicationName = extractPublicationName(url);
  return `Source: ${publicationName}\n${url}`;
};
```

#### **Smart Truncation Algorithm**
```typescript
export const smartTruncatePost = (
  postContent: string, 
  attributionText: string, 
  maxChars: number = MAX_CHARS
): {
  truncatedContent: string;
  isTruncated: boolean;
  totalLength: number;
} => {
  const attributionLength = attributionText.length;
  const maxPostLength = maxChars - attributionLength - 4; // -4 for "\n\n" separator
  
  if (postContent.length <= maxPostLength) {
    return {
      truncatedContent: postContent,
      isTruncated: false,
      totalLength: postContent.length + attributionLength + 4
    };
  }
  
  // Try sentence boundary truncation
  const sentences = postContent.match(/[^.!?]+[.!?]+/g) || [];
  let truncatedContent = "";
  let currentLength = 0;
  
  for (const sentence of sentences) {
    if (currentLength + sentence.length <= maxPostLength) {
      truncatedContent += sentence;
      currentLength += sentence.length;
    } else {
      break;
    }
  }
  
  // Fallback to word boundary truncation
  if (truncatedContent.length === 0) {
    const words = postContent.split(' ');
    for (const word of words) {
      if (currentLength + word.length + 1 <= maxPostLength) {
        truncatedContent += (truncatedContent ? ' ' : '') + word;
        currentLength += word.length + (truncatedContent ? 1 : 0);
      } else {
        break;
      }
    }
  }
  
  // Add ellipsis if truncated
  if (truncatedContent.length < postContent.length) {
    truncatedContent += '...';
  }
  
  return {
    truncatedContent,
    isTruncated: true,
    totalLength: truncatedContent.length + attributionLength + 4
  };
};
```

### **State Management**

#### **GeneratedPost Interface**
```typescript
export interface GeneratedPost {
  content: string;
  timestamp: Date;
  id: string;
  url?: string;
  includeAttribution?: boolean;
  attributionText?: string;
  isTruncated?: boolean;
}
```

#### **Attribution State**
```typescript
const [includeAttribution, setIncludeAttribution] = useState(true);

const toggleAttribution = useCallback(() => {
  setIncludeAttribution(prev => !prev);
}, []);
```

---

## 🎨 User Interface

### **Attribution Toggle**
- **Location**: Top-right of PostEditor header
- **Design**: Toggle button with source icon
- **States**: 
  - **Enabled**: Green toggle with "Source" label
  - **Disabled**: Gray toggle with "Source" label
- **Tooltip**: Contextual help text

### **Attribution Preview**
- **Location**: Below header, above action buttons
- **Design**: Blue info box with border
- **Content**: 
  - Attribution text preview
  - Truncation warning (if applicable)
  - "Will be added automatically" message

### **Enhanced Character Counter**
- **Main Counter**: Shows total characters (post + attribution)
- **Status Line**: Attribution status (e.g., "with source", "no source")
- **Bottom Indicator**: 
  - Main character count
  - Attribution character addition (e.g., "+45 chars")

### **Preview Integration**
- **Post Content**: Main post text
- **Attribution Section**: Separated by border with source icon
- **Truncation Warning**: Orange warning if post was truncated

---

## 🔌 API Integration

### **Post Generation Flow**
1. **URL Input**: User provides article URL
2. **API Call**: Generate post content via LangFlow
3. **Attribution Generation**: Create attribution text from URL
4. **Smart Truncation**: Apply if needed
5. **State Update**: Update GeneratedPost with all fields

### **Variation Generation**
- **Input**: Existing post content
- **Process**: Generate new variation
- **Attribution**: Apply same attribution logic
- **Truncation**: Re-apply if needed

### **Error Handling**
- **Invalid URLs**: Graceful fallback to "Unknown Source"
- **API Failures**: Maintain attribution state
- **Network Issues**: Preserve existing attribution

---

## 🔄 Data Flow

### **Generation Workflow**
```
User Input → API Call → Content Generation → Attribution Creation → Smart Truncation → State Update → UI Render
```

### **State Updates**
1. **Post Generation**: `includeAttribution` state determines attribution inclusion
2. **Content Changes**: Attribution recalculated on URL changes
3. **Toggle Changes**: Immediate UI updates without regeneration
4. **Copy/Export**: Attribution included based on current toggle state

### **Persistence**
- **Drafts**: Attribution settings preserved
- **Favorites**: Attribution information maintained
- **Recent URLs**: URL history for attribution generation

---

## ⚙️ Configuration

### **Environment Variables**
```env
# No additional environment variables needed
# Attribution uses existing URL from post generation
```

### **Publication Mapping**
```typescript
// Add new publications to src/constants/index.ts
export const PUBLICATION_MAPPING: Record<string, string> = {
  "yourdomain.com": "Your Publication Name",
  // ... existing mappings
};
```

### **Character Limits**
```typescript
// Modify in src/constants/index.ts
export const MAX_CHARS = 3000; // LinkedIn's limit
```

---

## 🐛 Troubleshooting

### **Common Issues**

#### **Attribution Not Showing**
- **Check**: Toggle is enabled
- **Verify**: URL is valid and accessible
- **Debug**: Check browser console for errors

#### **Character Count Mismatch**
- **Verify**: Attribution is included in count
- **Check**: Truncation status
- **Debug**: Use browser dev tools to inspect state

#### **Publication Name Issues**
- **Check**: Domain mapping in constants
- **Verify**: URL format and accessibility
- **Fallback**: Should use domain-based names

### **Debug Information**
```typescript
// Add to component for debugging
console.log('Attribution State:', {
  includeAttribution,
  attributionText: generatedPost?.attributionText,
  isTruncated: generatedPost?.isTruncated,
  totalChars: getTotalCharacterCount()
});
```

### **Performance Considerations**
- **Attribution Generation**: Minimal performance impact
- **Smart Truncation**: Efficient regex-based algorithms
- **State Updates**: Optimized with useCallback
- **Rendering**: Minimal re-renders with proper dependencies

---

## 🔮 Future Enhancements

### **Planned Features**
- **Custom Attribution Templates**: User-defined attribution formats
- **Publication Database**: Expandable publication mapping
- **Attribution Analytics**: Track attribution usage and effectiveness
- **Multi-Language Support**: Localized publication names

### **Technical Improvements**
- **Caching**: Cache publication names for performance
- **Validation**: Enhanced URL validation and sanitization
- **Testing**: Comprehensive unit tests for attribution logic
- **Performance**: Optimize truncation algorithms

---

## 📚 Related Documentation

- [README.md](./README.md) - Main project documentation
- [PostSwift_Design_System.md](./PostSwift_Design_System.md) - Design guidelines
- [PostSwift_Presentation.md](./PostSwift_Presentation.md) - Project overview

---

*This documentation covers the technical implementation of PostSwift's Source Attribution feature. For user-facing documentation, see the main README.md file.*
