# Tier List Pro (Desktop)

这是一个可打包为桌面端的 Tier List 工具，支持导出：

- Windows 免安装版：`exe`（portable）
- macOS 拖拽安装版：`dmg`

## portable exe 下载链接

发布后可直接下载（将 `<owner>` / `<repo>` 替换为你的仓库）：

- `https://github.com/<owner>/<repo>/releases/latest/download/Tier-List-Pro-Portable.exe`

> 说明：该链接依赖固定产物名 `Tier-List-Pro-Portable.exe`，已在 `electron-builder` 中配置。

## 本地开发

```bash
npm install
npm run dev
```

## 打包

```bash
# Windows 便携可执行文件（.exe）
npm run dist:win

# macOS 磁盘镜像（.dmg）
npm run dist:mac

# 同时打包 win + mac
npm run dist
```

构建产物默认输出到 `release/` 目录。

## 自动发布（推荐）

仓库已包含 GitHub Actions 工作流：`.github/workflows/release.yml`。

当你推送 tag（如 `v1.0.0`）后，会自动：

1. 在 Windows runner 构建 `Tier-List-Pro-Portable.exe`
2. 在 macOS runner 构建 `Tier-List-Pro-macOS.dmg`
3. 将两个文件上传到对应 GitHub Release

示例：

```bash
git tag v1.0.0
git push origin v1.0.0
```
