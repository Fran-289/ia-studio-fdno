'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminSidebar } from '@/components/admin/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

const PLANS = ['FREE', 'PRO', 'BUSINESS', 'ENTERPRISE'];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCredits, setEditCredits] = useState<Record<string, string>>({});
  const [editPlan, setEditPlan] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/users');
      if (data.success) {
        setUsers(data.data);
        const credits: Record<string, string> = {};
        const plans: Record<string, string> = {};
        data.data.forEach((u: any) => {
          credits[u.id] = String(u.credits ?? u.subscription?.credits ?? 50);
          plans[u.id] = u.subscription?.plan || 'FREE';
        });
        setEditCredits(credits);
        setEditPlan(plans);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const saveUser = async (userId: string) => {
    setSaving((s) => ({ ...s, [userId]: true }));
    try {
      const credits = parseInt(editCredits[userId]) || 0;
      const plan = editPlan[userId];
      await api.put(`/admin/users/${userId}/credits`, { credits });
      if (plan) await api.put(`/admin/users/${userId}/plan`, { plan, credits });
      await loadUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving((s) => ({ ...s, [userId]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Administración</h1>
        <p className="text-surface-400 mt-1">Gestiona usuarios, suscripciones y configuración global.</p>
      </motion.div>

      <div className="flex gap-6">
        <AdminSidebar />

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Usuarios ({users.length})</CardTitle>
                <Button variant="ghost" size="sm" onClick={loadUsers}>
                  Recargar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <p className="text-surface-500 text-center py-8">Cargando...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-surface-500 text-xs uppercase border-b border-white/5">
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Nombre</th>
                        <th className="text-center p-4">Créditos</th>
                        <th className="text-center p-4">Plan</th>
                        <th className="text-center p-4">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="p-4 text-surface-200">{user.email}</td>
                          <td className="p-4 text-surface-400">{user.name || '-'}</td>
                          <td className="p-4 text-center">
                            <input
                              type="number"
                              value={editCredits[user.id] || ''}
                              onChange={(e) => setEditCredits({ ...editCredits, [user.id]: e.target.value })}
                              className="w-24 text-center bg-surface-800 border border-surface-700 rounded-lg px-2 py-1 text-surface-100 text-sm"
                            />
                          </td>
                          <td className="p-4 text-center">
                            <select
                              value={editPlan[user.id] || 'FREE'}
                              onChange={(e) => setEditPlan({ ...editPlan, [user.id]: e.target.value })}
                              className="bg-surface-800 border border-surface-700 rounded-lg px-2 py-1 text-surface-100 text-sm"
                            >
                              {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                          </td>
                          <td className="p-4 text-center">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => saveUser(user.id)}
                              loading={saving[user.id]}
                            >
                              Guardar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
