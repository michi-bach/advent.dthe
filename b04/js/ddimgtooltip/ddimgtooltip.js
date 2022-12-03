/* Image w/ description tooltip v2.0
 * Created: April 23rd, 2010. This notice must stay intact for usage
 * Author: Dynamic Drive at http://www.dynamicdrive.com/
 * Visit http://www.dynamicdrive.com/ for full source code
 */

var ddimgtooltip = {
  tiparray: (function () {
    var tooltips = []
	//define the width of the tooltip-boxes
	let box_w = "405px"
    
	//define each tooltip below: tooltip[inc]=['path_to_image', 'optional desc', optional_CSS_object]
    //For desc parameter, backslash any special characters inside your text such as apotrophes ('). Example: "I\'m the king of the world"
    //For CSS object, follow the syntax: {property1:"cssvalue1", property2:"cssvalue2", etc}

    tooltips[1] = [ '',
      "Die interprofessionelle Zusammenarbeit und Miteinbezug der Pflegefachkräfte auf der Visite hilft, die Patienten umfassender zu betreuen und verkürzt die Hospitalisationsdauer. (Swiss Med Wkly. 2022;152:w30112)"
      ,{ background: "white", opacity: 0.98, width:box_w}]

    tooltips[2] = [ "",
      "Die Visite kann direkt am Patientenbett stattfinden oder zuerst innerhalb des Behandlungsteams vor der Türe besprochen werden, um anschliessend eine patientenfreundliche Version am Bett zu präsentieren. Direkt am Bett gewinnt man Zeit, Patienten sind aber häufiger verunsichert, vor allem durch die medizinischen Fachausdrücke. Ausserdem werden delikate Themen (medizinische Unsicherheiten, soziale Themen, Adhärenz) weniger häufig besprochen, wenn die Visite direkt am Bett stattfindet. (Ann Intern Med. 2021 Sep;174(9):1282-1292)"
      ,{ background: "white", opacity: 0.98, width:box_w}]

    tooltips[3] = [ "",
      "Viele Patienten wünschen eine Beteiligung in der medizinischen Entscheidungsfindung (sogenanntes Shared decision-making). (J Gen Intern Med. 2022 Sep 9.)"
      ,{ background: "white", opacity: 0.98, width:box_w}]

    tooltips[4] = [ "",
      "Oft wird auf Emotionen der Patienten mit Informationsvermittlung des Arztes/der Ärztin begegnet. Dies kann zu Missverständnissen und Unzufriedenheit mit der Behandlung führen (Ann Intern Med. 2021 Sep;174(9):1282-1292.; Gross et al., in preparation). Spezifische Kommunikationstechniken können helfen, dies zu verbessern. (NURSE, Therapeutische Umschau (2019), 76, pp. 231-238)"
      ,{ background: "white", opacity: 0.98, width:box_w}]

    tooltips[5] = [ "",
      "Patienten mit delikaten Themen sind häufiger unzufrieden mit der Behandlung und auf Emotionen wird hier weniger eingegangen. Eine patientenzentrierte Kommunikation kann helfen, dies zu verbessern. (Ann Intern Med. 2021 Sep;174(9):1282-1292.; Gross et al., in preparation)"
      ,{ background: "white", opacity: 0.98, width:box_w}]

    tooltips[6] = [ "",
      "Ein gutes Austittsgespräch reduziert das Risiko einer Rehospitalisation und erhöht die Patientenzufriedenheit. (JAMA Netw Open. 2021 Aug 2;4(8):e2119346)"
      ,{ background: "white", opacity: 0.98, width:box_w}]

    return tooltips; //do not remove/change this line
  })(),

  tooltipoffsets: [20, -30], //additional x and y offset from mouse cursor for tooltips

  //***** NO NEED TO EDIT BEYOND HERE

  tipprefix: "imgtip", //tooltip ID prefixes

  createtip: function ($, tipid, tipinfo) {
    if ($("#" + tipid).length == 0) {
      //if this tooltip doesn't exist yet
      var text = tipinfo[1] || "";
      var cssStyles = tipinfo[2] || {};

//MiB: auskommentiert um <br> auch auf dem Smartphone korrekt darzustellen
      // if (window && window.screen && (window.screen.width <= 576)) {
        // // text = text.replaceAll("<br>", "");
        // text = text.split("<br>").join("");
        // cssStyles.maxWidth = "400px";
      // }

      return $('<div id="' + tipid + '" class="ddimgtooltip" />')
        .html(
            '<div style="text-align:left; margin-left:5px; margin-right:5px;\
				margin-top:5px; margin-bottom:5px">' +
                text +
				tipinfo[0]+
                "</div>"
        )
        .css(cssStyles)
        .appendTo(document.body);
    }
    return null;
  },

  positiontooltip: function ($, $tooltip, e) {
    var x = e.pageX + this.tooltipoffsets[0],
      y = e.pageY + this.tooltipoffsets[1];
    var tipw = $tooltip.outerWidth(),
      tiph = $tooltip.outerHeight(),
      x = x + tipw > $(document).scrollLeft() + $(window).width() ? x - tipw - ddimgtooltip.tooltipoffsets[0] * 2 : x;
    y =
      y + tiph > $(document).scrollTop() + $(window).height()
        ? $(document).scrollTop() + $(window).height() - tiph - 10
        : y;
    $tooltip.css({ left: x, top: y });
  },

  showbox: function ($, $tooltip, e) {
    $tooltip.show();
    this.positiontooltip($, $tooltip, e);
  },

  hidebox: function ($, $tooltip) {
    $tooltip.hide();
  },

  init: function (targetselector) {
    jQuery(document).ready(function ($) {
      var tiparray = ddimgtooltip.tiparray;
      var $targets = $(targetselector);
      if ($targets.length == 0) return;
      var tipids = [];
      $targets.each(function () {
        var $target = $(this);
        $target.attr("rel").match(/\[(\d+)\]/); //match d of attribute rel="imgtip[d]"
        var tipsuffix = parseInt(RegExp.$1); //get d as integer
        var tipid = (this._tipid = ddimgtooltip.tipprefix + tipsuffix); //construct this tip's ID value and remember it
        var $tooltip = ddimgtooltip.createtip($, tipid, tiparray[tipsuffix]);
        $target.mousedown(function (e) {
          var $tooltip = $("#" + this._tipid);
          ddimgtooltip.showbox($, $tooltip, e);
        });
        $target.mouseup(function (e) {
          var $tooltip = $("#" + this._tipid);
          ddimgtooltip.showbox($, $tooltip, e);
        });
        $target.mouseenter(function (e) {
          var $tooltip = $("#" + this._tipid);
          ddimgtooltip.showbox($, $tooltip, e);
        });
        $target.mouseleave(function (e) {
          var $tooltip = $("#" + this._tipid);
          ddimgtooltip.hidebox($, $tooltip, e);
        });
        $target.mousemove(function (e) {
          var $tooltip = $("#" + this._tipid);
          ddimgtooltip.positiontooltip($, $tooltip, e);
        });
        if ($tooltip) {
          $tooltip.mouseenter(function () {
            ddimgtooltip.hidebox($, $(this));
          });
          $tooltip.mousedown(function () {
            ddimgtooltip.hidebox($, $(this));
          });
          $tooltip.mouseup(function () {
            ddimgtooltip.hidebox($, $(this));
          });
        }
      });
    }); //end dom ready
  }
};

//ddimgtooltip.init("targetElementSelector")
ddimgtooltip.init("*[rel^=imgtip]");
