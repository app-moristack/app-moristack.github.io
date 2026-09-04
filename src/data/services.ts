import type { LucideIcon } from 'lucide-react'
import {
  CalendarCheck,
  LayoutDashboard,
  LifeBuoy,
  Monitor,
  RefreshCw,
  UtensilsCrossed,
} from 'lucide-react'

export type ServiceAccent = 'turquoise' | 'cyan' | 'coral'

export type Service = {
  readonly slug: string
  readonly title: string
  readonly icon: LucideIcon
  readonly summary: string
  readonly audience: string
  readonly problem: string
  readonly includes: readonly string[]
  readonly benefits: readonly string[]
  readonly cta: string
  readonly accent: ServiceAccent
}

export const services: readonly Service[] = [
  {
    slug: 'business-websites',
    title: 'Business Websites',
    icon: Monitor,
    summary:
      'A fast, credible website that explains what you do and turns visitors into enquiries.',
    audience:
      'Companies, professionals and service providers who need a presence customers take seriously.',
    problem:
      'Prospects search for you, find nothing convincing, and go to a competitor instead. An outdated or missing website quietly costs you work every week.',
    includes: [
      'Company and service websites',
      'Professional portfolios',
      'Landing pages for a single offer',
      'Service showcases with a clear structure',
      'Multi-page websites with room to grow',
    ],
    benefits: [
      'Look established to first-time visitors',
      'Answer the questions customers actually ask',
      'Receive enquiries from your website, not only word of mouth',
      'Load quickly on mobile data',
    ],
    cta: 'Get a quote for your website',
    accent: 'turquoise',
  },
  {
    slug: 'web-applications',
    title: 'Custom Web Applications',
    icon: LayoutDashboard,
    summary:
      'Software shaped around how your business already works, replacing scattered files and manual steps.',
    audience:
      'Businesses running on spreadsheets, paper forms and message threads that have outgrown them.',
    problem:
      'Information lives in five places, only one person knows where, and every report is rebuilt by hand. Mistakes are found late and cost real money.',
    includes: [
      'Management systems for day-to-day operations',
      'Internal dashboards and reporting tools',
      'Customer portals',
      'Staff portals',
      'Workflow automation for repetitive steps',
    ],
    benefits: [
      'One source of truth instead of many versions',
      'Fewer manual errors and less re-keying',
      'Reports on demand, not after an afternoon of work',
      'Access from the office, from home or from a phone',
    ],
    cta: 'Discuss your web application',
    accent: 'cyan',
  },
  {
    slug: 'restaurant-websites',
    title: 'Restaurant Websites & Digital Menus',
    icon: UtensilsCrossed,
    summary:
      'A menu that reads perfectly on a phone, plus hours, location and contact details that stay current.',
    audience: 'Restaurants, cafes, takeaways and food businesses with one or several outlets.',
    problem:
      'Customers find a PDF menu they have to pinch-zoom, opening hours from two years ago, and no easy way to call or book.',
    includes: [
      'Brand presentation that matches your dining room',
      'Digital menus with categories, prices and dietary notes',
      'Multiple outlet information',
      'Opening hours, including holiday changes',
      'Map and directions',
      'Contact and reservation links',
      'Mobile-friendly menu navigation',
      'Pre-order enquiry options',
      'Social media integration',
    ],
    benefits: [
      'Update the menu without reprinting a PDF',
      'Fewer phone calls asking whether you are open',
      'Customers arrive already knowing what they want',
      'A presence that reflects the quality of the food',
    ],
    cta: 'Show my restaurant online',
    accent: 'coral',
  },
  {
    slug: 'booking-systems',
    title: 'Booking & Appointment Systems',
    icon: CalendarCheck,
    summary:
      'Let customers request appointments online, and stop losing bookings written on a notepad.',
    audience:
      'Clinics, salons, studios, consultants, tradespeople and anyone whose day is a schedule.',
    problem:
      'Bookings arrive by call, message and walk-in. Double-bookings happen, no-shows go unrecorded, and nobody can see the real picture of next week.',
    includes: [
      'Appointment requests submitted online',
      'Availability displays',
      'Service and duration selection',
      'Customer information collection',
      'Confirmation workflows and reminders',
    ],
    benefits: [
      'Take bookings outside opening hours',
      'One shared calendar the whole team can see',
      'Fewer double-bookings and forgotten slots',
      'A record of who booked what, and when',
    ],
    cta: 'Plan a booking platform',
    accent: 'turquoise',
  },
  {
    slug: 'management-systems',
    title: 'Business Management Systems',
    icon: LifeBuoy,
    summary:
      'Stock, clients, jobs, staff and reporting in one place, built for how your business actually operates.',
    audience: 'Small and medium businesses whose processes do not fit an off-the-shelf product.',
    problem:
      'Generic software forces you to change how you work, or you bend spreadsheets until they break. Neither gives you a reliable view of the business.',
    includes: [
      'Client and supplier records',
      'Stock, job or project tracking',
      'Staff access with the right permissions per role',
      'Document and history trails',
      'Reports that answer your specific questions',
    ],
    benefits: [
      'Software that matches your process, not the reverse',
      'Decisions based on current numbers',
      'Less time spent chasing information internally',
      'A system that can grow with new requirements',
    ],
    cta: 'Scope a management system',
    accent: 'cyan',
  },
  {
    slug: 'redesign-maintenance',
    title: 'Website Redesign & Maintenance',
    icon: RefreshCw,
    summary:
      'Modernise a site that still works but no longer represents you, then keep it healthy after launch.',
    audience:
      'Businesses with an existing website that feels dated, is slow, or is hard to use on a phone.',
    problem:
      'The site was fine when it was built. Now it is slow, awkward on mobile, and nobody remembers how to change the text on the homepage.',
    includes: [
      'Modernising outdated interfaces',
      'Improving mobile usability',
      'Improving loading speed',
      'Reorganising content around what visitors look for',
      'Refreshing the visual identity',
      'Content updates and bug fixes after launch',
      'Ongoing performance and interface improvements',
      'New features as the business changes',
    ],
    benefits: [
      'Keep what works, fix what does not',
      'A site that is quick on a mobile connection',
      'Content that can be updated without a rebuild',
      'A developer who still answers after go-live',
    ],
    cta: 'Refresh my website',
    accent: 'coral',
  },
]

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug)
