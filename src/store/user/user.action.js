import { createAction } from '../../utils/helper.util';
import { UserActionTypes } from './user.reducer';

export const setCurrentUser = (newUser) => createAction(UserActionTypes.SET_CURRENT_USER, newUser );