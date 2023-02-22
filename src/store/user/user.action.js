import { UserActionTypes } from './user.types';
import { createAction } from '../../utils/helper.util';

export const setCurrentUser = (newUser) => createAction(UserActionTypes.SET_CURRENT_USER, newUser );