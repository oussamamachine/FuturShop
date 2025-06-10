import Navbar from './navigation/Navbar'
import Footer from './navigation/Footer'
import AnnouncementBar from './ai/AnnouncementBar'
import CartDrawer from './cart/CartDrawer'
import BackgroundParticles from '../components/effects/BackgroundParticles'
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
    <BackgroundParticles />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  )
}