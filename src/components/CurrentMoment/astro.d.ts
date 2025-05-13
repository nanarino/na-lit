import { CurrentMomentProps } from "."

declare global {
    namespace astroHTML.JSX {
        interface IntrinsicElements {
            "na-current-moment": CurrentMomentProps
        }
    }
}
