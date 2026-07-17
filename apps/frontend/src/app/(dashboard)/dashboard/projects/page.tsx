'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  Search,
  Grid3X3,
  List,
  Plus,
  Star,
  MoreVertical,
  Image,
  Video,
  Mic2,
  PenTool,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projectTypes = [
  { label: 'Todos', value: 'all' },
  { label: 'Imágenes', value: 'image' },
  { label: 'Videos', value: 'video' },
  { label: 'Voces', value: 'voice' },
  { label: 'Logos', value: 'logo' },
];

const projects = [
  { name: 'Logo Corporativo 2024', type: 'logo', status: 'completed', updated: 'Hace 2 horas', favorite: true },
  { name: 'Video Promocional', type: 'video', status: 'processing', updated: 'Hace 1 día', favorite: false },
  { name: 'Avatar LinkedIn', type: 'image', status: 'completed', updated: 'Hace 3 días', favorite: true },
  { name: 'Miniatura YouTube', type: 'image', status: 'draft', updated: 'Hace 5 días', favorite: false },
  { name: 'Anuncio Instagram', type: 'image', status: 'completed', updated: 'Hace 1 semana', favorite: false },
  { name: 'Narración Podcast', type: 'voice', status: 'completed', updated: 'Hace 1 semana', favorite: true },
];

const typeIcons: Record<string, React.ReactNode> = {
  image: <Image className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  voice: <Mic2 className="w-5 h-5" />,
  logo: <PenTool className="w-5 h-5" />,
};

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-surface-100">Proyectos</h1>
          <p className="text-surface-400 mt-1">Gestiona todos tus proyectos en un solo lugar.</p>
        </div>
        <Button variant="gradient" icon={<Plus className="w-5 h-5" />}>
          Nuevo Proyecto
        </Button>
      </motion.div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {projectTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilter(type.value)}
              className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                filter === type.value
                  ? 'border-white/20 bg-primary-500/20 text-white'
                  : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-surface-800 text-surface-200' : 'text-surface-500'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-surface-800 text-surface-200' : 'text-surface-500'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card hover className="group">
                <div className="aspect-video bg-surface-800/50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="text-surface-500">{typeIcons[project.type]}</div>
                  <button className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star className={`w-4 h-4 ${project.favorite ? 'fill-amber-400 text-amber-400' : 'text-white'}`} />
                  </button>
                  <Badge
                    variant={project.status === 'completed' ? 'success' : project.status === 'processing' ? 'primary' : 'warning'}
                    size="sm"
                    className="absolute bottom-2 left-2"
                  >
                    {project.status === 'completed' ? 'Completado' : project.status === 'processing' ? 'Procesando' : 'Borrador'}
                  </Badge>
                </div>
                <h3 className="font-medium text-surface-200 mb-1">{project.name}</h3>
                <p className="text-xs text-surface-500">{project.updated}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  {typeIcons[project.type]}
                </div>
                <div>
                  <p className="font-medium text-surface-200">{project.name}</p>
                  <p className="text-xs text-surface-500">{project.updated}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={project.status === 'completed' ? 'success' : project.status === 'processing' ? 'primary' : 'warning'} size="sm">
                  {project.status === 'completed' ? 'Completado' : project.status === 'processing' ? 'Procesando' : 'Borrador'}
                </Badge>
                <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-surface-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
