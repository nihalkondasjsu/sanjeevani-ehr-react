import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import SimpleInput from '../common/form/elements/SimpleInput'

export default function HealthVitals({reset}) {
    return (
        <div>
                <Row>
                    <Col md="6" style={{borderRight:'1px solid #ccc'}}>
                        <SimpleInput name="height" title="Height" type="number" reset={reset}/>
                        <SimpleInput name="weight" title="Weight" type="number" reset={reset}/>
                        <SimpleInput name="body_temperature" title="Body Temperature" type="number" reset={reset}/>
                        <SimpleInput name="pulse_rate" title="Pulse Rate" type="number"  reset={reset}/>
                        <SimpleInput name="bp" title="BP" type="number" reset={reset}/>
                    </Col>
                    <Col>
                        <SimpleInput name="medication" title="Medication" type="textarea"  reset={reset}/>
                        <SimpleInput name="notes_health_vitals" title="Notes" type="textarea"  reset={reset}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-3">
                    <Col md="3">
                        <Button variant="primary" className="w-100" type="submit" >Submit</Button>
                    </Col>
                </Row>
        </div>
    )
}
