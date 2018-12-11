import _ from 'lodash';
import React from "react";
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    } 

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }
    
    render() {
    if (!this.props.stream) {
        return <div>Loading...</div>
    } // When component first renders it doesn't have a .title, it rerenders when fetchstream is called.

    // initialValues is a reduxform specific prop.
    // _.pick, we only want title and description. Not id and user id from state streams
    // put vs patch request. Put replaces all properties, patch replaces some. 

    return (
        <div>
            <h3>Edit A Stream</h3>
            <StreamForm 
                initialValues={_.pick(this.props.stream, 'title', 'description')} 
                onSubmit={this.onSubmit} 
            />
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // own props access to the props in the component
    const streamId = ownProps.match.params.id;
    return {
        stream: state.streams[streamId]
    }
}

export default connect(mapStateToProps,
    { fetchStream, editStream }    
)(StreamEdit);

// Each Component with a route has to fetch its own data from API