const mongoose =  require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {
	type: String,
	required: true,
    },
    description: String,
    completed: {
	type: Bolean,
	default: false,
    },
});

module.exports = mongoose.model('Todo', todoSchema);
