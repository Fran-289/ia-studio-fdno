'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, Sparkles, Zap, Crown, Loader2 } from 'lucide-react';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

const plans = [
  {
    name: 'FREE',
    price: '0',
    description: 'Para empezar a explorar',
    credits: 50,
    features: ['50 creditos/mes', 'Imagenes basicas', 'Texto a voz', 'Proyectos ilimitados', 'Exportacion basica'],
    gradient: 'from-gray-500 to-gray-600',
  },
  {
    name: 'PRO',
    price: '29',
    description: 'Para creadores profesionales',
    credits: 500,
    popular: true,
    features: ['500 creditos/mes', 'Imagenes HD', 'Video AI', 'Clonacion de voz', 'Exportacion sin marca', 'Soporte prioritario'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'BUSINESS',
    price: '99',
    description: 'Para equipos y agencias',
    credits: 2000,
    features: ['2000 creditos/mes', 'Todo lo de PRO', 'API access', 'Multiples usuarios', 'Analiticas avanzadas', 'Soporte 24/7'],
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: string) => {
    if (plan === 'FREE') {
      router.push('/dashboard');
      return;
    }
    setLoading(plan);
    try {
      const res = await api.post('/payments/create-checkout', { plan });
      if (res.data.success && res.data.data.url) {
        window.location.href = res.data.data.url;
      }
    } catch (err) {
      console.error('Error al crear checkout:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="default" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Precios simples
          </Badge>
          <h1 className="text-4xl font-bold text-surface-100 mb-3">
            Elige tu plan
          </h1>
          <p className="text-surface-400 text-lg">
            El plan que mejor se adapte a tus necesidades. Cancela cuando quieras.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Card hover className={'relative h-full' + (plan.popular ? ' ring-2 ring-blue-500' : '')}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-blue-500">
                    <Zap className="w-3 h-3 mr-1" />
                    Mas popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-6 flex flex-col h-full">
                <div className={'w-12 h-12 rounded-xl bg-gradient-to-br ' + plan.gradient + ' p-3 mb-4'}>
                  {plan.name === 'FREE' ? <Sparkles className="w-6 h-6" /> :
                   plan.name === 'PRO' ? <Zap className="w-6 h-6" /> :
                   <Crown className="w-6 h-6" />}
                </div>

                <CardTitle className="text-xl mb-1">{plan.name}</CardTitle>
                <p className="text-surface-400 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-surface-100">${plan.price}</span>
                  <span className="text-surface-400 ml-2">/mes</span>
                </div>

                <p className="text-sm text-surface-300 mb-4">
                  <span className="font-semibold text-surface-100">{plan.credits}</span> creditos incluidos
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-surface-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full"
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loading !== null}
                >
                  {loading === plan.name ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Procesando...</>
                  ) : plan.name === 'FREE' ? (
                    'Comenzar Gratis'
                  ) : (
                    'Suscribirse a ' + plan.name
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
