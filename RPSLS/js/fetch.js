let cpuHand;
let url;
let value;
fetch("https:csa2020studentapi.azurewebsites.net/rpsls")
    .then(
        data => {
            console.log(data);
            data.text().then(
                function(value){
                    console.log(value);
                    cpuHand = value;
                    //create elements here
                    //handResult();
                }
                
            )
            //If JSON use data.JSON
        }
)

function getValue(){
    return cpuHand;
}

function getData(){
    fetch(url)
    .then(
        data => {
            data.text().then(
                function(v){
                    cpuHand = v;
                }
            )
        }
    )
}

function setUrl(urlName){
    url = urlName;
}

export {setUrl, getValue, getData};

//const dataValue = fetch("https:csa2020studentapi.azurewebsites.net/rpsls");
//console.log(dataValue);