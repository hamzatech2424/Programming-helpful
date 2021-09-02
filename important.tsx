const getFormattedDate = (today: Date)  => {
    let week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    let months = new Array('January','February','March','April','May','June','July','August','September','October','November','December')
    let day  = week[today.getDay()];
    let dd   = today.getDate();
    let mm   = months[today.getMonth()]; //January is 0!
    let yyyy = today.getFullYear();
    let hour = today.getHours();
    let minu = today.getMinutes();

    return `${day} ${mm} ${dd}, ${yyyy}`
}

let dateObject: Date = new Date();
let exactDate = getFormattedDate(dateObject);