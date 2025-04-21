import { NanarinoStylusLitComponent } from "@/components/base"
import { html, css } from "lit"
import { customElement, queryAssignedNodes, property } from "lit/decorators.js"

export interface DropdownProps extends Omit<Partial<HTMLElement>, "children"> {
    "dialog-popover"?: "auto" | "manual" | "hint"
}

@customElement("na-dropdown")
export class Dropdown
    extends NanarinoStylusLitComponent
    implements DropdownProps
{
    @property({ attribute: "dialog-popover", type: String }) popover:
        | "auto"
        | "manual"
        | "hint" = "auto"

    get ["dialog-popover"]() {
        return this.popover
    }

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
        return this.shadowRoot?.getElementById(this._id) as HTMLDialogElement
    }

    protected render() {
        return html`<div class="na-dropdown-wrapper">
            <button popovertarget="${this._id}">
                <slot></slot>
            </button>
            <dialog id="${this._id}" popover="${this.popover}"></dialog>
            <div class="na-dropdown sm">
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

declare global {
    interface HTMLElementTagNameMap {
        "na-dropdown": Dropdown
    }
}
