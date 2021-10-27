export const GAUGE = {
    type: "gauge",
    data: {
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderWidth: 0,
                hoverBackgroundColor: [],
                hoverBorderWidth: 0
            }
        ],
        current: 90,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
        panel: {
            min: 0,
            max: 180,
            tickInterval: 1,
            tickColor: "rgb(0, 0, 0)",
            tickOuterRadius: 99,
            tickInnerRadius: 95,
            scales: ['ON', '환풍기' ,'OFF'],
            scaleColor: "rgb(253, 253, 253)",
            scaleBackgroundColor: "rgb(105, 125, 151)",
            scaleTextRadius: 80,
            scaleTextSize: 8,
            scaleTextColor: "rgba(253, 253, 253)",
            scaleOuterRadius: 99,
            scaleInnerRadius: 93,
        },
        needle: {
            lengthRadius: 100,
            circleColor: "rgba(188, 188, 188, 1)",
            color: "rgba(180, 0, 0, 0.8)",
            circleRadius: 7,
            width: 5,
        },
        cutoutPercentage: 90,
        rotation: -Math.PI,
        circumference: Math.PI,
        legend: {
            display: false,
            text: "legend"
        },
        tooltips: {
            enabled: false
        },
        animation: {
            animateRotate: false,
            animateScale: false
        },
        hover: {
            mode: null
        }
    }
  };