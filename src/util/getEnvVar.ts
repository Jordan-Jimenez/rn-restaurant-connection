const getEnvVar = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Could not find environment variable ${key}`);
  }

  return value;
};

export default getEnvVar;
