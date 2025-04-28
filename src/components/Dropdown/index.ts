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

    private async handleOpen(event: MouseEvent) {
        const dialog = this.dialog
        if (dialog) {
            dialog.style = this.dialogStyle
            dialog.open = !dialog.open
        }
    }
    private async handleClose(event: MouseEvent) {
        const dialog = this.dialog
        const target = event.target as HTMLElement | null
        if (dialog && target) {
            if (target.closest(this.closetarget))
                setTimeout(
                    () => (dialog.open = false),
                    this.closesoon ? 0 : 600
                )
        }
    }

    protected render() {
        return html`<div class="na-dropdown-wrapper">
            <button @click=${this.handleOpen}>
                <slot></slot>
            </button>
            <dialog class="na-dropdown sm" id="${this._id}">
                <form method="dialog" @click=${this.handleClose}>
                    <slot name="dropdown"></slot>
                </form>
            </dialog>
        </div>`
    }

    static styles = css`
        :host {
            display: inline-flex;
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
