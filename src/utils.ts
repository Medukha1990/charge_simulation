import { ChargeSimulationInput, Period } from './types/CommonTypes';

export const generateStaticDummyData = () => {
	return [
		[
			0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6,
			0.5, 0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7,
		],
		[
			0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6,
			0.5, 0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7,
		],
	];
};

export const generateScaledData = (data: ChargeSimulationInput) => {
	const staticData = generateStaticDummyData();

	return staticData.map((dataArray) =>
		dataArray.map(
			(value) =>
				value *
				data.chargePoints *
				(data.consumption / 100) *
				(data.multiplier / 100) *
				data.power,
		),
	);
};

export const calculateAggregatedPower = (
	chargeEvents: number,
	powerPerChargePoint: number,
	period: Period,
) => {
	let multiplier: number;

	switch (period) {
		case 'week':
			multiplier = 7;
			break;
		case 'month':
			multiplier = 30;
			break;
		case 'year':
			multiplier = 365;
			break;
		default:
			multiplier = 1;
	}

	const totalPower = chargeEvents * powerPerChargePoint * multiplier;
	const aggregatedPower = totalPower / chargeEvents;

	return aggregatedPower;
};

export const calculateSimulationData = (
	data: ChargeSimulationInput,
	period: Period,
) => {
	const totalEnergy =
		data.chargePoints * data.consumption * (data.multiplier / 100);
	const peakPower = data.chargePoints * data.power;
	const powerPerChargePoint = data.power;
	const chargeEvents = {
		day: data.chargePoints * 1,
		week: data.chargePoints * 7,
		month: data.chargePoints * 30,
		year: data.chargePoints * 365,
	};

	const periodMultiplier = {
		day: 1,
		week: 7,
		month: 30,
		year: 365,
	};

	const adjustedTotalEnergy = totalEnergy * periodMultiplier[period];
	const adjustedPeakPower = peakPower * periodMultiplier[period];

	return {
		totalEnergy: adjustedTotalEnergy,
		peakPower: adjustedPeakPower,
		chargeEvents: chargeEvents,
		powerPerChargePoint: powerPerChargePoint,
	};
};

export const transformToBarChartData = (chargeEvents: {
	[key: string]: number;
}): { category: string; value: number }[] => {
	return Object.entries(chargeEvents).map(([key, value]) => ({
		category: key,
		value,
	}));
};
