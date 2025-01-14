import { useState } from 'react';
import {
	ChargeSimulationInput,
	FormErrors,
	Period,
} from '../../types/CommonTypes';
import { Units } from '../../constants';
import PeriodSelector from '../PeriodSelector/PeriodSelector';
import { validateForm } from '../../utils/validation';
import InputField from './InputField';
import ChargePointsList from './ChargePointsList';

type Props = {
	onSubmit: (data: ChargeSimulationInput) => void;
	period: Period;
	handlePeriodChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const InputForm = ({ onSubmit, handlePeriodChange, period }: Props) => {
	const [formData, setFormData] = useState<ChargeSimulationInput>({
		chargePoints: [{ count: 1, power: 11 }],
		multiplier: 100,
		consumption: 18,
		power: 11,
	});

	const [errors, setErrors] = useState<FormErrors>({});

	const handleAddChargePoint = () => {
		setFormData((prev) => ({
			...prev,
			chargePoints: [...prev.chargePoints, { count: 1, power: 11 }],
		}));
	};

	const handleChangeChargePoint = (
		index: number,
		field: 'count' | 'power',
		value: number,
	) => {
		setFormData((prev) => {
			const updatedChargePoints = [...prev.chargePoints];
			updatedChargePoints[index][field] = value;
			return { ...prev, chargePoints: updatedChargePoints };
		});
	};

	const handleRemoveChargePoint = (index: number) => {
		setFormData((prev) => ({
			...prev,
			chargePoints: prev.chargePoints.filter((_, i) => i !== index),
		}));
	};

	const handleChange = (
		key: keyof Omit<ChargeSimulationInput, 'chargePoints'>,
		value: number,
	) => {
		setFormData((prevData) => ({
			...prevData,
			[key]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const errors = validateForm(formData);
		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			onSubmit(formData);
		}
	};

	return (
		<form
			className='flex flex-col items-center justify-center my-2'
			onSubmit={handleSubmit}
		>
			<div className='w-3/6'>
				<InputField
					label='Multiplier'
					value={formData.multiplier}
					onChange={(value) => handleChange('multiplier', value)}
					unit={Units.PERCENTAGE}
					error={errors.multiplier}
				/>
				<InputField
					label='Consumption'
					value={formData.consumption}
					onChange={(value) => handleChange('consumption', value)}
					unit={Units.ENERGY}
					error={errors.consumption}
				/>
			</div>
			<ChargePointsList
				chargePoints={formData.chargePoints}
				onAdd={handleAddChargePoint}
				onChange={handleChangeChargePoint}
				onRemove={handleRemoveChargePoint}
			/>
			<div className='w-3/6 flex justify-between my-6'>
				<div>
					<PeriodSelector
						period={period}
						onPeriodChange={handlePeriodChange}
					/>
				</div>
				<div>
					<button
						type='submit'
						className='border border-gray-300 rounded px-4 py-2'
					>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default InputForm;
