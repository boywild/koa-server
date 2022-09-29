function findMember(instance, { filter, prefix, specifiedType }) {
  function _find(obj) {
    if (Object.getPrototypeOf(obj) === null) return []
    let names = Object.getOwnPropertyNames(obj)
    // console.log(names)
    names = names.filter((name) => _shouldKeep(name))

    return [...names, ..._find(Object.getPrototypeOf(obj))]
  }

  function _shouldKeep(k) {
    if (filter && typeof filter === 'function') {
      return filter(k)
    }
    if (prefix && k.startsWith(prefix)) {
      return true
    }
    if (specifiedType && instance[k] instanceof specifiedType) {
      return true
    }
  }

  return _find(instance)
}

module.exports = { findMember }
