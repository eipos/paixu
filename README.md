# Tier List Pro (Desktop)

你只需要做一件事：**下载 exe 后双击就能用（免安装）**。

## Windows 用户：直接下载并使用

### 1) 打开这个页面

- `https://github.com/<owner>/<repo>/releases/latest`

### 2) 点击下载这个文件

- `Tier-List-Pro-Portable.exe`

### 3) 双击运行

- 不需要安装，下载后即可直接使用。
- 如果 Windows 弹出安全提示，点击“更多信息”->“仍要运行”。

---

## 一键直链（可直接发给用户）

把下面链接中的 `<owner>` 和 `<repo>` 换成你的仓库后，就是最终可下载地址：

- `https://github.com/<owner>/<repo>/releases/latest/download/Tier-List-Pro-Portable.exe`

> 文件名已经固定为 `Tier-List-Pro-Portable.exe`，所以这个直链会一直可用（每次自动指向最新版本）。

---

## macOS 下载（可选）

- 文件名：`Tier-List-Pro-macOS.dmg`
- 地址：`https://github.com/<owner>/<repo>/releases/latest/download/Tier-List-Pro-macOS.dmg`

---

## 给维护者：如何自动生成下载文件

仓库已包含自动发布工作流 `.github/workflows/release.yml`。

推送版本标签（如 `v1.0.0`）后，会自动构建并上传：

1. `Tier-List-Pro-Portable.exe`
2. `Tier-List-Pro-macOS.dmg`

示例：

```bash
git tag v1.0.0
git push origin v1.0.0
```
