# Jobseek - Job Application Tracker

A comprehensive job application management platform designed to help job seekers track, organize, and manage their job applications efficiently.

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Job Application Dashboard**: View and manage all your job applications in one place
- **Search & Filter**: Search by company or role, filter by status (Applied, Interviewed, Rejected)
- **Job Details**: Detailed view of each application with company information, job duties, requirements, and notes
- **Add/Edit Jobs**: Easily add new job applications or update existing ones
- **Status Tracking**: Track application status (Applied, Interviewed, Rejected)
- **Responsive Design**: Fully responsive design that works on all devices
- **Contact Form**: Get in touch with the team through the contact form

## 🚀 Live Demo

Visit the live application: [https://Jose-IDO.github.io/my-react-app-task3](https://Jose-IDO.github.io/my-react-app-task3)

## 🛠️ Tech Stack

- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7.8** - Client-side routing
- **JSON Server** - Mock API backend
- **CSS Modules** - Scoped styling

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Jose-IDO/my-react-app-task3.git
cd my-react-app-task3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. (Optional) Start the JSON server for the mock API:
```bash
npm run json-server
```

Or run both concurrently:
```bash
npm run dev:full
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run json-server` - Start JSON server on port 3001
- `npm run dev:full` - Run dev server and JSON server concurrently
- `npm run deploy` - Deploy to GitHub Pages

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Auth/           # Login and Register components
│   ├── button/         # Button component
│   ├── ContactUs/      # Contact form component
│   ├── Footer/         # Footer component
│   ├── Inputs/         # Input and TextInput components
│   ├── Navbar/         # Navigation bar
│   ├── NotFoundComponent/  # 404 page component
│   ├── Overlay/        # Modal overlay
│   ├── Search/         # Search functionality
│   ├── Text/           # Text component
│   └── Whitebox/        # Container component
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Landingpage.tsx # Landing page
│   ├── AddJob.tsx      # Add job form
│   ├── JobDetails.tsx  # Job details view
│   ├── ContactUs.tsx   # Contact page
│   └── NotFound.tsx    # 404 page
├── services/           # API services
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── config/             # Configuration files
```

## ✨ Recent Improvements

### UI/UX Enhancements
- ✅ Fixed 404 page error screen issue
- ✅ Improved protected route handling with better user feedback
- ✅ Added input validation (phone numbers, email, etc.)
- ✅ Enhanced interactive cues (hover states, cursor pointers)
- ✅ Improved responsive design with better font sizing and spacing
- ✅ Fixed search bar overflow and alignment issues
- ✅ Removed duplicate search bars
- ✅ Better component reusability throughout the app

### Technical Improvements
- ✅ Clean state management across components
- ✅ Consistent props handling
- ✅ Improved TypeScript type safety
- ✅ Better error handling
- ✅ Optimized build and deployment process

## 🎨 Design Features

- Modern, clean interface
- Gradient color scheme
- Smooth transitions and animations
- Mobile-first responsive design
- Accessible interactive elements

## 📝 Usage

1. **Register/Login**: Create an account or login to access the dashboard
2. **Add Jobs**: Click "Add Job" to track a new application
3. **Search**: Use the search bar to find specific applications
4. **Filter**: Filter applications by status (Applied, Interviewed, Rejected)
5. **View Details**: Click "View Details" to see full job information
6. **Edit/Delete**: Update or remove job applications as needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👤 Author

Jose-IDO

---

Built with ❤️ using React, TypeScript, and Vite
