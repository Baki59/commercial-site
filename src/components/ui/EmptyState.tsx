import type { ReactNode } from 'react';

/** An empty screen is an invitation to act, so it always offers a next step. */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-sm border border-dashed border-line-strong bg-surface px-6 py-14 text-center">
      <h3 className="text-lg">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-[0.94rem] text-ink-soft">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
