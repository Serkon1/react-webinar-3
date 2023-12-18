import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../containers/login-form";
import Header from "../../containers/header";

/**
 * Сраница авторизации
 */
function Login() {

  const {t} = useTranslate();


  return (
    <PageLayout head={<Header/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm/>
    </PageLayout>
  );
}

export default memo(Login);