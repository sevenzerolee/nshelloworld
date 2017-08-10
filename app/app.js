
var applicationModule = require("application");
applicationModule.start({ moduleName: "views/login/login" });



if (applicationModule.android) {
    console.log("We are running on Android device!");
} 
else if (applicationModule.ios) {
    console.log("We are running on iOS device");
}
