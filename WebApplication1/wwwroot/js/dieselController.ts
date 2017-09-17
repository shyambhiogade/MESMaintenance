declare var app: any;
declare var $: any;

enum dieselFormMode {
    home = 1,
    form = 2,
    report = 3
}

class dieselController {
    viewMode: dieselFormMode = dieselFormMode.home;
    openStock: string = "";
    received: string = "";
    used: string = "";
    errorInSubmit: boolean = false;
    submitStatus: any;
    reportData: any = [];


    static $inject = ["$scope", "$http"];

    constructor(private $scope: any,
        private $http: any) {
    }

    showReport(): void {
        this.viewMode = dieselFormMode.report;
    }

    showSubmitForm(): void {
        this.viewMode = dieselFormMode.form;
    }

    goBack(): void {
        this.viewMode = dieselFormMode.home;
        this.openStock = "";
        this.received = "";
        this.used = "";
    }

    submit(): void {
        this.submitStatus = null;
        let postData: any = {
            "openStock": this.openStock,
            "received": this.received,
            "used": this.used
        }

        this.$http.post('/api/Diesel', JSON.stringify(postData)).then(
            (promise) => {
                if (promise.status === 200) {
                    console.info("data submitted successfully");
                    this.submitStatus = 1;
                    this.openStock = "";
                    this.received = "";
                    this.used = "";
                } else {
                    console.error("error submitting data");
                    this.errorInSubmit = true;
                    this.submitStatus = 2;
                }
            },
            (error) => {
                this.errorInSubmit = true;
                this.submitStatus = 2;
            });
    }

    getReportData(): void {
        this.$http.get('/api/Diesel').then(
            (promise) => {
                if (promise.status === 200) {
                    this.reportData = promise.data;
                    this.viewMode = dieselFormMode.report;
                    setTimeout(function () { $('#reportTable').DataTable();});                    
                } else {
                    console.error("error submitting data");
                    this.errorInSubmit = true;
                    this.submitStatus = 2;
                }
            },
            (error) => {
                this.errorInSubmit = true;
                this.submitStatus = 2;
            });
    }
}

app.controller('dieselController', dieselController);
