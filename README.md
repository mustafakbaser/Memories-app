# 📸 Memories App - Event Photo Sharing Platform

Modern ve şık bir düğün/event fotoğraf paylaşım uygulaması. Misafirlerinizin çektiği fotoğraf ve videoları kolayca toplayın ve paylaşın.

## ✨ Özellikler

- 🖼️ **Drag & Drop Yükleme** - Kolay dosya yükleme deneyimi
- 🎥 **Video Desteği** - Fotoğraf ve video paylaşımı
- 📱 **Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- ⚡ **Gerçek Zamanlı Progress** - Yükleme durumu takibi
- 🎨 **Modern UI** - Framer Motion animasyonları
- ☁️ **Cloudinary Entegrasyonu** - Optimize edilmiş görüntü işleme
- 🔍 **Galeri Filtreleme** - Tip ve yükleyene göre filtreleme
- 💾 **Otomatik İndirme** - Fotoğrafları tek tıkla indirin

## 🚀 Teknoloji Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Radix UI + Lucide Icons
- **File Upload**: React Dropzone
- **Cloud Storage**: Cloudinary
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand (gelecek özellikler için)

## 🛠️ Kurulum

1. **Projeyi klonlayın**
   ```bash
   git clone <repo-url>
   cd memories-app
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Environment değişkenlerini ayarlayın**
   ```bash
   cp .env.local.example .env.local
   ```
   
   `.env.local` dosyasını düzenleyerek Cloudinary bilgilerinizi ekleyin:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

5. **Tarayıcıda açın**
   [http://localhost:3000](http://localhost:3000)

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── api/upload/        # File upload API endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── FileUpload.tsx    # File upload component
│   └── Gallery.tsx       # Photo gallery component
├── hooks/                # Custom React hooks
│   └── useUpload.ts      # File upload hook
├── lib/                  # Utility functions
│   ├── utils.ts          # General utilities
│   └── cloudinary.ts     # Cloudinary integration
├── types/                # TypeScript type definitions
│   └── index.ts          # App types
└── styles/               # Global styles
    └── globals.css       # Global CSS + Tailwind
```

## 🎨 Özelleştirme

### Event Bilgilerini Güncelleme

`src/app/page.tsx` dosyasındaki `eventConfig` objesini düzenleyin:

```typescript
const eventConfig = {
  eventName: 'Esra & Mustafa',
  eventDate: '19 Eylül 2025',
  coupleNames: ['Ayşe', 'Mehmet'],
  welcomeMessage: 'Özel günümüzün anılarını bizimle paylaşın!',
};
```

### Dosya Limitleri

`src/components/FileUpload.tsx` dosyasında varsayılan değerleri değiştirin:

```typescript
<FileUpload
  maxFiles={20}        // Maksimum dosya sayısı
  maxFileSize={100}    // MB cinsinden dosya boyutu
  allowedFileTypes={[  // İzin verilen dosya tipleri
    'image/jpeg',
    'image/png',
    'video/mp4',
    // ...
  ]}
/>
```

### Tema Renkleri

`tailwind.config.ts` ve `src/styles/globals.css` dosyalarından tema renklerini özelleştirin.

## 🔧 Scripts

- `npm run dev` - Geliştirme sunucusu
- `npm run build` - Production build
- `npm run start` - Production sunucu
- `npm run lint` - ESLint kontrolü
- `npm run type-check` - TypeScript kontrol

## 📦 Deployment

### Vercel (Önerilen)

1. GitHub'a push edin
2. [Vercel](https://vercel.com)'e import edin
3. Environment variables ekleyin
4. Deploy edin

### Diğer Platformlar

```bash
npm run build
npm run start
```

## 🔒 Güvenlik

- ✅ Dosya tipi validasyonu
- ✅ Dosya boyutu limitleri
- ✅ Cloudinary güvenli yükleme
- ✅ XSS koruması
- ⚠️ Authentication (gelecek güncellemede)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

MIT License - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 💡 Gelecek Özellikler

- [ ] Kullanıcı authentication
- [ ] Database entegrasyonu (PostgreSQL/MongoDB)
- [ ] Email bildirimleri
- [ ] Toplu indirme (ZIP)
- [ ] QR kod paylaşımı
- [ ] Admin paneli
- [ ] Fotoğraf moderasyonu
- [ ] Sosyal medya paylaşımı

---

**Özel günlerinizin anılarını güvenle paylaşın! 💕**