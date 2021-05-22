class FmInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = ` 
        <style>      
            @import "/tailwind.css";
        </style>
           
        <div class="tooltip">
            <label class="block text-sm font-medium text-gray-700" for="input">notSlot</label>
            <input class="pl-1.5 py-1.5 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border border-red-700" id="input" name="input" type="" >
        </div>
        `;
    }
    connectedCallback() {
        const input = this.shadowRoot.querySelector('input')// = this.attributes.type.value
        this.shadowRoot.querySelector('label').textContent = this.attributes.label.value
        for ( let attr of this.attributes){
            if (attr.name !== "class" && attr.name !== 'id' && attr.name !== 'label'){

               // input.attributes[attr.name] = attr.value;

            }
        }
    }
}

customElements.define('fm-input', FmInput);

