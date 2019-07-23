const rules = {
  visitor: {
    static: []
  },
  user: {
    static: [
      "acuarelas:create"
    ],
    dynamic: {
      "acuarelas:edit": ({userId, postOwnerId}) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
      "acuarelas:remove": ({userId, postOwnerId}) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
      "myAcuarelas:list": ({userId, postOwnerId}) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      }
    }
  },
  admin: {
    static: [
      "acuarelas:create",
      "acuarelas:edit",
      "acuarelas:remove",
      "myAcuarelas:list",
    ]
  }
};

export default rules;
