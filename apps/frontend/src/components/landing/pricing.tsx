'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: 'Gratis',
    description: 'Perfecto para empezar a explorar',
    credits: 50,
    features: [
      '50 créditos mensuales',
      'Generación de imágenes',
      'Editor básico',
      'Exportación en PNG',
      'Calidad estándar',
    ],
    cta: 'Comenzar Gratis',
    popular: false,
  },
  {
    name: 'Pro',
    price: '19',
    description: 'Para creadores profesionales',
    credits: 500,
    features: [
      '500 créditos mensuales',
      'Generación de imágenes y video',
      'Editor profesional',
      'Voz IA y clonación',
      'Exportación en todos los formatos',
      'Eliminar fondo',
      'Calidad HD',
      'Soporte prioritario',
    ],
    cta: 'Suscribirse',
    popular: true,
  },
  {
    name: 'Business',
    price: '49',
    description: 'Para equipos y agencias',
    credits: 2000,
    features: [
      '2000 créditos mensuales',
      'Todas las herramientas IA',
      'Editor completo',
      'API access',
      'Equipos de hasta 10 usuarios',
      'Exportación en 4K',
      'Soporte 24/7',
      'Marca personalizada',
    ],
    cta: 'Suscribirse',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Personalizado',
    description: 'Para grandes organizaciones',
    credits: -1,
    features: [
      'Créditos ilimitados',
      'Todas las herramientas',
      'Despliegue dedicado',
      'SSO y cumplimiento GDPR',
      'Equipos ilimitados',
      'SLA garantizado',
      'Gerente de cuenta dedicado',
      'Onboarding personalizado',
      'Auditoría de seguridad',
    ],
    cta: 'Contactar Ventas',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Planes <span className="gradient-text">flexibles</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos incluyen acceso a todas las herramientas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative glass-card-hover flex flex-col ${
                plan.popular ? 'gradient-border border-primary-500/50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-primary rounded-full text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Más Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-surface-100 mb-1">{plan.name}</h3>
                <p className="text-surface-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  {plan.price === 'Gratis' ? (
                    <span className="text-4xl font-bold text-surface-100">Gratis</span>
                  ) : plan.price === 'Personalizado' ? (
                    <span className="text-2xl font-bold text-surface-100">Personalizado</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-surface-100">${plan.price}</span>
                      <span className="text-surface-400">/mes</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                {plan.credits > 0 && (
                  <div className="flex items-center gap-2 text-sm text-surface-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    {plan.credits.toLocaleString()} créditos/mes
                  </div>
                )}
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-surface-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link href={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                <Button
                  fullWidth
                  variant={plan.popular ? 'gradient' : 'secondary'}
                  className="mt-auto"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
