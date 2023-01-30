!(function (e) {
	'function' == typeof define && define.amd ? define(['jquery', 'moment'], e) : 'object' == typeof exports ? (module.exports = e(require('jquery'), require('moment'))) : e(jQuery, moment)
})(function (e, r) {
	!(function () {
		function e(e) {
			return e % 100 == 11 || e % 10 != 1
		}
		function a(r, a, u, n) {
			var t = r + ' '
			switch (u) {
				case 's':
					return a || n ? 'nokkrar sekúndur' : 'nokkrum sekúndum'
				case 'm':
					return a ? 'mínúta' : 'mínútu'
				case 'mm':
					return e(r) ? t + (a || n ? 'mínútur' : 'mínútum') : a ? t + 'mínúta' : t + 'mínútu'
				case 'hh':
					return e(r) ? t + (a || n ? 'klukkustundir' : 'klukkustundum') : t + 'klukkustund'
				case 'd':
					return a ? 'dagur' : n ? 'dag' : 'degi'
				case 'dd':
					return e(r) ? (a ? t + 'dagar' : t + (n ? 'daga' : 'dögum')) : a ? t + 'dagur' : t + (n ? 'dag' : 'degi')
				case 'M':
					return a ? 'mánuður' : n ? 'mánuð' : 'mánuði'
				case 'MM':
					return e(r) ? (a ? t + 'mánuðir' : t + (n ? 'mánuði' : 'mánuðum')) : a ? t + 'mánuður' : t + (n ? 'mánuð' : 'mánuði')
				case 'y':
					return a || n ? 'ár' : 'ári'
				case 'yy':
					return e(r) ? t + (a || n ? 'ár' : 'árum') : t + (a || n ? 'ár' : 'ári')
			}
		}
		r.defineLocale('is', {months: 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'), monthsShort: 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'), weekdays: 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'), weekdaysShort: 'sun_mán_þri_mið_fim_fös_lau'.split('_'), weekdaysMin: 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'), longDateFormat: {LT: 'H:mm', LTS: 'H:mm:ss', L: 'DD.MM.YYYY', LL: 'D. MMMM YYYY', LLL: 'D. MMMM YYYY [kl.] H:mm', LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm'}, calendar: {sameDay: '[í dag kl.] LT', nextDay: '[á morgun kl.] LT', nextWeek: 'dddd [kl.] LT', lastDay: '[í gær kl.] LT', lastWeek: '[síðasta] dddd [kl.] LT', sameElse: 'L'}, relativeTime: {future: 'eftir %s', past: 'fyrir %s síðan', s: a, m: a, mm: a, h: 'klukkustund', hh: a, d: a, dd: a, M: a, MM: a, y: a, yy: a}, dayOfMonthOrdinalParse: /\d{1,2}\./, ordinal: '%d.', week: {dow: 1, doy: 4}})
	})(),
		e.fullCalendar.datepickerLocale('is', 'is', {closeText: 'Loka', prevText: '&#x3C; Fyrri', nextText: 'Næsti &#x3E;', currentText: 'Í dag', monthNames: ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'], monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maí', 'Jún', 'Júl', 'Ágú', 'Sep', 'Okt', 'Nóv', 'Des'], dayNames: ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur'], dayNamesShort: ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau'], dayNamesMin: ['Su', 'Má', 'Þr', 'Mi', 'Fi', 'Fö', 'La'], weekHeader: 'Vika', dateFormat: 'dd.mm.yy', firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: ''}),
		e.fullCalendar.locale('is', {buttonText: {month: 'Mánuður', week: 'Vika', day: 'Dagur', list: 'Dagskrá'}, allDayHtml: 'Allan<br/>daginn', eventLimitText: 'meira', noEventsMessage: 'Engir viðburðir til að sýna'})
})
