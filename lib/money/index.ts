export const getCurrencyString = (amount: number | undefined) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(amount || 0)
}