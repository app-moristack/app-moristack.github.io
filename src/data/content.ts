import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Blocks,
  Bot,
  Building2,
  Clock,
  Code2,
  Compass,
  Container,
  Database,
  Globe2,
  MapPin,
  PenTool,
  Rocket,
  Server,
  Share2,
  ShieldCheck,
  Signal,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  TestTube2,
  Users,
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
    title: 'The problem comes first',
    body: 'We spend the early time on what is actually broken. The feature list is an output of that, not the input.',
  },
  {
    icon: PenTool,
    title: 'Designed, then built',
    body: 'Structure and screens are decided before development, so the build is execution rather than exploration.',
  },
  {
    icon: Blocks,
    title: 'Architecture that scales',
    body: 'Modular systems with clear boundaries — the same foundations we rely on for our own platforms.',
  },
  {
    icon: Code2,
    title: 'Clean, typed code',
    body: 'Readable, typed and reviewed, so the next change is an afternoon rather than a rewrite.',
  },
  {
    icon: TestTube2,
    title: 'Tested before you see it',
    body: 'Automated tests and checks on real devices, because finding it after launch costs far more.',
  },
  {
    icon: Rocket,
    title: 'Deployed properly',
    body: 'Reproducible environments and a release process, not a folder uploaded over FTP on a Friday.',
  },
  {
    icon: Bot,
    title: 'AI for speed, engineering for judgement',
    body: 'We use AI to move faster through the mechanical work. The architecture, the trade-offs and the review stay human.',
  },
  {
    icon: Wrench,
    title: 'Built to be maintained',
    body: 'Documented and structured so a year from now the system can still be extended by someone new.',
  },
  {
    icon: MapPin,
    title: 'Built in Mauritius',
    body: 'Same time zone, same context, and a team that uses the same services you do.',
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
    title: 'Understand',
    icon: Compass,
    body: 'We start with the problem, not the feature list — who it affects, what it costs today, and what would count as solved.',
  },
  {
    step: 2,
    title: 'Design',
    icon: PenTool,
    body: 'Structure, screens and content designed mobile-first, reviewed before a line of production code is written.',
  },
  {
    step: 3,
    title: 'Build',
    icon: Code2,
    body: 'Built in visible increments on a modular architecture, so you see working software early and changes stay cheap.',
  },
  {
    step: 4,
    title: 'Validate',
    icon: TestTube2,
    body: 'Automated tests, real devices and real data. We would rather find it here than have your users find it for us.',
  },
  {
    step: 5,
    title: 'Launch & Support',
    icon: Rocket,
    body: 'Deployment, a walkthrough for your team, and a developer who still answers once you are live.',
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
    body: 'Interfaces that respond instantly, used for dashboards, portals and content-rich platforms.',
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
    name: 'Laravel',
    icon: Server,
    body: 'The backend behind our own platforms: accounts, permissions, data and business rules.',
  },
  {
    name: 'REST APIs',
    icon: Share2,
    body: 'A documented interface between systems, so today’s product is tomorrow’s building block.',
  },
  {
    name: 'Tailwind CSS',
    icon: PenTool,
    body: 'A consistent design system that keeps every screen visually coherent.',
  },
  {
    name: 'MySQL',
    icon: Database,
    body: 'A proven database that keeps records consistent and reports quick as data grows.',
  },
  {
    name: 'PostgreSQL',
    icon: Database,
    body: 'Chosen when the data model is complex enough to deserve a stricter engine.',
  },
  {
    name: 'Redis',
    icon: Zap,
    body: 'Caching and queues, so heavy work happens in the background and pages stay fast.',
  },
  {
    name: 'Docker',
    icon: Container,
    body: 'The same environment on every machine, which is what makes deployments boring.',
  },
  {
    name: 'PWA',
    icon: Signal,
    body: 'Installable, offline-tolerant web apps — an app on the home screen without an app store.',
  },
  {
    name: 'Three.js',
    icon: Sparkles,
    body: 'Restrained 3D and motion where it adds meaning rather than noise.',
  },
  {
    name: 'Flutter',
    icon: TabletSmartphone,
    body: 'One codebase for Android and iOS, so a mobile app costs less than building it twice.',
  },
]

export const technologyBenefits: readonly string[] = [
  'Chosen for the problem in front of us, never for the trend',
  'Fast on the mobile connections most of Mauritius browses on',
  'Architecture that scales as data, traffic and the team grow',
  'Maintainable when the requirement changes, which it will',
  'Proven in production on our own platforms before we recommend it',
  'Mobile apps for Android and iOS from a single codebase',
]

export type AboutPoint = {
  readonly icon: LucideIcon
  readonly title: string
  readonly body: string
}

export const aboutPoints: readonly AboutPoint[] = [
  {
    icon: Compass,
    title: 'Problems worth solving',
    body: 'We look for friction people in Mauritius actually live with, then ask whether software genuinely helps.',
  },
  {
    icon: Share2,
    title: 'Platforms that connect',
    body: 'Our products exist to put two sides in touch — people and professionals, buyers and sellers.',
  },
  {
    icon: Users,
    title: 'Local before global',
    body: 'Built around how things work here: local trades, local services, local ways of finding someone.',
  },
  {
    icon: Code2,
    title: 'One engineering standard',
    body: 'Client work is held to the same standard as the platforms we have to run ourselves.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-first, always',
    body: 'Most of Mauritius browses on a phone, so that is where every design decision starts.',
  },
  {
    icon: Building2,
    title: 'In it for the long run',
    body: 'We build things we intend to still be maintaining in three years, ours and yours.',
  },
]

export type Assurance = { readonly value: string; readonly label: string; readonly body: string }

/**
 * Commitments and facts MoriStack controls, so none of it implies a client
 * history or a user base that does not exist yet.
 */
export const assurances: readonly Assurance[] = [
  {
    value: '2',
    label: 'Platforms',
    body: 'MoriHome and MoriCar, designed and built by MoriStack.',
  },
  {
    value: '1 day',
    label: 'Reply time',
    body: 'Every enquiry answered within one business day.',
  },
  {
    value: 'Direct',
    label: 'No middleman',
    body: 'You talk to the people building it, never an account manager.',
  },
  {
    value: 'Local',
    label: 'Mauritius',
    body: 'Built here, for how things actually work here.',
  },
]
