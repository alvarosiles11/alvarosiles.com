!(function (e) {
	'function' == typeof define && define.amd ? define(['jquery', 'moment'], e) : 'object' == typeof exports ? (module.exports = e(require('jquery'), require('moment'))) : e(jQuery, moment)
})(function (e, a) {
	!(function () {
		function e(e, a, t, r) {
			var n = e + ' '
			switch (t) {
				case 's':
					return a || r ? 'nekaj sekund' : 'nekaj sekundami'
				case 'm':
					return a ? 'ena minuta' : 'eno minuto'
				case 'mm':
					return (n += 1 === e ? (a ? 'minuta' : 'minuto') : 2 === e ? (a || r ? 'minuti' : 'minutama') : e < 5 ? (a || r ? 'minute' : 'minutami') : a || r ? 'minut' : 'minutami')
				case 'h':
					return a ? 'ena ura' : 'eno uro'
				case 'hh':
					return (n += 1 === e ? (a ? 'ura' : 'uro') : 2 === e ? (a || r ? 'uri' : 'urama') : e < 5 ? (a || r ? 'ure' : 'urami') : a || r ? 'ur' : 'urami')
				case 'd':
					return a || r ? 'en dan' : 'enim dnem'
				case 'dd':
					return (n += 1 === e ? (a || r ? 'dan' : 'dnem') : 2 === e ? (a || r ? 'dni' : 'dnevoma') : a || r ? 'dni' : 'dnevi')
				case 'M':
					return a || r ? 'en mesec' : 'enim mesecem'
				case 'MM':
					return (n += 1 === e ? (a || r ? 'mesec' : 'mesecem') : 2 === e ? (a || r ? 'meseca' : 'mesecema') : e < 5 ? (a || r ? 'mesece' : 'meseci') : a || r ? 'mesecev' : 'meseci')
				case 'y':
					return a || r ? 'eno leto' : 'enim letom'
				case 'yy':
					return (n += 1 === e ? (a || r ? 'leto' : 'letom') : 2 === e ? (a || r ? 'leti' : 'letoma') : e < 5 ? (a || r ? 'leta' : 'leti') : a || r ? 'let' : 'leti')
			}
		}
		a.defineLocale('sl', {
			months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
			monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
			monthsParseExact: !0,
			weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
			weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
			weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
			weekdaysParseExact: !0,
			longDateFormat: {LT: 'H:mm', LTS: 'H:mm:ss', L: 'DD.MM.YYYY', LL: 'D. MMMM YYYY', LLL: 'D. MMMM YYYY H:mm', LLLL: 'dddd, D. MMMM YYYY H:mm'},
			calendar: {
				sameDay: '[danes ob] LT',
				nextDay: '[jutri ob] LT',
				nextWeek: function () {
					switch (this.day()) {
						case 0:
							return '[v] [nedeljo] [ob] LT'
						case 3:
							return '[v] [sredo] [ob] LT'
						case 6:
							return '[v] [soboto] [ob] LT'
						case 1:
						case 2:
						case 4:
						case 5:
							return '[v] dddd [ob] LT'
					}
				},
				lastDay: '[včeraj ob] LT',
				lastWeek: function () {
					switch (this.day()) {
						case 0:
							return '[prejšnjo] [nedeljo] [ob] LT'
						case 3:
							return '[prejšnjo] [sredo] [ob] LT'
						case 6:
							return '[prejšnjo] [soboto] [ob] LT'
						case 1:
						case 2:
						case 4:
						case 5:
							return '[prejšnji] dddd [ob] LT'
					}
				},
				sameElse: 'L',
			},
			relativeTime: {future: 'čez %s', past: 'pred %s', s: e, m: e, mm: e, h: e, hh: e, d: e, dd: e, M: e, MM: e, y: e, yy: e},
			dayOfMonthOrdinalParse: /\d{1,2}\./,
			ordinal: '%d.',
			week: {dow: 1, doy: 7},
		})
	})(),
		e.fullCalendar.datepickerLocale('sl', 'sl', {closeText: 'Zapri', prevText: '&#x3C;Prejšnji', nextText: 'Naslednji&#x3E;', currentText: 'Trenutni', monthNames: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'], monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'], dayNames: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota'], dayNamesShort: ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'], dayNamesMin: ['Ne', 'Po', 'To', 'Sr', 'Če', 'Pe', 'So'], weekHeader: 'Teden', dateFormat: 'dd.mm.yy', firstDay: 1, isRTL: !1, showMonthAfterYear: !1, yearSuffix: ''}),
		e.fullCalendar.locale('sl', {buttonText: {month: 'Mesec', week: 'Teden', day: 'Dan', list: 'Dnevni red'}, allDayText: 'Ves dan', eventLimitText: 'več', noEventsMessage: 'Ni dogodkov za prikaz'})
})
