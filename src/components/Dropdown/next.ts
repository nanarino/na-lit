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
        return this.shadowRoot?.getElementById(
            this._id
        ) as HTMLDialogElement | null
    }

    private async handleToggle(event: ToggleEvent) {
        const dialog = event.target as HTMLDialogElement | null
        if (dialog && event.newState === "open") {
            const wrapper = dialog.parentElement
            if (wrapper)
                dialog.style = `transform: translateX(${
                    (wrapper.offsetWidth - dialog.offsetWidth) / 2
                }px);`
        }
    }

    private async handleClose(event: MouseEvent) {
        const dialog = this.dialog
        const target = event.target as HTMLElement | null
        if (dialog && target) {
            if (target.closest("[slot=dropdown]"))
                setTimeout(() => dialog.hidePopover(), 600)
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
                popover="${this.popover}"
                @toggle=${this.handleToggle}
            >
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

        .na-popover-wrapper {
            anchor-name: --popover-wrapper;
        }

        .na-popover {
            position-anchor: --popover-wrapper;
            left: anchor(left);
            right: anchor(right);
            top: calc(anchor(bottom) + 8px);
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
