var ctx = document.getElementById('coresBarChart');

Chart.defaults.global.defaultFontColor = '#fff';
var JSONfiles = ["client-instance-1", "client-instance-2"];
var clientDTS
var JSONcontents = []

function client_data(jsonResponse) {

    var avg_cpu = []

    for (var i = 0; i < jsonResponse.length; i++) {
        let d = jsonResponse[i];
        let data = d.system_performance_data

        avg_cpu.push(data.avg_cpu)

    }

    var dts = [
	{
	    label : ["Average CPU (%)"],
	    data : [3, 6.9, 3, 1, 7.8, 5.1, 4.2, 12.1],
	    backgroundColor : [
		'rgba(178, 34, 34, 0.5)',  /* Firebrick */
		'rgba(178, 34, 34, 0.5)',
		'rgba(178, 34, 34, 0.5)',
		'rgba(178, 34, 34, 0.5)',
		'rgba(178, 34, 34, 0.5)',
		'rgba(178, 34, 34, 0.5)',
		'rgba(178, 34, 34, 0.5)',
		'rgba(178, 34, 34, 0.5)',
		'rgba(178, 34, 34, 0.5)'
	    ],
	    borderColor : [
		'rgba(178, 34, 34, 1)',
		'rgba(178, 34, 34, 1)',
		'rgba(178, 34, 34, 1)',
		'rgba(178, 34, 34, 1)',
		'rgba(178, 34, 34, 1)',
		'rgba(178, 34, 34, 1)',
		'rgba(178, 34, 34, 1)',
		'rgba(178, 34, 34, 1)',
		'rgba(178, 34, 34, 1)'
	    ],
	    borderWidth : 1
	}
    ]
    return dts
}

function getData(url) {
    var file_name = url;
    var request = new XMLHttpRequest();
    request.open('GET', "../assets/js/perfData-" + file_name + ".log", false);  // false makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function start() {
    for (var i = 0; i < JSONfiles.length; i++) {
        var d = getData(JSONfiles[i]);
        JSONcontents.push(d);
    }
    clientDTS = client_data(JSONcontents);
}
start();

var chart_data = {
    labels: JSONfiles,
    datasets: clientDTS
};

var lineGraph = new Chart(ctx, {
    type: 'bar',
    data: chart_data,
    options: {
        scales: {
            yAxes : [{
                ticks : {
                    min : 0,
                    stacked : false
                }
            }]
        }
    }
});

/*
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
*/
