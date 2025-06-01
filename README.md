# na-lit

[![pnpm v9](https://img.shields.io/badge/maintained%20with-pnpm%209.0-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![nodejs v20](https://img.shields.io/badge/Node.js-v20.17.0-026e00.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

一个 [nanarinostyl](https://nanarino.github.io/stylus/) 主題的 [lit](https://lit.dev/) 元件合集

## 開發

```bash
pnpm i
pnpm vite
```

本地開發環境下在 `127.0.0.1` 中會額外引入字體作爲測試

### 约束

爲了在 html 内能直接引入，lit 模板内不要第三方元件如 `<iconify-icon />`

爲了在不安全的域下運行，不要使用安全性高的 API 如 `CSS.paintWorklet`

~~爲了在 win7 裏能勉强運行，lit css 模板内不要使用 chrome 109 以上的 API 如 nesting style~~

## 構建

```bash
pnpm build
```

## 利用

先要自订構建出 nanarinostyl ( `nanarinostyl/dist/style.min.css` ) 和 na-lit ( `dist/na-lit.js` ) 放置在自己專案的 `assets` 或 `public` 目錄中，並且在 html 引入

```astro
<html lang="zh-TW">
    <head>
        <!-- 記住它是第幾個 第一個  -->
        <link rel="stylesheet" href="/nanarinostyl.min.css" />
        <script src="src/index"></script>
    </head>
    <body>
        <slot />
    </body>
</html>
```

注冊元件 并為影子 DOM 注入樣式

```ts
// src/index.ts

import { NanarinoStylusLitComponent } from "@/assets/na-lit.js"

// 影子DOM内部樣式復用外部的全局樣式 需要保證是[0]
const nanarinostyl = document.styleSheets[0]
for (const css of Array.from(nanarinostyl?.cssRules ?? []).reverse()) {
    // 點解要用try 見 https://github.com/nanarino/na-lit/issues/1
    try {
        NanarinoStylusLitComponent.nanarinoStylus.insertRule(css.cssText)
    } catch (error) {
        console.warn(error)
    }
}
```

頁面中使用

```astro
<section>
    <na-pagination total="36"></na-pagination>
</section>
```
