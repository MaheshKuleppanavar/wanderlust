const mongoose=require('mongoose');
const Listing=require('../models/listing.js');
const initData=require('./data.js');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main().then(()=>{
    console.log('Connected Succesfully🔗');
}).catch(err=>{
    console.log(err);
})
console.log('Data',initData)
async function initDB() {
    try{
        await Listing.deleteMany({});
        initData.data=initData.data.map((obj)=>({...obj,owner:'6966680ed798d0a50026aade'}));
        let listings=await Listing.insertMany(initData.data);
        console.log('Data inserted',listings)
    }
    catch(err){
        console.log(err);
    }
}

initDB();