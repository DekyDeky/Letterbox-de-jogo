export const validateEmail = (email : string) => {
  const normalizedEmail = email.trim().toLowerCase();
  console.log(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail))
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
};