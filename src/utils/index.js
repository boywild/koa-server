function findMember(instance, { prefix, specifiedType, filter }) {
  const _shouldKeep = (k) => {
    if (filter) {
      return filter(k)
    }
    if (prefix && k.startsWith(prefix)) {
      return true
    }
    if (specifiedType && instance[k] instanceof specifiedType) {
      return true
    }
  }

  const _loop = (instance) => {
    if (instance.__proto__ === null) return []
    let keys = Reflect.ownKeys(instance)
    if (filter) {
      keys = keys.filter((ele) => _shouldKeep(ele))
    }
    return [...keys, ..._loop(instance.__proto__)]
  }

  return _loop(instance)
}

module.exports = { findMember }
