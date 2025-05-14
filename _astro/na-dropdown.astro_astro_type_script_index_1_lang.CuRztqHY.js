import{i as g,N as c,x as h}from"./base.BAJ96deS.js";import{n,t as f}from"./property.Dfq2otmO.js";import{n as d}from"./query-assigned-nodes.C9yERuju.js";var y=Object.defineProperty,u=Object.getOwnPropertyDescriptor,i=(t,e,s,l)=>{for(var r=l>1?void 0:l?u(e,s):e,a=t.length-1,p;a>=0;a--)(p=t[a])&&(r=(l?p(e,s,r):p(r))||r);return l&&r&&y(e,s,r),r};let o=class extends c{constructor(){super(),this.dialogPopover="auto",this.dialogStyle="",this.closetarget="[slot=dropdown]",this.closesoon=!1,this._will_close=!1,this._id=crypto.getRandomValues(new Uint32Array(1))[0].toString()}get dialog(){return this.shadowRoot?.getElementById(this._id)}toggle(){const t=this.dialog;t&&t.togglePopover()}async handleBeforeClose(t){if(this._will_close)return;const e=this.dialog,s=t.target;e&&s&&s.closest(this.closetarget)&&(this._will_close=!0,setTimeout(()=>e.hidePopover(),this.closesoon?0:600))}render(){return h`<div class="na-popover-wrapper">
            <button popovertarget="${this._id}">
                <slot></slot>
            </button>
            <dialog
                class="na-popover sm"
                id="${this._id}"
                popover="${this.dialogPopover}"
                style="${this.dialogStyle}"
            >
                <form method="dialog" @click=${this.handleBeforeClose}>
                    <slot name="dropdown"></slot>
                </form>
            </dialog>
        </div>`}};o.styles=g`
        :host {
            display: inline-flex;
        }

        .na-popover-wrapper {
            anchor-name: --popover-wrapper;
        }

        .na-popover {
            position-anchor: --popover-wrapper;
            left: anchor(center);
            top: calc(anchor(bottom) + 8px);
            transform: translateX(-50%);
        }

        button {
            padding: 0;
            margin: 0;
            border: 0;
            outline: 0;
            background: none;
            font-family: inherit;
            font-style: inherit;
            font-family: inherit;
        }
    `;i([n({attribute:"dialog-popover",type:String})],o.prototype,"dialogPopover",2);i([n({attribute:"dialog-style",type:String})],o.prototype,"dialogStyle",2);i([n({attribute:"closetarget",type:String})],o.prototype,"closetarget",2);i([n({attribute:"closesoon",type:String})],o.prototype,"closesoon",2);i([d()],o.prototype,"defaultSlotNodes",2);i([d({slot:"dropdown",flatten:!0})],o.prototype,"dropdownSlotNodes",2);o=i([f("na-dropdown")],o);
