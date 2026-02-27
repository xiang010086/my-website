import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { personalInfo } from '../data/resume';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Hi, I'm <span className="text-blue-600">{personalInfo.name}</span>
            <span className="text-4xl md:text-5xl text-gray-600 mt-2 block">{personalInfo.title}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            {personalInfo.summary.split('。')[0]}。
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              Contact Me <ArrowRight size={20} />
            </a>
            <a 
              href="#experience" 
              className="px-8 py-3 bg-white text-gray-800 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              View Projects <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block translate-x-12"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-2xl transform rotate-6 opacity-70"></div>
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden flex items-center justify-center border border-gray-100">
              <img 
                src="/profile-photo.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
