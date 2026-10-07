import BackgroundBlobs from '@/components/BackgroundBlobs';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatButton from '@/components/ChatButton';

export default function SiteLayout({ children }) {
  return (
    <div className="font-quicksand text-gray-900 bg-gradient-to-br from-[#e0f2fe] via-[#f0fdf4] to-[#ffedd5] animate-bg min-h-screen relative overflow-x-hidden selection:bg-teal-500 selection:text-white">
      <BackgroundBlobs />
      <TopBar />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <ChatButton />
    </div>
  );
}
