const User = require("../models/user-model");
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');



// Home
const home = async (req, res) => {

  try {

    res.status(200).send("Welcome");


  } catch (error) {
    console.log(error);
  }

}

// register

const register = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      // return res.status(400).json({ msg: "Email already exists" });
      // Hmne msg ko message me change kiya kyonki Register.jsx file me hmne res_data.message kiya hai, to isliye taaki backend se ye message i.e. Email already exist chala jay
      return res.status(400).json({ message: "Email already exists" });
    }

    const dataStored = await User.create({
      username,
      email,
      mobile,
      password,
    });

    /*
        const myId = dataStored._id;
        const token = await jwt.sign({ _id: myId },
          process.env.JWT_SECRET_KEY)
    */
    //

    // hm jwt.sign() me jo v payload paas krenge, to jb hm token ko verify kr lete hia to wo data hme is tarah se mil jata hai.


    /* THIS IS NOT WORKING BECAUSE userExist will check old user, But we need new user ka data to show
        const myId = await userExist._id;
        console.log("988");
        const myEmail = await userExist.email;
        const myIsAdmin = await userExist.isAdmin;
        const token = await jwt.sign({ _id: myId, email: myEmail, isAdmin: myIsAdmin },
          process.env.JWT_SECRET_KEY)
    */

    const myId = await dataStored._id;
    const myEmail = await dataStored.email;
    const myIsAdmin = await dataStored.isAdmin;
    const token = await jwt.sign({ _id: myId, email: myEmail, isAdmin: myIsAdmin },
      process.env.JWT_SECRET_KEY)



    return res.status(200).json({
      message: "User registered",

      token: token,
      userId: dataStored._id.toString(),
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




// Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    // console.log("userexist-> ", userExist); //O/P: all details

    if (!userExist) {

      // res.status(400).send("Invalid Credential")
      // res.status(400).send({ message: "Invalid Credential" })
      res.status(400).json({ message: "Invalid Credential" })

    }
    else {

      // compare method declared and use here
      /* const userPassWord = await bcrypt.compare(password, userExist.password); */

      // compare method declared in user-model and use here
      const userPassWord = await userExist.comparePassword(password);

      if (userPassWord) {

        // token

        /*
        const myId = await userExist._id;
        // const token = await jwt.sign({ _id: myId },
        // process.env.JWT_SECRET_KEY)
          */

        /**** */

        // hm jwt.sign() me jo v payload paas krenge, to jb hm token ko verify kr lete hia to wo data hme is tarah se mil jata hai.

        // To hm jo v data yaha se pass karenge to jb token verify ho jayega to in response hme wo data milta hia. isAdmin Islliye kiya bcz hm pata laga ske hi wo admin hai ya nhi. email bcz is se hm mongodb me koi v query laga sakte hai ki ye email ka koi data exist or not.

        const myId = await userExist._id;
        const myEmail = await userExist.email;
        const myIsAdmin = await userExist.isAdmin;
        const token = await jwt.sign({ _id: myId, email: myEmail, isAdmin: myIsAdmin },
          process.env.JWT_SECRET_KEY)





        res.status(200).send({
          message: "Login Successful",
          token: token,
          userId: myId.toString()
        })
      }
      else {
        res.status(400).json({ message: "Invalid email or password" })
      }

    }

  } catch (error) {

    res.status(400).send("Internal server error")
  }
}


// USER LOGIC
// *---------------------
// User Logic= To send user data
// *---------------------

const user = async (req, res) => {


  try {




    const userData = req.user;
    // const userData = "gaurav";
    console.log("Userdata is ----", userData);

    return res.status(200).send({ userData });
    // res.status(200).send({ message: "Success", data: userData });

    // return res.status(200).json({ msg: userData });

    // res.status(200).json({ msg: "Hello Gaurav from User" });

  } catch (error) {

    console.log(`Error form the user routes ${error}`);


  }

}




module.exports = {
  home,
  register,
  login,
  user,

}
