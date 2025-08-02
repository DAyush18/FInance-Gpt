// Test script to verify smart number formatting logic
function formatLargeNumber(value) {
	if (value >= 1000000000) {
		return `${(value / 1000000000).toFixed(1)}B`;
	} else if (value >= 1000000) {
		return `${(value / 1000000).toFixed(1)}M`;
	} else if (value >= 100000) {
		return `${(value / 1000).toFixed(0)}K`;
	} else {
		return value.toLocaleString("en-US", {
			maximumFractionDigits: 0,
		});
	}
}

// Test cases
const testValues = [
	1000, 50000, 150000, 1000000, 5500000, 1200000000, 999999999,
];

console.log("Testing number formatting:");
testValues.forEach((value) => {
	console.log(`${value} => ${formatLargeNumber(value)}`);
});
