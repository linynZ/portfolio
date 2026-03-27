# Building a Complete UI System in a Custom C++ Engine

*March 2026 · 8 min read*

## Introduction

When our 7-person team set out to build a multiplayer stealth game on a custom ECS engine, I took on the role of UI/UX System Lead. Over six months, I designed and implemented a complete UI framework spanning 7,100+ lines of C++ code, 47 files, and 15+ full-screen interfaces.

This article walks through the architecture decisions, technical challenges, and lessons learned from building a production-quality UI system from scratch using Dear ImGui on a custom Entity Component System engine.

## The Challenge

Our engine used a strict ECS architecture where all game state lives in registry context resources. The UI system had to:

1. **Follow ECS data-flow** — no direct system-to-system calls
2. **Support 15+ distinct screens** — from splash to game over
3. **Handle multiplayer state** — lobby, team selection, networked HUD
4. **Work on both PC and PS5** — mouse, keyboard, and gamepad
5. **Maintain visual consistency** — across all interfaces

## Architecture Overview

```
UI System (Sys_UI, priority 500)
├── Full-Screen Pages
│   ├── Splash → MainMenu → Settings
│   ├── PauseMenu → GameOver
│   ├── Inventory → MissionSelect
│   └── Lobby → Loading
├── HUD (7 Independent Sub-modules)
│   ├── Health/Armor Bar
│   ├── Minimap (NavMesh → Screen)
│   ├── Equipment Bar (Weapon + Gadget)
│   ├── Compass
│   ├── Action Notifications (Toast Queue)
│   ├── Interaction Prompts (3D → 2D)
│   └── Chat Overlay
└── Overlay Systems
    ├── Item Wheel (Radial Selection)
    └── Dialogue Panel (Direction-Key Input)
```

The key insight was treating each UI module as a **pure rendering function** that reads from ECS ctx resources and draws to the screen. No module stores its own state — all state lives in shared resources like `Res_UIState`, `Res_GameState`, and `Res_InventoryState`.

## Centralized Theming

Early in development, I noticed UI files were accumulating hardcoded colors and magic numbers. With 30+ files, this would become unmaintainable. The solution was `UITheme.h`:

```cpp
namespace ECS::UITheme {
    // 5-color warm palette
    inline const ImVec4 kBgWindow  = {0.961f, 0.933f, 0.910f, 1.0f}; // #F5EEE8
    inline const ImVec4 kAccent    = {0.988f, 0.435f, 0.161f, 1.0f}; // #FC6F29
    inline const ImVec4 kTextPrimary = {0.063f, 0.051f, 0.039f, 1.0f}; // #100D0A
    // ... plus draw-list helpers
    inline ImU32 Col32_Accent(uint8_t a = 255) { return IM_COL32(252,111,41,a); }
}
```

This single header became the source of truth for the entire UI. Changing the color scheme requires editing only one file. I even reused the same palette for my portfolio website — the consistency proves the system works.

## HUD Decomposition

The HUD was the most complex subsystem. Rather than one monolithic render function, I decomposed it into 7 independent modules:

| Module | Reads From | Draws |
|--------|-----------|-------|
| Health Bar | Res_GameState | HP/armor bars with ratio coloring |
| Minimap | Res_MinimapState | NavMesh-projected top-down view |
| Equipment Bar | Res_InventoryState | Active weapon + gadget slots |
| Compass | Res_GameState | Cardinal direction indicator |
| Action Notify | Res_ActionNotifyState | Toast cards (6-message queue) |
| Interaction Prompt | Res_GameState | 3D→2D projected labels |
| Chat Overlay | Res_ChatState | Message history overlay |

Each module can be developed, tested, and modified independently. When a teammate needed to adjust the minimap, they only touched `UI_HUD_Minimap.cpp` — no risk of breaking the health bar.

## Lessons Learned

1. **Invest in theming early** — It pays dividends as the project grows
2. **Decompose aggressively** — 7 small files beat 1 large file every time
3. **Let ECS drive UI state** — Fighting the architecture creates bugs
4. **Design for the worst input** — If it works on a gamepad, it works everywhere

## Conclusion

Building a UI system from scratch was one of the most rewarding challenges of this project. The strict ECS constraints, rather than limiting us, actually led to cleaner architecture. The modular design enabled parallel development across the team, and the centralized theming ensured visual consistency that would have been impossible with ad-hoc styling.

The complete source code is available on [GitHub](https://github.com/Sinthome-Ludens/CSC8507-08).
