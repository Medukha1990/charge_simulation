import { useState } from 'react';
import {
	ChargeSimulationInput,
	FormErrors,
	Period,
} from '../../types/CommonTypes';
import { FIELD_NAMES, Units } from '../../constants';
import PeriodSelector from '../PeriodSelector/PeriodSelector';

type Props = {
	onSubmit: (data: ChargeSimulationInput) => void;
	period: Period;
	handlePeriodChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

type FieldProps = {
	label: string;
	value: number;
	unit: string;
	error?: string;
	onChange: (value: number) => void;
};

const InputField = ({ label, value, onChange, unit, error }: FieldProps) => (
	<div className='flex justify-between my-2'>
		<label>
			{label} ({unit}):
		</label>
		<div className='flex flex-col'>
			<input
				type='number'
				className='border border-gray-300 rounded px-2 py-1 w-56'
				value={value}
				onChange={(e) => onChange(+e.target.value)}
			/>
			{error && (
				<span className='text-red-500 text-xs mx-1 mt-1'>{error}</span>
			)}
		</div>
	</div>
);

const InputForm = ({ onSubmit, handlePeriodChange, period }: Props) => {
	const [formData, setFormData] = useState({
		[FIELD_NAMES.chargePoints]: 5,
		[FIELD_NAMES.multiplier]: 100,
		[FIELD_NAMES.consumption]: 18,
		[FIELD_NAMES.power]: 11,
	});

	const [errors, setErrors] = useState<FormErrors>({
		[FIELD_NAMES.chargePoints]: '',
		[FIELD_NAMES.multiplier]: '',
		[FIELD_NAMES.consumption]: '',
		[FIELD_NAMES.power]: '',
	});

	const validateForm = () => {
		const newErrors: FormErrors = {};

		if (formData.chargePoints < 1) {
			newErrors.chargePoints = 'Value must be at least 1';
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
		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	const handleChange = (key: keyof typeof FIELD_NAMES, value: number) => {
		setFormData((prevData) => ({
			...prevData,
			[key]: value,
		}));
	};

	return (
		<form
			className='flex flex-col items-center justify-center my-2'
			onSubmit={handleSubmit}
		>
			<div className='w-3/6'>
				<InputField
					label='Charge Points'
					value={formData.chargePoints}
					onChange={(value) =>
						handleChange(FIELD_NAMES.chargePoints, value)
					}
					unit={Units.COUNT}
					error={errors.chargePoints}
				/>
				<InputField
					label='Multiplier'
					value={formData.multiplier}
					onChange={(value) =>
						handleChange(FIELD_NAMES.multiplier, value)
					}
					unit={Units.PERCENTAGE}
					error={errors.multiplier}
				/>
				<InputField
					label='Consumption'
					value={formData.consumption}
					onChange={(value) =>
						handleChange(FIELD_NAMES.consumption, value)
					}
					unit={Units.ENERGY}
					error={errors.consumption}
				/>
				<InputField
					label='Power per Charge Point'
					value={formData.power}
					onChange={(value) => handleChange(FIELD_NAMES.power, value)}
					unit={Units.POWER}
					error={errors.power}
				/>
			</div>
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
