/* Global Variables */
const apiKey = 'd1542699d31573e87fb37e879e5583b0';
const weatherUrl = '';
const generate = document.getElementById('generate');
const  months = ['January','Febuary','March','April','May','June','July','August','September','Octopber','November','December']



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = months[d.getMonth()] +'.'+ d.getDate() +'.'+ d.getFullYear();





async function createData() {
    const uiData = {};
    const location = document.getElementById('zip').value.replace(/\s/g, '').toLowerCase();
    const buildUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location},us&appid=${apiKey}&units=imperial`;
    const data = await fetch(buildUrl);
    const jsonData = await data.json();
    uiData.temp = jsonData.main.temp;
    uiData.date = newDate;
    uiData.content = document.getElementById('feelings').value;
    return uiData;

}

const getData = async (url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json()
        console.log('getData');
        console.log(allData);
        return allData;
    } catch(e) {
        console.log("getData error: ", e);
    };
}


const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
      });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}


document.getElementById('generate').addEventListener('click', async()=>{
    try {
        const data = await createData();
        console.log(data);
        postData('/all', data)
        .then(updateUI())
    } catch (e){
        console.log('error creating data:', e)
        document.getElementById('date').textContent = 'No Data Found';
        document.getElementById('temp').textContent = '';
        document.getElementById('content').textContent = '';
    }
    });


const updateUI = async () => {
    console.log('updateUI');
    try {
        const data = await getData('/all');
        document.getElementById('date').textContent =  await data.date;
        document.getElementById('temp').textContent = 'It is ' + await data.temp + 'F in zip code: ' + document.getElementById('zip').value;
        document.getElementById('content').textContent = '"'+ await data.content + '"';
    } catch(e) {
        console.log('updateUI error: ', e)
    }
}

