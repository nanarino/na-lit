import {
    LitElement,
    type CSSResultGroup,
    // unsafeCSS,
    type PropertyValues,
} from "lit"
// import nanarinoStylus from "nanarinostyl?raw"

export abstract class hasLoadedShowLitComponent extends LitElement {
    protected updated(_changed: PropertyValues) {
        this.dataset.loaded = ""
    }
}

export abstract class NanarinoStylusLitComponent extends hasLoadedShowLitComponent {
    // Small hack to include global styles

    private static _styles: CSSResultGroup
    static nanarinoStylus: CSSStyleSheet = new CSSStyleSheet() // unsafeCSS(nanarinoStylus)

    static get styles(): CSSResultGroup {
        const derivedStyles = this._styles || []

        return [
            this.nanarinoStylus,
            ...(Array.isArray(derivedStyles) ? derivedStyles : [derivedStyles]),
        ]
    }

    static set styles(styles: CSSResultGroup) {
        this._styles = styles
    }
}
