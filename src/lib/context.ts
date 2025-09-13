
import { createContext, Dispatch, SetStateAction } from 'react';

export type ViewMode = 'desktop' | 'mobile' | 'tablet';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

export const AppContext = createContext<AppContextType>({
  viewMode: 'desktop',
  setViewMode: () => {},
});
