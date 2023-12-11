import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from "../head";
import Basket from "../../app/basket";

  function PageLayout({head, children, footer, activeModal}) {

    const cn = bem('PageLayout');

    return (
      <>
        <div className={cn()}>
          <div className={cn('head')}>
            <Head title={head}/>
          </div>
          <div className={cn('center')}>
            {children}
          </div>
          <div className={cn('footer')}>
            {footer}
          </div>
        </div>
        {activeModal === 'basket' && <Basket />}
      </>
    );
  }
  PageLayout.propTypes = {
    head: PropTypes.string,
    children: PropTypes.node
  }
  export default memo(PageLayout);