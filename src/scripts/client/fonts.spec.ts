import { NanarinoStylusLitComponent } from "@/lib/base"

/**
 * 測試非默認字體的效果
 */
function test_set_fonts() {
    if (import.meta.env.DEV && location.hostname === "127.0.0.1") {
        if (!document.getElementById("test:fonts")) {
            const head = document.getElementsByTagName("head")[0]
            const link = document.createElement("link")
            link.id = "test:fonts"
            link.rel = "stylesheet"
            link.type = "text/css"
            link.href = `${import.meta.env.BASE_URL}fonts/index.css`
            link.media = "all"
            link.onload = function () {
                console.log(this)
                for (const css of Array.from(
                    (Reflect.get(this, "sheet")?.cssRules ?? []) as CSSRuleList
                ).reverse()) {
                    try {
                        NanarinoStylusLitComponent.nanarinoStylus.insertRule(
                            css.cssText
                        )
                    } catch (error) {
                        console.warn(error)
                    }
                }
            }
            head.appendChild(link)
        }
        document.documentElement.style.setProperty(
            "--font-family-base",
            "HYWenHei-85W-zh"
        )
    }
}

test_set_fonts()
document.addEventListener("astro:after-swap", test_set_fonts)
