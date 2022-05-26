import { reactive, isReactive } from '../reactive';
describe('reactive', () => {
  it('happy path', () => {
    const original = {
      fz: 1
    };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(original.fz).toBe(1);
    expect(isReactive(original)).toBe(false);
    expect(isReactive(observed)).toBe(true);
  });
});