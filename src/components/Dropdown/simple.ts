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

    protected render() {
        return html`<div class="na-dropdown-wrapper">
            <button popovertarget="${this._id}">
                <slot></slot>
            </button>
            <dialog id="${this._id}" popover="${this.dialogPopover}"></dialog>
            <div class="na-dropdown sm" style="${this.dialogStyle}">
                <slot name="dropdown"></slot>
            </div>
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
