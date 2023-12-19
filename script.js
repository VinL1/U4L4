let counts = [];
let stats = [];
let allStatus = [];

async function getData() {
    const response = await fetch("driver.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    rows.forEach((elem) => {
        const row = elem.split(",");
        allStatus.push(row[3]);
    });
    stats = removeDuplicates(allStatus);
    for (i = stats.length; i > 0; i --){
        counts.push(0);
    }
    for (let item of allStatus) {
        counts[stats.indexOf(item)] ++;
    }

    console.log(counts);
    console.log(stats);
    createGraph();
}

async function createGraph(){
    const ctx = document.getElementById('myChart');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: stats,
        datasets: [{
            label: 'Count of each status',
            data: counts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

getData();