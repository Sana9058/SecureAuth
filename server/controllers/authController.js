const User = require('../models/User');
const generateAccessToken = require('../utils/generateAccessToken');
const generateRefreshToken = require('../utils/generateRefreshToken');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please login.',
      });
    }

    await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please login.',
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please login.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration.',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login.',
    });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required.',
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token. Please login again.',
      });
    }

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token. Please login again.',
      });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Access token refreshed.',
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during token refresh.',
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.refreshToken = null;
      await user.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during logout.',
    });
  }
};

const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          createdAt: req.user.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching profile.',
    });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getProfile,
};
