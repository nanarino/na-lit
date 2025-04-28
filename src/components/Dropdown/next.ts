import { NanarinoStylusLitComponent } from "@/components/base"
import { html, css, unsafeCSS } from "lit"
import { customElement, queryAssignedNodes, property } from "lit/decorators.js"
import type { DropdownProps } from "./interface"
export type { DropdownProps } from "./interface"

@customElement("na-dropdown")
export class Dropdown
    extends NanarinoStylusLitComponent
    implements DropdownProps
{
    @property({ attribute: "dialog-popover", type: String }) dialogPopover:
        | "auto"
        | "manual"
        | "hint" = "auto"

    @property({ attribute: "dialog-style", type: String }) dialogStyle: string =
        ""

    @property({ attribute: "closetarget", type: String }) closetarget: string =
        "[slot=dropdown]"

    @property({ attribute: "closesoon", type: String }) closesoon: boolean =
        false

    @queryAssignedNodes()
    defaultSlotNodes!: Array<Node>

    @queryAssignedNodes({ slot: "dropdown", flatten: true })
    dropdownSlotNodes!: Array<Node>

    private _id: string

    constructor() {
        super()
        this._id = crypto.getRandomValues(new Uint32Array(1))[0].toString()
    }

    get dialog() {
        return this.shadowRoot?.getElementById(
            this._id
        ) as HTMLDialogElement | null
    }

    toggle() {
        const dialog = this.dialog
        if (dialog) {
            dialog.togglePopover()
        }
    }

    private async handleToggle(event: ToggleEvent) {
        const dialog = event.target as HTMLDialogElement | null
        if (dialog && event.newState === "open") {
            this._will_close = false
            const wrapper = dialog.parentElement
            if (wrapper) {
                const style: CSSStyleDeclaration =
                    Reflect.get(
                        unsafeCSS(`dialog { ${this.dialogStyle} }`).styleSheet
                            ?.cssRules[0] ?? {},
                        "style"
                    ) ?? {}
                if (style.transform) {
                    dialog.style = `opacity:1;${this.dialogStyle}`
                } else {
                    dialog.style = `transform: translateX(${
                        (wrapper.offsetWidth - dialog.offsetWidth) / 2
                    }px);opacity:1;${this.dialogStyle}`
                }
            }
        }
    }

    private _will_close = false

    private async handleBeforeClose(event: MouseEvent) {
        if (this._will_close) return
        const dialog = this.dialog
        const target = event.target as HTMLElement | null
        if (dialog && target) {
            if (target.closest(this.closetarget)) {
                this._will_close = true
                setTimeout(() => dialog.hidePopover(), this.closesoon ? 0 : 600)
            }
        }
    }

    protected render() {
        return html`<div class="na-popover-wrapper">
            <button popovertarget="${this._id}">
                <slot></slot>
            </button>
            <dialog
                class="na-popover sm"
                id="${this._id}"
                popover="${this.dialogPopover}"
                @toggle=${this.handleToggle}
            >
                <form method="dialog" @click=${this.handleBeforeClose}>
                    <slot name="dropdown"></slot>
                </form>
            </dialog>
        </div>`
    }

    static styles = css`
        :host {
            display: inline-flex;
        }

        .na-popover-wrapper {
            anchor-name: --popover-wrapper;
        }

        .na-popover {
            position-anchor: --popover-wrapper;
            left: anchor(left);
            right: anchor(right);
            top: calc(anchor(bottom) + 8px);
            opacity: 0;
        }

        button {
            padding: 0;
            margin: 0;
            border: 0;
            outline: 0;
            background: none;
        }
    `
}
