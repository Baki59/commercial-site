import Link from 'next/link';
import type { HomeHero, ProductCategory } from '@/types';
import { Container } from '@/components/ui';
import { Icon } from '@/lib/utils';
import { HeroFinder } from './HeroFinder';

/**
 * The hero opens with the thing a buyer in this trade actually arrives with:
 * a model number or a duty. So the finder sits in the hero itself rather than
 * behind a navigation click.
 */
export function Hero({ hero, categories }: { hero: HomeHero; categories: ProductCategory[] }) {
  return (
    <section className="relative overflow-hidden bg-marine-deep text-white">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_85%_at_82%_-10%,rgba(27,127,158,0.42),transparent_62%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            {hero.eyebrow ? <p className="rise rise-1 text-[0.86rem] text-white/55">{hero.eyebrow}</p> : null}
            <h1 className="rise rise-1 mt-4 max-w-[19ch] text-[2.4rem] leading-[1.08] sm:text-[3.1rem] lg:text-[3.45rem]">
              {hero.headline}
            </h1>
            {hero.subheadline ? (
              <p className="rise rise-2 mt-6 max-w-[58ch] text-[1.02rem] leading-relaxed text-white/72">
                {hero.subheadline}
              </p>
            ) : null}

            <div className="rise rise-2 mt-9 flex flex-wrap items-center gap-3">
              {hero.primaryCta ? (
                <Link
                  href={hero.primaryCta.href}
                  className="inline-flex h-13 items-center rounded-xs bg-white px-7 font-medium text-marine-deep transition-colors hover:bg-white/88"
                >
                  {hero.primaryCta.label}
                </Link>
              ) : null}
              {hero.secondaryCta ? (
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex h-13 items-center rounded-xs px-7 font-medium text-white ring-1 ring-inset ring-white/28 transition-colors hover:bg-white/10"
                >
                  {hero.secondaryCta.label}
                </Link>
              ) : null}
            </div>

            {hero.quickLinks?.length ? (
              <div className="rise rise-3 mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/12 pt-6 text-[0.88rem]">
                {hero.quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/62 transition-colors hover:text-white"
                  >
                    {link.label}
                    <Icon.chevronRight size={14} className="text-white/35 transition-colors group-hover:text-accent" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rise rise-3">
            <HeroFinder categories={categories} />
          </div>
        </div>
      </Container>
    </section>
  );
}
