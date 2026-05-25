import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                Transformando <span className="gradient-text">Ideias</span> em
                <br />
                <span className="gradient-text">Experiências Visuais</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Sou um criador multidisciplinar apaixonado por design, movimento e código. Com experiência em design gráfico, edição de vídeo, VFX e desenvolvimento web, transformo conceitos complexos em soluções visuais impactantes que conectam com o público.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <a
                href="/design"
                className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Explorar Portfólio
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all duration-300"
              >
                Entrar em Contato
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity as any }}
              className="cursor-pointer"
              onClick={() => {
                const element = document.getElementById('about');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowDown className="w-6 h-6 text-accent" />
            </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-card/30 border-y border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Minha Jornada</h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                Minha trajetória começou com uma paixão genuína por criar. Desde criança, fui fascinado por como as imagens, cores e movimento podem comunicar emoções e ideias de forma poderosa. Essa curiosidade me levou a explorar diferentes disciplinas criativas.
              </p>
              
              <p>
                Ao longo dos anos, desenvolvi expertise em design gráfico, criando identidades visuais que contam histórias de marcas. Depois, mergulhei no mundo da edição de vídeo e VFX, descobrindo a magia de transformar conceitos em movimento. E mais recentemente, comecei a explorar o desenvolvimento web com uma estética "vibe coding", unindo design e funcionalidade.
              </p>
              
              <p>
                O que me diferencia é a capacidade de pensar estrategicamente sobre cada projeto. Não crio apenas para ser bonito — crio para resolver problemas, comunicar mensagens e gerar impacto. Cada pixel, cada frame, cada linha de código tem um propósito.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Projetos Completos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">8+</div>
                <p className="text-sm text-muted-foreground">Anos de Experiência</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Dedicação</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Áreas de Expertise</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Design Gráfico',
                description: 'Identidade visual, branding, design editorial e sistemas de design',
                icon: '✨',
              },
              {
                title: 'Edição de Vídeo',
                description: 'Montagem, color grading, pós-produção e storytelling audiovisual',
                icon: '🎬',
              },
              {
                title: 'VFX & Motion',
                description: 'Composição, animação 3D, simulações e efeitos visuais complexos',
                icon: '🎆',
              },
              {
                title: 'Vibe Coding',
                description: 'Desenvolvimento web, interfaces interativas e experiências digitais',
                icon: '💻',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-luxury group cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-card/50 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para colaborar?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vamos criar algo extraordinário juntos. Entre em contato para discutir seu próximo projeto.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 transform hover:scale-105"
          >
            Iniciar Conversa
          </a>
        </div>
      </section>
    </div>
  );
}
