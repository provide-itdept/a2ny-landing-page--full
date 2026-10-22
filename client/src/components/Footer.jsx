import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  const whatsapp = import.meta.env.VITE_WHATSAPP_URL
  const messenger = import.meta.env.VITE_MESSENGER_URL
  return <footer className="site-footer"><div className="container footer-grid"><div><Logo full /><p className="footer-copy">Reliable IT solutions, network infrastructure, and computer support for businesses and individuals.</p></div><div><h3>Explore</h3><Link to="/services">Services</Link><Link to="/solutions/small-business-it">Business solutions</Link><Link to="/about">About A2NY</Link><Link to="/blog">Knowledge base</Link></div><div><h3>Start a conversation</h3><p>Tell us what you need help with and we’ll help you define the next step.</p><Link className="footer-link" to="/request-quote">Request a quotation →</Link>{whatsapp && <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}{messenger && <a href={messenger} target="_blank" rel="noreferrer">Messenger</a>}</div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} A2NY IT WORKS</span><span><Link to="/privacy-policy">Privacy</Link> · <Link to="/terms-of-service">Terms</Link></span></div></footer>
}
