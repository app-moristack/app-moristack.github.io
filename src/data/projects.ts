export type ProjectStatus = 'Concept' | 'Sample Work' | 'Client Project'

export type ProjectCategory =
  'Restaurant' | 'Business System' | 'Web Application' | 'Business Website'

export type Project = {
  readonly slug: string
  readonly title: string
  readonly category: ProjectCategory
  readonly status: ProjectStatus
  readonly description: string
  readonly problem: string
  readonly solution: string
  readonly outcome: string
  readonly technologies: readonly string[]
  /** Path relative to the public directory, resolved through assetUrl(). */
  readonly screenshot: string | null
  readonly screenshotAlt: string
  readonly liveUrl: string | null
  readonly sourceUrl: string | null
}

/**
 * Every entry below is a concept built to demonstrate structure and interface
 * decisions. None of them represent a real client engagement, and no results,
 * names or figures are attributed to a real business.
 */
export const projects: readonly Project[] = [
  {
    slug: 'coastal-table-restaurant',
    title: 'Coastal Table — Restaurant & Digital Menu',
    category: 'Restaurant',
    status: 'Concept',
    description:
      'A single-page restaurant presence with a phone-first digital menu, outlet details and reservation enquiry links.',
    problem:
      'Many restaurants publish a PDF menu that is unreadable on a phone, and opening hours that nobody updates. Customers call to ask basic questions instead of arriving ready to order.',
    solution:
      'A menu organised by course with prices, dietary markers and photography, plus per-outlet hours, a map link and one-tap calling. Everything is driven by a typed content file so prices can be changed without touching layout code.',
    outcome:
      'Demonstrates how a restaurant can present its menu, outlets and contact routes on a phone without a printed handout or a PDF download.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    screenshot: null,
    screenshotAlt: 'Concept design for the Coastal Table restaurant website and digital menu',
    liveUrl: null,
    sourceUrl: null,
  },
  {
    slug: 'operations-management-system',
    title: 'Operations Management System',
    category: 'Business System',
    status: 'Concept',
    description:
      'An internal system replacing a stack of spreadsheets: clients, jobs, stock movements and a reporting view.',
    problem:
      'A business tracking jobs across several spreadsheets loses the current version, cannot see workload across the team, and rebuilds the same monthly report by hand.',
    solution:
      'A single record for each client and job, status transitions with a visible history, role-based access for staff, and reports generated from live data rather than copied cells.',
    outcome:
      'Shows how day-to-day operations can move from parallel spreadsheets into one system that the whole team reads from.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Laravel'],
    screenshot: null,
    screenshotAlt: 'Concept dashboard for an operations management system',
    liveUrl: null,
    sourceUrl: null,
  },
  {
    slug: 'membership-attendance-platform',
    title: 'Membership & Attendance Platform',
    category: 'Web Application',
    status: 'Concept',
    description:
      'Member records, subscription periods and session attendance, with a self-service view for members.',
    problem:
      'Clubs and studios track members in a notebook or a shared sheet. Renewals are missed, attendance is guessed at, and members have no way to check their own status.',
    solution:
      'Member profiles with subscription start and end dates, attendance captured per session, automatic flags for lapsed memberships, and a portal where a member can see their own history.',
    outcome:
      'Illustrates how membership admin and attendance capture can be handled in one place, with members able to check their status themselves.',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    screenshot: null,
    screenshotAlt: 'Concept interface for a membership and attendance platform',
    liveUrl: null,
    sourceUrl: null,
  },
  {
    slug: 'professional-services-site',
    title: 'Professional Services Website',
    category: 'Business Website',
    status: 'Concept',
    description:
      'A multi-page site for a service business: offering pages, an about section and a structured enquiry form.',
    problem:
      'Service businesses often have one page that lists everything, so a visitor cannot tell whether the specific thing they need is offered.',
    solution:
      'A page per service with who it is for, what is included and what it costs to get started, plus an enquiry form that captures enough detail to quote without a phone call.',
    outcome:
      'Demonstrates a content structure that lets a visitor self-qualify before they make contact.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zod'],
    screenshot: null,
    screenshotAlt: 'Concept layout for a professional services website',
    liveUrl: null,
    sourceUrl: null,
  },
]

export const projectCategories: readonly ProjectCategory[] = [
  'Restaurant',
  'Business System',
  'Web Application',
  'Business Website',
]

export const featuredProjects = projects.slice(0, 3)
