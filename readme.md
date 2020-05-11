

# cathly

**cathly** is a tiny helper to create an array of dates representing a month as used in calendar components.

Inspired by [@lukeed05](https://twitter.com/lukeed05)'s awesome [calendarize](https://www.npmjs.com/package/calendarize), **cathly** aims to provide an output that is a little more straight forward to use in interactive calendars by returning date objects instead of plain numbers, while still maintaining minimal import cost (171b).

**Demo:**
You can see cathly in action in this [simple react calendar component on codesandbox](https://codesandbox.io/s/great-heisenberg-35zrw?file=/src/cathly.ts)

## API:
```ts
function cathly(
	d: Date, 
	// 0 = weeks start on sunday
	// 1 = weeks start on monday
	// 2 = weeks start on tuesday
	// ...
	offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6
): Date[] {...};
```

## Usage
```js
import cathly from 'cathly';

const view = cathly(new Date());
//=> (35) [Date, Date, ..., Date]
```

## Differences to calendarize:
|  | cathly | calendarize |
|--|--|--|
| [output](#output) | flat array of date objects | nested array (weeks) with numbers |
| provides an easy distinction between different weeks | [with helper function](#i-want-the-output-to-be-grouped-by-weeks) | ✅ 
| includes dates of previous and next month for the current view| ✅ | ❌
| size | 171b | 202B |
| memory usage | higher | lower
| execution time | higher | lower

### Output:

#### cathly:
```js
import cathly from 'cathly';

const view = cathly(new Date('2019-12-20'));
//=> (35) [Date, Date, ..., Date]
```


#### calendarize:
```js
import calendarize from 'calendarize';

const view = calendarize(new Date('2019-12-20'));
//=> [
//=>   [ 1,  2,  3,  4,  5,  6,  7],
//=>   [ 8,  9, 10, 11, 12, 13, 14],
//=>   [15, 16, 17, 18, 19, 20, 21],
//=>   [22, 23, 24, 25, 26, 27, 28],
//=>   [29, 30, 31,  0,  0,  0,  0],
//=> ]
```

### Performance:
Obviously, cathly loses to calendarize by a margin in benchmarks in execution time and memory allocation since it creates 30 - 40 date objects instead of plain numbers. The real-world performance difference should be negligible on all devices in nearly all of the use cases it was built for (building interactive calendar/date picker views).

If you have to create tens of thousands of calendar views per second, calendarize will be the better option for you.


## Helpers

### I need the row index for the current day
If you need the row index (=row of the current calendar view) for the current date, you can calculate it like this:

```jsx
<div>
  {cathly(new Date()).map((day, i) => {
    let weekInView = Math.ceil(i / 7); // or ~~(i / 7 + 1)

    // render the day
    return <>...</>;
  })}
</div>
```

### I want the output to be grouped by weeks
If nested arrays representing each week are more convenient to you, you can easily group the output from cathly into arrays containing the weekdays yourself:
```js
function groupByWeeks(dates) {  
  for(i = 0, out=[]; i < dates.length; i += 7) {
    out.push(dates.slice(i, i + 7));  
  }
    
  return out;  
}

groupByWeeks(cathly(new Date()));
//=> [
//=>   [ Date,  Date,  Date  Date  Date,  Date,  Date],
//=>   [ Date,  Date,  Date  Date  Date,  Date,  Date],
//=>   [ Date,  Date,  Date  Date  Date,  Date,  Date],
//=>   [ Date,  Date,  Date  Date  Date,  Date,  Date],
//=>   [ Date,  Date,  Date  Date  Date,  Date,  Date],
//=> ]
```


## License

MIT ©  [Manu Schiller](https://github.com/manuschillerdev/)
