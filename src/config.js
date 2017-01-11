
const dev = {
  PAYMENTS_SERVER: 'https://arcane-ridge-17730.herokuapp.com/',
  STRIPE_PUBLIC_KEY: 'pk_test_3mN7EmjOlXkVjjZISQG4xq3J',
  FIREBASE_API_KEY: 'AIzaSyA-4UQyJ2wfj9OfgX4zkTQeFscFxGQ_agE',
  FIREBASE_DATABASE_URL: 'https://hoops-21a72.firebaseio.com',
  FIREBASE_STORAGE_BUCKET: 'hoops-21a72.appspot.com',
  GOOGLE_PLACES_API_KEY: 'AIzaSyBopRDu051G9W6fqJCwGgzxGICzhzuUxIg',
  REDUCER_VERSION: '102',
};

const prod = {
  PAYMENTS_SERVER: 'https://hoops-us-149010.appspot.com/',
  STRIPE_PUBLIC_KEY: 'pk_test_QkhKNXx4BFg7TmyOl7fEyR0E',
  FIREBASE_API_KEY: 'AIzaSyBLk4Cz8aQU3XaQWJJtvMtqkVcMm2UUBc8',
  FIREBASE_DATABASE_URL: 'https://hoops-us-149010.firebaseio.com',
  FIREBASE_STORAGE_BUCKET: 'hoops-us-149010.appspot.com',
  GOOGLE_PLACES_API_KEY: 'AIzaSyBLk4Cz8aQU3XaQWJJtvMtqkVcMm2UUBc8',
  REDUCER_VERSION: '102',
  //Bugsnag is only enabled when the API key is given
  BUGSNAG_API_KEY: '25983a784e900e85ae661a2e5685d61a',
};

export default __DEV__ ? dev : prod;
