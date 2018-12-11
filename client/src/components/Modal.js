import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

// e.stopPropagation = Sibling divs will not return back to main page because of the parent div.

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} 
            className="ui dimmer modals visible active"
        >
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active"> 
                <div className="header">
                    {props.title}
                </div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>, 
        document.querySelector('#modal')
    );
};

export default Modal;

// Portals allow elements to be rendered as a child from some other element, component or another html structure. So we can make the modal a child of the div with root id at the top. Instead of making it a child of id of root. We create another div (#modal) and make it a child of that.

// React.Fragment is like an invisible div. Does not show up in dom. Can use <React.Fragment></React.Fragment or <> </>