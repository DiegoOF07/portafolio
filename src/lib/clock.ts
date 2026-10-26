// Hora local de quien escribe el sitio, no de quien lo visita
export const formatClock = (date: Date, timeZone = 'America/Guatemala'): string =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(date)
