
📦 Restaurant-Menu-WebApp
 
├── index.html                ← Main app 
├── style.css 
├── app.js
├── ai.js
├── manifest.json
├── service-worker.js
├── vercel.json
│
├── 📁 js/
│   ├── utils.js
│   ├── ui.js
│   └── pwa.js
│
├── 📁 api/
│   └── ask.js                     ← OpenRouter AI 
│
├── 📁 auth/                       ← 🔐 AUTH LOGIC 
│   ├── firebase.js                ← Firebase config
│   ├── auth-guard.js              ← Login check 
│   ├── login.js                   ← Login logic
│   └── signup.js                  ← Signup logic
│
├── 📁 pages/                      ← 🔐 AUTH PAGES
│   ├── login.html
│   └── signup.html
│
├── 📁 components/             ← UI components
│   ├── MealCard.js
│   ├── Header.js
│   ├── BottomNav.js
│   └── Loader.js
│
├── 📁 assets/
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── images/
│       ├── food1.jpg
│       ├── food2.jpg
│       └── ...
│
└── README.md
