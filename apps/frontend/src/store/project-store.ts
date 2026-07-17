import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  type: 'image' | 'video' | 'voice' | 'logo' | 'avatar' | 'thumbnail' | 'ad' | 'social';
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  favorite: boolean;
  folder?: string;
  tags?: string[];
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  selectedProjects: string[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
  toggleFavorite: (id: string) => void;
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  selectedProjects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      selectedProjects: state.selectedProjects.filter((pid) => pid !== id),
    })),
  setCurrentProject: (project) => set({ currentProject: project }),
  toggleFavorite: (id) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
    })),
  toggleSelect: (id) =>
    set((state) => ({
      selectedProjects: state.selectedProjects.includes(id)
        ? state.selectedProjects.filter((pid) => pid !== id)
        : [...state.selectedProjects, id],
    })),
  selectAll: () =>
    set((state) => ({
      selectedProjects: state.projects.map((p) => p.id),
    })),
  deselectAll: () => set({ selectedProjects: [] }),
}));
