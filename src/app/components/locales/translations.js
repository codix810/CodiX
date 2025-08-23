const translations = {
  ar: {
    navbar: {
      home: "الرئيسية",
      projects: "المشاريع",
      about: "عنّا",
      contact: "تواصل",
      switch: "EN",
    },
    hero: {
      title: "أهلاً بك في",
      desc: "تصميم مواقع احترافية + مشاريع جاهزة + ثقة وجودة عالية",
      features: ["كود نظيف", "سرعة الأداء", "ثبات وجودة"], // ✅ Array
      cta: "استكشف مشاريعنا",
      brand: "CodiX",
    },
presentation: {
  title: " خدماتنا",
  items: [
    { title: "حل مشاكلك", desc: "بنحللك أي مشكلة تقنية أو برمجية بسرعة واحترافية." },
    { title: "موقعك زي ما تحلم", desc: "بنبني لك الموقع اللي في بالك وأحلى." },
    { title: "الضمان والأمان", desc: "مشاريعنا كلها تحت ضمان وأمان تام." },
    { title: "خدمة عملاء", desc: "دعم مجاني 80 يوم بعد التسليم." },
    { title: "أرخص سعر", desc: "أفضل الأسعار بدون أي تنازل عن الجودة." },
    { title: "أعلى جودة", desc: "شغل احترافي ومعايير عالمية." },
  ]
},
projects: {
  title: "مشاريعنا",
  desc: "نماذج عملية لأعمالنا المميزة.",
  cta: "استكشف المزيد",
  latest: [
    { title: "منصة تجارة إلكترونية", desc: " متجر إلكتروني متكامل بأحدث التقنيات." },
    { title: "موقع شركة", desc: " موقع عصري احترافي للشركات." },
    { title: "لوحة تحكم", desc: " لوحة تحكم متقدمة لعرض البيانات." },
  ],
  topRated: [
    { title: "صفحة هبوط", desc: "صفحة هبوط تسويقية جذابة." },
    { title: "موقع بورتفوليو", desc: "موقع شخصي احترافي للمصممين والمطورين." },
    { title: "واجهة تطبيق", desc: "تصميم واجهة مستخدم لتطبيق جوال حديث." },
  ],
},

whyus: {
  title: "ليه تختارنا؟",
  items: [
    { title: "أمان وثقة", desc: "نلتزم بتقديم مشاريع آمنة وموثوقة." },
    { title: "سرعة تنفيذ", desc: "تنفيذ سريع بجودة عالية واحترافية." },
    { title: "رضا العملاء", desc: "رضا عملائنا هو أولويتنا دائماً." },
  ]
},
about: {
  title: "عن CodiX",
  subtitle: "بنحوّل أفكارك لمنتجات رقمية سريعة، آمنة، وكود نظيف.",
  kpis: [
    { label: "مشاريع مكتملة", value: 120, suffix: "+" },
    { label: "عملاء سعداء", value: 95, suffix: "%" },
    { label: "جوائز / شهادات", value: 12, suffix: "+" },
    { label: "متوسط سرعة التسليم", value: 3, suffix: "d" }
  ],
  points: [
    { title: "كود نظيف وحديث", desc: "بنستخدم أفضل الممارسات وStandard عالي للجودة." },
    { title: "أمان وثبات", desc: "حماية، اختبارات، ومراقبة للأداء على مدار الساعة." },
    { title: "سرعة الأداء", desc: "تحسينات Core Web Vitals وتصفح سلس جداً." }
  ],
  stats: [
    { label: "نظافة الكود", value: 95 },
    { label: "الأمان", value: 92 },
    { label: "الأداء", value: 97 }
  ],
  badges: ["Next.js", "React", "Tailwind", "Framer Motion", "Node/Express"],
  cta: "ابدأ مشروعك الآن"
},
contact: {
  title: "تواصل معنا",
  subtitle: "يسعدنا نسمع منك! اكتب لنا رسالتك أو تواصل مباشرة عبر الوسائل التالية.",
  form: {
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    message: "اكتب رسالتك هنا...",
    button: "إرسال الرسالة"
  },
  methods: [
    { label: "البريد الإلكتروني", value: "info@codix.com" },
    { label: "رقم الهاتف", value: "+20123456789" },
    { label: "الدعم المباشر", value: "Live Chat" }
  ]
},
projectss: {
  title: "مشاريعنا",
  subtitle: "بعض من أعمالنا المميزة التي نفتخر بها.",
  detailsBtn: "عرض التفاصيل",
  cta: "صمّم موقعك بنفسك الآن",
  stats: [
    { label: "مشروع مكتمل", value: "120+" },
    { label: "عملاء سعداء", value: "95%" },
    { label: "سنوات خبرة", value: "5+" },
    { label: "جوائز", value: "10" },
  ],
  items: [
    {
      title: "موقع شركة برمجة",
      desc: "موقع متكامل بخدمات ولوحة تحكم وأداء عالي.",
      image: "/images/project1.jpg",
      link: "https://example.com/project1",
    },
    {
      title: "متجر إلكتروني",
      desc: "متجر عصري بواجهة جذابة وتجربة مستخدم سلسة.",
      image: "/images/project2.jpg",
      link: "https://example.com/project2",
    },
    {
      title: "تطبيق حجوزات",
      desc: "تطبيق متكامل لإدارة الحجوزات مع إشعارات مباشرة.",
      image: "/images/project3.jpg",
      link: "https://example.com/project3",
    },
  ],
},
Footer: {
  cta: "صمّم موقعك بنفسك الآن",
  subtitle: "بعض من مشاريعنا التي نفخر بها.",
  rights: "© 2025 جميع الحقوق محفوظة لكودكس",
}






  },
  en: {
    navbar: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      switch: "AR",
    },
    hero: {
      title: "Welcome to",
      desc: " Professional websites + Ready projects + Trust & High Quality",
      features: ["Clean Code", "High Performance", "Stability & Quality"], // ✅ Array
      cta: "Explore Our Projects",
      brand: "CodiX",
    },
presentation: {
  title: "Our services",
  items: [
    { title: "Problem Solving", desc: "We fix any technical or coding issues quickly and professionally." },
    { title: "Your Dream Website", desc: "We create the website you envision — and even better." },
    { title: "Warranty & Security", desc: "All our projects come with full guarantee and safety." },
    { title: "Customer Support", desc: "Free support for 80 days after delivery." },
    { title: "Best Price", desc: "Affordable rates without compromising quality." },
    { title: "Top Quality", desc: "Professional work with global standards." },
  ]
}
,
projects: {
  title: "Our Projects",
  desc: "Practical examples of our outstanding work.",
  cta: "Discover More",
  latest: [
    { title: "E-Commerce Platform", desc: " A fully integrated online store with the latest technologies." },
    { title: "Corporate Website", desc: " A modern and professional website for companies." },
    { title: "Analytics Dashboard", desc: " An advanced dashboard for data visualization." },
  ],
  topRated: [
    { title: "Landing Page", desc: "A captivating marketing landing page." },
    { title: "Portfolio Website", desc: "A professional personal site for designers and developers." },
    { title: "Mobile App UI", desc: "A sleek user interface design for a modern mobile app." },
  ],
},
whyus: {
  title: "Why Choose Us?",
  items: [
    { title: "Security & Trust", desc: "We ensure secure and reliable projects." },
    { title: "Fast Delivery", desc: "Quick execution with high quality and professionalism." },
    { title: "Customer Satisfaction", desc: "Client satisfaction is always our top priority." },
  ]
},
about: {
  title: "About CodiX",
  subtitle: "We turn ideas into fast, secure products with clean code.",
  kpis: [
    { label: "Projects Delivered", value: 120, suffix: "+" },
    { label: "Client Satisfaction", value: 95, suffix: "%" },
    { label: "Awards / Certificates", value: 12, suffix: "+" },
    { label: "Avg Delivery Speed", value: 3, suffix: "d" }
  ],
  points: [
    { title: "Clean & Modern Code", desc: "Best practices and rigorous quality standards." },
    { title: "Security & Reliability", desc: "Protection, testing, and round-the-clock monitoring." },
    { title: "High Performance", desc: "Optimized Core Web Vitals and buttery-smooth UX." }
  ],
  stats: [
    { label: "Code Quality", value: 95 },
    { label: "Security", value: 92 },
    { label: "Performance", value: 97 }
  ],
  badges: ["Next.js", "React", "Tailwind", "Framer Motion", "Node/Express"],
  cta: "Start Your Project"
},
contact: {
  title: "Contact Us",
  subtitle: "We’d love to hear from you! Send us a message or reach out directly.",
  form: {
    name: "Full Name",
    email: "Email Address",
    message: "Type your message here...",
    button: "Send Message"
  },
  methods: [
    { label: "Email", value: "codix810@codix.com" },
    { label: "Phone", value: "+201001514586" },
    { label: "Live Support", value: "Live Chat" }
  ]
},
projectss: {
  title: "Our Projects",
  subtitle: "Some of our distinguished work that we are proud of.",
  detailsBtn: "View Details",
  cta: "Design your website now",
  stats: [
    { label: "Completed Projects", value: "120+" },
    { label: "Happy Clients", value: "95%" },
    { label: "Years of Experience", value: "5+" },
    { label: "Awards", value: "10" },
  ],
  items: [
    {
      title: "Software Company Website",
      desc: "A full-featured website with services, dashboard, and high performance.",
      image: "/images/project1.jpg",
      link: "https://example.com/project1",
    },
    {
      title: "E-Commerce Store",
      desc: "A modern store with an attractive interface and smooth user experience.",
      image: "/images/project2.jpg",
      link: "https://example.com/project2",
    },
    {
      title: "Booking Application",
      desc: "A complete app for managing reservations with real-time notifications.",
      image: "/images/project3.jpg",
      link: "https://example.com/project3",
    },
  ],
},
Footer: {
  cta: "Design Your Website Yourself Now",
  subtitle: "Some of our projects that we are proud of.",
  rights: "© 2025 All rights reserved by CodiX",
}






  },
};

export default translations;
