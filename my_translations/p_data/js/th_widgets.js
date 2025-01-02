/*
// ------------------------------------------------------------------
// th_widgets.js - Widgets, PLC, Pages, ...
//   Jun-2024 [EN, FMS]
// Copyright (c) Thermoline
// http://www.thermoline.co.il
// ------------------------------------------------------------------
*/

// ------------------------------------------------------------------
// class viewMeColors
// ------------------------------------------------------------------


class viewMeColors {
  constructor(){
    this.colBgRed = "#de6262";      // rgba(222, 98, 98, 1)
    this.colBgGreen = "#6ec580";    // rgba(110, 197, 128, 1)
    this.colBgGray = "#CECECE";     // rgba(206, 206, 206, 1)
    this.colFgTxt = "#333333";      // rgba(51, 51, 51, 1)
    this.colBgTxt = "#ffffff";      // rgba(255, 255, 255, 1)
    this.colBlue = "#63A9DD";       // rgba(99, 169, 221, 1)
    this.colBlueDxl = "#105189";    // rgba(16, 81, 137, 1) // or #004a8e

    this.colBgBlue = "rgba(99, 169, 221, 0.5)";       // rgba(99, 169, 221, 1)
    this.col4_bg = "#97d5f1";             /* rgba(151, 213, 241, 1); */
    this.col4_bg_light = "rgba(151, 213, 241, 0.6)";
    this.col4_bg_lighter = "rgba(151, 213, 241, 0.4)";

    this.colGaugeGrn = "rgba(50, 200, 50, .75)";
    this.colGaugeYlw = "rgba(250, 250, 50, .75)";
    this.colGaugeRed = "rgba(200, 50, 50, .75)";
  }
    
  get bgRed() { return this.colBgRed; }
  get bgGreen() { return this.colBgGreen; }
  get bgGray() { return this.colBgGray; }
  get fgTxt() { return this.colFgTxt; }
  get bgTxt() { return this.colBgTxt; }
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
      viewerText: "Viewer Text",  // const string or array, e.g. ["textOFF", "textON"]
      viewerVal: ["OFF", "ON"],
      viewerColorsBg: [viewerColors.bgGray, viewerColors.bgGreen],
      // viewerColorsFg: [viewerColors.fgTxt, viewerColors.fgTxt],
      initVal: null
  };
  var settings = $.extend(defaults, options);
  var $this = this;
    
  if (this.length > 1) {                                       // support multiple elements
      this.each(function() { $(this).viewMeAsBool(options) });
      return this;
  }

  // public methods:

  this.init = function() {

    // $this.append( "<div class='viewerText'>" + settings.viewerText + "</div>" );
    if (settings.viewerText instanceof Array) { // need to change the text
      $this.append( "<div class='viewerText'>" + "" + "</div>" );
    } else {
      $this.append( "<div class='viewerText'>" + settings.viewerText + "</div>" );
    }


    $this.append( "<div class='viewerVal'>" + "</div>" );

    $this.addClass("viewerBool");

    // var newVal = 0; 
    // $this.setVal(newVal);

    if (settings.initVal !== null) {   // if (settings.initVal) fails for zero value
      $this.setVal(settings.initVal);
    } else {
      var newVal = 0; 
      $this.setVal(newVal);
    }

    return this;
  };


  this.setVal = function(newVal) {

    $this.find(".viewerVal").text(settings.viewerVal[newVal]);
	
    // var myArr = (t.myVal instanceof Array) ? t.myVal : new Array(n).fill(t.myVal);
    if (settings.viewerText instanceof Array) { // need to change the text
      $this.find(".viewerText").text(settings.viewerText[newVal]);
    }

    $this.css({
      // "color": settings.viewerColorsFg[newVal], 
      "background-color": settings.viewerColorsBg[newVal]
    });

    $this.attr("data-val", newVal);                        // usefull for CSS rule, e.g. .viewerBool[data-val="1"] { }
    // $this.find(".viewerVal").attr("data-val", newVal);  // https://css-tricks.com/a-complete-guide-to-data-attributes/

  }

  return this.init();	
} // $.fn.viewMeAsBool
})(jQuery);

// ------------------------------------------------------------------
// viewMeAsString
// ------------------------------------------------------------------

(function($){

$.fn.viewMeAsString = function (options) {

  // dbg // console.log("viewMeAsString!"); // dbg
  var viewerColors = new viewMeColors();

  var defaults = {
      viewerText: "Viewer Text",
      viewerVal: "viewer Val",
      viewerColorBg: viewerColors.bgTxt,
      viewerColorFg: viewerColors.fgTxt,
      initVal: null
  };
  var settings = $.extend(defaults, options);
  var $this = this;
    
  if (this.length > 1) {                                       // support multiple elements
      this.each(function() { $(this).viewMeAsString(options) });
      return this;
  }

  // public methods:

  this.init = function() {

    $this.append( "<div class='viewerText'>" + settings.viewerText + "</div>" );
    $this.append( "<div class='viewerVal'>" + "</div>" );

    $this.addClass("viewerString");

    // var newVal = ""; 
    // $this.setVal(newVal);

    if (settings.initVal !== null) {   // if (settings.initVal) fails for empty string value
      $this.setVal(settings.initVal);
    } else {
      var newVal = ""; 
      $this.setVal(newVal);
    }

    return this;
  };


  this.setVal = function(newVal) {
	  
    $this.find(".viewerVal").text(newVal);
    // wgtVal = newVal;

  }

  return this.init();	
} // $.fn.viewMeAsString
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
    
    initVal: null,

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
    if (settingsG.initVal !== null) {   // if (settingsG.initVal) fails for zero value
      $this.setVal(settingsG.initVal);
    }

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
// editMe
// ------------------------------------------------------------------

(function($){

$.fn.editMe = function (options) {

  // dbg // console.log("editMe!"); // dbg
  var viewerColors = new viewMeColors();

  var defaults = {
      viewerText: "Viewer Text",
      viewerVal: "viewer Val",
      viewerText_i18n_key: "",
	  
	  valType: "txt", //  "txt" | "numeric-desc" | ... todo ...
	    // old types:                     
	    // .hmi-txt,                     
	    // .hmi-numeric,                
	    // .hmi-numeric10,              
	    // .hmi-numeric-range,
	    // .hmi-numeric10-range, 
	    // .hmi-numeric-time,
	    // .hmi-numeric-time10,  
	    // .hmi-numeric-desc,
	    // .hmi-txt-desc 

     viewerColorsBg: [viewerColors.bgTxt, viewerColors.bgTxt],
     viewerColorsFg: [viewerColors.fgTxt, viewerColors.fgTxt],

      rw: "r",
      dxlVar: "",

      desc_viewerVals: ["OFF", "ON"],

      txt_inputType: "", // "" | "password" | ...
      txt_inputMaxLen: 5,

      // extraText: "", // search for iPro web project with example... 
      // int_min: 0,
      // int_max: 100,
      // int_units: "",

  };
  var settings = $.extend(defaults, options);
  var $this = this;
  // var self = this;
    
  if (this.length > 1) {                                       // support multiple elements
      this.each(function() { $(this).editMe(options) });
      return this;
  }




/**
 * Return the corrct PLC variable name for Dixell cgi-bin functions // created: 130714 //
 */
  function fVarName(varName) {
    var varNameForCgi = varName.toUpperCase();

    var idx1 = varNameForCgi.indexOf("-", 0); // find Array index
    if (idx1 >= 0) {
        var strName = varNameForCgi.substring(0, idx1);
        var strIndex = varNameForCgi.substring(idx1 + 1);
        // dbg // console.log("hmiWidget..fVarName, Array!!! " + varName + "strName:" + strName + ", strIndex:" + strIndex);
        varNameForCgi = strName + "[" + strIndex + "]";
    }

    // dbg // console.log("hmiWidget..fVarName, varName:" + varName + "  -> " + varNameForCgi);
    return varNameForCgi;
  }


  function setDxlValue(newVal) {  // Updates the tag with a new value; writing to server
    var varName = settings.dxlVar;
    var strURLWhole = "/cgi-bin/jsetvar.cgi";

    if (varName) {
      strURLWhole = "/cgi-bin/jsetvar.cgi" + "?name=" + this.fVarName(varName) + "&value=" + newVal;
      // dbg // console.log("hmiWidget..setDxlValue: " + strURLWhole);
    }

    $.ajax({
      url: strURLWhole,
      cache: false        // DIXELL todo: better add "complete: cbArray"
    });
  }


  // public methods:

  this.getDefaultVal = function() {
    switch( settings.valType) {
      case "txt": return ""; break;
      case "numeric-desc": return 0; break;
      default: return 0;
    }
  }

  var wgtVal = $this.getDefaultVal(); // 0;

  this.init = function() {

    var i18n_key = (settings.viewerText_i18n_key) ? " data-i18n='" + settings.viewerText_i18n_key + "' " : "";
    $this.append( "<div class='viewerText' " + i18n_key + " >" + settings.viewerText + "</div>" );

    // $this.append( "<div class='viewerText'>" + settings.viewerText + "</div>" );
    $this.append( "<div class='viewerVal'>" + "</div>" );

    $this.addClass("wgtEdit");
    $this.addClass("wgtEdit-type-" + settings.valType);
    if (settings.rw == "r") { $this.addClass( "wgt-read-only" ); } 

    var newVal = $this.getDefaultVal(); 
    $this.setValGui(newVal);
    wgtVal = newVal;

    if ( settings.rw === 'w' || settings.rw === 'rw' ) {
        $this.find(".viewerVal").click( function () {
            $this.showKeyPad();
        } );
    }

    return this;
  };


  this.getValKeyPad = function() { // todo: does not work!
    var newVal;
    switch( settings.valType) {
      case "txt": 
          newVal = $("#nField").val();
	  break;
      case "numeric-desc": 
          // newVal = $("#nField option:selected").val();
          // newVal = $("#nField option:checked").val();
          newVal = $("#nField").val();
	  break;
      default: // do nothing...
    }

   console.log($("#nField")); // dbg
   console.log(newVal); // dbg
   return newVal;

  }
  
  this.setValGui = function(newVal) {

    switch( settings.valType) {
      case "txt": 
          $this.find(".viewerVal").text(newVal);
	  break;
      case "numeric-desc": 
          $this.find(".viewerVal").text(settings.viewerVal[newVal]);
          $this.css({
            "color": settings.viewerColorsFg[newVal], 
            "background-color": settings.viewerColorsBg[newVal]
          });
          for (var i = 0; i < settings.viewerVal.length; i++) {
		    $this.removeClass("wgtEdit-val-" + i);
          }
          $this.addClass("wgtEdit-val-" + newVal);
	  break;
      default: // do nothing...
    }

    // wgtVal = newVal;

  }

  this.setVal = function(newVal) {

    $this.setValGui(newVal);
    wgtVal = newVal;

  }

  this.showKeyPad = function() {
    // dbg // console.log("editMe showKeyPad " + wgtVal); // dbg

    $("#modalDlg_setVal_template").clone().appendTo("#boxes"). attr('id', 'modalDlg_KeyPad'); // Copy the element 	

	var txtDesc = $this.find(".viewerText").text();
    $("#modalDlg_KeyPad .modalDlgTxt1").text(""); 
    $("#modalDlg_KeyPad .modalDlgTxt2").text(""); 

    switch( settings.valType) {
      case "txt": 
          var strInputType = (settings.txt_inputType.length == 0) ? '' : '  type="' + settings.txt_inputType + '"';
          var strInputMaxLen = ' maxlength="' + settings.txt_inputMaxLen + '" ';
          var strInput = '<input name="nField" id="nField" value="" ' + strInputType + strInputMaxLen + ' >'; 
          var strInputDesc = '<span class="text">' + txtDesc + ': </span>';
          
          $("#modalDlg_KeyPad").find(".modalDlgInput").append(strInputDesc + strInput);
          $("#nField").val(wgtVal);
	  break;
      case "numeric-desc": 
          var strOptions = "";
          var strSelected;
          for (var i = 0; i < settings.viewerVal.length; i++) {
            strSelected = (i == wgtVal) ? ' selected="selected" ' : ''; // todo: optVal
            strOptions += '<option value="' + i + '" ' + strSelected + '>' + settings.viewerVal[i] + '</option>';  // optVal, optText
          }
          var strInput = '<select name="nField" id="nField" >' + strOptions + '</select>';
          var strInputDesc = '<span class="text">' + txtDesc + ': </span>';

          $("#modalDlg_KeyPad").find(".modalDlgInput").append(strInputDesc + strInput);

	  break;
      default: // do nothing...
    }

    dialog_open("#modalDlg_KeyPad", $(this));
	$("#nField").focus();


    function closeKeyPad() {  
      // 
      dialog_close(); // hides the mask. 
      // $("#modalDlg_KeyPad").empty();
      $("#modalDlg_KeyPad").remove();
    }

    $('#modalDlg_KeyPad .btnSetValSave').click(function() {
      // todo: setval(newval); + set dxl var
      console.log("btnSetValSave"); // dbg
      var newVal = $this.getValKeyPad();
      var isOk = true;

/*
        var decimalRegex = /^\-?[0-9]*\.?[0-9]+$/ //Decimal regular expression for checking the value
        if ( decimalRegex.test( newVal ) ) {
          if ((newVal > me.max) || (newVal < me.min)) {
            isOK = false;  // err: val not in range.
            set_status_msg("kpd_errMsg", "Please insert value in range:" + strMin + ' .. ' + strMax, 5000);

          }

        } else {
          isOK = false;  // err: Please insert numeric values.
          set_status_msg("kpd_errMsg", "Please insert numeric values:" + strMin + ' .. ' + strMax, 5000);
        }

            newValue = parseFloat( newValue );

            if (this.min !== null && this.max !== null) {
                     if (newValue > this.max) {
                       newValue = this.max
                     } else {
                       if (newValue < this.min) {
                         newValue = this.min
                       }
                     }

*/


      if (isOk) {
        $this.setVal(newVal); 
        if (settings.dxlVar.length > 0) {
          setDxlValue(newVal);
        }
        closeKeyPad();
      } else {
        // todo: kpd_errMsg ...
      }
      return false;
    });
        
    $('#modalDlg_KeyPad .btnSetValCancel').click(function() { 
      console.log("btnSetValCancel"); // dbg
      closeKeyPad(); 
	  return false;
    });

  }

  this.closeKeyPad = function() { // modalDlg_setVal_Close() { // taken from "j_utility.js"
    // dbg // console.log("fLinksClose()");
    // $("#modalDlgH").text("");
    $("#modalDlg_KeyPad .modalDlgTxt1").text(""); 
    $("#modalDlg_KeyPad .modalDlgTxt2").text(""); 
    $("#modalDlg_KeyPad .modalDlgInput").html("");
    
    dialog_close();
  }

/* the following are added to each "editMe" item
  $('#btnSetValSave').click(function() {
    // todo: setval(newval); + set dxl var
  // console.log(this); // the button
  // console.log($this); // the parent class
   console.log("btnSetValSave"); // dbg
     var newVal = $this.getValKeyPad();
    $this.setVal(newVal); 
    $this.closeKeyPad();  // dialog_close(); // closeKeyPad(); 
	return false;
  });
      
  $('#btnSetValCancel').click(function() { 
    $this.closeKeyPad(); 
	return false;
  });
  
 
  this.onKeyPadSave = function() {
    console.log("onKeyPadSave"); // dbg
    var newVal = $this.getValKeyPad();
    $this.setVal(newVal); 
    $this.closeKeyPad();  // dialog_close(); // closeKeyPad(); 
	return false;
  }

  $('#btnSetValSave').off( "click", $this.onKeyPadSave ); // remove any previously added events 
  $('#btnSetValSave').on( "click", $this.onKeyPadSave);

  $('#btnSetValCancel').on( "click", function() {
    $this.closeKeyPad(); 
	return false;
  });
  */

  return this.init();	
} // $.fn.editMe
})(jQuery);



// ------------------------------------------------------------------
// Dxl login:
// ------------------------------------------------------------------

function LoginEn() { // login on both user site and control panel
	if (magcheck_login($("#user").val(), $("#pass").val()) == true) {
		/* if the check returns true, the user and password match */
		/* here we put a redirect to the main page after the login */
		window.location.replace("/index_main.html");
	} else {
		/* if the check returns false, the user and password missmatch */
		/* here we put an error message in case of wrong login */
		$("#errMsg").text("Login error");
		$("#user").val("");
		$("#pass").val("");
	}
}

function LogoutEn() { // works coupled with the function LogoutRedirect() that must be called as Body onunload event.

	/* logout for the current user */
	magcheck_logout();
	/* clean up the login cookie if still exists */
	if (readCookie("dixe_pass") != null) {
		eraseCookie("dixe_pass");
		dixe_forget();
	}
	/* redirect to the homepage/login page */
	window.location.replace("/index.html");
}

function getUser() { // check which user is logged in. Return the username of the user.
	var user = "John Doe"; // magcheck_user();
    return user;
}


// ------------------------------------------------------------------
// PLC Data:
// ------------------------------------------------------------------

var AJAX_CGI_URL = "/cgi-bin/xjgetvar.cgi";

function doSetVar(varName, varValue) {
  var strURL = set_cgi + "?name=" + varName + "&value=" + varValue;

  request = $.ajax({
    url: strURL,
    cache: false,
    complete: function(data) {
      // dbg // console.log("complete: " + data);
    },
    success: function(data) {  // Note: Since jQuery 1.8, .success, .error and .complete are deprecated in favor of .done, .fail and .always.
      // dbg // console.log("success: " + data);
    }
  });
}

function getAjaxData(AJAX_PARAMS, fCallBack) {
  // do nothing!
//  var jqxhr = $.ajax({
//		type: "GET",
//		url: AJAX_CGI_URL,
//		dataType : 'json',
//		cache: false,
//		data: { name: AJAX_PARAMS }
//		})
//		.done(function( obj ) {
//			fCallBack(obj);
//		})
//		.fail(function( obj ) {
//			// dbg // console.log("fail:" + obj); // did not get here.
//		})
//		.always(function( obj ) {
//		});
}

function getUpdatedData(AJAX_PARAMS, TimeOut, fCallBack) {
	getAjaxData(AJAX_PARAMS, fCallBack);
	window.setTimeout(function(){ getUpdatedData(AJAX_PARAMS, TimeOut, fCallBack);}, TimeOut);
}

function getDataOnce(AJAX_PARAMS, fCallBack) {
	getAjaxData(AJAX_PARAMS, fCallBack);
}



function toDec10(strVal) { // usefull for calculations
  var val10 = parseInt(strVal, 10) / 10;
  return val10;
}

function toBool(strVal) {
  if (strVal == "1")
    return true;
  else
    return false;
}

function toDescHour(hVal) {

  var hh = Math.floor( hVal / 60);
  var mm = hVal % 60;

  if (String(hh).length == 1) {
    hh = "0" + hh;
  }
  if (String(mm).length == 1) {
    mm = "0" + mm;
  }

  var retTime = String(hh) + ":" + String(mm);
  return retTime;
}

function toDescDay(dVal) {
  switch (dVal){
    case 0 : return "Sunday"; break;
    case 1 : return "Monday"; break;
    case 2 : return "Tuesday"; break;
    case 3 : return "Wednesday"; break;
    case 4 : return "Thursday"; break;
    case 5 : return "Friday"; break;
    case 6 : return "Saturday"; break;
    default : return "day???"; break;  // should not get here!
  }
}

function toPrbMainType(pVal, isLongFormat) {
  // [0=Temperature, 1=Pression ,2=RH,3=EC,4=PH,5=CO2]
  if (typeof(isLongFormat)==='undefined') isLongFormat = true;
  switch (pVal){
    case 0 : return ( (isLongFormat) ? "Temperature" : "Temp"); break;
    case 1 : return "Pressure"; break;
    case 2 : return "RH"; break;
    case 3 : return "EC"; break;
    case 4 : return "PH"; break;
    case 5 : return "CO2"; break;
    default : return "type???"; break;  // should not get here!
  }
}

function toPrbHysMax_byMainType(pVal, factor) {
  // [0=Temperature, 1=Pression ,2=RH,3=EC,4=PH,5=CO2]
  if (typeof(isLongFormat)==='undefined') isLongFormat = true;
  switch (pVal){
    case 0 : return 20 * factor; break;   //  "Temp";
    case 1 : return 20 * factor; break;   //  "Pressure";
    case 2 : return 20 * factor; break;   //  "RH";
    case 3 : return 20 * factor; break;   //  "EC";
    case 4 : return 20 * factor; break;   //  "PH";
    case 5 : return 200 * factor; break;  //  "CO2";
    default : return 20 * factor; break;  //  "type???";    // should not get here!
  }
}

function toPrbSubType(pVal) {
  switch (pVal){
    case 0 : return "NTC"; break;
    case 1 : return "PTC"; break;
    case 2 : return "2..20mA"; break;
    case 3 : return "4..20mA"; break;
    case 4 : return "0..10V"; break;
    case 5 : return "0..1V"; break;
    case 6 : return "0..5V"; break;
    default : return "type???"; break;  // should not get here!
  }
}

function toPrbUnit(pVal) {
  // [0=C,1=F,2=bar,3=psi,4=%,5=ppm,6=us/cm,7=ms/cm,8=pH)
  switch (pVal){
    case 0 : return String.fromCharCode(176) + "C"; break;
    case 1 : return String.fromCharCode(176) + "F"; break;
    case 2 : return "bar"; break;
    case 3 : return "psi"; break;
    case 4 : return "%"; break;
    case 5 : return "ppm"; break;
    case 6 : return "us/cm"; break;
    case 7 : return "ms/cm"; break;
    case 8 : return "pH"; break;
    default : return "unit???"; break;  // should not get here!
  }
}

function toLogCycle(pVal) {
  switch (pVal){
    case 1 : return 10; break;            //  "10s"
    case 2 : return 20; break;            //  "20s"
    case 3 : return 30; break;            //  "30s"
    case 4 : return 1 * 60; break;        //  "1m"
    case 5 : return 2 * 60; break;        //  "2m"
    case 6 : return 5 * 60; break;        //  "5m"
    case 7 : return 10 * 60; break;       //  "10m"
    case 8 : return 15 * 60; break;       //  "15m"
    case 9 : return 30 * 60; break;       //  "30m"
    case 10 : return 1 * 60 * 60; break;  //  "1h"
    default : return "cycle???"; break;  // should not get here!
  }
}

function fGetArrIndex(varNamePLC) {  // e.g. varNamePLC == "ALARM_LINK_1[5]" // => arrIndexPLC := 5;
  var idx1 = varNamePLC.indexOf("[", 0);
  var idx2 = varNamePLC.indexOf("]", idx1);
  var strArrIndex = varNamePLC.substring(idx1 + 1, idx2);
  var arrIndexPLC = parseInt(strArrIndex, 10);
  return arrIndexPLC;
}

function fGetArrName(varNamePLC) {  // e.g. varNamePLC == "ALARM_LINK[5]" // => arrName := "ALARM_LINK";
  var idx1 = varNamePLC.indexOf("[", 0);
  var arrName = varNamePLC.substring(0, idx1);
  return arrName;
}


function set_status_msg(msgId, msgTxt, msgTime){
  $("#" + msgId).text(msgTxt);
  $("#" + msgId).addClass("msgShow");
  $("#" + msgId).slideDown();
  if (msgTime) {
    // setTimeout(function(){$("#" + msgId).slideUp(); }, msgTime);
    setTimeout(function(){ hide_status_msg(msgId); }, msgTime);
  }
}

function hide_status_msg(msgId){
  $("#" + msgId).slideUp();
  $("#" + msgId).removeClass("msgShow");
}


// ------------------------------------------------------------------
// Save\Load  data:
// ------------------------------------------------------------------

  const TH_DATA_KEY_NAME = "thData";

  function thData_getDeafaultObj() {
    var obj = {
      project: "", 
      userData: {
        lang: "en",
        view: "",
      }
    }; 
    return obj;
  }

  function thData_getObj() {
    try {
      var obj = JSON.parse(localStorage.getItem(TH_DATA_KEY_NAME));
      if (obj) {
        // do nothing
      } else {
        obj = thData_getDeafaultObj();
      }
     return obj;
    } catch(e) {
      return null;
    }
     console.log("thData_getObj() ???");
  }

  function thData_setObj(obj) {
    try {
      localStorage.setItem(TH_DATA_KEY_NAME, JSON.stringify(obj)); 
      return obj;
    } catch(e) {
      return null;
    }
  }

  function thData_updateDataLang(newVal) {
    try {
      var obj = thData_getObj();
      obj.userData.lang = newVal;
      return thData_setObj(obj);  // obj | null
    } catch(e) {
      return null;
    }
  }

  function thData_load(fCallBack) {
    try {
      var obj = thData_getObj();
      if (obj) {
        $('#user_lang').val(obj.userData.lang);
        $('#user_view').val(obj.userData.view);
        fCallBack(obj);
      }
    } catch(e) {
      return false;
    }
  }


// ------------------------------------------------------------------
// Page template:
// ------------------------------------------------------------------

function templateStart(selectedMenu, selectedSubMenu) { // doTemplate()
  // old code:  buildHeaderLogo(), buildMainMenu(), buildSubMenu(), buildResponsiveMenu(), buildFooter(), getUser(), tmplUpdate(), 
  templateHeader();
  templateSideBar(selectedMenu, selectedSubMenu);
  // templateFooter();
  templateUser();
  templateUpdate();

  $(".grid-container-root").removeClass("hide-sidebar"); // open all pages with sidebar
  thData_load(templateUpdateUIbyThData);

}


function templateHeader() {

/* 
// ------------------------------------------------------------------
Language dropdown based on flags from 
  https://flagpedia.net/download/icons 
  e.g. https://flagcdn.com/w20/us.png
  
240619 Note: my FireFox also supprts flags emoji. my Chrome doesnot support it.
  HE &#x1f1ee;&#x1f1f1;
  FR &#x1f1eb;&#x1f1f7;
  EN &#x1f1fa;&#x1f1f8;
// ------------------------------------------------------------------
*/

  var h = "";

  //  // h += "  <a href='http://www.dixell.co.il' target='_blank'><img src='/p_data/images/logo_dixell.gif' alt='Logo' /></a>";
  //  // h += "  <a href='http://www.dixell.co.il' target='_blank'><img class='imgL' src='/p_data/images/logo_dixell_white.png' alt='Logo' /></a> "; 
  //  // h += "  <img class='imgR' src='/p_data/images/logo_emerson_white.png' alt='Logo' style='xmax-width:165px' />";
  //  // h += "  <img              src='/p_data/images/logo_emerson.gif' alt='Logo' />";
  //  // h += "  <span id='SiteName'>SiteName . . .</span> ";
  //  
  //  h += "<div class='imgL'><img src='/p_data/images/logo_miko.png' alt='Logo' style='width: 156px; ' ></div>";
  //  h += "<div class='imgR'>&nbsp;</div>";
  //  // h += "<!-- <div class='imgL'><a href='http://www.dixell.co.il' target='_blank'><img src='/p_data/images/logo_dixell_bg_white.gif' alt='Logo'></a> </div> -->";
  //  // h += "<!-- <div class='imgC'><img src='/p_data/images/logo1.gif' alt='Logo'> </div> -->";   //  distinct, header2cells|header3cells 
  //  // h += "<!-- <div class='imgR'><img src='/p_data/images/logo2.png' alt='Logo' style='width:156px'></div> -->";

  var btnToggle = "<button id='btnToggleSidebar' class='btnToggleSidebar' >&#8803;</button>"; // <!-- ≡ -->
  var logo1 = "[My Logo]"; // "<img src='/p_data/images/logo_miko.png' alt='Logo' style='width: 156px; ' />";

  // var user = "";
  // user += "<div class='tdUser'>";
  // user += "&#128100; User: <b><span id='user' >???</span></b>";
  // user += "<br />";
  // user += "<a id='loginLink' href='/index.html'>Login</a>";
  // user += "<a id='logoutLink' href='#' onclick='LogoutEn(); return false;'>Logout</a>";
  // user += "</div>";


  var ddUser = "";
  ddUser += "<div class='dropdown dropdown-user'>";
  ddUser += "<div class='dropdown-button'><div class='dropdown-item' ><div>&#128100;</div><div data-i18n='header_user' >User</div></div></div>";
  ddUser += "<div class='dropdown-content'>";
  ddUser += "<div class='dropdown-item' >";
  ddUser += "<b><span id='user' >???</span></b>";
  ddUser += "</div>";
  ddUser += "<div class='dropdown-item' >";
  ddUser += "<a id='loginLink' href='/index.html' data-i18n='header_login' >Login</a>";
  ddUser += "<a id='logoutLink' href='#' onclick='LogoutEn(); return false;' data-i18n='header_logout' >Logout</a>";
  ddUser += "</div>";
  ddUser += "</div>";
  ddUser += "</div>";


  var ddLang = "";
  ddLang += "<div class='dropdown dropdown-lang'>";
  ddLang += "<div class='dropdown-button'><div id='langSelected' class='dropdown-item' data-lang='EN'><img src='/p_data/images/flag_us.png' alt='EN Flag'> <span class='langId' >EN</span></div></div>";
  ddLang += "<div class='dropdown-content'>";
  ddLang += "<div class='dropdown-item' data-lang='EN'><img src='../p_data/images/flag_us.png' alt='EN Flag'><span class='langId' >EN</span></div>";
  // ddLang += "<div class='dropdown-item' data-lang='FR'><img src='../p_data/images/flag_fr.png' alt='FR Flag'><span class='langId' >FR</span></div>";
  ddLang += "<div class='dropdown-item' data-lang='IL'><img src='../p_data/images/flag_il.png' alt='IL Flag'><span class='langId' >IL</span></div>";
  ddLang += "</div>";
  ddLang += "</div>";

  h += "<div class='header-group-start'>";
  h += "<div class='header-item'>" + btnToggle + "</div>";
  h += "<div class='header-item imgL'>" + logo1 + "</div>";
  h += "</div>";
  h += "<div class='header-group-end'>";
  h += "<div class='header-item tdChangeLang'>EN \\ HE</div>";
  h += "<div class='header-item'>" + ddUser + "</div>";
  h += "<div class='header-item'>" + ddLang + "</div>";
  h += "</div>";

  $("#tmplHeader").append(h);
  // $("#tmplHeader").addClass("header2cells");  // distinct: header2cells|header3cells


  $(".dropdown-button").click( function () { // General dropdown
    $(this).parent().find(".dropdown-button").toggleClass('show'); // == this
    $(this).parent().find(".dropdown-content").toggleClass('show');
  });

  $(".dropdown-lang .dropdown-content .dropdown-item").click( function () { // Language dropdown

    const selectedLangId = this.getAttribute('data-lang');
    const selectedImgSrc =  $(this).find("img").prop('src');

    $("#langSelected .langId").text(selectedLangId);	
	$('#langSelected img').prop('src', selectedImgSrc);

	var thData = thData_updateDataLang(selectedLangId.toLowerCase())
	// already in templateUpdateUIbyThData() // templateTranslateTo(selectedLangId.toLowerCase()); // note: does not work with local files
    templateUpdateUIbyThData(thData);

	const objDropDown = $(this).parent().parent();
    objDropDown.find(".dropdown-button").removeClass('show');
    objDropDown.find(".dropdown-content").removeClass('show');
  });



}

function templateFooter() {

  // var f = "";
  // 
  // f += "<div class='footer-vers'>";
  // f += "<a href='/panel/index.html'><span id='appRelease'>appRelease</span></a>";
  // f += "</div>";
  // f += "<div class='footer-date'>";
  // f += "<div id='strHoliday' >strHoliday</div>";
  // f += "<div id='my_ipro_date'>date  time</div>"; 
  // f += "<div id='dayInWeek'>day</div>";
  // f += "</div>";
  // 
  // $("#tmplFooter").append(h);

}


function templateSideBar(selectedMenu, selectedSubMenu) {

  var isNotLimited = (selectedMenu != "Limited");
  var strShowSubCls = " liShow ";
  var strShowSub;

  var s = "";

  s += "<h2 class='tdSite' id='cSiteName' >Site Name</h2>";

  s += "<div class='tdInfoDate'>";
  s += "<span class='dayInWeekContainer'>";  // ltr | rtl
  // s += "<span id='dayInWeek'>day</span>";
  s += "<span id='dayInWeek'>"
  s += "<span data-i18n='dayInWeek_0'>0</span>"
  s += "<span data-i18n='dayInWeek_1'>1</span>"
  s += "<span data-i18n='dayInWeek_2'>2</span>"
  s += "<span data-i18n='dayInWeek_3'>3</span>"
  s += "<span data-i18n='dayInWeek_4'>4</span>"
  s += "<span data-i18n='dayInWeek_5'>5</span>"
  s += "<span data-i18n='dayInWeek_6'>6</span>"
  s += "</span>";
  s += "<span>, </span>";
  s += "<span id='my_ipro_date'>date  time</span>"; 
  s += "</span>";
  s += "<span id='strHoliday' >strHoliday</span>";
  s += "<div id='strAppRelease' ><a href='#' xhref='/panel/index.html'><span id='appRelease'>appRelease</span></a></div>";
  s += "</div>";

  if (isNotLimited) {
    s += "<ul class='navMain'>";
    // s += "<li id='cm1' ><a data-i18n='cm1_sm0_Dashboard' href='/index_main.html' >Dashboard</a></li>"; 
    // 
    // s += "<li id='cm2' ><a data-i18n='cm2_sm0_Analog' href='/prb_view/probes.html' >Analog</a></li>";
    // strShowSub = (selectedMenu == "m2") ? strShowSubCls : "";  
    
    // s += " <li class='liSub" + strShowSub + "' id='cm2_sm1' ><a data-i18n='cm2_sm1_View' href='/prb_view/probes.html' >View</a></li>";
    // s += " <li class='liSub" + strShowSub + "' id='cm2_sm2' ><a data-i18n='cm2_sm2_Config' href='/prb_config/prb_config.html' >Configuration</a></li>";
    // s += " <li class='liSub" + strShowSub + "' id='cm2_sm3' ><a data-i18n='cm2_sm3_Calib' href='/prb_calib/prb_calib.html' >Calibration</a></li>";   // new iPro // must use shorter names // prb_calibration
    // s += " <li class='liSub" + strShowSub + "' id='cm2_sm4' ><a data-i18n='cm2_sm4_Alarms' href='/prb_alarms/prb_alarms.html' >Alarms</a></li>";
    // 
    // s += "<li id='cm3' ><a data-i18n='cm3_sm0_Digital' href='/dig_view/dig_view.html' >Digital</a></li>";
    // strShowSub = (selectedMenu == "m3") ? strShowSubCls : "";  
    // 
    // s += " <li class='liSub" + strShowSub + "' id='cm3_sm1' ><a data-i18n='cm3_sm1_View' href='/dig_view/dig_view.html' >View</a></li>";
    // s += " <li class='liSub" + strShowSub + "' id='cm3_sm2' ><a data-i18n='cm3_sm2_Config' href='/dig_config/dig_config.html' >Configuration</a></li>";
    // s += " <li class='liSub" + strShowSub + "' id='cm3_sm3' ><a data-i18n='cm3_sm3_Alarms' href='/dig_alarms/dig_alarms.html' >Alarms</a></li>";
    // 
    s += "<li id='cm4' ><a data-i18n='cm4_sm0_Settings' href='#' xhref='/set_general/set_general.html' >Settings</a></li>";
    strShowSub = (selectedMenu == "m4") ? strShowSubCls : "";  
	// 
    // s += " <li class='liSub" + strShowSub + "' id='cm4_sm1' ><a data-i18n='cm4_sm1_General' href='/set_general/set_general.html' >General</a></li>";
    // s += " <li class='liSub" + strShowSub + "' id='cm4_sm2' ><a data-i18n='cm4_sm2_Email' href='/set_email/set_email.html' >Email</a></li>";
    // s += " <li class='liSub" + strShowSub + " liSubSep' ><div></div></li>";	
    s += " <li class='liSub" + strShowSub + "' id='cm4_sm3' ><a data-i18n='cm4_sm3_Backup' href='../tools_backup/tools_backup.html' >Backup</a></li>";
    s += " <li class='liSub" + strShowSub + "' id='cm4_sm4' ><a data-i18n='cm4_sm4_Restore' href='../tools_restore/tools_restore.html' >Restore</a></li>";

    // s += "<li id='cm6' ><a data-i18n='cm6_sm0_Analyse' href='/analyse/check_tanks.html' >Analyse</a></li>";  
    // strShowSub = (selectedMenu == "m6") ? strShowSubCls : "";  
	// 
    // s += "<li id='cm5' ><a data-i18n='cm5_sm0_History' href='/history_data/history.html' >History</a></li>"; //  <!-- /log/log.html -->
    // strShowSub = (selectedMenu == "m5") ? strShowSubCls : "";  
	// 
    // s += " <li class='liSub" + strShowSub + "' id='cm5_sm1' ><a data-i18n='cm5_sm1_Tanks' href='/history_data/history.html' >Tanks</a></li>";
    // s += " <li class='liSub" + strShowSub + "' id='cm5_sm2' ><a data-i18n='cm5_sm2_Using' href='/history_data/his_using.html' >Tanks Using</a></li>";
    // s += " <li class='liSub" + strShowSub + "' id='cm5_sm3' ><a data-i18n='cm5_sm3_Filling' href='/history_data/his_filling.html' >Tanks Filling</a></li>";

    s += "</ul>";

  } // if (isNotLimited) 


  $("#tmplSideBar").append(s);

  // var btnToggle = "<button id='btnToggleSidebar' class='btnToggleSidebar' >&#8803;</button>"; // <!-- ≡ -->
  // $("#tmplMain").prepend(btnToggle);  // append as first child
  
  $('#btnToggleSidebar').click(function(){
    $(".grid-container-root").toggleClass("hide-sidebar");
  });

  if (isNotLimited) {
    // each page need to set [class='linksMenuActive'] manually:
    $("#c" + selectedMenu).addClass("linksMenuActive");
    unwrap_a_element($("#c" + selectedMenu + " a")); // $("#c" + selectedMenu + " a").contents().unwrap(); // Find all the text nodes inside, and remove <a>

   if ( selectedSubMenu.trim().length > 0 ) {
     $("#c" + selectedMenu + "_" + selectedSubMenu).addClass("linksMenuActive");
     unwrap_a_element($("#c" + selectedMenu + "_" + selectedSubMenu + " a")); // $("#c" + selectedMenu + "_" + selectedSubMenu + " a").contents().unwrap(); // remove <a>
   }
  } // if (isNotLimited)
  
}

function unwrap_a_element(objContainer) {
  // simple unwrap()
  // objContainer.contents().unwrap(); // Find all the text nodes inside, and remove <a>

  // copy attribute and then unwrap()
  var $span = $('<span>').text(objContainer.text());
  $span.attr('data-i18n', objContainer.attr('data-i18n')); // Copy the data-i18n attribute
  objContainer.replaceWith($span);                         // Replace the <a> container with the span
}  
  
function templateUser() {

  var user = getUser();

  $("#user").text(" " + user);
  
  $("#loginLink").hide();
  $("#logoutLink").hide();
  
  if ( !user ) { // check for empty strings (""), null, undefined, false
  	$("#loginLink").show();
  } else {
  	$("#logoutLink").show();
  }
  
}


function tmplDay(dayInWeek) {  // 0..6

  $("#dayInWeek [data-i18n]").removeClass(); // remove all classes
  $("#dayInWeek [data-i18n='dayInWeek_" + dayInWeek + "']").addClass("currentDay"); // remove all classes

  // switch (dayInWeek) {  // 0..6
  //   case 0: $("#dayInWeek").text("Sunday"); break;
  //   case 1: $("#dayInWeek").text("Monday"); break;
  //   case 2: $("#dayInWeek").text("Tuesday"); break;
  //   case 3: $("#dayInWeek").text("Wednesday"); break;
  //   case 4: $("#dayInWeek").text("Thursday"); break;
  //   case 5: $("#dayInWeek").text("Friday"); break;
  //   case 6: $("#dayInWeek").text("Saturday"); break;
  //   // case 0: $("#dayInWeek").text("יום ראשון"); break;   // Sunday
  //   // case 1: $("#dayInWeek").text("יום שני"); break;     // Monday
  //   // case 2: $("#dayInWeek").text("יום שלישי"); break;   // Tuesday
  //   // case 3: $("#dayInWeek").text("יום רביעי"); break;   // Wednesday
  //   // case 4: $("#dayInWeek").text("יום חמישי"); break;   // Thursday
  //   // case 5: $("#dayInWeek").text("יום שישי"); break;    //  Friday
  //   // case 6: $("#dayInWeek").text("שבת"); break;         // Saturday
  // }  // switch
}


function tmplHolyday(holidayName) {
  $("#strHoliday").text(holidayName); // get str val from array item
  var h = $("#strHoliday").text();    // actual string. not array containing string.
  if (h.length > 0) {
    // in css rule, // $("#strHoliday").css("border", "1px solid #ffffff");
    // in css rule, // $("#strHoliday").css("padding", "0 5px");
  } else {
    $("#strHoliday").hide(); // css("display", "none");
  }
}


function templateUpdate() { // tmplUpdate() {
    var paramOnce = "";
    paramOnce += "ApplicationRelease|";
    paramOnce += "SiteName|";

    var paramOften = "";
    paramOften += "MyDayWeek|";
    paramOften += "Time_Date_Footer|"; // new iPro //

    tmplHolyday(""); // distinct... // paramOften += "HOLIDAY_NAME|";  // distinct // might contain holiday-eve.name	

    var paramVeryOften = "";
    // paramVeryOften += "SYSTEM_ONOFF|"; // distinct 

    paramOnce = paramOnce.toUpperCase(); getDataOnce(paramOnce, tmplUpdateData);

    var timer = 1000 * 60;  // 60 seconds - 1 minute.
    // disabledOnNewiPro_getUpdatedStatus(timer);

    timer = 1000 * 60 * 60;  // 1 hour.
    paramOften = paramOften.toUpperCase(); getUpdatedData(paramOften, timer, tmplUpdateData);

    timer = 1000 * 20;  // 20 seconds.
    // paramVeryOften = paramVeryOften.toUpperCase(); getUpdatedData(paramVeryOften, timer, tmplUpdateData);
}


function tmplUpdateData(obj) {

    var varName, varVal;
    for(var i = 0; i < obj.values.length; i++) {
      varName = obj.values[i].name;
      varVal = obj.values[i].value;
      switch (varName) {

        case "APPLICATIONRELEASE": $("#appRelease").text(varVal); break;

        case "MYDAYWEEK": var dayInWeek = parseInt(varVal, 10); tmplDay(dayInWeek); break; // 0..6
        case "TIME_DATE_FOOTER" : $("#my_ipro_date").text(varVal); break; // new iPro

        case "SITENAME": $("#SiteName").text(varVal); $("#cSiteName").text(varVal); break;

        // case "START": var isStart = toBool(varVal); tmplStart(isStart); break;
        // case "SYSTEM_ONOFF": var onOff = toBoolStrOnOff(varVal); $("#onOff").text(onOff); break;
        // case "HOLIDAY_NAME": tmplHolyday(varVal); break;

        default:
          // dbg // console.log(" * * *  case ??? *" + varName + "* ? ? ? "); // should not get here!
          break;
      }  // switch
    }  // for
  }


  function templateUpdateUIbyThData(obj) {
    // note: to use this function, call thData_load(templateUpdateUIbyThData)
    if (obj) {
      var proj = obj.project;
      var uLang = obj.userData.lang;
      var uView = obj.userData.view;
      // dbg // console.log(obj); // dbg //

      const selectedLangId = uLang.toUpperCase();
      const selectedImgSrc =  $('.dropdown-lang .dropdown-content .dropdown-item[data-lang="' + selectedLangId + '"]').find("img").prop('src');
      $("#langSelected .langId").text(selectedLangId);	
	  $('#langSelected img').prop('src', selectedImgSrc);

      $('body').attr('data-lang-i18n', selectedLangId);
      templateTranslateTo(uLang); // note: does not work with local files
 
      switch (selectedLangId){
        case "IL" : // rtl
          $(".rrttll_by_i18n").removeClass("llttrr").addClass("rrttll");	
		break;    
        default : // ltr
          $(".rrttll_by_i18n").removeClass("rrttll").addClass("llttrr");	
		break;   
      }

 
      // dbg // alert('Data loaded from local storage');
    } else {
      // dbg // alert('No data found in local storage');
    }
  }
  
  function templateTranslateTo(langId) {
    // note: This function does not work with local files, only with web files from the same origin.

    // $.getJSON('/p_data/i18n/lang_' + langId + '.json', function(result) {
    $.getJSON('../p_data/i18n/lang_' + langId + '.json', function(result) {
      $('[data-i18n]').each(function() { // $('.txt').each(function() {
        var key = $(this).data('i18n'); // attribute data-i18n.value
        if (result[key]) {
          $(this).text(result[key]);
        }
      });
    }).fail(function() {
      // dbg // console.error('Failed to load translations.');
    });
  }



// ------------------------------------------------------------------
// hmi widgets:
// ------------------------------------------------------------------

  function updateWidget(objWidgetId, newVal) {
    if (typeof hmiMgr != 'undefined') {
      var objWidget = hmiMgr.getWidget(objWidgetId);
      if (objWidget) {
        objWidget.setValue('value', newVal);
        // dbg // console.log("updateWidget: " + objWidgetId + " := " + newVal + " !");
      } else {
       // dbg // console.log("updateWidget: " + objWidgetId + " := " + newVal + " not found !");
      }
    }
  }

  function updateWidgetUnit(objWidgetId, newVal) {
    if (typeof hmiMgr != 'undefined') {
      var objWidget = hmiMgr.getWidget(objWidgetId);
      if (objWidget) {
        objWidget.setUnits(newVal);
        // dbg // console.log("updateWidget: " + objWidgetId + " := " + newVal + " !");
      } else {
       // dbg // console.log("updateWidget: " + objWidgetId + " := " + newVal + " not found !");
      }
    }
  }

  function updateWidgetMin(objWidgetId, newVal) {
    if (typeof hmiMgr != 'undefined') {
      var objWidget = hmiMgr.getWidget(objWidgetId);
      if (objWidget) {
        objWidget.min = newVal;
        // dbg // console.log("updateWidget: " + objWidgetId + " := " + newVal + " !");
      } else {
       // dbg // console.log("updateWidget: " + objWidgetId + " := " + newVal + " not found !");
      }
    }
  }

  function updateWidgetMax(objWidgetId, newVal) {
    if (typeof hmiMgr != 'undefined') {
      var objWidget = hmiMgr.getWidget(objWidgetId);
      if (objWidget) {
        objWidget.max = newVal;
        // dbg // console.log("updateWidget: " + objWidgetId + " := " + newVal + " !");
      } else {
       // dbg // console.log("updateWidget: " + objWidgetId + " := " + newVal + " not found !");
      }
    }
  }


// ------------------------------------------------------------------
