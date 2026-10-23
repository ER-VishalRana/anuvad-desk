# Anuvad Desk (web app)

Write in English and get the letter in Hindi or 20+ other languages as you type. It also edits PowerPoint (.pptx) and PDF files. Everything runs in the browser, and there is no server to pay for.

## Files
- `index.html`: the whole app
- `manifest.webmanifest`, `icon-*.png`: let Chrome install it like an app
- `sw.js`: keeps the app working when the internet is slow or off

## Try it on your computer (1 minute)
Double-click `index.html`. It opens in Chrome and works. The internet is needed for fonts, libraries and translation. "Install app" only appears once it is hosted (below).

## Put it online for free

### Option A: GitHub Pages (recommended)
1. On github.com, create a new **public** repository, for example `anuvad-desk`.
2. Click **Add file → Upload files**, drag in all the files from this folder, then click **Commit changes**.
3. Open **Settings → Pages**. Under "Branch" choose `main` and `/ (root)`, then **Save**.
4. After about a minute your app is live at `https://<your-username>.github.io/anuvad-desk/`.

### Option B: Netlify (drag and drop)
1. Sign up free at netlify.com.
2. Open https://app.netlify.com/drop and drag this whole folder onto the page.
3. You get a link like `https://something.netlify.app`. You can rename it in Site settings.

## Install on a phone or computer
Open the link in Chrome. On a computer, click **Install app** in the app, or use the install icon in the address bar. On Android, use the Chrome menu, then **Add to Home screen / Install app**.

## How translation works (all free)
1. **Chrome's built-in translator** on desktop Chrome (version 138 or newer). It runs on your device. The first use of a language downloads a small model.
2. **MyMemory** (free online service) when the built-in one is not available, for example on phones. Its free limit is about 5,000 words a day for each user.
3. **Optional Gemini key** (free from https://aistudio.google.com/apikey). Paste it in **AI settings** to unlock formal letter style, Fix my English, Photo to text and Hinglish typing. The key is saved only in that browser. Do not put your own key in the code if you share the app publicly, because anyone could read it there.
