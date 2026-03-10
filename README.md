# Tier List Pro (Desktop)

你要的就是这个（Windows 免安装 EXE）：

## ✅ 直接下载

https://github.com/eipos/paixu/releases/latest/download/Tier-List-Pro-Portable.exe

下载后双击 `Tier-List-Pro-Portable.exe` 直接运行。

---

## 还是 404 的处理（按顺序）

1. 先看这里是否在构建/是否失败：
   - https://github.com/eipos/paixu/actions/workflows/release.yml
2. 构建成功后，再打开下载链接。
3. 如果你没登录 GitHub，先登录（私有仓库会 404）。

---

## 已修复的点

- 工作流已经不再使用 `npm ci`。
- 现在只做 Windows EXE 自动发布（减少失败点，优先保证你能下载 exe）。
- 每次 push 到 `main` 都会自动更新 `latest` Release。
