import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function VFXPortfolio() {
  const { data: projects, isLoading } = trpc.portfolio.getProjects.useQuery({ category: 'vfx_motion' });

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">VFX & Motion Graphics</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explorando os limites da tecnologia para criar efeitos visuais que transcendem a realidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 md:py-32">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="space-y-20">
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
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
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
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <span className="text-sm text-accent font-semibold">VFX & Motion</span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4">{project.title}</h3>
                    
                    <p className="text-muted-foreground mb-6">{project.description}</p>
                    
                    {project.process && (
                      <div className="mb-6 p-4 bg-card/50 border border-border rounded-lg">
                        <h4 className="font-semibold mb-2 text-accent">Detalhes Técnicos</h4>
                        <p className="text-muted-foreground text-sm">{project.process}</p>
                      </div>
                    )}
                    
                    {project.technologies && (
                      <div>
                        <h4 className="font-semibold mb-3">Ferramentas & Tecnologias</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.split(',').map((tool: string) => (
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

      {/* Technical Skills */}
      <section className="py-20 md:py-32 bg-card/30 border-y border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Competências Técnicas</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Composição',
                skills: ['Nuke', 'After Effects', 'Deep Compositing', 'Rotoscoping'],
              },
              {
                title: 'Modelagem 3D',
                skills: ['Maya', 'Blender', 'ZBrush', 'Substance Painter'],
              },
              {
                title: 'Simulação',
                skills: ['Houdini', 'Pyro Solver', 'Partículas', 'Fluidos'],
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-luxury"
              >
                <h3 className="text-xl font-bold mb-4 text-accent">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
