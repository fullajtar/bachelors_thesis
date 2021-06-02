window.onload = async function() {
    $.ajax({
        method: "GET",
        url: "/data/dashboard" ,
        dataType: "json",
        success: function (data) {
            doughnut(data)
            drawChart(data)
            calcSum(data)
        },
    });
};
function doughnut(datas){
    const overdue = datas["invoiceState"]["overdue"]
    const paid = datas["invoiceState"]["paid"]
    const waitingForPayment = datas["invoiceState"]["waitingForPayment"]
    let ctx = document.getElementById("doughnut-chart").getContext("2d");
    const data = {
        labels: [
            'Po splatnosti',
            'Vyplatená',
            'Čaká sa na platbu'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [overdue, paid, waitingForPayment],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(23, 207, 151)',
                'rgb(255,207,129)'
            ],
            hoverOffset: 4
        }]
    };
    window.myBar = new Chart(ctx, {type: "doughnut", data: data});
}

function calcSum(data){
    let income = data["income"]
    let incomeTotal = 0;
    for (let key in income){
        incomeTotal += parseFloat(income[key])
    }
    document.getElementById('income-total').innerText = incomeTotal.toFixed(2)

    let expense = data["expense"]
    let expenseTotal = 0;
    for (let key in expense){
        expenseTotal += parseFloat(expense[key])
    }
    document.getElementById('expense-total').innerText = expenseTotal.toFixed(2)
    document.getElementById('income-avg').innerText = (incomeTotal/12).toFixed(2)
    document.getElementById('expense-avg').innerText = (expenseTotal/12).toFixed(2)
    document.getElementById('expected-payments').innerText = parseFloat(data["invoiceState"]["expectedPayments"]).toFixed(2)
    document.getElementById('overdue-payments').innerText = parseFloat(data["invoiceState"]["overduePayments"]).toFixed(2)
}

function drawChart(data){
    let ctx = document.getElementById("myChart").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Apríl",
                "Máj",
                "Jún",
                "Júl",
                "August",
                "September",
                "Október",
                "November",
                "December",
                "Január",
                "Február",
                "Marec",
            ],
            datasets: [
                {
                    label: "Príjmy",
                    backgroundColor: 'rgba(23,207,151,0.2)',
                    borderColor: '#17CF97',
                    borderWidth: 1,
                    data: [data["income"]['apr'], data["income"]['may'], data["income"]['jun'], data["income"]['jul'], data["income"]['aug'], data["income"]['sep'], data["income"]['oct'], data["income"]['nov'], data["income"]['dec'], data["income"]['jan'], data["income"]['feb'], data["income"]['mar']]
                },
                {
                    label: "Výdavky",
                    backgroundColor: 'rgba(255,86,86,0.2)',
                    borderColor: 'rgb(255,86,86)',
                    borderWidth: 1,
                    data: [data["expense"]['apr'], data["expense"]['may'], data["expense"]['jun'], data["expense"]['jul'], data["expense"]['aug'], data["expense"]['sep'], data["expense"]['oct'], data["expense"]['nov'], data["expense"]['dec'], data["expense"]['jan'], data["expense"]['feb'], data["expense"]['mar']]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Chart.js Bar Chart"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}