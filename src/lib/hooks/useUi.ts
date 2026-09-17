'use client';

import { useAppStore } from '@/lib/store/useAppStore';

/** Navigation and overlay state for the header, mobile nav and filter drawer. */
export function useUi() {
  const mobileNavOpen = useAppStore((s) => s.mobileNavOpen);
  const openMenu = useAppStore((s) => s.openMenu);
  const filterDrawerOpen = useAppStore((s) => s.filterDrawerOpen);
  const setMobileNavOpen = useAppStore((s) => s.setMobileNavOpen);
  const setOpenMenu = useAppStore((s) => s.setOpenMenu);
  const setFilterDrawerOpen = useAppStore((s) => s.setFilterDrawerOpen);
  const closeAll = useAppStore((s) => s.closeAll);

  return {
    mobileNavOpen,
    openMenu,
    filterDrawerOpen,
    setMobileNavOpen,
    setOpenMenu,
    setFilterDrawerOpen,
    closeAll,
    toggleMobileNav: () => setMobileNavOpen(!mobileNavOpen),
  };
}
