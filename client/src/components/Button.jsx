import { Link } from 'react-router-dom'
export default function Button({ children, to, variant = 'primary', type = 'button', ...props }) { const className = `button button-${variant}`; return to ? <Link className={className} to={to} {...props}>{children}</Link> : <button type={type} className={className} {...props}>{children}</button> }
