'use client';

import { motion } from 'framer-motion';
import { ImageGenerator } from '@/components/dashboard/image-generator';

export default function ImagesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Generador de Imágenes IA</h1>
        <p className="text-surface-400 mt-1">
          Crea imágenes únicas con inteligencia artificial usando prompts descriptivos.
        </p>
      </motion.div>
      <ImageGenerator />
    </div>
  );
}
