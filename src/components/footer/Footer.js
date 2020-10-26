import React,{ useLayoutEffect } from 'react'


export default function Footer({footerHeightChanged}) {

    useLayoutEffect(() => {
        function updateSize() {
            footerHeightChanged(document.getElementById('footer').getBoundingClientRect().height);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [footerHeightChanged]);

    return (
        <footer className="footer-copyright text-center py-3 text-white bg-dark fixed-bottom" id="footer">
            SPA by Sanjeevani EHR
        </footer>
    )
}
