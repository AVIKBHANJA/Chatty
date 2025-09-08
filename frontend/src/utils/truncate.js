function truncateString(str) {
    return str.length > 16 ? str.slice(0, 16) + "..." : str;
  }

  export default truncateString;