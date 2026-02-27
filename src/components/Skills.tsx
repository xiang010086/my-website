import React from 'react';
import { motion } from 'framer-motion';
import { skills, awards } from '../data/resume';
import { Trophy } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Skills</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            </motion.div>

            <div className="space-y-8">
              {Object.entries(skills).map(([key, skill], index) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <skill.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{skill.category}</h3>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <ul className="space-y-3">
                      {skill.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards Column */}
          <div id="awards">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Honors</h2>
              <div className="w-20 h-1 bg-purple-600 rounded-full"></div>
            </motion.div>

            <div className="relative border-l-2 border-purple-100 ml-3 space-y-8">
              {awards.map((award, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-purple-200"></span>
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <Trophy className="text-purple-500 shrink-0 mt-1" size={18} />
                      <p className="text-gray-700 font-medium">{award}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
