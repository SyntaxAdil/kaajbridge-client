export default function robots() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaajbridge.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/my-jobs/", "/my-companies/", "/saved/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}