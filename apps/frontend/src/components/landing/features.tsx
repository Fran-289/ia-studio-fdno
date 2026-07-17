'use client';

import { motion } from 'framer-motion';
import {
  Image,
  Video,
  Mic2,
  PenTool,
  Palette,
  Sparkles,
  Users,
  Share2,
  Layers,
  Zap,
  Shield,
  Cloud,
} from 'lucide-react';

const features = [
  {
    icon: <Image className="w-6 h-6" />,
    title: 'Generación de Imágenes IA',
    description: 'Crea imágenes únicas con prompts avanzados. Compatible con DALL-E, FLUX, Stable Diffusion y más.',
    gradient: 'from-[#c97d3a] to-[#d4a04a]',
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Video con IA',
    description: 'Genera videos a partir de texto, imágenes o múltiples clips. Edita con timeline profesional.',
    gradient: 'from-[#a3542c] to-[#c97d3a]',
  },
  {
    icon: <Mic2 className="w-6 h-6" />,
    title: 'Voz y Audio IA',
    description: 'Texto a voz, clonación de voz, traducción y más en más de 100 idiomas.',
    gradient: 'from-[#8b6f47] to-[#c9a84a]',
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: 'Diseño de Logos',
    description: 'Crea logos profesionales con IA. Exporta en SVG, PNG y PDF.',
    gradient: 'from-[#7a3a22] to-[#c47830]',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Avatares IA',
    description: 'Genera avatares únicos: profesional, gamer, anime, corporativo o realista.',
    gradient: 'from-[#5c3d2e] to-[#c97d3a]',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Editor Profesional',
    description: 'Edición completa de imágenes y video con capas, filtros, animaciones y más.',
    gradient: 'from-[#8b4a1f] to-[#d4954a]',
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'Redes Sociales',
    description: 'Contenido optimizado para Instagram, TikTok, YouTube, LinkedIn, Facebook y más.',
    gradient: 'from-[#6b311f] to-[#c97d3a]',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Publicidad IA',
    description: 'Genera anuncios optimizados para Facebook, Instagram, TikTok, Google y YouTube.',
    gradient: 'from-[#a34724] to-[#e29c42]',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Seguridad Empresarial',
    description: 'Cifrado de extremo a extremo, autenticación 2FA y cumplimiento GDPR.',
    gradient: 'from-[#3d2e25] to-[#8b6f47]',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Todo lo que necesitas en{' '}
            <span className="gradient-text">un solo lugar</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Desde la creación hasta la edición profesional, IA Studio FDNO tiene todas las herramientas
            que necesitas para dar vida a tus ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card-hover group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-surface-100 mb-2">{feature.title}</h3>
              <p className="text-surface-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
