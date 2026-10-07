/**
 * Create the first admin user.
 * Usage: node scripts/seed-admin.js
 * Requires MONGODB_URI in .env (load via dotenv or set in shell)
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@acewavenet.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123456';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Ace Wave Admin';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  { timestamps: true }
);

async function main() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is required in .env');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12);

  if (existing) {
    existing.role = 'admin';
    existing.password = hashed;
    existing.name = ADMIN_NAME;
    await existing.save();
    console.log('Updated existing user to admin:', ADMIN_EMAIL);
  } else {
    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      password: hashed,
      role: 'admin',
    });
    console.log('Admin user created:', ADMIN_EMAIL);
  }

  console.log('Password:', ADMIN_PASSWORD);
  console.log('Login at /login then you will be redirected to /admin');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
