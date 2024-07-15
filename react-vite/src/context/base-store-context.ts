import { createContext } from 'react';
import CommonBaseStore from '@/class/common-base-store';
import { getCookie } from '@/utils'

const loginStatus = getCookie('loginStatus');
const loginSubject = loginStatus ? JSON.parse(loginStatus) : {}
const { userId } = loginSubject;

const BaseStoreContext = createContext(new CommonBaseStore(userId));

export default BaseStoreContext;