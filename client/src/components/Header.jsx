import { tw } from "../tw"
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'
import { navGroups } from '../data/content'


export default function Header() {
  const location = useLocation()
  const [desktop, setDesktop] = useState(false)
  useEffect(() => { const query = window.matchMedia('(min-width:701px)'); const sync = () => setDesktop(query.matches); sync(); query.addEventListener('change', sync); return () => query.removeEventListener('change', sync) }, [])
  const menuToggleRef = useRef(null)
  const activeTriggerRef = useRef(null)
  const [hovered, setHovered] = useState(null); const [open, setOpen] = useState(false); const [active, setActive] = useState(null); const [scrolled, setScrolled] = useState(false); const [hoverSuppressed, setHoverSuppressed] = useState(null)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => {
    setOpen(false); setActive(null); setHovered(null); setHoverSuppressed(null)
    document.body.style.overflow = ''
  }, [location.key, location.pathname])
  useEffect(() => { if (desktop) { setOpen(false); setActive(null); setHovered(null); setHoverSuppressed(null) } }, [desktop])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  useEffect(() => { const onKeyDown = event => { if (event.key !== "Escape" || (!open && active === null && hovered === null)) return; event.preventDefault(); setActive(null); setHoverSuppressed(active || hovered); if (open) { setOpen(false); menuToggleRef.current?.focus() } else { activeTriggerRef.current?.focus() } }; document.addEventListener("keydown", onKeyDown); return () => document.removeEventListener("keydown", onKeyDown) }, [active, hovered, open])
  return <header className={tw(`site-header ${scrolled ? 'is-scrolled' : ''}`)}><div className={tw("container nav-wrap")}><Logo /><nav id="main-navigation" className={tw(`main-nav ${open ? 'is-open' : 'is-closed'}`)} aria-label="Main navigation"><NavLink className={({ isActive }) => isActive ? "active text-[#0e78c7]" : ""} to="/" end onClick={() => setOpen(false)}>Home</NavLink>{navGroups.map(group => { const isActive = active === group.label; const isExpanded = isActive || (desktop && hovered === group.label && hoverSuppressed !== group.label); const menuId = `menu-${group.label.toLowerCase().replace(/\W+/g, '-')}`; return <div className={tw(`nav-dropdown ${isActive ? 'is-active' : ''} ${hoverSuppressed === group.label ? 'is-hover-suppressed' : ''}`)} key={group.label} onBlur={event => { if (!desktop || event.currentTarget.contains(event.relatedTarget)) return; setActive(null); if (hovered === group.label) setHoverSuppressed(group.label) }} onMouseEnter={event => { if (desktop && active !== group.label) setActive(null); setHovered(group.label); activeTriggerRef.current = event.currentTarget.querySelector('button') }} onMouseLeave={() => { setHovered(null); setHoverSuppressed(null) }}><button aria-expanded={isExpanded} aria-controls={menuId} onClick={event => { activeTriggerRef.current = event.currentTarget; setHoverSuppressed(null); setActive(isActive ? null : group.label) }}>{group.label}<ChevronDown aria-hidden="true" focusable="false" size={15} /></button><div id={menuId} className={tw(`dropdown-menu ${isExpanded ? 'is-visible' : 'is-hidden'}`)}>{group.links.map(link => <NavLink className={({ isActive }) => isActive ? "active text-[#0e78c7]" : ""} end key={link.slug} to={link.slug} onClick={() => { setOpen(false); setActive(null) }} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); event.currentTarget.click() } }}>{link.title}<ChevronDown aria-hidden="true" focusable="false" size={14} /></NavLink>)}</div></div>})}<NavLink className={({ isActive }) => isActive ? "active text-[#0e78c7]" : ""} to="/industries" onClick={() => setOpen(false)}>Industries</NavLink><NavLink className={({ isActive }) => isActive ? "active text-[#0e78c7]" : ""} to="/portfolio" onClick={() => setOpen(false)}>Work</NavLink><NavLink className={({ isActive }) => isActive ? "active text-[#0e78c7]" : ""} to="/about" onClick={() => setOpen(false)}>About</NavLink><NavLink className={({ isActive }) => isActive ? "active text-[#0e78c7]" : ""} to="/blog" onClick={() => setOpen(false)}>Insights</NavLink><NavLink className={({ isActive }) => isActive ? "active text-[#0e78c7]" : ""} to="/contact" onClick={() => setOpen(false)}>Contact</NavLink><Button to="/request-quote" onClick={() => setOpen(false)}>Start a conversation <span>↗</span></Button></nav><button ref={menuToggleRef} className={tw("menu-toggle")} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation">{open ? <X aria-hidden="true" focusable="false" /> : <Menu aria-hidden="true" focusable="false" />}</button></div></header>
}
