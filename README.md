# Wedding Memories Collection App

A modern, elegant single-page application for collecting and sharing wedding photos and videos from guests. Built with Next.js 14, TypeScript, and Cloudinary.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=flat-square&logo=cloudinary)

## ✨ Features

- **🎯 Single-Page Experience** - No scrolling needed, everything fits perfectly
- **📱 Mobile-First Design** - Optimized for all devices with touch-friendly interactions
- **🎨 Elegant Wedding Theme** - Beautiful gradients, animations, and glass morphism effects
- **📤 Drag & Drop Upload** - Intuitive file upload with real-time progress tracking
- **🔐 Anonymous Uploads** - No personal information required from guests
- **⚡ Real-time Feedback** - Instant upload status and success notifications
- **🎬 Mixed Media Support** - Accepts photos (JPEG, PNG, HEIC) and videos (MP4, MOV, AVI)
- **☁️ Cloud Storage** - Powered by Cloudinary for reliable media management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudinary account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mustafakbaser/Memories-app.git
   cd memories-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   > 💡 Get your Cloudinary credentials from [dashboard.cloudinary.com](https://console.cloudinary.com/console)

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/
│   │   └── upload/          # Upload API endpoint
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main single-page application
│
├── components/
│   ├── ui/                  # Shadcn/ui components
│   └── FileUpload.tsx       # Upload component with drag & drop
│
├── hooks/
│   └── useUpload.ts         # Custom upload hook with progress tracking
│
├── lib/
│   ├── cloudinary.ts        # Cloudinary configuration
│   └── utils.ts             # Utility functions
│
├── styles/
│   └── globals.css          # Global styles & Tailwind directives
│
└── types/
    └── index.ts             # TypeScript definitions
```

## ⚙️ Configuration

### Event Customization

Edit the event configuration in `src/app/page.tsx`:

```typescript
const eventConfig = {
  eventName: 'Esra & M. Kürşad',
  eventDate: '19 Eylül 2025',
  welcomeMessage: 'Düğün günümüzün anılarını bizimle paylaşın',
  subtitle: 'Çektiğiniz özel anları yükleyerek mutluluğumuza ortak olun'
};
```

### Upload Limits

Modify default limits in `src/app/page.tsx`:

```typescript
<FileUpload
  maxFiles={20}           // Maximum number of files
  maxFileSize={100}       // Size in MB per file
  allowedFileTypes={...}  // Customize accepted file types
/>
```

### Theme Customization

Update colors in `tailwind.config.ts` or modify the gradient classes directly in components.

## 📦 Deployment

### Deploy to Netlify (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mustafakbaser/Memories-app)

1. Click the button above
2. Connect your GitHub account
3. Add your Cloudinary environment variables in Site Settings > Environment Variables
4. Deploy

### Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/deploy?template=https://github.com/mustafakbaser/Memories-app)

### Deploy to Render

1. Fork this repository
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Add environment variables
5. Deploy with these settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables (Production)

Ensure these are set in your hosting platform:

| Variable | Description | Required |
|----------|-------------|----------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + Custom components
- **Icons**: [Lucide React](https://lucide.dev/)
- **File Upload**: [React Dropzone](https://react-dropzone.js.org/)
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/)
- **Form Validation**: [Zod](https://zod.dev/)

## 🔒 Security Features

- ✅ File type validation (whitelist approach)
- ✅ File size limits
- ✅ Secure server-side upload to Cloudinary
- ✅ No personal data collection
- ✅ Environment variable protection
- ✅ Input sanitization

## 🎯 Performance Optimizations

- Lazy loading for images
- Optimized animations for mobile
- Reduced motion for accessibility
- Efficient re-renders with React hooks
- Next.js automatic optimizations
- Cloudinary automatic image optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Netlify](https://netlify.com) / [Railway](https://railway.app) / [Render](https://render.com) for hosting
- [Cloudinary](https://cloudinary.com) for media management
- [Shadcn/ui](https://ui.shadcn.com) for UI components
- All contributors and users