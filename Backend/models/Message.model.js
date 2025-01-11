import mongoose from "mongoose";
import User from "./User.model.js";

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
        validate: [
            {
                validator: (value) => value.length > 0,
                message: 'Message Cannot Be Empty',
            },

        ]
    }

}, { timestamps: true })

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;