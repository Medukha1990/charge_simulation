type Props = {
	period: string;
	onPeriodChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PeriodSelector = ({ period, onPeriodChange }: Props) => (
	<div>
		<label htmlFor='period'>Choose Period: </label>
		<select id='period' value={period} onChange={onPeriodChange}>
			<option value='day'>Day</option>
			<option value='week'>Week</option>
			<option value='month'>Month</option>
			<option value='year'>Year</option>
		</select>
	</div>
);

export default PeriodSelector;
