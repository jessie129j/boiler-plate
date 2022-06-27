const mongoose=require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const contentSchema=mongoose.Schema({
    userId:String,
    title:String,
    description:String,
    date:{
        type:Date,
        default:Date.now
    },
    seq:Number
});

contentSchema.plugin(autoIncrement.plugin,{
	model : 'Content',
	field : 'seq',
	startAt : 1, //시작 
	increment : 1 // 증가
});


const Content=mongoose.model('Content',contentSchema);
module.exports={Content};
