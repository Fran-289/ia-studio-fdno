'use client';

import { motion } from 'framer-motion';
import { AdminSidebar } from '@/components/admin/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, MoreVertical } from 'lucide-react';

const allUsers = Array.from({ length: 20 }).map((_, i) => ({
  name: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@email.com`,
  plan: ['Free', 'Pro', 'Business', 'Enterprise'][i % 4],
  status: i % 5 === 0 ? 'Inactivo' : 'Activo',
  credits: [50, 500, 2000, 10000][i % 4],
  joined: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
}));

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Administración</h1>
        <p className="text-surface-400 mt-1">Gestiona usuarios, suscripciones y configuración global.</p>
      </motion.div>

      <div className="flex gap-6">
        <AdminSidebar />

        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface-800/50 border border-surface-700/50 rounded-xl text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50"
              />
            </div>
            <Button variant="secondary" size="sm" icon={<Filter className="w-4 h-4" />}>
              Filtros
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-surface-500 text-xs uppercase border-b border-white/5">
                      <th className="text-left p-4">Usuario</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Plan</th>
                      <th className="text-left p-4">Créditos</th>
                      <th className="text-left p-4">Estado</th>
                      <th className="text-left p-4">Registro</th>
                      <th className="text-left p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="p-4 text-surface-200 font-medium">{user.name}</td>
                        <td className="p-4 text-surface-400">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            user.plan === 'Pro' ? 'bg-primary-500/20 text-white' :
                            user.plan === 'Business' ? 'bg-emerald-500/10 text-emerald-300' :
                            user.plan === 'Enterprise' ? 'bg-amber-500/10 text-amber-300' :
                            'bg-surface-700/50 text-surface-400'
                          }`}>{user.plan}</span>
                        </td>
                        <td className="p-4 text-surface-300">{user.credits.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`flex items-center gap-1.5 text-xs ${
                            user.status === 'Activo' ? 'text-emerald-400' : 'text-surface-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              user.status === 'Activo' ? 'bg-emerald-400' : 'bg-surface-500'
                            }`} />
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-surface-500">{user.joined}</td>
                        <td className="p-4">
                          <button className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-surface-400" />
                          </button>
                        </td>
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
