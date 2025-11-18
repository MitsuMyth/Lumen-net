# 🌊 LumenNet - React App (Using JSX)

## ✅ All Files Now Use .jsx Extension!

All component files have been renamed from `.js` to `.jsx` for clarity:

### Component Files (JSX):
- ✅ **App.jsx** - Main app (was App.js)
- ✅ **index.jsx** - Entry point (was index.js)
- ✅ **Home.jsx** - Landing page (was Home.js)
- ✅ **MapPage.jsx** - Interactive map (was MapPage.js)
- ✅ **Learn.jsx** - Educational content (was Learn.js)
- ✅ **Luma.jsx** - AI assistant (was Luma.js)

### Style Files (CSS):
- Home.css
- MapPage.css
- Learn.css
- Luma.css
- App.css
- index.css

---

## 🤔 JSX vs JS - What's the Difference?

**JSX (JavaScript XML):**
- React's syntax extension
- Lets you write HTML-like code in JavaScript
- Example: `<div className="hello">Hi!</div>`
- Files with JSX should use `.jsx` extension (best practice)

**JS (JavaScript):**
- Pure JavaScript without HTML-like syntax
- Example: `React.createElement('div', {className: 'hello'}, 'Hi!')`

**In React:**
- Both `.jsx` and `.js` work (React compiles both)
- `.jsx` is more explicit and recommended
- Your project now uses `.jsx` for all components! ✨

---

## 🚀 Quick Start (Same as Before!)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start
```

**Nothing changes in how you run it!** React Scripts handles JSX compilation automatically.

---

## 📝 JSX Syntax Examples

### Example 1: Basic JSX (from Home.jsx)
```jsx
return (
  <div className="home-page">
    <h1>The Ocean Has a <span>Nightlife</span></h1>
    <button onClick={handleClick}>Click me</button>
  </div>
);
```

### Example 2: JSX with JavaScript (from MapPage.jsx)
```jsx
{regions.map(region => (
  <div key={region.id}>
    <h3>{region.name}</h3>
    <p>Risk: {region.risk}%</p>
  </div>
))}
```

### Example 3: Conditional JSX (from Luma.jsx)
```jsx
{isOpen && (
  <div className="chat-window">
    <p>Chat is open!</p>
  </div>
)}
```

---

## 🎯 JSX Rules to Remember

1. **className** not class
   ```jsx
   ❌ <div class="container">
   ✅ <div className="container">
   ```

2. **Self-closing tags**
   ```jsx
   ❌ <img src="ocean.jpg">
   ✅ <img src="ocean.jpg" />
   ```

3. **JavaScript in curly braces**
   ```jsx
   ✅ <h1>{userName}</h1>
   ✅ <p>{2 + 2}</p>
   ```

4. **camelCase event handlers**
   ```jsx
   ❌ <button onclick={...}>
   ✅ <button onClick={...}>
   ```

5. **Must have ONE parent element**
   ```jsx
   ❌ 
   return (
     <h1>Title</h1>
     <p>Text</p>
   )
   
   ✅ 
   return (
     <div>
       <h1>Title</h1>
       <p>Text</p>
     </div>
   )
   ```

---

## 📁 Updated Project Structure

```
lumennet-react/
├── src/
│   ├── components/
│   │   ├── Home.jsx       ← JSX component
│   │   ├── Home.css
│   │   ├── MapPage.jsx    ← JSX component
│   │   ├── MapPage.css
│   │   ├── Learn.jsx      ← JSX component
│   │   ├── Learn.css
│   │   ├── Luma.jsx       ← JSX component
│   │   └── Luma.css
│   ├── App.jsx            ← JSX component
│   ├── App.css
│   ├── index.jsx          ← JSX entry point
│   └── index.css
├── public/
│   └── index.html
└── package.json
```

---

## ✨ Everything Still Works the Same!

- ✅ Same commands: `npm start`, `npm build`
- ✅ Same functionality
- ✅ Same features
- ✅ Just clearer file extensions!

---

## 🎓 For Your Project

When explaining to your team/teacher:
- "We use **JSX** files for React components"
- "JSX lets us write HTML-like code in JavaScript"
- "React Scripts compiles JSX to regular JavaScript automatically"
- "All our components (Home, Map, Learn, Luma) are JSX files"

---

**Made with 🌊 and proper JSX syntax!**
