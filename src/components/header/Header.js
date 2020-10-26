import React,{ useLayoutEffect } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { CustomTabLink } from '../common/tab/CustomTabLibrary';

import './main.css';

export default function Header({headerHeightChanged,tabChanged}) {

    useLayoutEffect(() => {
        function updateSize() {
            headerHeightChanged(document.getElementById('header').getBoundingClientRect().height);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [headerHeightChanged]);

    return (
        <header id="header" className="fixed-top">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand >
                        <CustomTabLink groupId='main' tabId='demographics' alwaysActive={true}>
                            Health Camp
                        </CustomTabLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto justify-content-end w-100" variant="pills"
                            onSelect={(selectedKey) => tabChanged(selectedKey)}>
                            {
                                [
                                    {text:'Demographics',tabId:'demographics'},
                                    {text:'Health Vitals',tabId:'health-vitals'},
                                    {text:'Reports',tabId:'reports'},
                                    {text:'Test',tabId:'test'}
                                ].map(
                                    (x,i)=>(
                                            <Nav.Item key={i} style={{
                                                color:'white',
                                                padding:5,
                                                cursor:'pointer'
                                            }}>
                                                <CustomTabLink groupId='main' tabId={x.tabId}>
                                                    {x.text}
                                                </CustomTabLink>
                                            </Nav.Item>
                                        )
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
