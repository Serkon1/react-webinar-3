import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import useSelector from "./use-selector";
import useStore from "./use-store";

export const useSessionCheck = () => {
  const pathname = window.location.pathname;
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.session.isLoggedIn)

  let result = isLoggedIn;

  useEffect(() => {
    if (!result && pathname === '/profile') {
      navigate('/login')
    }
    if (result && pathname === '/login') {
      navigate('/profile')
    }
  }, [isLoggedIn]);

  return result;
};


