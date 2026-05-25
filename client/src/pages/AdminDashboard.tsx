import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  const [showForm, setShowForm] = useState(false);

  const { data: projects, isLoading: projectsLoading } = trpc.portfolio.getProjects.useQuery({});
  const { data: messages, isLoading: messagesLoading } = trpc.contact.getMessages.useQuery({});

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-6">Apenas administradores podem acessar esta área.</p>
          <button
            onClick={() => setLocation('/')}
            className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
          >
            Voltar ao Home
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground">Bem-vindo, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="container py-8">
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'projects'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Projetos ({projects?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'messages'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Mensagens ({messages?.length || 0})
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Gerenciar Projetos</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Novo Projeto
              </button>
            </div>

            {showForm && <ProjectForm onClose={() => setShowForm(false)} />}

            {projectsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="grid gap-4">
                {projects?.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-lg p-4 flex items-center justify-between group hover:border-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.category} • {project.description?.substring(0, 50)}...
                      </p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-border rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Mensagens de Contacto</h2>

            {messagesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : messages?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Nenhuma mensagem recebida ainda.
              </div>
            ) : (
              <div className="grid gap-4">
                {messages?.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-card border border-border rounded-lg p-4 ${
                      message.status === 'new' ? 'border-accent' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{message.name}</h3>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          message.status === 'new'
                            ? 'bg-accent/20 text-accent'
                            : message.status === 'replied'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {message.status === 'new' ? 'Nova' : message.status === 'replied' ? 'Respondida' : 'Lida'}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{message.message}</p>
                    <p className="text-xs text-muted-foreground mt-3">
                      {new Date(message.createdAt).toLocaleDateString('pt-PT')}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'coding',
    description: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    brief: '',
    imageUrl: '',
    videoUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement project creation
    console.log('Form data:', formData);
    onClose();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-lg p-6 mb-6"
    >
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Título do Projeto"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
        >
          <option value="coding">Coding</option>
          <option value="graphic_design">Design Gráfico</option>
          <option value="video_editing">Edição de Vídeo</option>
          <option value="vfx_motion">VFX & Motion</option>
        </select>
      </div>

      <textarea
        placeholder="Descrição"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent mb-4"
        rows={3}
      />

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Tecnologias (separadas por vírgula)"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
        />
        <input
          type="url"
          placeholder="URL da Demo"
          value={formData.demoUrl}
          onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
          className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
        >
          Guardar Projeto
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </motion.form>
  );
}
