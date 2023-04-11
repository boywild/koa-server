function findMember(instance, { prefix, specifiedType, filter }) {
  const shouldKeep = (k) => {
    if (filter) {
      return filter(k)
    }
    if (prefix && k.startsWith(prefix)) {
      return true
    }
    if (specifiedType && instance[k] instanceof specifiedType) {
      return true
    }
    return false
  }

  // eslint-disable-next-line no-shadow
  const loop = (instance) => {
    // eslint-disable-next-line no-proto
    if (instance.__proto__ === null) return []
    let keys = Reflect.ownKeys(instance)
    if (filter) {
      keys = keys.filter((ele) => shouldKeep(ele))
    }
    // eslint-disable-next-line no-proto
    return [...keys, ...loop(instance.__proto__)]
  }

  return loop(instance)
}

module.exports = { findMember }