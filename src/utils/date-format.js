/**
 * Преобразование строки даты с сервера в необходимую.
 * @param dateTimeString {String} Дата в форме строки с сервера.
 * @param locale {String} Текущий язык (пока не используется).
 * @returns {String} Дата строкойю
 */
/*
  Заметил что в браузере, при подгрузке 1700 комментариев, сильно нагружает создание дат,
  понимаю что это из-за реализации и лучше подгружать их постепенно, но все равно интересный момент
*/

export default function dateFormat (dateTimeString, lang = 'ru') {
  const dateTime = new Date(dateTimeString);

  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: undefined };
  const formattedDateTime = dateTime.toLocaleDateString(lang, options);

  return `${formattedDateTime}`
}