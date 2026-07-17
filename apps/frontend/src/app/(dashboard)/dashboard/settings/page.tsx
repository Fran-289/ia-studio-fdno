'use client';

import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard, Palette, Key, Smartphone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const settingsSections = [
  { label: 'Perfil', icon: <User className="w-5 h-5" />, active: true },
  { label: 'Notificaciones', icon: <Bell className="w-5 h-5" />, active: false },
  { label: 'Seguridad', icon: <Shield className="w-5 h-5" />, active: false },
  { label: 'Suscripción', icon: <CreditCard className="w-5 h-5" />, active: false },
  { label: 'Apariencia', icon: <Palette className="w-5 h-5" />, active: false },
  { label: 'API Keys', icon: <Key className="w-5 h-5" />, active: false },
  { label: 'Dispositivos', icon: <Smartphone className="w-5 h-5" />, active: false },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Configuración</h1>
        <p className="text-surface-400 mt-1">Administra tu cuenta y preferencias.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-4 space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  section.active
                    ? 'bg-primary-500/20 text-white'
                    : 'text-surface-400 hover:text-surface-200 hover:bg-white/5'
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center text-2xl font-bold">
                  U
                </div>
                <div>
                  <Button variant="secondary" size="sm">Cambiar foto</Button>
                  <p className="text-xs text-surface-500 mt-1">JPG, PNG. Máximo 5MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nombre" defaultValue="Usuario" />
                <Input label="Correo electrónico" type="email" defaultValue="usuario@email.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Teléfono" type="tel" placeholder="+52 555 123 4567" />
                <Input label="Idioma" defaultValue="Español" />
              </div>
              <Button variant="gradient">Guardar Cambios</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Contraseña actual" type="password" placeholder="••••••••" />
                <Input label="Nueva contraseña" type="password" placeholder="••••••••" />
              </div>
              <Button variant="secondary">Actualizar Contraseña</Button>
              <hr className="border-white/10" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-surface-200">Autenticación de Dos Factores</p>
                  <p className="text-sm text-surface-400">Añade una capa extra de seguridad a tu cuenta.</p>
                </div>
                <Button variant="secondary" size="sm">Activar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
