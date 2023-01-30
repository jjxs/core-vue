import { reactive, isReactive, isProxy } from '../src/reactive';
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
    expect(isProxy(observed)).toBe(true);
  });

  test("nested reactives", () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    };
    const observed = reactive(original);
    expect(isReactive(observed.nested)).toBe(true);
    expect(isReactive(observed.array)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
  });
});

