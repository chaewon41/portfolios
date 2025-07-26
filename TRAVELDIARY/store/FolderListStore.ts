import { create } from 'zustand';

export interface Folder {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  createdAt: string;
}

interface FolderListState {
  folders: Folder[];
  addFolder: (folder: Omit<Folder, 'id' | 'createdAt'>) => void;
  removeFolder: (id: string) => void;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  getLatestFolder: () => Folder | null;
}

export const useFolderListStore = create<FolderListState>((set, get) => ({
  folders: [],
  
  addFolder: (folderData) => {
    const newFolder: Folder = {
      ...folderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      folders: [newFolder, ...state.folders], // 최신 폴더가 맨 위에 오도록
    }));
  },
  
  removeFolder: (id) => {
    set((state) => ({
      folders: state.folders.filter(folder => folder.id !== id),
    }));
  },
  
  updateFolder: (id, updates) => {
    set((state) => ({
      folders: state.folders.map(folder => 
        folder.id === id ? { ...folder, ...updates } : folder
      ),
    }));
  },
  
  getLatestFolder: () => {
    const state = get();
    return state.folders.length > 0 ? state.folders[0] : null;
  },
})); 