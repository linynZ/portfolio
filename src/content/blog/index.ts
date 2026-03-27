export interface BlogPost {
  slug: string;
  title: string;
  titleZh: string;
  date: string;
  readTime: number;
  description: string;
  descriptionZh: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-ui-system',
    title: 'Building a Complete UI System in a Custom C++ Engine',
    titleZh: '在自研 C++ 引擎中构建完整的 UI 系统',
    date: '2026-03-15',
    readTime: 8,
    description: 'Architecture decisions, technical challenges, and lessons learned from building 7,100+ lines of UI code for a multiplayer stealth game.',
    descriptionZh: '为多人潜行游戏构建 7,100+ 行 UI 代码的架构决策、技术挑战和经验教训。',
    tags: ['C++', 'ECS', 'ImGui', 'Architecture'],
  },
  {
    slug: 'from-pm-to-gamedev',
    title: 'From Product Manager to Game Developer: Why I Made the Switch',
    titleZh: '从产品经理到游戏开发者：我为什么转行',
    date: '2026-03-10',
    readTime: 6,
    description: 'How three years of product management experience translates directly to game design and production.',
    descriptionZh: '三年产品管理经验如何直接转化为游戏设计和制作能力。',
    tags: ['Career', 'Game Design', 'Product Management'],
  },
];

export default blogPosts;
