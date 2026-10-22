import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AnalyticsConsent from './AnalyticsConsent'
export default function Layout() { return <><a className="skip-link" href="#main-content">Skip to main content</a><Header /><main id="main-content" tabIndex={-1}><Outlet /></main><Footer /><AnalyticsConsent /></> }
