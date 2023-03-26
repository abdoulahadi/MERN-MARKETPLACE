module.exports = mongoose => {
    var userSchema = mongoose.Schema(
      {
        username: {
          type: String,
          unique:true,
          required: true,
        },
        
        mail:{
          type: String,
          required:true,
        },
        password: {
          type: String,
          required: true,
        },

      },
  
      /** 
      *Avec timestamp, on a deux attributs de plus qui on comme nom:
      * createdAt, updatedAt
      */
      { timestamps: true }
    );
  
    userSchema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", userSchema);
    return User;
  };
  