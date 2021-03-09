import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const ShowCountDown = (futureTime) => {
    const futureDate = new Date(futureTime).getTime();
    const [timer, setTimer] = useState('');

    useEffect(() => {

        // Update the count down every 1 second
        let interVal = setInterval(function () {

            // Get todays date and time
            let now = new Date().getTime();

            // Find the distance between now an the count down date
            let distance = futureDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in an element with id='demo'
            setTimer(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ');

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(interVal);
                setTimer('EXPIRED');
            }
        }, 1000);
    });

    return <p className='countDown'>{timer}</p>;
};

const AlertMessage = ({ alertType, message, icon, countDown }) => {
    return (
        <Alert variant={alertType}>
            <div className='icon-container'>
                <div dangerouslySetInnerHTML={{ __html: icon }} />
                {message}
            </div>
            {countDown && ShowCountDown(countDown)}
        </Alert>
    );
};

AlertMessage.propTypes = {
    alertType: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    icon: PropTypes.string,
    countDown: PropTypes.string
};
export default AlertMessage;
