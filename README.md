# Tier List Pro

## 中文介绍

Tier List Pro 是一个高质感、强调交互流畅度的层级划分工具，支持：

- 可编辑等级（名称 / 颜色 / 删除 / 新增）
- 图片素材拖拽分发（素材库 ↔ 等级区）
- 更平滑的等级拖拽排序反馈（减少悬浮重叠感）
- 一键重排（不清空图片）
- 一键重置到初始状态
- 联系作者弹窗（微信号：`cvsooo`）

### Windows 免安装 EXE 下载

- https://github.com/eipos/paixu/releases/latest/download/Tier-List-Pro-Portable.exe

如果是 404，请先确认工作流是否成功：

- https://github.com/eipos/paixu/actions/workflows/release.yml

---

## English

Tier List Pro is a visual-first desktop tier-list app focused on smooth drag-and-drop interactions and clean UI hierarchy.

### Highlights

- Editable tiers (name / color / add / delete)
- Image asset distribution via drag and drop (asset pool ↔ tiers)
- Improved row reordering behavior with less overlap feeling
- One-click tier reshuffle (without clearing images)
- Full reset to initial app state
- "Contact Author" modal for support (`WeChat: cvsooo`)

### Download Portable EXE (Windows)

- https://github.com/eipos/paixu/releases/latest/download/Tier-List-Pro-Portable.exe

If you see 404, check build status first:

- https://github.com/eipos/paixu/actions/workflows/release.yml


## Merge conflict tip

If GitHub shows conflicts, follow `MERGE_CONFLICT_GUIDE.md` and avoid choosing "accept both" for code files.


## 不合并也能直接拿到 EXE（推荐你现在就用）

可以，不解决冲突也能先生成 EXE：

1. 打开：`Actions` -> `Preview EXE (No Merge Required)`
2. 在你的 PR 分支上运行（或等 PR 自动触发）
3. 运行成功后，进入该次 workflow 的 `Artifacts`
4. 下载 `Tier-List-Pro-Portable-preview`，里面就是 `Tier-List-Pro-Portable.exe`

链接：
- https://github.com/eipos/paixu/actions/workflows/preview-exe.yml

## 你截图这种冲突怎么点（script.js）

你截图里的 `script.js` 冲突块，请统一选：

- **Accept incoming change**（也就是 `main`）

不要点 `Accept both changes`，会把重复/冲突逻辑拼在一起，最容易导致“按钮失效、拖拽失效”。
