// packages/core/src/matchmaker/driver/api.ts
function getLockId(filterOptions) {
  return Object.keys(filterOptions).map((key) => `${key}:${filterOptions[key]}`).join("-");
}
export {
  getLockId
};
