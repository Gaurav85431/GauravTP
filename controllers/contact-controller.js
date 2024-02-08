const contact = require('../models/contact-models')
const contactForm = async (req, res) => {

  try {

    const response = req.body;

    await contact.create(response);

    return res.status(200).json({ message: "Message send successfully" })

  } catch (error) {
    // res.send(error.message);
    return res.status(400).json({ message: "Internal server error" })
  }



}
module.exports = { contactForm };