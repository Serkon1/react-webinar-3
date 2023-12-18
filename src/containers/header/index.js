import {memo, useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import HeaderAuthorization from "../../components/header-authorization";
import {useSessionCheck} from "../../hooks/use-session-check";

/**
 * Хеадер
 */
function Header() {

  const store = useStore();

  const authorization = useSessionCheck();
  const userName = useSelector(state => state.session.userData.name)
  const exitProfile = useCallback(async () => {
    await store.actions.session.logout()
    store.actions.profile.cleanProfile()
  }, [])

  const {t} = useTranslate();

  return (
    <HeaderAuthorization
      authorization={authorization}
      profileLink={'/profile'}
      name={userName}
      exitProfile={exitProfile}
      loginLink={'/login'}
      t={t}
    />
  );
}

export default memo(Header);
