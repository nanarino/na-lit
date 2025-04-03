import { LitElement, type CSSResultGroup, unsafeCSS } from "lit"
import nanarinoStylus from "nanarinostyl?raw"

export abstract class NanarinoStylusLitComponent extends LitElement {
    // Small hack to include global styles

    private static _styles: CSSResultGroup

    static get styles(): CSSResultGroup {
        const derivedStyles = this._styles || []
        return [
            unsafeCSS(nanarinoStylus),
            ...(Array.isArray(derivedStyles) ? derivedStyles : [derivedStyles]),
        ]
    }

    static set styles(styles: CSSResultGroup) {
        this._styles = styles
    }
}
