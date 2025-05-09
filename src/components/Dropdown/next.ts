import { NanarinoStylusLitComponent } from "@/components/base"
import { html, css } from "lit"
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
                style="${this.dialogStyle}"
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
            left: anchor(center);
            top: calc(anchor(bottom) + 8px);
            transform: translateX(-50%);
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
