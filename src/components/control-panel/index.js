import React, {memo} from 'react';
import './style.css';
import BasketTool from "../basket-tool";
import LangSwitch from "../language-switch";
import ToMain from "../to-main";

function ControlPanel(props) {

  return (
    <div className={'Control-panel'}>
      <ToMain
        currentPage={props.currentPage}
        cleaningProduct={props.cleaningProduct}
        toMain={props.transfer.main}
      />
      <LangSwitch
        language={props.language}
        switchLang={props.switchLang}
      />
      <BasketTool
        amount={props.amount}
        sum={props.sum}
        openModalBasket={props.openModalBasket}
        transfer={props.transfer.basketTool}
      />
    </div>
  );
}

export default memo(ControlPanel);