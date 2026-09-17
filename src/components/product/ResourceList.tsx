import type { TechnicalResource } from '@/types';
import { formatDate, Icon, RESOURCE_LABELS } from '@/lib/utils';

export function ResourceRow({ resource }: { resource: TechnicalResource }) {
  return (
    <a
      href={resource.fileUrl}
      download
      className="group flex items-start gap-4 border-b border-line px-4 py-4 transition-colors last:border-b-0 hover:bg-accent-wash/50"
    >
      <span className="mt-0.5 shrink-0 text-signal">
        <Icon.document size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.95rem] text-ink transition-colors group-hover:text-accent-deep">
          {resource.title}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-muted">
          <span>{RESOURCE_LABELS[resource.type]}</span>
          {resource.fileFormat ? <span>{resource.fileFormat}</span> : null}
          {resource.fileSize ? <span>{resource.fileSize}</span> : null}
          {resource.revision ? <span>{resource.revision}</span> : null}
          {resource.updatedAt ? <span>Updated {formatDate(resource.updatedAt)}</span> : null}
        </span>
        {resource.description ? (
          <span className="mt-1.5 block text-[0.85rem] leading-relaxed text-ink-soft">{resource.description}</span>
        ) : null}
      </span>
      <span className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-accent">
        <Icon.download size={18} />
      </span>
    </a>
  );
}

export function ResourceList({ resources }: { resources: TechnicalResource[] }) {
  if (!resources.length) return null;
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-surface">
      {resources.map((resource) => (
        <ResourceRow key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
