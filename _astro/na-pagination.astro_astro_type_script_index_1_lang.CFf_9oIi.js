import{E as p,T as f,i as b,N as g,x as c}from"./base.BAJ96deS.js";import{n as o,t as _}from"./property.Dfq2otmO.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(t){return o({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*$(t,e){if(t!==void 0){let r=0;for(const i of t)yield e(i,r++)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m={CHILD:2},y=t=>(...e)=>({_$litDirective$:t,values:e});class w{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,i){this._$Ct=e,this._$AM=r,this._$Ci=i}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class h extends w{constructor(e){if(super(e),this.it=p,e.type!==m.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===p||e==null)return this._t=void 0,this.it=e;if(e===f)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}h.directiveName="unsafeHTML",h.resultType=1;const d=y(h),x=`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4">\r
<path d="M32 8.3999L16.4437 23.9563C16.4437 23.9563 27.3056 34.8182 32 39.5126" stroke-linecap="butt"></path>\r
</svg>`,C=`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4">\r
<path d="M16 39.5127L31.5563 23.9563C31.5563 23.9563 20.6944 13.0944 16 8.4" stroke-linecap="butt"></path>\r
</svg>`;var N=Object.defineProperty,T=Object.getOwnPropertyDescriptor,n=(t,e,r,i)=>{for(var a=i>1?void 0:i?T(e,r):e,l=t.length-1,u;l>=0;l--)(u=t[l])&&(a=(i?u(e,r,a):u(a))||a);return i&&a&&N(e,r,a),a};let s=class extends g{constructor(){super(...arguments),this.index=NaN,this.current=NaN,this.total=NaN,this.onChange=t=>{},this.pages=[],this._will_reset_pages_once=!1}onClick(t){const e=t.target;if(e?.tagName==="BUTTON"){const r=parseInt(e.dataset.to)||0;this.renderRoot.dispatchEvent(new CustomEvent("page-to",{bubbles:!0,composed:!0,detail:r,cancelable:!0}))&&this.onChange?.(this.current=r)}}updated(t){super.updated(t),t.has("index")&&(this.current||=this.index+1||1),t.has("current")&&(this.index||=this.current-1||0),t.has("index")&&t.has("current")&&this.current!==this.index+1&&(console.error("不合法的current或index输入"),[this.index,this.current]=[0,1]),(t.has("total")||t.has("current"))&&(this._will_reset_pages_once||(this._will_reset_pages_once=!0,requestAnimationFrame(()=>{this.reset_pages(),this._will_reset_pages_once=!1})))}reset_pages(){const t=Array.from({length:this.total},(r,i)=>i+1),e=[];for(const r of t)r===this.current?e.push({attribute:{disabled:!0,"data-ellipsis":!1,"data-primary":!0,"data-to":`${r}`},innerText:`${r}`}):this.total<8||Math.abs(r-this.current)<Math.max(t.at(5)-this.current,this.current-t.at(-6),2)||r==t.at(1)&&this.current==t.at(3)||r==t.at(-2)&&this.current==t.at(-4)||r===t.at(0)||r===t.at(-1)?e.push({attribute:{disabled:!1,"data-ellipsis":!1,"data-primary":!1,"data-to":`${r}`},innerText:`${r}`}):(r===t.at(1)||r===t.at(-2))&&e.push({attribute:{disabled:!1,"data-ellipsis":!0,"data-primary":!1},innerText:"..."});this.pages=e}render(){return c`<span
            style=" display: inline-flex;
            gap: 4px;"
            @click=${this.onClick}
        >
            <button
                class="na-button"
                data-primary
                ?disabled="${!this.total||this.current==1}"
                data-to="${this.current-1}"
            >
                ${d(x)}
            </button>
            ${$(this.pages,t=>c`
                    <button
                        class="na-button"
                        ?disabled=${t.attribute.disabled}
                        ?data-primary=${t.attribute["data-primary"]}
                        ?data-ellipsis=${t.attribute["data-ellipsis"]}
                        data-to=${t.attribute["data-to"]}
                    >
                        ${t.innerText}
                    </button>
                `)}
            <button
                class="na-button"
                data-primary
                ?disabled="${!this.total||this.current==this.total}"
                data-to="${this.current+1}"
            >
                ${d(C)}
            </button>
        </span>`}};s.styles=b`
        button {
            --padding-horizonal-button: 0;
            min-width: calc(
                var(--line-height-body, 22px) +
                    var(--padding-vertical-button, 5px) * 2
            );
            min-height: calc(
                var(--line-height-body, 22px) +
                    var(--padding-vertical-button, 5px) * 2
            );
            overflow: hidden;
        }

        button[data-ellipsis] {
            background-color: transparent;
            pointer-events: none;
            color: rgb(var(--gray-5));
        }

        button svg {
            pointer-events: none;
            width: 1em;
            height: 1em;
        }
    `;n([o({type:Number})],s.prototype,"index",2);n([o({type:Number})],s.prototype,"current",2);n([o({type:Number})],s.prototype,"total",2);n([o({type:Function})],s.prototype,"onChange",2);n([v()],s.prototype,"pages",2);s=n([_("na-pagination")],s);
