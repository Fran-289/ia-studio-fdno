'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-surface-300">
              Nueva plataforma de creación con IA
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-surface-100">Crea sin límites con</span>
          <br />
          <span className="gradient-text">Inteligencia Artificial</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-surface-400 mb-10"
        >
          La plataforma todo en uno para crear y editar imágenes, videos y audio con IA.
          Diseña, genera y transforma tu contenido profesionalmente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/register">
            <Button size="lg" variant="gradient" className="text-base px-8">
              Comenzar Gratis
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button size="lg" variant="secondary" className="text-base px-8">
            <Play className="w-5 h-5" />
            Ver Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass rounded-2xl p-2 shadow-glass-lg">
            <div className="aspect-video bg-gradient-to-br from-surface-800 to-surface-900 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
                <p className="text-surface-400 text-sm">Video de demostración</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <ChevronDown className="w-6 h-6 text-surface-500 mx-auto animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
