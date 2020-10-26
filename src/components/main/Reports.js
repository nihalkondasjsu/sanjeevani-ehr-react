import React,{ useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import httpRequest from '../../utils/cloud/API';
import getWebSQL from '../../utils/database/WebSQL';
import CustomModal from '../common/modal/CustomModal';

function underscoreCaseToTitleCase(source){
    let parts = source.split('_');
    // if(parts.length>1)
    // parts.shift();
    parts = parts.map((p)=>{
        return p.charAt(0).toUpperCase() + p.slice(1)
    });
    return parts.join(' ');
}

export default function Reports({refreshTime,showAlert}) {

    const webSQL = getWebSQL(window);

    let [data, setData] = useState({keys:[],result:[]});

    const testModal = () => {
        showAlert({
            success:true,
            title:'Sample Title',
            body:'sample body.'
        });
    }

    const refreshData = () => {
        webSQL.getAll('ehr').then((result)=>{
            console.log('11',result);
            let keys = [];
            if(result.length>0){
                keys = Object.keys(result[0].doc);
            }
            setData({result,keys});

            showAlert({
                success:true,
                title:'Health Records Refreshed',
                body:'Health record refreshed.'
            });
        }).catch((err)=>{
            console.log('14',err);
            setData({keys:[],result:[]});
        });
    }

    const uploadData = () => {
        const body = data.result.map((r)=>r.doc);
        httpRequest({
            url:'http://localhost:4005/api/v1/health-record/bulk',
            method:'post',
            body
        }).then((result)=>{
            webSQL.removeAll('ehr').then((result)=>{
                refreshData();
            }).catch((error)=>{

            })

            showAlert({
                success:true,
                title:'Health Record Uploaded',
                body:'Health record have been uploaded to server.'
            });

        }).catch((error)=>{

        })
    }

    const deleteData = (id) => {
        webSQL.remove('ehr',id).then((res)=>{
            console.log(res);
            showAlert({
                success:true,
                title:'Health Record Deleted',
                body:'Health record has been deleted from the web database.'
            });
            refreshData();
        }).catch((err)=>{
            console.log(err);
            showAlert({
                success:false,
                title:'Error Deleting Health Record',
                body:'Health record could not be deleted from the web database.'
            });
        })
    }
    
    useEffect(()=>{
        refreshData();
    },[refreshTime])

    console.log(data);

    if(data.result.length === 0){
        return (
            <div>
                <Button onClick={testModal}>Test</Button>
                <Button onClick={refreshData}>Refresh</Button>
                <h3>No records</h3>
            </div>
        );
    }

    return (
       <div>
            <div className="w-100 mt-2" >
                <Button onClick={testModal}>Test</Button>
                <Button onClick={refreshData}>Refresh</Button>
                <Button onClick={uploadData} className="ml-2">Upload</Button>
                <div className="w-100 mt-2" style={{
                    overflowX:'scroll'
                }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {
                                data.keys.map((k)=><th>{underscoreCaseToTitleCase(k)}</th>)
                            }
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.result.map((r)=>
                                <tr>
                                    {
                                        data.keys.map((k)=>{
                                            if(k === 'photo')
                                                return <td><img src={r.doc[k]} alt=""/></td>
                                            return <td><pre style={{
                                                fontFamily:'inherit',
                                                fontSize:'inherit'
                                            }}>{r.doc[k]}</pre></td>
                                        })
                                    }
                                    <td>
                                        <Button onClick={()=>{
                                            deleteData(r.id)
                                        }}>Delete</Button>
                                    </td>    
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                
                </div>

            </div>
       </div>
    )
}
