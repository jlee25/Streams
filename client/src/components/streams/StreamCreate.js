import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/';
import StreamForm from './StreamForm';

class StreamCreate extends Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues); // Run the createStream action creator
    }

    // OnSubmit prop is being passed to ReduxForm wrapping the component StreamForm

    render() {
        return (
            <div>
                <h3>Create A Stream</h3>
                <StreamForm onSubmit={this.onSubmit} /> 
            </div>
        );
    }
}

export default connect(null, {
    createStream
})(StreamCreate);

// Field only hooks it up to Redux, does not display an input or submit button
