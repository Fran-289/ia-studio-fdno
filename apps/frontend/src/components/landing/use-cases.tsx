'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  Youtube,
  Store,
  GraduationCap,
  Gamepad2,
  Music,
} from 'lucide-react';

const useCases = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Marketing',
    description: 'Crea contenido publicitario, banners, anuncios y material promocional en minutos.',
    color: 'from-[#c97d3a] to-[#d4a04a]',
  },
  {
    icon: <Youtube className="w-6 h-6" />,
    title: 'Creadores de Contenido',
    description: 'Miniaturas, shorts, reels, edición de video y todo para tus redes sociales.',
    color: 'from-[#a34724] to-[#c97d3a]',
  },
  {
    icon: <Store className="w-6 h-6" />,
    title: 'E-commerce',
    description: 'Imágenes de producto, publicidad, logos y contenido para tu tienda online.',
    color: 'from-[#7a3a22] to-[#d4954a]',
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'Educación',
    description: 'Material didáctico, presentaciones, videos educativos y voces narrativas.',
    color: 'from-[#5c3d2e] to-[#c9a84a]',
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: 'Videojuegos',
    description: 'Avatares, arte conceptual, assets gráficos y trailers promocionales.',
    color: 'from-[#8b4a1f] to-[#e29c42]',
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: 'Música y Audio',
    description: 'Portadas de álbumes, videos musicales, voces y traducción de audio.',
    color: 'from-[#6b311f] to-[#c47830]',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Casos de <span className="gradient-text">uso</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Diseñado para profesionales de todos los sectores.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card-hover group text-center"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${useCase.color} p-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {useCase.icon}
              </div>
              <h3 className="text-lg font-semibold text-surface-100 mb-2">{useCase.title}</h3>
              <p className="text-surface-400 text-sm">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
