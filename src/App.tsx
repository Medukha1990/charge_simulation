import { useEffect, useState } from 'react';
import './App.css';
import {
	calculateSimulationData,
	generateScaledData,
	transformToBarChartData,
} from './utils/utils';
import InputForm from './components/InputForm/InputForm';
import Output from './components/Output/Output';
import ChartComponent from './components/ChartComponent/ChartComponent';
import {
	BarChartData,
	ChargeSimulationInput,
	ChargeSimulationOutput,
	Period,
} from './types/CommonTypes';
import BarChartComponent from './components/BarChartComponent/BarChartComponent';

const App = () => {
	const [simulationData, setSimulationData] =
		useState<ChargeSimulationOutput | null>(null);
	const [lineChartData, setLineChartData] = useState<number[][]>([]);
	const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
	const [period, setPeriod] = useState<Period>('year');
	const [formData, setFormData] = useState<ChargeSimulationInput | null>(
		null,
	);

	const handlePeriodChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setPeriod(event.target.value as Period);
	};

	const handleSubmitForm = (data: ChargeSimulationInput) => {
		setFormData(data);

		const simulationData = calculateSimulationData(data, period);
		const { totalEnergy, peakPower, chargeEvents, powerPerChargePoint } =
			simulationData;
		const scaledData = generateScaledData(data);

		setSimulationData({
			totalEnergy,
			peakPower,
			chargeEvents,
			powerPerChargePoint,
		});
		setLineChartData(scaledData);
		setBarChartData(transformToBarChartData(chargeEvents));
	};

	useEffect(() => {
		if (formData) {
			const simulationData = calculateSimulationData(formData, period);
			const {
				totalEnergy,
				peakPower,
				chargeEvents,
				powerPerChargePoint,
			} = simulationData;
			setSimulationData({
				totalEnergy,
				peakPower,
				chargeEvents,
				powerPerChargePoint,
			});

			const scaledData = generateScaledData(formData);
			setLineChartData(scaledData);
			setBarChartData(transformToBarChartData(chargeEvents));
		}
	}, [period, formData]);

	return (
		<div className='container mx-auto px-4 py-2'>
			<InputForm
				onSubmit={handleSubmitForm}
				period={period}
				handlePeriodChange={handlePeriodChange}
			/>

			{simulationData && <Output data={simulationData} period={period} />}

			<div className='flex flex-col gap-6 mt-6'>
				{lineChartData.length > 0 && (
					<ChartComponent data={lineChartData} />
				)}
				{barChartData.length > 0 && (
					<BarChartComponent data={barChartData} />
				)}
			</div>
		</div>
	);
};

export default App;
