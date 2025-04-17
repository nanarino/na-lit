// 需要引入一下 window上有宣告theme
import type { Theme as _Theme } from "@holy-two/data-theme"
import message from "./message"
import { NanarinoStylusLitComponent } from "@/components"

document.addEventListener("astro:after-swap", () => {
    // 重設明暗主題
    document.documentElement.dataset["theme"] = window.theme
    // 重設消息容器
    message.reset()
})

// 影子DOM内部樣式復用外部的全局樣式 需要保證是[0]
const nanarinostyl = document.styleSheets[0]
for (const css of Array.from(nanarinostyl?.cssRules ?? []).reverse()) {
    NanarinoStylusLitComponent.nanarinoStylus.insertRule(css.cssText)
}
