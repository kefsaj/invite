# Kefin & Ludhiya Wedding Website

A static wedding invitation website designed for GitHub Pages. The site includes:

- Countdown timer
- Ceremony and reception details
- Google Maps links
- Wedding day schedule
- Family details
- Gallery section for photos

The RSVP section has been removed.

## Where to add photos

Put your image files inside this folder:

```text
assets/images/
```

Example filenames:

```text
assets/images/photo1.jpg
assets/images/photo2.jpg
assets/images/photo3.jpg
```

Then open `index.html`, find the gallery section, and replace a placeholder like this:

```html
<div class="photo-placeholder">Add photo 1</div>
```

with an image tag like this:

```html
<img src="assets/images/photo1.jpg" alt="Kefin and Ludhiya" />
```

You can add more images by copying the same line and changing the filename.

## Files

- `index.html` — page structure and invitation text
- `styles.css` — colors, layout, floral styling, responsive design
- `script.js` — countdown timer, mobile menu, reveal animation
- `assets/images/` — add photos here later

## Deploy on GitHub Pages

1. Create a new GitHub repository, for example `wedding-invite`.
2. Upload all files and folders from this package.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Save. GitHub will give you a website link.

Optional: rename the repository to `kefin-ludhiya-wedding` or use a custom domain later.
