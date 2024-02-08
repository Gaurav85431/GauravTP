// Yaha pr hm JWT ko verify krne wala hun. i.e. Yadi token valid hoga to hm req.user pr apna khud ka koi custom property banakar hm apna khud ka data paas kar dunga., fir usko koi v easily access kar sakta hia.



// middleware me ek extra parameter paas karna padta hai i.e. next. Yani ki req, res, next. Jab tak hm next wala function ko call nhi karenge tab tak hmare routes ke aage wala pr i.e. authMiddleware ke aage wala (authroutes.user) per nhi jayega.(see auth-routes.js)

const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authMiddleware = async (req, res, next) => {

  const token = req.header('Authorization');
  // req.header hota hia aur React me headers hota hia api fetch krne time 

  if (!token) {

    // If expired token then Unauthorized HTTP request

    return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" })

  }
  console.log("Token from auth middleware is ", token);

  // next();//taki next wala call ho routes me ya jahan per middleware ka 




  // Yadi token is format me ho ki Bearer <Jwt token>. hm Bearer ko remove kr denge bcz hme token ko verify krana hai.
  //1st way
  // const jwtToken= token.replace('Bearer ','');

  // 2nd way
  const jwtToken = token.replace('Bearer', '').trim();

  console.log("Token from auth middleware without bearer is ", jwtToken);

  try {

    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

    // agar jwttoken and secret key match ho jata hai to hme hmara data milega

    console.log(isVerified);//o/p me { _id: '65bfd903b9c69ca6a503dab1', iat: 1707071794 } because jb token create ho rha thha to hm jwt.sign() me payload ke roop me id sirf pass kre thhe. see auth-controller.js Line 88.

    // Bad me hmne aur v chiz like email, isAdmin ko paas kra thha.


    // const userData = await User.findOne({ email: isVerified.email });
    // console.log("Verified data is  " + userData);
    /* o/p
 
                           Verified email is {
                       _id: new ObjectId('65bfd903b9c69ca6a503dab1'),
                       username: 'Gaurav',
                       email: 'gaurav1121@gmail.com',
                       mobile: '9874563214',
                       password: '$2a$10$9GE5gavmdlauYdTsC8e5xOERC6LXLUIKoSRkJS829d1h32Yzd1Bnq',
                       isAdmin: false,
                       __v: 0
                     }
 
     */


    //  Lekin hme password nhi chahiye-- to hm password me 0 laga dnge.
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log("Verified data is  " + userData);

    // ab hm khud ka custom property create kr rhe hai. i.e. hm req.user me userData ko paas kar rhe hai.

    req.user = userData;

    req.token = token; //ye wo token hai jo hme user se mil rha tha.
    req.userID = userData._id;

    // req.user ka koi v kvi v use kr skta hia jb middleware use kr rha hai to.


    // console.log("Requesstttttt  ", req);


    // Move on to the next middleware or route handler


    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Invalid token" });
  }



}
module.exports = authMiddleware;