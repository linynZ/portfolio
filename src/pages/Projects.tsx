import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../content/projects/index';
import type { Project } from '../content/projects/index';

type CategoryFilter = 'all' | Project['category'];

const filterKeys: CategoryFilter[] = ['all', 'gamedev', 'rendering', 'product'];

const filterI18nMap: Record<CategoryFilter, string> = {
  all: 'projects.all',
  gamedev: 'projects.gamedev',
  rendering: 'projects.rendering',
  product: 'projects.product',
};

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const isZh = i18n.language === 'zh';

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        {t('projects.title')}
      </h1>

      <div className="flex flex-wrap gap-3 mb-10" role="group" aria-label="Filter projects">
        {filterKeys.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={activeFilter === key}
            onClick={() => setActiveFilter(key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeFilter === key
                ? 'bg-accent text-white'
                : 'bg-bg-card border border-border text-text-secondary hover:border-accent hover:text-accent'
            }`}
          >
            {t(filterI18nMap[key])}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                slug={project.slug}
                title={isZh ? project.titleZh : project.title}
                description={isZh ? project.descriptionZh : project.description}
                tags={project.tags}
                role={isZh ? project.roleZh : project.role}
                image={project.image}
                category={project.category}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
