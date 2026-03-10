# Merge Conflict Guide（避免功能再次失效）

如果 GitHub 提示冲突，请按下面规则，不要再点“两个都接受”。

## 必选规则

- **JSON / YAML / JS / HTML / CSS 文件**：
  - 不要选“两个都接受”（非常容易导致语法错乱或逻辑重复）。
  - 一般优先选 **Incoming change（main）**，再手动补你自己的改动。

## 本项目建议

- `package.json` / `package-lock.json`：优先 **Incoming（main）**
- `.github/workflows/release.yml`：优先 **Incoming（main）**
- `script.js` / `index.html` / `styles.css`：优先 **Incoming（main）**，再手动迁移你的修改
- `README.md`：可手动合并文本，但不要保留冲突标记

## 合并后自检（必须做）

1. 搜索冲突标记（必须为 0）：
   - `<<<<<<<`
   - `=======`
   - `>>>>>>>`
2. 本地启动页面后，至少验证：
   - 可新增等级
   - 可拖入图片
   - 可拖动等级排序
3. 确认构建能产出：
   - `release/Tier-List-Pro-Portable.exe`
