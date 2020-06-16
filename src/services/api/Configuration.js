const API_BASE_URL = __DEV__ ? 'https://api-test.mybodypass.de/api/v2' : 'https://app-api.mybodypass.de/api/v2'

const Configuration = {
  // user profile API URL
  API_USER_PROFILE_URL: API_BASE_URL + '/profile',

  // authentication, authorization and registration
  API_LOGIN_URL: API_BASE_URL + '/login',
  API_REGISTER_URL: API_BASE_URL + '/register',
  API_REGISTER_ANO_URL: API_BASE_URL + '/register-anonymously',
  API_FORGOT_PASSWORD_URL: API_BASE_URL + '/password/forgot',
  API_UPDATE_USER_PROFILE: API_BASE_URL + '/profile',
  API_UPDATE_USER_UPDATE_PASSWORD: API_BASE_URL + '/profile/password',
  API_RESEND_CONFIRMATION_EMAIL: API_BASE_URL + '/register/resend-email',
  API_GET_MANAGED_ACCOUNTS: API_BASE_URL + '/connections/managing',
  API_ADD_MANAGED_ACCOUNT: API_BASE_URL + '/connections',
  API_DEACTIVATE_ACCOUNT: API_BASE_URL + '/deactivate',
  API_USER_SET_COVID_POSITIVE: API_BASE_URL + '/profile/red-self-medical-status',

  API_USER_MANAGED_ACCOUNT_ROOT: API_BASE_URL + '/connections/managing',

  // API_LOCATION_CHECKIN: API_BASE_URL + '/checkins/location'
  // API_CITIZEN_CHECKIN: API_BASE_URL + '/checkins/citizen'
  API_CHECKIN: API_BASE_URL + '/checkins',
  API_LOCATION_CHECKOUT: API_BASE_URL + '/location-checkout',
  API_LIST_CHECKINS: API_BASE_URL + '/checkins',
  API_GUESTLIST_DATA: API_BASE_URL + '/citizen-personal-data',

}

export default Configuration
