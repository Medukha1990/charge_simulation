export type ChargeSimulationInput = {
	chargePoints: { count: number; power: number }[];
	multiplier: number;
	consumption: number;
	power: number;
};

export type ChargeSimulationOutput = {
	totalEnergy: number;
	peakPower: number;
	chargeEvents: { day: number; week: number; month: number; year: number };
	powerPerChargePoint: number;
};

export type TableRowData = {
	label: string;
	value?: number | string | null;
	unit: string;
};

export type FormErrors = {
	chargePoints?: string;
	multiplier?: string;
	consumption?: string;
	power?: string;
};

export type Period = 'day' | 'week' | 'month' | 'year';

export type BarChartData = { category: string; value: number };
