(function() {

    // Declare apiKey as a global variable
    var apiKey = '20acc0972699ca4133fbee84646f41b9';
    // Replace with your AMap API key and security code
    var securityCode = 'e016b7c8a8df4e14e4e7ec322210f934';

    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
		<style>
          /* Add any custom CSS styles here */
          .map-container {
            background-color: #777799;
            border: 0cap;
            width: 1000px;
            height:900px
          }
        </style>

        <div id="map-container" class="map-container"></div>
    `;
    // Drawing the base boxes.

    class ClassAMap extends HTMLElement {

        constructor() {
            super()
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true)); 
            this._firstConnection = false
                        
            this.securityScriptLoad()
            this.apikeyScriptLoad()
        }

        securityScriptLoad() {

            const securityScript = document.createElement('script')
            securityScript.type = "text/javascript"
            securityScript.defer = true;
            securityScript.innerHTML = `
                window._AMapSecurityConfig = {
                securityJsCode: '${securityCode}',
              }
            `

            document.head.appendChild(securityScript);
        }

        apikeyScriptLoad() {
            const apiScript = document.createElement('script');

            apiScript.src = 'https://webapi.amap.com/loader.js';
            apiScript.defer = true;
            apiScript.addEventListener('load', () => {
            AMapLoader.load({
                key: apiKey,
                plugins: ['AMap.Scale','AMap.ToolBar'],
            })})

            document.head.appendChild(apiScript);
        }

        createAMapInstance() {
           var mapAMap = new AMap.Map(this._shadowRoot.getElementById('map-container'), { 
                        viewMode: '2D',
                        center: [116.397428, 39.90923],
                        zoom:1,
                        resizeEnable: true,
                        version: 2.0
                    });
        }
        createAMapInstance_default() {
           var mapAMap = new AMap.Map(this._shadowRoot.getElementById('map-container'), { 
                        viewMode: '2D',
                        center: [116.397428, 39.90923],
                        zoom:1,
                        resizeEnable: true,
                        version: 2.0,
                        layer: [new AMap.TileLayer()],
                    });
        }
        createAMapInstance_Satellite() {
           var mapAMap = new AMap.Map(this._shadowRoot.getElementById('map-container'), { 
                        viewMode: '2D',
                        center: [116.397428, 39.90923],
                        zoom:1,
                        resizeEnable: true,
                        version: 2.0,
                        layers: [new AMap.TileLayer.Satellite()]
                    });
        }
        createAMapInstance_Satellite_RoadNet() {
           var mapAMap = new AMap.Map(this._shadowRoot.getElementById('map-container'), { 
                        viewMode: '2D',
                        center: [116.397428, 39.90923],
                        zoom:1,
                        resizeEnable: true,
                        version: 2.0,
                        layers: [// 卫星
                        new AMap.TileLayer.Satellite(),
                        // 路网
                        new AMap.TileLayer.RoadNet()
                      ]
                    });
        }

        onCustomWidgetBeforeUpdate(changedProperties)
        {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) 
        {
                    
            if ("securityCode" in changedProperties) {
                this.$securityCode = changedProperties["securityCode"];
            }
            securityCode = this.$securityCode; // place passed in value into global
    
            if ("apiKey" in changedProperties) {
                this.$apiKey = changedProperties["apiKey"];
            }
            apiKey = this.$apiKey; // place passed in value into global

            if (typeof AMap === 'undefined' ) {                
                console.log("AMap is undefined. Please click button to refresh the map.")
            } else {
                var mapAMap = new AMap.Map(this._shadowRoot.getElementById('map-container'), { 
                    viewMode: '2D',
                    zoom:4,
                    resizeEnable: true,
                    version: 2.0
                });
            }

            console.log("onCustomWidgetAfterUpdate(changedProperties) has been called.")
        }
    }

    customElements.define('custom-base-amap', ClassAMap)
})();