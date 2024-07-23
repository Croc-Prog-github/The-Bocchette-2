/******
Further details on the license and usage guide are here: https://github.com/Croc-Prog-github/Probability-Manager.js
******/
class ProbabilityManager {
  constructor() {
    this.instances = {};
  }

  addList(instanceName, listName) {
    if (!this.instances[instanceName]) {
      this.instances[instanceName] = {};
    }
    if (!this.instances[instanceName][listName]) {
      this.instances[instanceName][listName] = { objects: [], totalWeight: 0 };
    }
  }

  addObject(instanceName, listName, object, probability) {
    if (!this.instances[instanceName] || !this.instances[instanceName][listName]) {
      throw new Error(`List or instance does not exist. Instance: ${instanceName}, List: ${listName}`);
    }

    const list = this.instances[instanceName][listName];

    // Se l'oggetto è un range
    if (typeof object === 'string' && object.includes('-')) {
      const [start, end] = object.split('-').map(Number);
      const rangeSize = end - start + 1;

      if (probability === "auto_DirectProp") {
        let totalWeight = 0;
        for (let i = start; i <= end; i++) {
          const prop = (i - start + 1) / rangeSize * 100;
          totalWeight += prop;
          list.objects.push({ object: i, probability: prop });
        }
        list.totalWeight += totalWeight;
      } else if (probability === "auto_InversProp") {
        let totalWeight = 0;
        for (let i = start; i <= end; i++) {
          const prop = (end - i + 1) / rangeSize * 100;
          totalWeight += prop;
          list.objects.push({ object: i, probability: prop });
        }
        list.totalWeight += totalWeight;
      } else {
        throw new Error(`Invalid probability type for range objects. Instance: ${instanceName}, List: ${listName}`);
      }
    } else {
      // Se l'oggetto non è un range
      if (typeof probability === 'number') {
        list.objects.push({ object, probability });
        list.totalWeight += probability;

        // Verifica che la somma delle probabilità non superi 100
        if (list.totalWeight > 100) {
          throw new Error(`The sum of the probabilities is greater than 100%. Instance: ${instanceName}, List: ${listName}`);
        }
      } else {
        throw new Error(`Invalid probability type for single object. Instance: ${instanceName}, List: ${listName}`);
      }
    }
  }

  getRandomObject(instanceName, listName) {
    if (!this.instances[instanceName] || !this.instances[instanceName][listName]) {
      throw new Error(`List or instance does not exist. Instance: ${instanceName}, List: ${listName}`);
    }

    const list = this.instances[instanceName][listName];
    let random = Math.random() * list.totalWeight;

    for (let { object, probability } of list.objects) {
      if (random < probability) {
        return object;
      }
      random -= probability;
    }

    throw new Error(`Failed to get random object. Instance: ${instanceName}, List: ${listName}`);
  }

  clearInstance(instanceName) {
    if (this.instances[instanceName]) {
      delete this.instances[instanceName];
    } else {
      throw new Error(`Instance does not exist. Instance: ${instanceName}`);
    }
  }

  clearAll() {
    this.instances = {};
  }

  toArray() {
    const result = [];
    for (const [instanceName, lists] of Object.entries(this.instances)) {
      for (const [listName, list] of Object.entries(lists)) {
        for (const { object, probability } of list.objects) {
          result.push([instanceName, listName, object, probability]);
        }
      }
    }
    return result;
  }

  toArrayForInstance(instanceName) {
    const result = [];
    const lists = this.instances[instanceName];
    if (!lists) {
      throw new Error(`Instance does not exist. Instance: ${instanceName}`);
    }
    for (const [listName, list] of Object.entries(lists)) {
      for (const { object, probability } of list.objects) {
        result.push([instanceName, listName, object, probability]);
      }
    }
    return result;
  }
}