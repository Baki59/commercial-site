'use client';

/* ===========================================================================
   ONE GENERIC STORE for every feature, as agreed.
   Each feature owns a named slice inside it and reaches the slice through its
   own hook in src/lib/hooks — components never import the store directly.
   =========================================================================== */

import { create } from 'zustand';
import type { ProductQuery, ResourceType } from '@/types';

interface CatalogueSlice {
  filters: ProductQuery;
  setFilter: <K extends keyof ProductQuery>(key: K, value: ProductQuery[K]) => void;
  resetFilters: () => void;
}

interface ResourceSlice {
  resourceType: ResourceType | '';
  resourceSearch: string;
  setResourceType: (value: ResourceType | '') => void;
  setResourceSearch: (value: string) => void;
}

interface UiSlice {
  mobileNavOpen: boolean;
  openMenu: string | null;
  filterDrawerOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  setOpenMenu: (label: string | null) => void;
  setFilterDrawerOpen: (open: boolean) => void;
  closeAll: () => void;
}

export type AppState = CatalogueSlice & ResourceSlice & UiSlice;

const EMPTY_FILTERS: ProductQuery = {
  search: '',
  category: '',
  industry: '',
  application: '',
  page: 1,
};

export const useAppStore = create<AppState>((set) => ({
  /* catalogue */
  filters: EMPTY_FILTERS,
  setFilter: (key, value) =>
    set((state) => ({
      // Any filter change resets pagination, except a page change itself.
      filters: { ...state.filters, [key]: value, ...(key === 'page' ? {} : { page: 1 }) },
    })),
  resetFilters: () => set({ filters: EMPTY_FILTERS }),

  /* resources */
  resourceType: '',
  resourceSearch: '',
  setResourceType: (resourceType) => set({ resourceType }),
  setResourceSearch: (resourceSearch) => set({ resourceSearch }),

  /* ui */
  mobileNavOpen: false,
  openMenu: null,
  filterDrawerOpen: false,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setOpenMenu: (openMenu) => set({ openMenu }),
  setFilterDrawerOpen: (filterDrawerOpen) => set({ filterDrawerOpen }),
  closeAll: () => set({ mobileNavOpen: false, openMenu: null, filterDrawerOpen: false }),
}));
