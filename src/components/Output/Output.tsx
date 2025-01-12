import { Titles, Units } from '../../constants/Units';
import { ChargeSimulationOutput, TableRowData } from '../../types/CommonTypes';

type Props = {
	data: ChargeSimulationOutput | null;
};

const TableRow = ({ label, value, unit }: TableRowData) => {
	return (
		<tr>
			<td className='border border-gray-300 px-4 py-2'>{label}</td>
			<td className='border border-gray-300 px-4 py-2'>
				{value ?? 'N/A'}
			</td>
			<td className='border border-gray-300 px-4 py-2'>{unit}</td>
		</tr>
	);
};

const Output = ({ data }: Props) => {
	return (
		<div>
			<h2 className='font-bold my-2'>Simulation Results:</h2>
			<table className='table-auto border-collapse border border-gray-300 w-full'>
				<thead>
					<tr>
						<th className='border border-gray-300 px-4 py-2'>
							Metric
						</th>
						<th className='border border-gray-300 px-4 py-2'>
							Value
						</th>
						<th className='border border-gray-300 px-4 py-2'>
							Unit
						</th>
					</tr>
				</thead>
				<tbody>
					<TableRow
						label={Titles.TOTAL_ENERGY}
						value={data?.totalEnergy}
						unit={Units.ENERGY}
					/>
					<TableRow
						label={Titles.PEAK_POWER}
						value={data?.peakPower}
						unit={Units.POWER}
					/>
					<TableRow
						label={Titles.CHARGE_EVENT}
						value={data?.chargeEvents}
						unit={Units.COUNT}
					/>
				</tbody>
			</table>
		</div>
	);
};

export default Output;
