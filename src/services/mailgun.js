const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

module.exports.sendResetEmail = async (user, token) => {
  console.log(user);
  if(process.env.NODE_ENV == "production"){
    try{
      this.sendEmail(
        user.email, 
        `Password reset for ${user.email}`, 
        `Visit members.utamobi.com/reset?token=${token} to reset your password. This message will expire in 30 minutes!`)
    }catch(err){
      throw err
    }
  }
}


// TODO: Fix this up with html
module.exports.sendEmail = async (email, subject, text) => {
  console.log(email, subject, text);
  const data = {
    from: 'uta.mobi@gmail.com',
    to: "koltensturgill92@gmail.com",
    subject: subject,
    text: text
  }

  try {
    await mailgun.messages().send(data)
  } catch (error) {
    throw error
  }
}

