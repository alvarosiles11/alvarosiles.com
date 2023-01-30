!(function (e, t) {
	'object' == typeof exports && 'object' == typeof module ? (module.exports = t(require('moment'), require('fullcalendar'))) : 'function' == typeof define && define.amd ? define(['moment', 'fullcalendar'], t) : 'object' == typeof exports ? t(require('moment'), require('fullcalendar')) : t(e.moment, e.FullCalendar)
})('undefined' != typeof self ? self : this, function (e, t) {
	return (function (e) {
		function t(r) {
			if (n[r]) return n[r].exports
			var d = (n[r] = {i: r, l: !1, exports: {}})
			return e[r].call(d.exports, d, d.exports, t), (d.l = !0), d.exports
		}
		var n = {}
		return (
			(t.m = e),
			(t.c = n),
			(t.d = function (e, n, r) {
				t.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: r})
			}),
			(t.n = function (e) {
				var n =
					e && e.__esModule
						? function () {
								return e.default
						  }
						: function () {
								return e
						  }
				return t.d(n, 'a', n), n
			}),
			(t.o = function (e, t) {
				return Object.prototype.hasOwnProperty.call(e, t)
			}),
			(t.p = ''),
			t((t.s = 93))
		)
	})({
		0: function (t, n) {
			t.exports = e
		},
		1: function (e, n) {
			e.exports = t
		},
		93: function (e, t, n) {
			Object.defineProperty(t, '__esModule', {value: !0}), n(94)
			var r = n(1)
			r.datepickerLocale('ca', 'ca', {closeText: 'Tanca', prevText: 'Anterior', nextText: 'Següent', currentText: 'Avui', monthNames: ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'], monthNamesShort: ['gen', 'feb', 'març', 'abr', 'maig', 'juny', 'jul', 'ag', 'set', 'oct', 'nov', 'des'], dayNames: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'], dayNamesShort: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'], dayNamesMin: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'], weekHeader: 'Set', dateFormat: 'dd/mm/yy', firstDay: 1, isRTL: !1, showMonthAfterYear: !1, yearSuffix: ''}), r.locale('ca', {buttonText: {month: 'Mes', week: 'Setmana', day: 'Dia', list: 'Agenda'}, allDayText: 'Tot el dia', eventLimitText: 'més', noEventsMessage: 'No hi ha esdeveniments per mostrar'})
		},
		94: function (e, t, n) {
			!(function (e, t) {
				t(n(0))
			})(0, function (e) {
				return e.defineLocale('ca', {
					months: {standalone: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'), format: "de gener_de febrer_de març_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split('_'), isFormat: /D[oD]?(\s)+MMMM/},
					monthsShort: 'gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
					monthsParseExact: !0,
					weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
					weekdaysShort: 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
					weekdaysMin: 'dg_dl_dt_dc_dj_dv_ds'.split('_'),
					weekdaysParseExact: !0,
					longDateFormat: {LT: 'H:mm', LTS: 'H:mm:ss', L: 'DD/MM/YYYY', LL: 'D MMMM [de] YYYY', ll: 'D MMM YYYY', LLL: 'D MMMM [de] YYYY [a les] H:mm', lll: 'D MMM YYYY, H:mm', LLLL: 'dddd D MMMM [de] YYYY [a les] H:mm', llll: 'ddd D MMM YYYY, H:mm'},
					calendar: {
						sameDay: function () {
							return '[avui a ' + (1 !== this.hours() ? 'les' : 'la') + '] LT'
						},
						nextDay: function () {
							return '[demà a ' + (1 !== this.hours() ? 'les' : 'la') + '] LT'
						},
						nextWeek: function () {
							return 'dddd [a ' + (1 !== this.hours() ? 'les' : 'la') + '] LT'
						},
						lastDay: function () {
							return '[ahir a ' + (1 !== this.hours() ? 'les' : 'la') + '] LT'
						},
						lastWeek: function () {
							return '[el] dddd [passat a ' + (1 !== this.hours() ? 'les' : 'la') + '] LT'
						},
						sameElse: 'L',
					},
					relativeTime: {future: "d'aquí %s", past: 'fa %s', s: 'uns segons', ss: '%d segons', m: 'un minut', mm: '%d minuts', h: 'una hora', hh: '%d hores', d: 'un dia', dd: '%d dies', M: 'un mes', MM: '%d mesos', y: 'un any', yy: '%d anys'},
					dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
					ordinal: function (e, t) {
						var n = 1 === e ? 'r' : 2 === e ? 'n' : 3 === e ? 'r' : 4 === e ? 't' : 'è'
						return ('w' !== t && 'W' !== t) || (n = 'a'), e + n
					},
					week: {dow: 1, doy: 4},
				})
			})
		},
	})
})
