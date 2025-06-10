# Futur – Next-Gen Fashion Store

Futur is a modern e-commerce web app for futuristic fashion, featuring 3D/AR product previews, AI style recommendations, voice shopping, and a customizable jacket designer.

## Features

- 🛒 **Shopping Cart** with animated drawer
- 👕 **3D Jacket Customizer** (with real-time color/material updates)
- 🧠 **AI Style Wizard** for personalized recommendations
- 🗣️ **Voice Shopping Assistant**
- 🛍️ **Product Pages** with AR/3D previews
- 🎨 **Animated Particle Background**
- ⚡ **Fast, responsive, and mobile-friendly**

## Tech Stack

- **React** (with hooks)
- **React Router**
- **Framer Motion** (animations)
- **@react-three/fiber** & **drei** (3D/AR)
- **Tailwind CSS** (utility-first styling)
- **Three.js** (3D engine)
- **Context API** (state management)

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/YOUR-USERNAME/futur.git
cd futur
```

### 2. Install dependencies

```sh
npm install
```

### 3. Run the development server

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
src/
  components/
    ai/
    cart/
    effects/
    navigation/
    product/
    sections/
    ui/
    voice/
  context/
  pages/
  App.js
  index.js
public/
  models/
  images/
  textures/
```

---

## Customizing the 3D Jacket

- Place your `jacket.glb` model in `public/models/`.
- To enable color/material customization, see the `JacketCustomizer.js` logic.
- For custom back designs, upload an image in the customizer UI.

---

## Voice Shopping

- Click the microphone button on the Voice Shopping page.
- Speak your product request (e.g., "Show me summer dresses").

---

## Deployment

You can deploy to Vercel, Netlify, or any static hosting that supports React.

---

## License

MIT

---

## Credits

- 3D assets: [Sketchfab](https://sketchfab.com/) or your own
- Icons: [Feather Icons](https://feathericons.com/)
- Inspiration: Next-gen fashion tech

---

Enjoy exploring the future of fashion!
