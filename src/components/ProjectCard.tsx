import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  image?: string;
  category: string;
}

export default function ProjectCard({
  slug,
  title,
  description,
  tags,
  role,
  image,
  category,
}: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'tween', duration: 0.2 }}
    >
      <Link
        to={`/projects/${slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-bg-card transition-colors hover:border-accent"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
              <span className="text-4xl font-bold text-accent/30">
                {title.charAt(0)}
              </span>
            </div>
          )}

          {/* Category badge */}
          <span className="absolute top-3 left-3 rounded-full bg-bg-dark/70 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
            {description}
          </p>

          {/* Role badge */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray">
              {t('projects.myRole')}:
            </span>
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              {role}
            </span>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-bg-primary px-2 py-0.5 text-[11px] font-medium text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
