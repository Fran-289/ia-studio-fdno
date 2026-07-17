'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Mail, Lock, User, Github, ChromeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
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
          <h1 className="text-2xl font-bold text-surface-100">Crear cuenta</h1>
          <p className="text-surface-400 mt-1">Comienza a crear con IA</p>
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
            <span className="px-4 bg-surface-900 text-surface-500">o regístrate con email</span>
          </div>
        </div>

        <form className="space-y-4">
          <Input label="Nombre completo" type="text" placeholder="Tu nombre" icon={<User className="w-4 h-4" />} />
          <Input label="Correo electrónico" type="email" placeholder="tu@email.com" icon={<Mail className="w-4 h-4" />} />
          <Input label="Contraseña" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />

          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500/20" />
            <span className="text-sm text-surface-400">
              Acepto los{' '}
              <Link href="#" className="text-primary-400 hover:text-white">Términos de Servicio</Link>
              {' '}y{' '}
              <Link href="#" className="text-primary-400 hover:text-white">Política de Privacidad</Link>
            </span>
          </div>

          <Button type="submit" variant="gradient" fullWidth className="mt-2">
            Crear Cuenta
          </Button>
        </form>

        <p className="text-center text-sm text-surface-400 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-primary-400 hover:text-white font-medium">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
