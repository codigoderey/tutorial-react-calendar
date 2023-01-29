import { useState } from 'react';
import Calendar from 'react-calendar';

function App() {
    const [value, onChange] = useState(new Date());

    const onSaveDates = () => {
        const initialDateDay = new Date(value[0]).getDate();
        const endDateDay = new Date(value[1]).getDate();

        // if the user selects only one day
        if (initialDateDay.toLocaleString() === endDateDay.toLocaleString()) {
            fetch('http://localhost:3000/days', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: new Date(value).toLocaleDateString(),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });

            return;
        }

        // if the user selects a range of days
        const date_1 = new Date(value[0]);
        const date_2 = new Date(value[1]);
        // formula of total days selected for the range
        const totalDays = (date_1, date_2) => {
            const difference = date_1.getTime() - date_2.getTime();
            console.log(difference);
            const days = Math.ceil((difference / (1000 * 3600 * 24)) * -1);
            console.log(Number(days));
            return days;
        };
        // total days selected to loop and save in the database
        const td = totalDays(date_1, date_2);
        for (let i = 0; i < td; i++) {
            const date = new Date(value[0]);
            date.setDate(date.getDate() + i);
            fetch('http://localhost:3000/days', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: date.toLocaleDateString(),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className="full-screen flex">
            <h1 style={{ marginBottom: '1rem' }}>React Calendar</h1>
            <Calendar
                onChange={onChange}
                value={value}
                defaultView="month"
                calendarType="US"
                returnValue="range"
                showDoubleView={true}
                selectRange={true}
            />
            {new Date(value[0]).toDateString() !== 'Invalid Date' && (
                <div style={{ padding: '1rem' }}>
                    <p style={{ marginBottom: '1rem' }}>
                        <strong>Selected dates are:</strong>
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                        <strong>From:</strong>{' '}
                        {new Date(value[0]).toDateString()}
                    </p>
                    <p>
                        <strong>To:</strong> {new Date(value[1]).toDateString()}
                    </p>
                </div>
            )}

            <button
                style={{ padding: '.5rem 1rem', marginTop: '1rem' }}
                onClick={onSaveDates}
            >
                Save
            </button>
        </div>
    );
}

export default App;
