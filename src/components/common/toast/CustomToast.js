import React from 'react';
import { Toast } from 'react-bootstrap';


export default function CustomToast() {
    return (
        <Toast show={this.state.visible} onClose={()=>{
            this.setState({visible:false})
        }}>
            <Toast.Header>
                <strong className="mr-auto">{this.state.title}</strong>
            </Toast.Header>
            <Toast.Body>{this.state.body}</Toast.Body>
        </Toast>
    )
}
