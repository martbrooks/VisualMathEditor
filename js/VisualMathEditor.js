/*
VisualMathEditor, (VisualMathEditor.js) 
Copyright © 2005-2014 David Grima, contact@equatheque.com under the terms of the GNU General Public License, version 3.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses.
*/

/*jslint browser: true, unparam: true */
/*
jslint JavaScript Code Quality Tool Options
- browser: true to assume there is an instance of the object window
- unparam: true to tolerate unused parameters in ColorPicker event functions
*/

// Global VME objects _________________________________________________________________
var VisualMathEditor, // VisualMathEditor constructor and statics functions accessible for external coder and DOM
    vme;              // VisualMathEditor object instance accessible for external coder and DOM
// End Global objects

/* Dependencies
- jQuery object defined in jquery.min.js script file
- Easyui jQuery extention object defined in jquery.easyui.min.js script file
- ColorPicker jQuery extention object defined in colorpicker.js script file
- MathJax object defined in MathJax.js script file
- VirtualKeyboard defined in keyboard.js script file
- CodeMirror object defined in codemirror.js script file
- canvg object defined in rgbcolor.js, StackBlur.js and canvg.js script files
*/

/* Prototype
    window.VisualMathEditor = VisualMathEditor;
    window.vme = vme = new VisualMathEditor();

    window.addEventListener('keypress', function (event) { disableBrowserSaveEvent(event); }, false);
    window.addEventListener('keydown', function (event) { ProcessSaveEvent(event); }, false);

    function disableBrowserSaveEvent(event)
    function ProcessSaveEvent(event)
    
    function VisualMathEditor() {
        ...
        initialise: function ()
        endWait: function ()
        setFocus: function ()
        checksVersion: function ()
        setCodeMirrorCursorAtEnd: function 
        toggleHTMLmode: function ()
        initialiseMathJax: function ()
        initialiseVirtualKeyboard: function ()
        initialiseCodeMirror: function ()
        initialiseUI: function ()
        openInformationTab: function (numTab)
        resizeDivInputOutput: function ()
        initialiseUImoreDialogs: function (fPanelID)
        initialiseUIaccordion: function (accordionID)
        initialiseSymbolContent: function (fPanelID)
        initialiseCodeType: function ()
        switchCodeType: function ()
        printCodeType: function ()
        initialiseStyle: function ()
        initialiseLocalType: function ()
        initialiseLanguage: function ()
        initialiseEquation: function ()
        initialiseParameters: function ()
        switchMathJaxMenu: function ()
        switchMathJaxFontInherit: function ()
        initialiseAsciiMathCodesList: function ()
        initialiseLatexMathjaxCodesList: function ()
        initialiseUniCodesList: function ()
        selectUniCodesValues: function (i1, i2)
        setUniCodesValues: function (i1, i2, breakFFFF)
        showMatrixWindow: function (rows, cols)
        updateMatrixWindow: function (rows, cols)
        setLatexMatrixInEditor: function ()
        setAsciiMatrixInEditor: function ()
        locale: {}
            VisualMathEditor.prototype.locale.ar =  {...}
            VisualMathEditor.prototype.locale.de_DE = {...}
            VisualMathEditor.prototype.locale.en_US = {...}
            VisualMathEditor.prototype.locale.es_ES = {...}
            VisualMathEditor.prototype.locale.fr_FR = {...}
            VisualMathEditor.prototype.locale.ru = {...}
            VisualMathEditor.prototype.locale.vi_VN = {...}
        getLocalText: function (TEXT_CODE)
        localize: function ()
        initialiseLangRessourcesList: function ()
        getEquation: function ()
        autoUpdateOutput: function ()
        updateOutput: function ()
        showSVGcontextMenu: function (event)
        insert: function (b)
        insertBeforeEachLine: function (b)
        tag: function (b, a)
        encloseSelection: function (f, j, h)
        showWindow: function (file, width, height, top, left, name, scrollbars, resizable, toolbar, menubar)
        newEditor: function ()
        closeEditor: function ()
        testOpenFile: function ()
        openFile: function (event)
        saveFile: function (content, name)
        saveEquationFile: function ()
        savePDFFile: function ()
        saveMMLFile: function (mmlContent)
        saveSVGFile: function (svgContent)
        setEquationInCaller: function (doClose)
        getEquationFromCaller: function ()
        viewMathML: function (element)
        toMathML: function (jax, callback)
        viewSVG: function ()
        updateCanvasSvg: function ()
        updateCanvasSize: function ()
        showCanvasHelp: function ()
        hideCanvasHelp: function ()
        viewPngImg: function ()
        directSavePngImg: function ()
        getSVG: function (svg_tag, getAsString)
        svgfix: function (svg, viewBox)
        chooseStyle: function ()
        setRTLstyle: function ()
        saveCookies: function ()
    }

    String.prototype.endsWith = function (suffix)

    VisualMathEditor.getDateTimeForFile = VisualMathEditor.prototype.getDateTimeForFile = function ()
    VisualMathEditor.AddZero = function (num)
    VisualMathEditor.setCookie = VisualMathEditor.prototype.setCookie = function (name, value, days, path, domain, secure)
    VisualMathEditor.getCookie = VisualMathEditor.prototype.getCookie = function (name)
    VisualMathEditor.deleteCookie = VisualMathEditor.prototype.deleteCookie = function (name, domain)
    VisualMathEditor.getBoolean = VisualMathEditor.prototype.getBoolean = function (text)
    VisualMathEditor.d2h = VisualMathEditor.prototype.d2h = function (d)
    VisualMathEditor.h2d = VisualMathEditor.prototype.h2d = function (h)
    VisualMathEditor.encodeStringForHTMLAttr = VisualMathEditor.prototype.encodeStringForHTMLAttr = function (s)
    VisualMathEditor.loadScript = VisualMathEditor.prototype.loadScript = function (url, callback)
    VisualMathEditor.XmlToStr = VisualMathEditor.prototype.XmlToStr = function (xmlNode)
    VisualMathEditor.hasTouch = VisualMathEditor.prototype.hasTouch = function ()
    VisualMathEditor.fireEvent = VisualMathEditor.prototype.fireEvent = function (node, eventName)
*/

// Immediately-invoked self-executing anonymous function ______________________________
(function ($, MathJax, CodeMirror, canvg) {
    'use strict';

    //VisualMathEditor Constructor ____________________________________________________
    function VisualMathEditor() {
        this.version = "2.0.58"; //VisualMathEditor.LAST_VERSION and vme.version must be formatted as 0.0.00

        //VisualMathEditor Default Properties initialisation
        this.codeType = 'Latex'; //'AsciiMath' or 'Latex"
        this.encloseAllFormula = false; //false or true
        this.saveOptionInCookies = false; //false or true
        this.localType = "en_US"; //fr_FR, en_US, ru, ar, vi_VN, de_DE, es_ES
        this.style = "aguas"; //aguas, gray, metro, bootstrap, black
        this.pngImgGlyphStrokeColor = "#000000"; //HTML color
        this.pngImgGlyphFillColor = "#000000"; //HTML color
        this.pngImgBackgroundStrokeColor = "none"; //HTML color, none to set transparent
        this.pngImgBackgroundFillColor = "none"; //HTML color, none to set transparent
        this.autoUpdateTime = 500; //in ms
        this.menuupdateType = true; //false or true
        this.autoupdateType = true; //false or true
        this.menuMathjaxType = false; //false or true
        this.fontInheritMathjaxType = false; //false or true, true is better for arabic numbers but not for png export

        //url variables
        this.url = $.url(true); // the vme url to load param
        //For exemple http://localhost/VisualMathEditor/VisualMathEditor.html?runLocal&runNotCodeMirror&runNotVirtualKeyboard&runNotColorPicker&runNotCanvg&runNotMathJax
        this.runLocal = this.getBoolean($.url(window.document.getElementById("vmeScript").src).param('runLocal')); // Run in local or from server ?
        this.runNotCodeMirror = this.getBoolean($.url(window.document.getElementById("vmeScript").src).param('runNotCodeMirror')); // Run CodeMirror Editor ?
        this.runNotMathJax = this.getBoolean($.url(window.document.getElementById("vmeScript").src).param('runNotMathJax')); // Run MathJax ?
        this.runNotVirtualKeyboard = this.getBoolean($.url(window.document.getElementById("vmeScript").src).param('runNotVirtualKeyboard')); // Run VirtualKeyboard ?
        this.runNotColorPicker = this.getBoolean($.url(window.document.getElementById("vmeScript").src).param('runNotColorPicker')); // Run ColorPicker ?
        this.runNotCanvg = this.getBoolean($.url(window.document.getElementById("vmeScript").src).param('runNotCanvg')); // Run Canvg ?
        this.runNotJsPDF = this.getBoolean($.url(window.document.getElementById("vmeScript").src).param('runNotJsPDF')); // Run jsPDF ?

        //privates variables
        this.isBuild = false; // to detect if the vme object is build without error in is constructor
        this.VKI_show = null; // VKI globals functions and variables defined in keyboard.js called in ths.initialiseVirtualKeyboard()
        this.VKI_version = null;
        this.pngImgZoom = 1;
        this.windowIsOpenning = false; // to detect if a window.open is even do
        this.textareaIgnore = false; // to ignore textarea fied of the caller window of vme when the caller use directly private variable and function of vme to initialise it. See functions openEditor() and openEditorFromTextArea() of functions.js from visualmatheditor.equatheque.com site.
        this.textareaID = null; // the textarea HTML fied ID of the caller window of vme
        this.textAreaForSaveASCII = null; // the textarea HTML fied of the caller window of vme
        this.mathTextInput = window.document.getElementById('mathTextInput'); // the HTML textarea where equation is type by user
        this.mathVisualOutput = window.document.getElementById('mathVisualOutput'); // the HTML Div where equation was design from the input
        this.codeMirrorEditor = null; // The codeMirror Object if runNotCodeMirror param isn't set in URL
        this.contextMenuSVG = null; // the SVG equation rigth clicked "contextmenu" to view SVG or convert to image.
        this.symbolPanelsLoaded = []; // to cach formula symbol on dynamic loading panel accordion
        this.asciiMathCodesListLoaded = false;
        this.latexMathjaxCodesListLoaded = false;
        this.uniCodesListLoaded = false;
        this.autoUpdateOutputTimeout = null; // the timeout current id of auto update design equation
        // the arrays to not auto update equation when user type none signifiant keys, ctrl keys and alt keys
        this.notAllowedKeys = [
            9,/*tab*/
            16,/*shift*/
            17,/*ctrl*/
            18,/*alt*/
            19,/*pause*/
            20,/*capslock*/
            27,/*esc*/
            33,/*pageUp*/
            34,/*pageDown*/
            35,/*end*/
            36,/*home*/
            37,/*left*/
            38,/*up*/
            39,/*right*/
            40,/*down*/
            44,/*printScrn*/
            45,/*insert*/
            ($.browser.opera ? 219 : 91),/*winkey*/
            ($.browser.opera ? 57351 : 93),/*contextmenu*/
            112,/*F1*/
            113,/*F2*/
            114,/*F3*/
            115,/*F4*/
            116,/*F5*/
            117,/*F6*/
            118,/*F7*/
            119,/*F8*/
            120,/*F9*/
            121,/*F10*/
            122,/*F11*/
            123,/*F12*/
            144,/*numLock*/
            145 /*scrollLock*/
        ];
        this.allowedCtrlKeys = [
            86,/*ctrl v paste*/
            88,/*ctrl x cut*/
            89,/*ctrl y redo*/
            90 /*ctrl z undo*/
        ];
        this.notAllowedCtrlKeys = []; /*ctrl a, ctrl s, ...*/
        var i;
        for (i = 65; i <= 90; i += 1) {
            if ($.inArray(i, this.allowedCtrlKeys) === -1) {
                this.notAllowedCtrlKeys.push(i);
            }
        }
        this.notAllowedAltKeys = []; /*alt a, alt b, ...*/
        for (i = 65; i < 90; i += 1) {
            this.notAllowedAltKeys.push(i);
        }

        //VisualMathEditor UI initialisation
        this.initialise();
        this.isBuild = true;

    }
    // End VisualMathEditor Constructor

    // VisualMathEditor Methods _______________________________________________________
    VisualMathEditor.prototype = {

        initialise: function () {
            var vme = this;

            this.initialiseLocalType();

            $.messager.progress({
                title: "VisualMathEditor",
                text: this.getLocalText("WAIT_FOR_EDITOR_DOWNLOAD"),
                msg: "<center>&copy; <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a> - <a href='http://www.equatheque.net' target='_blank' class='bt' >EquaThEque</a><br/><br/></center>",
                interval: 300 //milliseconds
            });

            this.initialiseUI();
            this.initialiseParameters();
            if (!vme.runNotCodeMirror) {
                vme.initialiseCodeMirror();
            }
            this.initialiseStyle();
            this.initialiseLanguage();
            this.initialiseCodeType();
            this.saveCookies();
            this.initialiseVirtualKeyboard();
            if (!this.runNotMathJax) {
                this.initialiseMathJax();
            } else {
                this.endWait();
            }
        },

        endWait: function () {
            this.initialiseEquation();
            this.switchMathJaxMenu();
            $.messager.progress('close');
            $("#WaitMsg").hide();
            this.setFocus();
            this.resizeDivInputOutput();
            this.checksVersion();
        },

        setFocus: function () {
            if (!this.runNotCodeMirror && this.codeMirrorEditor) {
                this.codeMirrorEditor.focus();
            }
            $("#mathTextInput").focus();
        },

        checksVersion: function () {
            var vme = this;
            /*$.getJSON NE MARCHE PAS EN LOCAL CAR XMLHttpRequest cannot load http://visualmatheditor.equatheque.net/js/version.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost' is therefore not allowed access. */

            vme.loadScript(
                'http://visualmatheditor.equatheque.net/js/version.js?_=' + Math.random(),
                //For Local test
                //'http://localhost/VisualMathEditor/js/version.js?_=' + Math.random(),
                function () {
                    var lastVersion = VisualMathEditor.LAST_VERSION,
                        message = "",
                        height = 100,
                        serverVersion = parseInt(lastVersion.number.replace(/\./gi, ""), 10),
                        localVersion = parseInt(vme.version.replace(/\./gi, ""), 10);
                    if (serverVersion > localVersion) {
                        message += "Your version is " + vme.version + ". <strong>Version " + lastVersion.number + "</strong> is now available on <a href='http://visualmatheditor.equatheque.net' target='_blank' class='bt'>visualmatheditor.equatheque.net</a><br/><br/>";
                    }
                    if (lastVersion.push) {
                        height = 200;
                        message += lastVersion.message;
                    }
                    if (message.length > 0) {
                        $.messager.show({
                            title: "<span class='rtl-title-withicon'>" + vme.getLocalText("INFORMATION") + "</span>",
                            msg: message,
                            timeout: 0,
                            width: 280,
                            height: height
                        });
                    }
                }
            );
        },

        setCodeMirrorCursorAtEnd: function () {
            var pos = {
                line: this.codeMirrorEditor.lastLine(),
                ch: this.codeMirrorEditor.getValue().length
            };
            this.codeMirrorEditor.setCursor(pos);
        },

        toggleHTMLmode: function () {
            var vme = this;
            vme.encloseAllFormula = !vme.encloseAllFormula;
            if (vme.encloseAllFormula) {
                $("#encloseType").attr("checked", "checked");
                $("#btENCLOSE_TYPE").removeClass("unselect");
                $('#HTML_TAG').show();
                if (!vme.runNotCodeMirror && vme.codeMirrorEditor) {
                    vme.codeMirrorEditor.setOption("mode", "text/html");
                    vme.codeMirrorEditor.setOption("autoCloseTags", true);
                }
            } else {
                $("#encloseType").removeAttr("checked");
                $("#btENCLOSE_TYPE").addClass("unselect");
                $('#HTML_TAG').hide();
                if (!vme.runNotCodeMirror && vme.codeMirrorEditor) {
                    vme.codeMirrorEditor.setOption("mode", "text/x-latex");
                    vme.codeMirrorEditor.setOption("autoCloseTags", false);
                }
            }
            vme.resizeDivInputOutput();
            vme.updateOutput();
            vme.setFocus();
            if (vme.saveOptionInCookies) {
                vme.setCookie("VME_encloseAllFormula", vme.encloseAllFormula, 1000);
            }
        },

        initialiseMathJax: function () {
            var vme = this;

            /*(function () {
                    if(window.MathJax===undefined) {
                        var script = window.document.createElement("script");
                        script.type = "text/javascript";
                        script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
                        var config = 'MathJax.Hub.Config({' + 'extensions: ["tex2jax.js"],' + 'tex2jax: { inlineMath: [["$","$"],["\\\\\\\\\\\\(","\\\\\\\\\\\\)"]], displayMath: [["$$","$$"],["\\\\[","\\\\]"]], processEscapes: true },' + 'jax: ["input/TeX","output/HTML-CSS"]' + '});' + 'MathJax.Hub.Startup.onload();';
                        if (window.opera) {script.innerHTML = config} else {script.text = config}
                        window.document.getElementsByTagName("head")[0].appendChild(script);
                    } else {
                        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                    }
                    $('html').ajaxComplete(
                        function () {
                            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                        }
                    );
                }());*/

            MathJax.Hub.Queue(function () {
                vme.endWait();

                //For IE9 witch is too slow (Pour résoudre le problème de chargement sous IE : les title des easyui-panel ne sont pas interprétés par MathJax
                setTimeout(
                    function () {
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                    },
                    1000
                );
            });
        },

        initialiseVirtualKeyboard: function () {
            if (!this.runNotVirtualKeyboard) {
                this.loadScript(
                    'js/keyboard/keyboard.js',
                    function () {
                        vme.VKI_show = function (elem) { window.VKI_show(elem); };
                        vme.VKI_version = function () { return window.VKI_version; };
                        return true;
                    }
                );
            }
        },

        initialiseCodeMirror: function () {
            var vme = this;
            vme.codeMirrorEditor = CodeMirror.fromTextArea(
                window.document.getElementById("mathTextInput"),
                {
                    mode: vme.encloseAllFormula ? "text/html" : "text/x-latex",
                    autofocus: true,
                    showCursorWhenSelecting : true,
                    styleActiveLine: true,
                    lineNumbers: true,
                    lineWrapping: true,
                    matchBrackets: true,
                    autoCloseBrackets: true,
                    autoCloseTags: vme.encloseAllFormula ? true : false,
                    tabMode: "indent",
                    tabSize: 4,
                    indentUnit: 4,
                    indentWithTabs: true,
                    theme: "default"
                }
            );
            vme.codeMirrorEditor.on("change", function () {
                vme.autoUpdateOutput();
            });
            $(".CodeMirror").bind('contextmenu', function (event) {
                event.preventDefault();
                $('#mINSERT').menu('show', {
                    left: event.pageX,
                    top: event.pageY
                });
                return false;
            });
        },

        initialiseUI: function () {
            var vme = this;

            $("a.easyui-linkbutton").linkbutton({
                plain: true
            });

            $(document).bind('contextmenu', function (event) {
                event.preventDefault();
                return false;
            });

            $("#mFILE, #mINSERT, #mTOOLS, #mVIEW, #mCONVERT, #mOPTIONS, #mINFORMATIONS").menu({
                onClick: function (item) {
                    var file;

                    switch (item.target.id) {
                    case "mEDITOR_PARAMETERS":
                        $('#wEDITOR_PARAMETERS').dialog('open');
                        break;
                    case "mSTYLE_CHOISE":
                        $('#wSTYLE_CHOISE').dialog('open');
                        break;
                    case "mLANGUAGE_CHOISE":
                        $('#wLANGUAGE_CHOISE').dialog('open');
                        break;
                    case "mMATRIX":
                        vme.showMatrixWindow(3, 3);
                        break;
                    case "mCOMMUTATIVE_DIAGRAM":
                        vme.initialiseUImoreDialogs("f_COMMUTATIVE_DIAGRAM");
                        break;
                    case "mCHEMICAL_FORMULAE":
                        vme.initialiseUImoreDialogs("f_CHEMICAL_FORMULAE");
                        break;
                    case "mNEW_EDITOR":
                        vme.newEditor();
                        break;
                    case "mQUIT_EDITOR":
                        vme.closeEditor();
                        break;
                    case "mSAVE_EQUATION":
                        vme.saveEquationFile();
                        break;
                    case "mOPEN_EQUATION":
                        vme.testOpenFile();
                        break;
                    case "mUPDATE_EQUATION":
                        vme.getEquationFromCaller();
                        break;
                    case "mSET_EQUATION":
                        vme.setEquationInCaller();
                        break;
                    case "mSAVE_AS_PDF":
                        vme.savePDFFile();
                        break;
                    case "mSAVE_AS_MML":
                        vme.saveMMLFile();
                        break;
                    case "mSAVE_AS_SVG":
                        vme.saveSVGFile();
                        break;
                    case "mLaTeX_TEXT":
                        vme.insert("\\LaTeX");
                        break;
                    case "mMATH_ML":
                        vme.viewMathML(vme.mathVisualOutput.id);
                        break;
                    case "mPNG_IMG":
                        vme.pngImgZoom = 1;
                        $('#wEXPORT_PNG').dialog('open');
                        break;
                    case "mPNG_IMG_CONVERT":
                        //if(!vme.hasTouch()) {
                        vme.pngImgZoom = 1;
                        $('#wEXPORT_PNG').dialog('open');
                        //}
                        break;
                    case "mPNG_IMG_CONVERT_x05":
                    case "mPNG_IMG_CONVERT_x1":
                    case "mPNG_IMG_CONVERT_x2":
                    case "mPNG_IMG_CONVERT_x3":
                    case "mPNG_IMG_CONVERT_x4":
                        vme.pngImgZoom = parseFloat($(item.target).attr("data-zoom"));
                        $('#wEXPORT_PNG').dialog('open');
                        break;
                    case "mSVG":
                    case "mSVG_CONVERT":
                        vme.viewSVG();
                        break;
                    case "mUNICODES_LIST":
                        $('#wUNICODES_LIST').window('open');
                        vme.initialiseUniCodesList();
                        break;
                    case "mLATEX_CODES_LIST":
                        $('#wLATEX_CODES_LIST').window('open');
                        vme.initialiseLatexMathjaxCodesList();
                        break;
                    case "mASCIIMATH_CODES_LIST":
                        $('#wASCIIMATH_CODES_LIST').window('open');
                        vme.initialiseAsciiMathCodesList();
                        break;
                    case "mLANG_RESSOURCE_LIST":
                        $('#wLANGUAGE_LIST').window('open');
                        vme.initialiseLangRessourcesList();
                        break;
                    case "mLATEX_DOCUMENTATION":
                        file = (vme.runLocal ? "doc/" : "http://www.tex.ac.uk/tex-archive/info/symbols/comprehensive/") + "symbols-a4.pdf";
                        vme.showWindow(file, 780, 580, 100, 100, 'wLATEX_DOCUMENTATION', 'yes', 'yes', 'no', 'no');
                        break;
                    case "mMHCHEM_DOCUMENTATION":
                        file = (vme.runLocal ? "doc/" : "http://www.ctan.org/tex-archive/macros/latex/contrib/mhchem/") + "mhchem.pdf";
                        vme.showWindow(file, 780, 580, 100, 100, 'wMHCHEM_DOCUMENTATION', 'yes', 'yes', 'no', 'no');
                        break;
                    case "mAMSCD_DOCUMENTATION":
                        file = (vme.runLocal ? "doc/" : "http://www.jmilne.org/not/") + "Mamscd.pdf";
                        vme.showWindow(file, 780, 580, 100, 100, 'wAMSCD_DOCUMENTATION', 'yes', 'yes', 'no', 'no');
                        break;
                    case "mSVG_SPECIFICATIONS":
                        file = (vme.runLocal ? "doc/" : "http://www.w3.org/TR/2003/REC-SVG11-20030114/") + "REC-SVG11-20030114.pdf";
                        vme.showWindow(file, 780, 580, 100, 100, 'wSVG_SPECIFICATIONS', 'yes', 'yes', 'no', 'no');
                        break;
                    case "mMATH_ML_SPECIFICATIONS":
                        file = (vme.runLocal ? "doc/" : "http://www.w3.org/TR/MathML/") + "mathml.pdf";
                        vme.showWindow(file, 780, 580, 100, 100, 'wMATH_ML_SPECIFICATIONS', 'yes', 'yes', 'no', 'no');
                        break;
                    case "mCOPYRIGHT":
                        vme.openInformationTab(0);
                        break;
                    case "mVERSION":
                        vme.openInformationTab(1);
                        break;
                    case "mBUGS":
                        vme.openInformationTab(2);
                        break;
                    case "mEQUATION_SAMPLE":
                        vme.openInformationTab(3);
                        break;
                    case "f_GREEK_CHAR":
                        vme.initialiseUImoreDialogs("f_L_U_GREEK_CHAR");
                        break;
                    case "mCHARS":
                    case "f_ALL_CHAR":
                        vme.initialiseUImoreDialogs("f_ALL_CHAR");
                        break;
                    case "f_FR_CHAR":
                    case "f_BBB_CHAR":
                        vme.initialiseUImoreDialogs(item.target.id);
                        break;
                    case "mEQUATION":
                        vme.initialiseUImoreDialogs("f_EQUATION");
                        break;
                    case "mHORIZONTAL_SPACING":
                        vme.initialiseUImoreDialogs("f_HORIZONTAL_SPACING");
                        break;
                    case "mVERTICAL_SPACING":
                        vme.initialiseUImoreDialogs("f_VERTICAL_SPACING");
                        break;
                    case "mSPECIAL_CHARACTER":
                        vme.initialiseUImoreDialogs("f_SPECIAL_CHARACTER");
                        break;
                    case "mHTML_MODE":
                        $("#btENCLOSE_TYPE").click();
                        break;
                    case "mKEYBOARD":
                        if (!vme.runNotVirtualKeyboard) {
                            vme.VKI_show(window.document.getElementById("tKEYBOARD"));
                            $("#keyboardInputMaster").draggable({
                                handle: '#keyboardTitle'
                            });
                        }
                        break;
                    default:
                        $.messager.show({
                            title: "<span class='rtl-title-withicon'>" + vme.getLocalText("INFORMATION") + "</span>",
                            msg: item.text
                        });
                        break;
                    }
                }
            });

            if (!window.opener) {
                $("#mQUIT_EDITOR").addClass("menu-item-disabled").click(
                    function () {
                        vme.closeEditor();
                    }
                );
            }

            if (this.runNotMathJax || this.runNotCanvg) {
                $("#mPNG_IMG").addClass("menu-item-disabled");
            }

            if (this.runNotMathJax) {
                $("#mSVG").addClass("menu-item-disabled");
                $("#mMATH_ML").addClass("menu-item-disabled");
                $("#mLATEX_CODES_LIST").addClass("menu-item-disabled");
                $("#mASCIIMATH_CODES_LIST").addClass("menu-item-disabled");
            }

            if (!($.browser.mozilla || $.browser.chrome)) {
                $("#btDIRECT_EXPORT_PNG_EXPORT").hide();
            }

            if (window.FileReader === undefined) {
                $("#mOPEN_EQUATION").addClass("menu-item-disabled").click(
                    function () {
                        vme.testOpenFile();
                    }
                );
            }
            $("#fOPEN_EQUATION").change(function (event) {
                vme.openFile(event);
            });

            this.initialiseUIaccordion("#f_SYMBOLS");
            this.initialiseUIaccordion("#f_SYMBOLS2");

            $('#tINFORMATIONS').tabs({
                onLoad: function (panel) {
                    switch (panel.attr("id")) {
                    case "tCOPYRIGHT":
                        $("#VMEdate").html((new Date()).getFullYear());
                        break;
                    case "tVERSION":
                        $("#VMEversion").html(
                            "<table>"
                                + "<tr><td><b>" + vme.version + "</b></td><td><b>Visual Math Editor</b>, (This software)</td></tr>"
                                + (vme.runNotJsPDF ? "" : ("<tr><td>1.0.6</td><td>svg2pdf</td></tr>"))
                                + (vme.runNotJsPDF ? "" : ("<tr><td>" + jsPDF.version + " </td><td>jsPDF</td></tr>"))
                                + (vme.runNotCanvg ? "" : ("<tr><td>1.0.0 16/02/2017</td><td>Canvg</td></tr>"))
                                + (vme.runNotMathJax ? "" : ("<tr><td>" + MathJax.version + " </td><td>Math Jax</td></tr>"))
                                + (vme.runNotCodeMirror ? "" : ("<tr><td>" + CodeMirror.version + " </td><td>Code Mirror</td></tr>"))
                                + (vme.runNotVirtualKeyboard ? "" : ("<tr><td>" + vme.VKI_version() + " </td><td>Virtual Keyboard</td></tr>"))
                                + "<tr><td>" + $.fn.jquery + " </td><td>Jquery</td></tr>"
                                + "<tr><td>" + "1.3.3" + " </td><td>Jquery Easyui</td></tr>"
                                + (vme.runNotColorPicker ? "" : ("<tr><td>23/05/2009</td><td>Jquery Color Picker</td></tr>"))
                                + "<table>"
                        );
                        break;
                    case "tEQUATION":
                        vme.initialiseSymbolContent(panel.attr("id"));
                        if (!vme.runNotMathJax) {
                            MathJax.Hub.Queue(["Typeset", MathJax.Hub, panel.attr("id")]);
                        }
                        break;
                    }
                }
            });

            $('#btMATRIX_CLOSE').click(function (event) {
                event.preventDefault();
                $('#wMATRIX').dialog('close');
                vme.setFocus();
            });

            $('#btMATRIX_SET').click(function (event) {
                event.preventDefault();

                if (vme.codeType === "AsciiMath") {
                    vme.setAsciiMatrixInEditor();
                } else {
                    vme.setLatexMatrixInEditor();
                }

                vme.updateOutput();

                $('#wMATRIX').dialog('close');
                vme.setFocus();
            });

            $('#colsMATRIX, #rowsMATRIX').keyup(function () {
                vme.updateMatrixWindow();
            });

            $('#btSTYLE_CHOISE_CLOSE').click(function (event) {
                event.preventDefault();
                $('#wSTYLE_CHOISE').dialog('close');
                vme.setFocus();
            });

            $('#btLANGUAGE_CHOISE_CLOSE').click(function (event) {
                event.preventDefault();
                $('#wLANGUAGE_CHOISE').dialog('close');
                vme.setFocus();
            });

            $('#btEDITOR_PARAMETERS_CLOSE').click(function (event) {
                event.preventDefault();
                $('#wEDITOR_PARAMETERS').dialog('close');
                vme.setFocus();
            });

            $("input[name='localType']").change(function () {
                vme.localType = $("input[name='localType']:checked").val();
                vme.localize();
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_localType", vme.localType, 1000);
                }
                vme.printCodeType();
            });

            $("input[name='codeType']").change(function () {
                vme.codeType = $("input[name='codeType']:checked").val();
                vme.printCodeType();
                vme.updateOutput();
            });

            $("input[name='style']").change(function () {
                vme.style = $("input[name='style']:checked").val();
                vme.chooseStyle();
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_style", vme.style, 1000);
                }
            });

            $("#encloseType").change(function () {
                vme.toggleHTMLmode();
            });

            $("#pngImgGlyphStrokeColor").change(function () {
                vme.pngImgGlyphStrokeColor = $("#pngImgGlyphStrokeColor").val();
                $("#pngImgGlyphStrokeColorView").css('backgroundColor', vme.pngImgGlyphStrokeColor);
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_pngImgGlyphStrokeColor", vme.pngImgGlyphStrokeColor, 1000);
                }
            });

            if (!vme.runNotColorPicker) {
                $("#pngImgGlyphStrokeColor").ColorPicker({
                    color: vme.pngImgGlyphStrokeColor,
                    flat: false,
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        vme.pngImgGlyphStrokeColor = '#' + hex;
                        $('#pngImgGlyphStrokeColorView').css('backgroundColor', vme.pngImgGlyphStrokeColor);
                        $('#pngImgGlyphStrokeColor').val(vme.pngImgGlyphStrokeColor).change();
                    },
                    onSubmit: function (hsb, hex, rgb, el) {
                        vme.pngImgGlyphStrokeColor = '#' + hex;
                        $('#pngImgGlyphStrokeColorView').css('backgroundColor', vme.pngImgGlyphStrokeColor);
                        $('#pngImgGlyphStrokeColor').val(vme.pngImgGlyphStrokeColor).change();
                        $(el).ColorPickerHide();
                    }
                });
            }

            $("#pngImgGlyphFillColor").change(function () {
                vme.pngImgGlyphFillColor = $("#pngImgGlyphFillColor").val();
                $("#pngImgGlyphFillColorView").css('backgroundColor', vme.pngImgGlyphFillColor);
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_pngImgGlyphFillColor", vme.pngImgGlyphFillColor, 1000);
                }
            });

            if (!vme.runNotColorPicker) {
                $("#pngImgGlyphFillColor").ColorPicker({
                    color: vme.pngImgGlyphFillColor,
                    flat: false,
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        vme.pngImgGlyphFillColor = '#' + hex;
                        $('#pngImgGlyphFillColorView').css('backgroundColor', vme.pngImgGlyphFillColor);
                        $('#pngImgGlyphFillColor').val(vme.pngImgGlyphFillColor).change();
                    },
                    onSubmit: function (hsb, hex, rgb, el) {
                        vme.pngImgGlyphFillColor = '#' + hex;
                        $('#pngImgGlyphFillColorView').css('backgroundColor', vme.pngImgGlyphFillColor);
                        $('#pngImgGlyphFillColor').val(vme.pngImgGlyphFillColor).change();
                        $(el).ColorPickerHide();
                    }
                });
            }

            $("#pngImgBackgroundStrokeColor").change(function () {
                vme.pngImgBackgroundStrokeColor = $("#pngImgBackgroundStrokeColor").val();
                $("#pngImgBackgroundStrokeColorView").css('backgroundColor', vme.pngImgBackgroundStrokeColor);
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_pngImgBackgroundStrokeColor", vme.pngImgBackgroundStrokeColor, 1000);
                }
            });

            if (!vme.runNotColorPicker) {
                $("#pngImgBackgroundStrokeColor").ColorPicker({
                    color: vme.pngImgBackgroundStrokeColor,
                    flat: false,
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        vme.pngImgBackgroundStrokeColor = '#' + hex;
                        $('#pngImgBackgroundStrokeColorView').css('backgroundColor', vme.pngImgBackgroundStrokeColor);
                        $('#pngImgBackgroundStrokeColor').val(vme.pngImgBackgroundStrokeColor).change();
                    },
                    onSubmit: function (hsb, hex, rgb, el) {
                        vme.pngImgBackgroundStrokeColor = '#' + hex;
                        $('#pngImgBackgroundStrokeColorView').css('backgroundColor', vme.pngImgBackgroundStrokeColor);
                        $('#pngImgBackgroundStrokeColor').val(vme.pngImgBackgroundStrokeColor).change();
                        $(el).ColorPickerHide();
                    }
                });
            }

            $("#pngImgBackgroundFillColor").change(function () {
                vme.pngImgBackgroundFillColor = $("#pngImgBackgroundFillColor").val();
                $("#pngImgBackgroundFillColorView").css('backgroundColor', vme.pngImgBackgroundFillColor);
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_pngImgBackgroundFillColor", vme.pngImgBackgroundFillColor, 1000);
                }
            });

            if (!vme.runNotColorPicker) {
                $("#pngImgBackgroundFillColor").ColorPicker({
                    color: vme.pngImgBackgroundFillColor,
                    flat: false,
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        vme.pngImgBackgroundFillColor = '#' + hex;
                        $('#pngImgBackgroundFillColorView').css('backgroundColor', vme.pngImgBackgroundFillColor);
                        $('#pngImgBackgroundFillColor').val(vme.pngImgBackgroundFillColor).change();
                    },
                    onSubmit: function (hsb, hex, rgb, el) {
                        vme.pngImgBackgroundFillColor = '#' + hex;
                        $('#pngImgBackgroundFillColorView').css('backgroundColor', vme.pngImgBackgroundFillColor);
                        $('#pngImgBackgroundFillColor').val(vme.pngImgBackgroundFillColor).change();
                        $(el).ColorPickerHide();
                    }
                });
            }

            $("#autoUpdateTime").change(function () {
                vme.autoUpdateTime = $("#autoUpdateTime").val();
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_autoUpdateTime", vme.autoUpdateTime, 1000);
                }
            });

            $("#menuupdateType").change(function () {
                vme.menuupdateType = ($('#menuupdateType').attr('checked') !== undefined);
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_menuupdateType", vme.menuupdateType, 1000);
                }
            });

            $("#autoupdateType").change(function () {
                vme.autoupdateType = ($('#autoupdateType').attr('checked') !== undefined);
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_autoupdateType", vme.autoupdateType, 1000);
                }
            });

            $("#menuMathjaxType").change(function () {
                vme.switchMathJaxMenu();
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_menuMathjaxType", vme.menuMathjaxType, 1000);
                }
            });

            $("#fontInheritMathjaxType").change(function () {
                vme.switchMathJaxFontInherit();
                vme.updateOutput();
                if (vme.saveOptionInCookies) {
                    vme.setCookie("VME_fontInheritMathjaxType", vme.fontInheritMathjaxType, 1000);
                }
            });

            $("#cookieType").change(function () {
                vme.saveOptionInCookies = ($('#cookieType').attr('checked') !== undefined);
                vme.saveCookies();
            });

            $(window).resize(function () {
                setTimeout(
                    function () { vme.resizeDivInputOutput(); },
                    500
                );
            });

            $("#mathVisualOutput")
                .bind('contextmenu', function (event) {
                    event.preventDefault();
                    $('#mVIEW').menu('show', {
                        left: event.pageX,
                        top: event.pageY
                    });
                    return false;
                });

            if (vme.runNotCodeMirror) {
                $("#mathTextInput")
                    .bind('contextmenu', function (event) {
                        event.preventDefault();
                        $('#mINSERT').menu('show', {
                            left: event.pageX,
                            top: event.pageY
                        });
                        return false;
                    })
                    .keyup(function (event) {
                        var key = event.keyCode || event.which;
                        if (($.inArray(key, vme.notAllowedKeys) === -1) && !($.inArray(key, vme.notAllowedCtrlKeys) !== -1 && event.ctrlKey) && !($.inArray(key, vme.notAllowedAltKeys) !== -1 && event.altKey)) {
                            vme.autoUpdateOutput();
                        }
                    });

                this.mathTextInput.setSelectionRange(this.mathTextInput.value.length, this.mathTextInput.value.length);
            }

            $("[data-information]").mouseover(function () {
                $("#divInformation").html(vme.getLocalText($(this).attr("data-information")));
            });
            $("[data-information]").mouseout(function () {
                $("#divInformation").html("&nbsp;");
            });

            $('#unicodeChoise').combobox({
                valueField: 'value',
                textField: 'text',
                onSelect: function (record) {
                    var range = record.value.split(",");
                    vme.setUniCodesValues(vme.h2d(range[0]), vme.h2d(range[1]));
                },
                onLoadSuccess: function () {
                    $(this).combobox("select", "0x25A0,0x25FF");
                    vme.setUniCodesValues(0x25A0, 0x25FF);
                }
            });

            $("#wEXPORT_PNG").dialog({
                onOpen: function () {
                    var svg_obj, dimention, viewBox, dialogObj, innerDialog, w, h;

                    svg_obj = vme.updateCanvasSvg();
                    dimention = svg_obj.dimention;
                    viewBox = svg_obj.viewBox;
                    viewBox = viewBox.split(" ");
                    viewBox.width = parseFloat(viewBox[2]);
                    viewBox.height = parseFloat(viewBox[3]);
                    dialogObj = $($("#wEXPORT_PNG").dialog('panel'));
                    innerDialog = $("#wEXPORT_PNG .dialog-content"); //$($("#wEXPORT_PNG").dialog('body')) pas le bon height à cause des buttons

                    w = (dialogObj.outerWidth() - innerDialog.outerWidth()) + dimention.width * vme.pngImgZoom;
                    h = (dialogObj.outerHeight() - innerDialog.outerHeight()) + viewBox.height / viewBox.width * dimention.width * vme.pngImgZoom;

                    $("#wEXPORT_PNG").tooltip('show');
                    $("#canvasEXPORT_PNG").tooltip('show');
                    $(this).dialog('resize', {width: w, height: h}).dialog('center');
                },
                onMove: function () {
                    if (vme.isBuild) {
                        vme.showCanvasHelp();
                    }
                },
                onResize: function () {
                    if (vme.isBuild) {
                        vme.updateCanvasSize();
                        vme.updateCanvasSvg();
                        vme.showCanvasHelp();
                    }
                },
                onClose: function () {
                    vme.hideCanvasHelp();
                    vme.contextMenuSVG = null;
                }
            });

            $("#wEXPORT_PNG").tooltip({
                hideEvent: 'none',
                showEvent: 'none',
                content: function () {
                    return $('#btEXPORT_PNG');
                }
            });

            $("#canvasEXPORT_PNG").tooltip({
                position: 'top',
                deltaY: -23,
                hideEvent: 'none',
                showEvent: 'none',
                content: function () {
                    return $('#divEXPORT_SIZE');
                }
            });

            $("#btEXPORT_PNG_EXPORT").click(function (event) {
                event.preventDefault();
                if (!vme.runNotMathJax && !vme.runNotCanvg) {
                    vme.viewPngImg();
                    $('#wEXPORT_PNG').dialog('close');
                }
            });

            $("#btDIRECT_EXPORT_PNG_EXPORT").click(function (event) {
                event.preventDefault();
                if (!vme.runNotMathJax && !vme.runNotCanvg) {
                    vme.directSavePngImg();
                    $('#wEXPORT_PNG').dialog('close');
                }
            });

            $("#btZOOM_IN_PNG_EXPORT").click(function (event) {
                event.preventDefault();
                if (vme.pngImgZoom >= 1) {
                    vme.pngImgZoom = vme.pngImgZoom + 1;
                    $('#wEXPORT_PNG').dialog('open');
                } else if (vme.pngImgZoom <= 1) {
                    vme.pngImgZoom = Math.round((vme.pngImgZoom + 0.1) * 10) / 10;
                    $('#wEXPORT_PNG').dialog('open');
                }
            });

            $("#btZOOM_OUT_PNG_EXPORT").click(function (event) {
                event.preventDefault();
                if (vme.pngImgZoom > 1) {
                    vme.pngImgZoom = vme.pngImgZoom - 1;
                    $('#wEXPORT_PNG').dialog('open');
                } else if (vme.pngImgZoom <= 1 && vme.pngImgZoom > 0) {
                    vme.pngImgZoom = Math.round((vme.pngImgZoom - 0.1) * 10) / 10;
                    if (vme.pngImgZoom < 0.1) {
                        vme.pngImgZoom = 0.1;
                    }
                    $('#wEXPORT_PNG').dialog('open');
                }
            });

        },

        /**
         * Ouvre la fenêtre d'information sur l'onglet précisé par numTab
         * @param {Number} numTab numéro de l'onglet d'information à ouvrir [0 à 3]
         */
        openInformationTab: function (numTab) {
            $('#wINFORMATIONS').window('open');
            $('#tINFORMATIONS').tabs('select', numTab);
        },

        resizeDivInputOutput: function () {
            var htmlTagHeight, inputOutputHeight, inputOutputWidth;
            htmlTagHeight = 0;
            if ($('#HTML_TAG').is(':visible')) {
                htmlTagHeight = $('#HTML_TAG').height() + 1;
            }
            inputOutputHeight = $("#divEquationInputOutput").height();
            inputOutputWidth = $("#divEquationInputOutput").width();
            $("#divMathTextInput").height(inputOutputHeight / 2 - htmlTagHeight / 2);
            $("#mathTextInput").height(inputOutputHeight / 2 - 10 - htmlTagHeight / 2);
            $("#mathTextInput").width(inputOutputWidth - 10);
            $("#mathVisualOutput").height(inputOutputHeight / 2 - 11 - htmlTagHeight / 2);
            if (!this.runNotCodeMirror && this.codeMirrorEditor) {
                this.codeMirrorEditor.setSize($("#divMathTextInput").width() + 1, $("#divMathTextInput").height());
            }
        },

        initialiseUImoreDialogs: function (fPanelID) {
            /*jslint evil: true */ // To alow eval function

            var fPanelMoreID, fPanelMore, cookie;
            fPanelMoreID = 'w' + fPanelID + '_MORE';
            fPanelMore = $('#' + fPanelMoreID);

            if (vme.symbolPanelsLoaded.indexOf(fPanelMoreID) === -1) {
                vme.symbolPanelsLoaded[vme.symbolPanelsLoaded.length] = fPanelMoreID;
                cookie = vme.getCookie("VME_Position_" + fPanelMoreID);
                $(fPanelMore).dialog({
                    onLoad: function () {
                        vme.initialiseSymbolContent(fPanelMoreID);
                    },
                    onMove: function (left, top) {
                        if (vme.saveOptionInCookies) {
                            vme.setCookie("VME_Position_" + fPanelMoreID, "{left:" + left + ",top:" + top + "}", 1000);
                        }
                    },
                    title: $("#" + fPanelMoreID + "_TITLE").html()
                });
                $(fPanelMore).dialog('open');
                if (!vme.runNotMathJax) {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, fPanelMoreID + "_TITLE"]);
                }

                $(fPanelMore).dialog('refresh', "formulas/" + fPanelID + "_MORE.html");

                if (cookie && cookie !== undefined) {
                    $(fPanelMore).dialog('move', eval('(' + cookie + ')'));
                } else {
                    $(fPanelMore).dialog('move', eval('(' + $(fPanelMore).attr("position") + ')'));
                }

            } else {
                $(fPanelMore).dialog('open');
            }
        },

        initialiseUIaccordion: function (accordionID) {
            var vme = this,
                fPanelID,
                p;
            $(accordionID).accordion({
                onSelect: function () {
                    var fPanel = $(accordionID).accordion("getSelected");
                    if (fPanel) {
                        fPanelID = $(fPanel).attr("id");
                        if (vme.symbolPanelsLoaded.indexOf(fPanelID) === -1) {
                            vme.symbolPanelsLoaded[vme.symbolPanelsLoaded.length] = fPanelID;
                            $(fPanel).html("<img src='js/jquery-easyui/themes/aguas/images/loading.gif' />");
                            $(fPanel).load("formulas/" + fPanelID + ".html", function () {
                                vme.initialiseSymbolContent(fPanelID);

                                $("#" + fPanelID + " a.more").click(function (event) {
                                    event.preventDefault();
                                    vme.initialiseUImoreDialogs(fPanelID);
                                });

                                vme.chooseStyle(); //to apply color of .symbol_btn images
                            });
                        }
                    }

                    vme.setFocus();
                }
            });

            p = $(accordionID).accordion('getSelected');
            if (p) {
                p.panel('collapse', false);
            }
            //p = $(accordionID).accordion("select", 1); //Doesn't work ?
        },

        initialiseSymbolContent: function (fPanelID) { // A FAIRE : Correction du bug, ne reprend pas en compte de nouveau title easyui-tooltip quand switchCodeType() Latex <> Ascii
            var vme = this;

            function getSymbol(obj) {
                var symbol = "";
                if (vme.codeType === "AsciiMath") {
                    if ($(obj).attr("abegin") !== undefined && $(obj).attr("aend") !== undefined) {
                        symbol = $(obj).attr("abegin") + $(obj).attr("aend");
                    } else if ($(obj).attr("ascii") !== undefined) {
                        symbol = $(obj).attr("ascii");
                    } else {
                        symbol = vme.getLocalText("NO_ASCII");
                    }
                } else {
                    if ($(obj).attr("lbegin") !== undefined && $(obj).attr("lend") !== undefined) {
                        symbol = $(obj).attr("lbegin") + $(obj).attr("lend");
                    } else if ($(obj).attr("latex") !== undefined) {
                        symbol = $(obj).attr("latex");
                    } else {
                        symbol = vme.getLocalText("NO_LATEX");
                    }
                }
                return symbol;
            }

            //link s class (for symbol)    set the AsciiMath symbol in ascii attribut and LaTeX symbol in latex attribut
            $("#" + fPanelID + " a.s")
                .addClass("easyui-tooltip")
                .attr("title", function () { //index, attr
                    return getSymbol(this);
                })
                .mouseover(function () {
                    $("#divInformation").html(getSymbol(this));
                })
                .mouseout(function () {
                    $("#divInformation").html("&nbsp;");
                })
                .click(function (event) {
                    event.preventDefault();
                    if (vme.codeType === "AsciiMath") {
                        if ($(this).attr("abegin") !== undefined && $(this).attr("aend") !== undefined) {
                            vme.tag($(this).attr("abegin"), $(this).attr("aend"));
                        } else if ($(this).attr("ascii") !== undefined) {
                            vme.insert($(this).attr("ascii"));
                        } else {
                            $.messager.show({
                                title: "<span class='rtl-title-withicon'>" + vme.getLocalText("INFORMATION") + "</span>",
                                msg: vme.getLocalText("NO_ASCII")
                            });
                        }
                    } else {
                        if ($(this).attr("lbegin") !== undefined && $(this).attr("lend") !== undefined) {
                            vme.tag($(this).attr("lbegin"), $(this).attr("lend"));
                        } else if ($(this).attr("latex") !== undefined) {
                            vme.insert($(this).attr("latex"));
                        } else {
                            $.messager.show({
                                title: "<span class='rtl-title-withicon'>" + vme.getLocalText("INFORMATION") + "</span>",
                                msg: vme.getLocalText("NO_LATEX")
                            });
                        }
                    }
                });

            $.parser.parse("#" + fPanelID);
            if (!vme.runNotMathJax) {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, fPanelID]);
            }
        },

        initialiseCodeType: function () {
            var param = this.url.param('codeType'),
                cookie;
            if (param && param !== undefined) {
                this.codeType = param;
            } else {
                cookie = this.getCookie("VME_codeType");
                if (cookie && cookie !== undefined) {
                    this.codeType = cookie;
                }
            }
            this.printCodeType();
        },

        switchCodeType: function () {
            this.codeType = (this.codeType === "AsciiMath") ? "Latex" : "AsciiMath";
            this.printCodeType();
            this.updateOutput();
        },

        printCodeType: function () {
            $("[name='codeType']").filter("[value=" + this.codeType + "]").attr("checked", "checked");
            $("#title_Edition_Current_Syntax").text(this.codeType);
            $("#title_Edition_Other_Syntax").text((this.codeType === "AsciiMath") ? "Latex" : "AsciiMath");
            if (this.saveOptionInCookies) {
                this.setCookie("VME_codeType", this.codeType, 1000);
            }
        },

        initialiseStyle: function () {
            var param = this.url.param('style'),
                cookie;
            if (param && param !== undefined) {
                this.style = param;
            } else {
                cookie = this.getCookie("VME_style");
                if (cookie && cookie !== undefined) {
                    this.style = cookie;
                }
            }

            $("[name='style']").filter("[value=" + this.style + "]").attr("checked", "checked");
            this.chooseStyle();
        },

        initialiseLocalType: function () {
            var param = this.url.param('localType'),
                cookie,
                html,
                lang,
                langage,
                langCode,
                langDir,
                langAuthor;
            if (param && param !== undefined) {
                this.localType = param;
            } else {
                cookie = this.getCookie("VME_localType");
                if (cookie && cookie !== undefined) {
                    this.localType = cookie;
                }
            }

            html = "<fieldset dir='ltr'>";
            for (lang in this.locale ) { //ex : fr_FR
                if (this.locale.hasOwnProperty(lang)) {
                    langage = this.locale[lang].i18n_Langage; //ex : Français (France)
                    langCode = this.locale[lang].i18n_HTML_Lang; //ex : fr
                    langDir = this.locale[lang].i18n_HTML_Dir; //ex : ltr
                    langAuthor = this.locale[lang].i18n_Author; //ex : <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a>
                    html += "\n\t<input type='radio' name='localType' id='" + lang + "_localType' value='" + lang + "' /> <label for='" + lang + "_localType' dir='" + langDir + "'><!--img src='js/i18n/icons/" + langCode + ".png' width='16' height='11' alt='" + langCode + "' / -->" + langage + "</label> - " + langAuthor + "<br />";
                }
            }
            html += "\n</fieldset>";
            $("#formLANGUAGE_CHOISE").html(html);
        },

        initialiseLanguage: function () {
            $("[name='localType']").filter("[value=" + this.localType + "]").attr("checked", "checked");
            this.localize();
        },

        initialiseEquation: function () {
            var param = this.url.param('equation');
            if (param && param !== undefined) {
                param = decodeURIComponent(param);
                if (!this.runNotCodeMirror && this.codeMirrorEditor) {
                    this.codeMirrorEditor.setValue(param);
                    this.setCodeMirrorCursorAtEnd();
                } else {
                    this.mathTextInput.value = param;
                }
                this.updateOutput();
            } else {
                this.getEquationFromCaller();
            }
            if (!this.textAreaForSaveASCII) {
                $("#mUPDATE_EQUATION").addClass("menu-item-disabled").click(function () {
                    vme.getEquationFromCaller();
                });
                $("#mSET_EQUATION").addClass("menu-item-disabled").click(function () {
                    vme.setEquationInCaller();
                });
            }
        },

        initialiseParameters: function () {
            var cookie = null,
                param = null;

            param = this.url.param('encloseAllFormula');
            if (param && param !== undefined) {
                this.encloseAllFormula = this.getBoolean(param);
            } else {
                cookie = this.getCookie("VME_encloseAllFormula");
                if (cookie && cookie !== undefined) { this.encloseAllFormula = this.getBoolean(cookie); }
            }
            this.encloseAllFormula = !this.encloseAllFormula;
            this.toggleHTMLmode();

            param = this.url.param('saveOptionInCookies');
            if (param && param !== undefined) {
                this.saveOptionInCookies = this.getBoolean(param);
            } else {
                cookie = this.getCookie("VME_saveOptionInCookies");
                if (cookie && cookie !== undefined) { this.saveOptionInCookies = this.getBoolean(cookie); }
            }
            if (this.saveOptionInCookies) { $("#cookieType").attr("checked", "checked"); }

            param = this.url.param('pngImgGlyphStrokeColor');
            if (param && param !== undefined) {
                this.pngImgGlyphStrokeColor = param.replace(/%23/gi, "#");
            } else {
                cookie = this.getCookie("VME_pngImgGlyphStrokeColor");
                if (cookie && cookie !== undefined) { this.pngImgGlyphStrokeColor = cookie; }
            }
            if (this.pngImgGlyphStrokeColor) {
                $("#pngImgGlyphStrokeColorView").css('backgroundColor', this.pngImgGlyphStrokeColor);
                $("#pngImgGlyphStrokeColor").val(this.pngImgGlyphStrokeColor);
            }

            param = this.url.param('pngImgGlyphFillColor');
            if (param && param !== undefined) {
                this.pngImgGlyphFillColor = param.replace(/%23/gi, "#");
            } else {
                cookie = this.getCookie("VME_pngImgGlyphFillColor");
                if (cookie && cookie !== undefined) { this.pngImgGlyphFillColor = cookie; }
            }
            if (this.pngImgGlyphFillColor) {
                $("#pngImgGlyphFillColorView").css('backgroundColor', this.pngImgGlyphFillColor);
                $("#pngImgGlyphFillColor").val(this.pngImgGlyphFillColor);
            }

            param = this.url.param('pngImgBackgroundStrokeColor');
            if (param && param !== undefined) {
                this.pngImgBackgroundStrokeColor = param.replace(/%23/gi, "#");
            } else {
                cookie = this.getCookie("VME_pngImgBackgroundStrokeColor");
                if (cookie && cookie !== undefined) { this.pngImgBackgroundStrokeColor = cookie; }
            }
            if (this.pngImgBackgroundStrokeColor) {
                $("#pngImgBackgroundStrokeColorView").css('backgroundColor', this.pngImgBackgroundStrokeColor);
                $("#pngImgBackgroundStrokeColor").val(this.pngImgBackgroundStrokeColor);
            }

            param = this.url.param('pngImgBackgroundFillColor');
            if (param && param !== undefined) {
                this.pngImgBackgroundFillColor = param.replace(/%23/gi, "#");
            } else {
                cookie = this.getCookie("VME_pngImgBackgroundFillColor");
                if (cookie && cookie !== undefined) { this.pngImgBackgroundFillColor = cookie; }
            }
            if (this.pngImgBackgroundFillColor) {
                $("#pngImgBackgroundFillColorView").css('backgroundColor', this.pngImgBackgroundFillColor);
                $("#pngImgBackgroundFillColor").val(this.pngImgBackgroundFillColor);
            }

            param = this.url.param('autoUpdateTime');
            if (param && param !== undefined) {
                this.autoUpdateTime = param;
            } else {
                cookie = this.getCookie("VME_autoUpdateTime");
                if (cookie && cookie !== undefined) { this.autoUpdateTime = cookie; }
            }
            if (this.autoUpdateTime) { $("#autoUpdateTime").val(this.autoUpdateTime); }

            param = this.url.param('menuupdateType');
            if (param && param !== undefined) {
                this.menuupdateType = this.getBoolean(param);
            } else {
                cookie = this.getCookie("VME_menuupdateType");
                if (cookie && cookie !== undefined) { this.menuupdateType = this.getBoolean(cookie); }
            }
            if (this.menuupdateType) { $("#menuupdateType").attr("checked", "checked"); }

            param = this.url.param('autoupdateType');
            if (param && param !== undefined) {
                this.autoupdateType = this.getBoolean(param);
            } else {
                cookie = this.getCookie("VME_autoupdateType");
                if (cookie && cookie !== undefined) { this.autoupdateType = this.getBoolean(cookie); }
            }
            if (this.autoupdateType) { $("#autoupdateType").attr("checked", "checked"); }

            param = this.url.param('menuMathjaxType');
            if (param && param !== undefined) {
                this.menuMathjaxType = this.getBoolean(param);
            } else {
                cookie = this.getCookie("VME_menuMathjaxType");
                if (cookie && cookie !== undefined) { this.menuMathjaxType = this.getBoolean(cookie); }
            }
            if (this.menuMathjaxType) { $("#menuMathjaxType").attr("checked", "checked"); }
            this.switchMathJaxMenu();

            param = this.url.param('fontInheritMathjaxType');
            if (param && param !== undefined) {
                this.fontInheritMathjaxType = this.getBoolean(param);
            } else {
                cookie = this.getCookie("VME_fontInheritMathjaxType");
                if (cookie && cookie !== undefined) { this.fontInheritMathjaxType = this.getBoolean(cookie); }
            }
            if (this.fontInheritMathjaxType) { $("#fontInheritMathjaxType").attr("checked", "checked"); }
            this.switchMathJaxFontInherit();
        },

        switchMathJaxMenu: function () {
            if ($('#menuMathjaxType').attr('checked') === undefined) {
                this.menuMathjaxType = false;
                if (!this.runNotMathJax) { MathJax.Hub.Config({showMathMenu: false, showMathMenuMSIE: false}); }
            } else {
                this.menuMathjaxType = true;
                if (!this.runNotMathJax) { MathJax.Hub.Config({showMathMenu: true, showMathMenuMSIE: true}); }
            }
        },

        switchMathJaxFontInherit: function () {
            if ($('#fontInheritMathjaxType').attr('checked') === undefined) {
                this.fontInheritMathjaxType = false;
                if (!this.runNotMathJax) { MathJax.Hub.Config({"SVG": {mtextFontInherit: false}}); }
            } else {
                this.fontInheritMathjaxType = true;
                if (!this.runNotMathJax) { MathJax.Hub.Config({"SVG": {mtextFontInherit: true}}); }
            }
        },

        initialiseAsciiMathCodesList: function () {
            if (!this.asciiMathCodesListLoaded) {
                var symbols = (this.runNotMathJax ? {} : MathJax.InputJax.AsciiMath.AM.symbols),
                    ascii,
                    html,
                    s;
                html = ("<table border='1' cellspacing='0' style='margin-left:20px;border-spacing:0px;border-collapse:collapse;'><caption>" + symbols.length + " <span data-locate='ASCIIMATH_SYMBOLS'>"    + this.getLocalText("ASCIIMATH_SYMBOLS") + "</span></caption>");
                html += ("\n<tr><th><span data-locate='ASCIIMATH_INPUT'>" + this.getLocalText("ASCIIMATH_INPUT") + "</span></th><th><span data-locate='OUTPUT'>" + this.getLocalText("OUTPUT") + "</span></th><th><span data-locate='LATEX_EQUIVALENT'>"    + this.getLocalText("LATEX_EQUIVALENT") + "</span></th></tr>");
                for (s = 0; s < symbols.length; s += 1) {
                    ascii = symbols[s];
                    html += ('\n<tr><td dir="ltr"><a href="#" class="s" ascii="' + ascii.input + '">' + ascii.input + '</a></td><td    dir="ltr" style="font-size:150%;"><a href="#" class="s" ascii="' + (ascii.input || '') + '" ' + (ascii.tex ? 'latex="\\' + ascii.tex + '"' : '') + '>' + (ascii.output || '') + '</a></td><td dir="ltr">' + (ascii.tex ? '<a href="#" class="s" latex="\\' + ascii.tex + '">' + ascii.tex + '</a>' : '') + '</td></tr>');
                }
                html += "\n</table>";
                $("#cASCIIMATH_CODES_LIST").html(html);
                this.initialiseSymbolContent("cASCIIMATH_CODES_LIST");
                this.asciiMathCodesListLoaded = true;
            }
        },

        initialiseLatexMathjaxCodesList: function () {

            function listNames(obj, prefix) {
                var html = "",
                    i;
                for (i in obj) {
                    if (obj[i] !== 'Space') {
                        html += ('<tr><td dir="ltr"><a href="#" class="s" latex="' + prefix + i + '">' + prefix + i + '</a></td><td></td></tr>');
                    }
                }
                return html;
            }

            function listNamesValues(obj, prefix) {
                var html = "",
                    hexa = 0,
                    output = "",
                    i;
                for (i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        if (typeof obj[i] === 'object') {
                            hexa = parseInt(obj[i][0], 16);
                            if (isNaN(hexa)) {
                                output = obj[i][0];
                            } else {
                                output = "&#x" + obj[i][0] + ";";
                            }
                            html += ('<tr><td dir="ltr"><a href="#" class="s" latex="' + prefix + i + '">' + prefix + i + '</a><td style="font-size:150%;"><a href="#" class="s" latex="' + prefix + i + '">' + output + '</a></td></tr>');
                        } else {
                            hexa = parseInt(obj[i], 16);
                            if (isNaN(hexa)) {
                                output = obj[i];
                            } else {
                                output = "&#x" + obj[i] + ";";
                            }
                            html += ('<tr><td dir="ltr"><a href="#" class="s" latex="' + prefix + i + '">' + prefix + i + '</a><td style="font-size:150%;"><a href="#" class="s" latex="' + prefix + i + '">' + output + '</a></td></tr>');
                        }
                    }
                }
                return html;
            }

            if (!this.latexMathjaxCodesListLoaded) {
                if (!Object.keys) {
                    Object.keys = function (obj) {
                        var keys = [],
                            k;
                        for (k in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                                keys.push(k);
                            }
                        }
                        return keys;
                    };
                }

                var special = (this.runNotMathJax ? {} : (MathJax.InputJax.TeX.Definitions.special)),
                    remap = (this.runNotMathJax ? {} : (MathJax.InputJax.TeX.Definitions.remap)),
                    mathchar0mi = (this.runNotMathJax ? {} : (MathJax.InputJax.TeX.Definitions.mathchar0mi)),
                    mathchar0mo = (this.runNotMathJax ? {} : (MathJax.InputJax.TeX.Definitions.mathchar0mo)),
                    mathchar7 = (this.runNotMathJax ? {} : (MathJax.InputJax.TeX.Definitions.mathchar7)),
                    delimiter = (this.runNotMathJax ? {} : (MathJax.InputJax.TeX.Definitions.delimiter)),
                    macros = (this.runNotMathJax ? {} : (MathJax.InputJax.TeX.Definitions.macros)),
                    environment = (this.runNotMathJax ? {} : (MathJax.InputJax.TeX.Definitions.environment)),
                    length = (
                        Object.keys(special).length
                        + Object.keys(remap).length
                        + Object.keys(mathchar0mi).length
                        + Object.keys(mathchar0mo).length
                        + Object.keys(mathchar7).length
                        + Object.keys(delimiter).length
                        + Object.keys(macros).length
                        + Object.keys(environment).length
                    ),
                    html = ("<table border='1' cellspacing='0' style='margin-left:20px;border-spacing:0px;border-collapse:collapse;'><caption>" + length + " <span data-locate='MATHJAX_LATEX_SYMBOLS'>"    + this.getLocalText("MATHJAX_LATEX_SYMBOLS") + "</span></caption>");

                html += ("\n<tr><th><span data-locate='MATHJAX_LATEX_INPUT'>" + this.getLocalText("MATHJAX_LATEX_INPUT") + "</span></th><th><span data-locate='OUTPUT'>" + this.getLocalText("OUTPUT") + "</span></th></tr>");

                html += listNames(special, "");
                html += listNamesValues(remap, "");
                html += listNamesValues(mathchar0mi, "\\");
                html += listNamesValues(mathchar0mo, "\\");
                html += listNamesValues(mathchar7, "\\");
                html += listNamesValues(delimiter, "");
                html += listNames(macros, "\\"); //A FAIRE : UN CAS PARTICULIER POUR CERTAINE MACRO par exemple les UnderOver et les Accent qui ont un output et les Macro qui sont redéfini ex \bmod ou \nonumber
                html += listNames(environment, "");

                html += "\n</table>";
                $("#cLATEX_CODES_LIST").html(html);
                this.initialiseSymbolContent("cLATEX_CODES_LIST");
                this.latexMathjaxCodesListLoaded = true;
            }
        },

        initialiseUniCodesList: function () {
            if (!this.uniCodesListLoaded) {
                var html = "<table><caption>[0x0000,0xFFFF]</caption>",
                    i,
                    j;
                for (i = 0; i <= 650; i += 10) {
                    html += "\n<tr>";
                    for (j = i; j < i + 10; j += 1) {
                        if (j > 655) { break; }
                        html += "<td><a style='border:1px solid #f0f0f0;' class='s' href='#' onclick='vme.selectUniCodesValues("
                            + ((j * 100) + 1) + "," + ((j + 1) * 100) + ");return false;'>"
                            + (i < 10 ? "00" : (i < 100 ? "0" : "")) + j + "</a></td>";
                    }
                    html += "</tr>";
                }
                html = html + "\n</table>";

                $("#cUNICODES_LIST").html(html);
                this.uniCodesListLoaded = true;

                $('#unicodeChoise').combobox("reload", "formulas/unicodeChoiseData.json");
            }
        },

        selectUniCodesValues: function (i1, i2) {
            $('#unicodeChoise').combobox("select", "");
            this.setUniCodesValues(i1, i2, true);
        },

        setUniCodesValues: function (i1, i2, breakFFFF) {
            var html = ("<table border='1' cellspacing='0' style='border-spacing:0px;border-collapse:collapse;'>"),
                i;
            html += ("\n<tr><th><span data-locate='UNICODES_INPUT'>" + this.getLocalText("UNICODES_INPUT") + "</span></th><th>HEXA</th><th><span data-locate='OUTPUT'>" + this.getLocalText("OUTPUT") + "</span></th></tr>");
            for (i = i1; i <= i2; i += 1) {
                if (breakFFFF && i > 65535) { break; }
                html += ("\n<tr><td>" + i + "<td style='text-align:center;'>" + this.d2h(i) + "</td><td style='font-size:150%;text-align:center;'><a href='#' class='s' latex='\\unicode{" + i + "} '>&#" + i + ";</a></td></tr>");
            }
            html = html + "\n</table>";

            $("#cUNICODES_VALUES").html(html);
            $("#cUNICODES_VALUES").scrollTop(0);
            this.initialiseSymbolContent("cUNICODES_VALUES");
        },

        showMatrixWindow: function (rows, cols) {
            this.updateMatrixWindow(rows, cols);
            $('#wMATRIX').dialog('open');
        },

        updateMatrixWindow: function (rows, cols) {

            if (rows !== undefined && rows !== null) { window.document.formMATRIX.rowsMATRIX.value = rows; }
            if (cols !== undefined && cols !== null) { window.document.formMATRIX.colsMATRIX.value = cols; }

            rows = window.document.formMATRIX.rowsMATRIX.value;
            cols = window.document.formMATRIX.colsMATRIX.value;

            var html = '<table style="border-spacing:0px; border-collapse:collapse;">',
                r,
                c,
                value,
                width,
                height;
            for (r = 1; r <= rows; r += 1) {
                html += "<tr>";
                for (c = 1; c <= cols; c += 1) {
                    value = (vme.codeType === "AsciiMath" ? "a_" + r + c : "a_{" + r + c + "}");
                    html = html + "<td><input type='text' size='5' name='a_" + r + c + "' value='" + value + "'/></td>";
                }
                html += "</tr>";
            }
            html += "</table>";

            $("#showMATRIX").html(html);
            $('#wMATRIX').dialog('open');
            width = 20 + $("#tableMATRIX").width();
            height = 80 + $("#tableMATRIX").height();
            if (width < 240) { width = 240; }
            if (height < 160) { height = 160; }

            $('#wMATRIX').dialog({
                title: vme.getLocalText("MATRIX"),
                width: width,
                height: height
            });
            $('#wMATRIX').dialog('open');
        },

        setLatexMatrixInEditor: function () {

            var vme = this,
                cols = window.document.formMATRIX.colsMATRIX.value,
                rows = window.document.formMATRIX.rowsMATRIX.value,
                formula = "",
                r,
                c,
                left = window.document.formMATRIX.leftbracketMATRIX.value,
                right = window.document.formMATRIX.rightbracketMATRIX.value,
                matrix = "";

            for (r = 1; r <= rows; r += 1) {
                for (c = 1; c <= cols; c += 1) {
                    formula = formula + window.document.formMATRIX["a_" + r + c].value;
                    if (c < cols) { formula += " & "; }
                }
                if (r < rows) { formula += " \\\\ "; }
            }

            if (left !== "{:") { matrix += "\\left "; }
            if (left === "{" || left === "}") { matrix += "\\"; }
            if (left === "||") { matrix += "\\|"; }
            if (left === "(:") { matrix += "\\langle"; }
            if (left === ":)") { matrix += "\\rangle"; }
            if (left !== "{:" && left !== "||" && left !== ":)" && left !== "(:") { matrix += window.document.formMATRIX.leftbracketMATRIX.value; }
            matrix += " \\begin{matrix} ";
            matrix += formula;
            matrix += " \\end{matrix} ";
            if (right !== ":}") { matrix += " \\right "; }
            if (right === "}" || right === "{") { matrix += "\\"; }
            if (right === "||") { matrix += "\\|"; }
            if (right === "(:") { matrix += "\\langle"; }
            if (right === ":)") { matrix += "\\rangle"; }
            if (right !== ":}" && right !== "||" && right !== ":)" && right !== "(:") { matrix += window.document.formMATRIX.rightbracketMATRIX.value; }
            matrix +=    " ";

            vme.insert(matrix);
        },

        setAsciiMatrixInEditor: function () {

            var vme = this,
                cols = window.document.formMATRIX.colsMATRIX.value,
                rows = window.document.formMATRIX.rowsMATRIX.value,
                formula = "",
                r,
                c,
                left = window.document.formMATRIX.leftbracketMATRIX.value,
                right = window.document.formMATRIX.rightbracketMATRIX.value,
                matrix = "";

            for (r = 1; r <= rows; r += 1) {
                if (rows > 1) { formula += "("; }
                for (c = 1; c <= cols; c += 1) {
                    formula = formula + window.document.formMATRIX["a_" + r + c].value;

                    if (rows === 1 && c < cols) { formula += " "; }
                    if (rows > 1 && c < cols) { formula += ","; }
                }
                if (rows > 1) { formula += ")"; }
                if (rows > 1 && r < rows) { formula += ","; }
            }


            if (left === "}" || left === "]" || left === ")" || left === ":)") { matrix += "{: "; }
            matrix += left;
            if (left === "{" || left === "}" || left === "]" || left === ")" || left === ":)") { matrix += "{:"; }
            matrix += formula;
            if (right === "}" || right === "{"    || right === "[" || right === "(" || right === "(:") { matrix += ":}"; }
            matrix += right;
            if (right === "{" || right === "[" || right === "(" || right === "(:") { matrix += " :}"; }
            matrix += " ";

            vme.insert(matrix);
        },

        locale: {}, //Object for internationnalisation js files

        getLocalText: function (TEXT_CODE) {

            try {
                return this.locale[this.localType][TEXT_CODE];
            } catch (e) {
                //window.console.error("ERROR getLocalText : " + TEXT_CODE);
                return "";
            }
        },

        localize: function () {

            var vme = this,
                localText;

            // html attributes must be changed
            $("html").attr("xml:lang", vme.getLocalText("i18n_HTML_Lang"));
            $("html").attr("lang", vme.getLocalText("i18n_HTML_Lang"));
            $("html").attr("dir", vme.getLocalText("i18n_HTML_Dir"));

            // set or unset right to left style for arabic langage
            vme.setRTLstyle();

            // span with data-locate attribute must be replace by localised text
            $("span[data-locate]").each(function () {
                if ($(this).attr("data-locate") !== undefined) {
                    localText = vme.getLocalText($(this).attr("data-locate"));
                    if (localText !== undefined) {
                        $(this).html(localText);
                    }
                }
            });

            //Event is doing here because button are created with localization text

            $("#btTITLE_EDITION_SYNTAX").unbind("click").click(function (event) {
                event.preventDefault();
                vme.switchCodeType();
                vme.setFocus();
            });

            if (!vme.encloseAllFormula) {
                $("#btENCLOSE_TYPE").addClass("unselect");
                $('#HTML_TAG').hide();
            } else {
                $("#btENCLOSE_TYPE").removeClass("unselect");
                $('#HTML_TAG').show();
            }
            vme.resizeDivInputOutput();

            $("#btENCLOSE_TYPE").unbind("click").click(function (event) {
                event.preventDefault();
                vme.toggleHTMLmode();
            });

            $("#btHTML_STRONG").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<strong>", "</strong>");
            });
            $("#btHTML_EM").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<em>", "</em>");
            });
            $("#btHTML_U").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<u>", "</u>");
            });
            $("#btHTML_S").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<s>", "</s>");
            });
            $("#btHTML_BR").unbind("click").click(function (event) {
                event.preventDefault();
                vme.insert("<br/>");
            });
            $("#btHTML_P").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<p>", "</p>");
            });
            $("#btHTML_H1").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<h1>", "</h1>");
            });
            $("#btHTML_H2").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<h2>", "</h2>");
            });
            $("#btHTML_H3").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<h3>", "</h3>");
            });
            $("#btHTML_Latex").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("$", " $");
            });
            $("#btHTML_LatexLine").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("$$", " $$");
            });
            $("#btHTML_AsciiMath").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("`", " `");
            });
            $("#btHTML_OL").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("\n<ol>\n\t<li>", "</li>\n</ol>\n");
            });
            $("#btHTML_UL").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("\n<ul>\n\t<li>", "</li>\n</ul>\n");
            });
            $("#btHTML_A").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<a href=\"http://www.equatheque.net\">", "</a>");
            });
            $("#btHTML_HR").unbind("click").click(function (event) {
                event.preventDefault();
                vme.insert("<hr/>");
            });
            $("#btHTML_IMG").unbind("click").click(function (event) {
                event.preventDefault();
                vme.insert("<img src=\"http://www.equatheque.net/image/EquaThEque.png\"/>");
            });
            $("#btHTML_CENTER").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<p style=\"text-align:center\">", "</p>");
            });
            $("#btHTML_LEFT").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<p style=\"text-align:left\">", "</p>");
            });
            $("#btHTML_RIGHT").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<p style=\"text-align:right\">", "</p>");
            });
            $("#btHTML_JUSTIFY").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<p style=\"text-align:justify\">", "</p>");
            });
            $("#btHTML_INDENT").unbind("click").click(function (event) {
                event.preventDefault();
                vme.tag("<p style=\"margin-left:40px;text-align:justify\">", "</p>");
            });

            if (!vme.runNotColorPicker) {
                $('#btHTML_TEXTCOLOR').ColorPicker({
                    color: '#0000ff',
                    flat: false,
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        $('#btHTML_TEXTCOLOR').css('backgroundColor', '#' + hex);
                    },
                    onSubmit: function (hsb, hex, rgb, el) {
                        $(el).css('backgroundColor', '#' + hex);
                        $(el).ColorPickerHide();
                        vme.tag("<span style=\"color:#" + hex + "\">", "</span>");
                    }
                });

                $('#btHTML_FORECOLOR').ColorPicker({
                    color: '#0000ff',
                    flat: false,
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        $('#btHTML_FORECOLOR').css('backgroundColor', '#' + hex);
                    },
                    onSubmit: function (hsb, hex, rgb, el) {
                        $(el).css('backgroundColor', '#' + hex);
                        $(el).ColorPickerHide();
                        vme.tag("<span style=\"background-color:#" + hex + "\">", "</span>");
                    }
                });
            }

            $("#btCOPYRIGHT").unbind("click").click(function (event) {
                event.preventDefault();
                vme.openInformationTab(0);
                vme.setFocus();
            });

            $("#VMEversionInf").html(vme.version);
        },

        initialiseLangRessourcesList: function () {
            var lang,
                ressource,
                list,
                dir,
                title;

            for (lang in this.locale) {
                if (this.locale.hasOwnProperty(lang)) {
                    title = lang;
                    if (!$('#tLANGUAGE_LIST').tabs('exists', title)) {
                        list = "<table border='1' cellspacing='0' style='border-spacing:0px;border-collapse:collapse;margin:20px;width:580px'>";
                        dir = this.locale[lang].i18n_HTML_Dir;

                        for (ressource in this.locale[lang]) {
                            if (this.locale[lang].hasOwnProperty(ressource)) {
                                list += ("<tr><td valign='top'><b>" + ressource + "</b> : </td><td valign='top' class='rtl-align-right'" + ((dir === "rtl") ? "style='text-align:right;'" : "") + " dir='" + dir    + "'>" + this.locale[lang][ressource].replace(/</gi, "&lt;") + "</td></tr>\n");
                            }
                        }

                        list += "</table>";

                        $('#tLANGUAGE_LIST').tabs('add',
                            {
                                title: title,
                                content: list,
                                closable: false
                                //,iconCls: 'icon-i18n-' + lang
                            });
                    }
                }
            }
        },

        getEquation: function () {
            var vme = this;
            var content = "";
            if (!vme.runNotCodeMirror && vme.codeMirrorEditor) {
                content = vme.codeMirrorEditor.getValue();
            } else {
                content = $(vme.mathTextInput).val();
            }
            return content;
        },

        autoUpdateOutput: function () { // To not calculate mathJax many times when user continue to press keys
            var vme = this;
            if (vme.autoUpdateOutputTimeout !== undefined && vme.autoUpdateOutputTimeout !== null) {
                clearTimeout(vme.autoUpdateOutputTimeout);
                delete vme.autoUpdateOutputTimeout;
            }
            if (vme.autoupdateType) {
                vme.autoUpdateOutputTimeout = setTimeout(
                    function () { vme.updateOutput(); },
                    vme.autoUpdateTime
                );
            }
        },

        updateOutput: function () {
            var vme = this,
                encloseChar = (vme.codeType === "AsciiMath" ? "`" : "$"),
                content = vme.getEquation();

            if (content === "") { content = " "; }
            if (!vme.encloseAllFormula) {
                content = content.replace(/</gi, "&lt;"); //no balise in self formula
                content = encloseChar + content + encloseChar;
                /*
                content = content.replace(/\n/gi, encloseChar + "\n<br/>" + encloseChar + " ");
                content = content.replace(/<br>/gi, encloseChar + "\n<br/>" + encloseChar + " ");
                content = content.replace(/<p>/gi, encloseChar + "\n<br/>" + encloseChar + " ");
                content = content.replace(/<\/p>/gi, "");
                content = content.replace(/<pre>/gi, encloseChar + "\n<br/>" + encloseChar + " ");
                content = content.replace(/<\/pre>/gi, "");
                */
            }/* else {
                //to prevent HTML Code Injection
                // A FAIRE : se décider..
                content = content.replace(/<script/gi, "\n&lt;script");
                content = content.replace(/<\/script/gi, "\n&lt;\/script");
                content = content.replace(/<img/gi, "\n&lt;img");
                content = content.replace(/<\/img/gi, "\n&lt;\/img");
                content = content.replace(/<iframe/gi, "\n&lt;iframe");
                content = content.replace(/<\/iframe/gi, "\n&lt;\/iframe");
                content = content.replace(/<frameset/gi, "\n&lt;frameset");
                content = content.replace(/<\/frameset/gi, "\n&lt;\/frameset");
                content = content.replace(/<embed/gi, "\n&lt;embed");
                content = content.replace(/<\/embed/gi, "\n&lt;\/embed");
                content = content.replace(/<object/gi, "\n&lt;object");
                content = content.replace(/<\/object/gi, "\n&lt;\/object");
                content = content.replace(/<applet/gi, "\n&lt;applet");
                content = content.replace(/<\/applet/gi, "\n&lt;\/applet");
                content = content.replace(/<form/gi, "\n&lt;form");
                content = content.replace(/<\/form/gi, "\n&lt;\/form");
                content = content.replace(/id/gi, "myid");
                content = content.replace(/name"/gi, "myname");
                content = content.replace(/src/gi, "mysrc");
                content = content.replace(/href/gi, "myhref");
                content = content.replace(/onclick/gi, "myonclick");
                content = content.replace(/ondblclick/gi, "myondblclick");
                content = content.replace(/onmousedown/gi, "myonmousedown");
                content = content.replace(/onmousemove/gi, "myonmousemove");
                content = content.replace(/onmouseout/gi, "myonmouseout");
                content = content.replace(/onmouseover/gi, "myonmouseout");
                content = content.replace(/onmouseup/gi, "myonmouseout");
                content = content.replace(/onkeydown/gi, "myonmouseout");
                content = content.replace(/onkeypress/gi, "myonmouseout");
                content = content.replace(/onkeyup/gi, "myonmouseout");
                content = content.replace(/onabort/gi, "myonabort");
                content = content.replace(/onblur/gi, "myonblur");
                content = content.replace(/onfocus/gi, "myonfocus");
                content = content.replace(/onreset/gi, "myonreset");
                content = content.replace(/onkeyup/gi, "myonmouseout");
                content = content.replace(/onselect/gi, "myonselect");
                content = content.replace(/onsubmit/gi, "myonsubmit");
                content = content.replace(/onkeyup/gi, "myonmouseout");
                // A FAIRE : all HTML 5 Media tags and HTML 5 events
            }*/
            /*$.messager.show({
                title: "<span class='rtl-title-withicon'>" + vme.codeType + (vme.encloseAllFormula ? "" : (", " + vme.getLocalText("ENCLOSED_BY") + " " + encloseChar)) + "</span>",
                msg: "<pre dir='ltr'>" + content + "</pre>",
                width: 300,
                height: 300,
            });*/

            $(vme.mathVisualOutput).html(content);

            if (!vme.runNotMathJax) {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, vme.mathVisualOutput]);
                MathJax.Hub.Queue(
                    function () {
                        $('#mathVisualOutput .MathJax_SVG svg')
                            .bind(
                                'contextmenu',
                                function (event) {
                                    if (!vme.menuMathjaxType) {
                                        event.preventDefault();
                                        vme.showSVGcontextMenu(event);
                                        return false;
                                    }
                                    return true;
                                }
                            )
                            .click(
                                function (event) {
                                    event.preventDefault();
                                    vme.showSVGcontextMenu(event);
                                    return false;
                                }
                            )
                            .mouseenter(
                                function (event) {
                                    vme.showSVGcontextMenu(event);
                                }
                            );
                    }
                );
            }
        },

        showSVGcontextMenu: function (event) {
            if (event.target.nodeName === "svg") {
                $('#mVIEW').menu('hide');
                vme.contextMenuSVG = $(event.target);
                $('#mCONVERT').menu('show', {
                    left: event.pageX,
                    top: event.pageY
                });
            }
        },

        insert: function (b) {
            if (!this.runNotCodeMirror && this.codeMirrorEditor) {
                this.codeMirrorEditor.replaceSelection(b);
                this.codeMirrorEditor.setCursor(this.codeMirrorEditor.getCursor());
                if (this.menuupdateType) {
                    this.updateOutput();
                }
            } else {
                this.encloseSelection("", "",
                    function (a) {
                        return b + a;
                    });
            }
            this.setFocus();
        },

        insertBeforeEachLine: function (b) {
            this.encloseSelection("", "",
                function (a) {
                    a = a.replace(/\r/g, "");
                    return b + a.replace(/\n/g, "\n" + b);
                });
        },

        tag: function (b, a) {
            b = b || null;
            a = a || b;
            if (!b || !a) {
                return;
            }

            if (!this.runNotCodeMirror && this.codeMirrorEditor) {
                this.codeMirrorEditor.replaceSelection(b + this.codeMirrorEditor.getSelection() + a);
                var pos = this.codeMirrorEditor.getCursor();
                pos.ch = pos.ch - a.length;
                this.codeMirrorEditor.setCursor(pos);
                if (this.menuupdateType) {
                    this.updateOutput();
                }
            } else {
                this.encloseSelection(b, a);
            }
            this.setFocus();
        },

        encloseSelection: function (f, j, h) {
            this.mathTextInput.focus();
            f = f || "";
            j = j || "";
            var a,
                b,
                c,
                d,
                //e,
                g,
                i;
            if (window.document.selection !== undefined) {
                c = window.document.selection.createRange().text;
                /* A REVOIR
                // ADD BY DAG --
                var Sel = window.document.selection.createRange();
                Sel.moveStart ('character', -this.mathTextInput.value.length);
                a = Sel.text.length;*/
                // --
            } else {
                if (this.mathTextInput.setSelectionRange !== undefined) {
                    a = this.mathTextInput.selectionStart;
                    d = this.mathTextInput.selectionEnd;
                    b = this.mathTextInput.scrollTop;
                    c = this.mathTextInput.value.substring(a, d);
                }
            }
            if (c.match(/ $/)) {
                c = c.substring(0, c.length - 1);
                j = j + " ";
            }
            if (typeof h === "function") {
                g = c ? h.call(this, c) : h("");
            } else {
                g = c || "";
            }
            i = f + g + j;
            if (window.document.selection !== undefined) {
                //e = window.document.selection.createRange().text = i;
                this.mathTextInput.caretPos -= j.length;
                /* A REVOIR
                // REM BY DAG var e = window.document.selection.createRange().text = i;
                // REM BY DAG this.mathTextInput.caretPos -= j.length;
                // ADD BY DAG --
                var e = window.document.selection.createRange().text = i;
                var range = this.mathTextInput.createTextRange();
                range.collapse(true);
                if (c) { //derrière la sélection
                    range.moveStart('character',a + i.length);
                    range.moveEnd('character',a + i.length);
                    window.console.log("1.1");
                } else {
                    if (j != "") {
                        range.moveStart('character',a + f.length);
                        range.moveEnd('character',a + f.length);
                        window.console.log("1.2");
                    } else {
                        range.moveStart('character',a + i.length);
                        range.moveEnd('character',a + i.length);
                        window.console.log("3.3");
                    }
                }
                range.select();
                // -- */
            } else {
                if (this.mathTextInput.setSelectionRange !== undefined) {
                    this.mathTextInput.value = this.mathTextInput.value.substring(0, a) + i + this.mathTextInput.value.substring(d);
                    if (c) { //derrière la sélection
                        this.mathTextInput.setSelectionRange(a + i.length, a + i.length);
                    } else {
                        // REM BY DAG this.mathTextInput.setSelectionRange(a + f.length, a + f.length);
                        // ADD BY DAG --
                        if (j !== "") { //dans le tag inséré
                            this.mathTextInput.setSelectionRange(a + f.length, a + f.length);
                        } else { //derrière la formule inséré
                            this.mathTextInput.setSelectionRange(a + i.length, a + i.length);
                        }
                        // --
                    }
                    this.mathTextInput.scrollTop = b;
                }
            }

            if (this.menuupdateType) {
                this.updateOutput();
            }
        },

        showWindow: function (file, width, height, top, left, name, scrollbars, resizable, toolbar, menubar) {
            if (!this.windowIsOpenning) {
                this.windowIsOpenning = true;
                name = name || '';
                scrollbars = scrollbars || 'no';
                resizable = resizable || 'no';
                toolbar = toolbar || 'no';
                menubar = menubar || 'no';

                var win = window.open(file, name, "height=" + height + ", width=" + width + "top=" + top + ", left=" + left + ", status=no, toolbar=" + toolbar + ", menubar=" + menubar + ", location=no, resizable=" + resizable + ", scrollbars=" + scrollbars + ", modal=no, dependable=yes");
                win.focus();
                this.windowIsOpenning = false;
                return win;
            }
            return null;
        },

        newEditor: function () {
            this.showWindow("VisualMathEditor.html" + (this.runLocal ? "?runLocal" : ""), 780, 580, 100, 100);
        },

        closeEditor: function () {
            if (window.opener) {
                if (!window.opener.closed) {
                    window.opener.focus();
                    if (this.textAreaForSaveASCII) {
                        this.textAreaForSaveASCII.focus();
                    }
                }
                window.self.close();
            } else {
                $.messager.alert("<span class='rtl-title-withicon'>" + this.getLocalText("ERROR") + "</span>", this.getLocalText("ERROR_QUIT_EDITOR"), 'error');
            }
        },

        testOpenFile: function () {
            if (window.FileReader === undefined) {
                $.messager.alert("<span class='rtl-title-withicon'>" + this.getLocalText("ERROR") + "</span>", "VisualMathEditor JAVASCRIPT ERROR : \n\nFileReader isn't supported!", 'error');
            } else {
                window.document.getElementById("fOPEN_EQUATION").click();
            }
        },

        openFile: function (event) {
            var file = event.target.files ? event.target.files[0] : event.target.value,
                reader = new window.FileReader();
            reader.onload = function () {
                if (!vme.runNotCodeMirror) {
                    vme.codeMirrorEditor.setValue(this.result);
                    vme.setCodeMirrorCursorAtEnd();
                } else {
                    vme.mathTextInput.value = this.result;
                }
                vme.updateOutput();
            };
            reader.readAsText(file, "UTF-8");
        },

        saveFile: function (content, name) {
            var type = "application/x-download",
                blob = null,
                BlobBuilder,
                bb,
                bloburl,
                dociframe,
                URL,
                comp,
                e,
                evObj,
                catchError = new window.Error();

            if (typeof window.Blob === "function") {
                try {
                    blob = new window.Blob([content], {type: type});
                } catch (e1) { catchError = e1; }
            } else {
                BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;

                if (typeof BlobBuilder === "function") {
                    try {
                        bb = new BlobBuilder();
                        bb.append(content);
                        blob = bb.getBlob(type);
                    } catch (e2) { catchError = e2; }
                }
            }

            if (blob && (typeof navigator.msSaveBlob === "function")) {
                try {
                    navigator.msSaveBlob(blob, name);
                    return;
                } catch (e3) { catchError = e3; }
            }

            if ($.browser.msie) {
                dociframe = window.ieFrameForSaveContent.document;
                dociframe.body.innerHTML = content.replace(/</gi, "&lt;").replace(/>/gi, "&gt;");
                if (!name.endsWith(".txt")) {
                    name += ".txt"; //limitation in the ExecCommand function can only save a file that is the text file type
                }
                dociframe.execCommand("SaveAs", true, name);
                return;
            }

            bloburl = null;
            if (blob) {
                URL = window.URL || window.webkitURL;
                try {
                    bloburl = URL.createObjectURL(blob);
                } catch (e4) { catchError = e4; }
            }

            if (bloburl) {
                $("#fSAVE_EQUATION").attr(
                    "href",
                    bloburl || "data:" + type + ";charset=utf-8;filename=" + name + ";content-disposition=attachment," + encodeURIComponent(content)
                );
                $("#fSAVE_EQUATION").attr("download", name);
                $("#fSAVE_EQUATION").attr("type", type);
                comp = window.document.getElementById('fSAVE_EQUATION');
                try { //in firefox
                    comp.click();
                    return;
                } catch (e5) { catchError = e5; }
                try { // in chrome
                    if (window.document.createEvent) {
                        e = window.document.createEvent('MouseEvents');
                        e.initEvent('click', true, true);
                        comp.dispatchEvent(e);
                        return;
                    }
                } catch (e6) { catchError = e6; }
                try { // in IE
                    if (window.document.createEventObject) {
                        evObj = window.document.createEventObject();
                        comp.fireEvent("onclick", evObj);
                        return;
                    }
                } catch (e7) { catchError = e7; }
            }


            /*if (bloburl && ($.browser.chrome && parseInt($.browser.version, 10) >= 14)) {
                window.console.log("Function saveFile anchor hidden click event chrome");
                var anchor = window.document.createElement("a");
                anchor.style.visibility = "hidden";
                anchor.href = bloburl;
                anchor.download = name;
                window.document.body.appendChild(anchor);
                var evt = window.document.createEvent("Event");
                evt.initEvent("click", true, true);
                anchor.dispatchEvent(evt);
                window.document.body.removeChild(anchor);
                return;
            }

            { //Attention data: limité en octet
                window.console.log("Function saveFile by manual anchor href=data");
                $.messager.show({
                    title:this.getLocalText("SAVE_EQUATION"),
                    msg:'<a class="bt" href="data:' + type + ';charset=utf-8,' + encodeURIComponent(content) + '" target="saveFile" download="' + name + '" type="' + type + '">' + this.getLocalText("SAVE_EQUATION") + '</a>',
                    showType:'show',
                    style:{
                        right:'',
                        top:'50px',
                        bottom:''
                    }
                });
                return;
            }*/


            // Pas beau car pas de nom de fichier, c'est pour ça que je prèfere ne pas l'utiliser
            if (bloburl) {
                window.location.href = bloburl;
                return;
            }

            if (content) {
                window.location = "data:" + type + ";charset=utf-8," + encodeURIComponent(content);
                return;
            }

            return catchError;
        },

        saveEquationFile: function () {
            var vme = this,
                content = vme.getEquation(),
                name;

            name = "equation_vme_" + (vme.encloseAllFormula ? "html" : this.codeType.toLowerCase()) + "_" + vme.getDateTimeForFile() + ".txt";

            this.saveFile(content, name);
        },

        savePDFFile: function () {
            var vme = this,
                svg_obj,
                pdf;

            if (!vme.runNotMathJax && !vme.runNotCanvg) {
                MathJax.Hub.Queue(
                    function () {
                        svg_obj = vme.updateCanvasSvg();
                        pdf = new jsPDF({
                            orientation: 'portrait',
                            unit: 'px',
                            format: 'a4'
                        });
                        //TODO: Fix dimentions bug
                        pdf.text(vme.getEquation(), 10, 10);
                        pdf.addImage(svg_obj.canvas.toDataURL("image/png"), 'PNG', 10, 100, svg_obj.dimention.width, svg_obj.dimention.height);
                        pdf.save("equation_vme" + "_" + vme.getDateTimeForFile() + ".pdf");
                    }

                );
            }
        },

        saveMMLFile: function (mmlContent) {
            var vme = this;

            if (mmlContent) {
                vme.saveFile(
                    mmlContent,
                    "equation_vme" + "_" + vme.getDateTimeForFile() + ".mml"
                );
            } else {
                if (!vme.runNotMathJax) {
                    MathJax.Hub.Queue(
                        function () {
                            vme.toMathML(
                                MathJax.Hub.getAllJax(vme.mathVisualOutput.id)[0],
                                function (mml) { //Only first Equation if HTML Mode [TO DO : all MML in same file ? Or All MML in different files ?]
                                    vme.saveFile(
                                        mml,
                                        "equation_vme" + "_" + vme.getDateTimeForFile() + ".mml"
                                    );
                                }
                            );
                        }
                    );
                }
            }
        },

        saveSVGFile: function (svgContent) {
            var vme = this,
                content,
                div,
                svg_obj,
                name;

            if (!vme.runNotMathJax) {
                if (svgContent) {
                    content = svgContent;
                } else {
                    div = window.document.createElement("div");
                    div.innerHTML = $('#mathVisualOutput .MathJax_SVG').html(); //Only first Equation if HTML Mode [TO DO : all SVG in same file ? Or All SVG in different files ?]
                    svg_obj = $(div.getElementsByTagName("svg")[0]);
                    content = vme.getSVG(svg_obj, true).svg;
                }
                content = content.replace(/>/gi, ">\n");
                name = "equation_vme" + "_" + vme.getDateTimeForFile() + ".svg";
                vme.saveFile(content, name);
            }
        },

        setEquationInCaller: function (doClose) {
            var vme = this;
            if(doClose === undefined) {
                doClose = true;
            }
            if (!this.textareaIgnore && window.opener && this.textAreaForSaveASCII) { // BUG: window.opener not set in iOS Chrome: http://code.google.com/p/chromium/issues/detail?id=136610
                if (!window.opener.closed) {
                    window.opener.focus();
                    this.textAreaForSaveASCII.value = vme.getEquation();
                    if (this.textAreaForSaveASCII.vme && this.textAreaForSaveASCII.vme.updateEquation) {
                        this.textAreaForSaveASCII.vme.updateEquation();
                    }
                    this.textAreaForSaveASCII.focus();
                }
                if(doClose) {
                    window.self.close();
                }
            } else if (!this.textareaIgnore && window.localStorage && this.textAreaForSaveASCII) { //hack pour contourner le bug window.opener not set in iOS Chrome, voir fonction openEditorFromTextArea() de functions.js du site visualmatheditor.equatheque.com
                this.textAreaForSaveASCII.value = vme.getEquation();
                window.localStorage.setItem(this.textAreaForSaveASCII.id, this.textAreaForSaveASCII.value);
                window.localStorage.setItem('update_' + this.textAreaForSaveASCII.id, "1");
                if(doClose) {
                    window.self.close();
                }
            } else {
                $.messager.alert("<span class='rtl-title-withicon'>" + this.getLocalText("ERROR") + "</span>", this.getLocalText("ERROR_SET_EQUATION"), 'error');
                return false;
            }
            return true;
        },

        getEquationFromCaller: function () {
            var textareaID = this.textareaID || this.url.param('textarea');

            if (!this.textareaIgnore && textareaID) {
                this.textareaID = textareaID;
                if (window.opener) { // BUG: window.opener not set in iOS Chrome: http://code.google.com/p/chromium/issues/detail?id=136610
                    this.textAreaForSaveASCII = window.opener.window.document.getElementById(textareaID);
                }

                if (!this.textAreaForSaveASCII && window.localStorage) { // hack pour contourner le bug window.opener not set in iOS Chrome, voir fonction openEditorFromTextArea() de functions.js du site visualmatheditor.equatheque.com
                    this.textAreaForSaveASCII = {id: textareaID, value: window.localStorage.getItem(textareaID)};
                }

                if (this.textAreaForSaveASCII) {
                    if (!this.runNotCodeMirror && this.codeMirrorEditor) {
                        this.codeMirrorEditor.setValue(this.textAreaForSaveASCII.value);
                        this.setCodeMirrorCursorAtEnd();
                    } else {
                        this.mathTextInput.value = this.textAreaForSaveASCII.value;
                    }
                    this.updateOutput();
                } else {
                    $.messager.alert("<span class='rtl-title-withicon'>" + this.getLocalText("ERROR") + "</span>", this.getLocalText("ERROR_SET_EQUATION"), 'error');
                }
            }
        },

        viewMathML: function (element) {
            var vme = this;
            if (!vme.runNotMathJax) {
                MathJax.Hub.Queue(
                    function () {
                        var jax = MathJax.Hub.getAllJax(element),
                            i;

                        function toMathMLcallback() { // Set in a return function to avoid JSLint error "Don't make functions within a loop"
                            return function (mml) {
                                $.messager.show({
                                    title: "<span class='rtl-title-withicon'>MathMML</span>",
                                    msg: "<div style='height:255px;width:277px;overflow:scroll;' dir='ltr'>" + mml.replace(/&/gi, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/\n/gi, "<br/>").replace(/ /gi, "&nbsp;") + "</div>",
                                    timeout: 0,
                                    width: 300,
                                    height: 300,
                                    tools: [{
                                        iconCls: 'icon-disk',
                                        handler: function () { vme.saveMMLFile(mml); }
                                    }]
                                });
                            };
                        }

                        for (i = 0; i < jax.length; i += 1) { //All Equations if HTML Mode; jax[i].originalText for original AsciiMath or LaTex
                            vme.toMathML(jax[i], toMathMLcallback());
                        }
                    }
                );
            }
        },

        toMathML: function (jax, callback) {
            if (!this.runNotMathJax) {
                var mml;
                try {
                    mml = jax.root.toMathML("");
                } catch (err) {
                    if (!err.restart) { throw err; }
                    return MathJax.Callback.After([vme.toMathML, jax, callback], err.restart);
                }
                MathJax.Callback(callback)(mml);
            }
        },

        viewSVG: function () {
            var vme = this,
                div,
                svg;
            if (!vme.runNotMathJax) {
                if (vme.contextMenuSVG) {
                    svg = vme.getSVG(vme.contextMenuSVG, true).svg;
                    $.messager.show({
                        title: "<span class='rtl-title-withicon'>SVG</span>",
                        msg: "<div style='height:255px;width:277px;overflow:scroll;' dir='ltr'>" + svg.replace(/</gi, "&lt;").replace(/>/gi, "&gt;") + "</div>",
                        timeout: 0,
                        width: 300,
                        height: 300,
                        tools: [{
                            iconCls: 'icon-disk',
                            handler: function () { vme.saveSVGFile(svg); }
                        }]
                    });
                    vme.contextMenuSVG = null;
                } else {
                    $('#mathVisualOutput .MathJax_SVG').each(function () { //All Equations if HTML Mode
                        div = window.document.createElement("div");
                        div.innerHTML = $(this).html();
                        svg = vme.getSVG($(div.getElementsByTagName("svg")[0]), true).svg;
                        $.messager.show({
                            title: "<span class='rtl-title-withicon'>SVG</span>",
                            msg: "<div style='height:255px;width:277px;overflow:scroll;' dir='ltr'>" + svg.replace(/</gi, "&lt;").replace(/>/gi, "&gt;") + "</div>",
                            timeout: 0,
                            width: 300,
                            height: 300,
                            tools: [{
                                iconCls: 'icon-disk',
                                handler: function () { vme.saveSVGFile(svg); }
                            }]
                        });
                    });
                }
            }
        },

        updateCanvasSvg: function () {
            var vme = this,
                canvas = window.document.getElementById("canvasEXPORT_PNG"),
                svg_obj,
                mathjax_tag,
                div;

            if (!vme.runNotMathJax && !vme.runNotCanvg) {
                if (vme.contextMenuSVG) { //for mPNG_IMG_CONVERT
                    svg_obj = vme.getSVG(vme.contextMenuSVG, true);
                } else { //for mPNG_IMG
                    mathjax_tag = $('#mathVisualOutput .MathJax_SVG'); //Only first Equation if HTML Mode
                    mathjax_tag.css({padding: 0});
                    div = window.document.createElement("div");
                    div.innerHTML = mathjax_tag.html();
                    svg_obj = vme.getSVG($(div.getElementsByTagName("svg")[0]), true);
                    if (svg_obj.dimention.width === 0) {
                        svg_obj.dimention.width = mathjax_tag.innerWidth();
                    }
                    if (svg_obj.dimention.height === 0) {
                        svg_obj.dimention.height = mathjax_tag.innerHeight() - 2; //1px margin-top and bottom on mathJax SVG. A FAIRE: find a more elegant solution to this
                    }
                }
                canvg(canvas, svg_obj.svg);
            }
            return {
                canvas: canvas,
                viewBox: svg_obj.viewBox,
                dimention: svg_obj.dimention
            };
        },

        updateCanvasSize: function () {
            var innerDialog = $("#wEXPORT_PNG .dialog-content"), //$($("#wEXPORT_PNG").dialog('body')) pas le bon height à cause des buttons
                canvas = $("#canvasEXPORT_PNG"),
                w = innerDialog.width() - 10,
                h = innerDialog.height() - 10;

            canvas.attr({width: w, height: h});
            canvas.css({width: w + 'px', height: h + 'px'});
            $("#divEXPORT_SIZE").text(w + 'px * ' + h + 'px');
        },

        showCanvasHelp: function () {
            var dialogObj = $($("#wEXPORT_PNG").dialog('panel')),
                positionDialog = dialogObj.position(),
                dimentionDialog = {
                    width: dialogObj.width(),
                    height: dialogObj.height()
                },
                helpResizeObj = $("#helpResizeEXPORT_PNG"),
                dimentionHelp = {
                    width: helpResizeObj.width(),
                    height: helpResizeObj.height()
                },
                helpSaveObj = $("#helpSaveEXPORT_PNG");

            helpResizeObj.css({
                top: positionDialog.top - 35,
                left: positionDialog.left - dimentionHelp.width - 35
            });
            dimentionHelp = {
                width: helpSaveObj.width(),
                height: helpSaveObj.height()
            };
            helpSaveObj.css({
                top: positionDialog.top + dimentionDialog.height + 10,
                left: positionDialog.left + dimentionDialog.width + 15
            });

            helpResizeObj.show();
            helpSaveObj.show();
            $("#wEXPORT_PNG").tooltip('reposition');
            $("#canvasEXPORT_PNG").tooltip('reposition');
        },

        hideCanvasHelp: function () {
            $("#helpResizeEXPORT_PNG").hide();
            $("#helpSaveEXPORT_PNG").hide();
            $("#wEXPORT_PNG").tooltip('hide');
            $("#canvasEXPORT_PNG").tooltip('hide');
        },

        viewPngImg: function () {
            var vme = this;

            if (!vme.runNotMathJax && !vme.runNotCanvg) {
                MathJax.Hub.Queue(
                    function () {
                        var canvas = vme.updateCanvasSvg().canvas,
                            png = canvas.toDataURL("image/png"),
                            win = vme.showWindow("ieFrameForSaveContent.html", (canvas.width < 280 ? 280 : canvas.width + 50), (canvas.height + 100), 100, 100, 'wPNG_IMG');
                        win.window.document.open();
                        win.window.document.write(
                            '<!DOCTYPE html>\n<html>'
                                + '\n<head>'
                                + '\n<title>' + vme.getLocalText("EXPORT_PNG_IMG") + '</title>'
                                + '\n<style type="text/css">'
                                + '\ndiv {color:#ccc;font-size:12px;margin:8px 0;}'
                                + '\ndiv.help {width:190px;height:48px;color:#656565;background-color:#fffbbb;border:1px solid #ccc;border-radius: 5px 30px 5px 5px;box-shadow: 1px 1px 6px #ccc;padding-left:2px;padding-right:30px;}'
                                + '\nimg {background: transparent url(js/jquery-easyui-MathEditorExtend/themes/grid.png) repeat left top; border:1px solid #ccc;-moz-box-shadow: 1px 1px 6px #ccc;-webkit-box-shadow: 1px 1px 6px #ccc;-o-box-shadow: 1px 1px 6px #ccc;box-shadow: 1px 1px 6px #ccc;}'
                                + '\n</style>'
                                + '\n</head>'
                                + '\n<body>'
                                + '\n<div class="help">' + vme.getLocalText("SAVE_PNG") + '</div>'
                                + '\n<img alt="" src="' + png + '"/>'
                                + '\n<div>png ' + canvas.width + 'px * ' + canvas.height + 'px</div>'
                                + '\n</body>'
                                + '\n</html>'
                        );
                        win.window.document.close();
                    }
                );
            }
        },

        directSavePngImg: function () {
            var vme = this,
                type_img = 'png';

            if (!vme.runNotMathJax && !vme.runNotCanvg) {
                MathJax.Hub.Queue(
                    function () {
                        var canvas = vme.updateCanvasSvg().canvas,
                            a = window.document.createElement("a");
                        a.download = "vme_img_" + vme.getDateTimeForFile() + "." + type_img;
                        a.href = canvas.toDataURL("image/" + type_img);
                        vme.fireEvent(a, "click"); // Ne fonctionne pas sous IE car ne supporte pas les URL Data, Sous Opéra et Safari et Chrome IOS ouvre l'image... //a.click(); ne functionne pas en Firefox, functionne en Chrome
                    }
                );
            }
        },

        /*
        * Thanks to ext-mathjax.js,    Licensed under the Apache License,    Copyright(c) 2013 Jo Segaert
        * https://code.google.com/p/svg-edit/source/browse/trunk/editor/extensions/ext-mathjax.js
        * UPDATED BY DAG (David GRIMA) FOR VME
         */
        getSVG: function (svg_tag, getAsString) {
            var vme = this,
                svg = getAsString ? "" : {},
                viewBox,
                svg_obj;

            if (!vme.runNotMathJax) {
                svg_tag.find('use').each(function () {
                    var x,
                        y,
                        transform,
                        id,
                        glymph;

                    //A FAIRE: find a less pragmatic and more elegant solution to this.
                    if ($(this).attr('href')) {
                        id = $(this).attr('href').slice(1); // Works in Chrome.
                    } else if ($(this).attr('xlink:href')) {
                        id = $(this).attr('xlink:href').slice(1); // Works in Firefox.
                    } else if (this.getAttributeNS("http://www.w3.org/1999/xlink", "NS1:href")) {
                        id = this.getAttributeNS("http://www.w3.org/1999/xlink", "NS1:href").slice(1); // Works in Opera.
                    }

                    glymph = $('#' + id).clone().removeAttr('id');
                    x = $(this).attr('x');
                    y = $(this).attr('y');
                    transform = $(this).attr('transform');
                    if (transform && (x || y)) {
                        glymph.attr('transform', transform + ' translate(' + x + ',' + y + ')');
                    } else if (transform) {
                        glymph.attr('transform', transform);
                    } else if (x || y) {
                        glymph.attr('transform', 'translate(' + x + ',' + y + ')');
                    }
                    $(this).replaceWith(glymph);
                });

                svg_obj = svg_tag.clone()[0];
                viewBox = svg_obj.getAttribute("viewBox");
                if (getAsString) {
                    svg = vme.XmlToStr(svg_obj);
                    svg = vme.svgfix(svg, viewBox);
                } else {
                    svg = svg_obj;
                }
            }
            return {
                svg: svg,
                viewBox: viewBox,
                dimention: { //getBoundingClientRect for Firefox not set clientWidth clientHeight
                    width: (svg_tag[0].clientWidth > 0) ? svg_tag[0].clientWidth : svg_tag[0].getBoundingClientRect().width,
                    height: (svg_tag[0].clientHeight > 0) ? svg_tag[0].clientHeight : svg_tag[0].getBoundingClientRect().height
                }
            };
        },

        /*
         * Thanks to svgfix.js - Javascript SVG parser and renderer on Canvas, 
         * version: 0.2
         * MIT Licensed Ignacio Vazquez (ivazquez@adooxen.com)
         * UPDATED BY DAG (David GRIMA) FOR VME
         */
        svgfix: function (svg, viewBox) {
            /*jslint regexp: true */ //to alow Insecure '.' in regexp

            var fixed = svg,
                svgFirstG,
                newSvgFirstG,
                rect,
                newRect,
                sw,
                i,
                x,
                y,
                width,
                height,
                fill,
                background = "",
                d;

            fixed = $.trim(fixed);
            fixed = fixed.replace(/\shref/g, ' xlink:href');

            svgFirstG = fixed.match(/<svg.*?><g.*?stroke="black".*?fill="black".*?>/g);
            newSvgFirstG = String(svgFirstG);
            newSvgFirstG = newSvgFirstG.replace(/stroke="black"/, 'stroke="' + this.pngImgGlyphStrokeColor + '"');
            newSvgFirstG = newSvgFirstG.replace(/fill="black"/, 'fill="' + this.pngImgGlyphFillColor + '"');
            fixed = fixed.replace(svgFirstG, newSvgFirstG);

            rect = fixed.match(/<rect stroke="none".*?>/g);
            if (rect) {
                sw = 10;
                for (i = 0; i < rect.length; i += 1) {
                    x = parseFloat(rect[i].match(/ x="(.*?)"/)[1]);
                    y = parseFloat(rect[i].match(/ y="(.*?)"/)[1]);
                    width = parseFloat(rect[i].match(/ width="(.*?)"/)[1]);
                    height = parseFloat(rect[i].match(/ height="(.*?)"/)[1]);
                    fill = rect[i].match(/ fill="(.*?)"/);
                    if (!fill) { //do nothing if fill is ever set by for example by \color command
                        if (x !== 0) {
                            //for sqrt
                            newRect = '<polyline points="' + x + ',' + y + ' ' + (x + width) + ',' + y + ' ' + (x + width) + ',' + (y + height - sw) + ' ' + x + ',' + (y + height - sw) + '" stroke-width="' + sw + '" stroke-linejoin="round" stroke-linecap="round"/>';
                        } else {
                            //for frac
                            newRect = '<rect x="' + x + '" y="' + y + '" width="' + width + '" height="' + height + '" stroke-width="' + sw + '" stroke-linejoin="round" stroke-linecap="round"/>';
                        }
                        fixed = fixed.replace(rect[i], newRect);
                    }
                }
            }

            if (this.pngImgBackgroundFillColor !== "none" || this.pngImgBackgroundStrokeColor !== "none") {
                sw = 10;
                d = viewBox.split(" ");
                d.x = parseFloat(d[0]) + sw / 2;
                d.y = parseFloat(d[1]) + sw / 2;
                d.w = parseFloat(d[2]) - sw;
                d.h = parseFloat(d[3]) - sw;
                background = '<rect x="' + d.x + '" y="' + d.y + '" width="' + d.w + '" height="' + d.h + '" fill="' + this.pngImgBackgroundFillColor + '" stroke="' + this.pngImgBackgroundStrokeColor + '" stroke-width="' + sw + '"/>';
            }
            //HACK FOR IE NS1:xmlns:xlink AND xmlns:NS1 ATTRIBUTE and ADD to fill all svg
            fixed = fixed.replace(/<svg.*?>/g, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + viewBox + '">' + background);

            return fixed;
        },

        chooseStyle: function () {
            var tags = ['link', 'style'],
                t,
                s,
                title,
                colorImg = "black",
                codemirrorCSS = "default",
                colorpickerCSS = "gray",
                colorType = null,
                styles,
                posColor;

            //enable the choosen style and disable others
            for (t = 0; t < (tags.length); t += 1) {
                styles = window.document.getElementsByTagName(tags[t]);
                for (s = 0; s < (styles.length); s += 1) {
                    title = styles[s].getAttribute("title");
                    if (title) {
                        if (title !== this.style) {
                            //styles[s].setAttribute("disabled", "true");
                            styles[s].disabled = true;
                        } else {
                            //styles[s].removeAttribute("disabled");
                            styles[s].disabled = false;
                            colorType = styles[s].getAttribute("data-colorType");
                        }
                    }
                }
            }

            //set codemirror and colorpicker style
            if (colorType === "black") {
                colorImg = "white";
                codemirrorCSS = "twilight";
                colorpickerCSS = "black";
            }

            if (!this.runNotCodeMirror && this.codeMirrorEditor) {
                this.codeMirrorEditor.setOption("theme", codemirrorCSS);
            }

            if (!this.runNotColorPicker) {
                window.document.getElementById("colorpickerCSSblack").disabled = (colorpickerCSS !== "black");
                window.document.getElementById("colorpickerCSSgray").disabled = (colorpickerCSS !== "gray");
            }

            //set the good images for symbols button
            $(".symbol_btn").each(function () {
                if (this.className.indexOf("icon-matrix") > -1) {
                    posColor = this.className.lastIndexOf("_");
                    if (posColor) {
                        this.className = this.className.substr(0, posColor + 1) + colorImg;
                    }
                }

                /* for _unpacked icons sprites
                if (this.src) {
                    posColor = this.src.lastIndexOf("_");
                    posExt = this.src.lastIndexOf(".");
                    if (posColor && posExt && posColor < posExt) {
                        this.src = this.src.substr(0,posColor+1) + colorImg + this.src.substr(posExt);
                    }
                }
                */
            });

            // set or unset right to left style for arabic langage
            this.setRTLstyle();
        },

        setRTLstyle: function () {
            var dir = this.getLocalText("i18n_HTML_Dir");
            if (dir === "rtl") {
                window.document.getElementById("RTLstyle").disabled = false;
            } else {
                window.document.getElementById("RTLstyle").disabled = true;
            }
        },

        /* WARNING
        How Many Cookies Can You Use on One Website?
        See http://webdesign.about.com/od/cookies/f/cookies-per-domain-limit.htm
        RFC 2109 say the user agent should support at least 20 cookies per unique host or domain name.
        Opera 10 and 9 allowed 30 cookies per domain.
        Firefox 3.6.3 allowed 50 cookies per domain.
        Internet Explorer 8 allowed 50 cookies per domain.
        Chrome 9 allowed 180 cookies per domain.
        
        Cookie Size Limit Per Domain:
        Chrome has no limit on the maximum bytes per domain
        Firefox has no limit on the maximum bytes per domain
        Internet Explorer allows between 4096 and 10234 bytes
        Opera allows 4096 bytes
        Safari allows 4096 bytes
        */
        saveCookies: function () {
            if (this.saveOptionInCookies) {
                this.setCookie("VME_codeType", this.codeType, 1000);
                this.setCookie("VME_encloseAllFormula", this.encloseAllFormula, 1000);
                this.setCookie("VME_saveOptionInCookies", this.saveOptionInCookies, 1000);
                this.setCookie("VME_localType", this.localType, 1000);
                this.setCookie("VME_style", this.style, 1000);
                this.setCookie("VME_pngImgGlyphStrokeColor", this.pngImgGlyphStrokeColor, 1000);
                this.setCookie("VME_pngImgGlyphFillColor", this.pngImgGlyphFillColor, 1000);
                this.setCookie("VME_pngImgBackgroundStrokeColor", this.pngImgBackgroundStrokeColor, 1000);
                this.setCookie("VME_pngImgBackgroundFillColor", this.pngImgBackgroundFillColor, 1000);
                this.setCookie("VME_autoUpdateTime", this.autoUpdateTime, 1000);
                this.setCookie("VME_menuupdateType", this.menuupdateType, 1000);
                this.setCookie("VME_autoupdateType", this.autoupdateType, 1000);
                this.setCookie("VME_menuMathjaxType", this.menuMathjaxType, 1000);
                this.setCookie("VME_fontInheritMathjaxType", this.fontInheritMathjaxType, 1000);
            } else {
                this.deleteCookie("VME_codeType");
                this.deleteCookie("VME_encloseAllFormula");
                this.deleteCookie("VME_saveOptionInCookies");
                this.deleteCookie("VME_localType");
                this.deleteCookie("VME_style");
                this.deleteCookie("VME_pngImgGlyphStrokeColor");
                this.deleteCookie("VME_pngImgGlyphFillColor");
                this.deleteCookie("VME_pngImgBackgroundStrokeColor");
                this.deleteCookie("VME_pngImgBackgroundFillColor");
                this.deleteCookie("VME_autoUpdateTime");
                this.deleteCookie("VME_menuupdateType");
                this.deleteCookie("VME_autoupdateType");
                this.deleteCookie("VME_menuMathjaxType");
                this.deleteCookie("VME_fontInheritMathjaxType");
                this.deleteCookie("VME_Position_wf_BRACKET_SYMBOLS_MORE");
                this.deleteCookie("VME_Position_wf_ARROW_SYMBOLS_MORE");
                this.deleteCookie("VME_Position_wf_RELATION_SYMBOLS_MORE");
                this.deleteCookie("VME_Position_wf_FR_CHAR_MORE");
                this.deleteCookie("VME_Position_wf_BBB_CHAR_MORE");
                this.deleteCookie("VME_Position_wf_L_U_GREEK_CHAR_MORE");
                this.deleteCookie("VME_Position_wf_ALL_CHAR_MORE");
                this.deleteCookie("VME_Position_wf_EQUATION_MORE");
                this.deleteCookie("VME_Position_wf_COMMUTATIVE_DIAGRAM_MORE");
                this.deleteCookie("VME_Position_wf_CHEMICAL_FORMULAE_MORE");
                this.deleteCookie("VME_Position_wf_HORIZONTAL_SPACING_MORE");
                this.deleteCookie("VME_Position_wf_VERTICAL_SPACING_MORE");
                this.deleteCookie("VME_Position_wf_SPECIAL_CHARACTER_MORE");
            }
        }
    };

    // End VisualMathEditor Methods

    // VisualMathEditor Static Methods ________________________________________________

    // Static methods "VisualMathEditor." and object "VisualMathEditor.prototype." methods at the same time for generic functions that can be call without vme instance or with vme instance

    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

    VisualMathEditor.getDateTimeForFile = VisualMathEditor.prototype.getDateTimeForFile = function () {
        var now = new Date(),
            strDateTime = [
                VisualMathEditor.AddZero(now.getDate()),
                VisualMathEditor.AddZero(now.getMonth() + 1),
                now.getFullYear(),
                "_",
                VisualMathEditor.AddZero(now.getHours()),
                VisualMathEditor.AddZero(now.getMinutes()),
                VisualMathEditor.AddZero(now.getSeconds())
            ].join("");

        return strDateTime;
    };

    VisualMathEditor.AddZero = function (num) {
        return (num >= 0 && num < 10) ? "0" + num : String(num);
    };

    VisualMathEditor.setCookie = VisualMathEditor.prototype.setCookie = function (name, value, days, path, domain, secure) {
        window.document.cookie =
            name + "=" + encodeURIComponent(value)
            + "; max-age=" + 60 * 60 * 24 * days
            + (path ? "; path=" + path : "; path=/")
            + (domain ? "; domain=" + domain : "")
            + (secure ? "; secure" : "");
    };

    VisualMathEditor.getCookie = VisualMathEditor.prototype.getCookie = function (name) {
        var cookies = window.document.cookie,
            value;
        if (cookies.length !== 0) {
            value = cookies.match('(^|;)[\\s]*' + name + '=([^;]*)');
            if (value) {
                value = value[2];
                if (value) {
                    return decodeURIComponent(value);
                }
            }
        }
        return null;
    };

    VisualMathEditor.deleteCookie = VisualMathEditor.prototype.deleteCookie = function (name, domain) {
        window.document.cookie =
            name
            + "=; max-age=0; path=/"
            + (domain ? "; domain=" + domain : "");
    };

    VisualMathEditor.getBoolean = VisualMathEditor.prototype.getBoolean = function (text) {
        return (text === "true" || text === "1");
    };

    VisualMathEditor.d2h = VisualMathEditor.prototype.d2h = function (d) {
        return d.toString(16).toUpperCase();
    };

    VisualMathEditor.h2d = VisualMathEditor.prototype.h2d = function (h) {
        return parseInt(h, 16);
    };

    VisualMathEditor.encodeStringForHTMLAttr = VisualMathEditor.prototype.encodeStringForHTMLAttr = function (s) {
        if (typeof s === "string") {
            return s.replace("\"", "&quot;");
        }
        return "";
    };

    VisualMathEditor.loadScript = VisualMathEditor.prototype.loadScript = function (url, callback) {
        var script = window.document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () { callback(); };
        }
        window.document.body.appendChild(script);
    };

    VisualMathEditor.XmlToStr = VisualMathEditor.prototype.XmlToStr = function (xmlNode) {
        try {
            return (new window.XMLSerializer()).serializeToString(xmlNode); // Gecko- and Webkit-based browsers (Firefox, Chrome), Opera.
        } catch (e1) {
            try {
                return xmlNode.xml; // Internet Explorer.
            } catch (e2) {
                return "";
            }
        }
    };

    VisualMathEditor.hasTouch = VisualMathEditor.prototype.hasTouch = function () {
        return ((window.hasOwnProperty('ontouchstart')) // html5 browsers
            || (window.hasOwnProperty('onmsgesturechange')) // works on ie10 for Surface
            || (navigator.maxTouchPoints > 0) // future IE
            || (navigator.msMaxTouchPoints > 0) // current IE10
            || (window.DocumentTouch && document instanceof window.DocumentTouch)
        );
    };

    /*
     * Fire an event handler to the specified node. Event handlers can detect that the event was fired programatically
     * by testing for a 'synthetic=true' property on the event object
     * @param {HTMLNode} node The node to fire the event handler on.
     * @param {String} eventName The name of the event without the "on" (e.g., "focus")
     */
    VisualMathEditor.fireEvent = VisualMathEditor.prototype.fireEvent = function (node, eventName) {
        // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
        var doc,
            eventClass,
            event,
            bubbles;

        if (node.ownerDocument) {
            doc = node.ownerDocument;
        } else if (node.nodeType === 9) {
            // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
            doc = node;
        } else {
            throw new Error("Invalid node passed to fireEvent: " + node.id);
        }

        if (node.dispatchEvent) {
            // Gecko-style approach (now the standard) takes more work
            eventClass = "";

            // Different events have different event classes.
            // If this switch statement can't map an eventName to an eventClass,
            // the event firing is going to fail.
            switch (eventName) {
            case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
            case "mousedown":
            case "mouseup":
                eventClass = "MouseEvents";
                break;

            case "focus":
            case "change":
            case "blur":
            case "select":
                eventClass = "HTMLEvents";
                break;

            default:
                throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
            }

            event = doc.createEvent(eventClass);
            bubbles = eventName === "change" ? false : true;
            event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

            event.synthetic = true; // allow detection of synthetic events
            node.dispatchEvent(event, true);
        } else if (node.fireEvent) {
            // IE-old school style
            event = doc.createEventObject();
            event.synthetic = true; // allow detection of synthetic events
            node.fireEvent("on" + eventName, event);
        }
    };
    // End VisualMathEditor Static Methods

    
    //VisualMathEditor window event _____________________________________________
    
    /* Save equation in texarea caller on close */

    if (window.addEventListener){
        window.addEventListener('unload', function (e) {
            vme.setEquationInCaller(false);
        }, false);
    } else if (window.attachEvent) { //Old IE
        window.attachEvent('onunload', function (e) {
            vme.setEquationInCaller(false);
        });
    }

    /* Save equation in texarea caller on Cmd+s and Ctrl+s */

    // Disable browser save event
    function disableBrowserSaveEvent(event) {
        if (!(event.which == 115 && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) && !(event.which == 19)) return true;
        event.preventDefault();
        return false;        
    }
    if (window.addEventListener){
        window.addEventListener('keypress', function (event) { disableBrowserSaveEvent(event); }, false);
    } else if (window.attachEvent) { //Old IE
        window.attachEvent('onkeypress', function (event) { disableBrowserSaveEvent(event); });
    }

    // Process the Cmd+s and Ctrl+s events
    function ProcessSaveEvent(event) {
        if (event.which == 83 && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
            event.preventDefault();
            if(vme.setEquationInCaller(false)) {
                $.messager.show({
                    title: "<span class='rtl-title-withicon'>" + vme.getLocalText("INFORMATION") + "</span>",
                    msg: vme.getLocalText("EQUATION_SAVED_IN_CALLER")
                });
            }
            return false;
        }
    }
    if (window.addEventListener){
        window.addEventListener('keydown', function (event) { ProcessSaveEvent(event); }, false);
    } else if (window.attachEvent) { //Old IE
        window.attachEvent('onkeydown', function (event) {ProcessSaveEvent(event); });
    }

    // End VisualMathEditor window event

    //VisualMathEditor language resources _____________________________________________
    VisualMathEditor.prototype.locale.ar = {
        // Language properties _______________
        i18n_Langage: "العربية",
        i18n_Version: "1.2",
        i18n_Author: "<a href='http://www.diwanalarab.com/spip.php?article5318' target='_blank' class='bt' >جورج قندلفت</a>",
        i18n_HTML_Lang: "ar",
        i18n_HTML_Dir: "rtl",
        // Language ressources _______________
        ERROR: "خطأ",
        FILE: "ملف",
        INSERT: "إدخال",
        VIEW: "عرض",
        OPTIONS: "إعداد",
        MATHJAX_MENU: "عرض القائمة MathJax", //A faire vérifier par George
        MATHJAX_FONTINHERIT: "ترث خط النص لتمثيل SVG", //A faire vérifier par George
        COOKIE_SAVE: "حفظ الخيارات على جهاز الكمبيوتر الخاص بي في ملف كعكة",
        INFORMATIONS: "معلومات",
        INFORMATION: "معلومة",
        MENU_UPDATE: "تحديث المعادلة لدى التحديد في القائمة",
        AUTO_UPDATE: "تحديث المعادلة تلقائياً عند الإدخال",
        UPDATE_INTERVAL: "توقيت التحديث (ms)",
        CLOSE: "إغلاق",
        SET_IN_EDITOR: "إدخال في المحرر",
        NO_ASCII: "رمز AsciiMath    غير معرف لهذه الصيغة.",
        NO_LATEX: "رمز Latex غير معرف لهذه الصيغة.",
        NEW_EDITOR: "محرر جديد",
        QUIT_EDITOR: "خروج من المحرر",
        ERROR_QUIT_EDITOR: "لا يمكن إغلاق المحرر اذا كان مفتوحاً في النافذة الرئيسية للمتصفح.",
        SAVE_EQUATION: "حفظ المعادلة",
        OPEN_EQUATION: "فتح المعادلة",
        UPDATE_EQUATION: "تحديث المعادلة",
        SET_EQUATION: "تسجيل المعادلة",
        ERROR_SET_EQUATION: "لم يتم نداء المحرر بواسطة حقل خارجي.",
        MATH_ML: "و MathML مصدر",
        UNICODES_LIST: "قائمة ترميز يونيكود",
        LATEX_CODES_LIST: "قائمة ترميز LaTeX MathJax",
        ASCIIMATH_CODES_LIST: "قائمة ترميز AsciiMath",
        LANGUAGE_LIST: "الموارد اللغوية",
        ASCIIMATH_SYMBOLS: "رموز AsciiMath!",
        MATHJAX_LATEX_SYMBOLS: "رموز MathJax LaTeX!",
        ASCIIMATH_INPUT: "إدخال AsciiMath",
        MATHJAX_LATEX_INPUT: "إدخال MathJax LaTeX",
        UNICODES_INPUT: "ترميز",
        OUTPUT: "إخراج",
        LATEX_EQUIVALENT: "مرادف LaTeX",
        LATEX_DOCUMENTATION: "توثيق LaTeX",
        MHCHEM_DOCUMENTATION: "توثيق mhchem",
        AMSCD_DOCUMENTATION: "توثيق AMScd",
        MATH_ML_SPECIFICATIONS: "مواصفات MathML",
        SVG_SPECIFICATIONS: "مواصفات SVG",
        EDITOR_PARAMETERS: "إعدادات التحرير ...",
        STYLE_CHOISE: "اختر نمطك",
        LANGUAGE_CHOISE: "اختر لغتك",
        THANKS: "شكر",
        COPYRIGHT: "حقوق النشر",
        VERSION: "بيان الإصدارات",
        BUGS: "الأخطاء المدونة",
        ENCLOSE_ALL_FORMULAS: "أضع بنفسي علامة `في AsciiMath أو $ في LaTeX",
        ENCLOSED_BY: "علامة من",
        FORMULA: "صيغة",
        EQUATION: "معادلة",
        EQUATION_SAMPLE: "أمثلة معادلات",
        EDITION: "<span id='PARAM_EDITION_SYNTAX'>تحرير بـ <span id='title_Edition_Current_Syntax'>&nbsp;</span> <a href='#' id='btTITLE_EDITION_SYNTAX' class='bt'>الانتقال الى <span id='title_Edition_Other_Syntax'>&nbsp;</span></a></span><span id='PARAM_EDITION_ENCLOSE'><a id='btENCLOSE_TYPE' href='#'>HTML</a></span>",
        SYNTAX: "كتابة",
        UPDATE: "تحديث المعادلة",
        AUTHOR: "<a id='btCOPYRIGHT' href='information/tCOPYRIGHT.html' target='_blank' class='bt'>حقوق النشر</a> &copy; <span id='VMEversionInf'></span> <a href='http://visualmatheditor.equatheque.net' target='_blank' class='bt'>VisualMathEditor</a> من إنتاج    <a href='http://www.equatheque.net' target='_blank' class='bt' >EquaThEque</a> - <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a>.",
        WAIT_FOR_EDITOR_DOWNLOAD: "تحميل المحرر ...",
        CHAR: "حروف",
        L_GREEK_CHAR: "حروف يونانية صغيرة مائلة",
        L_U_GREEK_CHAR: "حروف يونانية",
        L_U_LATIN_CHAR: "حروف لاتينية كبيرة وصغيرة",
        B_L_U_LATIN_CHAR: "حروف لاتينية سوداء كبيرة وصغيرة",
        CC_CHAR: "حروف ترميز",
        FR_CHAR: "حروف \"Fraktur\"",
        BBB_CHAR: "حروف \"Double\"",
        SF_CHAR: "حروف غير مذنبة",
        TT_CHAR: "حروف أحادية الحجم",
        ISOTOPES_TABLE: "جدول النظائر",
        MATRIX: "مصفوفة",
        BRACKET_SYMBOLS: "رموز الأقواس",
        MATRIX_SYMBOLS: "رموز المصفوفات",
        INTEGRAL_SYMBOLS: "رموز التكامل",
        DIFFERENTIAL_SYMBOLS: "رموز التفاضل",
        SUM_PROD_SYMBOLS: "رموز الجمع والضرب",
        SQRT_FRAC_SYMBOLS: "رموز الجذر والكسر",
        SUB_SUP_SYMBOLS: "الرموز السفلية والفوقية",
        RELATION_SYMBOLS: "الرموزالعلائقية",
        OPERATOR_SYMBOLS: "رموز العمليات",
        ARROW_RELATION_SYMBOLS: "السهام العلائقية",
        ARROW_SYMBOLS: "الرموز السهمية",
        LOGICAL_SYMBOLS: "الرموز المنطقية",
        GROUP_SYMBOLS: "رموز المجموعات",
        GROUP_LOGICAL_SYMBOLS: "رموز المجموعات المنطقية",
        MATH_PHYSIC_SYMBOLS: "الرموز الرياضية والفيزيائية",
        FONCTION_SYMBOLS: "دالات رياضية",
        HORIZONTAL_SPACING_SYMBOLS: "التباعد الأفقي", //A faire vérifier par George
        VERTICAL_SPACING_SYMBOLS: "التباعد العمودي", //A faire vérifier par George
        SPECIAL_CHARACTER: "حرف خاص", //A faire vérifier par George
        COMMUTATIVE_DIAGRAM: "رسم تخطيطي تبادلي", //A faire vérifier par George
        CHEMICAL_FORMULAE: "الصيغة الكيميائية", //A faire vérifier par George
        VKI_00: "لوحة المفاتيح", //A faire vérifier par George
        VKI_01: "فتح لوحة المفاتيح الافتراضية", //A faire vérifier par George
        VKI_02: "اختيار اللغة", //A faire vérifier par George
        VKI_03: "أحرف معلمة ", //A faire vérifier par George
        VKI_04: "نعم", //A faire vérifier par George
        VKI_05: "لا", //A faire vérifier par George
        VKI_06: "إغلاق لوحة المفاتيح", //A faire vérifier par George
        VKI_07: "يمحو", //A faire vérifier par George
        VKI_08: "حذف دخول", //A faire vérifier par George
        VKI_09: "إصدار", //A faire vérifier par George
        VKI_10: "تقليل حجم لوحة المفاتيح", //A faire vérifier par George
        VKI_11: "زيادة حجم لوحة المفاتيح", //A faire vérifier par George
        TOOLS: "أدوات",
        HTML_MODE: "وضع HTML",
        KEYBOARD: "لوحة المفاتيح الافتراضية",
        SVG: "و SVG مصدر",
        TITLE_PNG: "تغيير حجم لي",
        EXPORT_PNG_IMG: "تحويل إلى صورة",
        RESIZE_PNG: "١) تغيير حجم نافذة لاختيار أبعاد الصورة",
        SHOW_PNG: "٢) اضغط على القرص لفتح الصورة لإنقاذ",
        SAVE_PNG: (VisualMathEditor.hasTouch() ? '٣) لمسة طويلة على الصورة واستخدام القائمة "حفظ الصورة"' : '٣) انقر بزر الماوس الأيمن على الصورة واستخدام القائمة "حفظ الصورة"'),
        SAVE_AS_MML: "حفظ ك MML", //A faire vérifier par George
        SAVE_AS_SVG: "حفظ ك SVG", //A faire vérifier par George
        SAVE_AS_PDF: "حفظ ك PDF  [Beta Test version!]", //A faire vérifier par George
        CONVERT_PNG: "PNG التحويل",
        STROKE_PNG: "الافتراضي السكتة الدماغية اللون",
        FILL_PNG: "لون التعبئة الافتراضي",
        BACKGROUND_STROKE_PNG: "Default Border color [write 'none' for transparency]", //A faire par George
        BACKGROUND_FILL_PNG: "Default Background color [write 'none' for transparency]", //A faire par George
        EQUATION_SAVED_IN_CALLER: "تم حفظ المعادلة" //A faire vérifier par George
    };
    VisualMathEditor.prototype.locale.de_DE = {
        // Language properties _______________
        i18n_Langage: "German (Germany)",
        i18n_Version: "1.2",
        i18n_Author: "<a href='http://translate.google.fr' target='_blank' class='bt' >Google translate</a>",
        i18n_HTML_Lang: "de",
        i18n_HTML_Dir: "ltr",
        // Language resources _______________
        ERROR: "Fehler",
        FILE: "Datei",
        INSERT: "Legen",
        VIEW: "Anzeigen",
        OPTIONS: "Optionen",
        MATHJAX_MENU: "Zeigen Sie im menü MathJax",
        MATHJAX_FONTINHERIT: "Erben Sie die Schriftart, die SVG darstellen",
        COOKIE_SAVE: "Speicheroptionen auf meinem computer in einer cookie-Datei",
        INFORMATIONS: "Informationen",
        INFORMATION: "Informationen",
        MENU_UPDATE: "Aktualisieren gleichung bei menüauswahl",
        AUTO_UPDATE: "Automatisch aktualisieren gleichung auf tastendruck",
        UPDATE_INTERVAL: "Aktualisierung Intervall (in ms)",
        CLOSE: "Schließen",
        SET_IN_EDITOR: "Gesetzt in editor",
        NO_ASCII: "AsciiMath symbol für diese formel definiert sind.",
        NO_LATEX: "Latex symbol ist nicht für diese Formel.",
        ERROR_QUIT_EDITOR: "Kann den editor zu schließen, wenn es im hauptfenster des browsers geöffnet wird.",
        NEW_EDITOR: "Neuer editor",
        QUIT_EDITOR: "Editor verlassen",
        SAVE_EQUATION: "Speichern gleichung",
        OPEN_EQUATION: "Offene gleichung",
        UPDATE_EQUATION: "Aktualisieren gleichung",
        SET_EQUATION: "Set gleichung",
        ERROR_SET_EQUATION: "Der editor nicht durch ein externes feld genannt.",
        MATH_ML: "MathML Übersetzung",
        UNICODES_LIST: "Liste der Unicode codes",
        LATEX_CODES_LIST: "Liste der MathJax LaTeX codes",
        ASCIIMATH_CODES_LIST: "Liste der AsciiMath Codes",
        LANGUAGE_LIST: "Sprachressourcen",
        ASCIIMATH_SYMBOLS: "AsciiMath Symbole!",
        MATHJAX_LATEX_SYMBOLS: "MathJax LaTeX Symbole!",
        ASCIIMATH_INPUT: "AsciiMath Eingang",
        MATHJAX_LATEX_INPUT: "MathJax LaTeX Eingang",
        UNICODES_INPUT: "Code",
        OUTPUT : "Ausgabe",
        LATEX_EQUIVALENT: "LaTeX gleichwertig",
        LATEX_DOCUMENTATION: "LaTeX dokumentation",
        MHCHEM_DOCUMENTATION: "mhchem dokumentation",
        AMSCD_DOCUMENTATION: "AMScd dokumentation",
        MATH_ML_SPECIFICATIONS: "MathML spezifikationen",
        SVG_SPECIFICATIONS: "SVG spezifikationen",
        EDITOR_PARAMETERS: "Editor Parameter ...",
        STYLE_CHOISE: "Shirtarten",
        LANGUAGE_CHOISE: "Wählen Sie Ihre Sprache",
        THANKS: "Credits",
        COPYRIGHT: "Urheberrecht",
        VERSION: "Versions geschichte",
        BUGS: "Bekannte fehler",
        ENCLOSE_ALL_FORMULAS: "Ich mich den ganzen tag mit formeln ` in AsciiMath oder $ in Latex",
        ENCLOSED_BY: "Markiert durch",
        FORMULA: "Formula",
        EQUATION: "Gleichung",
        EQUATION_SAMPLE: "Gleichungen proben",
        EDITION: "<span id='PARAM_EDITION_SYNTAX'>Bearbeiten in <span id='title_Edition_Current_Syntax'>&nbsp;</span> <a href='#' id='btTITLE_EDITION_SYNTAX' class='bt'>wechseln <span id='title_Edition_Other_Syntax'>&nbsp;</span></a></span><span id='PARAM_EDITION_ENCLOSE'><a id='btENCLOSE_TYPE' href='#'>HTML</a></span>",
        SYNTAX: "Syntax",
        UPDATE: "Gleichung update",
        AUTHOR: "<a id='btCOPYRIGHT' href='information/tCOPYRIGHT.html' target='_blank' class='bt'>Copyright</a> &copy; <a href='http://visualmatheditor.equatheque.net' target='_blank' class='bt'>VisualMathEditor</a> <span id='VMEversionInf'></span> erstellt von <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a> - <a href='http://www.equatheque.net' target='_blank' class='bt' >EquaThEque</a>.",
        WAIT_FOR_EDITOR_DOWNLOAD: "Editor ist das Herunterladen ...",
        CHAR: "Charakter",
        L_GREEK_CHAR: "Lower griechisch charakter",
        L_U_GREEK_CHAR: "Griechisch charakter",
        L_U_LATIN_CHAR: "Untere und obere latin charakter",
        B_L_U_LATIN_CHAR: "Bold unteren und oberen latin charakter",
        CC_CHAR: "Script charakter",
        FR_CHAR: "Fraktur charakter",
        BBB_CHAR: "Doppel geschlagen charakter",
        SF_CHAR: "Sans serif charakter",
        TT_CHAR: "SUV charakter",
        ISOTOPES_TABLE: "Isotope Tabelle",
        MATRIX: "Matrix",
        BRACKET_SYMBOLS: "Bracket Symbole",
        MATRIX_SYMBOLS: "Matrix symbolen",
        INTEGRAL_SYMBOLS: "Integral symbole",
        DIFFERENTIAL_SYMBOLS: "Differential Symbole",
        SUM_PROD_SYMBOLS: "Sum & prod symbole",
        SQRT_FRAC_SYMBOLS: "Sqrt & frac symbole",
        SUB_SUP_SYMBOLS: "Sub & sup Symbole",
        RELATION_SYMBOLS: "Relation symbols",
        OPERATOR_SYMBOLS: "Bedienung Symbole",
        ARROW_RELATION_SYMBOLS: "Relationship Arrows",
        ARROW_SYMBOLS: "Arrows Symbole",
        LOGICAL_SYMBOLS: "Logische Symbole",
        GROUP_SYMBOLS: "Gruppe Symbole",
        GROUP_LOGICAL_SYMBOLS: "Gruppe logische Symbole",
        MATH_PHYSIC_SYMBOLS: "Mathe und Physik Symbole",
        FONCTION_SYMBOLS: "Funktionen Symbole",
        HORIZONTAL_SPACING_SYMBOLS: "Der horizontale abstand",
        VERTICAL_SPACING_SYMBOLS: "Vertikaler abstand",
        SPECIAL_CHARACTER: "Sonderzeichen",
        COMMUTATIVE_DIAGRAM: "Kommutative diagramm",
        CHEMICAL_FORMULAE: "Chemische Formel",
        VKI_00: "Keypad",
        VKI_01: "Anzeige virtuelle tastatur",
        VKI_02: "Wählen Tastaturbelegung",
        VKI_03: "Zeichen mit Akzent",
        VKI_04: "Auf",
        VKI_05: "Aus",
        VKI_06: "Schließen Sie die Tastatur",
        VKI_07: "Löschen",
        VKI_08: "Deaktivieren sie diese eingabe",
        VKI_09: "Version",
        VKI_10: "Verringern Größe der Tastatur",
        VKI_11: "Steigern Größe der Tastatur",
        TOOLS: "Werkzeuge",
        HTML_MODE: "HTML modus",
        KEYBOARD: "Virtuelle tastatur",
        SVG: "SVG Übersetzung",
        TITLE_PNG: "Ändern der Größe von mir",
        EXPORT_PNG_IMG: "Rechnen Sie auf ein Bild",
        RESIZE_PNG: "1) Ändern der Größe des Fensters, um die Bildabmessungen wählen",
        SHOW_PNG: "2) Klicken Sie auf die Festplatte, um das Bild zu öffnen, um zu sparen",
        SAVE_PNG: "3) " + (VisualMathEditor.hasTouch() ? "Lange Touch" : "Rechts-Klick ") + " auf das Bild und verwenden Menü \"Bild speichern\"",
        SAVE_AS_MML: "Speichern als MML",
        SAVE_AS_SVG: "Speichern als SVG",
        SAVE_AS_PDF: "Speichern als PDF [Beta Test version!]",
        CONVERT_PNG: "PNG Konvertierung",
        STROKE_PNG: "Standardstrichfarbe",
        FILL_PNG: "Standard-Füllfarbe",
        BACKGROUND_STROKE_PNG: "Default Border Farbe [schreib 'none' für Transparenz]",
        BACKGROUND_FILL_PNG: "Standard Hintergrundfarbe [schreib 'none' für Transparenz]",
        EQUATION_SAVED_IN_CALLER: "Gleichung gespeichert"
    };
    VisualMathEditor.prototype.locale.en_US = {
        // Language properties _______________
        i18n_Langage: "English (United States)",
        i18n_Version: "2.2",
        i18n_Author: "<a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a>",
        i18n_HTML_Lang: "en",
        i18n_HTML_Dir: "ltr",
        // Language resources _______________
        ERROR: "Error",
        FILE: "File",
        INSERT: "Insert",
        VIEW: "View",
        OPTIONS: "Options",
        MATHJAX_MENU: "View menu MathJax",
        MATHJAX_FONTINHERIT: "Inherit the text font to represent the SVG",
        COOKIE_SAVE: "Save options on my computer in a cookie file",
        INFORMATIONS: "Informations",
        INFORMATION: "Information",
        MENU_UPDATE: "Update equation at menu selection",
        AUTO_UPDATE: "Auto update equation on key press",
        UPDATE_INTERVAL: "Update interval (in ms)",
        CLOSE: "Close",
        SET_IN_EDITOR: "Set in editor",
        NO_ASCII: "AsciiMath symbol is not defined for this formula.",
        NO_LATEX: "Latex symbol is not defined for this formula.",
        ERROR_QUIT_EDITOR: "Unable to close the editor when it is opened in the main window of the browser.",
        NEW_EDITOR: "New editor",
        QUIT_EDITOR: "Quit editor",
        SAVE_EQUATION: "Save equation",
        OPEN_EQUATION: "Open equation",
        UPDATE_EQUATION: "Update equation",
        SET_EQUATION: "Set equation",
        ERROR_SET_EQUATION: "The editor has not been called by an external field.",
        MATH_ML: "MathML translation",
        UNICODES_LIST: "List of Unicode codes",
        LATEX_CODES_LIST: "List of MathJax LaTeX codes",
        ASCIIMATH_CODES_LIST: "List of AsciiMath codes",
        LANGUAGE_LIST: "Language resources",
        ASCIIMATH_SYMBOLS: "AsciiMath symbols!",
        MATHJAX_LATEX_SYMBOLS: "MathJax LaTeX symbols!",
        ASCIIMATH_INPUT: "AsciiMath input",
        MATHJAX_LATEX_INPUT: "MathJax LaTeX input",
        UNICODES_INPUT: "Code",
        OUTPUT : "Output",
        LATEX_EQUIVALENT: "LaTeX equivalent",
        LATEX_DOCUMENTATION: "LaTeX documentation",
        MHCHEM_DOCUMENTATION: "mhchem documentation",
        AMSCD_DOCUMENTATION: "AMScd documentation",
        MATH_ML_SPECIFICATIONS: "MathML specifications",
        SVG_SPECIFICATIONS: "SVG specifications",
        EDITOR_PARAMETERS: "Editor parameters...",
        STYLE_CHOISE: "Choose your style",
        LANGUAGE_CHOISE: "Choose your language",
        THANKS: "Credits",
        COPYRIGHT: "Copyright",
        VERSION: "Versions history",
        BUGS: "Known bugs",
        ENCLOSE_ALL_FORMULAS: "I tag myself all the formulae with ` in AsciiMath or $ in Latex",
        ENCLOSED_BY: "tagged by",
        FORMULA: "Formula",
        EQUATION: "Equation",
        EQUATION_SAMPLE: "Equations samples",
        EDITION: "<span id='PARAM_EDITION_SYNTAX'>Edit in <span id='title_Edition_Current_Syntax'>&nbsp;</span> <a href='#' id='btTITLE_EDITION_SYNTAX' class='bt'>switch to <span id='title_Edition_Other_Syntax'>&nbsp;</span></a></span><span id='PARAM_EDITION_ENCLOSE'><a id='btENCLOSE_TYPE' href='#'>HTML</a></span>",
        SYNTAX: "Syntax",
        UPDATE: "Equation update",
        AUTHOR: "<a id='btCOPYRIGHT' href='information/tCOPYRIGHT.html' target='_blank' class='bt'>Copyright</a> &copy; <a href='http://visualmatheditor.equatheque.net' target='_blank' class='bt'>VisualMathEditor</a> <span id='VMEversionInf'></span> created by <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a> - <a href='http://www.equatheque.net' target='_blank' class='bt' >EquaThEque</a>.",
        WAIT_FOR_EDITOR_DOWNLOAD: "Editor is downloading...",
        CHAR: "Characters",
        L_GREEK_CHAR: "Lower greek characters",
        L_U_GREEK_CHAR: "Greek characters",
        L_U_LATIN_CHAR: "Lower and upper latin characters",
        B_L_U_LATIN_CHAR: "Bold lower and upper latin characters",
        CC_CHAR: "Script characters",
        FR_CHAR: "Fraktur characters",
        BBB_CHAR: "Double struck characters",
        SF_CHAR: "Sans serif characters",
        TT_CHAR: "Monospace characters",
        ISOTOPES_TABLE: "Isotopes table",
        MATRIX: "Matrix",
        BRACKET_SYMBOLS: "Bracket symbols",
        MATRIX_SYMBOLS: "Matrix symbols",
        INTEGRAL_SYMBOLS: "Integral symbols",
        DIFFERENTIAL_SYMBOLS: "Differential symbols",
        SUM_PROD_SYMBOLS: "Sum & prod symbols",
        SQRT_FRAC_SYMBOLS: "Sqrt & frac symbols",
        SUB_SUP_SYMBOLS: "Sub & sup symbols",
        RELATION_SYMBOLS: "Relation symbols",
        OPERATOR_SYMBOLS: "Operation symbols",
        ARROW_RELATION_SYMBOLS: "Relation Arrows",
        ARROW_SYMBOLS: "Arrows symbols",
        LOGICAL_SYMBOLS: "Logical symbols",
        GROUP_SYMBOLS: "Sets symbols",
        GROUP_LOGICAL_SYMBOLS: "Sets logical symbols",
        MATH_PHYSIC_SYMBOLS: "Math and physics symbols",
        FONCTION_SYMBOLS: "Functions symbols",
        HORIZONTAL_SPACING_SYMBOLS: "Horizontal spacing",
        VERTICAL_SPACING_SYMBOLS: "Vertical spacing",
        SPECIAL_CHARACTER: "Special character",
        COMMUTATIVE_DIAGRAM: "Commutative diagram",
        CHEMICAL_FORMULAE: "Chemical formula",
        VKI_00: "Number Pad",
        VKI_01: "Display virtual keyboard interface",
        VKI_02: "Select keyboard layout",
        VKI_03: "Dead keys",
        VKI_04: "On",
        VKI_05: "Off",
        VKI_06: "Close the keyboard",
        VKI_07: "Clear",
        VKI_08: "Clear this input",
        VKI_09: "Version",
        VKI_10: "Decrease keyboard size",
        VKI_11: "Increase keyboard size",
        TOOLS: "Tools",
        HTML_MODE: "HTML mode",
        KEYBOARD: "Virtual keyboard",
        SVG: "SVG translation",
        TITLE_PNG: "Resize me",
        EXPORT_PNG_IMG: "Convert to an image",
        RESIZE_PNG: "1) Resize the window to choose the image dimensions",
        SHOW_PNG: "2) Click the disk to open the image to save",
        SAVE_PNG: "3) " + (VisualMathEditor.hasTouch() ? "Long touch" : "Right-click") + " on image and use \"Save image\" menu",
        SAVE_AS_MML: "Save as MML",
        SAVE_AS_SVG: "Save as SVG",
        SAVE_AS_PDF: "Save as PDF [Beta Test version!]",
        CONVERT_PNG: "PNG Conversion",
        STROKE_PNG: "Default Stroke color",
        FILL_PNG: "Default Fill color",
        BACKGROUND_STROKE_PNG: "Default Border color [write 'none' for transparency]",
        BACKGROUND_FILL_PNG: "Default Background color [write 'none' for transparency]",
        EQUATION_SAVED_IN_CALLER: "Equation saved"
    };
    VisualMathEditor.prototype.locale.es_ES = {
        // Language properties _______________
        i18n_Langage: "Spanish (Spain)",
        i18n_Version: "1.2",
        i18n_Author: "<a href='http://translate.google.fr' target='_blank' class='bt' >Google translate</a>",
        i18n_HTML_Lang: "es",
        i18n_HTML_Dir: "ltr",
        // Language resources _______________
        ERROR: "Error",
        FILE: "Expediente",
        INSERT: "Insertar",
        VIEW: "Ver",
        OPTIONS: "Opciones",
        MATHJAX_MENU: "Ver menú MathJax",
        MATHJAX_FONTINHERIT: "Heredar la fuente del texto para representar el SVG",
        COOKIE_SAVE: "Guardar opciones en mi ordenador en un archivo de cookies",
        INFORMATIONS: "Informaciónes",
        INFORMATION: "Información",
        MENU_UPDATE: "Actualización de la ecuación en la selección del menú",
        AUTO_UPDATE: "Actualizar automáticamente la ecuación al pulsar la tecla",
        UPDATE_INTERVAL: "Intervalo de actualización (en ms)",
        CLOSE: "Cerrar",
        SET_IN_EDITOR: "Situado en editor",
        NO_ASCII: "Símbolo ASCIIMath no está definida para esta fórmula.",
        NO_LATEX: "Latex símbolo no está definida para esta fórmula.",
        ERROR_QUIT_EDITOR: "No se puede cerrar el editor cuando se abre en la ventana principal del navegador.",
        NEW_EDITOR: "Nuevo editor",
        QUIT_EDITOR: "Salga del editor",
        SAVE_EQUATION: "Guardar la ecuación",
        OPEN_EQUATION: "Ecuación abierto",
        UPDATE_EQUATION: "Actualización de la ecuación",
        SET_EQUATION: "Establezca la ecuación",
        ERROR_SET_EQUATION: "El editor no ha sido llamado por un campo externo.",
        MATH_ML: "Traducción MathML",
        UNICODES_LIST: "Lista de códigos de Unicode",
        LATEX_CODES_LIST: "Lista de códigos de LaTeX MathJax",
        ASCIIMATH_CODES_LIST: "Lista de códigos de ASCIIMath",
        LANGUAGE_LIST: "Los recursos lingüísticos",
        ASCIIMATH_SYMBOLS: "Símbolos ASCIIMath!",
        MATHJAX_LATEX_SYMBOLS: "MathJax símbolos LaTeX!",
        ASCIIMATH_INPUT: "Entrada ASCIIMath",
        MATHJAX_LATEX_INPUT: "MathJax entrada de LaTeX",
        UNICODES_INPUT: "Código",
        OUTPUT : "Salida",
        LATEX_EQUIVALENT: "LaTeX equivalente",
        LATEX_DOCUMENTATION: "Documentación LaTeX",
        MHCHEM_DOCUMENTATION: "Documentación mhchem",
        AMSCD_DOCUMENTATION: "Documentación AMScd",
        MATH_ML_SPECIFICATIONS: "Especificaciones MathML",
        SVG_SPECIFICATIONS: "Especificaciones SVG",
        EDITOR_PARAMETERS: "Parámetros Editor ...",
        STYLE_CHOISE: "Elige tu estilo",
        LANGUAGE_CHOISE: "Elija su idioma",
        THANKS: "Créditos",
        COPYRIGHT: "Derechos de autor",
        VERSION: "Historia versiones",
        BUGS: "Known bugs",
        ENCLOSE_ALL_FORMULAS: "Yo debo etiquetar todas las fórmulas con ` en ASCIIMath o $ en Latex",
        ENCLOSED_BY: "Etiquetados por",
        FORMULA: "Fórmula",
        EQUATION: "Ecuación",
        EQUATION_SAMPLE: "Ecuaciones muestras",
        EDITION: "<span id='PARAM_EDITION_SYNTAX'>Editar en <span id='title_Edition_Current_Syntax'>&nbsp;</span> <a href='#' id='btTITLE_EDITION_SYNTAX' class='bt'>cambiar a <span id='title_Edition_Other_Syntax'>&nbsp;</span></a></span><span id='PARAM_EDITION_ENCLOSE'><a id='btENCLOSE_TYPE' href='#'>HTML</a></span>",
        SYNTAX: "Sintaxis",
        UPDATE: "actualización de la ecuación",
        AUTHOR: "<a id='btCOPYRIGHT' href='information/tCOPYRIGHT.html' target='_blank' class='bt'>Copyright</a> &copy; <a href='http://visualmatheditor.equatheque.net' target='_blank' class='bt'>VisualMathEditor</a> <span id='VMEversionInf'></span> creado por <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a> - <a href='http://www.equatheque.net' target='_blank' class='bt' >EquaThEque</a>.",
        WAIT_FOR_EDITOR_DOWNLOAD: "Editor está descargando ...",
        CHAR: "Caracteres",
        L_GREEK_CHAR: "Bajo griego caracteres",
        L_U_GREEK_CHAR: "Griego caracteres",
        L_U_LATIN_CHAR: "Inferior y superior de latín caracteres",
        B_L_U_LATIN_CHAR: "Negrita inferior y superior latín caracteres",
        CC_CHAR: "Caracteres guión",
        FR_CHAR: "Caracteres fraktur",
        BBB_CHAR: "Caracteres doble golpeó",
        SF_CHAR: "Caracteres sans serif",
        TT_CHAR: "Caracteres SUV",
        ISOTOPES_TABLE: "mesa de Isótopos",
        MATRIX: "Matriz",
        BRACKET_SYMBOLS: "Símbolos del soporte",
        MATRIX_SYMBOLS: "Símbolos matriciales",
        INTEGRAL_SYMBOLS: "Símbolos integral",
        DIFFERENTIAL_SYMBOLS: "Símbolos diferenciales",
        SUM_PROD_SYMBOLS: "Suma y prod símbolos",
        SQRT_FRAC_SYMBOLS: "Símbolos Sqrt y frac",
        SUB_SUP_SYMBOLS: "Sub & sup símbolos",
        RELATION_SYMBOLS: "Símbolos de relaciones",
        OPERATOR_SYMBOLS: "Símbolos de operación",
        ARROW_RELATION_SYMBOLS: "Flechas relación",
        ARROW_SYMBOLS: "Flechas símbolos",
        LOGICAL_SYMBOLS: "Símbolos lógicos",
        GROUP_SYMBOLS: "Símbolos del Grupo",
        GROUP_LOGICAL_SYMBOLS: "Símbolos lógicos del grupo",
        MATH_PHYSIC_SYMBOLS: "Matemáticas y la física símbolos",
        FONCTION_SYMBOLS: "Funciones símbolos",
        HORIZONTAL_SPACING_SYMBOLS: "Espaciado horizontal",
        VERTICAL_SPACING_SYMBOLS: "Espaciado vertical",
        SPECIAL_CHARACTER: "Carácter especial",
        COMMUTATIVE_DIAGRAM: "Diagrama conmutativo",
        CHEMICAL_FORMULAE: "Fórmula química",
        VKI_00: "Teclado",
        VKI_01: "Mostrar la interfaz teclado virtual",
        VKI_02: "Seleccionar disposición del teclado",
        VKI_03: "Los caracteres acentuados",
        VKI_04: "En",
        VKI_05: "De",
        VKI_06: "Cerrar el teclado",
        VKI_07: "Borrar",
        VKI_08: "Borrar esta entrada",
        VKI_09: "Versión",
        VKI_10: "Disminuir el tamaño del teclado",
        VKI_11: "Aumentar el tamaño del teclado",
        TOOLS: "Instrumentos",
        HTML_MODE: "Modo HTML",
        KEYBOARD: "Teclado virtual",
        SVG: "Traducción SVG",
        TITLE_PNG: "me redimensionar",
        EXPORT_PNG_IMG: "Convertir a una imagen",
        RESIZE_PNG: "1) Cambiar el tamaño de la ventana para elegir las dimensiones de imagen",
        SHOW_PNG: "2) Haga clic en el disco para abrir la imagen para guardar",
        SAVE_PNG: "3) " + (VisualMathEditor.hasTouch() ? "Un toque largo" : "Haga clic") + " en la imagen y utilizar el menú \"Guardar imagen\"",
        SAVE_AS_MML: "Guardar como MML",
        SAVE_AS_SVG: "Guardar como SVG",
        SAVE_AS_PDF: "Guardar como PDF [Beta Test version!]",
        CONVERT_PNG: "PNG Conversión",
        STROKE_PNG: "Por defecto Color de trazo",
        FILL_PNG: "El color del defecto de relleno",
        BACKGROUND_STROKE_PNG: "Color de borde predeterminado [escribe 'none' para la transparencia]",
        BACKGROUND_FILL_PNG: "Color de fondo predeterminado [escriba 'none' para la transparencia]",
        EQUATION_SAVED_IN_CALLER: "Ecuación guardada"
    };
    VisualMathEditor.prototype.locale.fr_FR = {
        // Language properties _______________
        i18n_Langage: "Français (France)",
        i18n_Version: "2.2",
        i18n_Author: "<a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a>",
        i18n_HTML_Lang: "fr",
        i18n_HTML_Dir: "ltr",
        // Language ressources _______________
        ERROR: "Erreur",
        FILE: "Fichier",
        INSERT: "Insérer",
        VIEW: "Afficher",
        OPTIONS: "Configuration",
        MATHJAX_MENU: "Afficher le menu MathJax",
        MATHJAX_FONTINHERIT: "Hériter de la police de texte pour représenter le SVG",
        COOKIE_SAVE: "Enregistrer les options sur mon ordinateur dans un fichier de \"cookie\"",
        INFORMATIONS: "Informations",
        INFORMATION: "Information",
        MENU_UPDATE: "Mettre à jour l'équation à la sélection dans un menu",
        AUTO_UPDATE: "Mettre automatiquement à jour l'équation lors de la saisie",
        UPDATE_INTERVAL: "Délais de mise à jour (en ms)",
        CLOSE: "Fermer",
        SET_IN_EDITOR: "Insérer dans l'éditeur",
        NO_ASCII: "Le symbole AsciiMath n'est pas défini pour cette formule.",
        NO_LATEX: "Le symbole Latex n'est pas défini pour cette formule.",
        NEW_EDITOR: "Nouvel éditeur",
        QUIT_EDITOR: "Quitter l'éditeur",
        ERROR_QUIT_EDITOR: "Impossible de fermer l'éditeur quand il est ouvert dans la fenètre principale du navigateur.",
        SAVE_EQUATION: "Sauver l'équation",
        OPEN_EQUATION: "Ouvrir une équation",
        UPDATE_EQUATION: "Mettre à jour l'équation",
        SET_EQUATION: "Enregistrer l'équation",
        ERROR_SET_EQUATION: "L'éditeur n'a pas été appelé par un champ externe.",
        MATH_ML: "Source MathML",
        UNICODES_LIST: "Liste des codes Unicode",
        LATEX_CODES_LIST: "Liste des codes MathJax LaTeX",
        ASCIIMATH_CODES_LIST: "Liste des codes AsciiMath",
        LANGUAGE_LIST: "Ressources linguistiques",
        ASCIIMATH_SYMBOLS: "symboles AsciiMath !",
        MATHJAX_LATEX_SYMBOLS: "symboles MathJax LaTeX !",
        ASCIIMATH_INPUT: "Entrée AsciiMath",
        MATHJAX_LATEX_INPUT: "Entrée MathJax LaTeX",
        UNICODES_INPUT: "Code",
        OUTPUT: "Sortie",
        LATEX_EQUIVALENT: "Equivalent LaTeX",
        LATEX_DOCUMENTATION: "Documentation LaTeX",
        MHCHEM_DOCUMENTATION: "Documentation mhchem",
        AMSCD_DOCUMENTATION: "Documentation AMScd",
        MATH_ML_SPECIFICATIONS: "Spécifications MathML",
        SVG_SPECIFICATIONS: "Spécifications SVG",
        EDITOR_PARAMETERS: "Paramètres d'édition...",
        STYLE_CHOISE: "Choisissez votre style",
        LANGUAGE_CHOISE: "Choisissez votre langue",
        THANKS: "Remerciements",
        COPYRIGHT: "Droit d'auteur",
        VERSION: "Historique des versions",
        BUGS: "Problèmes référencés",
        ENCLOSE_ALL_FORMULAS: "Je balise moi même toutes les formules avec ` en AsciiMath ou $ en Latex",
        ENCLOSED_BY: "balisé par",
        FORMULA: "Formule",
        EQUATION: "Equation",
        EQUATION_SAMPLE: "Exemple d'équation",
        EDITION:    "<span id='PARAM_EDITION_SYNTAX'>Edition <span id='title_Edition_Current_Syntax'>&nbsp;</span><a href='#' id='btTITLE_EDITION_SYNTAX' class='bt'>passer en <span id='title_Edition_Other_Syntax'>&nbsp;</span></a></span><span id='PARAM_EDITION_ENCLOSE'><a id='btENCLOSE_TYPE' href='#'>HTML</a></span>",
        SYNTAX: "Syntaxe",
        UPDATE: "Mise à jour de l'équation",
        AUTHOR: "<a id='btCOPYRIGHT' href='information/tCOPYRIGHT.html' target='_blank' class='bt'>Copyright</a> &copy; <a href='http://visualmatheditor.equatheque.net' target='_blank' class='bt'>VisualMathEditor</a> <span id='VMEversionInf'></span> a été créé par <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a> - <a href='http://www.equatheque.net' target='_blank' class='bt' >EquaThEque</a>.",
        WAIT_FOR_EDITOR_DOWNLOAD: "Chargement de l'éditeur en cours...",
        CHAR: "Caractères",
        L_GREEK_CHAR: "Caractères grecques italique minuscules",
        L_U_GREEK_CHAR: "Caractères grecques",
        L_U_LATIN_CHAR: "Caractères latins minuscules et majuscules",
        B_L_U_LATIN_CHAR: "Caractères latins gras minuscules et majuscules",
        CC_CHAR: "Caractères de script",
        FR_CHAR: "Caractères \"Fraktur\"",
        BBB_CHAR: "Caractères \"Double\"",
        SF_CHAR: "Caractères \"Sans serif\"",
        TT_CHAR: "Caractères \"Monospace\"",
        ISOTOPES_TABLE: "Table des isotopes",
        MATRIX: "Matrice",
        BRACKET_SYMBOLS: "Symboles d'encadrement",
        MATRIX_SYMBOLS: "Symboles de matrice",
        INTEGRAL_SYMBOLS: "Symboles d'integrale",
        DIFFERENTIAL_SYMBOLS: "Symboles de differentielle",
        SUM_PROD_SYMBOLS: "Symboles de somme et de produit",
        SQRT_FRAC_SYMBOLS: "Symboles de racine et de fraction",
        SUB_SUP_SYMBOLS: "Symboles d'exposant et d'indice",
        RELATION_SYMBOLS: "Symboles de relation",
        OPERATOR_SYMBOLS: "Symboles d'opération",
        ARROW_RELATION_SYMBOLS: "Flèches de relation",
        ARROW_SYMBOLS: "Symboles de flèche",
        LOGICAL_SYMBOLS: "Symboles logiques",
        GROUP_SYMBOLS: "Symboles d'ensemble",
        GROUP_LOGICAL_SYMBOLS: "Symboles logiques d'ensemble",
        MATH_PHYSIC_SYMBOLS: "Symboles mathématiques et physiques",
        FONCTION_SYMBOLS: "Fonctions mathématiques",
        HORIZONTAL_SPACING_SYMBOLS: "Espacement horizontal",
        VERTICAL_SPACING_SYMBOLS: "Espacement vertical",
        SPECIAL_CHARACTER: "Caractère spécial",
        COMMUTATIVE_DIAGRAM: "Diagramme commutatif",
        CHEMICAL_FORMULAE: "Formule chimique",
        VKI_00: "Pavé numérique",
        VKI_01: "Ouvrir le clavier virtuel",
        VKI_02: "Choisisser la langue",
        VKI_03: "Charactères accentués ",
        VKI_04: "Oui",
        VKI_05: "Non",
        VKI_06: "Fermer le clavier",
        VKI_07: "Effacer",
        VKI_08: "Effacer l'entrée",
        VKI_09: "Version",
        VKI_10: "Réduire la taille du clavier",
        VKI_11: "Augmenter la taille du clavier",
        TOOLS: "Outils",
        HTML_MODE: "Mode HTML",
        KEYBOARD: "Clavier virtuel",
        SVG: "Source SVG",
        TITLE_PNG: "Redimensionner moi",
        EXPORT_PNG_IMG: "Convertir en une image",
        RESIZE_PNG: "1) Redimensionner la fenêtre pour choisir les dimensions de l'image",
        SHOW_PNG: "2) Cliquez sur le disque pour ouvrir l'image à enregistrer",
        SAVE_PNG: "3) " + (VisualMathEditor.hasTouch() ? "Appuyez longtemps" : "Faites un clic droit") + " sur l'image et utiliser le menu \"Enregistrer l'image\"",
        SAVE_AS_MML: "Sauvegarder sous MML",
        SAVE_AS_SVG: "Sauvegarder sous SVG",
        SAVE_AS_PDF: "Sauvegarder sous PDF [Beta Test version!]",
        CONVERT_PNG: "Conversion PNG",
        STROKE_PNG: "Couleur de trait par défaut",
        FILL_PNG: "Couleur de remplissage par défaut",
        BACKGROUND_STROKE_PNG: "Couleur de bordure par défaut [écrire 'none' pour la transparence]",
        BACKGROUND_FILL_PNG: "Couleur d'arrière-plan par défaut [écrire 'none' pour la transparence]",
        EQUATION_SAVED_IN_CALLER: "Equation sauvée"
    };
    VisualMathEditor.prototype.locale.ru = {
        // Language properties _______________
        i18n_Langage: "русский",
        i18n_Version: "1.2",
        i18n_Author: "<a href='http://translate.google.fr' target='_blank' class='bt' >Google translate</a>",
        i18n_HTML_Lang: "ru",
        i18n_HTML_Dir: "ltr",
        // Language resources _______________
        ERROR: "ошибка",
        FILE: "файл",
        INSERT: "вставить",
        VIEW: "отображать",
        OPTIONS: "выбор",
        MATHJAX_MENU: "В меню Вид MathJax",
        MATHJAX_FONTINHERIT: "Наследование шрифт текста для представления SVG",
        COOKIE_SAVE: "Сохранить настройки на моем компьютере в файле куки",
        INFORMATIONS: "информация",
        INFORMATION: "информация",
        MENU_UPDATE: "Обновление уравнение, когда в меню нажмите",
        AUTO_UPDATE: "Автоматическое обновление уравнения на нажатой клавишу",
        UPDATE_INTERVAL: "Интервал обновления (в ms)",
        CLOSE: "закрывать",
        SET_IN_EDITOR: "Расположенный в редакторе",
        NO_ASCII: "AsciiMath символ не определен для этой формуле.",
        NO_LATEX: "Latex символ не определен для этой формуле.",
        NEW_EDITOR: "Новый редактор",
        QUIT_EDITOR: "Закройте редактор",
        ERROR_QUIT_EDITOR: "Невозможно, чтобы закрыть редактор, когда он был открыт в главном окне браузера.",
        SAVE_EQUATION: "Сохраните уравнение",
        OPEN_EQUATION: "Откройте уравнение",
        UPDATE_EQUATION: "Обновление уравнение",
        SET_EQUATION: "Сохраните уравнение",
        ERROR_SET_EQUATION: "Редактор не был вызван внешним полем.",
        MATH_ML: "MathML перевод",
        UNICODES_LIST: "Список символов Unicode",
        LATEX_CODES_LIST: "Список кодов MathJax LaTeX",
        ASCIIMATH_CODES_LIST: "Список кодов AsciiMath",
        ASCIIMATH_SYMBOLS: "AsciiMath символов!",
        LANGUAGE_LIST: "Лингвистические ресурсы",
        MATHJAX_LATEX_SYMBOLS: "MathJax LaTeX символов!",
        ASCIIMATH_INPUT: "AsciiMath вход",
        MATHJAX_LATEX_INPUT: "MathJax LaTeX вход",
        UNICODES_INPUT: "код",
        OUTPUT : "выходной",
        LATEX_EQUIVALENT: "LaTeX эквивалентную",
        LATEX_DOCUMENTATION: "LaTeX документации",
        MHCHEM_DOCUMENTATION: "mhchem документации",
        AMSCD_DOCUMENTATION: "AMScd документации",
        MATH_ML_SPECIFICATIONS: "MathML спецификация",
        SVG_SPECIFICATIONS: "SVG спецификация",
        EDITOR_PARAMETERS: "Редактор параметров ...",
        STYLE_CHOISE: "Выбери свой стиль",
        LANGUAGE_CHOISE: "Выберите язык",
        THANKS: "спасибо",
        COPYRIGHT: "авторским",
        VERSION: "История изменений",
        BUGS: "Известные ошибки",
        ENCLOSE_ALL_FORMULAS: "Пометить себя все формулы с `в AsciiMath или $ в Latex",
        ENCLOSED_BY: "отмечен",
        FORMULA: "формула",
        EQUATION: "уравнение",
        EQUATION_SAMPLE: "Уравнения образцов",
        EDITION: "<span id='PARAM_EDITION_SYNTAX'>издание <span id='title_Edition_Current_Syntax'>&nbsp;</span> <a href='#' id='btTITLE_EDITION_SYNTAX' class='bt'>переключения <span id='title_Edition_Other_Syntax'>&nbsp;</span></a></span><span id='PARAM_EDITION_ENCLOSE'><a id='btENCLOSE_TYPE' href='#'>HTML</a></span>",
        SYNTAX: "синтаксис",
        UPDATE: "Уравнение обновления",
        AUTHOR: "<a id='btCOPYRIGHT' href='information/tCOPYRIGHT.html' target='_blank' class='bt'>Copyright</a> &copy; <a href='http://visualmatheditor.equatheque.net' target='_blank' class='bt'>VisualMathEditor</a> <span id='VMEversionInf'></span> была создана <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a> - <a href='http://www.equatheque.net' target='_blank' class='bt' >EquaThEque</a>.",
        WAIT_FOR_EDITOR_DOWNLOAD: "Редактор загружается ...",
        CHAR: "Персонажи",
        L_GREEK_CHAR: "Нижняя греческие символы",
        L_U_GREEK_CHAR: "греческие символы",
        L_U_LATIN_CHAR: "Нижняя и верхняя латинские буквы",
        B_L_U_LATIN_CHAR: "Жирный нижних и верхних латинских символов",
        CC_CHAR: "Сценарий символов",
        FR_CHAR: "Fraktur символов",
        BBB_CHAR: "Двухместный ударил символов",
        SF_CHAR: "Без засечек символов",
        TT_CHAR: "Моноширинный символов",
        ISOTOPES_TABLE: "Изотопы стол",
        MATRIX: "матрица",
        BRACKET_SYMBOLS: "Кронштейн символов",
        MATRIX_SYMBOLS: "Матрица символов",
        INTEGRAL_SYMBOLS: "Интегральная символов",
        DIFFERENTIAL_SYMBOLS: "Дифференциальная символов",
        SUM_PROD_SYMBOLS: "Сумма продуктов и символы",
        SQRT_FRAC_SYMBOLS: "корень и часть символов",
        SUB_SUP_SYMBOLS: "нижние и верхние символы",
        RELATION_SYMBOLS: "Отношение символов",
        OPERATOR_SYMBOLS: "Оператор символов",
        ARROW_RELATION_SYMBOLS: "Стрелки отношения",
        ARROW_SYMBOLS: "Стрелка символов",
        LOGICAL_SYMBOLS: "Логические символы",
        GROUP_SYMBOLS: "Группа символов",
        GROUP_LOGICAL_SYMBOLS: "Группа логических символов",
        MATH_PHYSIC_SYMBOLS: "Математика и физика символов",
        FONCTION_SYMBOLS: "Функция символов",
        HORIZONTAL_SPACING_SYMBOLS: "Горизонтальный промежуток",
        VERTICAL_SPACING_SYMBOLS: "Вертикальный промежуток",
        SPECIAL_CHARACTER: "Специальный символ",
        COMMUTATIVE_DIAGRAM: "коммутативной диаграммы",
        CHEMICAL_FORMULAE: "химическая формула",
        VKI_00: "Посмотреть клавиатуры",
        VKI_01: "Открыть виртуальную клавиатуру",
        VKI_02: "Выберите язык",
        VKI_03: "Подчеркнутые символы ",
        VKI_04: "да",
        VKI_05: "нет",
        VKI_06: "Закрытие клавиатуры",
        VKI_07: "Снимите",
        VKI_08: "Снимите этот входной",
        VKI_09: "версия",
        VKI_10: "Уменьшение размера клавиатуры",
        VKI_11: "Увеличение размера клавиатуры",
        TOOLS: "инструментарий",
        HTML_MODE: "HTML режиме",
        KEYBOARD: "Виртуальная клавиатура",
        SVG: "SVG перевод",
        TITLE_PNG: "Изменение размера мне",
        EXPORT_PNG_IMG: "Преобразование к изображению",
        RESIZE_PNG: "1) Измените размер окна, чтобы выбрать размеры изображения",
        SHOW_PNG: "2) Выберите диск, чтобы открыть изображение, чтобы сохранить",
        SAVE_PNG: "3) " + (VisualMathEditor.hasTouch() ? "Долгое нажатие" : "Щелкните правой кнопкой мыши") + " на изображение и использовать меню \"Сохранить изображение\"",
        SAVE_AS_MML: "Сохранить как MML",
        SAVE_AS_SVG: "Сохранить как SVG",
        SAVE_AS_PDF: "Сохранить как PDF [Beta Test version!]",
        CONVERT_PNG: "PNG преобразования",
        STROKE_PNG: "По умолчанию Цвет обводки",
        FILL_PNG: "По умолчанию цвет заливки",
        BACKGROUND_STROKE_PNG: "Цвет границы по умолчанию [писать «none» для прозрачности]",
        BACKGROUND_FILL_PNG: "Цвет фона по умолчанию [писать «none» для прозрачности]",
        EQUATION_SAVED_IN_CALLER: "Уравнение сохранено"
    };
    VisualMathEditor.prototype.locale.vi_VN = {
        // Language properties _______________
        i18n_Langage: "Tiếng Việt (Việt Nam)",
        i18n_Version: "1.2",
        i18n_Author: "<a href='http://translate.google.fr' target='_blank' class='bt' >Google translate</a>",
        i18n_HTML_Lang: "vi",
        i18n_HTML_Dir: "ltr",
        // Language ressources _______________
        ERROR: "lôi",
        FILE: "tập tin",
        INSERT: "chèn",
        VIEW: "Xem",
        OPTIONS: "Tùy chọn",
        MATHJAX_MENU: "Xem trình đơn MathJax",
        MATHJAX_FONTINHERIT: "Kế thừa các font chữ để đại diện cho SVG",
        COOKIE_SAVE: "Lưu các tùy chọn trên máy tính của tôi trong một tập tin cookie",
        INFORMATIONS: "Thông tin",
        INFORMATION: "Thông tin",
        MENU_UPDATE: "Cập nhật phương trình khi nhấp vào trình đơn",
        AUTO_UPDATE: "Phương trình tự động cập nhật vào phím bấm",
        UPDATE_INTERVAL: "Cập nhật khoảng thời gian (ms)",
        CLOSE: "Đóng",
        SET_IN_EDITOR: "Đặt trong trình soạn thảo",
        NO_ASCII: "AsciiMath biểu tượng không được xác định cho công thức này.",
        NO_LATEX: "Latex biểu tượng không được xác định cho công thức này.",
        ERROR_QUIT_EDITOR: "Không thể đóng trình soạn thảo khi nó được mở ra trong cửa sổ chính của trình duyệt.",
        NEW_EDITOR: "tân",
        QUIT_EDITOR: "Quit biên tập viên",
        SAVE_EQUATION: "lưu phương trình",
        OPEN_EQUATION: "mở phương trình",
        UPDATE_EQUATION: "Cập nhật phương trình",
        SET_EQUATION: "Thiết lập phương trình",
        ERROR_SET_EQUATION: "Biên tập viên đã không được gọi là một lĩnh vực bên ngoài.",
        MATH_ML: "MathML dịch",
        UNICODES_LIST: "Danh sách mã Unicode",
        LATEX_CODES_LIST: "Danh sách của MathJax LaTeX mã",
        ASCIIMATH_CODES_LIST: "Danh sách các mã AsciiMath",
        LANGUAGE_LIST: "Ngôn ngữ tài nguyên",
        ASCIIMATH_SYMBOLS: "AsciiMath biểu tượng!",
        MATHJAX_LATEX_SYMBOLS: "MathJax LaTeX biểu tượng!",
        ASCIIMATH_INPUT: "AsciiMath đầu vào",
        MATHJAX_LATEX_INPUT: "MathJax LaTeX đầu vào",
        UNICODES_INPUT: "Mã",
        OUTPUT : "đầu ra",
        LATEX_EQUIVALENT: "LaTeX tương đương",
        LATEX_DOCUMENTATION: "LaTeX tài liệu",
        MHCHEM_DOCUMENTATION: "mhchem tài liệu",
        AMSCD_DOCUMENTATION: "AMScd tài liệu",
        MATH_ML_SPECIFICATIONS: "MathML thông số kỹ thuật",
        SVG_SPECIFICATIONS: "SVG thông số kỹ thuật",
        EDITOR_PARAMETERS: "Biên tập các thông số ...",
        STYLE_CHOISE: "Lựa chọn phong cách của bạn",
        LANGUAGE_CHOISE: "Lựa chọn ngôn ngữ của bạn",
        THANKS: "Điểm Uy Tín",
        COPYRIGHT: "bản quyền",
        VERSION: "Phiên bản lịch sử",
        BUGS: "Được biết đến lỗi",
        ENCLOSE_ALL_FORMULAS: "I tag myself all the formulas with ` in AsciiMath or $ in Latex",
        ENCLOSED_BY: "đánh dấu bằng",
        FORMULA: "Công thức",
        EQUATION: "phương trình",
        EQUATION_SAMPLE: "phương trình mẫu",
        EDITION: "<span id='PARAM_EDITION_SYNTAX'>phiên bản <span id='title_Edition_Current_Syntax'>&nbsp;</span> <a href='#' id='btTITLE_EDITION_SYNTAX' class='bt'>chuyển sang <span id='title_Edition_Other_Syntax'>&nbsp;</span></a></span><span id='PARAM_EDITION_ENCLOSE'><a id='btENCLOSE_TYPE' href='#'>HTML</a></span>",
        SYNTAX: "Cú pháp",
        UPDATE: "phương trình cập nhật",
        AUTHOR: "<a id='btCOPYRIGHT' href='information/tCOPYRIGHT.html' target='_blank' class='bt'>Copyright</a> &copy; <a href='http://visualmatheditor.equatheque.net' target='_blank' class='bt'>VisualMathEditor</a> <span id='VMEversionInf'></span> được tạo ra bởi <a href='mailto:contact@equatheque.com?subject=VisualMathEditor' target='_blank' class='bt' >David Grima</a> - <a href='http://www.equatheque.net' target='_blank' class='bt' >EquaThEque</a>.",
        WAIT_FOR_EDITOR_DOWNLOAD: "Biên tập được tải về ...",
        CHAR: "ký tự",
        L_GREEK_CHAR: "Hạ ký tự Hy Lạp",
        L_U_GREEK_CHAR: "Hy Lạp ký tự",
        L_U_LATIN_CHAR: "ký tự Latin trên và dưới",
        B_L_U_LATIN_CHAR: "bạo dạng trên và dưới ký tự Latin",
        CC_CHAR: "ký tự \"Script\" ",
        FR_CHAR: "ký tự \"Fraktur\" ",
        BBB_CHAR: "ký tự \"Double struck\" ",
        SF_CHAR: "ký tự \"Sans serif\" ",
        TT_CHAR: "ký tự \"Monospace\" ",
        ISOTOPES_TABLE: "Đồng vị bảng",
        MATRIX: "khuôn đúc chư",
        BRACKET_SYMBOLS: "khung biểu tượng",
        MATRIX_SYMBOLS: "khuôn đúc chư biểu tượng",
        INTEGRAL_SYMBOLS: "tích hợp các biểu tượng",
        DIFFERENTIAL_SYMBOLS: "khác biệt giữa các biểu tượng",
        SUM_PROD_SYMBOLS: "Tổng hợp & sản biểu tượng",
        SQRT_FRAC_SYMBOLS: "vuông gốc & phần nhỏ biểu tượng",
        SUB_SUP_SYMBOLS: "thay thế & biểu tượng cao",
        RELATION_SYMBOLS: "Mối quan hệ biểu tượng",
        OPERATOR_SYMBOLS: "nhà điều hành biểu tượng",
        ARROW_RELATION_SYMBOLS: "Mối quan hệ Arrows",
        ARROW_SYMBOLS: "mũi tên biểu tượng",
        LOGICAL_SYMBOLS: "hợp lý biểu tượng",
        GROUP_SYMBOLS: "nhóm biểu tượng",
        GROUP_LOGICAL_SYMBOLS: "Nhóm biểu tượng hợp lý",
        MATH_PHYSIC_SYMBOLS: "Toán học và các ký hiệu vật lý",
        FONCTION_SYMBOLS: "chức năng biểu tượng",
        HORIZONTAL_SPACING_SYMBOLS: "khoảng cách ngang",
        VERTICAL_SPACING_SYMBOLS: "khoảng cách theo chiều dọc",
        SPECIAL_CHARACTER: "ký tự đặc biệt",
        COMMUTATIVE_DIAGRAM: "sơ đồ giao hoán",
        CHEMICAL_FORMULAE: "Công thức hóa học",
        VKI_00: "bàn phím",
        VKI_01: "Mở bàn phím ảo",
        VKI_02: "Chọn ngôn ngữ",
        VKI_03: "ký tự có dấu ",
        VKI_04: "vâng",
        VKI_05: "không",
        VKI_06: "Đóng bàn phím",
        VKI_07: "rõ ràng",
        VKI_08: "Xóa mục",
        VKI_09: "phiên bản",
        VKI_10: "Giảm kích thước của bàn phím",
        VKI_11: "Tăng kích thước của bàn phím",
        TOOLS: "Công cụ",
        HTML_MODE: "Chế độ HTML",
        KEYBOARD: "Bàn phím ảo",
        SVG: "SVG dịch",
        TITLE_PNG: "thay đổi kích thước tôi",
        EXPORT_PNG_IMG: "Chuyển đổi sang một hình ảnh",
        RESIZE_PNG: "1) Thay đổi kích thước cửa sổ để lựa chọn kích thước hình ảnh",
        SHOW_PNG: "2) Nhấp vào đĩa để mở hình ảnh để tiết kiệm",
        SAVE_PNG: "3) " + (VisualMathEditor.hasTouch() ? " dài cảm ứng trên" : "Nhấp chuột phải vào") + " hình ảnh và sử dụng \"Lưu ảnh\" trình đơn",
        SAVE_AS_MML: "Tiết kiệm như MML",
        SAVE_AS_SVG: "Tiết kiệm như SVG",
        SAVE_AS_PDF: "Tiết kiệm như PDF [Beta Test version!]",
        CONVERT_PNG: "PNG Chuyển đổi",
        STROKE_PNG: "Mặc định Stroke màu",
        FILL_PNG: "Màu mặc định Fill",
        BACKGROUND_STROKE_PNG: "Màu Border mặc định [viết 'none' để minh bạch]",
        BACKGROUND_FILL_PNG: "Màu nền mặc định [viết 'none' để minh bạch]",
        EQUATION_SAVED_IN_CALLER: "Phương trình được lưu"
    };
    // End VisualMathEditor language resources

    // Module to create and launch vme object when page is loaded _____________________
    $(window.document).ready(function () { // Anonymous function : WEB page ressourses are ready
        $.parser.onComplete = function () { // Anonymous function : easyUI page parser is complete
            if (!vme) {
                window.VisualMathEditor = VisualMathEditor;
                window.vme = vme = new VisualMathEditor();
                if (!vme.isBuild) {
                    $("body").html("VisualMathEditor Error. The editor does'nt load properly. You can try to refresh the page by pressing the F5 key.");
                }
            }
        }; // End Anonymous function : easyUI page parser is complete
    }); // End Anonymous function :WEB page ressourses are ready
    // End Module to create and launch vme object when page is loaded

}(window.jQuery, window.MathJax, window.CodeMirror, window.canvg));
// End Immediately-invoked self-executing anonymous function