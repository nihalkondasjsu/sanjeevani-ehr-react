import React from 'react'
import { Container } from 'react-bootstrap'
import getWebSQL from '../../utils/database/WebSQL'
import CustomForm from '../common/form/CustomForm'
import CustomModal from '../common/modal/CustomModal'
import { CustomTab } from '../common/tab/CustomTabLibrary'
import Demographics from './Demographics'
import HealthVitals from './HealthVitals'
import Reports from './Reports'
import Test from './test/Test'

export default function Main({headerHeight,footerHeight,showAlert}) {

    const webSQL = getWebSQL(window);

    const resetFunctionCollection = [];

    const reset = (resetFunction) => {
        resetFunctionCollection.push(resetFunction);
    }

    const saveToDatabase = (formData) => {
        webSQL.insert('ehr',formData).then((a)=>{
            console.log(a);
            showAlert({
                success:true,
                title:'Health Record Stored',
                body:'Health record has been stored in the web database. Please request for a cloud sync as soon as you have reliable internet connection.'
            });
            resetFunctionCollection.forEach((rf)=>rf());
        }).catch((a)=>{
            console.log(a);
            showAlert({
                success:false,
                title:'Error Storing Health Record',
                body:'Health record has been stored in the web database. Please request for a cloud sync as soon as you have reliable internet connection.'
            });
        });
    }

    const [reportRefresh,setReportRefresh] = React.useState(0);

    return (
        <section id="body" style={{
            marginTop:headerHeight+30,
            marginBottom:footerHeight+30
        }}>
            <Container>
                <CustomForm submitOverride={saveToDatabase}>
                    
                    <CustomTab groupId='main' tabId='demographics'>
                        <Demographics reset={reset}/>
                    </CustomTab>
                    
                    <CustomTab groupId='main' tabId='health-vitals'>
                        <HealthVitals reset={reset}/>
                    </CustomTab>
                
                </CustomForm>

                <CustomTab groupId='main' tabId='reports' tabSelected={()=>{
                    setReportRefresh(new Date().getTime());
                }}>
                    <Reports refreshTime={reportRefresh} showAlert={showAlert}/>
                </CustomTab>
                
                <CustomTab groupId='main' tabId='test'>
                    <Test/>
                </CustomTab>

            </Container>
        </section>
    )
}


// <CustomModal visible={modalSetting.visible} title={modalSetting.modal.title} body={modalSetting.modal.body} handleClose={()=>{
//     setModalSettings({...modalSetting,visible:false})
// }}/>