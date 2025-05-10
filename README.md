Sweet Creations – Custom Bakery Ordering App

Summary
A full-stack, responsive web application for customers to design and order custom cakes and cupcakes. Built out of my personal passion for baking, this app allows real-time customization, image upload for inspiration, and dynamic price calculation.

Technologies Used
Frontend: Next.js 14, React 18, Tailwind CSS
Backend: Supabase (PostgreSQL, Auth, and Storage)
State Management: React Context API
Tools: Git, Vercel (deployment), Figma (UI prototyping)

Architecture Overview
Frontend (React-based) handles all user interactions and customizations via controlled forms.
Backend is powered by Supabase, managing user data, orders, authentication, and file uploads.
Pricing Engine runs on the client-side, consuming user-selected options and computing total dynamically.

Key Challenges & Solutions
Real-time customization logic: Handled using React Context for form state persistence across components.
File uploads for design inspiration: Integrated Supabase Storage to support uploading and previewing files.
Maintaining responsive design: Leveraged Tailwind utility classes and mobile-first UI patterns.

UX/UI Considerations
Built with accessibility-first design principles.
Live previews for uploaded images.
Simple, friendly interface with visual cues for selections and pricing.
