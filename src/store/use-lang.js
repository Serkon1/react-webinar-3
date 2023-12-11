import useStore from "./use-store";
import {useMemo} from "react";
import useSelector from "./use-selector";


/**
 * Хук для получения перевода элемента и получение текущего языка
 * @param element {string}
 * @return {*}
 */
export default function useLang (element= '') {

  const store = useStore();
  const lang = store.actions.language.getTransfer()
  const language = useSelector(state => state.language.value)

  if(element === '') return {transfer: lang, lang: language}
  return {transfer: lang[element], lang: language}
}