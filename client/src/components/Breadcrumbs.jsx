import { Link } from 'react-router-dom'
export default function Breadcrumbs({ items = [] }) { return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link>{items.map((item) => <span key={item.href || item.label}> / {item.href ? <Link to={item.href}>{item.label}</Link> : item.label}</span>)}</nav> }
