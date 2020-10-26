import React,{ useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { CustomTabContainer } from './components/common/tab/CustomTabLibrary';
import { Alert, Toast } from 'react-bootstrap';

function App() {
  const [headerHeight,setHeaderHeight] = useState(70);
  const [footerHeight,setFooterHeight] = useState(70);

  const [alertData,setAlertData] = useState({show:false,success:true,title:'',body:''});

  const showAlert = ({title,body,success}) => {
    setAlertData({show:true,title,body,success});
    setTimeout(()=>{
      setAlertData({...alertData,show:false});
    },3000);
  }

  return (
    <CustomTabContainer groupId='main' activeTabId='demographics'>
      <Header headerHeightChanged={setHeaderHeight}/>
      <Main headerHeight={headerHeight} footerHeight={footerHeight} showAlert={showAlert}/>
      <Footer footerHeightChanged={setFooterHeight}/>
      <Alert show={alertData.show} variant={alertData.success?"success":"danger"} style={{
        position:'absolute',
        top:10,
        right:10,
        zIndex:9999
      }}>
        <Alert.Heading>{alertData.title}</Alert.Heading>
        <hr className="mt-1 mb-1"/>
          {alertData.body}
      </Alert>
    </CustomTabContainer>
  );
}

export default App;
