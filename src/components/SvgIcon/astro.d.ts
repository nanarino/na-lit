import { SvgIconProps } from "."

declare global {
    namespace astroHTML.JSX {
        interface IntrinsicElements {
            "na-svg-icon": SvgIconProps
        }
    }
}
