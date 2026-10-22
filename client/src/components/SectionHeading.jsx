import { tw } from "../tw"
export default function SectionHeading({ eyebrow, title, text, align = 'left' }) { return <div className={tw(`section-heading ${align === 'center' ? 'center' : ''}`)}><span className={tw("eyebrow")}>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }
