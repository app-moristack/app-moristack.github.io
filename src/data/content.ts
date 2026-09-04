import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Blocks,
  Building2,
  Clock,
  Code2,
  Compass,
  Database,
  Gauge,
  Globe2,
  MapPin,
  MessageSquare,
  PenTool,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TestTube2,
  Wallet,
  Wrench,
  Zap,
} from 'lucide-react'

export type Benefit = { readonly icon: LucideIcon; readonly title: string; readonly body: string }

export const problemBenefits: readonly Benefit[] = [
  {
    icon: Clock,
    title: 'Save time',
    body: 'Stop re-typing the same information into three different files every week.',
  },
  {
    icon: ShieldCheck,
    title: 'Reduce errors',
    body: 'Validation and a single record per customer remove the copy-paste mistakes.',
  },
  {
    icon: Database,
    title: 'Centralise information',
    body: 'One place your whole team reads from, instead of a folder nobody trusts.',
  },
  {
    icon: Globe2,
    title: 'Access it anywhere',
    body: 'Open the system from the office, from home or from a phone on site.',
  },
  {
    icon: Sparkles,
    title: 'Improve customer experience',
    body: 'Answer questions in seconds because the information is where you expect it.',
  },
  {
    icon: Zap,
    title: 'Automate repetitive tasks',
    body: 'Reminders, status changes and recurring documents handled without you.',
  },
  {
    icon: BarChart3,
    title: 'Decide with real reports',
    body: 'See what is actually happening this month, not an estimate from memory.',
  },
]

export type ComparisonRow = { readonly before: string; readonly after: string }

export const manualVsSystem: readonly ComparisonRow[] = [
  {
    before: 'Customer details across three spreadsheets',
    after: 'One customer record, updated once',
  },
  { before: 'Bookings on a paper notepad', after: 'A shared calendar the team can see' },
  { before: 'Monthly report rebuilt by hand', after: 'Reports generated from live data' },
  { before: 'Approvals lost in message threads', after: 'A visible status and history per job' },
  { before: 'Only one person knows the process', after: 'The process is in the system' },
]

export const restaurantFeatures: readonly string[] = [
  'Restaurant identity and photography',
  'Digital menu showcase',
  'Multiple outlet information',
  'Opening hours',
  'Location and directions',
  'Mobile-friendly navigation',
  'Contact and reservation links',
  'Pre-order enquiry options',
  'Social media integration',
]

export const whyChooseUs: readonly Benefit[] = [
  {
    icon: Compass,
    title: 'Tailored to your business',
    body: 'We start from how you work today, then build software around it.',
  },
  {
    icon: Smartphone,
    title: 'Modern, fully responsive',
    body: 'Designed for a phone first, then scaled up to tablet and desktop.',
  },
  {
    icon: Code2,
    title: 'React and Vue.js expertise',
    body: 'Current frameworks, used properly, so the result stays fast and maintainable.',
  },
  {
    icon: MessageSquare,
    title: 'Direct communication',
    body: 'You talk to the developer building it, not to an account manager.',
  },
  {
    icon: Wallet,
    title: 'Competitive pricing',
    body: 'A clear quote up front, with the scope written down before work starts.',
  },
  {
    icon: Gauge,
    title: 'Fast, transparent delivery',
    body: 'Agreed milestones and something you can click on early in the project.',
  },
  {
    icon: Blocks,
    title: 'Clean, maintainable code',
    body: 'Typed, tested and documented, so the next change is not a rewrite.',
  },
  {
    icon: Wrench,
    title: 'Support after launch',
    body: 'Launch day is the start of the relationship, not the end of it.',
  },
  {
    icon: MapPin,
    title: 'Local service in Mauritius',
    body: 'Same time zone, same context, and a real conversation when you need one.',
  },
]

export type ProcessStep = {
  readonly step: number
  readonly title: string
  readonly icon: LucideIcon
  readonly body: string
}

export const processSteps: readonly ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery',
    icon: Compass,
    body: 'We talk through what your business does, where the friction is, and what success would look like.',
  },
  {
    step: 2,
    title: 'Planning',
    icon: PenTool,
    body: 'Scope, structure and a written quote, so you know what is being built before anything starts.',
  },
  {
    step: 3,
    title: 'Design',
    icon: Sparkles,
    body: 'Interface and content designed mobile-first, reviewed with you before development.',
  },
  {
    step: 4,
    title: 'Development & Testing',
    icon: TestTube2,
    body: 'Built in visible increments, with automated tests and checks on real devices.',
  },
  {
    step: 5,
    title: 'Launch & Support',
    icon: Rocket,
    body: 'Deployment, a walkthrough for your team, and continued support once you are live.',
  },
]

export type Technology = {
  readonly name: string
  readonly icon: LucideIcon
  readonly body: string
}

export const technologies: readonly Technology[] = [
  {
    name: 'React',
    icon: Code2,
    body: 'Interfaces that respond instantly, used for dashboards, portals and content-rich sites.',
  },
  {
    name: 'Vue.js',
    icon: Blocks,
    body: 'A pragmatic framework for management screens and interactive business tools.',
  },
  {
    name: 'TypeScript',
    icon: ShieldCheck,
    body: 'Types catch whole categories of bugs before your users ever see them.',
  },
  {
    name: 'JavaScript',
    icon: Zap,
    body: 'The language of the browser, behind every interaction on a modern site.',
  },
  {
    name: 'Tailwind CSS',
    icon: PenTool,
    body: 'A consistent design system that keeps every screen visually coherent.',
  },
  {
    name: 'Three.js',
    icon: Sparkles,
    body: 'Restrained 3D and motion where it adds meaning rather than noise.',
  },
  {
    name: 'Laravel',
    icon: Server,
    body: 'A dependable backend for client applications that need accounts, data and business rules.',
  },
]

export const technologyBenefits: readonly string[] = [
  'Fast user experiences on mobile connections',
  'Responsive interfaces from 320px upwards',
  'Maintainable applications that survive a change of requirement',
  'Scalable architecture as your data and team grow',
  'Modern interactive design that still loads quickly',
]

export type AboutPoint = {
  readonly icon: LucideIcon
  readonly title: string
  readonly body: string
}

export const aboutPoints: readonly AboutPoint[] = [
  {
    icon: MessageSquare,
    title: 'Personal and direct',
    body: 'You deal with the person writing the code. Nothing is lost in a hand-off.',
  },
  {
    icon: Compass,
    title: 'Business before code',
    body: 'We understand how your business runs before proposing what to build.',
  },
  {
    icon: Code2,
    title: 'Modern development',
    body: 'React and Vue.js applications built to current professional standards.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-first design',
    body: 'Most of your visitors are on a phone, so that is where design starts.',
  },
  {
    icon: ShieldCheck,
    title: 'Engineering standards',
    body: 'Typed code, automated tests, code review and accessible interfaces.',
  },
  {
    icon: Building2,
    title: 'Support throughout',
    body: 'Regular updates during the project and help after you go live.',
  },
]
