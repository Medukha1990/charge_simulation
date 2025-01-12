import { useState } from 'react';
import './App.css';
import { generateDummyData } from './utils';
import InputForm from './components/InputForm/InputForm';
import Output from './components/Output/Output';
import ChartComponent from './components/ChartComponent/ChartComponent';
import {
	ChargeSimulationInput,
	ChargeSimulationOutput,
} from './types/CommonTypes';

const App = () => {
	const [simulationData, setSimulationData] =
		useState<ChargeSimulationOutput | null>(null);
	const [chartData, setChartData] = useState<number[][]>([]);

	const handleSubmitForm = (data: ChargeSimulationInput) => {
		const totalEnergy =
			data.chargePoints * data.consumption * (data.multiplier / 100);
		const peakPower = data.chargePoints * data.power;
		const chargeEvents = data.chargePoints * 365;
		setSimulationData({ totalEnergy, peakPower, chargeEvents });

		const generatedData = generateDummyData(
			data.chargePoints,
			data.multiplier,
		);
		setChartData(generatedData);
	};

	return (
		<div>
			<InputForm onSubmit={handleSubmitForm} />
			{simulationData && <Output data={simulationData} />}
			{chartData.length > 0 && <ChartComponent data={chartData} />}
		</div>
	);
};

export default App;
