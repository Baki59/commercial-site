import Image from 'next/image';
import Link from 'next/link';
import type {
  Article,
  CapabilityBlock,
  CollectionItem,
  Partner,
  ProductCategory,
  ProductSummary,
  TechnicalResource,
} from '@/types';
import { ButtonLink, Section, SectionHead, Tag } from '@/components/ui';
import { ProductGrid } from '@/components/product/ProductCard';
import { ResourceList } from '@/components/product/ResourceList';
import { formatDate, Icon } from '@/lib/utils';

/* --- Product families ------------------------------------------------------ */

export function ProductFamilies({ categories }: { categories: ProductCategory[] }) {
  return (
    <Section tone="paper">
      <SectionHead
        title="Product families"
        description="Four supply lines, each with its own catalogue, specifications and technical documents."
        action={<ButtonLink href="/products" variant="secondary" size="sm">Full catalogue</ButtonLink>}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-accent"
          >
            <div className="relative aspect-3/2 bg-surface-sunk">
              {category.image ? (
                <Image
                  src={category.image.url}
                  alt={category.image.alt ?? category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-[1.08rem] transition-colors group-hover:text-accent-deep">{category.name}</h3>
              <p className="mt-2 line-clamp-3 text-[0.88rem] leading-relaxed text-ink-soft">{category.description}</p>
              {category.children?.length ? (
                <p className="mt-4 border-t border-line pt-3 text-[0.82rem] text-muted">
                  {category.children.map((child) => child.name).join(' · ')}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* --- Featured products ----------------------------------------------------- */

export function FeaturedProducts({ products }: { products: ProductSummary[] }) {
  return (
    <Section tone="surface">
      <SectionHead
        title="Frequently specified"
        description="The ranges most often selected across water, power, textile and building services projects."
        action={<ButtonLink href="/products" variant="secondary" size="sm">Browse all products</ButtonLink>}
      />
      <ProductGrid products={products.slice(0, 8)} />
    </Section>
  );
}

/* --- Industries ------------------------------------------------------------ */

export function IndustriesBlock({ industries }: { industries: CollectionItem[] }) {
  return (
    <Section tone="paper">
      <SectionHead
        title="Industries we supply"
        description="Each sector brings its own duty profile, chemistry and documentation requirements."
        action={<ButtonLink href="/industries" variant="secondary" size="sm">All industries</ButtonLink>}
      />
      <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="group flex flex-col bg-surface p-6 transition-colors hover:bg-accent-wash/45"
          >
            <h3 className="text-[1.05rem] transition-colors group-hover:text-accent-deep">{industry.name}</h3>
            <p className="mt-2.5 text-[0.89rem] leading-relaxed text-ink-soft">{industry.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.85rem] text-accent-deep">
              View equipment
              <Icon.arrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* --- Capabilities ---------------------------------------------------------- */

export function Capabilities({ blocks }: { blocks: CapabilityBlock[] }) {
  return (
    <Section tone="marine">
      <SectionHead
        invert
        title="What you get beyond the equipment"
        description="Supply is the easy part. These four things decide whether the installation still performs in year five."
      />
      <div className="grid gap-px overflow-hidden rounded-sm bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
        {blocks.map((block) => (
          <div key={block.title} className="flex flex-col bg-marine-deep p-6">
            {block.metric ? (
              <>
                <p className="font-[family-name:var(--font-display)] text-[1.55rem] text-white">{block.metric}</p>
                <p className="mt-1 text-[0.8rem] text-white/45">{block.metricLabel}</p>
              </>
            ) : null}
            <h3 className="mt-6 text-[1.02rem] text-white">{block.title}</h3>
            <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-white/65">{block.body}</p>
            {block.href ? (
              <Link
                href={block.href}
                className="mt-5 inline-flex items-center gap-2 text-[0.85rem] text-white/80 transition-colors hover:text-white"
              >
                Read more
                <Icon.arrowRight size={15} />
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* --- Services -------------------------------------------------------------- */

export function ServicesBlock({ services }: { services: CollectionItem[] }) {
  return (
    <Section tone="surface">
      <SectionHead
        title="Engineering and service"
        description="From selection through commissioning to the spare part that arrives before the line stops."
        action={<ButtonLink href="/services" variant="secondary" size="sm">All services</ButtonLink>}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex gap-5 rounded-sm border border-line p-6 transition-colors hover:border-accent"
          >
            <span className="mt-0.5 shrink-0 text-accent">
              <Icon.wrench size={22} />
            </span>
            <span>
              <span className="block text-[1.02rem] font-semibold transition-colors group-hover:text-accent-deep">
                {service.name}
              </span>
              <span className="mt-2 block text-[0.89rem] leading-relaxed text-ink-soft">{service.summary}</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* --- Technical resources --------------------------------------------------- */

export function ResourcesBlock({ resources }: { resources: TechnicalResource[] }) {
  return (
    <Section tone="paper">
      <SectionHead
        title="Technical documents"
        description="Catalogues, datasheets, manuals, certificates and CAD files, kept with the products they belong to."
        action={<ButtonLink href="/resources" variant="secondary" size="sm">Resource library</ButtonLink>}
      />
      <ResourceList resources={resources} />
    </Section>
  );
}

/* --- Partners -------------------------------------------------------------- */

export function PartnersBlock({ partners }: { partners: Partner[] }) {
  return (
    <Section tone="surface" spacing="tight">
      <SectionHead
        title="Partner brands"
        description="Manufacturing and technology partners whose ranges we represent and support locally."
        action={<ButtonLink href="/partners" variant="secondary" size="sm">All partners</ButtonLink>}
      />
      <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <div key={partner.slug} className="bg-surface p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[0.98rem]">{partner.name}</h3>
              <span className="shrink-0 text-2xs text-muted">{partner.country}</span>
            </div>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-soft">{partner.summary}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* --- News ------------------------------------------------------------------ */

export function NewsBlock({ articles }: { articles: Article[] }) {
  return (
    <Section tone="paper">
      <SectionHead
        title="News and case studies"
        description="Recent project work, product changes and company updates."
        action={<ButtonLink href="/news" variant="secondary" size="sm">All updates</ButtonLink>}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-accent"
          >
            <div className="relative aspect-16/9 bg-surface-sunk">
              {article.image ? (
                <Image
                  src={article.image.url}
                  alt={article.image.alt ?? article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-3">
                {article.category ? <Tag tone="accent">{article.category}</Tag> : null}
                <span className="text-2xs text-muted">{formatDate(article.publishedAt)}</span>
              </div>
              <h3 className="mt-3 text-[1.02rem] leading-snug transition-colors group-hover:text-accent-deep">
                {article.title}
              </h3>
              <p className="mt-2.5 line-clamp-3 text-[0.88rem] leading-relaxed text-ink-soft">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* --- Closing call to action ------------------------------------------------ */

export function ContactCta() {
  return (
    <Section tone="sunk" spacing="tight">
      <div className="flex flex-col items-start justify-between gap-7 rounded-sm border border-line bg-surface p-8 lg:flex-row lg:items-center lg:p-10">
        <div className="max-w-2xl">
          <h2 className="text-[1.6rem]">Send us the duty conditions</h2>
          <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-soft">
            Flow, head, liquid, temperature and line size are enough to start. You will get a selection with
            performance curves, NPSH margin and a material schedule your consultant can check.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <ButtonLink href="/contact" size="lg">
            Request a quotation
          </ButtonLink>
          <ButtonLink href="/resources" variant="secondary" size="lg">
            Browse documents
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
