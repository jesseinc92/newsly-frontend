const changeCamelNames = (category) => {
  switch (category) {
    case 'usNews':
      category = 'US News';
      break;
    case 'worldNews':
      category = 'World News';
      break;
    case 'all':
      category = 'of everything';
      break;
    default:
      category = category.charAt(0).toUpperCase() + category.slice(1);
      break;
  }

  return category;
}

export default changeCamelNames;