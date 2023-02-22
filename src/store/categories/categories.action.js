import { createAction } from '../../utils/helper.util';
import { CategoriesActionType } from './categories.reducer';

export const setCategories = (categories) => createAction(CategoriesActionType.SET_CATEGORIES, categories);