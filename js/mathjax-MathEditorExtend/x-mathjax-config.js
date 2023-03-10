/*
VisualMathEditor, (x-mathjax-config.js) 
Copyright © 2005-2013 David Grima, contact@equatheque.com under the terms of the GNU General Public License, version 3.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses.
*/
var mathjaxConfigURL = $.url(document.getElementById("MathJaxScript").src).param('config'); // This file URL to send MathJax.Ajax.loadComplete at the end of file
//<script type="text/x-mathjax-config">

var easyuiCssURL = $.url(document.getElementById("EasyuiCSS").href); // The easyui Css aqua theme file
easyuiCssURL = (easyuiCssURL.attr('protocol') + ":" + easyuiCssURL.attr('port') + "//" + easyuiCssURL.attr('host') + easyuiCssURL.attr('directory'));

MathJax.Hub.Config({
	showProcessingMessages: true,
	extensions: ['tex2jax.js','asciimath2jax.js',"mml2jax.js",'MathMenu.js','MathZoom.js','toMathML.js'],
	TeX: {
		extensions: ["autoload-all.js","noUndefined.js","AMSmath.js","AMSsymbols.js","AMScd.js","mhchem.js","enclose.js","cancel.js","color.js"],
		noUndefined: {
			attributes: {
				mathcolor: "#cc0000",
				mathbackground: "#ffff88",
				mathsize: "100%"
			}
		},
		equationNumbers: { autoNumber: "AMS" },
		Macros: {
		  binom: ["\\genfrac{(}{)}{0pt}{}{#1}{#2}",2],
		  abs: ["\\lvert #1 \\rvert",1],
		  norm: ["\\lVert #1 \\rVert",1],
		  braket: ["\\left\\langle #1 \\middle| #2 \\right\\rangle",2],
		  bra: ["\\left\\langle #1 \\right|",1],
		  ket: ["\\left| #1 \\right\\rangle",1],
		  Complex: "\\mathbb{C}",
		  Integer: "\\mathbb{Z}",
		  Rational: "\\mathbb{Q}",
		  Natural: "\\mathbb{N}",
		  Real: "\\mathbb{R}",
		  water: "\\ce{H2O}"
		}
	},
	jax: ['input/TeX','input/AsciiMath','input/MathML','output/SVG','output/HTML-CSS'], //'output/NativeMML'
	"HTML-CSS": {
		scale: 100,
		styles: {
		  ".MathJax .merror": {
			"background-color": "#FFFF88",
			color:   "#CC0000",
			border:  "1px solid #CC0000",
			padding: "1px 3px",
			"font-style": "normal",
			"font-size":  "50%"
		  }
		},
		imageFont:null
	},
	"SVG": {
		//mtextFontInherit: true, //nécessaire pour que les chiffres Arabe soient jolis mais mauvais pour l'exportation en SVG/PNG des formules chimiques... Mis en paramètre dans VME
		font: "TeX", //"Latin-Modern" "Gyre-Termes" "Gyre-Pagella" "Asana-Math" "STIX-Web"
		/*
		styles: {
			".MathJax_SVG svg > g, .MathJax_SVG_Display svg > g": {
				"fill": "yellow",
				"stroke": "red"
			}
		}
		*/
	},
	tex2jax: {
		inlineMath: [['$','$'],['\\(','\\)']],
		displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
		processEscapes: true
	},
	asciimath2jax: {
		delimiters: [['`','`']]
	},
	menuSettings: {
		zoom: "none" //"Double-Click"
	},
	showMathMenu: true,
	showMathMenuMSIE: true,
	MathMenu: {
		showFontMenu: true,
		showRenderer: true,
		styles: {
			"#MathJax_About": {
				border:"1px solid #ccc", 
				"background-color":"#F0F0F0",
				"font-size":"80%",
				"border-radius": "3px",
				"-webkit-border-radius": "3px",
				"-moz-border-radius": "3px",
				"-khtml-border-radius": "3px",
				"box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				"-webkit-box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				"-moz-box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				"-khtml-box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				filter: "progid:DXImageTransform.Microsoft.Blur(pixelRadius=2,MakeShadow=false,ShadowOpacity=0.2)"
			},
			"#MathJax_About a": {
				padding:"0 2px 0 2px",
				border:"1px solid transparent",
				color:"#000000",
				"border-radius":"3px",
				"-moz-border-radius":"3px",
				"-webkit-border-radius":"3px",
				"-khtml-border-radius":"0px",
				"-o-border-radius":"3px",
				"text-decoration":"underline",
				"font-weight":"normal"
			},
			"#MathJax_About a:hover": {
				"text-decoration":"none",
				border:"1px solid #7eabcd",
				background:"url('" + easyuiCssURL + "images/button_plain_hover.png') repeat-x left bottom"
			},
			"#MathJax_MenuFrame": {
				"z-index":"999999 !important"
			},
			".MathJax_Menu": {
				border:"1px solid #ccc",
				background:"#F0F0F0 url('" + easyuiCssURL + "images/menu.gif') repeat-y",
				"border-radius":"0px",
				"-webkit-border-radius":"0px",
				"-moz-border-radius":"0px",
				"-khtml-border-radius":"0px",
				"-o-border-radius":"0px",
				"box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				"-webkit-box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				"-moz-box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				"-khtml-box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				"-o-box-shadow":"2px 2px 3px rgba(0, 0, 0, 0.2)",
				filter: "progid:DXImageTransform.Microsoft.Blur(pixelRadius=2,MakeShadow=false,ShadowOpacity=0.2)"
			},
			".MathJax_MenuItem": {
				"font-family":"\"Times New Roman\", Times, serif",
				border:"1px solid transparent",
				"_border":"1px solid #f0f0f0"
			},
			".MathJax_MenuRule": {
				"border":"none",
				background:"url('" + easyuiCssURL + "images/menu_sep.png') repeat-x",
				"margin-left":"24px"
			},
			".MathJax_MenuArrow": {
				background:"url('" + easyuiCssURL + "images/menu_rightarrow.png') no-repeat " + (($.browser.safari || $.browser.msie)?0:5) + "px 5px",
				color:"transparent"
			},
			".MathJax_MenuActive .MathJax_MenuArrow": {
				color:"transparent"
			},
			".MathJax_MenuActive": {
				color:"black",
				border:"1px solid #7eabcd",
				background:"#fafafa",
				"border-radius":"3px",
				"-webkit-border-radius":"3px",
				"-moz-border-radius":"3px",
				"-khtml-border-radius":"3px",
				"-o-border-radius":"3px"
			}

		}
	}
	/*,MathZoom: {
		styles: {
			"#MathJax_Zoom": {
				"background-color": "#0000F0"
			}
		}
	}*/
});

//Set display style as the default style
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
	var TEX = MathJax.InputJax.TeX;
	var PREFILTER = TEX.prefilterMath;
	TEX.Augment({
			prefilterMath: function (math,displaymode,script) {
			math = "\\displaystyle{"+math+"}";
			return PREFILTER.call(TEX,math,displaymode,script);
		}
	});
});

//</script>
MathJax.Ajax.loadComplete(mathjaxConfigURL);