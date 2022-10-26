const mongoose = require('mongoose')

const breakfastFoodSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		isSweet: {
			type: Boolean,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('BreakfastFood', breakfastFoodSchema)