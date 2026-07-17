'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-2xl flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-surface-100 mb-2">Algo salió mal</h1>
        <p className="text-surface-400 mb-8">Ocurrió un error inesperado. Por favor, intenta de nuevo.</p>
        <Button variant="gradient" onClick={reset} icon={<RefreshCw className="w-5 h-5" />}>
          Intentar de Nuevo
        </Button>
      </motion.div>
    </div>
  );
}
