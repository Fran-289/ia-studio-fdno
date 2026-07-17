'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crop,
  RotateCw,
  Layers,
  Type,
  Filter,
  Sun,
  Contrast,
  Droplets,
  SunDim,
  Focus,
  Blend,
  Undo2,
  Redo2,
  Eraser,
  Wand2,
  Image as ImageIcon,
  Download,
  Save,
  Expand,
  Palette,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const toolGroups = [
  {
    label: 'Herramientas',
    tools: [
      { icon: <Crop className="w-4 h-4" />, label: 'Recortar' },
      { icon: <RotateCw className="w-4 h-4" />, label: 'Rotar' },
      { icon: <Layers className="w-4 h-4" />, label: 'Capas' },
      { icon: <Type className="w-4 h-4" />, label: 'Texto' },
    ],
  },
  {
    label: 'Ajustes',
    tools: [
      { icon: <Filter className="w-4 h-4" />, label: 'Filtros' },
      { icon: <Sun className="w-4 h-4" />, label: 'Brillo' },
      { icon: <Contrast className="w-4 h-4" />, label: 'Contraste' },
      { icon: <Droplets className="w-4 h-4" />, label: 'Saturación' },
      { icon: <SunDim className="w-4 h-4" />, label: 'Sombras' },
      { icon: <Focus className="w-4 h-4" />, label: 'Nitidez' },
      { icon: <Blend className="w-4 h-4" />, label: 'Desenfoque' },
    ],
  },
  {
    label: 'IA',
    tools: [
      { icon: <Eraser className="w-4 h-4" />, label: 'Eliminar Fondo' },
      { icon: <ImageIcon className="w-4 h-4" />, label: 'Cambiar Fondo' },
      { icon: <Wand2 className="w-4 h-4" />, label: 'Eliminar Objeto' },
      { icon: <Expand className="w-4 h-4" />, label: 'Expandir' },
      { icon: <Palette className="w-4 h-4" />, label: 'Colorear' },
      { icon: <Sparkles className="w-4 h-4" />, label: 'Mejorar' },
    ],
  },
];

export function ImageEditor() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="w-16 flex flex-col gap-1 py-2">
        {toolGroups.map((group) =>
          group.tools.map((tool) => (
            <button
              key={tool.label}
              onClick={() => setActiveTool(tool.label)}
              className={`p-3 rounded-xl transition-all ${
                activeTool === tool.label
                  ? 'gradient-primary text-white'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-white/5'
              }`}
              title={tool.label}
            >
              {tool.icon}
            </button>
          )),
        )}
      </div>

      <div className="flex-1 glass rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="w-20 h-20 text-surface-500 mx-auto mb-4" />
          <p className="text-surface-400 text-lg mb-2">Editor de Imágenes</p>
          <p className="text-surface-500 text-sm">Arrastra una imagen o selecciona un proyecto para editar</p>
        </div>
      </div>

      <div className="w-72 space-y-3">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-surface-200">Historial</span>
            <div className="flex gap-1">
              <button className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-white/5">
                <Undo2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-white/5">
                <Redo2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2 text-xs text-surface-500">
            <div className="p-2 rounded-lg bg-white/5">Apertura de imagen</div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 space-y-3">
          <Button variant="gradient" fullWidth size="sm" icon={<Save className="w-4 h-4" />}>
            Guardar
          </Button>
          <Button variant="secondary" fullWidth size="sm" icon={<Download className="w-4 h-4" />}>
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
}
