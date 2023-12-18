import {memo} from "react";
import './style.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Хеадер
 */
function HeaderAuthorization(props) {

  return (
    <div className={'Header-authorization'}>
      {
        props.authorization
          ? <>
            <Link to={props.profileLink} className={'Profile-name'}>
              {props.name}
            </Link>
            <a>
              <button onClick={e => props.exitProfile()}>{props.t('header.exit')}</button>
            </a>
          </>
          : <>
            <Link to={props.loginLink}>
              <button>{props.t('header.login')}</button>
            </Link>
          </>
      }

    </div>
  );
}

HeaderAuthorization.propTypes = {
  authorization: PropTypes.bool,
  profileLink: PropTypes.string,
  name: PropTypes.string,
  exitProfile: PropTypes.func,
  loginLink: PropTypes.string,
  t: PropTypes.func,
};

HeaderAuthorization.defaultProps = {
  exitProfile: () => {},
  t: (string) => string
}

export default memo(HeaderAuthorization);
