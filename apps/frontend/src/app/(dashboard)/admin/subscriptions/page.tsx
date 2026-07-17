'use client';

import { AdminSidebar } from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';

const subscriptions = [
  { id: '1', user: 'Carlos Méndez', plan: 'Pro', status: 'Activo', amount: '$19/mes', nextBilling: '2024-08-15', credits: 500 },
  { id: '2', user: 'Ana García', plan: 'Free', status: 'Activo', amount: 'Gratis', nextBilling: '-', credits: 50 },
  { id: '3', user: 'Miguel Torres', plan: 'Business', status: 'Activo', amount: '$49/mes', nextBilling: '2024-08-20', credits: 2000 },
  { id: '4', user: 'Laura Jiménez', plan: 'Pro', status: 'Cancelado', amount: '$19/mes', nextBilling: '-', credits: 0 },
  { id: '5', user: 'Roberto Díaz', plan: 'Enterprise', status: 'Activo', amount: 'Personalizado', nextBilling: '2024-09-01', credits: 10000 },
];

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-surface-100">Administración</h1>
      <div className="flex gap-6">
        <AdminSidebar />
        <div className="flex-1 space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-surface-500 text-xs uppercase border-b border-white/5">
                      <th className="text-left p-4">Usuario</th>
                      <th className="text-left p-4">Plan</th>
                      <th className="text-left p-4">Estado</th>
                      <th className="text-left p-4">Monto</th>
                      <th className="text-left p-4">Próximo cobro</th>
                      <th className="text-left p-4">Créditos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="p-4 text-surface-200">{sub.user}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            sub.plan === 'Pro' ? 'bg-primary-500/20 text-white' :
                            sub.plan === 'Business' ? 'bg-emerald-500/10 text-emerald-300' :
                            sub.plan === 'Enterprise' ? 'bg-amber-500/10 text-amber-300' :
                            'bg-surface-700/50 text-surface-400'
                          }`}>{sub.plan}</span>
                        </td>
                        <td className="p-4">
                          <span className={`flex items-center gap-1.5 text-xs ${sub.status === 'Activo' ? 'text-emerald-400' : 'text-red-400'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sub.status === 'Activo' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-4 text-surface-300">{sub.amount}</td>
                        <td className="p-4 text-surface-500">{sub.nextBilling}</td>
                        <td className="p-4 text-surface-300">{sub.credits.toLocaleString()}</td>
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
