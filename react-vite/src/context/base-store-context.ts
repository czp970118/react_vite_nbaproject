import { createContext } from 'react';
import CommonBaseStore from '@/class/common-base-store';
import { getCookie } from '@/utils'

const loginStatus = getCookie('loginStatus');
const loginSubject = loginStatus ? JSON.parse(loginStatus) : {}
const { userName } = loginSubject;

const BaseStoreContext = createContext(new CommonBaseStore(userName));

export default BaseStoreContext;