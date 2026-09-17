/* ===========================================================================
   ICON SET — one file, one visual language.
   Line icons drawn on a 24px grid at 1.6 stroke so they sit correctly beside
   IBM Plex Sans. Add new icons here rather than pasting SVG into components.
   =========================================================================== */

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  search: (p: IconProps) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </Base>
  ),
  chevronDown: (p: IconProps) => (
    <Base {...p}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  ),
  chevronRight: (p: IconProps) => (
    <Base {...p}>
      <path d="m9 6 6 6-6 6" />
    </Base>
  ),
  arrowRight: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  ),
  download: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </Base>
  ),
  document: (p: IconProps) => (
    <Base {...p}>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h4" />
    </Base>
  ),
  filter: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 5h18" />
      <path d="M7 12h10" />
      <path d="M10 19h4" />
    </Base>
  ),
  close: (p: IconProps) => (
    <Base {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Base>
  ),
  menu: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  ),
  mail: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Base>
  ),
  phone: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </Base>
  ),
  pin: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Base>
  ),
  check: (p: IconProps) => (
    <Base {...p}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Base>
  ),
  gauge: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="m12 14 4-4" />
      <circle cx="12" cy="18" r="1.4" />
    </Base>
  ),
  layers: (p: IconProps) => (
    <Base {...p}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </Base>
  ),
  globe: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </Base>
  ),
  wrench: (p: IconProps) => (
    <Base {...p}>
      <path d="M15.5 4a5 5 0 0 0-5.6 6.7L4 16.6 7.4 20l5.9-5.9A5 5 0 0 0 20 8.5L17 11l-2.8-.7L13.5 7l3-3Z" />
    </Base>
  ),
};

export type IconName = keyof typeof Icon;
