const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
          values: ["ignored", "interested", "accepted", "rejected"],
          message: '{values} is not supported',
        },
    },
  },
    {
        timestamps: true,
    }
);


// creating compound index for fromUserId and toUserId
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });


// pre save hook to check if the fromUserId and toUserId are the same
connectionRequestSchema.pre('save', async function (next) {
  const connectionRequest = this;
  // check if the fromUserId and toUserId are the same
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error('fromUserId and toUserId cannot be the same');
  }
  next();
});




const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;