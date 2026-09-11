import { headers } from 'next/headers';

type StructuredDataProps = {
  seo?: {
    __typename: 'PagesSeo';
    title?: string | null;
    description?: string | null;
    canonicalUrl?: string | null;
    ogImage?: string | null;
    schemaJson?: string | null;
  } | null;
  fallbackUrl?: string;
};

export default async function StructuredData({ seo, fallbackUrl }: StructuredDataProps) {
  const host = (await headers()).get('host') || 'sbomarchi.us';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const currentBaseUrl = `${protocol}://${host}`;

  let schema;

  const fallbackSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': seo?.title || 'SBOM Archi',
    'description': seo?.description || 'SBOM Risk Management Platform',
    'url': seo?.canonicalUrl || `${currentBaseUrl}${fallbackUrl || ''}` || currentBaseUrl,
  };

  try {
    if (seo?.schemaJson) {
      const parsed = JSON.parse(seo.schemaJson);
      const stringified = JSON.stringify(parsed).replaceAll('https://sbomarchi.us', currentBaseUrl);
      schema = JSON.parse(stringified);
    } else {
      schema = fallbackSchema;
    }
  } catch {
    schema = fallbackSchema;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}