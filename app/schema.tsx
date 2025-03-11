export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Clera",
          "url": "https://askclera.com",
          "logo": "https://askclera.com/clera-circle.png",
          "description": "Clera delivers personalized, Wall Street-level investment advice and management powered by AI.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "sameAs": [
            // Add your social media profiles here when available
          ],
          "offers": {
            "@type": "Offer",
            "description": "AI-powered financial advice at an affordable monthly price"
          },
          "serviceType": [
            "Financial Advisory",
            "Investment Management",
            "Portfolio Optimization",
            "Financial Planning"
          ]
        })
      }}
    />
  );
} 