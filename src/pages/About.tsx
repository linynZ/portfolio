import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import TimelineItem from '../components/TimelineItem';

interface TimelineEntry {
  year: string;
  title: string;
  titleZh: string;
  subtitle: string;
  subtitleZh: string;
  description: string;
  descriptionZh: string;
  tags?: string[];
  isLeft?: boolean;
}

const timelineData: TimelineEntry[] = [
  {
    year: '2018-2022',
    title: 'University of International Relations',
    titleZh: '国际关系学院',
    subtitle: 'BSc Information Security + Minor in Economics & Finance',
    subtitleZh: '信息安全学士 + 经济金融辅修',
    description:
      'Developed a unique cross-disciplinary foundation combining cybersecurity expertise with business acumen.',
    descriptionZh:
      '培养了独特的跨学科基础，结合网络安全专业知识与商业洞察力。',
    tags: ['Cybersecurity', 'Economics', 'Data Analysis'],
  },
  {
    year: '2022-2025',
    title: 'Vackbot (Beijing)',
    titleZh: '墨云科技（北京）',
    subtitle: 'Product Manager & Marketing Manager',
    subtitleZh: '产品经理 & 市场经理',
    description:
      'Led product lifecycle from user research to launch for cyber range platform. Drove brand from zero to Red Herring Global Top 100 and Gartner recognition in two categories.',
    descriptionZh:
      '主导网络靶场产品从用户调研到上线的全生命周期。推动品牌从零到 Red Herring 全球 Top 100 及 Gartner 双领域标杆。',
    tags: ['Product Management', 'Brand Building', 'Go-to-Market'],
    isLeft: true,
  },
  {
    year: '2025-2026',
    title: 'Newcastle University',
    titleZh: '纽卡斯尔大学',
    subtitle: 'MSc Computer Game Engineering',
    subtitleZh: '计算机游戏工程硕士',
    description:
      'Intensive program covering real-time rendering (OpenGL/PBR), physics simulation, AI, networking, and team-based game development on custom C++ engine.',
    descriptionZh:
      '密集课程涵盖实时渲染（OpenGL/PBR）、物理模拟、AI、网络编程和基于自研 C++ 引擎的团队游戏开发。',
    tags: ['C++', 'OpenGL', 'Game Engine', 'Team Project'],
  },
  {
    year: '2026→',
    title: 'Next Chapter',
    titleZh: '下一站',
    subtitle: 'Game Designer & Technical Producer',
    subtitleZh: '游戏策划 & 技术制作人',
    description:
      'Seeking roles where I can bridge design vision and technical implementation — combining product thinking with hands-on engineering.',
    descriptionZh:
      '寻找能够连接设计愿景与技术实现的角色 —— 将产品思维与动手工程相结合。',
    tags: ['Game Design', 'Production', 'UI/UX'],
    isLeft: true,
  },
];

interface SkillCategory {
  labelKey: string;
  tags: string[];
}

const skillCategories: SkillCategory[] = [
  {
    labelKey: 'about.gamedev',
    tags: [
      'C++',
      'C#',
      'Unity',
      'OpenGL/GLSL',
      'ECS Architecture',
      'ImGui',
      'Lua',
      'PS5 DevKit',
    ],
  },
  {
    labelKey: 'about.design',
    tags: [
      'Axure RP',
      'Figma',
      'Photoshop',
      'Premiere Pro',
      'Agile/Scrum',
      'User Research',
      'Wireframing',
      'Data Analysis',
    ],
  },
  {
    labelKey: 'about.languages',
    tags: [], // filled dynamically via t()
  },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      {/* ── Header Section ── */}
      <ScrollReveal>
        <h1 className="text-4xl font-bold text-text-primary">
          {t('about.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {t('about.intro')}
        </p>
      </ScrollReveal>

      {/* ── Career Timeline Section ── */}
      <section className="mt-20">
        <ScrollReveal>
          <h2 className="mb-12 text-center text-3xl font-bold text-text-primary">
            {t('about.timeline')}
          </h2>
        </ScrollReveal>

        <div className="relative flex flex-col gap-12">
          {timelineData.map((entry) => (
            <TimelineItem
              key={entry.year}
              year={entry.year}
              title={isZh ? entry.titleZh : entry.title}
              subtitle={isZh ? entry.subtitleZh : entry.subtitle}
              description={isZh ? entry.descriptionZh : entry.description}
              tags={entry.tags}
              isLeft={entry.isLeft}
            />
          ))}
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section className="mt-20">
        <ScrollReveal>
          <h2 className="mb-10 text-center text-3xl font-bold text-text-primary">
            {t('about.skills')}
          </h2>
        </ScrollReveal>

        <div className="grid gap-10 md:grid-cols-3">
          {skillCategories.map((category, catIdx) => {
            const tags =
              category.labelKey === 'about.languages'
                ? [t('about.mandarin'), t('about.english')]
                : category.tags;

            return (
              <ScrollReveal key={category.labelKey} delay={catIdx * 0.15}>
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-text-primary">
                    {t(category.labelKey)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-bg-card px-3 py-1 text-sm text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
