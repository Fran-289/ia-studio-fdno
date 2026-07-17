'use client';

import { motion } from 'framer-motion';
import {
  Image,
  Video,
  Mic2,
  PenTool,
  Users,
  Palette,
  TrendingUp,
  Clock,
  Star,
  FolderOpen,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const stats = [
  { label: 'Proyectos', value: '12', icon: <FolderOpen className="w-5 h-5" />, change: '+3 este mes' },
  { label: 'Créditos', value: '450', icon: <Sparkles className="w-5 h-5" />, change: '50 restantes' },
  { label: 'Almacenamiento', value: '2.4 GB', icon: <HardDrive className="w-5 h-5" />, change: 'de 10 GB' },
  { label: 'Exportaciones', value: '48', icon: <TrendingUp className="w-5 h-5" />, change: '+12% vs mes pasado' },
];

const quickActions = [
  { label: 'Generar Imagen', icon: <Image className="w-5 h-5" />, href: '/dashboard/images', gradient: 'from-blue-500 to-cyan-500' },
  { label: 'Crear Video', icon: <Video className="w-5 h-5" />, href: '/dashboard/video', gradient: 'from-purple-500 to-pink-500' },
  { label: 'Clonar Voz', icon: <Mic2 className="w-5 h-5" />, href: '/dashboard/voice', gradient: 'from-emerald-500 to-teal-500' },
  { label: 'Diseñar Logo', icon: <PenTool className="w-5 h-5" />, href: '/dashboard/logos', gradient: 'from-orange-500 to-red-500' },
];

const recentProjects = [
  { name: 'Logo Corporativo', type: 'Logo', updated: 'Hace 2 horas', status: 'completed' as const },
  { name: 'Video Promocional', type: 'Video', updated: 'Hace 1 día', status: 'completed' as const },
  { name: 'Avatar Redes', type: 'Avatar', updated: 'Hace 3 días', status: 'draft' as const },
  { name: 'Miniatura YouTube', type: 'Thumbnail', updated: 'Hace 5 días', status: 'completed' as const },
];

import { Sparkles, HardDrive } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-surface-100">Dashboard</h1>
        <p className="text-surface-400 mt-1">Bienvenido de nuevo, aquí tienes un resumen de tu actividad.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <Card key={stat.label} hover>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-surface-400">{stat.label}</span>
                <span className="text-surface-400">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-surface-100">{stat.value}</p>
              <p className="text-xs text-surface-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-surface-100 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card key={action.label} hover onClick={() => {}}>
              <CardContent className="text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${action.gradient} p-3`}
                >
                  {action.icon}
                </div>
                <p className="font-medium text-surface-200">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Proyectos Recientes</CardTitle>
            <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Ver todos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      {project.type === 'Video' ? <Video className="w-5 h-5" /> : <Image className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-200">{project.name}</p>
                      <p className="text-xs text-surface-500">{project.type} · {project.updated}</p>
                    </div>
                  </div>
                  <Badge
                    variant={project.status === 'completed' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {project.status === 'completed' ? 'Completado' : 'Borrador'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favoritos</CardTitle>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-surface-500 mx-auto mb-3" />
              <p className="text-surface-400">No hay favoritos aún</p>
              <p className="text-sm text-surface-500 mt-1">Marca proyectos como favoritos para acceder rápido</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
