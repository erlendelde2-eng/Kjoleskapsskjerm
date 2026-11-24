/**
 * Kjøleskapsskjerm – kalender-kobling
 *
 * Dette lille skriptet kjører i din egen Google-konto og gir skjermen
 * de neste dagenes kalenderhendelser. Ingen andre tjenester ser kalenderen din.
 *
 * 1. Bytt KEY under til en lang, tilfeldig tekst (et slags passord).
 * 2. Legg inn ID-ene til kalenderne som skal vises i CALENDAR_IDS.
 *    'primary' = din egen hovedkalender. ID-en til en felles kalender finner du i
 *    Google Kalender på PC: Innstillinger → velg kalenderen → «Integrer kalender» → «Kalender-ID».
 */
const KEY = 'BYTT-MEG-til-noe-langt-og-tilfeldig';
const CALENDAR_IDS = [
  'primary',
  // 'xxxxxxxxxxxxxxxx@group.calendar.google.com',  // felles kalender
];

function doGet(e) {
  const params = (e && e.parameter) || {};
  if (params.key !== KEY) return json({ error: 'feil nøkkel' });

  const days = Math.min(Math.max(parseInt(params.days, 10) || 7, 1), 31);
  const tz = Session.getScriptTimeZone();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start.getTime() + days * 86400000);

  const events = [];
  CALENDAR_IDS.forEach(function (id) {
    const cal = id === 'primary' ? CalendarApp.getDefaultCalendar() : CalendarApp.getCalendarById(id);
    if (!cal) return;
    const color = cal.getColor();
    cal.getEvents(start, end).forEach(function (ev) {
      const allDay = ev.isAllDayEvent();
      events.push({
        title: ev.getTitle() || '(uten tittel)',
        allDay: allDay,
        start: allDay ? Utilities.formatDate(ev.getAllDayStartDate(), tz, 'yyyy-MM-dd') : ev.getStartTime().toISOString(),
        end: allDay ? Utilities.formatDate(ev.getAllDayEndDate(), tz, 'yyyy-MM-dd') : ev.getEndTime().toISOString(),
        color: color,
        calendar: cal.getName(),
      });
    });
  });

  events.sort(function (a, b) { return a.start < b.start ? -1 : 1; });
  return json({ events: events });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
