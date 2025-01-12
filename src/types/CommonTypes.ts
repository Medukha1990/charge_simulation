export type ChargeSimulationInput = {
	chargePoints: number;
	multiplier: number;
	consumption: number;
	power: number;
};

export type ChargeSimulationOutput = {
	totalEnergy: number;
	peakPower: number;
	chargeEvents: number;
};

export type TableRowData = {
	label: string;
	value?: number | string | null;
	unit: string;
};
