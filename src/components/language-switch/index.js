import React, {memo} from 'react';
import './style.css';
import PropTypes from "prop-types";

function LangSwitch({language, switchLang}) {

  return (
    <div className={'Lang'}>
      <button
        className={"Lang-button " + (language === 'ru' ? 'select' : '')}
        onClick={e => switchLang('ru')}
      >
        Ru
      </button>
      <button
        className={"Lang-button " + (language === 'en' ? 'select' : '')}
        onClick={e => switchLang('en')}
      >
        En
      </button>
    </div>
  );
}

LangSwitch.propTypes = {
  language: PropTypes.string,
  switchLang: PropTypes.func
};

LangSwitch.defaultProps = {
  language: 'ru',
  switchLang: () => {}
}


export default memo(LangSwitch);