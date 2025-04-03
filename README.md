# nanarinostyl-lit

[![pnpm v9](https://img.shields.io/badge/maintained%20with-pnpm%209.0-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![nodejs v20](https://img.shields.io/badge/Node.js-v20.17.0-026e00.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

一个 [nanarinostyl](https://nanarino.github.io/nanarinostyl/) 主題的 [lit](https://lit.dev/) 元件合集

## 開發

```bash
pnpm i
pnpm vite
```

### 開發規則

爲了在 html 内能直接引入，lit htnl 模板内不要使用 `<iconify-icon />` (并非 `slot`)

爲了在不安全的域下運行，不要使用安全性高的 API 如 `CSS.paintWorklet`

~~爲了在 win7 裏能勉强運行，lit css 模板内不要使用 chrome 109 以上的 API 如 nesting style~~

## 構建

```bash
pnpm build
```
