'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-xl text-surface-200 mb-2">Página no encontrada</h2>
        <p className="text-surface-400 mb-8">La página que buscas no existe o ha sido movida.</p>
        <Link href="/">
          <Button variant="gradient" icon={<Home className="w-5 h-5" />}>
            Volver al Inicio
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
