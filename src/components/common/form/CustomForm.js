import React from 'react'
import { Form } from 'react-bootstrap';
import httpRequest from '../../../utils/cloud/API';

export default function CustomForm({action,method,children,submitOverride}) {
    action = action || '';
    
    method = method || 'post';
    method = method.toLowerCase();

    const formData = {};
    return (
        <Form onSubmit={(event)=>{
            event.preventDefault();
            Object.keys(event.target).forEach((i)=>{
                const index = parseInt(i);
                if(isNaN(index))
                    return;
                const input = event.target[index];
                const dataFormInclude = input.getAttribute('data-form-include')||false;
                const dataFormCast = input.getAttribute('data-form-cast')||'text';
                if(dataFormInclude === false)
                    return;
                formData[input.name] = dataFormCast === 'text'? input.value : (parseInt(input.value)||0);
            });
            console.log(formData);
            if(submitOverride){
                submitOverride(formData);
                return;
            }
            httpRequest({
                url:action,
                method,
                body:formData,
                successfulCallback:(response)=>{
                    console.log(response);
                },
                errorCallback:(error)=>{
                    console.log(error);
                }
            });
        }}>
            {children}
        </Form>
    )
}
