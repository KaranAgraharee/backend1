import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel} from '../model/User.js'
import Lodge from '../model/Lodge.js'


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(409).json({
                message: 'User is already exist, you can login',
                success: false
            })
        }
        const userModel = new UserModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save()
        res.status(201).json({
            message: 'singup sucessfully',
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error yaha h',
            error: error.message,
            success: false
        })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        const errormessage = 'Auth failed email or password is wrong'
        if (!user) {
            return res.status(409).json({
                message: 'User not found',
                success: false
            })
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            return resolveConfig.status(403).json({
                message: errormessage,
                success: false
            })
        }
        const jwttoken = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
        )
        res.cookie('Auth_Token', jwttoken, {
            httpOnly: true,
            maxAge: 7200000,
            secure: false, 
            sameSite: 'none'
        })
        res.status(200).json({
            message: 'Login sucessfully',
            success: true,
            jwttoken,
            email,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            message: 'error yaha hai catch k pass',
            success: false,
            error: error.message
        })
    }

}
export const getProfile = async (req, res) => {
    const token = req.cookies.Auth_Token
    try {
        if (token) {
            return res.status(200).json({ message: 'Token foumd', token })
        }
        else if (!token) {
            return res.status(401).json({ message: 'Unauthorized, no token found' })
        }
    } catch (error) {
        console.log(error)
    }
}
export const createLodge = async (req, res) => {
  try {
    const { name, address, amenities, monthlyRent, city } = req.body;

    // Create a new lodge entry
    const lodge = new Lodge({
      name,
      address,
      amenities,
      monthlyRent,
      city,
    });

    // Save the lodge to the database
    const savedLodge = await lodge.save();

    res.status(201).json({
      success: true,
      message: 'Lodge created successfully!',
      data: savedLodge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lodge',
      error: error.message,
    });
  }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie('Auth_Token')
        res.json({ message: 'Logged Out Sucessfully' })
    } catch (error) {
        console.log(error)
    }
}