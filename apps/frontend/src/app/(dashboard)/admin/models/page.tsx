'use client';

import { AdminSidebar } from '@/components/admin/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cpu, Power, Settings } from 'lucide-react';

const aiModels = [
  { name: 'DALL-E 3', provider: 'OpenAI', type: 'Imagen', cost: 50, active: true, usage: '45%' },
  { name: 'FLUX Pro', provider: 'FLUX', type: 'Imagen', cost: 40, active: true, usage: '30%' },
  { name: 'Stable Diffusion 3', provider: 'Stability AI', type: 'Imagen', cost: 30, active: true, usage: '15%' },
  { name: 'Veo', provider: 'Google', type: 'Video', cost: 200, active: true, usage: '25%' },
  { name: 'Runway Gen-3', provider: 'Runway', type: 'Video', cost: 150, active: true, usage: '35%' },
  { name: 'ElevenLabs', provider: 'ElevenLabs', type: 'Voz', cost: 30, active: true, usage: '60%' },
];

export default function AdminModelsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-surface-100">Administración</h1>
      <div className="flex gap-6">
        <AdminSidebar />
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modelos de IA</CardTitle>
              <Button variant="secondary" size="sm" icon={<Cpu className="w-4 h-4" />}>
                Añadir Modelo
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-surface-500 text-xs uppercase border-b border-white/5">
                      <th className="text-left p-4">Modelo</th>
                      <th className="text-left p-4">Proveedor</th>
                      <th className="text-left p-4">Tipo</th>
                      <th className="text-left p-4">Costo (créditos)</th>
                      <th className="text-left p-4">Estado</th>
                      <th className="text-left p-4">Uso</th>
                      <th className="text-left p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiModels.map((model) => (
                      <tr key={model.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="p-4 text-surface-200 font-medium">{model.name}</td>
                        <td className="p-4 text-surface-400">{model.provider}</td>
                        <td className="p-4">
                          <Badge variant="primary" size="sm">{model.type}</Badge>
                        </td>
                        <td className="p-4 text-surface-300">{model.cost}</td>
                        <td className="p-4">
                          <span className={`flex items-center gap-1.5 text-xs ${model.active ? 'text-emerald-400' : 'text-surface-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${model.active ? 'bg-emerald-400' : 'bg-surface-500'}`} />
                            {model.active ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-surface-700 rounded-full overflow-hidden">
                              <div className="h-full bg-primary-500 rounded-full" style={{ width: model.usage }} />
                            </div>
                            <span className="text-xs text-surface-400">{model.usage}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-white/5 rounded-lg">
                              <Power className="w-4 h-4 text-surface-400" />
                            </button>
                            <button className="p-1.5 hover:bg-white/5 rounded-lg">
                              <Settings className="w-4 h-4 text-surface-400" />
                            </button>
                          </div>
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
