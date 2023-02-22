import { createAction } from '../../utils/helper.util';
import { CategoriesActionType } from './categories.types';

export const setCategories = (categories) => createAction(CategoriesActionType.SET_CATEGORIES, categories);