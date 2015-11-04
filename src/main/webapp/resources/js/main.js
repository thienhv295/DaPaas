//Function of Jquery
$(function() {
	L.mapbox.accessToken = 'pk.eyJ1Ijoic3dpcnJsIiwiYSI6Ikc2cUZ4YmsifQ.1mRq1yMZu0pqKWmOIi5IDg';

	var map = new window.Swirrl.GeoMap('map','examples.map-h67hf2ic',baseUrl + '/resources/boundaries/S92000003.json');
	
	var indicator = $('.panel-body ').find('.text-blue').attr("id");
	initAberdeenCity();
	initSlider();
	makeLineChart("Edinburgh, Aberdeen",indicator);
	

	handleLink();
	//handle click on index
	$('div .p_area ').on('click',function (event){
		/*var id  = $(this).closest('progress-bar-l').attr("id");
		console.log(event.target.id);
		if(id ==="overall"){//overall is unclickable
			return
		}*/
		$('div').closest('.on').removeClass("on");
		$( this).closest('.p_area').addClass("on");
		
	 	var slider= JSON.stringify (getSlider());
		makeLineChart("Edinburgh, Aberdeen",indicator,slider);
	})
	
	
	
	
	
});

(function ($, L, window) {
	// CONSTRUCTOR
	
	var GeoMap = (function() {
		var popup = new L.Popup({ autoPan: false });
		var statesLayer;
		var closeTooltip;
		var map;
		var layerArr = [];
		function GeoMap(elementID, mapID, initialBoundaryURL) {
			var lmap = this;
			this.map = L.mapbox.map(elementID, mapID);
			map = this.map;
			this.homeLayer = this.addBoundaryLayer(initialBoundaryURL,this.getHomeStyle());
			
			$.getJSON(baseUrl + '/resources/data/scotland_geo.json').done(function(data) {
				statesLayer = L.geoJson(data,  {
				     style: lmap.getStyle,
				     onEachFeature:lmap.onEachFeature
				}).addTo(lmap.map);
	        });
			
			//Add slide bar into map
			var myControl = L.control({position: 'topleft'});
			myControl.onAdd = function(map) {
				this._div = L.DomUtil.create('div', 'myControl');
				this._div.innerHTML = '<div class="slider_area"><ul><li><span class="slider_tit">Daily life satisfaction</span><div class="slider shor noUi-target noUi-ltr noUi-horizontal noUi-connect"><div class="noUi-base"><div class="noUi-origin noUi-background"><div class="myslider" id="satisfaction"></div></div></div></div></li><li><span class="slider_tit">Level of opportunity</span><div class="slider shor noUi-target noUi-ltr noUi-horizontal noUi-connect"><div class="noUi-base"><div class="noUi-origin noUi-background"><div class="myslider" id="opportunity"></div></div></div></div></li><li><span class="slider_tit">Healthcare level</span><div class="slider shor noUi-target noUi-ltr noUi-horizontal noUi-connect"><div class="noUi-base"><div class="noUi-origin noUi-background"><div class="myslider" id="healthcare"></div></div></div></div></li><li><span class="slider_tit">Environmental needs / efficiency</span><div class="slider shor noUi-target noUi-ltr noUi-horizontal noUi-connect"><div class="noUi-base"><div class="noUi-origin noUi-background"><div class="myslider" id="efficiency"></div></div></div></div></li><li><span class="slider_tit">Safety and security</span><div class="slider shor noUi-target noUi-ltr noUi-horizontal noUi-connect"><div class="noUi-base"><div class="noUi-origin noUi-background"><div class="myslider" id="safety"></div></div></div></div></li><li><span class="slider_tit">Political satisfaction</span><div class="slider shor noUi-target noUi-ltr noUi-horizontal noUi-connect"><div class="noUi-base"><div class="noUi-origin noUi-background"><div class="myslider" id="political"></div></div></div></div></li><li><span class="slider_tit">Financial satisfaction</span><div class="slider shor noUi-target noUi-ltr noUi-horizontal noUi-connect"><div class="noUi-base"><div class="noUi-origin noUi-background"><div class="myslider" id="finance"></div></div></div></div></li><li><span class="slider_tit">Cultural satisfaction</span><div class="slider shor noUi-target noUi-ltr noUi-horizontal noUi-connect"><div class="noUi-base"><div class="noUi-origin noUi-background"><div class="myslider" id="cultural"></div></div></div></div></li></ul></div>';
				return this._div;
			}
			myControl.addTo(lmap.map);
			
			document.getElementsByClassName("myControl")[0].onmouseover = controlEnter;
			document.getElementsByClassName("myControl")[0].onmouseout = controlLeave;
			
			function controlEnter(e) {
				map.dragging.disable();
			}
			function controlLeave() {
				map.dragging.enable();
			}
		};

		// PUBLICLY-CALLABLE API METHODS
		
		GeoMap.prototype.getStyle = function(feature) {
			var active = feature.properties.active;
			if(active) {
				if(active == 1) {
					return {
						weight: 3,
						opacity: 0.3,
						color: 'green',
						fillOpacity: 0.9,
						fillColor: "#ff5722"
					};
				} else {
					return {
						weight: 3,
						opacity: 0.3,
						color: 'green',
						fillOpacity: 0.9,
						fillColor: "#fff7bc"
					};
				}
			} else {
				return {
					weight: 2,
					opacity: 0,
					color: 'green',
					fillOpacity: 0,
					fillColor: "#fff7bc"
				};
			}
		};
		GeoMap.prototype.onEachFeature = function(feature, layer) {
			
			if(feature.properties.active == 2) {
				layerArr.push(layer);
			}
			
			layer.on({
				mousemove: GeoMap.prototype.mousemove,
				mouseout: GeoMap.prototype.mouseout,
				click: GeoMap.prototype.clickToFeature
			});
		}
		
		GeoMap.prototype.mousemove = function(e) {
		     var layer = e.target;
		     
		     popup.setLatLng(e.latlng);
		     popup.setContent('<div class="marker-title">' + layer.feature.properties.title + '</div>');

		     if (!popup._map) popup.openOn(map);
		     	window.clearTimeout(closeTooltip);
		      
		     // highlight feature
		     layer.setStyle({
		         weight: 3,
		         opacity: 0.3,
		         fillOpacity: 0.9
		     });

		     if (!L.Browser.ie && !L.Browser.opera) {
		         layer.bringToFront();
		     }
		};

		GeoMap.prototype.mouseout = function(e) {
			 var layer = e.target;
			 if(!layer.isAcitve)
				 statesLayer.resetStyle(layer);
			 
		     closeTooltip = window.setTimeout(function() {
		          map.closePopup();
		     }, 100);
		};

		GeoMap.prototype.clickToFeature = function(e) {
			 var layer = e.target;
			 var pLayer;
			 //Remove highlight all layer
			 if(layerArr.length > 0) {
				 pLayer = layerArr.shift();
				 if(pLayer.feature.properties.active == 2) {
					 delete pLayer.feature.properties.active;
				 }
				 statesLayer.resetStyle(pLayer);
			 }
			
			 layerArr.push(layer);
			 
			 // set highlight current layer
			 layer.setStyle({
		         weight: 3,
		         opacity: 0.3,
		         fillOpacity: 0.9
		     });
			 
			 map.eachLayer(function(layer) {
				 layer.isAcitve = false;
			 });
			 
			 this.isAcitve = true;
			 
			 $("#map-city").text(layer.feature.properties.title);
			 
//		     map.fitBounds(e.target.getBounds());
			// makeLineChart("Edinburgh," + layer.feature.properties.title);
			 getDataDromSlider();
		};
		
		// 'PRIVATE' IMPLEMENTATION
		GeoMap.prototype.addBoundaryLayer = function(boundaryURL, styleObj) {
			that = this;
			return L.mapbox.featureLayer()
				.loadURL(boundaryURL)
				.addTo(this.map)
				.on('ready', function() {
					this.setStyle(styleObj); // in callback scope, this = the new featureLayer
					that.map.fitBounds(this.getBounds());
				});
		};


		GeoMap.prototype.getHomeStyle = function() {
			return {
				color: '#1c3542',
				fillColor:'#1c3542',
				fillOpacity:'0.2',
				weight:'2'
			};
		};

		GeoMap.prototype.getRolloverStyle = function() {
			return {
				color: '#5d9cec',
				fillColor:'#5d9cec',
				fillOpacity:'0.2',
				weight:'2'
			};
		};

		GeoMap.prototype.removeBoundary = function() {
			this.map.removeLayer(this.rollLayer);
			this.rollLayer = null;
		};

		return GeoMap;
	})();

	window.Swirrl = window.Swirrl || new Object();
	window.Swirrl.GeoMap = GeoMap;

})($, L, window);

//Set global options for Highcharts
Highcharts.setOptions({
    colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263','#6AF9C4']
});
Highcharts.setOptions({
    global : {
        useUTC : false
    }
});
// Define line chart
var LineChart = {
	makeChart: function(settings) {
		var options = {
	        chart: {
	            renderTo: settings.container,
	            defaultSeriesType: 'line'
	        },
	        title: {
	            text: '',
	            x: -20 //center
	        },
	        subtitle: {
	            text: '',
	            x: -20
	        },
	        xAxis: {
	        	 type: 'datetime',
	             labels: {
	                 format: '{value:%Y}',
	                 rotation: 45,
	                 align: 'left'
	             }
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: ''
	        },
	        legend: {
	            enabled: true
	        },
	        series: []
	    };
		callAjaxMakeChart(options, settings);
	}
};

/**
 * Call Ajax to make Line chart
 */
function callAjaxMakeChart(opts, st) {
	
	var container = "#" + opts.chart.renderTo;
	
	$(container).html("");
	$(container).addClass("chart-loading");
	
	$.ajax({
        url: baseUrl + "/" + st.url,
        type: "GET",
        dataType: "json",
        data: st.params,
        success: function(data) {
        	$(container).removeClass("chart-loading");

        	if(data && data != null) {
        		opts.series=data;
                chart = new Highcharts.Chart(opts);
        	}
        }
	});
};
/**
 * Make Line Chart
 * @param data
 */
function makeLineChart(cities,indicator,slider) {
	LineChart.makeChart({
		url: "lineData",
		container: "line-chart",
		params: {
			cities: cities,
			indicator:indicator,
			slider:slider,
		},
	});
}
function showProcess(data){
	var mapcity = $("#map-city").text();
		if(mapcity==="Area"){
			 $("#map-city").text(data.city);
		}
		$(".line2 #efficiency").css("width", data.efficiency+'%');
		$(".line2 #opportunity").css("width", data.opportunity+'%');	
		$(".line2 #finance").css("width", data.finance+'%');
		$(".line2 #safety").css("width", data.safety+'%');	
		$(".line2 #healthcare").css("width", data.healthcare+'%');	
		$(".line2 #satisfaction").css("width", data.satisfaction+'%');
		$(".line2 #overall").css("width", data.overall+'%');
}
function initSlider(){
	console.log("init slider");
	   
    $('.myslider').slider({				
		range: "min",
		min:0,
		max:1,
		value:0.5,
		step:0.1,
        start: function( event, ui ) {
			console.log(ui);
			$(ui.handle).find('.ui-slider-tooltip').show();
			},
			  stop: function( event, ui ) {
				  $(ui.handle).find('.ui-slider-tooltip').hide();
			  },
                 slide: function(event, ui) {
				 $(ui.handle).find('.ui-slider-tooltip').text(ui.value);
				},
				 create: function( event, ui ) {
			var tooltip = $('<div class="ui-slider-tooltip" />').css({
            position: 'absolute',
            top: -18,
            left: -10
			});
        
        $(event.target).find('.ui-slider-handle').append(tooltip).hover(function() {
        	
        	 if(!tooltip.text()){
       		  tooltip.text(0.5);
       		 }
        	tooltip.show()
        }, function() {
        	tooltip.hide()
        });
      },
		 change: getDataDromSlider,
    })
 

}
function getDataDromSlider(e,ui) {
	//changeLinkColor();
	
	var mapcity = $("#map-city").text();
 
	$.ajax({
        url: baseUrl + "/" + "process",
        type: "GET",
        dataType: "json",
        data:{city:mapcity,
        	slider: JSON.stringify (getSlider()),
        	},
        success: function(data) {
        	showProcess(data);
        	//find the selected link with class text-blue
        	var indicator = $('.panel-body ').find('.text-blue').attr("id");
        	var slider= JSON.stringify (getSlider());
        	makeLineChart("Edinburgh," + mapcity,indicator,	slider);
        }

	});
	
}
// get all sliders's value
function getSlider(){
	var satisfaction=$("div#satisfaction.myslider").slider('value');
	var opportunity = $("div#opportunity.myslider").slider('value');
	var healthcare = $("div#healthcare.myslider").slider('value');
	var efficiency = $("div#efficiency.myslider").slider('value');
	var safety = $("div#safety.myslider").slider('value');
	var political = $("div#political.myslider").slider('value');
	var finance = $("div#finance.myslider").slider('value');
	var cultural = $("div#cultural.myslider").slider('value');
	// selected index
	var selectedIndex = $("div .on .line2 .progress-bar-l").attr("id");
	console.log("ID: " + selectedIndex);
	
	var slider = new Object();
	
	slider.satisfaction=satisfaction;
	slider.opportunity=opportunity;
	slider.healthcare=healthcare;
	slider.efficiency=efficiency;
	slider.safety=safety;
	slider.political=political;
	slider.finance=finance;
	slider.cultural=cultural;
	slider.selectedIndex=selectedIndex;
	return slider;
}

function changeLinkColor(){	
	var toFind = $('.panel-body ').find('.text-blue');
	//no link has class text-blue yet
	 if(toFind.length ==0){
		 $("#dental-health").addClass('text-blue');
	 }
}
// gets Aberdeen city to compare with Edinburgh  
function initAberdeenCity(){
	console.log(" initAberdeenCity");
	   
	$.ajax({
        url: baseUrl + "/" + "process",
        type: "GET",
        dataType: "json",
        data:{city:"Aberdeen",},
        success: function(data) {
        showProcess(data);      	
        }

	});  

}
function handleLink(){
	 $('.panel-body p a').click(function(event){
	        $(this).addClass('text-blue');
	        $(this).siblings().removeClass('text-blue');
	        var indicator = this.id;
	    	var slider= JSON.stringify (getSlider());
	        makeLineChart("Edinburgh," + $("#map-city").text(),indicator,slider);

	        
	        event.preventDefault();
	    });
}


