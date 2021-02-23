import React, { useState, useEffect, useRef } from 'react';

import SliderStyle from './slider.module.scss';

const Slider = props => {
    const domNode = useRef(null),
        raildomNode = useRef(null),
        valueMin = 0,
        valueMax = props.max,
        thumbWidth = 17,
        thumbHeight = 20,
        keyCode = Object.freeze({
            'left': 37,
            'up': 38,
            'right': 39,
            'down': 40,
            'pageUp': 33,
            'pageDown': 34,
            'end': 35,
            'home': 36
        }),
        [valueNow, setValueNow] = useState(0);

    useEffect(() => {
        setValueNow(props.valueNow);
    }, [props]);

    useEffect(() => {
        if (domNode.current.tabIndex != 0) {
            domNode.current.tabIndex = 0;
        }

        domNode.current.style.cssText = 'width: ' + thumbWidth + 'px; ' + 'height: ' + thumbHeight + 'px; ' + 'top: ' + (thumbHeight / -2) + 'px';       
        moveSliderTo(valueNow);

        return function cleanup() {
            if (domNode.current) {
                domNode.current.removeEventListener('keydown', handleKeyDown);
                domNode.current.removeEventListener('mousedown', handleMouseDown);
                domNode.current.removeEventListener('touchstart', handleTouchStart);
                domNode.current.removeEventListener('focus', handleFocus);
                domNode.current.removeEventListener('blur', handleBlur);
            }

            if (raildomNode.current) {
                raildomNode.current.removeEventListener('click', handleClick);
            }
        };
    }, [valueNow]);

    const UpdateInputVal = newVal => {
        props.updateControlValue(newVal);
    };

    const moveSliderTo = value => {
        value = (value > valueMax) ? valueMax : (value < valueMin) ? valueMin : value;

        let railWidth = raildomNode.current.getBoundingClientRect().width,
            pos = Math.round((valueNow * railWidth) / (valueMax - valueMin)) - (thumbWidth / 2);

        domNode.current.style.left = pos + 'px';
        raildomNode.current.style.background = 'linear-gradient(to right, ' + SliderStyle.blue + ' ' + (pos + 5) + 'px, #ebebeb 0%)';

        setValueNow(value);
        UpdateInputVal(value);
    };

    const handleKeyDown = event => {
        let flag = false,
            newValue = valueNow;

        switch (event.keyCode) {
            case keyCode.left:
            case keyCode.down:
                newValue = valueNow - 1;
                flag = true;
                break;

            case keyCode.right:
            case keyCode.up:
                newValue = valueNow + 1;
                flag = true;
                break;

            case keyCode.pageDown:
                newValue = valueNow - 10;
                flag = true;
                break;

            case keyCode.pageUp:
                newValue = valueNow + 10;
                flag = true;
                break;

            case keyCode.home:
                newValue = valueMin;
                flag = true;
                break;

            case keyCode.end:
                newValue = valueMax;
                flag = true;
                break;

            default:
                break;
        }

        if (flag) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValueNow(newValue);
    };

    const handleFocus = () => {
        domNode.current.classList.add('focus');
        raildomNode.current.classList.add('focus');
    };

    const handleBlur = () => {
        domNode.current.classList.remove('focus');
        raildomNode.current.classList.remove('focus');
    };

    const setSliderPosition = (event, interactionType) => {
        let pageX = interactionType === 'mouse' ? event.pageX : event.touches[0].pageX,
            railWidth = raildomNode.current.getBoundingClientRect().width,
            diffX = pageX - raildomNode.current.getBoundingClientRect().x;

        setValueNow(parseInt(((valueMax - valueMin) * diffX) / railWidth));

        if (interactionType === 'mouse') {
            event.preventDefault();
        }
        event.stopPropagation();
    };

    const handleMouseDown = event => {
        const handleMouseMove = event => {
            setSliderPosition(event, 'mouse');
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        // bind a mousemove event handler to move pointer
        document.addEventListener('mousemove', handleMouseMove);

        // bind a mouseup event handler to stop tracking mouse movements
        document.addEventListener('mouseup', handleMouseUp);
        
        event.preventDefault();
        event.stopPropagation();

        // Set focus to the clicked handle
        domNode.current.focus();
    };

    const handleTouchStart = event => {
        const handleTouchMove = event => {
            setSliderPosition(event, 'touch');
        };

        const cancelTouchEvents = () => {
            domNode.current.removeEventListener('touchmove', handleTouchMove);
            domNode.current.removeEventListener('touchend', cancelTouchEvents);
        };

        // bind a touchmove event handler to move pointer
        domNode.current.addEventListener('touchmove', handleTouchMove);
        
        // bind a touchend event handler to stop tracking touch movements
        domNode.current.addEventListener('touchend', cancelTouchEvents);

        event.stopPropagation();

        // Set focus to the clicked handle
        domNode.current.focus();
    };

    // handleMouseMove has the same functionality as we need for handleMouseClick on the rail
    const handleClick = event => {
        setSliderPosition(event, 'mouse');
    };

    return (
        <>
            <div id={props.uniqueID} className={props.labelClass}>{props.label}</div>
            <div className={SliderStyle.aria_widget_slider}>
                <div className={SliderStyle.rail} ref={raildomNode} onClick={handleClick}>
                    <div
                        ref={domNode}
                        role='slider'
                        tabIndex='0'
                        className={SliderStyle.thumb}
                        aria-valuemin='0'
                        aria-valuenow={valueNow}
                        aria-valuemax={props.max}
                        aria-labelledby={props.uniqueID}
                        onKeyDown={handleKeyDown}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                    </div>
                </div>                
            </div>
        </>
    );
};

export default Slider;