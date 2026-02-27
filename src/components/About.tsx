import React from 'react';
import { motion } from 'framer-motion';
import { highlights, education } from '../data/resume';
import { GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <GraduationCap className="text-blue-600" /> Education
          </h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-4 md:items-start p-6 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{edu.school}</h4>
                  <p className="text-gray-600 mb-2">{edu.major} | {edu.degree}</p>
                  {edu.details.length > 0 && (
                     <div className="text-sm text-gray-500">
                       {edu.details.map((detail, i) => (
                         <p key={i}>{detail}</p>
                       ))}
                     </div>
                  )}
                </div>
                <div className="md:text-right shrink-0">
                  <span className="inline-block px-3 py-1 bg-white text-blue-600 text-sm font-medium rounded-full shadow-sm w-36 text-center">
                    {edu.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
