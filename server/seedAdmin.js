/**
 * seedAdmin.js — Run once to create the admin account in MongoDB.
 * Usage: node seedAdmin.js
 *
 * Change ADMIN_EMAIL and ADMIN_PASSWORD before running.
 */

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from './models/User.js';

const ADMIN_EMAIL    = 'admin@villageconnect.com';
const ADMIN_PASSWORD = 'Admin@1234';
const ADMIN_NAME     = 'Admin';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      if (existing.role === 'admin') {
        console.log('⚠️  Admin already exists:', existing.email);
      } else {
        // Promote to admin if the account exists as a villager
        existing.role = 'admin';
        await existing.save();
        console.log('✅ Existing user promoted to admin:', existing.email);
      }
    } else {
      await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin',
      });
      console.log('✅ Admin account created successfully!');
      console.log('   Email   :', ADMIN_EMAIL);
      console.log('   Password:', ADMIN_PASSWORD);
    }
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

seed();
