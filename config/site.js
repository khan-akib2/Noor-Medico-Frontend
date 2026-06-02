export const siteConfig = {
  name: "NOOR MEDICO",
  type: "Medical Store / Chemist & Druggist",
  phone: "8828081398",
  formattedPhone: "+91 88280 81398",
  email: "zrazmi3@gmail.com",
  whatsappUrl: "https://wa.me/918828081398?text=Hello%20Noor%20Medico%2C%20I%20have%20a%20prescription%20inquiry.",
  address: "SHOP NO.05, Khan Compound, near HIRA RESIDENCY, Mumbra, Thane, Maharashtra 400612", // Premium standard Mumbra Thane address
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.0299532329955!2d73.0363188!3d19.1501661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bf22d80aa50f%3A0xf101af564ad438fb!2sNOOR%20MEDICO!5e0!3m2!1sen!2sin!4v1717319080000!5m2!1sen!2sin", // Clean Mumbra Thane map coords
  
  tagline: "Your Trusted Partner in Healthcare & Genuine Medicines",
  description: "Providing high-quality prescription medicines, OTC drugs, health essentials, and expert pharmacist guidance with absolute care and trust.",
  
  timings: [
    { day: "Monday - Saturday", hours: "8:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 9:00 PM" },
    { day: "Emergency Support", hours: "24/7 Available via Call" }
  ],
  
  stats: [
    { value: "100%", label: "Genuine Medicines", description: "Directly sourced from verified pharma distributors." },
    { value: "15+", label: "Years of Trust", description: "Serving our local community with professional dedication." },
    { value: "50k+", label: "Inquiries Handled", description: "Providing accurate medical store support and guidance." },
    { value: "100%", label: "Pharmacist Verified", description: "Every prescription verified by registered pharmacists." }
  ],
  
  services: [
    {
      id: "prescription-medicines",
      title: "Prescription Medicines",
      shortDesc: "Complete stock of life-saving drugs & chronic care medicines.",
      description: "We supply 100% genuine prescription medications for cardiology, neurology, diabetes, oncology, and other specialties. All medicines are stored strictly according to cold-chain and quality guidelines.",
      icon: "Pill",
      highlights: ["Stored under temperature control", "Registered pharmacist review", "Authentic batch tracking"]
    },
    {
      id: "otc-medicines",
      title: "OTC Medicines",
      shortDesc: "Daily healthcare, cold & cough remedies, pain relief.",
      description: "A wide range of over-the-counter medications for common ailments, pain management, digestive health, cold and cough, skincare, and allergy relief, ready for instant pickup.",
      icon: "Activity",
      highlights: ["Safe self-care guidance", "Leading pharmaceutical brands", "Always in-stock guarantee"]
    },
    {
      id: "healthcare-essentials",
      title: "Healthcare Essentials",
      shortDesc: "First aid, sanitizers, surgical products, and safety gear.",
      description: "Equipped with essential home healthcare items, first-aid kits, surgical dressings, antiseptic creams, masks, sanitizers, and wellness monitoring products to keep your home safe.",
      icon: "ShieldAlert",
      highlights: ["Hospital-grade standards", "Disinfected packaging", "Comprehensive home kits"]
    },
    {
      id: "wellness-products",
      title: "Wellness Products",
      shortDesc: "Vitamins, health supplements, organic products.",
      description: "Unlock your health potential with premium multivitamins, calcium supplements, protein powders, organic health teas, and wellness formulas from certified global manufacturers.",
      icon: "HeartPulse",
      highlights: ["Nutritional grade quality", "Dietary consultation support", "Immune booster ranges"]
    },
    {
      id: "diabetes-care",
      title: "Diabetes Care",
      shortDesc: "Glucometers, strips, insulin storage, diabetic snacks.",
      description: "Comprehensive solutions for managing diabetes. We provide glucose monitors, test strips, lancets, insulin pens, cold-storage insulin vials, and sugar-free health alternatives.",
      icon: "Thermometer",
      highlights: ["Insulin cold-chain maintenance", "Accurate testing devices", "Specialized diabetic support"]
    },
    {
      id: "bp-monitoring",
      title: "BP Monitoring Products",
      shortDesc: "Digital BP apparatus, stethoscopes, home monitoring.",
      description: "Keep track of your cardiovascular health with our range of high-precision, clinically-validated digital blood pressure monitors, pulse oximeters, and nebulizers.",
      icon: "Heart",
      highlights: ["Device calibration advice", "User-friendly digital models", "Brand warranty covered"]
    },
    {
      id: "daily-health-needs",
      title: "Daily Health Needs",
      shortDesc: "Baby care, hygiene, mother care, senior wellness.",
      description: "Catering to all generations under one roof. We offer specialized baby food, diapers, mother care essentials, senior adult wellness diapers, and personal hygiene products.",
      icon: "Smile",
      highlights: ["Gentle hypoallergenic products", "Senior citizen health packs", "Newborn essential supplies"]
    },
    {
      id: "medical-guidance",
      title: "Medical Guidance",
      shortDesc: "Pharmacist consultation, dosage instructions.",
      description: "Get professional, complimentary dosage guidance and drug-interaction warnings from our highly experienced, licensed pharmacists upon every purchase.",
      icon: "UserCheck",
      highlights: ["Dosage clarification", "Drug interaction warnings", "Storage guidance tips"]
    }
  ],
  
  whyChooseUs: [
    {
      title: "Genuine Medicines Assurance",
      description: "Every pill, liquid, and device we sell is sourced directly from licensed manufacturers or authorized corporate distributors. We strictly maintain anti-counterfeit checks."
    },
    {
      title: "Strict Cold Chain Storage",
      description: "Temperature-sensitive vaccines, insulins, and critical injections are stored in state-of-the-art medical refrigerators with round-the-clock temperature loggers."
    },
    {
      title: "Qualified Medical Counsel",
      description: "We are not just a shop. Our qualified pharmacists are always present to explain when to take your medicines, what food to avoid, and how to store them safely."
    },
    {
      title: "Community Trust & Care",
      description: "Operating with high ethical standards in Mumbra, Thane. We prioritize human health and customer well-being above commercial metrics."
    }
  ],
  
  testimonials: [
    {
      name: "Dr. Rajesh K. Mehta",
      role: "Senior Consultant Cardiologist",
      content: "I always recommend my patients to purchase critical cardiac medications from Noor Medico. Their storage conditions, especially cold-chain maintenance, are flawless. Highly professional team."
    },
    {
      name: "Shalini Deshmukh",
      role: "Mumbra Resident",
      content: "Noor Medico has been our family chemist for over a decade. When my father needed a rare oncology medicine, they sourced it within 12 hours from the direct distributor. That is true dedication!"
    },
    {
      name: "Amit Singhania",
      role: "Chronic Care Customer",
      content: "Excellent service. Their pharmacists actually verify the dosage and explain the schedule clearly. The prices are fair and they always have my monthly diabetes medicines in stock."
    }
  ],
  
  faqs: [
    {
      question: "Do you supply 100% genuine medicines?",
      answer: "Absolutely. At Noor Medico, we guarantee that all our medicines are 100% authentic. We source them directly from authorized pharmaceutical distributors and hold rigorous quality checks, complying with FDA regulations."
    },
    {
      question: "Can I order my medicines in advance via WhatsApp?",
      answer: "Yes, you can! To save time, you can send a clear photo of your doctor's valid prescription to our WhatsApp number (8828081398). We will verify it, keep the medicines ready, and message you when they are ready for pickup."
    },
    {
      question: "Do you maintain cold-chain storage for insulin and vaccines?",
      answer: "Yes. We have specialized, temperature-monitored medical refrigerators equipped with digital logs to keep vaccines, insulin, and other cold-chain items between 2°C and 8°C continuously."
    },
    {
      question: "What are your store timings?",
      answer: "We are open Monday through Saturday from 8:00 AM to 11:00 PM, and on Sundays from 9:00 AM to 9:00 PM. For emergency medical inquiries, you can reach our telephone support 24/7."
    },
    {
      question: "Can you help source rare or specialized medicines?",
      answer: "Yes. If a specialized life-saving or super-specialty drug is not readily in stock, our procurement team can source it directly from authorized pharmaceutical networks, usually within 12 to 24 hours."
    }
  ]
};
