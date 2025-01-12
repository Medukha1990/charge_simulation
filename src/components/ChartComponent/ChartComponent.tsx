import { AgCharts } from 'ag-charts-react';

const ChartComponent = ({ data }: { data: number[][] }) => {
	const aggregatedData = data[0].map((_, hour) =>
		data.reduce((sum, point) => sum + point[hour], 0),
	);

	const chartData = aggregatedData.map((value, hour) => ({
		hour: `${hour}:00`,
		consumption: value,
	}));

	console.log({ chartData });

	const chartOptions: any = {
		data: chartData,
		title: {
			text: 'Hourly Power Consumption',
			fontSize: 18,
		},
		series: [
			{
				type: 'line',
				xKey: 'hour',
				yKey: 'consumption',
				yName: 'Consumption (kW)',
				marker: {
					size: 6,
					fill: '#5bc0de',
				},
			},
		],
		axes: [
			{
				type: 'category',
				position: 'bottom',
				title: { text: 'Hour of Day' },
			},
			{
				type: 'number',
				position: 'left',
				title: { text: 'Consumption (kW)' },
			},
		],
	};

	return (
		<div style={{ width: '100%', height: '400px' }}>
			<AgCharts options={chartOptions} />
		</div>
	);
};

export default ChartComponent;
