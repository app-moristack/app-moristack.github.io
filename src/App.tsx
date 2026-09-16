import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { usePageIdentity } from '@/hooks/usePageIdentity'

const HomePage = lazy(() => import('@/pages/HomePage'))
const MoriStackPage = lazy(() => import('@/pages/MoriStackPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const WorkPage = lazy(() => import('@/pages/WorkPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function LandingPage() {
  const { launcher } = usePageIdentity()
  return launcher ? <MoriStackPage /> : <HomePage />
}

export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="moristack" element={<MoriStackPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
