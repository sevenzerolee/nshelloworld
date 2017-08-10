var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function GroceryListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function() {
        return fetchModule.fetch(config.apiUrl + "/getList", {
            headers: {

            }
        }).then(handleErrors).then(function(response) {
            return response.json();
        }).then(function(data) {
            data.forEach(function(g) {
                //console.log(g.name + ", " + g.id);
                viewModel.push({
                    name: g.name,
                    id: g.id
                });
            });
        });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.add = function(grocery) {
        return fetch(config.apiUrl + "/getList", {
            method:  "POST",
            body: JSON.stringify({
                name: grocery
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data.id);
            viewModel.push({name: grocery, id: data.id});
        });
    }

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = GroceryListViewModel;