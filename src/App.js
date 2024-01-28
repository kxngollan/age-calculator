import { useState } from 'react';
import './App.scss';

const App = () => {
  const [userDay, setUserDay] = useState(Number);
  const [userMonth, setUserMonth] = useState(Number);
  const [userYear, setUserYear] = useState(Number);
  const [error, setError] = useState('');
  const [statement, setStatement] = useState('');

  const date = new Date();
  const thisDay = date.getDate();
  const thisMonth = date.getMonth() + 1;
  const thisYear = date.getFullYear();

  const leapYearCheck = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const daysInMonth = [
    { month: 'January', days: 31 },
    {
      month: 'Feburary',
      days: 28,
    },
    {
      month: 'March',
      days: 31,
    },
    {
      month: 'April',
      days: 30,
    },
    {
      month: 'May',
      days: 31,
    },
    {
      month: 'June',
      days: 30,
    },
    {
      month: 'July',
      days: 31,
    },
    {
      month: 'August',
      days: 31,
    },
    {
      month: 'September',
      days: 30,
    },
    {
      month: 'October',
      days: 31,
    },
    {
      month: 'November',
      days: 30,
    },
    {
      month: 'December',
      days: 31,
    },
  ];

  const onGetAge = (e) => {
    e.preventDefault();
    setStatement('');
    setError('');

    let numOfYears = 0;
    let numOfMonths = 0;
    let numOfDays = 0;
    if (userDay && userMonth && userYear) {
      // Factor in Leap years days
      const isLeapYear = leapYearCheck(thisYear);
      if (isLeapYear) {
        daysInMonth[1].days = 29;
      } else {
        daysInMonth[1].days = 28;
      }

      //Invalid Dates

      if (userMonth > 12 || !daysInMonth[userMonth - 1]) {
        return setError('Please enter a valid date');
      }

      if (userDay > daysInMonth[userMonth - 1].days) {
        return setError(
          `${daysInMonth[userMonth - 1].month} only has ${
            daysInMonth[userMonth - 1].days
          }`
        );
      }

      //Not yet born
      if (userYear > thisYear) {
        return setStatement('Not yet born');
      } else {
        if (userYear === thisYear) {
          if (userMonth > thisMonth) {
            return setStatement('Not yet born');
          }
          if (userMonth === thisMonth) {
            if (userDay > thisDay) {
              return setStatement('Not yet born');
            }
          }
        }
      }

      //Born today
      if (
        userDay === thisDay &&
        userMonth === thisMonth &&
        userYear === thisYear
      ) {
        return setStatement('You were just born');
      }

      if (userYear <= thisYear) {
        numOfYears = thisYear - userYear;
        if (userMonth < thisMonth) {
          numOfMonths = thisMonth - userMonth;
        } else {
          numOfYears--;
          numOfMonths = thisMonth + 12 - userMonth;
        }

        if (userDay < thisDay) {
          numOfDays = thisDay - userDay;
        } else {
          numOfMonths--;
          let index = (userMonth - 2 + 12) % 12;
          console.log(index);
          numOfDays = daysInMonth[index].days + thisDay - userDay;
        }
      }

      const yearsText =
        numOfYears > 1
          ? `${numOfYears} years`
          : numOfYears === 1
          ? `${numOfYears} year`
          : '';
      const monthsText =
        numOfMonths > 1
          ? `${numOfMonths} months`
          : numOfMonths === 1
          ? `${numOfMonths} month`
          : '';
      const daysText =
        numOfDays > 1
          ? `${numOfDays} days`
          : numOfDays === 1
          ? `${numOfDays} day`
          : '';

      console.log(numOfDays, numOfMonths, numOfYears);
      const message = `You are ${yearsText} ${monthsText} ${daysText} old`;

      return setStatement(message);
    } else {
      setError('Provide valid date');
    }
  };

  return (
    <div className="form-container">
      <h1>How old am I today?</h1>
      <h3>Age Calculator</h3>
      <p>
        Today is {thisDay} {thisMonth} {thisYear}
      </p>
      <h3>Enter your birthday</h3>
      <form onSubmit={onGetAge}>
        <div className="user-date">
          <div className="input-container">
            <label>Day:</label>
            <input
              className="date"
              size={'number'}
              placeholder="DD"
              max={31}
              min={1}
              onChange={(e) => {
                setUserDay(e.target.value);
              }}
            />
          </div>

          <div className="input-container">
            <label>Month:</label>
            <input
              className="date"
              size={'number'}
              placeholder="MM"
              max={12}
              min={1}
              onChange={(e) => {
                setUserMonth(e.target.value);
              }}
            />
          </div>

          <div className="input-container">
            <label>Year:</label>
            <input
              className="date"
              size={'number'}
              placeholder="YYYY"
              onChange={(e) => {
                setUserYear(e.target.value);
              }}
            />
          </div>
        </div>
        <button>Get Age:</button>
      </form>
      <h2 className="">{statement}</h2>
      <h2 className="error">{error}</h2>
    </div>
  );
};

export default App;
