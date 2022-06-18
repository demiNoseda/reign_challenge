function calculateDifferenceInHours(date1, date2) {
    let difference = (date2.getTime() - date1.getTime()) / 1000 / (3600);

    
    return Math.abs(Math.round(difference));
}



export default calculateDifferenceInHours;