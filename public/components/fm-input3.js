class FmInput3 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = ` 
        <style>
            @import "/tailwind.css";
        </style>
        
        
        <div class="tooltip">
            <slot class="block text-sm font-medium text-gray-700" name="label" >Label Not Found</slot>
            <slot class="pl-1.5 py-1.5 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-red-700" name="input">Input not found</slot>
        </div>
        `;
    }
    connectedCallback() {
    }
}

customElements.define('fm-input3', FmInput3);

