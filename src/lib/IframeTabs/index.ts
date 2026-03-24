import { NanarinoLitComponent } from "../base"
import { html, css } from "lit"
import { customElement, property, query, queryAll } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { repeat } from "lit/directives/repeat.js"
import close from "../../assets/close.svg?raw"

export interface IframeTabsProps {
    active?: string
    /**
     * DOM property only
     *
     * in `vue`:
     *
     * ```vue
     * <na-iframe-tabs active="114514" .data="[
     *     { src: '/home', title: 'home', key: '114514', closeable: false }
     * ]" />
     * ```
     *
     */
    data?: IframeAttrs[]
    size?: "md" | "lg"
}

export type IframeAttrs = {
    src: string
    title: string
    key: string
    closeable?: boolean
    outerHTML?: string
}

export interface IframeTabsEmits {
    onTabChange: (
        e: CustomEvent<IframeAttrs>,
    ) => void | boolean | Promise<void> | Promise<boolean>
    onTabClose: (
        e: CustomEvent<IframeAttrs>,
    ) => void | boolean | Promise<void> | Promise<boolean>
}

@customElement("na-iframe-tabs")
export class IframeTabs
    extends NanarinoLitComponent
    implements IframeTabsProps
{
    @property({ type: String }) active: string = ""
    @property({ type: Array, attribute: false }) data: IframeAttrs[] = []
    @property({ type: String }) size: "md" | "lg" = "md"

    @queryAll("iframe")
    iframes!: NodeListOf<HTMLIFrameElement>

    @query("[data-active]>iframe")
    activeIframe?: HTMLIFrameElement

    render() {
        return html`
            <ul class="na-layout-header na-tabs ${this.size}">
                ${repeat(
                    this.data,
                    i => i.key,
                    attrs => {
                        const handleClose = () => {
                            if (attrs.closeable === false) return
                            if (
                                this.renderRoot.dispatchEvent(
                                    new CustomEvent("tab-close", {
                                        bubbles: true,
                                        composed: true,
                                        detail: attrs,
                                        cancelable: true,
                                    }),
                                )
                            ) {
                                const index = this.data.indexOf(attrs)
                                this.data = this.data.filter(
                                    item => item.key !== attrs.key,
                                )
                                if (this.active === attrs.key) {
                                    this.active =
                                        this.data.at(index)?.key ??
                                        this.data.at(-1)?.key ??
                                        ""
                                }
                            }
                        }
                        let pressedInside = false
                        return html`
                            <li
                                class="na-tab"
                                ?data-active=${this.active === attrs.key}
                            >
                                <button
                                    class="na-tab-name"
                                    @click=${(event: MouseEvent) => {
                                        if (
                                            this.renderRoot.dispatchEvent(
                                                new CustomEvent("tab-change", {
                                                    bubbles: true,
                                                    composed: true,
                                                    detail: attrs,
                                                    cancelable: true,
                                                }),
                                            )
                                        ) {
                                            this.active = attrs.key
                                            ;(
                                                event.target as HTMLButtonElement | null
                                            )?.scrollIntoView({
                                                behavior: "smooth",
                                                block: "nearest",
                                                inline: "center",
                                            })
                                        }
                                    }}
                                    @mousedown=${(event: MouseEvent) => {
                                        if (event.button === 1) {
                                            pressedInside = true
                                            event.preventDefault()
                                        }
                                    }}
                                    @mouseup=${(event: MouseEvent) => {
                                        if (
                                            pressedInside &&
                                            event.button === 1
                                        ) {
                                            handleClose()
                                            event.preventDefault()
                                        }
                                        pressedInside = false
                                    }}
                                    @mouseleave=${() => (pressedInside = false)}
                                >
                                    ${attrs.title}
                                </button>
                                <button
                                    class="na-tab-operation"
                                    @click=${handleClose}
                                >
                                    ${unsafeHTML(
                                        (attrs.closeable ?? true) ? close : "",
                                    )}
                                </button>
                            </li>
                        `
                    },
                )}
            </ul>
            <main class="na-layout-content">
                ${repeat(
                    this.data,
                    i => i.key,
                    attrs =>
                        attrs.outerHTML
                            ? html`<div
                                  class="na-tab-panel"
                                  ?data-active=${this.active === attrs.key}
                              >
                                  ${unsafeHTML(attrs.outerHTML)}
                              </div>`
                            : html`<div
                                  class="na-tab-panel"
                                  ?data-active=${this.active === attrs.key}
                              >
                                  <iframe
                                      title="${attrs.title}"
                                      src="${attrs.src}"
                                  ></iframe>
                              </div>`,
                )}
            </main>
        `
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            flex: 1;
            width: 100%;
            gap: 2px;
        }

        main {
            flex: 1;
            overflow-y: hidden;
        }

        .na-tab-panel {
            display: none;
        }

        .na-tab-panel[data-active] {
            display: contents;
        }

        iframe {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: none;
        }

        button svg {
            width: var(--font-size-tabs, var(--font-size-body));
            height: var(--font-size-tabs, var(--font-size-body));
        }
    `
}
