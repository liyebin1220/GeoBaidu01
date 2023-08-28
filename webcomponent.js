(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
		<style type="text/css">
			#allmap {
   				background-color: #faebd7;
   				width: 400px;
       				height: 400px;
       				margin:0;
	   		}
		</style>
		<script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=eaRmogHU5j9QCWGS1KcLXnLnRIYF9Nyw"></script>
		<title>地图展示</title>
	</head>
	<body>
		<div id="allmap">all in The map</div>
  		<script type="text/javascript">
		    // GL版命名空间为BMapGL
		    // 按住鼠标右键，修改倾斜角和角度
			var map = new BMapGL.Map("allmap");    // 创建Map实例
			map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		</script>
	</body>
	</html>
	
    `;

    customElements.define('com-sap-sample-geobaidu01', class GeoBaidu01 extends HTMLElement {


		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            		this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
            redraw()
        }
        */

        redraw(){
        }
    });
})();
