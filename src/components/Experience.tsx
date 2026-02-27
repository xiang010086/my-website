import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/resume';
import { X, Play } from 'lucide-react';

const Experience: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-100 hover:border-blue-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
              
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-4">
                  {project.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                  查看详情 <span className="ml-2">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="sticky top-0 bg-white/90 backdrop-blur z-10 p-6 flex justify-between items-center border-b border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h3>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                      Role: {selectedProject.role}
                    </div>
                    <div className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium">
                      {selectedProject.period}
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    
                     {/* Video Section */}
                    <div className="mb-8 rounded-xl overflow-hidden bg-gray-100 aspect-video relative group shadow-inner">
                      {selectedProject.videoUrl ? (
                         <video 
                           src={selectedProject.videoUrl} 
                           className="w-full h-full object-cover"
                           controls
                           preload="metadata"
                         >
                           Your browser does not support the video tag.
                         </video>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500">
                          <Play size={48} className="mb-2 opacity-50" />
                          <span className="font-medium">项目演示视频占位符</span>
                          <span className="text-xs mt-1 text-gray-400">请在 public 文件夹放入 .mp4 并在 resume.ts 配置路径</span>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {selectedProject.details.map((detail, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {detail.subtitle}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {detail.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Experience;