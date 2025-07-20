# GitHub Pages Deployment Guide

This folder contains the static version of Shafan Ali's portfolio website, optimized for GitHub Pages deployment.

## Files Overview

- **index.html** - The main HTML file with complete portfolio structure
- **script.js** - JavaScript file containing all interactive functionality
- **README.md** - This deployment guide

## Features

✅ **Fully Static** - No server dependencies
✅ **Dark/Light Theme** - Toggle with localStorage persistence
✅ **Responsive Design** - Works on all devices
✅ **Smooth Animations** - Typing animation, fade-in effects, and scroll animations
✅ **Interactive Navigation** - Smooth scrolling with active section highlighting
✅ **Project Showcase** - Dynamic project cards with links
✅ **Skills Visualization** - Animated progress bars
✅ **Contact Integration** - Direct links to email, phone, and social media

## Quick Deployment to GitHub Pages

### Method 1: Direct Upload
1. Create a new repository on GitHub (e.g., `portfolio` or `username.github.io`)
2. Upload the `index.html` and `script.js` files to the repository root
3. Go to repository Settings > Pages
4. Set Source to "Deploy from a branch" and select "main"
5. Your site will be available at `https://username.github.io/repository-name`

### Method 2: GitHub Desktop/Command Line
```bash
# Clone your repository
git clone https://github.com/username/portfolio.git
cd portfolio

# Copy files from this directory
cp /path/to/github-pages-build/* .

# Commit and push
git add .
git commit -m "Initial portfolio deployment"
git push origin main
```

## Customization

### Update Personal Information
Edit the JavaScript data in `script.js`:

```javascript
// Update contact email (line ~487)
function openEmail() {
  window.open('mailto:your-email@example.com', '_blank');
}

// Update projects array (line ~186)
const projects = [
  {
    title: "Your Project",
    description: "Your description",
    // ... other properties
  }
];

// Update skills arrays (line ~213)
const programmingSkills = [
  { name: "Your Language", level: "Your Level", percentage: 85, color: "from-blue-500 to-purple-600" }
];
```

### Update HTML Content
Edit personal information directly in `index.html`:
- Line ~296: Name in hero section
- Line ~354: About section content
- Line ~304: Hero description
- Contact section details

### Styling
The website uses Tailwind CSS via CDN. You can customize:
- Colors in the CSS variables (lines 138-185)
- Fonts in the Google Fonts link (line 48)
- Layout and spacing using Tailwind classes

## Performance Optimization

The website is already optimized for performance:
- ✅ Minified CSS via Tailwind CDN
- ✅ Optimized images from Unsplash
- ✅ Lazy loading for animations
- ✅ Efficient JavaScript with event delegation

## Browser Compatibility

Supports all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## SEO Features

- ✅ Proper HTML5 semantic structure
- ✅ Meta tags for social sharing
- ✅ Optimized title and description
- ✅ Open Graph and Twitter Card meta tags
- ✅ Descriptive alt text for images

## Analytics (Optional)

To add Google Analytics, insert this code before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Custom Domain (Optional)

1. Add a `CNAME` file to your repository root with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## Troubleshooting

**Site not loading?**
- Check that files are in the repository root
- Verify GitHub Pages is enabled in Settings
- Ensure index.html is present and properly formatted

**Animations not working?**
- Check browser console for JavaScript errors
- Ensure script.js is loading properly
- Verify JavaScript is enabled in browser

**Theme toggle not working?**
- Check localStorage support in browser
- Verify theme button click event is working
- Check CSS variables are properly defined

## Support

For issues or questions:
- Check GitHub repository issues
- Review browser console for errors
- Verify all files are properly uploaded

---

**Ready to deploy?** Simply upload the files to your GitHub repository and enable GitHub Pages!