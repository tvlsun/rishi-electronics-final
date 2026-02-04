# Rishi Electronics Website

A professional, modern website for Rishi Electronics repair shop with integrated customer booking system.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works perfectly on desktop, tablet, and mobile devices
- **Premium Aesthetics**: Modern design with glassmorphism effects, smooth gradients, and micro-animations
- **8 Repair Services**: Comprehensive service showcase including:
  - 📺 TV Repair
  - 💻 Laptop Repair
  - 📱 Mobile Repair
  - 🔊 Home Theater
  - 🔋 Inverter
  - 🧺 Washing Machine
  - ❄️ Refrigerator
  - 🌬️ Air Conditioner

- **Booking System**: Interactive booking form with:
  - Real-time validation
  - Date/time selection
  - Service type selection
  - Device details input
  - Confirmation modal

- **Contact Information**:
  - Phone: 96553 33511
  - Email: rishielectronics25@gmail.com
  - Embedded Google Maps location

## 📁 File Structure

```
Rishi/
├── index.html          # Main HTML file
├── styles.css          # CSS with design system
├── app.js              # JavaScript for interactivity
├── images/             # Folder for your shop images and logo
└── README.md           # This file
```

## 🚀 Getting Started

### Option 1: Open Directly in Browser

1. Simply double-click on `index.html` to open the website in your default browser
2. The website will work fully offline

### Option 2: Use a Local Server (Recommended)

For the best experience, use a local development server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js (with npx):**
```bash
npx serve

# Or with http-server
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

## 🖼️ Adding Your Shop Images and Logo

1. Place your shop images and logo in the `images/` folder
2. Recommended image names:
   - `logo.png` - Your shop logo
   - `shop-front.jpg` - Shop front photo
   - `shop-interior.jpg` - Interior photo

3. To add images to the website, edit `index.html`:
   - Find the hero section
   - Add an `<img>` tag with your image path:
     ```html
     <img src="images/logo.png" alt="Rishi Electronics Logo" style="max-width: 200px; margin: 0 auto 2rem;">
     ```

## 🎨 Customization

### Colors
Edit the CSS custom properties in `styles.css` (lines 9-18) to change the color scheme:

```css
:root {
  --primary-color: #2563eb;      /* Main brand color */
  --secondary-color: #0891b2;    /* Secondary color */
  --accent-color: #f59e0b;       /* Accent color */
}
```

### Business Hours
Update the footer section in `index.html` (around line 330) to change business hours.

### Contact Information
All contact information is in the Contact section of `index.html` (around line 285).

## 📧 Booking Form Integration

The booking form currently shows a confirmation modal but doesn't send emails. To enable email notifications:

### Option 1: EmailJS (Free)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Follow their setup guide
3. Add EmailJS script to `index.html`
4. Update the `getFormData()` function in `app.js`

### Option 2: Formspree (Free)
1. Sign up at [Formspree](https://formspree.io/)
2. Get your form endpoint
3. Update the form action in `index.html`

### Option 3: Custom Backend
Create a backend server (Node.js, PHP, etc.) to handle form submissions and send emails.

## 🌐 Deployment

### Deploy to Netlify (Free)

1. Create a free account at [Netlify](https://www.netlify.com/)
2. Drag and drop the entire `Rishi` folder to Netlify
3. Your site will be live in seconds!

### Deploy to GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Deploy to Vercel (Free)

1. Create a free account at [Vercel](https://vercel.com/)
2. Import your project
3. Deploy with one click

## 🔧 Technical Details

- **HTML5**: Semantic markup with proper SEO meta tags
- **CSS3**: Modern CSS with custom properties, Grid, and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript, no dependencies
- **No Build Process**: Works directly in any modern browser
- **Accessibility**: ARIA labels and semantic HTML for better accessibility
- **Performance**: Optimized for fast loading and smooth animations

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🙏 Support

For any questions or issues with the website, please contact:
- Email: rishielectronics25@gmail.com
- Phone: 96553 33511

## 📄 License

© 2026 Rishi Electronics. All rights reserved.

---

**Built with ❤️ for Rishi Electronics**
