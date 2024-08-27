import _ from "lodash";

// This will compare two objects and return the keys that are different
export default function getObjectDiff(obj1: object, obj2: object) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
    } else if (
      _.isEqual(obj1[key as keyof object], obj2[key as keyof object])
    ) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));

  return diff;
}
