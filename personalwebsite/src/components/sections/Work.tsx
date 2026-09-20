import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Tag } from '@/components/ui/Tag'
import { cn } from '@/lib/utils'
import { projects } from '@/lib/projects'

/** The work index: one glass card per piece, first card double-width. */
export function Work() {
  return (
    <section id="work" className="relative py-section">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px [background:var(--gradient-hairline)]" />
      <div className="mx-auto w-full max-w-[var(--container-max)] px-gutter">
        <div className="mb-10 flex items-baseline gap-4 font-mono text-label uppercase text-dim">
          <span className="text-faint">01</span>
          <span>Selected work</span>
        </div>

        <ScrollReveal target=".card">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
            {projects.map((project, i) => (
              <Card
                key={project.slug}
                href={`/work/${project.slug}`}
                index={project.index}
                label={project.label}
                title={project.title}
                meta={project.meta}
                className={cn('card min-w-0', i === 0 && 'col-span-2')}
                media={
                  <div
                    className={i === 0 ? 'h-[300px]' : 'h-[180px]'}
                    style={{
                      background: `radial-gradient(130% 110% at 28% 18%, ${project.gradientFrom}, ${project.gradientTo} 68%)`,
                    }}
                  />
                }
              >
                {project.blurb}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                  <Tag accent>{project.year}</Tag>
                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
