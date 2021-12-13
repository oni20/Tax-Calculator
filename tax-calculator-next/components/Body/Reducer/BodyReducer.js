import {
    SET_VALIDATION,
    SET_EMPLOYMENTINCOMEQUERY,
    SET_PROVINCE
} from '../../Constants';

export const initialState = {
    validated: false,
    isEmploymentIncomeQuery: null,
    incomeType: '',
    isDisableControl: true,
    provinceDDVal: ''
};

export const BodyReducer = (state, action) => {
    switch (action.type) {
        case SET_VALIDATION:
            return {
                ...state,
                validated: action.validated
            };

        case SET_EMPLOYMENTINCOMEQUERY:
            return {
                ...state,
                incomeType: action.incomeType,
                isEmploymentIncomeQuery: action.isEmploymentIncomeQuery
            };

        case SET_PROVINCE:
            return {
                ...state,
                isDisableControl: action.isDisableControl,
                provinceDDVal: action.provinceDDVal
            };
        default:
            break;
    }
}