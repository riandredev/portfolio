export default function HomepageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Riandre van der Voorden",
    jobTitle: "Software Engineer",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    sameAs: [
      "https://github.com/riandredev",
      "https://linkedin.com/in/riandre",
      "https://mastodon.social/@riandre", 
    ],
    description: "Full Stack Software Engineer specializing in React, Next.js, and modern web development",
    image: "/me.jpg",
    alumniOf: {
      "@type": "Organization",
      name: "CTU Training Solutions"
    },
    knowsAbout: [
      "Software Development",
      "React",
      "Next.js",
      "TypeScript",
      "Full Stack Development",
      "Web Development"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
