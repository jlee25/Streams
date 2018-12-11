import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'; 

class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1029347300212-bumhs2uakgldpbugsj2vd7krfrcfaok8.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        }); // Callback function will only be called after client:auth2 library has been loaded into GAPI
        // init returns a promise
    }

    onAuthChange = (isSignedIn) => { // will be called when the authentication status changes
       if (isSignedIn) {
           this.props.signIn(this.auth.currentUser.get().getId()); // We want to get the Id as well
       } else {
           this.props.signOut();
       }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {
    signIn, signOut
})(GoogleAuth)
