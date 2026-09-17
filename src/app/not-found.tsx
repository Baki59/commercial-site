import { Container, ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="max-w-xl">
        <p className="font-[family-name:var(--font-mono)] text-[0.85rem] text-muted">404</p>
        <h1 className="mt-4 text-[2.2rem] sm:text-[2.8rem]">This page is not here</h1>
        <p className="mt-4 text-ink-soft">
          The address may have changed, or the product record may have been withdrawn. Search the catalogue or start
          from a product family.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products">Browse the catalogue</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Ask us to find it
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
