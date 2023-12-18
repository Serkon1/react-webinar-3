import {memo} from 'react';
import './style.css';
import PropTypes from "prop-types";
function ProfileCard({name, phone, email, t}) {
  return (
      <div className={'Profile'}>
        <div className="Profile-title">
          {t("profile.title")}
        </div>
        <div className="Profile-name Profile-param">
          {t("profile.name")}: <span className={'Profile-value'}>{name}</span>
        </div>
        <div className="Profile-phone Profile-param">
          {t("profile.phone")}: <span className={'Profile-value'}>{phone}</span>
        </div>
        <div className="Profile-email Profile-param">
          {t("profile.email")}:  <span className={'Profile-value'}>{email}</span>
        </div>
      </div>
  );
}
ProfileCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func,
}
ProfileCard.defaultProps = {
  t: (string) => string,
}
export default memo(ProfileCard);
