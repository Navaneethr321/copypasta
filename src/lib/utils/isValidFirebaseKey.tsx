const isValidFirebaseKey = (key: string) => (
  key.search(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/) === -1
);

export default isValidFirebaseKey;