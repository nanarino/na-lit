# na-lit

[![pnpm v9](https://img.shields.io/badge/maintained%20with-pnpm%209.0-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![nodejs v20](https://img.shields.io/badge/Node.js-v20.17.0-026e00.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

一个 [nanarinostyl](https://nanarino.github.io/stylus/) 主題的 [lit](https://lit.dev/) 元件合集

## 開發

```bash
pnpm i
pnpm vite
```

### 约束

爲了在 html 内能直接引入，lit 模板内不要第三方元件如 `<iconify-icon />`

爲了在不安全的域下運行，不要使用安全性高的 API 如 `CSS.paintWorklet`

~~爲了在 win7 裏能勉强運行，lit css 模板内不要使用 chrome 109 以上的 API 如 nesting style~~

## 構建

```bash
pnpm build
```

## 利用

先要自订構建出 `nanarinostyl` 和 `nanarinostyl-lit`，在 html 引入

```astro
<html lang="zh-TW">
    <head>
        <meta charset="UTF-8" />
        <title>{title}</title>
        <meta name="generator" content={Astro.generator} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/clover.svg" />
        <!-- 把 `nanarinostyl.min.css` 記住它是第幾個 第一個  -->
        <link rel="stylesheet" href="/nanarinostyl.min.css" />
        <style is:inline>
            *:not(:defined) {
                display: none;
            }
        </style>
        <ClientRouter />
        <script is:inline fetchpriority="high" src={themeIIFE}></script>
        <script src="src/client/init"></script>
    </head>
    <body>
        <slot />
    </body>
</html>
```

注冊元件 并為影子 DOM 注入樣式

```ts
// src/client/init.ts

import { NanarinoStylusLitComponent } from "src/assets/nanarinostyl-lit.js"

// 影子DOM内部樣式復用外部的全局樣式 需要保證是[0]
const nanarinostyl = document.styleSheets[0]
for (const css of Array.from(nanarinostyl?.cssRules ?? []).reverse()) {
    NanarinoStylusLitComponent.nanarinoStylus.insertRule(css.cssText)
}
```

頁面中使用

```astro
<section>
    <na-pagination total="36"></na-pagination>
</section>
```
