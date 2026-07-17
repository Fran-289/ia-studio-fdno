'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card gradient-border p-12"
        >
          <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para crear sin límites?
          </h2>
          <p className="text-surface-400 text-lg mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya están transformando su forma de crear contenido.
            Comienza gratis, sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="gradient" className="text-base px-8">
                Comenzar Gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-base px-8">
                Hablar con Ventas
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
