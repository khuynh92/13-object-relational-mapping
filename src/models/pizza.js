'use strict';

import mongoose from 'mongoose';

const pizzaSchema = mongoose.Schema ({
  type: {type:String, required:true},
  toppings: {type:String, required:true},
});

export default mongoose.model('pizza', pizzaSchema);