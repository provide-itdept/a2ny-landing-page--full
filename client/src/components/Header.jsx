import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'
import { navGroups } from '../data/content'

export default function Header() {
  const [open, setOpen] = useState(false); const [active, setActive] = useState(null); const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><div className="container nav-wrap"><Logo /><nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation"><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>{navGroups.map(group => <div className={`nav-dropdown ${active === group.label ? 'is-active' : ''}`} key={group.label}><button aria-expanded={active === group.label} onClick={() => setActive(active === group.label ? null : group.label)}>{group.label}<ChevronDown size={15} /></button><div className="dropdown-menu">{group.links.map(link => <Link key={link.slug} to={link.slug} onClick={() => { setOpen(false); setActive(null) }}>{link.title}<ChevronDown size={14} /></Link>)}</div></div>)}<NavLink to="/industries" onClick={() => setOpen(false)}>Industries</NavLink><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink><NavLink to="/blog" onClick={() => setOpen(false)}>Resources</NavLink><NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink><Button to="/request-quote" onClick={() => setOpen(false)}>Get a quote <span>↗</span></Button></nav><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div></header>
}
