module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/react-intl/locale-data/ar.js":
/*!***************************************************!*\
  !*** ./node_modules/react-intl/locale-data/ar.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,a){ true?module.exports=a():undefined}(this,function(){"use strict";return[{locale:"ar",pluralRuleFunction:function(e,a){var r=String(e).split("."),o=Number(r[0])==e&&r[0].slice(-2);return a?"other":0==e?"zero":1==e?"one":2==e?"two":o>=3&&o<=10?"few":o>=11&&o<=99?"many":"other"},fields:{year:{displayName:"السنة",relative:{0:"السنة الحالية",1:"السنة القادمة","-1":"السنة الماضية"},relativeTime:{future:{zero:"خلال {0} سنة",one:"خلال سنة واحدة",two:"خلال سنتين",few:"خلال {0} سنوات",many:"خلال {0} سنة",other:"خلال {0} سنة"},past:{zero:"قبل {0} سنة",one:"قبل سنة واحدة",two:"قبل سنتين",few:"قبل {0} سنوات",many:"قبل {0} سنة",other:"قبل {0} سنة"}}},month:{displayName:"الشهر",relative:{0:"هذا الشهر",1:"الشهر القادم","-1":"الشهر الماضي"},relativeTime:{future:{zero:"خلال {0} شهر",one:"خلال شهر واحد",two:"خلال شهرين",few:"خلال {0} أشهر",many:"خلال {0} شهرًا",other:"خلال {0} شهر"},past:{zero:"قبل {0} شهر",one:"قبل شهر واحد",two:"قبل شهرين",few:"قبل {0} أشهر",many:"قبل {0} شهرًا",other:"قبل {0} شهر"}}},day:{displayName:"يوم",relative:{0:"اليوم",1:"غدًا",2:"بعد الغد","-2":"أول أمس","-1":"أمس"},relativeTime:{future:{zero:"خلال {0} يوم",one:"خلال يوم واحد",two:"خلال يومين",few:"خلال {0} أيام",many:"خلال {0} يومًا",other:"خلال {0} يوم"},past:{zero:"قبل {0} يوم",one:"قبل يوم واحد",two:"قبل يومين",few:"قبل {0} أيام",many:"قبل {0} يومًا",other:"قبل {0} يوم"}}},hour:{displayName:"الساعات",relative:{0:"الساعة الحالية"},relativeTime:{future:{zero:"خلال {0} ساعة",one:"خلال ساعة واحدة",two:"خلال ساعتين",few:"خلال {0} ساعات",many:"خلال {0} ساعة",other:"خلال {0} ساعة"},past:{zero:"قبل {0} ساعة",one:"قبل ساعة واحدة",two:"قبل ساعتين",few:"قبل {0} ساعات",many:"قبل {0} ساعة",other:"قبل {0} ساعة"}}},minute:{displayName:"الدقائق",relative:{0:"هذه الدقيقة"},relativeTime:{future:{zero:"خلال {0} دقيقة",one:"خلال دقيقة واحدة",two:"خلال دقيقتين",few:"خلال {0} دقائق",many:"خلال {0} دقيقة",other:"خلال {0} دقيقة"},past:{zero:"قبل {0} دقيقة",one:"قبل دقيقة واحدة",two:"قبل دقيقتين",few:"قبل {0} دقائق",many:"قبل {0} دقيقة",other:"قبل {0} دقيقة"}}},second:{displayName:"الثواني",relative:{0:"الآن"},relativeTime:{future:{zero:"خلال {0} ثانية",one:"خلال ثانية واحدة",two:"خلال ثانيتين",few:"خلال {0} ثوانٍ",many:"خلال {0} ثانية",other:"خلال {0} ثانية"},past:{zero:"قبل {0} ثانية",one:"قبل ثانية واحدة",two:"قبل ثانيتين",few:"قبل {0} ثوانِ",many:"قبل {0} ثانية",other:"قبل {0} ثانية"}}}}},{locale:"ar-AE",parentLocale:"ar",fields:{year:{displayName:"السنة",relative:{0:"هذه السنة",1:"السنة التالية","-1":"السنة الماضية"},relativeTime:{future:{zero:"خلال {0} سنة",one:"خلال سنة واحدة",two:"خلال سنتين",few:"خلال {0} سنوات",many:"خلال {0} سنة",other:"خلال {0} سنة"},past:{zero:"قبل {0} سنة",one:"قبل سنة واحدة",two:"قبل سنتين",few:"قبل {0} سنوات",many:"قبل {0} سنة",other:"قبل {0} سنة"}}},month:{displayName:"الشهر",relative:{0:"هذا الشهر",1:"الشهر القادم","-1":"الشهر الماضي"},relativeTime:{future:{zero:"خلال {0} شهر",one:"خلال شهر واحد",two:"خلال شهرين",few:"خلال {0} أشهر",many:"خلال {0} شهرًا",other:"خلال {0} شهر"},past:{zero:"قبل {0} شهر",one:"قبل شهر واحد",two:"قبل شهرين",few:"قبل {0} أشهر",many:"قبل {0} شهرًا",other:"قبل {0} شهر"}}},day:{displayName:"يوم",relative:{0:"اليوم",1:"غدًا",2:"بعد الغد","-2":"أول أمس","-1":"أمس"},relativeTime:{future:{zero:"خلال {0} يوم",one:"خلال يوم واحد",two:"خلال يومين",few:"خلال {0} أيام",many:"خلال {0} يومًا",other:"خلال {0} يوم"},past:{zero:"قبل {0} يوم",one:"قبل يوم واحد",two:"قبل يومين",few:"قبل {0} أيام",many:"قبل {0} يومًا",other:"قبل {0} يوم"}}},hour:{displayName:"الساعات",relative:{0:"الساعة الحالية"},relativeTime:{future:{zero:"خلال {0} ساعة",one:"خلال ساعة واحدة",two:"خلال ساعتين",few:"خلال {0} ساعات",many:"خلال {0} ساعة",other:"خلال {0} ساعة"},past:{zero:"قبل {0} ساعة",one:"قبل ساعة واحدة",two:"قبل ساعتين",few:"قبل {0} ساعات",many:"قبل {0} ساعة",other:"قبل {0} ساعة"}}},minute:{displayName:"الدقائق",relative:{0:"هذه الدقيقة"},relativeTime:{future:{zero:"خلال {0} دقيقة",one:"خلال دقيقة واحدة",two:"خلال دقيقتين",few:"خلال {0} دقائق",many:"خلال {0} دقيقة",other:"خلال {0} دقيقة"},past:{zero:"قبل {0} دقيقة",one:"قبل دقيقة واحدة",two:"قبل دقيقتين",few:"قبل {0} دقائق",many:"قبل {0} دقيقة",other:"قبل {0} دقيقة"}}},second:{displayName:"الثواني",relative:{0:"الآن"},relativeTime:{future:{zero:"خلال {0} ثانية",one:"خلال ثانية واحدة",two:"خلال ثانيتين",few:"خلال {0} ثوانٍ",many:"خلال {0} ثانية",other:"خلال {0} ثانية"},past:{zero:"قبل {0} ثانية",one:"قبل ثانية واحدة",two:"قبل ثانيتين",few:"قبل {0} ثوانِ",many:"قبل {0} ثانية",other:"قبل {0} ثانية"}}}}},{locale:"ar-BH",parentLocale:"ar"},{locale:"ar-DJ",parentLocale:"ar"},{locale:"ar-DZ",parentLocale:"ar"},{locale:"ar-EG",parentLocale:"ar"},{locale:"ar-EH",parentLocale:"ar"},{locale:"ar-ER",parentLocale:"ar"},{locale:"ar-IL",parentLocale:"ar"},{locale:"ar-IQ",parentLocale:"ar"},{locale:"ar-JO",parentLocale:"ar"},{locale:"ar-KM",parentLocale:"ar"},{locale:"ar-KW",parentLocale:"ar"},{locale:"ar-LB",parentLocale:"ar"},{locale:"ar-LY",parentLocale:"ar"},{locale:"ar-MA",parentLocale:"ar"},{locale:"ar-MR",parentLocale:"ar"},{locale:"ar-OM",parentLocale:"ar"},{locale:"ar-PS",parentLocale:"ar"},{locale:"ar-QA",parentLocale:"ar"},{locale:"ar-SA",parentLocale:"ar"},{locale:"ar-SD",parentLocale:"ar"},{locale:"ar-SO",parentLocale:"ar"},{locale:"ar-SS",parentLocale:"ar"},{locale:"ar-SY",parentLocale:"ar"},{locale:"ar-TD",parentLocale:"ar"},{locale:"ar-TN",parentLocale:"ar"},{locale:"ar-YE",parentLocale:"ar"}]});


/***/ }),

/***/ "./node_modules/react-intl/locale-data/de.js":
/*!***************************************************!*\
  !*** ./node_modules/react-intl/locale-data/de.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){"use strict";return[{locale:"de",pluralRuleFunction:function(e,t){var n=!String(e).split(".")[1];return t?"other":1==e&&n?"one":"other"},fields:{year:{displayName:"Jahr",relative:{0:"dieses Jahr",1:"nächstes Jahr","-1":"letztes Jahr"},relativeTime:{future:{one:"in {0} Jahr",other:"in {0} Jahren"},past:{one:"vor {0} Jahr",other:"vor {0} Jahren"}}},month:{displayName:"Monat",relative:{0:"diesen Monat",1:"nächsten Monat","-1":"letzten Monat"},relativeTime:{future:{one:"in {0} Monat",other:"in {0} Monaten"},past:{one:"vor {0} Monat",other:"vor {0} Monaten"}}},day:{displayName:"Tag",relative:{0:"heute",1:"morgen",2:"übermorgen","-2":"vorgestern","-1":"gestern"},relativeTime:{future:{one:"in {0} Tag",other:"in {0} Tagen"},past:{one:"vor {0} Tag",other:"vor {0} Tagen"}}},hour:{displayName:"Stunde",relative:{0:"in dieser Stunde"},relativeTime:{future:{one:"in {0} Stunde",other:"in {0} Stunden"},past:{one:"vor {0} Stunde",other:"vor {0} Stunden"}}},minute:{displayName:"Minute",relative:{0:"in dieser Minute"},relativeTime:{future:{one:"in {0} Minute",other:"in {0} Minuten"},past:{one:"vor {0} Minute",other:"vor {0} Minuten"}}},second:{displayName:"Sekunde",relative:{0:"jetzt"},relativeTime:{future:{one:"in {0} Sekunde",other:"in {0} Sekunden"},past:{one:"vor {0} Sekunde",other:"vor {0} Sekunden"}}}}},{locale:"de-AT",parentLocale:"de"},{locale:"de-BE",parentLocale:"de"},{locale:"de-CH",parentLocale:"de"},{locale:"de-IT",parentLocale:"de"},{locale:"de-LI",parentLocale:"de"},{locale:"de-LU",parentLocale:"de"}]});


/***/ }),

/***/ "./node_modules/react-intl/locale-data/en.js":
/*!***************************************************!*\
  !*** ./node_modules/react-intl/locale-data/en.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,a){ true?module.exports=a():undefined}(this,function(){"use strict";return[{locale:"en",pluralRuleFunction:function(e,a){var n=String(e).split("."),l=!n[1],o=Number(n[0])==e,t=o&&n[0].slice(-1),r=o&&n[0].slice(-2);return a?1==t&&11!=r?"one":2==t&&12!=r?"two":3==t&&13!=r?"few":"other":1==e&&l?"one":"other"},fields:{year:{displayName:"year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"in {0} year",other:"in {0} years"},past:{one:"{0} year ago",other:"{0} years ago"}}},month:{displayName:"month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"in {0} month",other:"in {0} months"},past:{one:"{0} month ago",other:"{0} months ago"}}},day:{displayName:"day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"in {0} day",other:"in {0} days"},past:{one:"{0} day ago",other:"{0} days ago"}}},hour:{displayName:"hour",relative:{0:"this hour"},relativeTime:{future:{one:"in {0} hour",other:"in {0} hours"},past:{one:"{0} hour ago",other:"{0} hours ago"}}},minute:{displayName:"minute",relative:{0:"this minute"},relativeTime:{future:{one:"in {0} minute",other:"in {0} minutes"},past:{one:"{0} minute ago",other:"{0} minutes ago"}}},second:{displayName:"second",relative:{0:"now"},relativeTime:{future:{one:"in {0} second",other:"in {0} seconds"},past:{one:"{0} second ago",other:"{0} seconds ago"}}}}},{locale:"en-001",parentLocale:"en"},{locale:"en-150",parentLocale:"en-001"},{locale:"en-AG",parentLocale:"en-001"},{locale:"en-AI",parentLocale:"en-001"},{locale:"en-AS",parentLocale:"en"},{locale:"en-AT",parentLocale:"en-150"},{locale:"en-AU",parentLocale:"en-001"},{locale:"en-BB",parentLocale:"en-001"},{locale:"en-BE",parentLocale:"en-001"},{locale:"en-BI",parentLocale:"en"},{locale:"en-BM",parentLocale:"en-001"},{locale:"en-BS",parentLocale:"en-001"},{locale:"en-BW",parentLocale:"en-001"},{locale:"en-BZ",parentLocale:"en-001"},{locale:"en-CA",parentLocale:"en-001"},{locale:"en-CC",parentLocale:"en-001"},{locale:"en-CH",parentLocale:"en-150"},{locale:"en-CK",parentLocale:"en-001"},{locale:"en-CM",parentLocale:"en-001"},{locale:"en-CX",parentLocale:"en-001"},{locale:"en-CY",parentLocale:"en-001"},{locale:"en-DE",parentLocale:"en-150"},{locale:"en-DG",parentLocale:"en-001"},{locale:"en-DK",parentLocale:"en-150"},{locale:"en-DM",parentLocale:"en-001"},{locale:"en-Dsrt",pluralRuleFunction:function(e,a){return"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-ER",parentLocale:"en-001"},{locale:"en-FI",parentLocale:"en-150"},{locale:"en-FJ",parentLocale:"en-001"},{locale:"en-FK",parentLocale:"en-001"},{locale:"en-FM",parentLocale:"en-001"},{locale:"en-GB",parentLocale:"en-001"},{locale:"en-GD",parentLocale:"en-001"},{locale:"en-GG",parentLocale:"en-001"},{locale:"en-GH",parentLocale:"en-001"},{locale:"en-GI",parentLocale:"en-001"},{locale:"en-GM",parentLocale:"en-001"},{locale:"en-GU",parentLocale:"en"},{locale:"en-GY",parentLocale:"en-001"},{locale:"en-HK",parentLocale:"en-001"},{locale:"en-IE",parentLocale:"en-001"},{locale:"en-IL",parentLocale:"en-001"},{locale:"en-IM",parentLocale:"en-001"},{locale:"en-IN",parentLocale:"en-001"},{locale:"en-IO",parentLocale:"en-001"},{locale:"en-JE",parentLocale:"en-001"},{locale:"en-JM",parentLocale:"en-001"},{locale:"en-KE",parentLocale:"en-001"},{locale:"en-KI",parentLocale:"en-001"},{locale:"en-KN",parentLocale:"en-001"},{locale:"en-KY",parentLocale:"en-001"},{locale:"en-LC",parentLocale:"en-001"},{locale:"en-LR",parentLocale:"en-001"},{locale:"en-LS",parentLocale:"en-001"},{locale:"en-MG",parentLocale:"en-001"},{locale:"en-MH",parentLocale:"en"},{locale:"en-MO",parentLocale:"en-001"},{locale:"en-MP",parentLocale:"en"},{locale:"en-MS",parentLocale:"en-001"},{locale:"en-MT",parentLocale:"en-001"},{locale:"en-MU",parentLocale:"en-001"},{locale:"en-MW",parentLocale:"en-001"},{locale:"en-MY",parentLocale:"en-001"},{locale:"en-NA",parentLocale:"en-001"},{locale:"en-NF",parentLocale:"en-001"},{locale:"en-NG",parentLocale:"en-001"},{locale:"en-NL",parentLocale:"en-150"},{locale:"en-NR",parentLocale:"en-001"},{locale:"en-NU",parentLocale:"en-001"},{locale:"en-NZ",parentLocale:"en-001"},{locale:"en-PG",parentLocale:"en-001"},{locale:"en-PH",parentLocale:"en-001"},{locale:"en-PK",parentLocale:"en-001"},{locale:"en-PN",parentLocale:"en-001"},{locale:"en-PR",parentLocale:"en"},{locale:"en-PW",parentLocale:"en-001"},{locale:"en-RW",parentLocale:"en-001"},{locale:"en-SB",parentLocale:"en-001"},{locale:"en-SC",parentLocale:"en-001"},{locale:"en-SD",parentLocale:"en-001"},{locale:"en-SE",parentLocale:"en-150"},{locale:"en-SG",parentLocale:"en-001"},{locale:"en-SH",parentLocale:"en-001"},{locale:"en-SI",parentLocale:"en-150"},{locale:"en-SL",parentLocale:"en-001"},{locale:"en-SS",parentLocale:"en-001"},{locale:"en-SX",parentLocale:"en-001"},{locale:"en-SZ",parentLocale:"en-001"},{locale:"en-Shaw",pluralRuleFunction:function(e,a){return"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relative:{0:"this hour"},relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relative:{0:"this minute"},relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-TC",parentLocale:"en-001"},{locale:"en-TK",parentLocale:"en-001"},{locale:"en-TO",parentLocale:"en-001"},{locale:"en-TT",parentLocale:"en-001"},{locale:"en-TV",parentLocale:"en-001"},{locale:"en-TZ",parentLocale:"en-001"},{locale:"en-UG",parentLocale:"en-001"},{locale:"en-UM",parentLocale:"en"},{locale:"en-US",parentLocale:"en"},{locale:"en-VC",parentLocale:"en-001"},{locale:"en-VG",parentLocale:"en-001"},{locale:"en-VI",parentLocale:"en"},{locale:"en-VU",parentLocale:"en-001"},{locale:"en-WS",parentLocale:"en-001"},{locale:"en-ZA",parentLocale:"en-001"},{locale:"en-ZM",parentLocale:"en-001"},{locale:"en-ZW",parentLocale:"en-001"}]});


/***/ }),

/***/ "./node_modules/react-intl/locale-data/es.js":
/*!***************************************************!*\
  !*** ./node_modules/react-intl/locale-data/es.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,a){ true?module.exports=a():undefined}(this,function(){"use strict";return[{locale:"es",pluralRuleFunction:function(e,a){return a?"other":1==e?"one":"other"},fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"anteayer","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-419",parentLocale:"es"},{locale:"es-AR",parentLocale:"es-419"},{locale:"es-BO",parentLocale:"es-419"},{locale:"es-BR",parentLocale:"es-419"},{locale:"es-BZ",parentLocale:"es-419"},{locale:"es-CL",parentLocale:"es-419"},{locale:"es-CO",parentLocale:"es-419"},{locale:"es-CR",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-CU",parentLocale:"es-419"},{locale:"es-DO",parentLocale:"es-419",fields:{year:{displayName:"Año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"Mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"Día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"anteayer","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"Minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"Segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-EA",parentLocale:"es"},{locale:"es-EC",parentLocale:"es-419"},{locale:"es-GQ",parentLocale:"es"},{locale:"es-GT",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-HN",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-IC",parentLocale:"es"},{locale:"es-MX",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el año próximo","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el mes próximo","-1":"el mes pasado"},relativeTime:{future:{one:"en {0} mes",other:"en {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-NI",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-PA",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-PE",parentLocale:"es-419"},{locale:"es-PH",parentLocale:"es"},{locale:"es-PR",parentLocale:"es-419"},{locale:"es-PY",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antes de ayer","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-SV",parentLocale:"es-419",fields:{year:{displayName:"año",relative:{0:"este año",1:"el próximo año","-1":"el año pasado"},relativeTime:{future:{one:"dentro de {0} año",other:"dentro de {0} años"},past:{one:"hace {0} año",other:"hace {0} años"}}},month:{displayName:"mes",relative:{0:"este mes",1:"el próximo mes","-1":"el mes pasado"},relativeTime:{future:{one:"dentro de {0} mes",other:"dentro de {0} meses"},past:{one:"hace {0} mes",other:"hace {0} meses"}}},day:{displayName:"día",relative:{0:"hoy",1:"mañana",2:"pasado mañana","-2":"antier","-1":"ayer"},relativeTime:{future:{one:"dentro de {0} día",other:"dentro de {0} días"},past:{one:"hace {0} día",other:"hace {0} días"}}},hour:{displayName:"hora",relative:{0:"esta hora"},relativeTime:{future:{one:"dentro de {0} hora",other:"dentro de {0} horas"},past:{one:"hace {0} hora",other:"hace {0} horas"}}},minute:{displayName:"minuto",relative:{0:"este minuto"},relativeTime:{future:{one:"dentro de {0} minuto",other:"dentro de {0} minutos"},past:{one:"hace {0} minuto",other:"hace {0} minutos"}}},second:{displayName:"segundo",relative:{0:"ahora"},relativeTime:{future:{one:"dentro de {0} segundo",other:"dentro de {0} segundos"},past:{one:"hace {0} segundo",other:"hace {0} segundos"}}}}},{locale:"es-US",parentLocale:"es-419"},{locale:"es-UY",parentLocale:"es-419"},{locale:"es-VE",parentLocale:"es-419"}]});


/***/ }),

/***/ "./node_modules/react-intl/locale-data/he.js":
/*!***************************************************!*\
  !*** ./node_modules/react-intl/locale-data/he.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){"use strict";return[{locale:"he",pluralRuleFunction:function(e,t){var a=String(e).split("."),o=a[0],n=!a[1],r=Number(a[0])==e,i=r&&a[0].slice(-1);return t?"other":1==e&&n?"one":2==o&&n?"two":n&&(e<0||e>10)&&r&&0==i?"many":"other"},fields:{year:{displayName:"שנה",relative:{0:"השנה",1:"השנה הבאה","-1":"השנה שעברה"},relativeTime:{future:{one:"בעוד שנה",two:"בעוד שנתיים",many:"בעוד {0} שנה",other:"בעוד {0} שנים"},past:{one:"לפני שנה",two:"לפני שנתיים",many:"לפני {0} שנה",other:"לפני {0} שנים"}}},month:{displayName:"חודש",relative:{0:"החודש",1:"החודש הבא","-1":"החודש שעבר"},relativeTime:{future:{one:"בעוד חודש",two:"בעוד חודשיים",many:"בעוד {0} חודשים",other:"בעוד {0} חודשים"},past:{one:"לפני חודש",two:"לפני חודשיים",many:"לפני {0} חודשים",other:"לפני {0} חודשים"}}},day:{displayName:"יום",relative:{0:"היום",1:"מחר",2:"מחרתיים","-2":"שלשום","-1":"אתמול"},relativeTime:{future:{one:"בעוד יום {0}",two:"בעוד יומיים",many:"בעוד {0} ימים",other:"בעוד {0} ימים"},past:{one:"לפני יום {0}",two:"לפני יומיים",many:"לפני {0} ימים",other:"לפני {0} ימים"}}},hour:{displayName:"שעה",relative:{0:"בשעה זו"},relativeTime:{future:{one:"בעוד שעה",two:"בעוד שעתיים",many:"בעוד {0} שעות",other:"בעוד {0} שעות"},past:{one:"לפני שעה",two:"לפני שעתיים",many:"לפני {0} שעות",other:"לפני {0} שעות"}}},minute:{displayName:"דקה",relative:{0:"בדקה זו"},relativeTime:{future:{one:"בעוד דקה",two:"בעוד שתי דקות",many:"בעוד {0} דקות",other:"בעוד {0} דקות"},past:{one:"לפני דקה",two:"לפני שתי דקות",many:"לפני {0} דקות",other:"לפני {0} דקות"}}},second:{displayName:"שנייה",relative:{0:"עכשיו"},relativeTime:{future:{one:"בעוד שנייה",two:"בעוד שתי שניות",many:"בעוד {0} שניות",other:"בעוד {0} שניות"},past:{one:"לפני שנייה",two:"לפני שתי שניות",many:"לפני {0} שניות",other:"לפני {0} שניות"}}}}}]});


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _en = __webpack_require__(/*! react-intl/locale-data/en */ "./node_modules/react-intl/locale-data/en.js");

var _en2 = _interopRequireDefault(_en);

var _ar = __webpack_require__(/*! react-intl/locale-data/ar */ "./node_modules/react-intl/locale-data/ar.js");

var _ar2 = _interopRequireDefault(_ar);

var _de = __webpack_require__(/*! react-intl/locale-data/de */ "./node_modules/react-intl/locale-data/de.js");

var _de2 = _interopRequireDefault(_de);

var _es = __webpack_require__(/*! react-intl/locale-data/es */ "./node_modules/react-intl/locale-data/es.js");

var _es2 = _interopRequireDefault(_es);

var _he = __webpack_require__(/*! react-intl/locale-data/he */ "./node_modules/react-intl/locale-data/he.js");

var _he2 = _interopRequireDefault(_he);

var _supportedLocales = __webpack_require__(/*! ./supported-locales.js */ "./src/supported-locales.js");

var _supportedLocales2 = _interopRequireDefault(_supportedLocales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localeData = _supportedLocales2.default;
localeData.en.localeData = _en2.default;
localeData.ar.localeData = _ar2.default;
localeData.de.localeData = _de2.default;
localeData.es.localeData = _es2.default;
localeData.he.localeData = _he2.default;

exports.default = localeData;

/***/ }),

/***/ "./src/supported-locales.js":
/*!**********************************!*\
  !*** ./src/supported-locales.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Currently supported locales for the Scratch Project
 * @type {Object} Key Value pairs of locale code: Language name written in the language
 */

var locales = {
    en: { name: 'English' },
    ar: { name: 'الْعَرَبِيَّة' },
    de: { name: 'Deutsch' },
    es: { name: 'Español' },
    he: { name: 'עִבְרִית' }
};

var wwwLocales = {
    'ab': { name: 'Аҧсшәа' },
    'ar': { name: 'العربية' },
    'an': { name: 'Aragonés' },
    'ast': { name: 'Asturianu' },
    'id': { name: 'Bahasa Indonesia' },
    'ms': { name: 'Bahasa Melayu' },
    'be': { name: 'Беларуская' },
    'bg': { name: 'Български' },
    'ca': { name: 'Català' },
    'cs': { name: 'Česky' },
    'cy': { name: 'Cymraeg' },
    'da': { name: 'Dansk' },
    'de': { name: 'Deutsch' },
    'yum': { name: 'Edible Scratch' },
    'et': { name: 'Eesti' },
    'el': { name: 'Ελληνικά' },
    'en': { name: 'English' },
    'eo': { name: 'Esperanto' },
    'es': { name: 'Español' },
    'eu': { name: 'Euskara' },
    'fa': { name: 'فارسی' },
    'fr': { name: 'Français' },
    'fur': { name: 'Furlan' },
    'ga': { name: 'Gaeilge' },
    'gd': { name: 'Gàidhlig' },
    'gl': { name: 'Galego' },
    'ko': { name: '한국어' },
    'hy': { name: 'Հայերեն' },
    'he': { name: 'עִבְרִית' },
    'hi': { name: 'हिन्दी' },
    'hr': { name: 'Hrvatski' },
    'zu': { name: 'isiZulu' },
    'is': { name: 'Íslenska' },
    'it': { name: 'Italiano' },
    'kn': { name: 'ಭಾಷೆ-ಹೆಸರು' },
    'rw': { name: 'Kinyarwanda' },
    'ht': { name: 'Kreyòl' },
    'ku': { name: 'Kurdî' },
    'la': { name: 'Latina' },
    'lv': { name: 'Latviešu' },
    'lt': { name: 'Lietuvių' },
    'mk': { name: 'Македонски' },
    'hu': { name: 'Magyar' },
    'ml': { name: 'മലയാളം' },
    'mt': { name: 'Malti' },
    'cat': { name: 'Meow' },
    'mr': { name: 'मराठी' },
    'mn': { name: 'Монгол хэл' },
    'my': { name: 'မြန်မာဘာသာ' },
    'nl': { name: 'Nederlands' },
    'ja': { name: '日本語' },
    'nb': { name: 'Norsk Bokmål' },
    'nn': { name: 'Norsk Nynorsk' },
    'uz': { name: 'Oʻzbekcha' },
    'th': { name: 'ไทย' },
    'pl': { name: 'Polski' },
    'pt': { name: 'Português' },
    'pt-br': { name: 'Português Brasileiro' },
    'ro': { name: 'Română' },
    'ru': { name: 'Русский' },
    'sc': { name: 'Sardu' },
    'sq': { name: 'Shqip' },
    'sk': { name: 'Slovenčina' },
    'sl': { name: 'Slovenščina' },
    'sr': { name: 'Српски' },
    'fi': { name: 'Suomi' },
    'sv': { name: 'Svenska' },
    'te': { name: 'తెలుగు' },
    'vi': { name: 'Tiếng Việt' },
    'tr': { name: 'Türkçe' },
    'uk': { name: 'Українська' },
    'zh-cn': { name: '简体中文' },
    'zh-tw': { name: '繁體中文' }
};

exports.default = locales;
exports.wwwLocales = wwwLocales;

/***/ })

/******/ });
//# sourceMappingURL=l10n.js.map