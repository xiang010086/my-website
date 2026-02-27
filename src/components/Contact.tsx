import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, X } from 'lucide-react';
import { personalInfo } from '../data/resume';

const Contact: React.FC = () => {
  const [showWeChat, setShowWeChat] = useState(false);

  return (
    <footer id="contact" className="bg-gray-900 text-white py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              I'm currently looking for AI Product Manager opportunities. 
              Feel free to reach out if you'd like to discuss potential collaborations or opportunities.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowWeChat(true)}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                title="WeChat"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M8.5,14.5c0.5,0,1,0.2,1.4,0.6c0.4,0.4,0.6,0.9,0.6,1.4s-0.2,1-0.6,1.4c-0.4,0.4-0.9,0.6-1.4,0.6s-1-0.2-1.4-0.6
                  c-0.4-0.4-0.6-0.9-0.6-1.4s0.2-1,0.6-1.4C7.5,14.7,8,14.5,8.5,14.5z M15.5,14.5c0.5,0,1,0.2,1.4,0.6c0.4,0.4,0.6,0.9,0.6,1.4
                  s-0.2,1-0.6,1.4c-0.4,0.4-0.9,0.6-1.4,0.6s-1-0.2-1.4-0.6c-0.4-0.4-0.6-0.9-0.6-1.4s0.2-1,0.6-1.4C14.5,14.7,15,14.5,15.5,14.5z
                   M18.8,3.5c-4.4,0-8,2.9-8,6.5c0,0.4,0,0.8,0.1,1.2c-2.4-0.5-4.8,0.3-6.5,2.1c-1.5,1.6-2.1,3.9-1.5,6.1l-1,2.8l2.9-0.9
                  c1.7,1.2,3.8,1.6,5.9,1.1c0.1,0.4,0.3,0.7,0.4,1.1l-1.3,3.9l4.1-1.3c2.4,1.7,5.6,1.7,8,0c2.9-2.1,4.2-5.9,3.1-9.3
                  C24.5,9.6,22,3.5,18.8,3.5z M7.5,12c-2.5,0-4.5-1.8-4.5-4s2-4,4.5-4s4.5,1.8,4.5,4S10,12,7.5,12z M17.5,18c-3,0-5.5-2.2-5.5-5
                  s2.5-5,5.5-5s5.5,2.2,5.5,5S20.5,18,17.5,18z"/>
                </svg>
              </button>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="text-lg font-medium hover:text-blue-400 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-green-600/20 text-green-400 rounded-full flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <a href={`tel:${personalInfo.phone}`} className="text-lg font-medium hover:text-green-400 transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-lg font-medium">
                  {personalInfo.locations.join(' / ')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </div>
      </div>

      {/* WeChat Modal */}
      {showWeChat && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowWeChat(false)}
        >
          <div 
            className="bg-white p-6 rounded-2xl max-w-sm w-full relative animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowWeChat(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">请加我的微信</h3>
              <div className="bg-gray-100 w-64 h-64 mx-auto rounded-lg flex items-center justify-center mb-4">
                <img 
                  src="/wechat-qr.jpg" 
                  alt="WeChat QR Code" 
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span class="text-gray-400">Please add wechat-qr.jpg to public folder</span>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Contact;