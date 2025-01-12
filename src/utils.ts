export const generateDummyData = (chargePoints: number, multiplier: number) => {
	const data = [];
	for (let i = 0; i < chargePoints; i++) {
		const dailyProfile = Array.from(
			{ length: 24 },
			() => Math.random() * (multiplier / 100),
		);
		data.push(dailyProfile);
	}
	return data;
};
