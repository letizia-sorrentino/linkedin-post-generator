# PostSwift Design System
## Colors, Typography & Styling Guide

---

## 🎨 **Color Palette**

### **Primary Colors**
- **Blue Primary**: `#2563eb` (blue-600)
- **Blue Hover**: `#1d4ed8` (blue-700)
- **Blue Disabled**: `#60a5fa` (blue-400)
- **Purple Primary**: `#9333ea` (purple-600)
- **Purple Hover**: `#7c3aed` (purple-700)

### **Gradient Colors**
- **Primary Gradient**: `from-blue-600 to-purple-600`
- **Dark Mode Gradient**: `from-blue-400 to-purple-400`
- **Background Gradient Light**: `from-blue-50 via-white to-indigo-50`
- **Background Gradient Dark**: `from-gray-900 via-gray-800 to-gray-900`

### **Text Colors**
- **Primary Text Light**: `#111827` (gray-900)
- **Primary Text Dark**: `#f9fafb` (gray-100)
- **Secondary Text Light**: `#374151` (gray-700)
- **Secondary Text Dark**: `#d1d5db` (gray-300)
- **Muted Text Light**: `#6b7280` (gray-500)
- **Muted Text Dark**: `#9ca3af` (gray-400)

### **Background Colors**
- **Card Background Light**: `rgba(255, 255, 255, 0.7)` (white/70)
- **Card Background Dark**: `rgba(31, 41, 55, 0.7)` (gray-800/70)
- **Border Light**: `rgba(255, 255, 255, 0.2)` (white/20)
- **Border Dark**: `rgba(55, 65, 81, 0.2)` (gray-700/20)

### **Status Colors**
- **Success**: `#16a34a` (green-600)
- **Success Dark**: `#4ade80` (green-400)
- **Error**: `#dc2626` (red-600)
- **Error Dark**: `#f87171` (red-400)
- **Warning**: `#ca8a04` (yellow-600)
- **Info**: `#2563eb` (blue-600)

### **Attribution Colors**
- **Attribution Background**: `#dbeafe` (blue-100)
- **Attribution Background Dark**: `#1e3a8a` (blue-900)
- **Attribution Text**: `#1e40af` (blue-800)
- **Attribution Text Dark**: `#93c5fd` (blue-300)
- **Attribution Border**: `#bfdbfe` (blue-200)
- **Attribution Border Dark**: `#1d4ed8` (blue-700)
- **Truncation Warning**: `#ea580c` (orange-600)
- **Truncation Warning Dark**: `#fb923c` (orange-400)

---

## 📝 **Typography**

### **Font Family**
- **Primary**: Inter (system font stack)
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### **Font Weights**
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

### **Font Sizes**
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### **Line Heights**
- **Tight**: 1.25
- **Normal**: 1.5
- **Relaxed**: 1.75

---

## 🎯 **Typography Hierarchy**

### **H1 - Main Headers**
```css
text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent
```
- **Size**: 2.25rem (36px) / 3rem (48px) on medium screens
- **Weight**: Bold (700)
- **Style**: Gradient text with clip

### **H2 - Section Headers**
```css
text-2xl font-bold text-gray-900 dark:text-gray-100
```
- **Size**: 1.5rem (24px)
- **Weight**: Bold (700)
- **Color**: Primary text color

### **H3 - Subsection Headers**
```css
text-xl font-semibold text-gray-900 dark:text-gray-100
```
- **Size**: 1.25rem (20px)
- **Weight**: Semibold (600)
- **Color**: Primary text color

### **H4 - Card Headers**
```css
text-lg font-semibold text-gray-900 dark:text-gray-100
```
- **Size**: 1.125rem (18px)
- **Weight**: Semibold (600)
- **Color**: Primary text color

### **Body Text**
```css
text-gray-700 dark:text-gray-300
```
- **Size**: 1rem (16px)
- **Weight**: Normal (400)
- **Color**: Secondary text color

### **Small Text**
```css
text-sm font-medium text-gray-600 dark:text-gray-400
```
- **Size**: 0.875rem (14px)
- **Weight**: Medium (500)
- **Color**: Muted text color

### **Caption Text**
```css
text-xs font-medium text-gray-500 dark:text-gray-400
```
- **Size**: 0.75rem (12px)
- **Weight**: Medium (500)
- **Color**: Muted text color

---

## 🎨 **Component Styling**

### **Cards**
```css
bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6
```
- **Background**: Semi-transparent white/dark
- **Border Radius**: 1rem (16px)
- **Shadow**: Extra large shadow
- **Border**: Semi-transparent border
- **Padding**: 1.5rem (24px)

### **Buttons - Primary**
```css
px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg
```
- **Background**: Blue with hover states
- **Text**: White
- **Border Radius**: 0.5rem (8px)
- **Padding**: 1rem horizontal, 0.5rem vertical
- **Transition**: 200ms duration
- **Shadow**: Medium shadow with hover effect

### **Buttons - Secondary**
```css
px-4 py-2 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm
```
- **Background**: Transparent with hover states
- **Text**: Purple
- **Border**: Purple border
- **Border Radius**: 0.5rem (8px)
- **Transition**: 200ms duration

### **Input Fields**
```css
w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white
```
- **Border**: Gray border
- **Border Radius**: 0.5rem (8px)
- **Focus**: Blue ring
- **Padding**: 1rem horizontal, 0.75rem vertical

### **Badges**
```css
px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full
```
- **Background**: Light blue
- **Text**: Dark blue
- **Border Radius**: Full rounded
- **Padding**: 0.5rem horizontal, 0.25rem vertical

### **Attribution Toggle Button**
```css
px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors
```
- **Background**: Light gray with hover states
- **Text**: Dark gray
- **Border Radius**: 0.5rem (8px)
- **Padding**: 0.75rem horizontal, 0.25rem vertical
- **Transition**: Color transitions

### **Attribution Preview Box**
```css
bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3
```
- **Background**: Light blue with transparency
- **Border**: Blue border
- **Border Radius**: 0.5rem (8px)
- **Padding**: 0.75rem (12px)

### **Character Count with Attribution**
```css
text-sm px-3 py-1 rounded-full font-medium bg-green-100 dark:bg-green-900 text-green-600
```
- **Background**: Color-coded based on character count
- **Text**: Matching color for good contrast
- **Border Radius**: Full rounded
- **Padding**: 0.75rem horizontal, 0.25rem vertical

---

## 🌈 **Gradient Definitions**

### **Primary Brand Gradient**
```css
bg-gradient-to-r from-blue-600 to-purple-600
```
- **Direction**: Right
- **Start**: Blue-600 (#2563eb)
- **End**: Purple-600 (#9333ea)

### **Dark Mode Brand Gradient**
```css
bg-gradient-to-r from-blue-400 to-purple-400
```
- **Direction**: Right
- **Start**: Blue-400 (#60a5fa)
- **End**: Purple-400 (#a855f7)

### **Background Gradients**

#### **Light Mode Background**
```css
bg-gradient-to-br from-blue-50 via-white to-indigo-50
```
- **Direction**: Bottom-right
- **Start**: Blue-50 (#eff6ff)
- **Middle**: White (#ffffff)
- **End**: Indigo-50 (#eef2ff)

#### **Dark Mode Background**
```css
bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
```
- **Direction**: Bottom-right
- **Start**: Gray-900 (#111827)
- **Middle**: Gray-800 (#1f2937)
- **End**: Gray-900 (#111827)

---

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### **Container Max Widths**
- **Mobile**: Full width
- **Tablet**: `max-w-4xl` (896px)
- **Desktop**: `max-w-5xl` (1024px)

### **Grid Layouts**
```css
grid grid-cols-1 lg:grid-cols-3 gap-6
```
- **Mobile**: Single column
- **Desktop**: Three columns

---

## 🎭 **Animation & Transitions**

### **Duration Classes**
- **Fast**: `duration-150` (150ms)
- **Normal**: `duration-200` (200ms)
- **Slow**: `duration-300` (300ms)

### **Transition Types**
- **Colors**: `transition-colors`
- **All**: `transition-all`
- **Transform**: `transition-transform`

### **Hover Effects**
```css
hover:shadow-xl transition-shadow duration-200
```
- **Shadow**: Extra large on hover
- **Duration**: 200ms transition

---

## 🎨 **Presentation Color Codes**

### **For PowerPoint/Keynote**

#### **Primary Colors (HEX)**
- **Blue Primary**: `#2563eb`
- **Blue Hover**: `#1d4ed8`
- **Purple Primary**: `#9333ea`
- **Purple Hover**: `#7c3aed`
- **White**: `#ffffff`
- **Gray-50**: `#f9fafb`
- **Gray-100**: `#f3f4f6`
- **Gray-200**: `#e5e7eb`
- **Gray-300**: `#d1d5db`
- **Gray-400**: `#9ca3af`
- **Gray-500**: `#6b7280`
- **Gray-600**: `#4b5563`
- **Gray-700**: `#374151`
- **Gray-800**: `#1f2937`
- **Gray-900**: `#111827`

#### **Dark Mode Colors (HEX)**
- **Dark Background**: `#111827`
- **Dark Card**: `#1f2937`
- **Dark Text**: `#f9fafb`
- **Dark Muted**: `#9ca3af`

### **For Web/HTML**
```css
/* Primary Brand Colors */
--blue-600: #2563eb;
--blue-700: #1d4ed8;
--purple-600: #9333ea;
--purple-700: #7c3aed;

/* Text Colors */
--text-primary: #111827;
--text-secondary: #374151;
--text-muted: #6b7280;

/* Dark Mode Colors */
--dark-bg: #111827;
--dark-card: #1f2937;
--dark-text: #f9fafb;
--dark-muted: #9ca3af;
```

---

## 📋 **Usage Guidelines**

### **For Presentations**
1. **Use the gradient text** for main titles
2. **Apply card styling** for content sections
3. **Use consistent spacing** (6, 8, 12, 16, 24px)
4. **Maintain color hierarchy** for information architecture
5. **Apply hover effects** for interactive elements

### **For Web Applications**
1. **Follow the component patterns** above
2. **Use Tailwind classes** for consistency
3. **Implement dark mode** with the provided colors
4. **Apply responsive design** principles
5. **Use the animation durations** for smooth interactions

---

*This design system ensures consistency across all PostSwift presentations and applications.* 