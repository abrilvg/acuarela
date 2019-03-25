const IDGenerator = {
  /**
   * Creates a string that can be used for dynamic id attributes
   * Example: "id-so7567s1pcpojemi"
   * @returns {string}
   */
  generateId: () => {
      return 'id-' + Math.random().toString(36).substr(2, 16);
  }
};

export default IDGenerator;
