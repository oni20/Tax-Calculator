import React, { useContext } from 'react';
import ReactECharts from 'echarts-for-react';

/* Custom import */
import { GlobalContext } from '../Context/GlobalContext';

const PieChart = () => {
    const { content } = useContext(GlobalContext),
        { pieChart } = content.body;

    const options = {
        title: {
            text: pieChart.headers.income,
            subtext: '$110,000',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#6d62f9'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                saveAsImage: { show: true }
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: pieChart.legendTitle,
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 20591.78, name: pieChart.headers.federal },
                    { value: 11000, name: pieChart.headers.provincial },
                    { value: 2898, name: pieChart.headers.cpp },
                    { value: 856.36, name: pieChart.headers.ei },
                    { value: 74653.86, name: pieChart.headers.annual }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return <ReactECharts option={options} />;
};

export default PieChart;
