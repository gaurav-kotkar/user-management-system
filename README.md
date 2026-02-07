# 🎯 User Management Application

A beautiful, modern React + TypeScript CRUD application with **Tailwind CSS** for managing users with an extensible, production-ready architecture.

![Tech Stack](https://img.shields.io/badge/React-18.2-61dafb?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite)

## ✨ Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete users
- 🎨 **Beautiful Tailwind UI** - Modern, professional design with gradients and animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔄 **Real-time Validation** - Instant feedback on form inputs
- 🎯 **Type-Safe** - Complete TypeScript implementation
- 🔌 **Highly Extensible** - Add new fields in ONE file
- 🎭 **Mock API Included** - Works out of the box
- 🌐 **API Ready** - Easy switch to real backend
- 🎉 **Toast Notifications** - Beautiful success/error messages
- ⚡ **Lightning Fast** - Built with Vite

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
http://localhost:5173
```

## 📋 Current Form Fields

- **First Name** - Text with pattern validation
- **Last Name** - Text with pattern validation
- **Email Address** - Email format validation
- **Phone Number** - Phone format validation

## 🎨 Adding New Fields (Super Easy!)

Edit `src/config/formSchema.ts` and add to the `fields` array:

```typescript
{
  name: 'department',
  label: 'Department',
  type: 'select',
  options: [
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
  ],
  validation: {
    required: false,
  },
  gridColumn: '1 / 3', // Full width
}
```

**That's it!** The field automatically appears in:
- ✅ Create form
- ✅ Edit form  
- ✅ API calls
- ✅ Validation

## 🎨 Tailwind CSS Customization

### Change Primary Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color',  // Main brand color
    600: '#darker-shade',
  },
}
```

### Custom Styles

The app uses Tailwind's utility classes throughout:

- `btn-primary` - Primary button style
- `btn-secondary` - Secondary button style
- `input-field` - Form input styling
- `glass` - Glassmorphism effect
- `card-hover` - Hover animations

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── FormInput.tsx    # Dynamic form input (Tailwind styled)
│   ├── UserForm.tsx     # User creation/editing modal
│   ├── UserList.tsx     # User listing table
│   └── Toast.tsx        # Toast notifications
├── config/
│   └── formSchema.ts    # 🔑 Field configuration (add fields here!)
├── services/
│   └── api.ts           # API service layer
├── utils/
│   └── validation.ts    # Validation logic
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Tailwind directives & custom styles
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Field Types Supported

```typescript
type: 'text'      // Standard text input
type: 'email'     // Email with validation
type: 'tel'       // Phone number
type: 'number'    // Numeric input
type: 'date'      // Date picker
type: 'textarea'  // Multi-line text
type: 'select'    // Dropdown (requires options array)
```

## 🎨 Design Features

### Tailwind CSS Benefits

- **Utility-first** - Fast development with utility classes
- **Responsive** - Mobile-first responsive design
- **Customizable** - Easy to customize colors and styles
- **Performance** - Purges unused CSS in production
- **Modern** - Beautiful gradients and animations

### UI Highlights

- 🎨 Gradient backgrounds and buttons
- ✨ Smooth Framer Motion animations
- 💎 Glassmorphism effects
- 🌈 Color-coded status badges
- 📊 Beautiful stat cards
- 🎭 Hover and active states
- 📱 Mobile-responsive tables

## 🔒 Validation Features

- **Required fields** - Enforced validation
- **Pattern matching** - Email, phone, names
- **Length constraints** - Min/max length
- **Custom validation** - Write your own rules
- **Real-time feedback** - Instant error messages
- **Field-level validation** - Validates on blur

## 📦 Technologies

| Technology | Purpose |
|------------|---------|
| React 18.2 | UI Framework |
| TypeScript 5.2 | Type Safety |
| Tailwind CSS 3.4 | Styling |
| Vite 5.0 | Build Tool |
| Framer Motion 10.16 | Animations |
| Lucide React | Icon Library |

## 🎯 Test Task Requirements Met

✅ **User Form Fields** - First Name, Last Name, Email, Phone  
✅ **Input Validation** - All fields validated  
✅ **Required Field Enforcement** - Proper validation  
✅ **Full CRUD Operations** - Create, Read, Update, Delete  
✅ **API Integration** - Mock API included, real API ready  
✅ **Extensibility** - Add fields in ONE file  
✅ **Clean UI Design** - Beautiful Tailwind design  
✅ **Responsive** - Works on all devices  
✅ **Deployment Ready** - Can deploy to Vercel/Netlify  
✅ **TypeScript** - Full type safety (Bonus!)  
✅ **Comprehensive Docs** - Complete README

## 📝 Example: Adding Address Field

```typescript
// In src/config/formSchema.ts
{
  name: 'address',
  label: 'Street Address',
  type: 'textarea',
  placeholder: 'Enter street address',
  validation: {
    required: false,
    maxLength: 200,
  },
  gridColumn: '1 / 3', // Spans both columns
}
```

Done! The address field now appears in your forms.

## 📄 License

Open source for educational purposes.

**Built using React + TypeScript + Tailwind CSS**

🌟 If you like this project, give it a star!
