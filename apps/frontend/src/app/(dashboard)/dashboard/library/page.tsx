'use client';

import { motion } from 'framer-motion';
import { Library, Search, Grid3X3, List, Star, Clock, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const categories = [
  { label: 'Todos', active: true },
  { label: 'Plantillas', active: false },
  { label: 'Recursos', active: false },
  { label: 'Favoritos', active: false },
  { label: 'Archivos', active: false },
];

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Biblioteca</h1>
        <p className="text-surface-400 mt-1">Tus plantillas, recursos y archivos en un solo lugar.</p>
      </motion.div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                cat.active
                  ? 'border-white/20 bg-primary-500/20 text-white'
                  : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Buscar en biblioteca..."
            className="w-full pl-10 pr-4 py-2 bg-surface-800/50 border border-surface-700/50 rounded-xl text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} hover>
            <div className="aspect-[4/3] bg-surface-800/50 rounded-xl mb-3 flex items-center justify-center">
              <Library className="w-8 h-8 text-surface-500" />
            </div>
            <h3 className="text-sm font-medium text-surface-200 truncate">Recurso {i + 1}</h3>
            <p className="text-xs text-surface-500">Plantilla · 2.4 MB</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
