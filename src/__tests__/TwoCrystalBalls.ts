import two_crystal_balls from "@code/TwoCrystalBalls";

describe("two crystal balls", () => {
    test("breaks at random position", () => {
        let idx = Math.floor(Math.random() * 10000);
        const data = new Array(10000).fill(false);

        for (let i = idx; i < 10000; ++i) {
            data[i] = true;
        }

        expect(two_crystal_balls(data)).toEqual(idx);
    });

    test("it does not break", () => {
        expect(two_crystal_balls(new Array(821).fill(false))).toEqual(-1);
    });

    test("it breaks at the first position", () => {
        expect(two_crystal_balls(new Array(100).fill(true))).toEqual(0);
    });
    test("it breaks at the last position", () => {
        let data = new Array(100).fill(false);
        data[data.length - 1] = true;

        expect(two_crystal_balls(data)).toEqual(99);
    });
});
