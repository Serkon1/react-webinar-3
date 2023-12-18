import React, {useCallback, useState} from 'react';
import InputLogin from "../input-login";
import 'style.css';
import AuthorizationError from "../authorization-error";

const Form = ({handleSubmit, t, errorText}) => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const submit = (e) => {
    e.preventDefault()
    handleSubmit(formData)
  }
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  return (
    <form className={'Form'} onSubmit={event => submit(event)}>
      <InputLogin
        htmlFor={"username"}
        labelText={t("login.login")}
        type={"text"}
        value={formData.username}
        placeholder={''}
        theme={'form'}
        onChange={handleChange}
        name="username"
      />
      <InputLogin
        htmlFor={"username"}
        labelText={t("login.password")}
        type={"password"}
        value={formData.password}
        placeholder={''}
        theme={'form'}
        onChange={handleChange}
        name="password"
      />

      {errorText !== ''
        ? <AuthorizationError error={errorText}/>
        : <></>
      }
      <button type="submit" className={'Form-submit'}>{t('login.entry')}</button>
    </form>
  );
};

export default Form;