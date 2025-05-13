import { DropdownProps } from "."

declare global {
    namespace astroHTML.JSX {
        interface IntrinsicElements {
            "na-dropdown": DropdownProps & {
                children?: any[]
            }
        }
    }
}
