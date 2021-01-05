const test = require('tape')
const nlp = require('./_lib')

const context = {
  today: { year: 2019 },
}

test('date-parse :', function (t) {
  let arr = [
    ['june 5th 1999', '1999-06-05T00:00:00.000Z'],
    ['june 5th 1999', '1999-06-05T00:00:00.000Z'],
    ['january 1st 1644', '1644-01-01T00:00:00.000Z'],
    ['jan 1st 1644', '1644-01-01T00:00:00.000Z'],
    ['June 4th 1993', '1993-06-04T00:00:00.000Z'],
    ['March 1st 1987', '1987-03-01T00:00:00.000Z'],
    ['June 22nd 2014', '2014-06-22T00:00:00.000Z'],
    ['may 22nd 2014', '2014-05-22T00:00:00.000Z'],
    ['sep 22nd 2014', '2014-09-22T00:00:00.000Z'],
    ['apr 22nd 2014', '2014-04-22T00:00:00.000Z'],
    ['June 22nd 1997', '1997-06-22T00:00:00.000Z'],
    ['january 5th 1998', '1998-01-05T00:00:00.000Z'],
    ['3rd of March 1969', '1969-03-03T00:00:00.000Z'],
    ['2nd of April 1929', '1929-04-02T00:00:00.000Z'],
    ['2nd of jul 1929', '1929-07-02T00:00:00.000Z'],
    ['March 1969', '1969-03-01T00:00:00.000Z'],
    ['jan 1921', '1921-01-01T00:00:00.000Z'],
    ['March 18th', '2019-03-18T00:00:00.000Z'],
    ['August 28th', '2019-08-28T00:00:00.000Z'],
    ['18th of March', '2019-03-18T00:00:00.000Z'],
    ['27th of March', '2019-03-27T00:00:00.000Z'],
    ['february 10th', '2019-02-10T00:00:00.000Z'],
    ['february 28th', '2019-02-28T00:00:00.000Z'],
    ['first day of 2019', '2019-01-01T00:00:00.000Z'],
    ['last day of 2019', '2019-12-31T00:00:00.000Z'],
    ['7th hour of 2019', '2019-01-01T06:00:00.000Z'],
    ['7th day of 2019', '2019-01-07T00:00:00.000Z'],
    ['second quarter of 2019', '2019-04-01T00:00:00.000Z'],
    ['30th minute of 2019', '2019-01-01T00:30:00.000Z'],
    ['2019', '2019-01-01T00:00:00.000Z'],
    ['2028', '2028-01-01T00:00:00.000Z'],
    ['in 2028', '2028-01-01T00:00:00.000Z'],
    ['2nd month in 2028', '2028-02-01T00:00:00.000Z'],
    ['first day of march 2019', '2019-03-01T00:00:00.000Z'],
    ['5th day of march 2019', '2019-03-05T00:00:00.000Z'],
    ['5th day of q1 2002', '2002-01-05T00:00:00.000Z'],
    ['5th hour of March 3rd 2002', '2002-03-03T04:00:00.000Z'],
    ['last hour of March 2021', '2021-03-31T23:00:00.000Z'],
  ]
  arr.forEach(function (a) {
    let json = nlp(a[0]).dates(context).json()[0]
    let start = json.date.start
    t.equal(start, a[1], a[0])
  })
  t.end()
})
