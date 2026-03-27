import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { projects } from '../content/projects/index';
import type { Project, ProjectFeature } from '../content/projects/index';

/* ------------------------------------------------------------------ */
/*  Architecture tree data                                            */
/* ------------------------------------------------------------------ */

interface TreeNode {
  label: string;
  children?: TreeNode[];
}

const architectureTree: TreeNode = {
  label: 'UI System',
  children: [
    {
      label: 'Full-Screen Pages',
      children: [
        { label: 'Splash' },
        { label: 'Main Menu' },
        { label: 'Settings' },
        { label: 'Pause Menu' },
        { label: 'Game Over' },
        { label: 'Inventory' },
        { label: 'Mission Select' },
        { label: 'Lobby' },
        { label: 'Loading' },
      ],
    },
    {
      label: 'HUD (7 Sub-modules)',
      children: [
        { label: 'Health / Armor' },
        { label: 'Minimap' },
        { label: 'Equipment Bar' },
        { label: 'Compass' },
        { label: 'Action Notify' },
        { label: 'Interaction Prompt' },
        { label: 'Chat Overlay' },
      ],
    },
    {
      label: 'Overlay Systems',
      children: [
        { label: 'Item Wheel' },
        { label: 'Dialogue Panel' },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Tree renderer                                                     */
/* ------------------------------------------------------------------ */

function TreeBranch({ node }: { node: TreeNode }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            hasChildren ? 'bg-accent' : 'bg-border'
          }`}
        />
        <span
          className={`rounded-md px-3 py-1.5 text-sm ${
            hasChildren
              ? 'bg-accent/10 font-semibold text-accent'
              : 'bg-bg-card font-medium text-text-secondary'
          }`}
        >
          {node.label}
        </span>
      </div>

      {hasChildren && (
        <div className="ml-1 mt-1 border-l-2 border-accent/40 pl-5 flex flex-col gap-1.5 py-1">
          {node.children!.map((child) => (
            <TreeBranch key={child.label} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature Tabs                                                      */
/* ------------------------------------------------------------------ */

function FeatureTabs({
  features,
  isZh,
}: {
  features: ProjectFeature[];
  isZh: boolean;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const current = features[activeTab];

  return (
    <div>
      <div
        className="flex gap-1 overflow-x-auto border-b border-border pb-px"
        role="tablist"
      >
        {features.map((f, idx) => (
          <button
            key={`${idx}-${f.title}`}
            type="button"
            role="tab"
            aria-selected={activeTab === idx}
            onClick={() => setActiveTab(idx)}
            className={`shrink-0 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === idx
                ? 'border-b-2 border-accent text-accent'
                : 'text-text-secondary hover:text-accent'
            }`}
          >
            {isZh ? f.titleZh : f.title}
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-[160px]" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h4 className="text-lg font-semibold text-text-primary">
              {isZh ? current.titleZh : current.title}
            </h4>
            <p className="mt-3 leading-relaxed text-text-secondary">
              {isZh ? current.descriptionZh : current.description}
            </p>
            {current.image && (
              <img
                src={current.image}
                alt={isZh ? current.titleZh : current.title}
                loading="lazy"
                className="mt-4 w-full rounded-lg border border-border object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Design Decision Card                                              */
/* ------------------------------------------------------------------ */

function DecisionCard({
  problem,
  decision,
  outcome,
  labels,
}: {
  problem: string;
  decision: string;
  outcome: string;
  labels: { problem: string; decision: string; outcome: string };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl bg-accent/5 p-5 border border-accent/10">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-accent">
          {labels.problem}
        </span>
        <p className="text-sm leading-relaxed text-text-secondary">{problem}</p>
      </div>

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent mx-auto md:hidden" aria-hidden="true">
        <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="rounded-xl bg-accent/10 p-5 border border-accent/20">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-accent">
          {labels.decision}
        </span>
        <p className="text-sm leading-relaxed text-text-secondary">{decision}</p>
      </div>

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent mx-auto md:hidden" aria-hidden="true">
        <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="rounded-xl bg-bg-card p-5 border border-border">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-text-secondary">
          {labels.outcome}
        </span>
        <p className="text-sm leading-relaxed text-text-secondary">{outcome}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  const project: Project | undefined = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          {t('projectDetail.notFound')}
        </h1>
        <Link to="/projects" className="text-accent hover:underline">
          {t('projectDetail.backToProjects')}
        </Link>
      </section>
    );
  }

  const title = isZh ? project.titleZh : project.title;
  const description = isZh ? project.descriptionZh : project.description;
  const role = isZh ? project.roleZh : project.role;

  const decisionLabels = {
    problem: t('projectDetail.problem'),
    decision: t('projectDetail.decision'),
    outcome: t('projectDetail.outcome'),
  };

  const infoItems = [
    { label: t('projectDetail.team'), value: project.team },
    { label: t('projectDetail.platform'), value: project.platform },
    { label: t('projectDetail.role'), value: role },
    { label: t('projectDetail.duration'), value: project.duration },
  ].filter((item) => item.value);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors mb-8"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t('projectDetail.backToProjects')}
      </Link>

      {/* Section A — Overview */}
      <ScrollReveal>
        <h1 className="text-4xl font-bold text-text-primary mb-6">{title}</h1>
        <p className="text-lg leading-relaxed text-text-secondary mb-8">
          {description}
        </p>
      </ScrollReveal>

      {infoItems.length > 0 && (
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
            {infoItems.map((item) => (
              <div key={item.label} className="rounded-lg bg-bg-card p-4">
                <span className="block text-xs font-medium uppercase tracking-wider text-text-secondary">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm font-semibold text-text-primary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.15}>
        <div className="flex flex-wrap gap-2 mb-16">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-bg-primary px-3 py-1 text-xs font-medium text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </ScrollReveal>

      {/* Section B — UI Architecture */}
      {project.architectureDescription && project.slug === 'stealth-game' && (
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {t('projectDetail.architecture')}
            </h2>
            <p className="leading-relaxed text-text-secondary mb-8">
              {isZh
                ? project.architectureDescriptionZh
                : project.architectureDescription}
            </p>
            <div className="rounded-xl border border-border bg-bg-card p-6 overflow-x-auto">
              <TreeBranch node={architectureTree} />
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Section C — Feature Deep-Dives */}
      {project.features && project.features.length > 0 && (
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              {t('projectDetail.features')}
            </h2>
            <FeatureTabs features={project.features} isZh={isZh} />
          </div>
        </ScrollReveal>
      )}

      {/* Section D — Design Decisions */}
      {project.decisions && project.decisions.length > 0 && (
        <div className="mb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              {t('projectDetail.decisions')}
            </h2>
          </ScrollReveal>
          <div className="flex flex-col gap-6">
            {project.decisions.map((d, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <DecisionCard
                  problem={isZh ? d.problemZh : d.problem}
                  decision={isZh ? d.decisionZh : d.decision}
                  outcome={isZh ? d.outcomeZh : d.outcome}
                  labels={decisionLabels}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Section E — Code Metrics */}
      {project.metrics && (
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              {t('projectDetail.metrics')}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-bg-card p-6 text-center">
                <span className="block text-4xl font-bold text-accent">
                  {project.metrics.files.toLocaleString()}
                </span>
                <span className="mt-2 block text-sm font-medium text-text-secondary">
                  {t('projectDetail.files')}
                </span>
              </div>
              <div className="rounded-xl bg-bg-card p-6 text-center">
                <span className="block text-4xl font-bold text-accent">
                  {project.metrics.lines.toLocaleString()}
                </span>
                <span className="mt-2 block text-sm font-medium text-text-secondary">
                  {t('projectDetail.lines')}
                </span>
              </div>
              <div className="rounded-xl bg-bg-card p-6 text-center">
                <span className="block text-4xl font-bold text-accent">
                  {project.metrics.commits.toLocaleString()}
                </span>
                <span className="mt-2 block text-sm font-medium text-text-secondary">
                  {t('projectDetail.commits')}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
