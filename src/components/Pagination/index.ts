import { NanarinoStylusLitComponent } from "@/components/types"
import { type PropertyValues, html, css } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { map } from "lit/directives/map.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import left from "@/assets/left.svg?raw"
import right from "@/assets/right.svg?raw"

@customElement("na-pagination")
export class Pagination extends NanarinoStylusLitComponent {
    @property({ type: Number }) index: number = NaN
    @property({ type: Number }) current: number = NaN
    @property({ type: Number }) total: number = NaN
    @property({ type: Function }) onChange:
        | ((current: number) => void | Promise<void>)
        | undefined
        | null = (_current: number) => {}
    @state() pages: Array<number> = []

    private onClick(e: PointerEvent | MouseEvent) {
        const target = e.target as HTMLElement | null
        if (target?.tagName === "BUTTON") {
            const to = parseInt(target.dataset.to!) || 0
            if (
                this.renderRoot.dispatchEvent(
                    new CustomEvent("page-to", {
                        bubbles: true,
                        composed: true,
                        detail: to,
                        cancelable: true,
                    })
                )
            )
                this.onChange?.((this.current = to))
        }
    }

    protected updated(changed: PropertyValues) {
        if (changed.has("total"))
            this.pages = Array.from({ length: this.total }, (_, i) => i + 1)
        if (changed.has("index")) this.current ||= this.index + 1 || 1
        if (changed.has("current")) this.index ||= this.current - 1 || 0
        if (changed.has("index") && changed.has("current")) {
            if (this.current !== this.index + 1) {
                console.error("不合法的current或index输入")
                ;[this.index, this.current] = [0, 1]
            }
        }
    }

    protected render() {
        return html`<span
            style=" display: inline-flex;
            gap: 4px;"
            @click=${this.onClick}
        >
            <button
                class="na-button"
                data-primary
                ?disabled="${!this.total || this.current == 1}"
                data-to="${this.current - 1}"
            >
                ${unsafeHTML(left)}
            </button>
            ${map(this.pages, p => {
                if (p === this.current)
                    return html`<button class="na-button" data-primary disabled>
                        ${p}
                    </button>`
                if (
                    this.total < 8 ||
                    Math.abs(p - this.current) <
                        Math.max(
                            this.pages.at(5)! - this.current,
                            this.current - this.pages.at(-6)!,
                            2
                        ) ||
                    (p == this.pages.at(1) &&
                        this.current == this.pages.at(3)) ||
                    (p == this.pages.at(-2) &&
                        this.current == this.pages.at(-4))
                )
                    return html`<button class="na-button" data-to="${p}">
                        ${p}
                    </button>`

                if (p === this.pages.at(0))
                    return html`<button class="na-button" data-to="1">
                        1
                    </button>`
                if (p === this.pages.at(-1))
                    return html`<button class="na-button" data-to="${p}">
                        ${p}
                    </button>`
                if (p === this.pages.at(1))
                    return html`<button class="na-button" data-transparent>
                        ...
                    </button>`
                if (p === this.pages.at(-2))
                    return html`<button class="na-button" data-transparent>
                        ...
                    </button>`
            })}
            <button
                class="na-button"
                data-primary
                ?disabled="${!this.total || this.current == this.total}"
                data-to="${this.current + 1}"
            >
                ${unsafeHTML(right)}
            </button>
        </span>`
    }

    static styles = css`
        button {
            --padding-horizonal-button: 0;
            min-width: calc(
                var(--line-height-body, 22px) +
                    var(--padding-vertical-button, 5px) * 2
            );
            min-height: calc(
                var(--line-height-body, 22px) +
                    var(--padding-vertical-button, 5px) * 2
            );
            overflow: hidden;
        }

        button[data-transparent] {
            background-color: transparent;
            pointer-events: none;
        }
        button svg {
            pointer-events: none;
            width: 1em;
            height: 1em;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        "na-pagination": Pagination
    }
}
