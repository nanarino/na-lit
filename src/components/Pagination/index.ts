import { NanarinoStylusLitComponent } from "@/components/base"
import { type PropertyValues, html, css } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { map } from "lit/directives/map.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import left from "@/assets/left.svg?raw"
import right from "@/assets/right.svg?raw"

export interface PaginationProps
    extends Omit<Partial<HTMLElement>, "children"> {
    index?: number
    current?: number
    total?: number
    onChange?: ((current: number) => void | Promise<void>) | undefined | null
}

export interface PageButton {
    attribute: {
        disabled: boolean
        "data-ellipsis": boolean
        "data-primary": boolean
        "data-to"?: string
    }
    innerText: string
}

@customElement("na-pagination")
export class Pagination
    extends NanarinoStylusLitComponent
    implements PaginationProps
{
    @property({ type: Number }) index: number = NaN
    @property({ type: Number }) current: number = NaN
    @property({ type: Number }) total: number = NaN
    @property({ type: Function }) onChange:
        | ((current: number) => void | Promise<void>)
        | undefined
        | null = (_current: number) => {}
    @state() pages: Array<PageButton> = []

    private _will_reset_pages_once = false

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
        super.updated(changed)
        if (changed.has("index")) this.current ||= this.index + 1 || 1
        if (changed.has("current")) this.index ||= this.current - 1 || 0
        if (changed.has("index") && changed.has("current")) {
            if (this.current !== this.index + 1) {
                console.error("不合法的current或index输入")
                ;[this.index, this.current] = [0, 1]
            }
        }
        if (changed.has("total") || changed.has("current")) {
            if (!this._will_reset_pages_once) {
                this._will_reset_pages_once = true
                requestAnimationFrame(() => {
                    this.reset_pages()
                    this._will_reset_pages_once = false
                })
            }
        }
    }

    private reset_pages() {
        const idx = Array.from({ length: this.total }, (_, i) => i + 1)
        const pages: PageButton[] = []
        for (const i of idx) {
            if (i === this.current) {
                pages.push({
                    attribute: {
                        disabled: true,
                        "data-ellipsis": false,
                        "data-primary": true,
                        "data-to": `${i}`,
                    },
                    innerText: `${i}`,
                })
            } else if (
                this.total < 8 ||
                Math.abs(i - this.current) <
                    Math.max(
                        idx.at(5)! - this.current,
                        this.current - idx.at(-6)!,
                        2
                    ) ||
                (i == idx.at(1) && this.current == idx.at(3)) ||
                (i == idx.at(-2) && this.current == idx.at(-4)) ||
                i === idx.at(0) ||
                i === idx.at(-1)
            ) {
                pages.push({
                    attribute: {
                        disabled: false,
                        "data-ellipsis": false,
                        "data-primary": false,
                        "data-to": `${i}`,
                    },
                    innerText: `${i}`,
                })
            } else if (i === idx.at(1) || i === idx.at(-2)) {
                pages.push({
                    attribute: {
                        disabled: false,
                        "data-ellipsis": true,
                        "data-primary": false,
                    },
                    innerText: `...`,
                })
            }
        }
        this.pages = pages
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
            ${map(
                this.pages as PageButton[],
                btn => html`
                    <button
                        class="na-button"
                        ?disabled=${btn.attribute.disabled}
                        ?data-primary=${btn.attribute["data-primary"]}
                        ?data-ellipsis=${btn.attribute["data-ellipsis"]}
                        data-to=${btn.attribute["data-to"]}
                    >
                        ${btn.innerText}
                    </button>
                `
            )}
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

        button[data-ellipsis] {
            background-color: transparent;
            pointer-events: none;
            color: rgb(var(--gray-5));
        }

        button svg {
            pointer-events: none;
            width: 1em;
            height: 1em;
        }
    `
}
