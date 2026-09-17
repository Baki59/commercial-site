import type { SpecGroup } from '@/types';
import { specValue } from '@/lib/utils';

/** Grouped technical specifications. Values are right-aligned and tabular so
    figures line up down the column the way they do on a datasheet. */
export function SpecTable({ groups }: { groups: SpecGroup[] }) {
  if (!groups.length) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-10">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-3 text-[1.02rem]">{group.title}</h3>
          <div className="overflow-hidden rounded-sm border border-line">
            <table className="w-full border-collapse text-[0.9rem]">
              <caption className="sr-only">{group.title}</caption>
              <tbody>
                {group.items.map((item, index) => (
                  <tr key={item.label} className={index % 2 ? 'bg-surface' : 'bg-surface-sunk/55'}>
                    <th scope="row" className="w-[55%] px-4 py-2.5 text-left font-normal text-ink-soft">
                      {item.label}
                    </th>
                    <td className="px-4 py-2.5 text-right font-medium text-ink">{specValue(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
