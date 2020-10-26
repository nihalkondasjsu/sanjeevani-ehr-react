import React,{ useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import getWebSQL from '../../../utils/database/WebSQL';
import CustomForm from '../../common/form/CustomForm';
import SimpleInput from '../../common/form/elements/SimpleInput';

export default function Test() {
    const webSQL = getWebSQL(window);
    const [data, setData] = useState([]);

    const refreshData = () => {
        webSQL.getAll('sample').then((result)=>{
            console.log('11',result);
            setData(result);
        }).catch((err)=>{
            console.log('14',err);
        });
    }
    
    useEffect(()=>{
        refreshData();
    },[])

    return (
        <div>
            <CustomForm submitOverride={(formData)=>{
                console.log('Test',formData);
                webSQL.insert('sample',{id:new Date().getTime(),...formData}).then(()=>{
                    refreshData();
                }).catch(()=>{

                });
            }}>
                <SimpleInput name="a" title="A" type="text"/>
                <SimpleInput name="b" title="B" type="text"/>
                <SimpleInput name="c" title="C" type="text"/>
                <Button variant="primary" type="submit" >Submit</Button>
            </CustomForm>
            <pre>
                {data.map((d)=>JSON.stringify(d)).join('\n')}
            </pre>
        </div>
    )
}
