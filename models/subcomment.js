import mongoose from "mongoose";
const subcommentschema= new mongoose.Schema({
    subcomment: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
    date:{
        type: Date,
        default: Date.now(),
    },
})

const Subcomment=mongoose.model("Subcomments",subcommentschema);
export default Subcomment;