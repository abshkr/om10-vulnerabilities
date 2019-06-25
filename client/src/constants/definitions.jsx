const FLOW_CONTROL_PRIORITY = [
  {
    key: "LILO",
    value: "LILO (Last in / Last out)"
  },
  {
    key: "LIFO",
    value: "LIFO (Last in / First out)"
  }
];

const ROLE_DEFINITIONS = {
  0: "Access Denied",
  1: "Read Only",
  2: "Read & Write Only",
  3: "Full Access",
  4: "Super Access"
};

export { FLOW_CONTROL_PRIORITY, ROLE_DEFINITIONS };
