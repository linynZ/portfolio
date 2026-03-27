import ScrollReveal from './ScrollReveal';

interface TimelineItemProps {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  isLeft?: boolean;
}

export default function TimelineItem({
  year,
  title,
  subtitle,
  description,
  tags,
  isLeft = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex w-full items-start">
      {/* Center line + dot (desktop) */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />
      <div className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg-primary md:left-1/2" />

      {/* Content area */}
      {/* Mobile: always on the right of the line */}
      {/* Desktop: alternating left/right based on isLeft */}
      <div
        className={`w-full pl-10 md:w-1/2 md:pl-0 ${
          isLeft ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
        }`}
      >
        <ScrollReveal direction={isLeft ? 'left' : 'right'} delay={0.1}>
          <div className="rounded-xl border border-border bg-bg-card p-5 transition-colors hover:border-accent/40">
            {/* Year badge */}
            <span className="inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
              {year}
            </span>

            <h3 className="mt-2 text-base font-semibold text-text-primary">
              {title}
            </h3>
            <p className="text-sm font-medium text-text-secondary">{subtitle}</p>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {description}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div
                className={`mt-3 flex flex-wrap gap-1.5 ${
                  isLeft ? 'md:justify-end' : ''
                }`}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-bg-primary px-2 py-0.5 text-[11px] font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
