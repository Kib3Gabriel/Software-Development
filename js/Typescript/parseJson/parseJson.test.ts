import {parsedData} from '../parseJson/parseJson';
type test = Expect<
  Equal<
    typeof parsedData,
    {
      name: string;
      age: number;
    }
  >
>;