/******
Further details on the license and usage guide are here: https://github.com/Croc-Prog-github/Probability-Manager.js
******/
declare module "https://raw.githubusercontent.com/Croc-Prog-github/Probability-Manager.js/main/core/Probability-Manager.js" {
  type ProbabilityType = number | 'auto_DirectProp' | 'auto_InversProp';
  
  class ProbabilityManager {
    constructor();
    addList(instanceName: string, listName: string): void;
    addObject(instanceName: string, listName: string, object: string, probability: ProbabilityType): void;
    getRandomObject(instanceName: string, listName: string): string | number;
    clearInstance(instanceName: string): void;
    clearAll(): void;
    toArray(): void;
    toArrayForInstance(instanceName: string): void
  }
  
  export default ProbabilityManager;
}