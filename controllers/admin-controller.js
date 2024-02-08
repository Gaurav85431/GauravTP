const User = require('../models/user-model');
const Contact = require('../models/contact-models');


const getAllUsers = async (req, res) => {

  try {
    // const users = await User.find();// It will show o/p with password;

    // show o/p without password
    const users = await User.find({}, { password: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No such user found" })
    }

    return res.status(200).json(users)


  } catch (error) {
    next(error); // isse error middleware me jayega aur wo aage frontEnd ko forward kar dega.
  }

}


const getAllContacts = async (req, res) => {
  try {

    const contact = await Contact.find();

    if (!contact || contact.length === 0) {
      return res.status(404).json({ message: "No contact found" });
    }
    return res.status(200).json(contact);

  } catch (error) {

  }
}



//-------------------
// delete User By Id
//-------------------
const deleteUserById = async (req, res) => {

  try {

    // hme ID mil rha hai, hme find karna hai ki wo id kis document se match hota hai jisse match hua to hm usko delete kar denge collection se.

    // Get userId  jo ki front end se aa rha hia.
    // URL SE KOI DATA PAAS KR RHA HAI TO USKO HM req.params.id se get kar sakte hai. '.id' islliye likhe hai bcz admin-router.js me hm likhen hai router.delete('/users/delete/:id) 

    const id = req.params.id;
    await User.deleteOne({ _id: id });

    return res.status(200).json({ message: "user deleted successfully" })


  } catch (error) {
    // console.log(error);
    next(error) //taki hmara error error-middleware ko chale jau
  }

}

// ---------------------
// GET user by ID it will use to update that user from admin
// ---------------------

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;// bcz hmne routes me id likha hai. so req.params.id
    const data = await User.findOne({ _id: id }, { password: 0 });// hme password ko chhod kr sara data chahiye.
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

// ---------------
// Update User
// ---------------

const updateUserById = async (req, res) => {
  try {

    // hme getUserById se ID mil rhi hai to hm ye dekhenge ki kis user ki baat ho rhi hai. To find user.
    const id = req.params.id;

    // update button pr click krne pr jo data hai usko hme get karna hia.
    const updatedUserData = req.body;//Jo data frontend se update krne pr aa rha hia usko updatedUserData me get karenge.

    // update data
    const updatedData = await User.updateOne({ _id: id }, {
      $set: updatedUserData
    })

    return res.status(200).json(updatedData);

  } catch (error) {
    // console.log(error);
    next(error);//bcz error middleware hm use kr rhe hia.
  }
}


// 

//-------------------
// delete contact By Id
//-------------------
const deleteContactById = async (req, res) => {

  try {

    // id is the id of message.
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });

    return res.status(200).json({ message: "contact deleted successfully" })


  } catch (error) {
    next(error) //taki hmara error error-middleware ko chale jau
  }

}



// 


module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById
}