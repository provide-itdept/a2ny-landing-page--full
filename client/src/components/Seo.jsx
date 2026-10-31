import { Helmet } from 'react-helmet-async'
export default function Seo({ title, description, path = '', noIndex = false }) {
  const url = `https://a2nyitworks.com${path}`
  const image = 'https://a2nyitworks.com/a2ny-logo-premium.png'
  return <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
    <meta name="author" content="A2NY IT WORKS" />
    <link rel="canonical" href={url} />
    <meta property="og:site_name" content="A2NY IT WORKS" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
}
