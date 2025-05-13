import { NanarinoStylusLitComponent } from "@/components/base"
import { html, css } from "lit"
import { customElement, property } from "lit/decorators.js"

export interface CurrentMomentProps
    extends Omit<Partial<HTMLElement>, "children"> {
    locales?: Intl.LocalesArgument
}

@customElement("na-current-moment")
export class CurrentMoment
    extends NanarinoStylusLitComponent
    implements CurrentMomentProps
{
    date: string = ""
    time: string = ""
    weekday: string = ""
    private timer?: number

    @property({ attribute: "locales", type: String })
    locales: Intl.LocalesArgument = "zh-CN"

    refresh() {
        const now = new Date()
        this.date = now.toLocaleDateString(this.locales, {
            month: "long",
            day: "numeric",
        })
        this.time = now.toLocaleTimeString(this.locales, {
            hour: "2-digit",
            minute: "2-digit",
        })
        this.weekday = now.toLocaleDateString(this.locales, {
            weekday: "long",
        })
        this.requestUpdate()
    }

    constructor() {
        super()
    }

    connectedCallback(): void {
        super.connectedCallback()
        this.refresh()
        this.timer = window.setInterval(() => this.refresh(), 1000 * 60)
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    render() {
        return html`
            <section class="na-paragraph">
                <span>${this.date}</span>
                <span>${this.weekday}</span>
            </section>
            <section class="na-paragraph na-font-mono" data-size="1">
                ${this.time}
            </section>
        `
    }

    static styles = css`
        :host {
            display: inline-grid;
        }

        :host([data-primary]) {
            color: rgb(var(--current-moment-color, var(--primary-7)));
        }

        section.na-paragraph {
            margin: 0;
            display: flex;
            justify-content: space-evenly;
            gap: 0.5em;
        }
    `
}
