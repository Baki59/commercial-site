import Link from 'next/link';
import type { SiteSettings } from '@/types';
import { Container } from '@/components/ui';
import { Logo } from '@/components/common/Logo';
import { Icon } from '@/lib/utils';

const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Pumps', href: '/categories/pumps' },
      { label: 'Valves', href: '/categories/valves' },
      { label: 'Strainers & filtration', href: '/categories/strainers-filtration' },
      { label: 'Pipes & fittings', href: '/categories/pipes-fittings' },
      { label: 'Full catalogue', href: '/products' },
    ],
  },
  {
    title: 'Engineering',
    links: [
      { label: 'Datasheets & catalogues', href: '/resources' },
      { label: 'Industries', href: '/industries' },
      { label: 'Applications', href: '/applications' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Services', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Sazin', href: '/company/about' },
      { label: 'Manufacturing', href: '/company/manufacturing' },
      { label: 'Quality', href: '/company/quality' },
      { label: 'Technology & R&D', href: '/company/technology' },
      { label: 'Sustainability', href: '/company/sustainability' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact us', href: '/contact' },
      { label: 'Global presence', href: '/locations' },
      { label: 'Partners & brands', href: '/partners' },
      { label: 'News & case studies', href: '/news' },
    ],
  },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-marine-deep text-white/70">
      <Container>
        <div className="grid gap-12 py-14 lg:grid-cols-[1.25fr_2.75fr] lg:py-18">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-white/60">{settings.tagline}</p>
            <address className="mt-6 space-y-2.5 text-[0.88rem] not-italic">
              <span className="flex items-start gap-2.5">
                <Icon.pin size={16} className="mt-0.5 shrink-0 text-white/40" />
                <span>{settings.addressLines.join(', ')}</span>
              </span>
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                <Icon.phone size={16} className="text-white/40" />
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                <Icon.mail size={16} className="text-white/40" />
                {settings.email}
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[0.95rem] font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[0.88rem] transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="mb-4 max-w-3xl text-[0.78rem] leading-relaxed text-white/40">{settings.footerNote}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.82rem] text-white/50">
              © {new Date().getFullYear()} {settings.legalName}. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-[0.82rem]">
              {settings.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
