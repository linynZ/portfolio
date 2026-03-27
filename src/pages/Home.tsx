import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import StatCounter from '../components/StatCounter';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../content/projects/index';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-bg-primary to-bg-primary/90">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <p className="text-lg text-text-secondary">{t('hero.greeting')}</p>
          <h1 className="mt-2 text-5xl font-bold text-text-primary md:text-7xl">
            {t('hero.name')}
          </h1>
          <p className="mt-4 text-xl text-text-secondary">{t('hero.role')}</p>
          <p className="mt-3 text-lg italic text-text-secondary">
            {t('hero.tagline')}
          </p>

          <Link
            to="/projects"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {t('hero.cta')}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-secondary"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </section>

      {/* ── Featured Projects Section ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <h2 className="mb-12 text-center text-3xl font-bold text-text-primary">
            {t('featured.title')}
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((project, idx) => (
            <ScrollReveal key={project.slug} delay={idx * 0.15}>
              <ProjectCard
                slug={project.slug}
                title={isZh ? project.titleZh : project.title}
                description={
                  isZh ? project.descriptionZh : project.description
                }
                tags={project.tags}
                role={isZh ? project.roleZh : project.role}
                image={project.image}
                category={project.category}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Stats Bar Section ── */}
      <section className="bg-bg-dark py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 px-6 md:flex-row md:justify-between md:gap-0">
          <div className="text-center text-white">
            <div className="text-4xl font-bold">
              <StatCounter
                end={7100}
                prefix=""
                suffix={`+ ${t('stats.uiCode')}`}
              />
            </div>
          </div>

          <div className="text-center text-white">
            <div className="text-4xl font-bold">
              <StatCounter
                end={15}
                prefix=""
                suffix={`+ ${t('stats.interfaces')}`}
              />
            </div>
          </div>

          <div className="text-center text-white">
            <div className="text-4xl font-bold">
              <StatCounter
                end={3}
                prefix=""
                suffix={`+ ${t('stats.pmExp')}`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
