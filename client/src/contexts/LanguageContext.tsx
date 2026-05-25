import { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  pt: {
    'nav.home': 'Home',
    'nav.design': 'Design Gráfico',
    'nav.video': 'Vídeo',
    'nav.vfx': 'VFX & Motion',
    'nav.coding': 'Web Design',
    'nav.contact': 'Contato',
    'nav.admin': 'Admin',
    'home.title': 'Luxury Portfolio',
    'home.subtitle': 'Criando experiências visuais que transcendem a realidade',
    'home.cta': 'Explorar Trabalhos',
    'home.contact_cta': 'Entrar em Contacto',
    'design.title': 'Design Gráfico',
    'design.subtitle': 'Explorando a intersecção entre estratégia, estética e funcionalidade.',
    'video.title': 'Edição de Vídeo',
    'video.subtitle': 'Transformando material bruto em narrativas visuais impactantes.',
    'vfx.title': 'VFX & Motion Graphics',
    'vfx.subtitle': 'Explorando os limites da tecnologia para criar efeitos visuais únicos.',
    'coding.title': 'Web Design',
    'coding.subtitle': 'Desenvolvendo experiências web que unem funcionalidade e estética.',
    'contact.title': 'Entrar em Contacto',
    'contact.subtitle': 'Vamos criar algo extraordinário juntos',
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.message': 'Mensagem',
    'contact.send': 'Enviar',
    'contact.success': 'Mensagem enviada com sucesso!',
    'contact.error': 'Erro ao enviar mensagem',
    'project.back': 'Voltar',
    'project.briefing': 'Briefing',
    'project.process': 'Processo',
    'project.result': 'Resultado',
    'project.technologies': 'Tecnologias',
    'project.demo': 'Ver Demo',
    'project.code': 'Ver Código',
    'project.related': 'Outros Projetos',
    'admin.title': 'Painel Administrativo',
    'admin.projects': 'Projetos',
    'admin.messages': 'Mensagens',
    'admin.logout': 'Sair',
    'admin.new_project': 'Novo Projeto',
    'admin.no_messages': 'Nenhuma mensagem recebida ainda',
  },
  en: {
    'nav.home': 'Home',
    'nav.design': 'Graphic Design',
    'nav.video': 'Video',
    'nav.vfx': 'VFX & Motion',
    'nav.coding': 'Coding',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'home.title': 'Luxury Portfolio',
    'home.subtitle': 'Creating visual experiences that transcend reality',
    'home.cta': 'Explore Works',
    'home.contact_cta': 'Get in Touch',
    'design.title': 'Graphic Design',
    'design.subtitle': 'Exploring the intersection between strategy, aesthetics, and functionality.',
    'video.title': 'Video Editing',
    'video.subtitle': 'Transforming raw material into impactful visual narratives.',
    'vfx.title': 'VFX & Motion Graphics',
    'vfx.subtitle': 'Exploring the limits of technology to create unique visual effects.',
    'coding.title': 'Vibe Coding',
    'coding.subtitle': 'Developing web experiences that combine functionality and aesthetics.',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Let\'s create something extraordinary together',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message',
    'project.back': 'Back',
    'project.briefing': 'Briefing',
    'project.process': 'Process',
    'project.result': 'Result',
    'project.technologies': 'Technologies',
    'project.demo': 'View Demo',
    'project.code': 'View Code',
    'project.related': 'Other Projects',
    'admin.title': 'Admin Dashboard',
    'admin.projects': 'Projects',
    'admin.messages': 'Messages',
    'admin.logout': 'Logout',
    'admin.new_project': 'New Project',
    'admin.no_messages': 'No messages received yet',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language | null;
    return saved || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageState, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
