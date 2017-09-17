var dieselFormMode;
(function (dieselFormMode) {
    dieselFormMode[dieselFormMode["home"] = 1] = "home";
    dieselFormMode[dieselFormMode["form"] = 2] = "form";
    dieselFormMode[dieselFormMode["report"] = 3] = "report";
})(dieselFormMode || (dieselFormMode = {}));
var dieselController = (function () {
    function dieselController($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
        this.viewMode = dieselFormMode.home;
        this.openStock = "";
        this.received = "";
        this.used = "";
        this.errorInSubmit = false;
        this.reportData = [];
    }
    dieselController.prototype.showReport = function () {
        this.viewMode = dieselFormMode.report;
    };
    dieselController.prototype.showSubmitForm = function () {
        this.viewMode = dieselFormMode.form;
    };
    dieselController.prototype.goBack = function () {
        this.viewMode = dieselFormMode.home;
        this.openStock = "";
        this.received = "";
        this.used = "";
    };
    dieselController.prototype.submit = function () {
        var _this = this;
        this.submitStatus = null;
        var postData = {
            "openStock": this.openStock,
            "received": this.received,
            "used": this.used
        };
        this.$http.post('/api/Diesel', JSON.stringify(postData)).then(function (promise) {
            if (promise.status === 200) {
                console.info("data submitted successfully");
                _this.submitStatus = 1;
                _this.openStock = "";
                _this.received = "";
                _this.used = "";
            }
            else {
                console.error("error submitting data");
                _this.errorInSubmit = true;
                _this.submitStatus = 2;
            }
        }, function (error) {
            _this.errorInSubmit = true;
            _this.submitStatus = 2;
        });
    };
    dieselController.prototype.getReportData = function () {
        var _this = this;
        this.$http.get('/api/Diesel').then(function (promise) {
            if (promise.status === 200) {
                _this.reportData = promise.data;
                _this.viewMode = dieselFormMode.report;
                setTimeout(function () { $('#reportTable').DataTable(); });
            }
            else {
                console.error("error submitting data");
                _this.errorInSubmit = true;
                _this.submitStatus = 2;
            }
        }, function (error) {
            _this.errorInSubmit = true;
            _this.submitStatus = 2;
        });
    };
    return dieselController;
}());
dieselController.$inject = ["$scope", "$http"];
app.controller('dieselController', dieselController);
//# sourceMappingURL=dieselController.js.map