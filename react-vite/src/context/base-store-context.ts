import { createContext } from 'react';
import CommonBaseStore from '@/class/common-base-store';
import { getCookie } from '@/utils'

const userStatus = getCookie('userStatus');
const loginSubject = userStatus ? JSON.parse(userStatus) : {}
const { userId } = loginSubject;

const BaseStoreContext = createContext(new CommonBaseStore(userId));

export default BaseStoreContext;