'use client';

import { motion } from 'framer-motion';
import { Shield, Users, CreditCard, Cpu, TrendingUp, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AdminSidebar } from '@/components/admin/admin-layout';

const adminStats = [
  { label: 'Usuarios Totales', value: '2,847', icon: <Users className="w-5 h-5" />, change: '+12% este mes' },
  { label: 'Suscripciones Activas', value: '1,234', icon: <CreditCard className="w-5 h-5" />, change: '+8% este mes' },
  { label: 'Créditos Vendidos', value: '45.2K', icon: <TrendingUp className="w-5 h-5" />, change: '+23% este mes' },
  { label: 'Modelos IA Activos', value: '10', icon: <Cpu className="w-5 h-5" />, change: '2 nuevos este mes' },
];

const recentUsers = [
  { name: 'Carlos Méndez', email: 'carlos@email.com', plan: 'Pro', status: 'Activo', date: 'Hoy' },
  { name: 'Ana García', email: 'ana@email.com', plan: 'Free', status: 'Activo', date: 'Ayer' },
  { name: 'Miguel Torres', email: 'miguel@email.com', plan: 'Business', status: 'Activo', date: 'Ayer' },
  { name: 'Laura Jiménez', email: 'laura@email.com', plan: 'Pro', status: 'Inactivo', date: 'Hace 3 días' },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Panel de Administración</h1>
        <p className="text-surface-400 mt-1">Gestiona usuarios, suscripciones y configuración global.</p>
      </motion.div>

      <div className="flex gap-6">
        <AdminSidebar />

        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-surface-400">{stat.label}</span>
                    <span className="text-primary-400">{stat.icon}</span>
                  </div>
                  <p className="text-2xl font-bold text-surface-100">{stat.value}</p>
                  <p className="text-xs text-surface-500 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usuarios Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-surface-500 text-xs uppercase">
                      <th className="text-left p-3">Nombre</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Plan</th>
                      <th className="text-left p-3">Estado</th>
                      <th className="text-left p-3">Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.email} className="border-t border-white/5 hover:bg-white/[0.02]">
                        <td className="p-3 text-surface-200">{user.name}</td>
                        <td className="p-3 text-surface-400">{user.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            user.plan === 'Pro' ? 'bg-primary-500/20 text-white' :
                            user.plan === 'Business' ? 'bg-emerald-500/10 text-emerald-300' :
                            'bg-surface-700/50 text-surface-400'
                          }`}>{user.plan}</span>
                        </td>
                        <td className="p-3">
                          <span className={`flex items-center gap-1.5 text-xs ${
                            user.status === 'Activo' ? 'text-emerald-400' : 'text-surface-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              user.status === 'Activo' ? 'bg-emerald-400' : 'bg-surface-500'
                            }`} />
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3 text-surface-500">{user.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
