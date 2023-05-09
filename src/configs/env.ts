function requireEnv(env: unknown) {
  console.log(env);
  if (typeof window === 'undefined' && !env) {
    throw new Error(
      '[MISSING ENV VARIABLE] - please check your .env.local or .env file!',
    );
  }

  return env as string;
}

// make env variables to be "Fail Fast!" on server with requireEnv
const env = {
  // required env
  nodeEnv   : requireEnv(process.env.NODE_ENV),
  apiBaseURL: requireEnv(process.env.NEXT_PUBLIC_API_BASE_URL),
  // optional env, mostly for development
  apiMockingEnabled : process.env.NEXT_PUBLIC_API_MOCKING          === 'true',
  reactQueryDevTools: process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS === 'true',
};

export default env;
