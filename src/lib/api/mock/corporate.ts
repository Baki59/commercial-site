import type { Article, ContentPage, Location, Partner, SiteSettings } from '@/types';

export const settings: SiteSettings = {
  companyName: 'Sazin Innovative Industries',
  legalName: 'Sazin Innovative Industries Ltd.',
  tagline: 'Industrial flow equipment, engineered and supported.',
  email: 'info@sazinindustries.com',
  phone: '+880 2 000 0000',
  whatsapp: '+8801000000000',
  addressLines: ['Head Office', 'Dhaka, Bangladesh'],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'YouTube', href: 'https://www.youtube.com' },
    { label: 'Facebook', href: 'https://www.facebook.com' },
  ],
  footerNote:
    'Product data is indicative and confirmed against project conditions before order. Specifications may change without notice.',
  defaultSeo: {
    title: 'Sazin Innovative Industries Ltd. — Industrial pumps, valves and flow equipment',
    description:
      'Manufacturer and supplier of industrial pumps, valves, strainers and fabricated pipework, with application engineering, commissioning and after-sales support.',
  },
  navigation: [
    {
      label: 'Products',
      href: '/products',
      mega: true,
      children: [
        { label: 'Pumps', href: '/categories/pumps', description: 'Centrifugal, multistage, submersible and split case' },
        { label: 'Valves', href: '/categories/valves', description: 'Gate, butterfly, check and control valves' },
        { label: 'Strainers & filtration', href: '/categories/strainers-filtration', description: 'Line strainers and basket filters' },
        { label: 'Pipes & fittings', href: '/categories/pipes-fittings', description: 'Flanged fittings and fabricated spools' },
        { label: 'All products', href: '/products', description: 'Browse the full catalogue' },
      ],
    },
    {
      label: 'Industries',
      href: '/industries',
      mega: true,
      children: [
        { label: 'Water & wastewater', href: '/industries/water-wastewater' },
        { label: 'Power generation', href: '/industries/power-generation' },
        { label: 'Textile & dyeing', href: '/industries/textile-dyeing' },
        { label: 'Food & beverage', href: '/industries/food-beverage' },
        { label: 'Building services', href: '/industries/building-services' },
        { label: 'Chemical & process', href: '/industries/chemical-process' },
      ],
    },
    {
      label: 'Solutions',
      href: '/solutions',
      children: [
        { label: 'All solutions', href: '/solutions' },
        { label: 'Applications', href: '/applications' },
      ],
    },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Application engineering', href: '/services/application-engineering-selection' },
        { label: 'Installation & commissioning', href: '/services/installation-commissioning' },
        { label: 'Maintenance & overhaul', href: '/services/maintenance-overhaul' },
        { label: 'Spare parts', href: '/services/spare-parts-inventory-support' },
      ],
    },
    { label: 'Engineering', href: '/resources' },
    {
      label: 'Company',
      href: '/company/about',
      children: [
        { label: 'About Sazin', href: '/company/about' },
        { label: 'Manufacturing', href: '/company/manufacturing' },
        { label: 'Quality', href: '/company/quality' },
        { label: 'Technology & R&D', href: '/company/technology' },
        { label: 'Sustainability', href: '/company/sustainability' },
        { label: 'Partners & brands', href: '/partners' },
        { label: 'Global presence', href: '/locations' },
        { label: 'Careers', href: '/careers' },
        { label: 'News & case studies', href: '/news' },
      ],
    },
  ],
};

export const partners: Partner[] = [
  { id: 'pa1', name: 'Nordflow Pumpen', slug: 'nordflow-pumpen', country: 'Germany', summary: 'Process pump hydraulics and engineered seal systems.', categories: ['Pumps'] },
  { id: 'pa2', name: 'Vantera Valves', slug: 'vantera-valves', country: 'Italy', summary: 'Butterfly and control valve manufacturing.', categories: ['Valves'] },
  { id: 'pa3', name: 'Kensho Fluid Systems', slug: 'kensho-fluid-systems', country: 'Japan', summary: 'Precision instrumentation and metering.', categories: ['Instrumentation'] },
  { id: 'pa4', name: 'Aureus Drives', slug: 'aureus-drives', country: 'Finland', summary: 'Variable-speed drives and motor control.', categories: ['Drives'] },
  { id: 'pa5', name: 'Halcyon Seal Technologies', slug: 'halcyon-seal-technologies', country: 'United Kingdom', summary: 'Mechanical seals and sealing support systems.', categories: ['Sealing'] },
  { id: 'pa6', name: 'Meridian Coatings', slug: 'meridian-coatings', country: 'Singapore', summary: 'Fusion-bonded epoxy and protective coating systems.', categories: ['Coatings'] },
];

export const locations: Location[] = [
  {
    id: 'l1',
    name: 'Head office',
    type: 'head-office',
    addressLines: ['Corporate Office', 'Dhaka 1212', 'Bangladesh'],
    city: 'Dhaka',
    country: 'Bangladesh',
    region: 'South Asia',
    phone: '+880 2 000 0000',
    email: 'info@sazinindustries.com',
    isPrimary: true,
  },
  {
    id: 'l2',
    name: 'Manufacturing & assembly facility',
    type: 'factory',
    addressLines: ['Industrial Area', 'Gazipur', 'Bangladesh'],
    city: 'Gazipur',
    country: 'Bangladesh',
    region: 'South Asia',
    phone: '+880 2 000 0001',
    email: 'works@sazinindustries.com',
  },
  {
    id: 'l3',
    name: 'Chattogram service centre',
    type: 'sales-office',
    addressLines: ['Agrabad Commercial Area', 'Chattogram', 'Bangladesh'],
    city: 'Chattogram',
    country: 'Bangladesh',
    region: 'South Asia',
    phone: '+880 31 000 000',
    email: 'ctg@sazinindustries.com',
  },
  {
    id: 'l4',
    name: 'Middle East representative office',
    type: 'partner',
    addressLines: ['Dubai', 'United Arab Emirates'],
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    email: 'mea@sazinindustries.com',
  },
  {
    id: 'l5',
    name: 'South East Asia partner',
    type: 'partner',
    addressLines: ['Kuala Lumpur', 'Malaysia'],
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    region: 'South East Asia',
    email: 'sea@sazinindustries.com',
  },
];

export const articles: Article[] = [
  {
    id: 'n1',
    title: 'Pressure management cuts distribution losses across a 14 km zone',
    slug: 'pressure-management-distribution-zone',
    excerpt:
      'A metering and pressure-reducing programme across one district lowered night-line pressure without affecting service, and measurably reduced background leakage.',
    body: 'The zone had been running at a single supply pressure set for the worst-case consumer at the far end of the network, which left every connection nearer the source permanently over-pressurised. Over-pressure drives background leakage through joints that would otherwise hold, and it shortens the life of domestic fittings.\n\nThe programme installed pressure-reducing stations at three zone inlets with night-time set-point reduction, together with bulk metering on each inlet. Service pressure at the critical point was maintained throughout, verified by loggers at the four most remote connections.\n\nThe result was a measurable fall in minimum night flow within the first two months, with no recorded increase in consumer complaints. The stations are hydraulically operated and require no external power, which keeps them working through supply interruptions.',
    category: 'Case study',
    tags: ['Water', 'Pressure management'],
    publishedAt: '2026-08-28',
    isFeatured: true,
    image: { id: 'n1', url: '/media/valve-gate.svg', alt: 'Pressure reducing station' },
  },
  {
    id: 'n2',
    title: 'Cooling water pump replacement completed inside a nine-day shutdown',
    slug: 'cooling-water-pump-replacement-shutdown',
    excerpt:
      'Two circulation pumps were re-rated to the plant\u2019s actual duty and replaced during a planned outage, with wet testing completed before restart.',
    body: 'The original pumps had been selected for a design flow the plant no longer ran. Measured operation sat well to the left of best efficiency, which showed up as recurring bearing and seal replacement.\n\nReplacement hydraulics were selected against measured duty rather than the original data sheet, with baseplates arranged to reuse the existing foundations and pipe centres. Spools were fabricated and coated in advance so the shutdown window contained only removal, setting, alignment and testing.\n\nBoth units were performance tested against the specified duty before the outage closed.',
    category: 'Case study',
    tags: ['Power', 'Cooling water'],
    publishedAt: '2026-07-15',
    image: { id: 'n2', url: '/media/pump-centrifugal.svg', alt: 'Cooling water pumps' },
  },
  {
    id: 'n3',
    title: 'SIN-VM range extended to 40 bar discharge',
    slug: 'sin-vm-range-extended',
    excerpt:
      'Additional stage configurations take the vertical multistage range to 40 bar, covering high-rise boosting and RO feed duties previously outside the range.',
    body: 'The extension adds stage configurations at the upper end of the SIN-VM range, with revised thrust bearing and cartridge seal selections. Updated performance curves and dimensional drawings are available in the engineering resource library.',
    category: 'Product news',
    tags: ['Pumps', 'Product update'],
    publishedAt: '2026-06-09',
    image: { id: 'n3', url: '/media/pump-vertical.svg', alt: 'SIN-VM range' },
  },
  {
    id: 'n4',
    title: 'Textile mill effluent transfer rebuilt around material selection',
    slug: 'textile-effluent-transfer-rebuild',
    excerpt:
      'Repeat failures on an ETP transfer line were traced to elastomer selection rather than hydraulic sizing.',
    body: 'Transfer pumps on the effluent line were being rebuilt every few months. Sampling showed the actual liquid chemistry sat outside the elastomer rating originally supplied, although hydraulic sizing was correct.\n\nSeal faces and elastomers were re-specified against the measured chemistry, and a strainer with a selected perforation was added upstream. The circuit has since run through a full season without an unplanned rebuild.',
    category: 'Case study',
    tags: ['Textile', 'Materials'],
    publishedAt: '2026-05-02',
    image: { id: 'n4', url: '/media/strainer.svg', alt: 'Effluent transfer' },
  },
  {
    id: 'n5',
    title: 'Quality management certification renewed',
    slug: 'quality-management-certification-renewed',
    excerpt: 'Certification covering manufacture, assembly and supply of flow-control equipment has been renewed following surveillance audit.',
    body: 'The renewed certificate covers manufacture, assembly and supply of industrial flow-control equipment, and is available for download from the engineering resource library.',
    category: 'Company news',
    tags: ['Quality'],
    publishedAt: '2026-02-11',
    image: { id: 'n5', url: '/media/fitting.svg', alt: 'Quality certification' },
  },
  {
    id: 'n6',
    title: 'Spare parts stocking programme extended to Chattogram',
    slug: 'spare-parts-stocking-chattogram',
    excerpt: 'Critical wear parts for the installed base in the port region are now held locally, removing import lead time from breakdown response.',
    body: 'Stock levels were set from the installed equipment base in the region rather than from catalogue coverage, concentrating on seals, bearings, wear rings and valve seat kits.',
    category: 'Company news',
    tags: ['Service'],
    publishedAt: '2026-01-19',
    image: { id: 'n6', url: '/media/valve-butterfly.svg', alt: 'Spare parts' },
  },
];

export const pages: ContentPage[] = [
  {
    id: 'pg1',
    title: 'About Sazin',
    slug: 'about',
    subtitle: 'An engineering supplier built around what happens after delivery.',
    body: 'Sazin Innovative Industries Ltd. supplies pumps, valves, strainers and fabricated pipework to water utilities, power plants, textile mills, food processors and commercial developments. We work from duty conditions rather than part numbers: selections are prepared against project data, reviewed with the consultant or plant engineer, and supported through installation and the working life of the equipment.',
    sections: [
      {
        title: 'What we do',
        body: 'Three activities sit behind every order: selecting the right equipment for the duty, supplying it with the documentation the project requires, and keeping it running once it is installed.',
        bullets: [
          'Application engineering and equipment selection against measured or specified duty',
          'Manufacture, assembly and testing of pump sets and packaged systems',
          'Supply of valves, strainers, fittings and fabricated spools to project standards',
          'Installation supervision, commissioning and documented performance verification',
          'Maintenance, overhaul and locally held spare parts',
        ],
      },
      {
        title: 'How we work',
        body: 'Every offer states the assumptions it rests on. If duty data is incomplete we say so rather than filling gaps with defaults, because an equipment schedule built on an assumed duty point becomes someone else\u2019s maintenance problem two years later.',
      },
    ],
    seo: { title: 'About Sazin Innovative Industries Ltd.', description: 'Industrial flow equipment supplier and manufacturer serving water, power, textile, food and building services sectors.' },
  },
  {
    id: 'pg2',
    title: 'Manufacturing',
    slug: 'manufacturing',
    subtitle: 'Assembly, fabrication and testing under one roof.',
    body: 'Our facility covers pump set assembly, pipework fabrication, surface preparation and coating, and performance testing. Work is carried out against approved drawings with dimensional inspection recorded at each stage.',
    sections: [
      {
        title: 'Capability',
        bullets: [
          'Pump set and packaged system assembly on fabricated baseplates',
          'Carbon and stainless steel pipe fabrication, DN 25 to DN 1200',
          'Qualified welding procedures with welder qualification records',
          'Surface preparation and protective coating to project specification',
          'Hydrostatic and performance testing with witnessed test options',
        ],
      },
      {
        title: 'Testing',
        body: 'Packaged sets are wet tested before despatch. Where the specification requires it, testing is witnessed by the client or a nominated third-party inspector, and the signed test record travels with the equipment.',
      },
    ],
  },
  {
    id: 'pg3',
    title: 'Quality',
    slug: 'quality',
    subtitle: 'Documentation prepared from the order stage, not at handover.',
    body: 'Quality on an engineering supply contract is mostly a documentation problem. Material traceability, welding records, inspection reports and test certificates are assembled as the work proceeds so the handover pack is complete on the day the equipment ships.',
    sections: [
      {
        title: 'Quality management',
        bullets: [
          'Certified quality management system covering manufacture, assembly and supply',
          'Mill test certificates and material traceability on fabricated items',
          'Documented inspection and test plans agreed before production',
          'Third-party and client-witnessed inspection accommodated',
          'Non-conformance recording with documented disposition',
        ],
      },
      {
        title: 'Standards we work to',
        body: 'Products are offered against recognised international standards including EN 733, EN 593, EN 1074, ISO 9906, ISO 5208, ASME B16.5 and ASME B31.3. The governing standard for each item is stated on its product page.',
      },
    ],
  },
  {
    id: 'pg4',
    title: 'Technology & R&D',
    slug: 'technology',
    subtitle: 'Selection work, hydraulic analysis and continuous product development.',
    body: 'Engineering effort concentrates where it changes outcomes: hydraulic selection against real system curves, NPSH margin analysis, material selection for the actual process chemistry, and energy assessment of existing installations.',
    sections: [
      {
        title: 'Engineering capability',
        bullets: [
          'System curve development and duty point verification',
          'NPSH available versus required analysis',
          'Material and elastomer selection against process chemistry',
          'Variable-speed control strategy and staging design',
          'Energy assessment of installed pumping systems',
        ],
      },
    ],
  },
  {
    id: 'pg5',
    title: 'Sustainability',
    slug: 'sustainability',
    subtitle: 'Most of the impact sits in the energy the equipment consumes after it is installed.',
    body: 'Pumping accounts for a large share of industrial electricity use, and the majority of a pump\u2019s lifetime cost is the energy it consumes rather than its purchase price. Selecting close to the best efficiency point, sizing for the real duty profile and controlling speed rather than throttling are the practical levers.',
    sections: [
      {
        title: 'Where we focus',
        bullets: [
          'Selection close to best efficiency point rather than oversizing with a safety margin',
          'Variable-speed control instead of permanent throttling',
          'Energy audits that quantify the recoverable margin on existing systems',
          'Repair and overhaul as a first option ahead of replacement',
          'Responsible handling of coatings, lubricants and packaging at our facility',
        ],
      },
    ],
  },
  {
    id: 'pg6',
    title: 'Careers',
    slug: 'careers',
    subtitle: 'Engineering, service and commercial roles.',
    body: 'We hire mechanical and electrical engineers, service technicians, fabrication and quality staff, and commercial teams. If your background fits the work described across this site, send a CV and a short note about the kind of work you want to be doing.',
    sections: [
      {
        title: 'What to send',
        bullets: [
          'A CV with the equipment and sectors you have worked on',
          'The role or discipline you are applying for',
          'Your notice period and current location',
        ],
      },
    ],
  },
];
