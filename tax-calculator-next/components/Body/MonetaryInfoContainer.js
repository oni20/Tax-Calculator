import React, { useContext } from 'react';
import AlertMessage from '../common/AlertMessage';
import LottiePlayer from '../common/LottiePlayer';
import FormInputRange from './FormInputRange';

/* Contexts */
import { GlobalContext } from '../Context/GlobalContext';
import { useFormContext } from './FormContext';

/* Config */
import { InputControlList } from '../../utility/config';

export default function MonetaryInfoContainer({ styleInputClass }) {
    const { content } = useContext(GlobalContext);
    const { state } = useFormContext();
    const { isEmploymentIncomeQuery, isDisableControl } = state;

    return (
        <>
            {
                isEmploymentIncomeQuery === 'selfIncome' ?
                    <>
                        <LottiePlayer
                            imageSource="https://assets3.lottiefiles.com/packages/lf20_hntzYU.json"
                        />
                        <AlertMessage
                            alertType='warning'
                            message={content.body.screenMessage.warningMsg}
                            icon='<span class="material-icons">engineering</span>'
                            countDown='May 1, 2022 00:00:00' />
                    </>
                    :
                    InputControlList.map((inputObj, idx) => {
                        return (
                            isEmploymentIncomeQuery === inputObj.isEmploymentIncomeQuery &&
                            <FormInputRange
                                key={idx}
                                isEmploymentIncomeQuery={isEmploymentIncomeQuery}
                                isRequired={inputObj.isRequired ? inputObj.isRequired : false}
                                isDisabled={isDisableControl}
                                inputclassName={styleInputClass}
                                controlId={inputObj.controlId}
                                iconName={inputObj.iconName}
                                label={content.body[inputObj.labelKeyName]}
                                errorMessage={
                                    inputObj.errorMessageKeyName && inputObj.errorMessageKeyName === ''
                                        ? ''
                                        : content.body.errorMessage[inputObj.errorMessageKeyName]
                                }
                                rangeMax={inputObj.rangeMax}
                            />
                        );
                    })
            }
        </>
    );
};