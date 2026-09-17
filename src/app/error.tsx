'use client';

import { Button, ButtonLink, Container } from '@/components/ui';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="py-24 sm:py-32">
      <div className="max-w-xl">
        <h1 className="text-[2rem] sm:text-[2.5rem]">This page did not load</h1>
        <p className="mt-4 text-ink-soft">
          The content could not be retrieved. Try again, and if it keeps happening, contact us and we will send the
          information directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
