const body =document.querySelector("body")

const input =document.querySelector("input")
const button =document.querySelector("button")
const select=document.querySelector("select")
const temperatureDiv=document.querySelector(".temperature")
const humidityDiv=document.querySelector(".humidity")
const container=document.querySelector(".container")
let root = document.documentElement;


button.addEventListener("click",async()=>{
    let location=input.value;
    let unit=select.value;
    console.log(location)
    console.log(unit)
    let data = await getWeather(todayDate(),location,unit); 
    console.log(data) 
    let temperature=jsonProcessing(data).temperature;
    let humidity=jsonProcessing(data).humidity
    changeBodyColor(temperature,unit)
    displayWeather(temperature,humidity)
})
async function getWeather(date,city,unit){
    let response=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}/${date}?key=3BJSV2AXDNW95EZG9M4G844MK&unitGroup=${unit}&include=current&elements=%2Ctemp%2Chumidity%2Cwinddir`,{mode:"cors"})
    let json=await response.json();
    return json;
}

function todayDate(){
    let date =new Date()
    let string=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
    return string
}
function jsonProcessing(json){
    let temperature=json.days[0].temp;
    let humidity=json.days[0].humidity;
    return {temperature,humidity}
}

function changeBodyColor(temp,unit){
    if(temp>35&unit=="metric"|temp>(35* (9/5) + 32)&unit!="metric"){
        root.style.setProperty('--main', 'rgb(255, 153, 153)');
    }else if(temp<5&unit=="metric"|temp>(5* (9/5) + 32)&unit!="metric"){
        root.style.setProperty('--main', 'rgb(153,202,255)');
    }else{
        root.style.setProperty('--main', 'rgb(253, 255, 195)');
    }
}

function displayWeather(temperature,humidity){
    temperatureDiv.textContent="Temperature: "+temperature
    humidityDiv.textContent="Humidity: "+humidity;
    container.style.visibility="visible"
}
