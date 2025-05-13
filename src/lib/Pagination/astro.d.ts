import { PaginationProps } from "."

declare global {
    namespace astroHTML.JSX {
        interface IntrinsicElements {
            "na-pagination": PaginationProps
        }
    }
}
