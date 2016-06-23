import {VirtualContext} from '../lib/virtual_context/VirtualContext';
import * as path from 'path';

describe('virtual context', () => {

  beforeEach(() => {
    this.virtualContext = new VirtualContext();
  });

  it('should properly resolve the exports from the virtual machine', () => {

    let filePath = path.normalize(__dirname + '/fixtures/fake-virtual-context.js');
    let exports = this.virtualContext.run(filePath);

    // The external file, which will be included inside of the fake file, will export an
    // array with all numbers from zero to 49;
    expect(exports.numbers.length).toBe(50);
  });

  it('should properly set the globals', () => {

    let filePath = path.normalize(__dirname + '/fixtures/fake-virtual-context.js');

    let exports = this.virtualContext.run(filePath);

    expect(path.normalize(exports.module.filename)).toBe(filePath);
    expect(path.normalize(exports.__filename)).toBe(filePath);
    expect(path.normalize(exports.__dirname)).toBe(path.dirname(filePath));
    expect(exports.require).toBeTruthy();
  });

});