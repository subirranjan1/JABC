google.load('visualization', '1', {
    packages: ['corechart']
});

//google.setOnLoadCallback(drawVisualization);
//google.setOnLoadCallback(function() {
//    //angular.bootstrap(document.body, ['app']);
//});


angular.module('app').controller('mvChartCtrl', function($scope) {
    //var data = google.visualization.arrayToDataTable([
    //    ['Year', 'Sales', 'Expenses'],
    //    ['2004', 1000, 400],
    //    ['2005', 1170, 460],
    //    ['2006', 660, 1120],
    //    ['2007', 1030, 540]
    //]);
    //var options = {
    //    title: 'Company Performance'
    //};
    //var chart = new google.visualization.LineChart(document.getElementById('page-content-wrapper'));
    //
    //chart.draw(data, options);
    function drawVisualization() {
        google.visualization.drawChart({
            "containerId": "page-content-wrapper",
            "dataSourceUrl": "//www.google.com/fusiontables/gvizdata?tq=",
            "query":"SELECT 'Year', 'School','CP-AS','CP-IS','DWS','EFS','BOO','TIN','ISP','OBW' FROM " +
            "1-k-EwF6WKlmehVPml1q8zPjrqI_Fxm-kfTiS0eTZ",
            "refreshInterval": 1000,
            "chartType": "Table",
            "options": {}
        });
    }

    drawVisualization();
});
