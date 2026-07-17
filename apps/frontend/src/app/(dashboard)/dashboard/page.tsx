'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
  Sparkles,
  HardDrive,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api, endpoints } from '@/lib/api';

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  updatedAt: string;
}

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'Hace unos segundos';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} días`;
}

function formatBytes(bytes: number) {
  if (!bytes) return '0 GB';
  const gb = bytes / 1073741824;
  return `${gb.toFixed(1)} GB`;
}

const quickActions = [
  { label: 'Generar Imagen', icon: <Image className="w-5 h-5" />, href: '/dashboard/images', gradient: 'from-blue-500 to-cyan-500' },
  { label: 'Crear Video', icon: <Video className="w-5 h-5" />, href: '/dashboard/video', gradient: 'from-purple-500 to-pink-500' },
  { label: 'Clonar Voz', icon: <Mic2 className="w-5 h-5" />, href: '/dashboard/voice', gradient: 'from-emerald-500 to-teal-500' },
  { label: 'Diseñar Logo', icon: <PenTool className="w-5 h-5" />, href: '/dashboard/logos', gradient: 'from-orange-500 to-red-500' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(endpoints.projects.list),
      api.get(endpoints.user.profile),
    ])
      .then(([projRes, userRes]) => {
        setProjects(projRes.data);
        setUser(userRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const recentProjects = projects.slice(0, 4);
  const favorites = projects.filter((p) => (p as any).favorite);

  const stats = [
    { label: 'Proyectos', value: projects.length.toString(), icon: <FolderOpen className="w-5 h-5" />, change: `${Math.min(projects.length, 10)} este mes` },
    { label: 'Créditos', value: user?.credits?.toString() || '50', icon: <Sparkles className="w-5 h-5" />, change: `${user?.plan || 'FREE'}` },
    { label: 'Almacenamiento', value: formatBytes(user?.storageUsed || 0), icon: <HardDrive className="w-5 h-5" />, change: `de ${formatBytes(user?.storageLimit || 1073741824)}` },
    { label: 'Plan', value: user?.plan || 'FREE', icon: <TrendingUp className="w-5 h-5" />, change: 'Activo' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
            <Card key={action.label} hover onClick={() => router.push(action.href)}>
              <CardContent className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${action.gradient} p-3`}>
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
            <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />} onClick={() => router.push('/dashboard/projects')}>
              Ver todos
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-surface-500 text-center py-4">Cargando...</p>
            ) : recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <FolderOpen className="w-12 h-12 text-surface-500 mx-auto mb-3" />
                <p className="text-surface-400">No hay proyectos aún</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-200">{project.name}</p>
                        <p className="text-xs text-surface-500">{project.type} · {timeAgo(project.updatedAt)}</p>
                      </div>
                    </div>
                    <Badge variant={project.status === 'COMPLETED' ? 'success' : 'warning'} size="sm">
                      {project.status === 'COMPLETED' ? 'Completado' : 'Borrador'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favoritos</CardTitle>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-surface-500 mx-auto mb-3" />
                <p className="text-surface-400">No hay favoritos aún</p>
                <p className="text-sm text-surface-500 mt-1">Marca proyectos como favoritos para acceder rápido</p>
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map((project) => (
                  <div key={project.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <p className="text-sm text-surface-200">{project.name}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
