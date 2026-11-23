import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ittoai.in';
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/', '/admin/', '/app/', '/employer/', '/dashboard/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}