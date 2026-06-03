export const validateStep1 = {
  validateFullName (value) {
    if (value.trim() === "") {
      return "field can not be empty";
    } else if (value.trim().length < 5) {
      return "too short";
    }
  },

 validateUserName(value) {
    if (value.trim() === "") {
      return "field can not be empty";
    } else if (value.trim().length > 8) {
      return "too long";
    }
  },

  validateAddressAndOccupation(value) {
    if (value.trim() === "") {
      return "field can not be empty";
    } else if (value.trim().length < 8) {
      return "too short";
    }
  }
}

export const validateStep2 = {
  validateReferralSource(value) {
    if (!value) {
      return "Please select an option";
    }

    return "";
  },

  validateMarketingMode(value) {
    if (!value || value.length === 0) {
      return "Please select at least one marketing method";
    }

    return "";
  },

  validateVisitedOffice(value) {
    if (!value) {
      return "Please select yes or no";
    }

    return "";
  },
};