import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { trpc } from '@/lib/trpc';

export default function DesignPortfolio() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const { data: projects, isLoading } = trpc.portfolio.getProjects.useQuery({ category: 'graphic_design' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Design Gráfico</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explorando a intersecção entre estratégia, estética e funcionalidade. Cada projeto é uma oportunidade de resolver problemas através do design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-32">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-card border border-border">
                    <img
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold">Ver Projeto</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-accent font-semibold">Branding</span>
                    <h3 className="text-xl font-bold mt-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 hover:bg-border rounded-lg transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="w-full aspect-video bg-muted overflow-hidden">
              <img
                src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <span className="text-sm text-accent font-semibold">Design</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">{selectedProject.title}</h2>

              <div className="space-y-6">
                {selectedProject.brief && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Briefing</h3>
                    <p className="text-muted-foreground">{selectedProject.brief}</p>
                  </div>
                )}

                {selectedProject.process && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Processo</h3>
                    <p className="text-muted-foreground">{selectedProject.process}</p>
                  </div>
                )}

                {selectedProject.result && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Resultado</h3>
                    <p className="text-muted-foreground">{selectedProject.result}</p>
                  </div>
                )}

                {selectedProject.technologies && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Ferramentas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.split(',').map((tool: string) => (
                        <span
                          key={tool.trim()}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                        >
                          {tool.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
