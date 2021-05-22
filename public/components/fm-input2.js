class FmInput2 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = ` 
        <style>      
            @import "/tailwind.css";
            input{
                @apply w-full;
                }
        </style>
        
        
        <div class="tooltip">
            <label class="block text-sm font-medium text-gray-700" for="input">notSlot2</label>
            <slot class="pl-1.5 py-1.5 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-red-700" id="input" name="input" >  </slot>
        </div>
        `;
    }
    connectedCallback() {
        this.shadowRoot.querySelector('label').innerText = this.attributes.label.value
    }
}

customElements.define('fm-input2', FmInput2);

