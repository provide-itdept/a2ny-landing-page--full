import { tw } from "../tw"
import { Link } from 'react-router-dom'
export default function Logo({ full = false }) { return <Link to="/" className={tw(`logo ${full ? 'logo-full' : 'logo-compact'}`)} aria-label="A2NY IT WORKS home">{full ? <span className={tw("logo-lockup")}><img src="/a2ny-logo-premium.png" alt="A2NY IT Services and Consulting" /></span> : <><span className={tw("logo-mark")} aria-hidden="true"><b>A</b><i>2</i></span><span className={tw("logo-name")}>A2NY <b>IT WORKS</b></span></>}</Link> }
