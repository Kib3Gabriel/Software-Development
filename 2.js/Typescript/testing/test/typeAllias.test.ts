import { getRectangleArea, getRectanglePerimeter } from '../src/typeAllias'; // Adjust the import path as necessary

describe('Rectangle Functions', () => {
  const rectangle = { width: 5, height: 10 };

  test('should calculate the area of a rectangle', () => {
    const area = getRectangleArea(rectangle);
    expect(area).toBe(50); // 5 * 10 = 50
  });

  test('should calculate the perimeter of a rectangle', () => {
    const perimeter = getRectanglePerimeter(rectangle);
    expect(perimeter).toBe(30); // 2 * (5 + 10) = 30
  });
});
