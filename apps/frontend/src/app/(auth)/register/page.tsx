'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, Github, ChromeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api, endpoints } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post(endpoints.auth.register, { name, email, password });
      localStorage.setItem('auth_token', data.access_token);
      document.cookie = `auth_token=${data.access_token}; path=/; max-age=2592000; SameSite=Strict`;
      router.push('/dashboard');
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setError(Array.isArray(msg) ? msg.join(', ') : msg || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Nombre completo" type="text" placeholder="Tu nombre" icon={<User className="w-4 h-4" />} value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Correo electrónico" type="email" placeholder="tu@email.com" icon={<Mail className="w-4 h-4" />} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Contraseña" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />

          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500/20" required />
            <span className="text-sm text-surface-400">
              Acepto los{' '}
              <Link href="#" className="text-primary-400 hover:text-white">Términos de Servicio</Link>
              {' '}y{' '}
              <Link href="#" className="text-primary-400 hover:text-white">Política de Privacidad</Link>
            </span>
          </div>

          <Button type="submit" variant="gradient" fullWidth className="mt-2" loading={loading}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
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
