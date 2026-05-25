import { useParams, useNavigate } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { trpc } from '@/lib/trpc';

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(params?.id || '0');

  const { data: allProjects, isLoading } = trpc.portfolio.getProjects.useQuery({});
  const project = allProjects?.find((p) => p.id === projectId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container pt-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Projeto não encontrado</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
          >
            Voltar ao Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-20">
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-accent font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{project.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image/Video */}
      {(project.imageUrl || project.videoUrl) && (
        <section className="py-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-border"
            >
              {project.videoUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={project.videoUrl}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {project.brief && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-4">Briefing</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.brief}</p>
                </motion.div>
              )}

              {project.process && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-4">Processo</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.process}</p>
                </motion.div>
              )}

              {project.result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-4">Resultado</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.result}</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              {/* Technologies */}
              {project.technologies && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="card-luxury mb-8"
                >
                  <h3 className="text-lg font-bold mb-4 text-accent">Tecnologias</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(',').map((tech) => (
                      <span
                        key={tech.trim()}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="card-luxury"
              >
                <h3 className="text-lg font-bold mb-4 text-accent">Links</h3>
                <div className="space-y-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded transition-colors text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      Ver Código
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 md:py-32 bg-card/30 border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12">Outros Projetos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {allProjects
              ?.filter((p) => p.id !== projectId)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => navigate(`/project/${relatedProject.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-card border border-border">
                    {relatedProject.imageUrl ? (
                      <img
                        src={relatedProject.imageUrl}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                        <span className="text-muted-foreground">{relatedProject.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold">Ver Projeto</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-accent transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{relatedProject.description?.substring(0, 60)}...</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
