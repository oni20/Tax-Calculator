import {
    SET_VALIDATION,
    SET_EMPLOYMENTINCOMEQUERY,
    SET_DISABLECONTROL,
    SET_PROVINCE
} from '../../Constants';

export const initialState = {
    validated: false,
    isEmploymentIncomeQuery: null,
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
                isEmploymentIncomeQuery: action.isEmploymentIncomeQuery
            };

        case SET_DISABLECONTROL:
            return {
                ...state,
                isDisableControl: action.isDisableControl
            };

        case SET_PROVINCE:
            return {
                ...state,
                provinceDDVal: action.provinceDDVal
            };
        default:
            break;
    }
}