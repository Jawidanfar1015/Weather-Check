var searchInput = document.querySelector(".btn1");
var newName = document.querySelector("input");
var cityName = document.querySelector('#cityn');
var buttonSearch = document.querySelector('#language-buttons');
var buttonContainer = document.querySelector('#language-buttons');



function searchCity(event){
    var searchButton = event.target.getAttribute('data-city1');
    var city = newName.value.trim();
    localStorage.setItem("city1", city);
    if (searchButton) {
        getWeather(city);
        currentWeather(city);
        cityUpdate(city);
        
        
      }
}
function searchHistoryButton(dataValue){
    var dataCapValue = dataValue.toUpperCase();
    var dataButton = document.createElement("button");
    dataButton.classList = "btn col-12 p-2 m-1";
    dataButton.textContent = dataCapValue;
    dataButton.setAttribute("data-city", dataCapValue);
    buttonContainer.appendChild(dataButton);
}



function cityUpdate(city){
    var capCity = city.toUpperCase();
    document.querySelector("#cityn").innerHTML = capCity;
}

function buttonClickHandler(event){
    var city = event.target.getAttribute('data-city');
    if (city){
        getWeather(city);
        currentWeather(city);
        cityUpdate(city);
    }
}


function getWeather(city){
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +city+ "&units=imperial&appid=1f7caf8699eddc2075614920996436b1";
    
    fetch(requestUrl)
        .then(function(Response){
            return Response.json();
        }).then(function(data){
                document.querySelector(".temp1").innerHTML = data.list[8].main.temp + "°F"
                document.querySelector(".wind1").innerHTML = data.list[8].wind.speed + " mil/hr"
                document.querySelector(".humidity1").innerHTML = data.list[8].main.humidity + " %"
                document.querySelector(".icon1").src ="http://openweathermap.org/img/wn/"+data.list[8].weather[0].icon+".png";

                document.querySelector(".temp2").innerHTML = data.list[16].main.temp + "°F"
                document.querySelector(".wind2").innerHTML = data.list[16].wind.speed + " mil/hr"
                document.querySelector(".humidity2").innerHTML = data.list[16].main.humidity + " %"
                document.querySelector(".icon2").src ="http://openweathermap.org/img/wn/"+data.list[16].weather[0].icon+".png";

                document.querySelector(".temp3").innerHTML = data.list[24].main.temp + "°F"
                document.querySelector(".wind3").innerHTML = data.list[24].wind.speed + " mil/hr"
                document.querySelector(".humidity3").innerHTML = data.list[24].main.humidity + " %"
                document.querySelector(".icon3").src ="http://openweathermap.org/img/wn/"+data.list[24].weather[0].icon+".png";

                document.querySelector(".temp4").innerHTML = data.list[32].main.temp + "°F"
                document.querySelector(".wind4").innerHTML = data.list[32].wind.speed + " mil/hr"
                document.querySelector(".humidity4").innerHTML = data.list[32].main.humidity + " %"
                document.querySelector(".icon4").src ="http://openweathermap.org/img/wn/"+data.list[32].weather[0].icon+".png";

                document.querySelector(".temp5").innerHTML = data.list[39].main.temp + "°F"
                document.querySelector(".wind5").innerHTML = data.list[39].wind.speed + " mil/hr"
                document.querySelector(".humidity5").innerHTML = data.list[39].main.humidity + " %"
                document.querySelector(".icon5").src ="http://openweathermap.org/img/wn/"+data.list[39].weather[0].icon+".png";
            })
            .catch(function (error) {
                alert('Unable to connect to server...');
              });
}


function currentWeather(city){
    var firstUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=1f7caf8699eddc2075614920996436b1";
    fetch(firstUrl)
    .then(function(resp){
        if (resp.status > 199 && resp.status < 399){
            var dataValue = localStorage.getItem("city1"); 
            searchHistoryButton(dataValue);
            return resp.json();
        }else{
            alert("please enter a valid city")
            return;
        }
         
    })
    .then(function(current){
            document.querySelector(".temp").innerHTML = current.main.temp + "° F"
            document.querySelector(".wind").innerHTML = current.wind.speed + " mil/hr"
            document.querySelector(".humidity").innerHTML = current.main.humidity + " %"
            document.querySelector(".icon").src ="http://openweathermap.org/img/wn/"+current.weather[0].icon+"@2x.png";
            var lat = current.coord.lat;
            var lon = current.coord.lon;
            gettingUvi(lat, lon);
    })
    .catch(function (error) {
        alert('Something went wrong...');
      });
}
function gettingUvi(lat, lon){
    var repeuestUvi = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=daily&units=imperial&appid=1f7caf8699eddc2075614920996436b1";
    fetch(repeuestUvi)
    .then(function(answer){
        return answer.json();
    })
    .then(function(uviResult){
        console.log(uviResult);
        document.querySelector('.uv_index').innerHTML = uviResult.current.uvi;
        var uvi = uviResult.current.uvi;
        uviBackground(uvi)
        console.log(uvi);
    })
}

function uviBackground(uvi){
    if(uvi < "0.5"){
       document.getElementById('uv_i').style.backgroundColor = "blue";  
    } else if (uvi > "0.1" && uvi < "1"){
        document.getElementById('uv_i').style.backgroundColor = "yellow";
        document.getElementById('uv_i').style.color = "black";  
    }else{
        document.getElementById('uv_i').style.backgroundColor = "red";   
    }
}


var today = moment().format('DD/MM/YYYY')
var day1 = moment().add(1, 'days').format("DD/MM/YYYY")
var day2 = moment().add(2, 'days').format("DD/MM/YYYY")
var day3 = moment().add(3, 'days').format("DD/MM/YYYY")
var day4 = moment().add(4, 'days').format("DD/MM/YYYY")
var day5 = moment().add(5, 'days').format("DD/MM/YYYY")

function time(){
    document.querySelector('.current_date').textContent = '('+today+')'
    document.querySelector('.day_one').textContent = day1;
    document.querySelector('.day_two').textContent = day2;
    document.querySelector('.day_three').textContent = day3;
    document.querySelector('.day_four').textContent = day4;
    document.querySelector('.day_five').textContent = day5;
}
setInterval(time, 1000);
searchInput.addEventListener("click", searchCity);
buttonSearch.addEventListener('click', buttonClickHandler);