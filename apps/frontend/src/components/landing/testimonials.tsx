'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Méndez',
    role: 'Creador de Contenido',
    avatar: 'CM',
    content:
      'IA Studio FDNO transformó mi flujo de trabajo. Ahora creo contenido para todas mis redes en una sola plataforma. Increíble.',
    rating: 5,
  },
  {
    name: 'Ana García',
    role: 'Diseñadora Gráfica',
    avatar: 'AG',
    content:
      'La calidad de las imágenes generadas por IA es impresionante. El editor manual me permite ajustar cada detalle. Altamente recomendado.',
    rating: 5,
  },
  {
    name: 'Miguel Torres',
    role: 'Marketing Digital',
    avatar: 'MT',
    content:
      'Generamos campañas publicitarias completas en minutos. La función de publicidad IA nos ahorra horas de trabajo cada semana.',
    rating: 5,
  },
  {
    name: 'Laura Jiménez',
    role: 'Emprendedora',
    avatar: 'LJ',
    content:
      'Desde logos hasta videos promocionales, todo lo hago aquí. La mejor inversión para mi negocio.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Lo que dicen nuestros{' '}
            <span className="gradient-text">usuarios</span>
          </h2>
          <p className="text-surface-400 text-lg">
            Miles de profesionales confían en IA Studio FDNO
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-surface-100">{testimonial.name}</p>
                  <p className="text-sm text-surface-400">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-surface-300 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
