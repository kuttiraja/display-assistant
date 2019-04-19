module.exports.title = "Walbot"
module.exports.imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPpL4bGSmEIPeiXi7afYDK9sRfhsK5ERPLlzkKyroqhuNQ-g"
module.exports.accessibilityText = "Bot"
module.exports.buttonTitle = "Walmart"
module.exports.buttonUrl = "http://walmart.com"
module.exports.getMonth = function(date) {
    // var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
return month[date.getMonth()];

}