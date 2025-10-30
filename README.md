# BOSS İNŞAAT - Company Website

A modern, responsive, multilingual website for BOSS Construction Company.

## 🌍 Languages Supported
- 🇹🇷 Turkish (Türkçe) - Default
- 🇬🇧 English
- 🇮🇹 Italian (Italiano)
- 🇸🇦 Arabic (العربية) - with RTL support

## ✨ Features

### Core Features
- **Single-Page Design** with smooth scrolling navigation
- **Multilingual Support** - Easy language switching with localStorage persistence
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **RTL Support** - Automatic right-to-left layout for Arabic
- **Contact Form** - Functional contact form with validation
- **SEO Friendly** - Proper meta tags and semantic HTML

### Sections
1. **Home (Hero)** - Eye-catching hero section with call-to-action
2. **About Us** - Company information with statistics
3. **Services** - 6 key service offerings
4. **Projects** - Portfolio of completed projects with external links
5. **Equipment** - Company machinery and equipment showcase
6. **Contact** - Contact form and company information

### Technical Features
- Fixed navigation header with scroll effect
- Active navigation link highlighting
- Back-to-top button
- Smooth scroll animations
- Lazy loading for images
- Parallax effect on hero section
- Form validation and submission handling

## 📁 Project Structure

```
website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Custom styles
├── js/
│   ├── main.js            # Main JavaScript functionality
│   └── translations.js    # Translation helper
├── translations/
│   └── translations.json  # All language translations
├── images/
│   └── logo.jpg          # Company logo
└── data/                  # Additional data files
```

## 🎨 Design

### Color Scheme
Based on the BOSS İnşaat logo:
- **Primary**: #00B4D8 (Logo Blue)
- **Primary Dark**: #0096B8
- **Secondary**: #023E8A (Deep Blue)
- **Accent**: #0077B6

### Typography
- Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Responsive font sizes for all devices

### Layout
- Bootstrap 5.3.2 grid system
- Custom components and cards
- Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A web server (for local testing) or hosting service

### Installation

1. **Download the website folder**
   - All files are in the `website` directory

2. **For Local Testing:**
   ```bash
   # Option 1: Using Python
   cd website
   python -m http.server 8000
   # Then open: http://localhost:8000

   # Option 2: Using Node.js (http-server)
   npm install -g http-server
   cd website
   http-server
   # Then open: http://localhost:8080

   # Option 3: Using PHP
   cd website
   php -S localhost:8000
   # Then open: http://localhost:8000
   ```

3. **For Production Deployment:**
   - Upload the entire `website` folder to your hosting service
   - Make sure all files maintain their folder structure
   - Access through your domain

## 🌐 Hosting Options

### Option 1: Traditional Hosting (Natro, cPanel, etc.)
1. Use FTP/File Manager to upload the `website` folder
2. Point your domain to the folder
3. Ensure all files are uploaded correctly

### Option 2: Free Hosting Options
- **GitHub Pages**: Free, easy to set up
- **Netlify**: Drag & drop deployment
- **Vercel**: Simple deployment
- **Cloudflare Pages**: Fast and free

### GitHub Pages Deployment
```bash
# Create a new repository on GitHub
# Upload all files from the website folder
# Go to Settings > Pages
# Select main branch as source
# Your site will be live at: https://yourusername.github.io/repository-name
```

## 📝 Customization Guide

### Adding Company Information

1. **Contact Details** (index.html, line ~460)
   ```html
   <p>Türkiye</p> <!-- Update address -->
   <p>+90 XXX XXX XX XX</p> <!-- Update phone -->
   <p>info@bossinsaat.com</p> <!-- Update email -->
   ```

2. **Social Media Links** (index.html, line ~475)
   ```html
   <a href="your-facebook-url" class="social-link">
   <a href="your-instagram-url" class="social-link">
   <!-- Add your social media URLs -->
   ```

### Updating Translations

Edit `translations/translations.json`:
```json
{
  "tr": {
    "nav": {
      "home": "Your Text"
    }
  }
}
```

### Adding More Projects

In `index.html`, duplicate a project card:
```html
<div class="col-lg-4 col-md-6">
    <div class="project-card">
        <!-- Project content -->
    </div>
</div>
```

### Changing Colors

In `css/style.css`, update the root variables:
```css
:root {
    --primary-color: #00B4D8;
    --secondary-color: #023E8A;
    /* Modify these values */
}
```

## 📧 Contact Form Setup

The contact form is currently set up with a simulated submission. To make it functional:

### Option 1: FormSubmit (Easiest, No Backend)
```html
<!-- In index.html, update the form tag -->
<form action="https://formsubmit.co/your-email@example.com" method="POST">
```

### Option 2: EmailJS (JavaScript Based)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your service ID, template ID, and user ID
3. Update `js/main.js` with EmailJS integration

### Option 3: Custom Backend
- Implement your own backend API
- Update the form submission handler in `js/main.js`

## 🔧 Browser Compatibility

✅ Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🌟 Features to Add (Future Enhancements)

- [ ] Image gallery lightbox for projects
- [ ] Google Maps integration for location
- [ ] WhatsApp chat integration
- [ ] Blog section for company news
- [ ] Client testimonials
- [ ] Team member profiles
- [ ] Video backgrounds
- [ ] Loading animations
- [ ] Cookie consent banner
- [ ] Analytics integration (Google Analytics)

## 🐛 Troubleshooting

### Images not loading?
- Check file paths are correct
- Ensure images are in the `images` folder
- Verify image file extensions match HTML references

### Language switcher not working?
- Make sure `translations/translations.json` is accessible
- Check browser console for errors
- Verify the file is valid JSON

### Styles not applying?
- Clear browser cache
- Check if `css/style.css` is loaded
- Verify Bootstrap CDN is accessible

### Form not submitting?
- Check browser console for errors
- Verify form action URL if using FormSubmit
- Test internet connection

## 📄 License

This website is created for BOSS İnşaat. All rights reserved.

## 👨‍💻 Development

Built with:
- HTML5
- CSS3
- JavaScript (Vanilla ES6+)
- Bootstrap 5.3.2
- Bootstrap Icons
- Font Awesome 6.4.2

## 📞 Support

For technical support or questions about the website:
- Email: info@bossinsaat.com
- Website: [Your domain here]

---

**Created with ❤️ for BOSS İnşaat**

Last Updated: October 2024

