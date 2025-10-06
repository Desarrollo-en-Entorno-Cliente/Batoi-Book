import Module from './module.class.js';

export default class Modules {
  constructor(data = []) {
    this.data = [];
    this.populate(data);
  }

  populate(data) {
    this.data = data.map(d => new Module(d.code, d.cliteral, d.vliteral, d.courseId));
  }

  getModuleByCode(code) {
    const module = this.data.find(m => m.code === code);
    if (!module) throw new Error(`Module with code ${code} not found`);
    return module;
  }

  toString() {
    return this.data.map(m => m.toString()).join('\n');
  }
}
