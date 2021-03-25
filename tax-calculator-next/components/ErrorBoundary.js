import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* Custome Imports */
import { ERROR_IMAGE_LOTTIE } from '../utility/config';
import LottiePlayer from '../components/common/LottiePlayer';

function AlertDismissibleExample(props) {
  const [show, setShow] = useState(true);
  const { heading, body } = props;

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{body}</p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='container mt-5'>
          <LottiePlayer
            imageSource={ERROR_IMAGE_LOTTIE}
            imageStyle={{ height: '400px', width: '400px' }}
          />
          <AlertDismissibleExample
            heading='Something went wrong. Check the log'
          />
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
