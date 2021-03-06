//chart created using https://mdbootstrap.com/docs/jquery/javascript/charts/#doughnut-chart

var ctxP = document.getElementById("doughnutChart").getContext('2d');
var JSONfiles = ["client-instance-1","client-instance-2","client-instance-3"];
var JSONcontents = []

function client_data(jsonResponse) {

    var disk_percent = 0.0
    var memory_percent = 0.0
    var cpus = 0.0
    var avg_disk_percent = 0.0
    var avg_memory_percent = 0.0
    var avg_cpu_percent = 0.0
    var count = 0

    for (var i = 0; i < jsonResponse.length; i++) {
        let d = jsonResponse[i];
        let data = d.system_performance_data

        disk_percent = (disk_percent + data.disk_percent)
        memory_percent = (memory_percent + data.memory_percent)
        cpus = (cpus + data.cpus)
        count = (count + 1)
    }

    avg_disk_percent = (disk_percent/count)
    avg_memory_percent = (memory_percent/count)
    avg_cpu_percent = (cpus/count)

    var myPieChart = new Chart(ctxP, {
      type: 'doughnut',
      data: {
          labels: ["Memory Usage (%)", "Disk Usage (%)", "CPU Usage (%)"],
          datasets: [{
              data: [avg_disk_percent, avg_cpu_percent, avg_memory_percent],
              // Colors: Green, Yellow, Red
              backgroundColor: ["rgba(32, 178, 170, 0.5)", "rgba(255, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"],
              hoverBackgroundColor: ["rgba(32, 178, 170, 0.4)", "rgba(255, 255, 0, 0.4)", "rgba(255, 0, 0, 0.4)"],
              borderColor: ["rgba(32, 178, 170, 1)", "rgba(255, 255, 0, 1)", "rgba(255, 0, 0, 1)"]
          }]
      },
      options: {
          responsive: true,
              legend: {
                  display: true,
                  position: 'left',
                  labels: {
                      fontColor: '#fff',
                      padding: 20
                  }
              },
          elements: {
              arc: {
                  borderWidth: 1
              }
          }
      }
  })
}

function getData(url) {
    var file_name = url;
    var request = new XMLHttpRequest();
    request.open('GET', "../../logfiles/perfData-" + file_name + ".log", false);  // false makes th$
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
    client_data(JSONcontents);
}

start();
