# Tier List Pro (Desktop)

这是一个可打包为桌面端的 Tier List 工具，支持导出：

- Windows 免安装版：`exe`（portable）
- macOS 拖拽安装版：`dmg`

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

## 发布建议

建议在 CI（Windows runner + macOS runner）分别执行对应命令，以保证双平台产物稳定输出。
