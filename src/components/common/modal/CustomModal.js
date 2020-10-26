import React from 'react'
import { Toast } from 'react-bootstrap'
/*
export default function CustomModal_({title,body}) {
    console.log('CustomModal',visible,title)
    
    const [visible,setVisible] = React.useState(false);

    return (
        <Modal show={visible} onShow={()=>{
            setTimeout(()=>{
                setVisible(false);
            },3000);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
*/

export default class CustomModal extends React.Component {

    constructor(){
        super();
        this.state = {
            visible:false,
            title:'',
            body:''
        };
    }

    componentDidMount(){
        console.log('customModal','componentDidMount')
    }

    render(){
        console.log('customModal','render',this.props,this.state);
        if(this.props.callback){
            console.log('customModal','render',this.props.callback)
            this.props.callback(({visible,title,body})=>{
                this.setState({visible,title,body})
            });
        }
        return (
            /*
            <Modal show={this.state.visible}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                        this.setState({visible:false});
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>
            */

            
            <Toast show={this.state.visible} onClose={()=>{
                this.setState({visible:false})
            }}>
                <Toast.Header>
                    <strong className="mr-auto">{this.state.title}</strong>
                </Toast.Header>
                <Toast.Body>{this.state.body}</Toast.Body>
            </Toast>
        );
    }

}