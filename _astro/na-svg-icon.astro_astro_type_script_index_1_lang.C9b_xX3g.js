import{i as h,h as l,x as k}from"./base.BAJ96deS.js";import{n as d,t as u}from"./property.Dfq2otmO.js";import{n as H}from"./query-assigned-nodes.C9yERuju.js";const V=`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="rgb(var(--pinkpurple-6, 217 26 217))" stroke-width="4">\r
<path d="M6 7H10V11H6V7Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M6 23H10V27H6V23Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M6 38H10V42H6V38Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M14 15H18V19H14V15Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M14 31H18V35H14V31Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M22 7H26V11H22V7Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M22 23H26V27H22V23Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M22 38H26V42H22V38Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M30 15H34V19H30V15Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M30 31H34V35H30V31Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M38 7H42V11H38V7Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M38 23H42V27H38V23Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M38 38H42V42H38V38Z" fill="rgb(var(--pinkpurple-6, 217 26 217))" stroke="none" stroke-width="none" stroke-linecap="butt"></path>\r
<path d="M6 7H10V11H6V7Z" stroke-linecap="butt"></path>\r
<path d="M6 23H10V27H6V23Z" stroke-linecap="butt"></path>\r
<path d="M6 38H10V42H6V38Z" stroke-linecap="butt"></path>\r
<path d="M14 15H18V19H14V15Z" stroke-linecap="butt"></path>\r
<path d="M14 31H18V35H14V31Z" stroke-linecap="butt"></path>\r
<path d="M22 7H26V11H22V7Z" stroke-linecap="butt"></path>\r
<path d="M22 23H26V27H22V23Z" stroke-linecap="butt"></path>\r
<path d="M22 38H26V42H22V38Z" stroke-linecap="butt"></path>\r
<path d="M30 15H34V19H30V15Z" stroke-linecap="butt"></path>\r
<path d="M30 31H34V35H30V31Z" stroke-linecap="butt"></path>\r
<path d="M38 7H42V11H38V7Z" stroke-linecap="butt"></path>\r
<path d="M38 23H42V27H38V23Z" stroke-linecap="butt"></path>\r
<path d="M38 38H42V42H38V38Z" stroke-linecap="butt"></path>\r
</svg>`;var c=Object.defineProperty,b=Object.getOwnPropertyDescriptor,i=(t,n,o,p)=>{for(var e=p>1?void 0:p?b(n,o):n,a=t.length-1,s;a>=0;a--)(s=t[a])&&(e=(p?s(n,o,e):s(e))||e);return p&&e&&c(n,o,e),e};let r=class extends l{constructor(){super(...arguments),this.src=""}async load(){if(this.src)try{const t=await fetch(this.src);if(!t.ok)throw new Error(`${t.status}`);this.shadowRoot.innerHTML=await t.text()}catch(t){this.renderRoot.dispatchEvent(new CustomEvent("load-error",{bubbles:!0,composed:!0,detail:t,cancelable:!0}))&&(this.shadowRoot.innerHTML=V)}}updated(t){t.has("src")&&this.load(),super.updated(t)}render(){return k`<slot></slot>`}};r.styles=h`
        :host {
            display: inline-flex;
            width: 1em;
            height: 1em;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    `;i([H()],r.prototype,"defaultSlotNodes",2);i([d({type:String})],r.prototype,"src",2);r=i([u("na-svg-icon")],r);
