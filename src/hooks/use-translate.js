import useServices from "./use-services";
import {useEffect, useMemo, useState} from "react";
import shallowequal from "shallowequal";

/**
 * @typedef {Object} useTranslate
 * @property {String} lang
 * @property {Function} setLang
 * @property {Function} t
 * */
/**
 * Получение функции перевода, текущего языка и функции смены текущего языка
 * @param newLang {String} Код языка
 * @returns {Object<useTranslate>} Обьект с функцией перевода, текущего языка и функцией смены текущего языка
 */
export default function useTranslate(newLang) {
  const services = useServices();
  //Создаю внутренее состояние
  const [currentLang, setCurrentLang] = useState(services.i18n.lang);

  //С помощью useEffect, реаилизую слушатель за изменением состояния внутри i18n
  useEffect(() => {
    //При каждом изменении значение внутреннего стейта меняется, а соответственно и внутри компонентов
    const listener = (newLang) => {
      setCurrentLang(newLang);
    };
    services.i18n.addListener(listener);
    //Возращаю функцию удаление слушателя, чтобы не было утечек памяти и т.д
    return () => {
      services.i18n.removeListener(listener);
    };
  }, [services.i18n]);

  return {
    lang: currentLang,
    setLang: (newLang) => {
      services.i18n.switchLang(newLang);
    },
    t: (text, number) => services.i18n.translate(text, number, currentLang)
  };
}