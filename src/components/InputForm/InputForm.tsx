import { useState } from 'react';
import { ChargeSimulationInput } from '../../types/CommonTypes';
import { Units } from '../../constants/Units';

type Props = {
	onSubmit: (data: ChargeSimulationInput) => void;
};

type FieldProps = {
	label: string;
	value: number;
	onChange: (value: number) => void;
	unit: string;
};

const InputField = ({ label, value, onChange, unit }: FieldProps) => (
	<div className='flex justify-between my-2'>
		<label>
			{label} ({unit}):
		</label>
		<input
			type='number'
			className='border border-gray-300 rounded px-2 py-1'
			value={value}
			onChange={(e) => onChange(+e.target.value)}
		/>
	</div>
);

const InputForm = ({ onSubmit }: Props) => {
	const [formData, setFormData] = useState({
		chargePoints: 5,
		multiplier: 100,
		consumption: 18,
		power: 11,
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit(formData);
	};

	const handleChange = (key: keyof typeof formData, value: number) => {
		setFormData((prevData) => ({
			...prevData,
			[key]: value,
		}));
	};

	return (
		<form
			className='flex flex-col items-center justify-center my-6'
			onSubmit={handleSubmit}
		>
			<div className='w-3/6'>
				<InputField
					label='Charge Points'
					value={formData.chargePoints}
					onChange={(value) => handleChange('chargePoints', value)}
					unit=''
				/>
				<InputField
					label='Multiplier'
					value={formData.multiplier}
					onChange={(value) => handleChange('multiplier', value)}
					unit={Units.PERCENTAGE}
				/>
				<InputField
					label='Consumption'
					value={formData.consumption}
					onChange={(value) => handleChange('consumption', value)}
					unit={Units.ENERGY}
				/>
				<InputField
					label='Power per Charge Point'
					value={formData.power}
					onChange={(value) => handleChange('power', value)}
					unit={Units.POWER}
				/>
			</div>
			<button
				type='submit'
				className='border border-gray-300 rounded px-4 py-2'
			>
				Submit
			</button>
		</form>
	);
};

export default InputForm;
