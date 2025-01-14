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

export default InputField;
