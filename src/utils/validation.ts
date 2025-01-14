import { FormErrors, ChargeSimulationInput } from '../types/CommonTypes';

export const validateForm = (formData: ChargeSimulationInput) => {
	const newErrors: FormErrors = {};

	if (formData.chargePoints.length === 0) {
		newErrors.chargePoints = 'At least one charge point is required';
	}

	if (formData.multiplier < 20 || formData.multiplier > 200) {
		newErrors.multiplier = 'Value must be between 20 and 200';
	}

	if (formData.consumption <= 0) {
		newErrors.consumption = 'Value must be a positive number';
	}

	if (formData.power <= 0) {
		newErrors.power = 'Value must be a positive number';
	}

	formData.chargePoints.forEach((point, index) => {
		if (point.count < 1) {
			(newErrors as any)[
				`chargePoints[${index}].count`
			] = `Charge Point ${index + 1} must have a count of at least 1`;
		}
		if (point.power <= 0) {
			(newErrors as any)[
				`chargePoints[${index}].power`
			] = `Charge Point ${index + 1} must have a positive power`;
		}
	});

	return newErrors;
};
