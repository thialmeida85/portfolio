import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Play, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function VideoPortfolio() {
  const { data: projects, isLoading } = trpc.portfolio.getProjects.useQuery({ category: 'video_editing' });

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Edição de Vídeo</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Transformando material bruto em narrativas visuais impactantes. Cada frame conta uma história.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Showreel */}
      <section className="py-20 md:py-32 bg-card/30 border-y border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Showreel Principal</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-border group"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
              title="Showreel Principal"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Play className="w-16 h-16 text-accent fill-accent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Projetos em Destaque</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="space-y-16">
              {projects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Video */}
                  <div className="order-2 md:order-1">
                    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-border">
                      <iframe
                        width="100%"
                        height="100%"
                        src={project.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="order-1 md:order-2">
                    <span className="text-sm text-accent font-semibold">Edição</span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4">{project.title}</h3>
                    
                    <p className="text-muted-foreground mb-6">{project.description}</p>
                    
                    {project.process && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Breakdown Técnico</h4>
                        <p className="text-muted-foreground text-sm">{project.process}</p>
                      </div>
                    )}
                    
                    {project.technologies && (
                      <div>
                        <h4 className="font-semibold mb-3">Ferramentas</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.split(',').map((tool) => (
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
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
