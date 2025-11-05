import bcrypt from 'bcryptjs';

/**
 * Hash a password
 * @param {string} password - The plain text password
 * @returns {Promise<string>} The hashed password
 */
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 * @param {string} password - The plain text password
 * @param {string} hash - The hashed password
 * @returns {Promise<boolean>} True if password matches
 */
export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/**
 * Validate admin credentials
 * @param {string} password - The password to validate
 * @returns {boolean} True if credentials are valid
 */
export function validateAdminPassword(password) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return false;
  }

  return password === adminPassword;
}

/**
 * Generate a simple session token
 * @returns {string} A random session token
 */
export function generateSessionToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Validate session from cookies
 * @param {object} cookies - The cookies object
 * @returns {boolean} True if session is valid
 */
export function isAuthenticated(cookies) {
  return cookies.get('admin-session')?.value === 'authenticated';
}
