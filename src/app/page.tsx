import { api } from '@/lib/api';
import { Hero } from '@/components/home/Hero';
import {
  Capabilities,
  ContactCta,
  FeaturedProducts,
  IndustriesBlock,
  NewsBlock,
  PartnersBlock,
  ProductFamilies,
  ResourcesBlock,
  ServicesBlock,
} from '@/components/home/HomeSections';

export default async function HomePage() {
  const home = await api.site.home();

  return (
    <>
      <Hero hero={home.hero} categories={home.featuredCategories} />
      <ProductFamilies categories={home.featuredCategories} />
      <FeaturedProducts products={home.featuredProducts} />
      <IndustriesBlock industries={home.industries} />
      <Capabilities blocks={home.capabilities} />
      <ServicesBlock services={home.services} />
      <ResourcesBlock resources={home.featuredResources} />
      <PartnersBlock partners={home.partners} />
      <NewsBlock articles={home.latestNews} />
      <ContactCta />
    </>
  );
}
