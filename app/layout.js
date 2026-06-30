import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

export const metadata = {
  title: 'FEDORG — Pure Food, Naturally Delivered',
  description:
    'FEDORG offers premium food grains, aromatic spices, and healthy peanut butter — sourced fresh, delivered to your door.',
  keywords: 'food grains, spices, peanut butter, organic, natural food',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
