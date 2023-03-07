import { Profile, ValidateProfileError } from "../../types/profile";

export const validateProfileData = (profile: Profile | undefined) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const { name, lastname, age, country } = profile;

  const errors: ValidateProfileError[] = [];

  if (!name || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }

  return errors;
};
