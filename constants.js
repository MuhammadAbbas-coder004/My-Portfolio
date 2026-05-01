export const METADATA = {
  author: "Muhammad Abbas",
  title: "Portfolio | Muhammad Abbas",
  description:
    "Muhammad Abbas is a passionate MERN Stack Developer, dedicated to crafting aesthetic and modern apps that captivate and engage users.",
  siteUrl: "",
  twitterHandle: "",
  keywords: [
    "Muhammad Abbas",
    "Web Developer",
    "App Developer",
    "Software Developer",
    "Portfolio",
    "Devfolio",
    "Folio",
  ].join(", "),
  image:
    "https://res.cloudinary.com/dywdhyojt/image/upload/v1721378510/social-preview.png",
  language: "English",
  themeColor: "#000000",
};

export const MENULINKS = [
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Skills",
    ref: "skills",
  },
  {
    name: "Projects",
    ref: "projects",
  },
  {
    name: "Work",
    ref: "work",
  },
  {
    name: "Contact",
    ref: "contact",
  },
];

export const TYPED_STRINGS = [
  "A passionate MERN Stack Developer",
  "I build things for the web and mobile",
  "I create aesthetic and modern apps",
];

export const SOCIAL_LINKS = [
  {
    name: "mail",
    url: "mailto:your-email@example.com",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/muhammad-abbas-910693381",
  },
  {
    name: "github",
    url: "https://github.com/MuhammadAbbas-coder004",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/MABBASMSHAHI/",
  },
];

export const SKILLS = {
  languagesAndTools: ["html", "css", "javascript", "typescript", "sass"],
  librariesAndFrameworks: [
    "react",
    "reactnative",
    "nextjs",
    "tailwindcss",
    "bootstrap",
    "daisyui",
    "materialui",
    "shadcnui",
    "antdesign",
    "threejs",
    "gsap",
    "motionone",
    "swiperjs",
    "redux",
    "reactrouter",
  ],
  databases: [
    "mongodb",
    "supabase",
    "firebase",
  ],
  backend: ["nodejs", "express"],
  versionControl: ["git", "github"],
};

export const PROJECTS = [
  {
    name: "Micro Fiverr",
    imageKey: "micro-fiverr",
    description: "A freelancing marketplace built with modern web tech",
    gradient: ["#4F46E5", "#1E1B4B"],
    url: "https://hackathon-project-micro-fiverr-52a7.vercel.app/",
    tech: ["react", "nextjs", "tailwindcss", "mongodb"],
  },
  {
    name: "Invest Hub",
    imageKey: "invest-hub",
    description: "A full-stack startup platform where visionaries meet investors",
    gradient: ["#4F46E5", "#7C3AED"],
    url: "https://supabase-curd-dun.vercel.app/",
    tech: ["supabase", "react", "nextjs", "tailwindcss"],
  },
  {
    name: "Meme Maker",
    imageKey: "meme-maker",
    description: "A viral meme generator built with Next.js and Tailwind CSS",
    gradient: ["#F59E0B", "#EF4444"],
    url: "https://next-js-meme-macker-app.vercel.app/",
    tech: ["react", "nextjs", "tailwindcss"],
  },
  {
    name: "Expense Tracker",
    imageKey: "expense-tracker",
    description: "A sleek and efficient expense management system with real-time tracking",
    gradient: ["#312E81", "#1E1B4B"], // Deep Indigo for original SVG visibility
    url: "https://mini-project-expense-management-sys.vercel.app/",
    tech: ["react", "tailwindcss"],
  },
  {
    name: "Quiz App",
    imageKey: "quiz-app",
    description: "An interactive tech trivia app with real-time feedback and score tracking",
    gradient: ["#1E3A8A", "#2563EB"], // Royal Blue to Blue
    url: "https://quiz-app-seven-khaki.vercel.app/",
    tech: ["react", "tailwindcss"],
  },
  {
    name: "Product Store",
    imageKey: "buywow",
    description: "A comprehensive e-commerce platform with Redux-powered state management and Material UI",
    gradient: ["#1A1A2E", "#16213E"], // Deep Dark Purple to Navy
    url: "https://product-app-using-redux.vercel.app/",
    tech: ["react", "redux", "materialui", "tailwindcss"],
  },
];

export const WORK_CONTENTS = {
  FRONTEND: [
    {
      title: "Frontend Development",
      description:
        "Specialized in building highly interactive and responsive user interfaces using modern technologies like React, Next.js, and Tailwind CSS. Focused on delivering seamless user experiences across all devices and screen sizes.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4 text-center">
          Crafting intuitive user interfaces
        </div>
      ),
    },
    {
      title: "Performance & UI/UX",
      description:
        "Optimized web applications for maximum speed and scalability. Implemented complex animations using GSAP and translated UI/UX wireframes into high-quality, reusable code components.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Engineer
        </div>
      ),
    },
    {
      title: "State Management",
      description:
        "Designed robust state management architectures using Redux and React Context API. Ensured smooth data flow between the frontend components and seamless integration with RESTful APIs.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          React & Next.js Expert
        </div>
      ),
    },
  ],
  BACKEND: [
    {
      title: "Backend Architecture",
      description:
        "Architected scalable and secure backend systems using Node.js and Express. Focused on designing robust RESTful APIs and microservices that power complex web and mobile applications.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4 text-center">
          Building scalable server architectures
        </div>
      ),
    },
    {
      title: "Database Management",
      description:
        "Managed and optimized complex databases including MongoDB, Supabase, and Firebase. Implemented efficient database schemas, indexing strategies, and caching layers to reduce latency.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Backend Engineer
        </div>
      ),
    },
    {
      title: "Security & Integration",
      description:
        "Implemented robust security protocols, including JWT authentication, OAuth, and data encryption. Integrated third-party APIs and payment gateways ensuring seamless and secure transactions.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          API & Security Specialist
        </div>
      ),
    },
  ],
};

export const GTAG = "G-5HCTL2TJ5W";
