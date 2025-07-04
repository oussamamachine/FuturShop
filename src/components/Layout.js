/**
 * Layout - App shell with global navigation, announcement, effects, and cart drawer.
 * @component
 */
import Navbar from './navigation/Navbar';
import Footer from './navigation/Footer';
import AnnouncementBar from './ai/AnnouncementBar';
import CartDrawer from './cart/CartDrawer';
import BackgroundParticles from '../components/effects/BackgroundParticles';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <BackgroundParticles />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow focus:outline-none" tabIndex={-1} id="main-content" aria-label="Main content">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}