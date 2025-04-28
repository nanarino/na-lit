type cssText = string

export interface DropdownProps extends Omit<Partial<HTMLElement>, "children"> {
    /** 氣泡框彈出模式 */
    "dialog-popover"?: "auto" | "manual" | "hint"
    /** 氣泡框彈出層樣式 */
    "dialog-style"?: cssText
    /** 自動觸發關閉的選擇器 */
    closetarget?: string
    /** 立即關閉 lit 的 boolean 實際是 `'true' | 'false'` 啦 */
    closesoon?: boolean
}
