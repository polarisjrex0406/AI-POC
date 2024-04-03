const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const mongoose = require('mongoose');

const shortid = require('shortid');
const { generate: uniqueId } = require('shortid');

const register = async (req, res, { userModel }) => {
  const UserPassword = mongoose.model(userModel + 'Password');
  const User = mongoose.model(userModel);
//   const { password, userId, resetToken } = req.body;
  const { name, email, password, country } = req.body;

  // Break full name into first name and last name
  let fullname = name.trim();
  const lastSpaceIndex = fullname.lastIndexOf(' ');
  const firstname = lastSpaceIndex > 0 ? fullname.substring(0, lastSpaceIndex - 1) : fullname;
  const lastname = lastSpaceIndex > 0 ? fullname.substring(lastSpaceIndex + 1, fullname.length) : null;

  const user = await User.findOne({ name: firstname, email: email }).exec();
  if (!user) {
    const result = await User.create({
        email: email,
        name: firstname,
        surname: lastname,
    });
    const newUserPassword = new UserPassword();
    const salt = uniqueId();
    const passwordHash = newUserPassword.generateHash(salt, password);
    await UserPassword.create({
        password: passwordHash,
        salt: salt,
        user: result._id
    });

    return res.status(200).json({
      success: true,
      result: {
        _id: result._id,
        name: name,
        email: email
      },
      message:
        'account registered successfully.',
    });
  }

  const databasePassword = await UserPassword.findOne({ user: userId, removed: false });
//   const user = await User.findOne({ _id: userId, removed: false }).exec();

  if (!user.enabled && user.role === 'owner') {
    const settings = useAppSettings();
    const idurar_app_email = settings['idurar_app_email'];
    const idurar_base_url = settings['idurar_base_url'];

    const url = checkAndCorrectURL(idurar_base_url);

    const link = url + '/verify/' + user._id + '/' + databasePassword.emailToken;

    await sendMail({
      email,
      name: user.name,
      link,
      idurar_app_email,
      emailToken: databasePassword.emailToken,
    });

    return res.status(403).json({
      success: false,
      result: null,
      message:
        'your email account is not verified , check your email inbox to activate your account',
    });
  }

  if (!user.enabled)
    return res.status(409).json({
      success: false,
      result: null,
      message: 'your account is disabled, contact your account adminstrator',
    });

  if (!databasePassword || !user)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No account with this email has been registered.',
    });

  const isMatch = resetToken === databasePassword.resetToken;
  if (!isMatch || databasePassword.resetToken === undefined || databasePassword.resetToken === null)
    return res.status(403).json({
      success: false,
      result: null,
      message: 'Invalid reset token',
    });

  // validate
  const objectSchema = Joi.object({
    password: Joi.string().required(),
    userId: Joi.string().required(),
    resetToken: Joi.string().required(),
  });

  const { error, value } = objectSchema.validate({ password, userId, resetToken });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: 'Invalid reset password object',
      errorMessage: error.message,
    });
  }

  const salt = shortid.generate();
  const hashedPassword = bcrypt.hashSync(salt + password);
  const emailToken = shortid.generate();

  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  await UserPassword.findOneAndUpdate(
    { user: userId },
    {
      $push: { loggedSessions: token },
      password: hashedPassword,
      salt: salt,
      emailToken: emailToken,
      resetToken: shortid.generate(),
      emailVerified: true,
    },
    {
      new: true,
    }
  ).exec();

  if (
    resetToken === databasePassword.resetToken &&
    databasePassword.resetToken !== undefined &&
    databasePassword.resetToken !== null
  )
    return res
      .status(200)
      .cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'Lax',
        httpOnly: true,
        secure: false,
        domain: req.hostname,
        path: '/',
        Partitioned: true,
      })
      .json({
        success: true,
        result: {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          role: user.role,
          email: user.email,
          photo: user.photo,
        },
        message: 'Successfully register user',
      });
};

module.exports = register;
