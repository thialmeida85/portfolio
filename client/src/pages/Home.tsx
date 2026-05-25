import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Film, LayoutGrid, Monitor, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';

const featuredWork = [
  {
    title: 'Identidade Visual para marca de moda',
    category: 'Branding',
    href: '/design',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&h=800&fit=crop',
  },
  {
    title: 'Campanha social para rede de lifestyle',
    category: 'Social Media',
    href: '/video',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop',
  },
  {
    title: 'Landing page premium para estúdio digital',
    category: 'Web Design',
    href: '/coding',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
  },
];

const services = [
  {
    title: 'Branding & Identidade Visual',
    description: 'Construção de marcas memoráveis, logotipos, paletas e sistemas visuais.',
    icon: Sparkles,
  },
  {
    title: 'Social Media & Conteúdo',
    description: 'Criatividade estratégica para posts, anúncios e campanhas envolventes.',
    icon: LayoutGrid,
  },
  {
    title: 'Web Design Premium',
    description: 'Experiências digitais com design elegante, usabilidade e conversão.',
    icon: Monitor,
  },
  {
    title: 'Vídeo, Motion & VFX',
    description: 'Narrativas em movimento com edição, animação e pós-produção.',
    icon: Film,
  },
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.24,
        delayChildren: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="min-h-screen pt-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-12 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute bottom-10 right-10 h-[18rem] w-[18rem] rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="max-w-2xl">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.35em] text-accent font-semibold">
                <span>UX + Branding + Motion</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl xl:text-7xl font-semibold leading-[0.98] tracking-tight"
              >
                Portfólio de design para marcas que querem ser lembradas.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                Crio identidade visual, social media, web design e vídeos com movimento que comunicam a sua essência e elevam a presença digital.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-12 flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/design"
                  className="inline-flex items-center justify-center rounded-full border border-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  Ver Portfólio
                  <ExternalLink className="ml-3 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-accent-foreground transition hover:bg-accent/90"
                >
                  Vamos Conversar
                </Link>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/80 shadow-[0_28px_120px_-70px_rgba(0,0,0,0.9)]">
                <img
                  src="https://images.unsplash.com/photo-1528731708534-816fe59f90dc?w=800&h=900&fit=crop"
                  alt="Branding project preview"
                  className="h-[320px] w-full object-cover transition duration-500 ease-out hover:scale-105"
                />
                <div className="p-6">
                  <span className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Branding</span>
                  <h2 className="mt-4 text-xl font-semibold">Identidade visual com presença editorial.</h2>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-card/80 p-6">
                  <span className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Social Media</span>
                  <p className="mt-4 text-muted-foreground leading-relaxed">Conteúdos que geram engajamento e mantêm a marca relevante.</p>
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-card/80 p-6">
                  <span className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Web Design</span>
                  <p className="mt-4 text-muted-foreground leading-relaxed">Landing pages e sites com visual premium e conversão.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20 md:py-32 bg-card/30 border-y border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid gap-10 lg:grid-cols-[0.95fr_0.6fr] items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-accent font-semibold mb-4">Sobre meu trabalho</p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">Design autoral, direção visual e storytelling que se conectam com audiências.</h2>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-background/80 p-8 shadow-[0_35px_120px_-60px_rgba(0,0,0,0.9)]">
                <p className="text-muted-foreground leading-relaxed">
                  Eu trabalho em projetos que exigem cuidado com imagem, estratégia de conteúdo e animação. Meu foco é criar peças que sejam bonitas e que também tragam resultados reais para marcas e negócios.
                </p>
              </div>
            </div>

            <div className="grid gap-6 mt-16 md:grid-cols-3">
              <div className="rounded-[2rem] border border-white/10 bg-background/70 p-8">
                <span className="text-3xl font-semibold text-accent">8+</span>
                <p className="mt-4 text-muted-foreground">Anos criando peças visuais para marcas.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-background/70 p-8">
                <span className="text-3xl font-semibold text-accent">50+</span>
                <p className="mt-4 text-muted-foreground">Projetos concluídos em branding, vídeo e web.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-background/70 p-8">
                <span className="text-3xl font-semibold text-accent">100%</span>
                <p className="mt-4 text-muted-foreground">Compromisso com estética de alto padrão.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <span className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Serviços</span>
            <h2 className="text-3xl md:text-4xl font-bold">Do branding à presença digital, tudo em um mesmo estúdio.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border border-white/10 bg-card/80 p-8 shadow-[0_24px_80px_-70px_rgba(0,0,0,0.9)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card/30 border-t border-border">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <span className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">Trabalhos selecionados</span>
            <h2 className="text-3xl md:text-4xl font-bold">Projetos com presença, narrativa e estilo.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredWork.map(({ title, category, href, image }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-card/80 shadow-[0_24px_80px_-70px_rgba(0,0,0,0.9)]"
              >
                <Link href={href} className="block relative overflow-hidden">
                  <img src={image} alt={title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <div className="p-6">
                  <span className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">{category}</span>
                  <h3 className="mt-4 text-xl font-semibold leading-tight">{title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card/50 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Esse é o momento certo para dar forma visual à sua marca. Vamos desenvolver um projeto que destaque sua presença na web e nas redes sociais.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-accent-foreground transition hover:bg-accent/90"
          >
            Falar com o estúdio
          </Link>
        </div>
      </section>
    </div>
  );
}
