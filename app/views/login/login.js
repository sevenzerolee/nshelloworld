
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
/* var observableModule = require("data/observable");

var user = new observableModule.fromObject({
    email: "user@domain.com",
    password: "123456",
    btnCancel: "cancel"
}); */

var UserViewModel = require("../../shared/view-models/user-view-model");

var user = new UserViewModel({
    email: "user@domain.com",
    password: "22"
});

var page;
var email;

exports.loaded = function(args) {
    console.log("hello");

    page = args.object;
    //console.log(page);
    page.bindingContext = user;
};

exports.signin = function() {
    // alert("sign in");
    //console.log("sign in " + page);

    //email = page.getViewById("email");
    //console.log(email.text);

    user.login().catch(function(error) {
        console.log("## login " + error);
        dialogsModule.alert( {
            message: "error tip message",
            okButtonText: "OK"
        });
        return Promise.reject();
    }).then(function() {
        frameModule.topmost().navigate("views/list/list");
    });
};


exports.register = function() {
    console.log("register");
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};