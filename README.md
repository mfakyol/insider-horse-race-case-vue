# 🏇 Horse Racing Game - Vue 3 Frontend Case Study

An interactive horse racing game built with Vue 3 and TypeScript. This project demonstrates modern frontend development practices including state management, animations, and component composition.

## 🎯 Project Overview

A complete horse racing simulation game with:

- 20 randomly generated horses
- 6-round racing system (1200m to 2200m)
- Real-time animated horse racing
- Interactive race controls
- Race results tracking

## ✨ Features

- Generate horse list with unique names and colors
- Create 6-round race schedule
- Start, pause, resume races
- Animated horse movements with SVG icons
- View race results and standings
- Responsive design with SCSS modules

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎮 How to Play

1. **Generate Program**: Click "Generate Program" to create a 6-round race schedule
2. **Start Racing**: Click "Start Race" to begin the first round
3. **Watch Races**: Observe animated horses racing across the track
4. **Control Races**: Use pause/resume controls during races
5. **Advance Rounds**: Click "Next Round" to proceed to subsequent races
6. **View Results**: Check detailed results for each completed race

## 🏗️ Architecture

### 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   │   ├── Button.vue  # Custom button component
│   │   ├── Table.vue   # Generic table components
│   │   ├── Title.vue   # Styled heading component
│   │   └── HorseIcon.vue # SVG horse icon
│   ├── Header.vue      # Navigation and race controls
│   ├── HorseList.vue   # Horse roster display
│   └── GameView.vue    # Main game area with race track
├── assets/             # Static assets
│   ├── horse.svg       # Horse icon
│   └── styles/         # SCSS variables and global styles
├── services/           # Business logic and data processing
├── stores/             # Pinia state management
│   └── raceStore.ts    # Race state management
├── types/              # TypeScript type definitions
└── App.vue            # Root component
```

### 🎯 Key Technologies

- **Vue 3** - Composition API & modern Vue features
- **TypeScript** - Full type safety
- **Vite** - Lightning fast build tool
- **Pinia** - Vue's official state management
- **SCSS Modules** - Scoped styling
- **SVG Components** - Scalable vector graphics

## 🎨 UI/UX Design

### Component Architecture

- **Composition API**: Modern Vue 3 reactive patterns
- **CSS Modules**: Scoped styling with SCSS
- **Props & Emits**: Type-safe component communication
- **Slot System**: Flexible content projection

### Color Palette

- **Primary**: Dynamic horse colors (randomly generated)
- **Secondary**: Race track green (#4CAF50)
- **Accent**: Yellow highlights for active elements
- **Neutral**: Professional grays for UI elements

### Typography

- **Headers**: Bold, clear hierarchy
- **Body**: Readable sans-serif font
- **Data**: Clean presentation for race information

### Animations

- **Horse Movement**: Smooth CSS transitions for racing
- **UI Interactions**: Responsive hover and click effects
- **Performance**: Optimized for 60fps animation

## 📊 Performance

- **Bundle Size**: Tree-shaking and modern ES modules
- **Component Performance**: Reactive updates with Vue 3's proxy system
- **Memory Management**: Automatic cleanup and efficient reactivity
- **Loading Speed**: Fast HMR and development experience with Vite

## 🔧 Development

### Code Quality

- **ESLint**: Vue 3 and TypeScript best practices
- **TypeScript**: Strict type checking
- **Path Aliases**: Clean imports with @ syntax
- **CSS Modules**: Scoped styling prevents conflicts

### Vue 3 Features

- **Composition API**: Logical composition and reusability
- **Script Setup**: Simplified component syntax
- **Reactive State**: Efficient state management with Pinia
- **TypeScript Integration**: Full type safety across components

### Component Development

- **Single File Components**: Template, script, and style in one file
- **Props Validation**: Runtime and compile-time type checking
- **Emit Events**: Type-safe component communication
- **CSS Modules**: Scoped styling with SCSS support

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deploy to GitHub Pages

#### Option 1: GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. Configure Vite for GitHub Pages by updating `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/insider-horse-race-case-vue/', // Replace with your repo name
  plugins: [vue(), vueDevTools(), svgLoader()],
  // ... rest of config
})
```

3. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Select "GitHub Actions" as source

#### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Navigate to dist folder
cd dist

# Initialize git repository
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Push to gh-pages branch
git push -f git@github.com:mfakyol/insider-horse-race-case-vue.git main:gh-pages
```

#### Option 3: Using gh-pages package

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Other Hosting Options

- **Netlify**: Drag and drop `dist` folder or connect GitHub repository
- **Vercel**: Import GitHub repository with automatic deployments
- **Firebase Hosting**: Use Firebase CLI to deploy

### Preview Production Build

```bash
npm run preview
```

## 🎯 Case Study Highlights

This project demonstrates:

1. **Modern Vue 3 Patterns**: Composition API and script setup syntax
2. **State Management**: Complex application state with Pinia
3. **TypeScript Integration**: Full type safety in Vue components
4. **Component Architecture**: Reusable and maintainable components
5. **Performance Optimization**: Efficient rendering and bundle size
6. **Developer Experience**: Fast development with Vite and HMR
7. **Code Organization**: Scalable project structure

## 🛠️ Technical Stack

- **Frontend Framework**: Vue 3.5+
- **Language**: TypeScript 5.0+
- **Build Tool**: Vite 7.0+
- **State Management**: Pinia 3.0+
- **Styling**: SCSS with CSS Modules
- **Icons**: SVG components
- **Development**: Vue DevTools, ESLint, Prettier

## 📋 Browser Support

- Chrome 87+
- Firefox 78+
- Safari 14+
- Edge 88+

## 📝 License

This project is created as a Vue 3 frontend case study and is available for educational purposes.

---

**Built with ❤️ using Vue 3, TypeScript, and modern web technologies**

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
