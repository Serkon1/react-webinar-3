import {memo, useCallback} from "react";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import {useSessionCheck} from "../../hooks/use-session-check";
import useInit from "../../hooks/use-init";
import Form from "../../components/form";
import Spinner from "../../components/spinner";

/**
 * Конейнер формы авторизации
 */
function LoginForm() {
  useInit(() => {
    callbacks.setError('')
  }, []);
  useSessionCheck()

  const store = useStore()
  const select = useSelector(state => ({
    error: state.session.error,
    name: state.session.userData.name,
    authorization: state.session.isLoggedIn,
    waiting: state.session.waiting
  }));
  const callbacks = {
    setError: useCallback(error => store.actions.session.setSession({error}), []),
    handleSubmit: useCallback(async (formData) => {
      await store.actions.session.login(formData.username, formData.password)
      await store.actions.profile.loadProfile()
    }, [])
}

  const {t} = useTranslate()
  return (
    <SideLayout side='start' padding={'medium'}>
      <Spinner active={select.waiting}>
        <Form t={t} handleSubmit={callbacks.handleSubmit} errorText={select.error}/>
      </Spinner>
    </SideLayout>
  );
}

export default memo(LoginForm);