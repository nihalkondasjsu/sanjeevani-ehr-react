export default function httpRequest({url,method='GET',body}){
    console.log(url,method,body)
    return new Promise((resolve,reject)=>{
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && (this.status>=200 && this.status<300)) {
                resolve(xhttp.response);
            }
            if(this.status>=400){
                reject(xhttp.response);
            }
        };

        xhttp.open(method.toUpperCase(), url, true);

        if(body){
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.send(JSON.stringify(body));
        }else
            xhttp.send();
    })
}