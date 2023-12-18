import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileCard from "../../components/profile-card";
import Header from "../../containers/header";
import {memo, useEffect} from "react";
import {useSessionCheck} from "../../hooks/use-session-check";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";

/**
 * Сраница профиля
 */
function Profile() {
  const authorization = useSessionCheck()

  useInit(() => {
    store.actions.profile.loadProfile()
  }, [authorization]);

  const store = useStore()

  const select = useSelector(state => ({
    name: state.profile.name,
    phone: state.profile.phone,
    email: state.profile.email,
    waiting: state.profile.waiting,
  }))

  const {t} = useTranslate()

  return (
    <PageLayout  head={<Header/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        {authorization
          ? <ProfileCard name={select.name} phone={select.phone} email={select.email} t={t}/>
          : <></>
        }
      </Spinner>
    </PageLayout>
  );
}


export default memo(Profile);