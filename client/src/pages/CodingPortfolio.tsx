import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function CodingPortfolio() {
  const { data: projects, isLoading } = trpc.portfolio.getProjects.useQuery({ category: 'coding' });

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Vibe Coding</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Desenvolvendo experiências web que unem funcionalidade, performance e uma estética visual única.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
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
                  className="card-luxury flex flex-col h-full group"
                >
                  {/* Header */}
                  <div className="mb-4">
                    <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                      Projeto
                    </span>
                    <h3 className="text-2xl font-bold mt-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Features */}
                  {project.brief && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3 text-accent">Destaques</h4>
                      <ul className="space-y-1">
                        {project.brief.split(',').map((feature) => (
                          <li key={feature.trim()} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-accent rounded-full" />
                            {feature.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech) => (
                          <span
                            key={tech.trim()}
                            className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 pt-6 border-t border-border">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded transition-colors text-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        Código
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 md:py-32 bg-card/30 border-y border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Stack Tecnológico</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                category: 'Frontend',
                techs: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
              },
              {
                category: 'Backend',
                techs: ['Node.js', 'Express', 'Python', 'GraphQL', 'REST APIs'],
              },
              {
                category: 'Banco de Dados',
                techs: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'Drizzle'],
              },
              {
                category: '3D & Animação',
                techs: ['Three.js', 'Babylon.js', 'GSAP', 'Framer Motion', 'WebGL'],
              },
            ].map((section, index) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold mb-4 text-accent">{section.category}</h3>
                <ul className="space-y-2">
                  {section.techs.map((tech) => (
                    <li key={tech} className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {tech}
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
