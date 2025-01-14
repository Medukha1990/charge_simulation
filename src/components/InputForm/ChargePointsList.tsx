import { Units } from '../../constants';
import InputField from './InputField';

const ChargePointsList = ({
	chargePoints,
	onAdd,
	onChange,
	onRemove,
}: {
	chargePoints: { count: number; power: number }[];
	onAdd: () => void;
	onChange: (index: number, field: 'count' | 'power', value: number) => void;
	onRemove: (index: number) => void;
}) => (
	<>
		<div className='flex flex-col w-3/6'>
			{chargePoints.map((point, index) => (
				<div key={index} className='flex flex-col '>
					<div className='flex flex-col'>
						<div className=' border-orange-200 border-t-2'>
							<InputField
								label={`Charge Point`}
								value={point.count}
								onChange={(value) =>
									onChange(index, 'count', value)
								}
								unit={Units.COUNT}
							/>

							<InputField
								label={`Power`}
								value={point.power}
								onChange={(value) =>
									onChange(index, 'power', value)
								}
								unit={Units.POWER}
							/>
						</div>
					</div>
					{index > 0 && (
						<div className='flex justify-between'>
							<div></div>
							<button
								type='button'
								onClick={() => onRemove(index)}
								className='border border-gray-300 rounded px-4 py-2 mt-2 mb-2 ml-2 bg-red-500 text-white'
							>
								Delete
							</button>
						</div>
					)}
				</div>
			))}
			<div>
				<button
					type='button'
					onClick={onAdd}
					className='border border-gray-300 rounded px-4 py-2 mt-2'
				>
					Add Charge Point
				</button>
			</div>
		</div>
	</>
);
export default ChargePointsList;
