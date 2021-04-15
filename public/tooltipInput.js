class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipPointer;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = ` 
        <style>      

            .tooltip{
                position: relative;
            }              
            
            #smth{
                width: 50px;
                height: 50px;
                background: red;
            }
            
            #hide{
                display: none;
                position: absolute;
                 top: 25px;
                  left: 0px;
                  padding: 5px 8px;
                  background: #1a1a1a;
                  color: #fff;
                  z-index: 9;
                  font-size: 0.75em;
                  height: 18px;
                  line-height: 18px;
                  -webkit-border-radius: 3px;
                  -moz-border-radius: 3px;
                  border-radius: 3px;
                  white-space: nowrap;
                  word-wrap: normal;
            }
            #prepend{
                      content: '';
              /* hides the tooltip when not hovered */
              display: none;
              content: '';
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-bottom: 5px solid #1a1a1a;
              position: absolute;
              top: 20px;
              left: 35px;
              z-index: 8;
              font-size: 0;
              line-height: 0;
              width: 0;
              height: 0;
            }

        </style>
        
        <div class="tooltip">
            <slot id="input" name="input"></slot>
            <div id="prepend"></div>
            <span id="hide"></span>
        </div>
        
        `;
    }
    connectedCallback() {
        if (this.hasAttribute('text')){
            this._tooltipContainer = this.shadowRoot.querySelector('#hide');
            this._tooltipContainer.innerText = this.getAttribute('text')
            this._tooltipPointer = this.shadowRoot.querySelector('#prepend')
        }
        this.addEventListener('mouseenter', this._showTooltip.bind(this));
        this.addEventListener('mouseleave', this._hideTooltip.bind(this));
    }

    _showTooltip() {
        this._tooltipContainer.style.display = 'block'
        this._tooltipPointer.style.display = 'block'
    }

    _hideTooltip(){
        this._tooltipContainer.style.display = 'none'
        this._tooltipPointer.style.display = 'none'
    }
}

customElements.define('fullajtar-tooltip', Tooltip);

