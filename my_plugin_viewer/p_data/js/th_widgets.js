/*
// ------------------------------------------
// widgets.js - Apr-2024 , Widgets
// Copyright (c) Thermoline
// http://www.thermoline.co.il
// ------------------------------------------
*/

// ------------------------------------------------------------------
// class viewMeColors
// ------------------------------------------------------------------


class viewMeColors {
  constructor(){
    this.colBgRed = "#de6262";
    this.colBgGreen = "#6ec580";
    this.colBgGray = "#CECECE";
    this.colFgTxt = "#333333";
    this.colBlue = "#63A9DD";

    this.colGaugeGrn = "rgba(50, 200, 50, .75)";
    this.colGaugeYlw = "rgba(250, 250, 50, .75)";
    this.colGaugeRed = "rgba(200, 50, 50, .75)";
  }
    
  get bgRed() { return this.colBgRed; }
  get bgGreen() { return this.colBgGreen; }
  get bgGray() { return this.colBgGray; }
  get fgTxt() { return this.colFgTxt; }
  get blue() { return this.colBlue; }

  get gaugeGrn() { return this.colGaugeGrn; }
  get gaugeYlw() { return this.colGaugeYlw; }
  get gaugeRed() { return this.colGaugeRed; }

} // class viewMeColors 


// ------------------------------------------------------------------
// viewMeAsBool
// ------------------------------------------------------------------

(function($){

$.fn.viewMeAsBool = function (options) {
  // based on https://stackoverflow.com/questions/1034306/public-functions-from-within-a-jquery-plugin

  // dbg // console.log("viewMeAsBool!"); // dbg
  var viewerColors = new viewMeColors();

  var defaults = {
      viewerText: "Viewer Text",
      viewerVal: ["OFF", "ON"],
      viewerColorsBg: [viewerColors.bgGray, viewerColors.bgGreen],
      // viewerColorsFg: [viewerColors.fgTxt, viewerColors.fgTxt],
  };
  var settings = $.extend(defaults, options);
  var $this = this;
    
  if (this.length > 1) {                                       // support multiple elements
      this.each(function() { $(this).viewMeAsBool(options) });
      return this;
  }

    // public methods:

  this.init = function() {

    $this.append( "<div class='viewerText'>" + settings.viewerText + "</div>" );
    $this.append( "<div class='viewerVal'>" + "</div>" );

    $this.addClass("viewerBool");

    var newVal = 0; 
    $this.setVal(newVal);

    return this;
  };


  this.setVal = function(newVal) {

    $this.find(".viewerVal").text(settings.viewerVal[newVal]);
    $this.css({
      // "color": settings.viewerColorsFg[newVal], 
      "background-color": settings.viewerColorsBg[newVal]
    });

    }

  return this.init();	
} // $.fn.viewMeAsBool
})(jQuery);


// ------------------------------------------------------------------
// viewMeRadialGauge
// ------------------------------------------------------------------

(function($){

$.fn.viewMeRadialGauge = function (options) {

  // dbg // console.log("viewMeRadialGauge!"); // dbg
  var viewerColors = new viewMeColors();

  var colorBarProgressDefault = "rgba(50,200,50,.75)"; // green
  var colorBarDefault = "rgba(200,200,200,.75)";

	  

  var defaults = {
      viewerTitle: "",
      // viewerColorsBg: [viewerColors.bgGray],
      // viewerColorsFg: [viewerColors.fgTxt],
      // isHideAvg: true,
      isErr: false,
	  	  
	  numOfDecimals: 1, // == valueDec

    width: 150,
    height: 150,
    //units: "Km/h",
	units: "myVal%", // strDeg, // "Km/h"
	uunits: "%", // strDeg, // "Km/h"
    minValue: 0,
    maxValue: 100,

	// value: 150,
    // valueInt: 3, 
    // valueDec: 1, 

    valueBox: false, // true, 
    /* valueBoxStroke: 0,
    colorValueBoxShadow: 0,
    valueBoxBorderRadius: 0,
    valueTextShadow: 0,
    colorValueBoxBackground: "transparent",
	fontValueSize: 45, */
	// I can always add my own drawing, based on /canvas-gauges/examples/custom-drawings.html
	fontUnitsSize: 50,
	fontNumbersSize: 18,
	colorUnits: "#222",
	numbersMargin: -5,		
	
	fontNumbers: "Verdana",
	fontValue: "Verdana",

	colorMinorTicks: "#cccccc",
	colorMajorTicks: "#cccccc",

    strokeTicks: 0,

    highlights: [],
    highlightsWidth: 5,
	colorPlate: "transparent",
    borderShadowWidth: 0,
    borders: false,
 
    startAngle: 70,
    ticksAngle: 220,

	// needle: false,
    needleType: "line",
    needleWidth: 1,
    needleStart: 6,
    needleCircleSize: 4,
    needleCircleInner: false,
    colorNeedleCircleOuter: "#aaa",
    colorNeedleCircleOuterEnd: "#aaa",
    colorNeedle: "#aaa",
    colorNeedleEnd: "#aaa",

	barWidth: 8,
	barShadow: 3,
    colorBar: colorBarDefault,
    colorBarProgress: colorBarProgressDefault,

    animationDuration: 500,
    animationRule: "linear"	  
  };
  var settings = $.extend(defaults, options);
  var $this = this;
    
  if (this.length > 1) {                                       // support multiple elements
      this.each(function() { $(this).viewMeRadialGauge(options) });
      return this;
  }


  // public methods:
  var gaugeN;

  this.init = function() {

    $this.append("<div class='viewerTitle'>" + settings.viewerTitle + "</div>");

    var idCanvas = $this.attr('id') + "c";
    var vCanvas = "<canvas id='" + idCanvas + "'>" + "</canvas>";

    $this.append("<div class='viewerRadialGauge'>" + vCanvas + "</div>");

    var settingsG = $.extend(settings, { renderTo: idCanvas});
	if (settingsG.majorTicks) {
      settingsG.minValue = settingsG.majorTicks[0];
      settingsG.maxValue = settingsG.majorTicks[settingsG.majorTicks.length - 1];
	}

    gaugeN = new RadialGauge(settingsG).draw(); // thRadialGauge
	
    // $this.setVal(0);
    $this.setErr(settings.isErr);

    return this;
  };


  this.setVal = function(newVal) {
    gaugeN.value = newVal;
	
    var hArr = gaugeN.options.highlights;
    var hItem;
    var hCol = colorBarProgressDefault;

    for (var j=0; j< hArr.length; j++) {
      hItem = hArr[j];
      if ((newVal >= hItem.from) && (newVal <= hItem.to)) {
        //console.log(hItem.color);
    	hCol = hItem.color;
      }
    }
    // console.log(colorBarDefault);
    // console.log(hCol);
    gaugeN.update({
       colorBarProgress: hCol, // "rgba(250,250,50,.75)",
	   units: newVal + gaugeN.options.uunits // val + ' ' + units
    });
	
    // var arr = settings.arr;
    // var count = arr.length;
	// 
	// if (count < 1) { return }
	// 
    // var valMin = arr[0];
    // 
    // $this.find(".viewerValMin").text(valMin.toFixed(settings.numOfDecimals));
  } 
  
  this.setErr = function(newErrVal) {
    if (newErrVal) {
      $this.addClass("viewerErr");
	} else {
      $this.removeClass("viewerErr");
	}
  } 


  return this.init();	
} // $.fn.viewMeRadialGauge
})(jQuery);

// ------------------------------------------------------------------
