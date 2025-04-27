========
Dropdown
========

* ``index.ts`` 使用 ``dialog[popover=auto]+`` 丐版實現，點擊頁面任意位置都會導致自動關閉
* ``next.ts`` 使用 ``dialog[popover=auto style="position-anchor"]`` 完美實現， 需要 Chrome ≥ 125
* ``old.ts`` 使用 ``dialog.show()`` 兼容實現，點擊元件外部無法關閉， Chrome ＜ 114 時使用 比如 WIN 7
