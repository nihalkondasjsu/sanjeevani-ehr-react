import React, {useState,useRef,useCallback} from 'react';
import { Button, Tab, Image } from 'react-bootstrap';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 250,
    height: 150,
    facingMode: "user"
};
   
export default function WebcamCapture({name,title,reset}){
    name = name || 'image';
    title = title || 'Photo';

    const webcamRef = useRef(null);
    
    const [src,setSrc] = useState('');
    const [activeTab,setActiveTab] = useState('capture');

    const capture = useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setSrc(imageSrc);
        setActiveTab('review');
      },
      [webcamRef]
    );

    const retake = () => {
        setActiveTab('capture');
    };
   
    const buttonStyle = {
        borderTopLeftRadius:0,
        borderTopRightRadius:0
    };

    const imgStyle = {
        borderTopLeftRadius:'0.25rem',
        borderTopRightRadius:'0.25rem'
    };

    React.useEffect(()=>{
        if(reset)
        reset(()=>{
            setSrc('');
            setActiveTab('capture');
        })
    },[reset]);

    return (
        <div>
            <h6>{title}:</h6>
            <input name={name} type="hidden" value={src} data-form-include={true} data-form-cast={'text'}/>
            <Tab.Container activeKey={activeTab}>
                <Tab.Content className="d-inline-block" style={{width:videoConstraints.width}}>
                    <Tab.Pane eventKey="capture">
                        <Webcam
                            audio={false}
                            height={videoConstraints.height}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={videoConstraints.width}
                            videoConstraints={videoConstraints}
                            mirrored={true}
                            className="d-block"
                            style={imgStyle}
                        />
                        <Button onClick={capture} className="w-100" variant="primary" style={buttonStyle}>Capture photo</Button>
                    </Tab.Pane>
                    <Tab.Pane eventKey="review">
                        <Image
                            height={videoConstraints.height}
                            width={videoConstraints.width}
                            src={src}
                            style={imgStyle}
                        />
                        <Button onClick={retake} className="w-100" variant="secondary" style={buttonStyle}>Retake photo</Button>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};