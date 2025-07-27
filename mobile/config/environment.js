/**
 * Environment configuration for BuildFit mobile app
 */

const ENV = {
  development: {
    API_BASE_URL: 'http://localhost:3000/api/v1',
    WS_URL: 'ws://localhost:3000',
    ENVIRONMENT: 'development',
    DEBUG: true,
    LOG_LEVEL: 'debug',
  },
  staging: {
    API_BASE_URL: 'https://api-staging.buildfit.app/api/v1',
    WS_URL: 'wss://api-staging.buildfit.app',
    ENVIRONMENT: 'staging',
    DEBUG: true,
    LOG_LEVEL: 'info',
  },
  production: {
    API_BASE_URL: 'https://api.buildfit.app/api/v1',
    WS_URL: 'wss://api.buildfit.app',
    ENVIRONMENT: 'production',
    DEBUG: false,
    LOG_LEVEL: 'error',
  },
};

const getEnvironment = () => {
  // You can set this via build configurations or environment variables
  const environment = __DEV__ ? 'development' : 'production';
  return ENV[environment] || ENV.development;
};

export default getEnvironment();
