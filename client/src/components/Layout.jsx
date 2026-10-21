import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AnalyticsConsent from './AnalyticsConsent'
export default function Layout() { return <><Header /><main><Outlet /></main><Footer /><AnalyticsConsent /></> }
