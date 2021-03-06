var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");

var groceryList = new GroceryListViewModel([])
var pageData = new observableModule.fromObject({
    groceryList: groceryList,
    grocery: ""
});

/* var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([
        { name: "eggs" },
        { name: "bread" },
        { name: "cereal" }
    ])
}); */

exports.loaded = function(args) {
    page = args.object;
    var listView = page.getViewById("groceryList");
    page.bindingContext = pageData;

    groceryList.empty();

    pageData.set("isLoading", true);
    groceryList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};

exports.add = function() {
    if (pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
        return;
    }

    page.getViewById("grocery").dismissSoftInput();

    groceryList.add(pageData.get("grocery")).catch(function() {
        dialogsModule.alert({
            message: "An error occurred while adding an item to your list.",
            okButtonText: "OK"
        });
    });

    pageData.set("grocery", "");
};