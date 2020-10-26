import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import SimpleInput from '../common/form/elements/SimpleInput'
import WebcamCapture from '../common/form/elements/WebcamCapture'
import { CustomTabLink } from '../common/tab/CustomTabLibrary'

export default function Demographics({tabChanged,reset}) {
    return (
        <div>
                <Row>
                    <Col md="6" style={{borderRight:'1px solid #ccc'}}>
                        <SimpleInput name="first_name" title="First Name" type="text" reset={reset}/>
                        <SimpleInput name="last_name" title="Last Name" type="text"  reset={reset}/>
                        <SimpleInput name="gender" title="Gender" type="text" datalist={['Male','Female','Other']}  reset={reset}/>
                        <SimpleInput name="age" title="Age" type="number" reset={reset}/>
                        <SimpleInput name="notes_demographics" title="Notes" type="textarea" reset={reset}/>
                    </Col>
                    <Col>
                        <WebcamCapture name='photo' title="Photo" reset={reset}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-3">
                    <Col md="3">
                        <CustomTabLink groupId='main' tabId='health-vitals'>
                            <Button variant="primary" className="w-100" type="button">Save & Go to next section</Button>
                        </CustomTabLink>
                    </Col>
                </Row>
        </div>
    )
}
