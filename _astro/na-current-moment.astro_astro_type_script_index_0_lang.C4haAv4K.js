import{i as c,N as h,x as p}from"./base.BAJ96deS.js";import{n as m,t as d}from"./property.Dfq2otmO.js";var u=Object.defineProperty,g=Object.getOwnPropertyDescriptor,l=(t,a,n,s)=>{for(var e=s>1?void 0:s?g(a,n):a,i=t.length-1,o;i>=0;i--)(o=t[i])&&(e=(s?o(a,n,e):o(e))||e);return s&&e&&u(a,n,e),e};let r=class extends h{constructor(){super(),this.date="",this.time="",this.weekday="",this.locales="zh-CN"}refresh(){const t=new Date;this.date=t.toLocaleDateString(this.locales,{month:"long",day:"numeric"}),this.time=t.toLocaleTimeString(this.locales,{hour:"2-digit",minute:"2-digit"}),this.weekday=t.toLocaleDateString(this.locales,{weekday:"long"}),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.refresh(),this.timer=window.setInterval(()=>this.refresh(),1e3*60)}disconnectedCallback(){super.disconnectedCallback(),this.timer&&clearInterval(this.timer)}render(){return p`
            <section class="na-paragraph">
                <span>${this.date}</span>
                <span>${this.weekday}</span>
            </section>
            <section class="na-paragraph na-font-mono" data-size="1">
                ${this.time}
            </section>
        `}};r.styles=c`
        :host {
            display: inline-grid;
        }

        :host([data-primary]) {
            color: rgb(var(--current-moment-color, var(--primary-7)));
        }

        section.na-paragraph {
            margin: 0;
            display: flex;
            justify-content: space-evenly;
            gap: 0.5em;
        }
    `;l([m({attribute:"locales",type:String})],r.prototype,"locales",2);r=l([d("na-current-moment")],r);
