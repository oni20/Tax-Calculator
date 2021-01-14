import React, { useState, useEffect, useRef } from 'react';
import SliderStyle from '../../styles/Slider.module.scss';

const Slider = props => {
    const domNode = useRef(null),
        raildomNode = useRef(null),
        [valuedomNode, setValuedomNode] = useState(false),
        [valueMin, setValueMin] = useState(0),
        [valueMax, setValueMax] = useState(100),
        [valueNow, setValueNow] = useState(50),
        [railWidth, setRailWidth] = useState(0),
        thumbWidth = 21,
        thumbHeight = 26,
        keyCode = Object.freeze({
            'left': 37,
            'up': 38,
            'right': 39,
            'down': 40,
            'pageUp': 33,
            'pageDown': 34,
            'end': 35,
            'home': 36
        });

    useEffect(() => {
        if (domNode.current.getAttribute('aria-valuemin')) {
            setValueMin(parseInt((domNode.current.getAttribute('aria-valuemin'))));
        }
        if (domNode.current.getAttribute('aria-valuemax')) {
            setValueMax(parseInt((domNode.current.getAttribute('aria-valuemax'))));
        }
        if (domNode.current.getAttribute('aria-valuenow')) {
            setValueNow(parseInt((domNode.current.getAttribute('aria-valuenow'))));
        }

        setRailWidth(300);
        setValuedomNode(raildomNode.current.nextElementSibling);

        if (valuedomNode) {
            valuedomNode.innerHTML = '0';
            valuedomNode.style.left = (raildomNode.current.offsetLeft + railWidth + 10) + 'px';
            valuedomNode.style.top = (raildomNode.current.offsetTop - 8) + 'px';
        }

        if (domNode.current.tabIndex != 0) {
            domNode.current.tabIndex = 0;
        }

        domNode.current.style.width = thumbWidth + 'px';
        domNode.current.style.height = thumbHeight + 'px';
        domNode.current.style.top = (thumbHeight / -2) + 'px';

        moveSliderTo(valueNow);

        return function cleanup() {
            domNode.current.removeEventListener('keydown', handleKeyDown);
            domNode.current.removeEventListener('mousedown', handleMouseDown);
            domNode.current.removeEventListener('focus', handleFocus);
            domNode.current.removeEventListener('blur', handleBlur);

            raildomNode.current.removeEventListener('click', handleClick);
        }
    });

    const moveSliderTo = value => {
        if (value > valueMax) {
            value = valueMax;
        }
        if (value < valueMin) {
            value = valueMin;
        }
        setValueNow(value);
        domNode.current.setAttribute('aria-valuenow', valueNow);

        let pos = Math.round((valueNow * railWidth) / (valueMax - valueMin)) - (thumbWidth / 2);

        domNode.current.style.left = pos + 'px';

        raildomNode.current.style.background = "linear-gradient(to right, #16b01e " + (pos + 5) + "px, #ebebeb 0%)";

        if (valuedomNode) {
            valuedomNode.innerHTML = valueNow.toString();
        }
    };

    const handleKeyDown = event => {
        let flag = false;

        switch (event.keyCode) {
            case keyCode.left:
            case keyCode.down:
                moveSliderTo(valueNow - 1);
                flag = true;
                break;

            case keyCode.right:
            case keyCode.up:
                moveSliderTo(valueNow + 1);
                flag = true;
                break;

            case keyCode.pageDown:
                moveSliderTo(valueNow - 10);
                flag = true;
                break;

            case keyCode.pageUp:
                moveSliderTo(valueNow + 10);
                flag = true;
                break;

            case keyCode.home:
                moveSliderTo(valueMin);
                flag = true;
                break;

            case keyCode.end:
                moveSliderTo(valueMax);
                flag = true;
                break;

            default:
                break;
        }

        if (flag) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleFocus = event => {
        domNode.current.classList.add('focus');
        raildomNode.current.classList.add('focus');
    };

    const handleBlur = event => {
        domNode.current.classList.remove('focus');
        raildomNode.current.classList.remove('focus');
    };

    const handleMouseDown = event => {
        const handleMouseMove = event => {

            let diffX = event.pageX - raildomNode.current.offsetLeft;

            setValueNow(parseInt(((valueMax - valueMin) * diffX) / railWidth));
            moveSliderTo(valueNow);

            event.preventDefault();
            event.stopPropagation();
        };

        const handleMouseUp = event => {
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

    // handleMouseMove has the same functionality as we need for handleMouseClick on the rail
    const handleClick = event => {

        let diffX = event.pageX - raildomNode.current.offsetLeft;
        setValueNow(parseInt(((valueMax - valueMin) * diffX) / railWidth));

        moveSliderTo(valueNow);
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <>
            <div id="idRed" className={SliderStyle.label}>
                Red
            </div>
            <div className={SliderStyle.aria_widget_slider}>
                <div className={SliderStyle.rail} ref={raildomNode} onClick={handleClick}>
                    <div
                        ref={domNode}
                        id="idRedValue"
                        role="slider"
                        tabIndex="0"
                        className={SliderStyle.thumb}
                        aria-valuemin="0"
                        aria-valuenow="0"
                        aria-valuemax="255"
                        aria-labelledby="idRed"
                        onKeyDown={handleKeyDown}
                        onMouseDown={handleMouseDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                    </div>
                </div>
                <div className={SliderStyle.value}>0</div>
            </div>
        </>
    )
}

export default Slider;