import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { BarChartData } from '../../types/CommonTypes';

type Props = {
	data: BarChartData[];
};

const BarChartComponent = ({ data }: Props) => {
	const barChartOptions: AgChartOptions = {
		title: {
			text: 'Charging Events per Period',
			fontSize: 18,
		},
		data,
		series: [
			{
				type: 'bar',
				xKey: 'category',
				yKey: 'value',
				fill: '#4184f3',
				strokeWidth: 1,
			},
		],
		axes: [
			{
				type: 'category',
				position: 'bottom',
				label: { rotation: 45 },
			},
			{
				type: 'number',
				position: 'left',
				title: { text: 'Charge Events' },
			},
		],
		legend: { enabled: false },
	};

	return <AgCharts options={barChartOptions} />;
};

export default BarChartComponent;
