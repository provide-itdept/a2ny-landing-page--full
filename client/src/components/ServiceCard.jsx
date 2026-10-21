import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function ServiceCard({ service }) { const Icon = service.icon; return <Link className="service-card" to={`/services/${service.slug}`}><span className="icon-box"><Icon size={22} /></span><h3>{service.title}</h3><p>{service.description}</p><span className="card-link">Learn more <ArrowUpRight size={16} /></span></Link> }
