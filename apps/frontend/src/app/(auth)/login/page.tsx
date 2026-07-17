'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Mail, Lock, Eye, EyeOff, Github, ChromeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="glass rounded-2xl p-8 shadow-glass-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 gradient-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-surface-100">Bienvenido de nuevo</h1>
          <p className="text-surface-400 mt-1">Inicia sesión en tu cuenta</p>
        </div>

        <div className="space-y-4 mb-6">
          <Button variant="secondary" fullWidth icon={<ChromeIcon className="w-5 h-5" />}>
            Continuar con Google
          </Button>
          <Button variant="secondary" fullWidth icon={<Github className="w-5 h-5" />}>
            Continuar con GitHub
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface-900 text-surface-500">o continúa con email</span>
          </div>
        </div>

        <form className="space-y-4">
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            icon={<Mail className="w-4 h-4" />}
          />
          <div className="relative">
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-surface-400 hover:text-surface-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500/20" />
              <span className="text-sm text-surface-400">Recordarme</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-primary-400 hover:text-white">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button type="submit" variant="gradient" fullWidth className="mt-2">
            Iniciar Sesión
          </Button>
        </form>

        <p className="text-center text-sm text-surface-400 mt-6">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-primary-400 hover:text-white font-medium">
            Crear cuenta
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
