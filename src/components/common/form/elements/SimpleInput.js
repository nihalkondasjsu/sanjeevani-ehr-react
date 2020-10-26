import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export default function SimpleInput({title,type,name,value,placeholder,subtext,datalist,reset}) {

    
    if(datalist){
        console.log(datalist);
        datalist = <datalist id={name+"-data"}>{datalist.map((dl,i)=><option key={i} value={dl}/>)}</datalist>
    }

    value = value || '';

    if(false){
        if(type==='number'){
            value = parseInt(Math.random() * 1000)
        }else{
            value = randomString(5);
        }
    }

    const [Value, setValue] = React.useState('');

    React.useEffect(()=>{
        if(reset){
            reset(()=>{
                setValue('');
            })
        }
    },[reset]);

    return (
        <Form.Group >
            <Row>
                <Col sm="3" className="text-right">
                    <Form.Label><h6>{title}:</h6></Form.Label>
                </Col>
                <Col sm="9">
                    <Form.Control 
                        as={type==='textarea' ? 'textarea' : 'input'} 
                        type={type} 
                        id={name} 
                        placeholder={placeholder} 
                        name={name} 
                        defaultValue={value}
                        value={Value} 
                        list={name+"-data"}
                        data-form-include={true}
                        data-form-cast={type==='number' ? 'number':'text'}
                        onChange={(event)=>{
                            setValue(event.target.value);
                        }}/>
                </Col>
            </Row>
            <Row className="justify-content-md-right">
                <Col sm="9">
                    <Form.Text className={"text-muted "+(subtext === ''?'d-none':'')}>{subtext}</Form.Text>
                </Col>
            </Row>
            {datalist}
        </Form.Group>
    )
}
