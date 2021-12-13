import { useState } from 'react';
import { useBetween } from 'use-between';

const useInputSlider = () => {
    const [inputState, setInputState] = useState({});
    return {
        inputState,
        setInputState
    };
};

export const useInputSliderSharedState = () => useBetween(useInputSlider);