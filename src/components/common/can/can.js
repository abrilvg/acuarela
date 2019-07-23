import rules from '../../../rbac-rules';

const check = (rules, role, action, data) => {
  let showComponent = false; //TODO refactor to have less 
  //code and dont show component as default
  const permissions = rules[role];
  if (!permissions) {
    return false;
  }

  const staticPermissions = permissions.static;
  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }

  const dynamicPermissions = permissions.dynamic;
  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

const Can = props =>
  check(rules, props.role, props.perform, props.data) ? props.yes() : {};

Can.defaultProps = {
  yes: () => null
};

export default Can;