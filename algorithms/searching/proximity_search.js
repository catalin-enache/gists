
const getSearchWords = (searchTerm) => {
  return searchTerm.toLowerCase().trim().split(/\s+/);
};

export function filterEmployees(employees, searchTerm) {
  const searchWords = getSearchWords(searchTerm);

  const containsAnySearchWords = (name) => {
    const lowerName = name.toLowerCase();
    return searchWords.some((word) => lowerName.includes(word));
  };

  return employees.filter(
    (employee) =>
      containsAnySearchWords(employee.first_name) || containsAnySearchWords(employee.last_name),
  );
}

export function sortEmployees(employees, searchTerm) {
  const searchWords = getSearchWords(searchTerm);

  const getMinProximity = (name) => {
    const proximities = searchWords
      .map((word) => name.toLowerCase().indexOf(word))
      .map((index) => (index === -1 ? Infinity : index));
    return Math.min(...proximities);
  };

  employees.sort((a, b) => {
    const aFirstNameProximity = getMinProximity(a.first_name);
    const aLastNameProximity = getMinProximity(a.last_name);
    const bFirstNameProximity = getMinProximity(b.first_name);
    const bLastNameProximity = getMinProximity(b.last_name);

    // Closest proximities score for 'a' & 'b'
    const aProximity = Math.min(aFirstNameProximity, aLastNameProximity);
    const bProximity = Math.min(bFirstNameProximity, bLastNameProximity);

    const aName = `${a.first_name} ${a.last_name}`.toLowerCase();
    const bName = `${b.first_name} ${b.last_name}`.toLowerCase();

    if (!searchTerm) {
      return aName.localeCompare(bName);
    }

    // Sort primarily by the proximity score
    if (aProximity !== bProximity) {
      return aProximity - bProximity;
    }

    // If proximity scores are equal, prioritize by the firstName proximity
    if (aFirstNameProximity !== bFirstNameProximity) {
      return aFirstNameProximity - bFirstNameProximity;
    }

    // If firstName proximities are also equal, compare lastName proximities
    if (aLastNameProximity !== bLastNameProximity) {
      return aLastNameProximity - bLastNameProximity;
    }

    // If all proximities are equal, sort by name
    return aName.localeCompare(bName);
  });

  return employees;
}
