const sendToken = (user, statusCode, resp) =>{
    const token = user.getJWTToken();

    //cookie options

    const options = {
        httpOnly:true,
        expire: new Date(Date.now + process.env.COOKIE_EXPIRE*24*60*60*100)
    }

  resp.status(statusCode).cookie('token', token, options).json({
    token,
    success: true,
    user
  });
}

module.exports = sendToken;