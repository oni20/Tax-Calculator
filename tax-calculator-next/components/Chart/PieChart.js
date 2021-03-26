import React, { useContext } from 'react';
import ReactECharts from 'echarts-for-react';

/* Custom import */
import { convertStringToNumber } from '../../utility/helper';
import { GlobalContext } from '../Context/GlobalContext';
import { ResultContext } from '../Body/ResultContext';

const PieChart = () => {
    const { content } = useContext(GlobalContext),
        { salAfterTax } = useContext(ResultContext),
        { pieChart } = content.body,
        mirrorSalAfterTax = { ...salAfterTax },
        grossIncome = '$' + salAfterTax.income;

    delete mirrorSalAfterTax['income'];

    const chartData = Object.keys(mirrorSalAfterTax).map(key => {
        return {
            value: convertStringToNumber(mirrorSalAfterTax[key]),
            name: pieChart.headers[key] + ': $' + mirrorSalAfterTax[key]
        };
    });

    const options = {
        aria: {
            enabled: true
        },
        title: {
            text: pieChart.headers.income,
            subtext: grossIncome,
            left: 'center',
            top: 0,            
            textStyle: {
                color: '#6d62f9',
                fontSize: 20
            },
            subtextStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (tooltipObj) {
                return tooltipObj.percent + tooltipObj.seriesName + '<br/>' + tooltipObj.marker + tooltipObj.data.name;
            }
        },
        toolbox: {
            show: true,
            right: 30,
            feature: {
                mark: { show: true },
                saveAsImage: { 
                    show: true,
                    title: 'Download'
                }
            }
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom',
            padding: [0,0],            
            formatter: function (name) {
                return name.split(':')[0];
            }
        },
        series: [
            {
                name: pieChart.legendTitle,
                type: 'pie',                
                radius: ['25%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },                
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: chartData
            }
        ]
    };
    return <ReactECharts option={options} />;
};

export default PieChart;
