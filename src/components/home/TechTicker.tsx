import { Marquee } from '@/components/ui/Marquee'
import { technologies } from '@/data/content'

export function TechTicker() {
  return (
    <div className="border-y border-cyan-400/10 py-5">
      <h3 className="sr-only">Technologies we build with</h3>
      <Marquee speed={38}>
        <ul className="flex items-center gap-4">
          {technologies.map((tech) => (
            <li key={tech.name} className="ms-chip">
              <tech.icon size={15} aria-hidden="true" className="text-cyan-400" />
              {tech.name}
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  )
}
