import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { FaDiscord ,FaFacebook, FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  const { translation } = useApp();

  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold text-foreground mb-4">عن الموقع</h3>
            <p className="text-muted-foreground text-center max-w-xs">
              منصة لقراءة المانجا والمانهوا بجودة عالية وتجربة ممتعة.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold text-foreground mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-muted-foreground hover:text-primary manga-transition text-center block">{translation.home}</a></li>
              <li><a href="/browse" className="text-muted-foreground hover:text-primary manga-transition text-center block">{translation.browse}</a></li>
              <li><a href="/popular" className="text-muted-foreground hover:text-primary manga-transition text-center block">{translation.popular}</a></li>
              <li><a href="/latest" className="text-muted-foreground hover:text-primary manga-transition text-center block">{translation.latest}</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold text-foreground mb-4">تابعنا</h3>
            <div className="flex gap-6 justify-center">
              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-[#1877f2] transform transition duration-200 shadow-sm hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877f2]/40"
                title="Facebook"
              >
                <FaFacebook size={20} className="text-white transition-colors group-hover:text-white" />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-black transform transition duration-200 shadow-sm hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/40"
                title="X"
              >
                <FaXTwitter size={20} className="text-white" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 transform transition duration-200 shadow-sm hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400/30"
                title="Instagram"
              >
                <FaInstagram size={20} className="text-white" />
              </a>

              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-[#5865f2] transform transition duration-200 shadow-sm hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865f2]/30"
                title="Discord"
              >
                <FaDiscord size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 text-center">
          <p className="text-muted-foreground text-lg">
            © 2025 {translation.siteName}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
