import { NanarinoStylusLitComponent } from "@/components"
import { html, css } from "lit"
import { customElement, queryAssignedNodes } from "lit/decorators.js"

@customElement("na-dropdown")
export class Dropdown extends NanarinoStylusLitComponent {
    @queryAssignedNodes()
    defaultSlotNodes!: Array<Node>

    @queryAssignedNodes({ slot: "dropdown", flatten: true })
    dropdownSlotNodes!: Array<Node>

    private _id: string

    constructor() {
        super()
        this._id = crypto.getRandomValues(new Uint32Array(1))[0].toString()
    }

    protected render() {
        return html`<div class="na-dropdown-wrapper">
            <button popovertarget="${this._id}">
                <slot></slot>
            </button>
            <dialog id="${this._id}" popover="auto"></dialog>
            <div class="na-dropdown sm">
                <slot name="dropdown"></slot>
            </div>
        </div>`
    }

    static styles = css`
        button {
            padding: 0;
            margin: 0;
            border: 0;
            outline: 0;
            background: none;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        "na-dropdown": Dropdown
    }
}
