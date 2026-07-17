'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  {
    question: '¿Qué es IA Studio FDNO?',
    answer:
      'IA Studio FDNO es una plataforma SaaS todo en uno que permite crear y editar imágenes, videos y audio utilizando Inteligencia Artificial. Incluye herramientas profesionales de edición, generación de contenido, diseño de logos, avatares, y más.',
  },
  {
    question: '¿Necesito experiencia técnica para usar la plataforma?',
    answer:
      'No. IA Studio FDNO está diseñada para ser intuitiva y fácil de usar. Tanto principiantes como profesionales pueden crear contenido de alta calidad sin conocimientos técnicos previos.',
  },
  {
    question: '¿Qué modelos de IA utilizan?',
    answer:
      'Soportamos múltiples modelos incluyendo DALL-E, FLUX, Stable Diffusion para imágenes, Veo, Runway, Kling, Luma para video, y ElevenLabs para voz. Añadimos nuevos modelos regularmente.',
  },
  {
    question: '¿Puedo cancelar mi suscripción en cualquier momento?',
    answer:
      'Sí, puedes cancelar tu suscripción en cualquier momento. Si cancelas, seguirás teniendo acceso hasta el final del período de facturación actual.',
  },
  {
    question: '¿Qué formatos de exportación están disponibles?',
    answer:
      'Soportamos PNG, JPG, WEBP, SVG, GIF para imágenes; MP4, MOV, AVI, WEBM para video; y PDF para documentos. Los planes superiores incluyen exportación en 4K.',
  },
  {
    question: '¿Cómo funciona el sistema de créditos?',
    answer:
      'Cada acción en la plataforma consume créditos. Las acciones más simples (como editar) consumen menos créditos que las más complejas (como generar video). Los créditos se renuevan mensualmente según tu plan.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer:
      'Sí. Implementamos cifrado de extremo a extremo, autenticación de dos factores, cumplimiento GDPR y las mejores prácticas de seguridad. Tus proyectos y datos personales están protegidos.',
  },
  {
    question: '¿Ofrecen descuentos para equipos?',
    answer:
      'Sí. Nuestro plan Business incluye hasta 10 usuarios y el plan Enterprise tiene equipos ilimitados. Contacta a ventas para obtener un presupuesto personalizado.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="text-surface-400 text-lg">
            Todo lo que necesitas saber sobre IA Studio FDNO
          </p>
        </motion.div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            placeholder="Buscar preguntas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-surface-200 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-surface-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-surface-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
