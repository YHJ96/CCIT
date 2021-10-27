export const data1 = {
    labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
    datasets: [
        {
            lineTension: 0.3,
            label: '온도',
            data: [],
            fill: false,
            backgroundColor: 'rgb(86, 204, 242)',
            borderColor: 'rgba(86, 204, 242, 0.2)',
        },
    ],
};

export const data2 = {
    labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
    datasets: [
        {
            lineTension: 0.3,
            label: '습도',
            data: [],
            fill: false,
            backgroundColor: 'rgb(94, 91, 230)',
            borderColor: 'rgba(94, 91, 230, 0.2)',
        },
    ],
};

export const data3 = {
    labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
    datasets: [
        {
            lineTension: 0.3,
            label: 'CO2',
            data: [],
            fill: false,
            backgroundColor: 'rgb(204, 204, 205)',
            borderColor: 'rgba(204, 204, 205, 0.2)',
        },
    ],
};

export const data4 = {
    labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
    datasets: [
        {
            lineTension: 0.3,
            label: '',
            data: [],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};

 export const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
}; 

export const tempoptions = {
    scales: {
        y: {
            min: 0,
            max: 40,
        },
    }
}

export const humoptions = {
    scales: {
        y: {
            min: 0,
            max: 100,
        },
    }
}

export const co2options = {
    scales: {
        y: {
            min: 0,
            max: 1000,
        },
    }
}

export const API_FARM1 = [
    {
        key: 1,
        title: '수직형',
        farmkey: 1,
    },
    {
        key: 2,
        title: '생력형 A',
        farmkey: 2,
    },
]

export const API_FARM2 = [
    {
        key: 3,
        title: '생력형 B',
        farmkey: 3,
    },
    {
        key: 4,
        title: '전통형',
        farmkey: 4,
    },
]

export const API_CHART1 = [
    {
        key: 3,
        title: '생력형 B',
        farmkey: 1,
    },
    {
        key: 4,
        title: '전통형',
        farmkey: 2,
    },
]

export const API_CHART2 = [
    {
        key: 3,
        title: '생력형 B',
        farmkey: 1,
    },
    {
        key: 4,
        title: '전통형',
        farmkey: 2,
    },
]