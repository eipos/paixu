# Tier List Pro (Desktop)

你只需要点一个链接下载 EXE（免安装）：

## ✅ 直接下载 EXE

- https://github.com/eipos/paixu/releases/latest/download/Tier-List-Pro-Portable.exe

下载后双击 `Tier-List-Pro-Portable.exe` 即可使用。

---

## 打开 404 怎么办？

出现 404 通常是这 3 个原因：

1. 仓库是私有仓库（未登录或无权限会 404）
2. 还没有生成任何 Release（第一次构建未完成）
3. GitHub Actions 还在构建中（通常几分钟）

请先打开：

- Actions 页面： https://github.com/eipos/paixu/actions
- Releases 页面： https://github.com/eipos/paixu/releases

只要 Actions 里 `Build and Release` 成功，`releases/latest/download/...exe` 就会可用。

---

## 我已经帮你做好的自动化（你不用手动打 tag）

现在仓库配置为：

- 每次 push 到 `main` 自动构建
- 自动更新一个 `latest` Release
- 自动上传：
  - `Tier-List-Pro-Portable.exe`
  - `Tier-List-Pro-macOS.dmg`

---

## Windows 安全提示

如果弹出“Windows 已保护你的电脑”：

1. 点击「更多信息」
2. 点击「仍要运行」
