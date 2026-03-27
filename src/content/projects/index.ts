export interface DesignDecision {
  problem: string;
  problemZh: string;
  decision: string;
  decisionZh: string;
  outcome: string;
  outcomeZh: string;
}

export interface ProjectFeature {
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  image?: string;
}

export interface Project {
  slug: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  category: 'gamedev' | 'rendering' | 'product';
  tags: string[];
  role: string;
  roleZh: string;
  image?: string;
  // Detail page fields
  team?: string;
  platform?: string;
  duration?: string;
  features?: ProjectFeature[];
  decisions?: DesignDecision[];
  metrics?: { files: number; lines: number; commits: number };
  architectureDescription?: string;
  architectureDescriptionZh?: string;
}

export const projects: Project[] = [
  {
    slug: 'stealth-game',
    title: 'Stealth Multiplayer Game — UI System',
    titleZh: '多人潜行游戏 — UI 系统',
    category: 'gamedev',
    tags: ['C++', 'ECS', 'ImGui', 'Custom Engine', 'PS5', 'Multiplayer'],
    role: 'UI/UX System Lead',
    roleZh: 'UI/UX 系统负责人',
    description:
      "Engineered complete UI framework (7,100+ lines C++) for a 7-person team's multiplayer stealth game built on a custom ECS engine. Designed 15+ full-screen interfaces spanning the entire player journey.",
    descriptionZh:
      '为 7 人团队的多人潜行游戏构建了完整的 UI 框架（7,100+ 行 C++），基于自研 ECS 引擎。设计了覆盖完整玩家旅程的 15+ 全屏界面。',
    team: '7 members',
    platform: 'PC + PS5',
    duration: 'Oct 2025 – Apr 2026',
    metrics: { files: 47, lines: 7149, commits: 151 },
    architectureDescription:
      'The UI system follows strict ECS data-flow: all state lives in registry ctx resources (Res_UIState, Res_GameState, etc.), systems read/write these resources, and UI rendering functions are pure consumers. The system decomposes into: Full-screen pages (Splash, MainMenu, Settings, PauseMenu, GameOver, Inventory, MissionSelect, Lobby, Loading) → HUD with 7 independent sub-modules (Health, Minimap, ItemBar, Compass, ActionNotify, InteractionPrompt, ChatOverlay) → Overlay systems (ItemWheel, DialoguePanel).',
    architectureDescriptionZh:
      'UI 系统严格遵循 ECS 数据流：所有状态存储在 registry ctx 资源中（Res_UIState、Res_GameState 等），系统读写这些资源，UI 渲染函数是纯消费者。系统分解为：全屏页面（Splash、主菜单、设置、暂停菜单、结算、背包、任务选择、大厅、加载）→ HUD 7个独立子模块（生命值、小地图、装备栏、罗盘、动作通知、交互提示、聊天叠层）→ 覆盖系统（道具轮盘、对话面板）。',
    features: [
      {
        title: 'Theming System',
        titleZh: '主题系统',
        description:
          'Centralized 5-color palette (warm cream #F5EEE8 + orange accent #FC6F29) with DPI-adaptive font scaling. UITheme.h provides both ImVec4 style colors and ImU32 draw-list colors, ensuring visual consistency across 47 files.',
        descriptionZh:
          '集中化5色调色板（暖奶油 #F5EEE8 + 橙色强调 #FC6F29），支持 DPI 自适应字体缩放。UITheme.h 同时提供 ImVec4 样式颜色和 ImU32 绘制列表颜色，确保 47 个文件的视觉一致性。',
      },
      {
        title: 'HUD Design',
        titleZh: 'HUD 设计',
        description:
          '7 independent sub-modules following strict ECS data-flow: each reads from dedicated ctx resources and renders independently. Modules: Health/Armor bar, Minimap (NavMesh→screen space), Equipment bar (weapon+gadget), Compass, Action notifications (toast queue), Interaction prompts (3D→2D projection), Chat overlay.',
        descriptionZh:
          '7 个独立子模块遵循严格的 ECS 数据流：每个模块从专用 ctx 资源读取并独立渲染。包括：生命/护甲条、小地图（NavMesh→屏幕空间）、装备栏（武器+道具）、罗盘、动作通知（消息队列）、交互提示（3D→2D 投影）、聊天叠层。',
      },
      {
        title: 'Dialogue System',
        titleZh: '对话系统',
        description:
          'Direction-key input dialogue system designed for PS5 gamepad: arrow-combo sequences (↑↓←→) with prefix matching, supporting branching narratives. Includes countdown timer, visual input slots, and sender-tagged message display.',
        descriptionZh:
          '为 PS5 手柄设计的方向键输入对话系统：箭头组合序列（↑↓←→）配合前缀匹配，支持分支叙事。包含倒计时器、可视化输入槽和发言者标记的消息展示。',
      },
      {
        title: 'Item Wheel',
        titleZh: '道具轮盘',
        description:
          'Radial 4-sector selection menu (MGS-style) with mouse-angle detection, real-time inventory sync, cooldown visualization, and active slot highlighting. Pauses camera rotation and shows cursor when open.',
        descriptionZh:
          '径向4扇区选择菜单（MGS 风格），具备鼠标角度检测、实时库存同步、冷却可视化和活跃槽位高亮。打开时暂停相机旋转并显示光标。',
      },
      {
        title: 'Minimap',
        titleZh: '小地图',
        description:
          'Real-time minimap mapping NavMesh world coordinates to screen space. Displays player position, enemy positions, objective markers, and map boundaries with configurable zoom level.',
        descriptionZh:
          '实时小地图将 NavMesh 世界坐标映射到屏幕空间。显示玩家位置、敌人位置、目标标记和地图边界，支持可配置缩放级别。',
      },
      {
        title: 'Action Notifications',
        titleZh: '动作通知',
        description:
          'Toast-style notification system (top-right corner) with rounded cards, auto-dismiss timer, and 6-message queue. Supports typed notifications: item pickup, weapon unlock, objective update, system message.',
        descriptionZh:
          'Toast 风格通知系统（右上角），圆角卡片，自动消失计时器，6条消息队列。支持类型化通知：物品拾取、武器解锁、目标更新、系统消息。',
      },
    ],
    decisions: [
      {
        problem:
          "Default dark UI themes felt generic and didn't match the game's atmosphere",
        problemZh: '默认深色 UI 主题感觉千篇一律，与游戏氛围不匹配',
        decision:
          'Adopted a warm cream (#F5EEE8) + orange accent (#FC6F29) palette, unusual for stealth games but creating a distinctive identity',
        decisionZh:
          '采用了暖奶油色（#F5EEE8）+ 橙色强调（#FC6F29）调色板，在潜行游戏中不常见，但创造了独特的视觉标识',
        outcome:
          'The unique palette became the game\'s visual signature; the same colors were reused for this portfolio website',
        outcomeZh:
          '独特的调色板成为了游戏的视觉标志；相同的颜色被复用到了这个作品集网站',
      },
      {
        problem: 'Monolithic HUD code became unmaintainable as features grew',
        problemZh: '随着功能增长，单体 HUD 代码变得难以维护',
        decision:
          'Decomposed HUD into 7 independent sub-modules, each reading from its own ECS ctx resource',
        decisionZh:
          '将 HUD 分解为 7 个独立子模块，每个模块从各自的 ECS ctx 资源读取',
        outcome:
          'Any team member could modify one module without breaking others; parallel development became possible',
        outcomeZh:
          '任何团队成员都可以修改单个模块而不影响其他模块；并行开发成为可能',
      },
      {
        problem:
          "Mouse-based dialogue selection doesn't work well on PS5 gamepad",
        problemZh: '基于鼠标的对话选择在 PS5 手柄上体验不佳',
        decision:
          'Designed direction-key combo input (↑↓←→ sequences) with prefix matching for dialogue choices',
        decisionZh:
          '设计了方向键组合输入（↑↓←→ 序列）配合前缀匹配的对话选择方案',
        outcome:
          'Unified input across PC mouse, keyboard, and PS5 DualSense; players found the combo system engaging',
        outcomeZh:
          '统一了 PC 鼠标、键盘和 PS5 DualSense 的输入；玩家觉得组合系统很有趣',
      },
      {
        problem: '30+ UI files had inconsistent colors and spacing',
        problemZh: '30+ 个 UI 文件的颜色和间距不一致',
        decision:
          'Created centralized UITheme.h with all colors, layout constants, and style parameters',
        decisionZh:
          '创建了集中化的 UITheme.h，包含所有颜色、布局常量和样式参数',
        outcome:
          'Single source of truth; changing the entire UI color scheme requires editing only one file',
        outcomeZh: '单一数据源；更改整个 UI 配色方案只需编辑一个文件',
      },
    ],
  },
  {
    slug: 'rendering-engine',
    title: 'Real-Time Rendering Engine',
    titleZh: '实时渲染引擎',
    category: 'rendering',
    tags: ['C++', 'OpenGL', 'GLSL', 'PBR', 'Deferred Rendering'],
    role: 'Solo Developer',
    roleZh: '独立开发',
    description:
      'Built a forward+deferred dual-pipeline rendering engine featuring PBR (Cook-Torrance BRDF), cascaded shadow mapping, skeletal animation, and post-processing effects (SSAO, bloom, FXAA, tone mapping).',
    descriptionZh:
      '构建了前向+延迟双管线渲染引擎，实现了 PBR（Cook-Torrance BRDF）、级联阴影映射、骨骼动画和后处理效果（SSAO、bloom、FXAA、色调映射）。',
    team: 'Solo',
    platform: 'PC (OpenGL 4.6)',
    duration: 'Oct 2025 – Jan 2026',
  },
  {
    slug: 'physics-game',
    title: 'Physics Engine & Networked Game',
    titleZh: '物理引擎与联网游戏',
    category: 'gamedev',
    tags: ['C++', 'Custom Physics', 'ENet', 'Networking', 'FSM AI'],
    role: 'Solo Developer',
    roleZh: '独立开发',
    description:
      'Custom collision detection system (AABB/OBB/sphere broadphase+narrowphase), constraint solver, and ENet-based multiplayer synchronization with client-side prediction. Includes FSM-driven AI agents with pathfinding.',
    descriptionZh:
      '自研碰撞检测系统（AABB/OBB/球体 宽相+窄相）、约束求解器和基于 ENet 的多人同步（客户端预测）。包含 FSM 驱动的 AI 代理与寻路系统。',
    team: 'Solo',
    platform: 'PC',
    duration: 'Oct 2025 – Dec 2025',
  },
];

export default projects;
