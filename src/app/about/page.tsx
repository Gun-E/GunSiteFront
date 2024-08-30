import React from 'react';
import styles from '@/styles/Calendar.module.css';
import Image from 'next/image';
import Head from 'next/head';

// TypeScript interface for calendar entry
interface CalendarEntry {
    id: string;
    day: string;
    image: string;
    title: string;
}

interface CalendarProps {
    calendarEntries: CalendarEntry[];
}

export default function Calendar({ calendarEntries }: CalendarProps) {
    function formatMonthYear(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return (
        <>
            <div id="title" className="center">
                <h1 className="month-year">{formatMonthYear(calendarEntries[0].day)}</h1>
            </div>

            <div className={`${styles.calendarFrame} center`}>
                {calendarEntries.map((entry) => (
                    <a
                        key={entry.id}
                        href={`/${entry.id}`}
                        className={`${styles.dayFrame} ${styles.real}`}
                        style={{ backgroundImage: `url(${entry.image})` }}
                    >
                        <div className={styles.vinylRecord}></div>
                        <h2 className={styles.dayNumber}>
                            {new Date(entry.day).getDate()}
                        </h2>
                        <div className={`${styles.dayLabel} center`}>{entry.title}</div>
                    </a>
                ))}
            </div>
        </>
    );
}

// Static or server-side data fetching
export async function getStaticProps() {
    const calendarEntries: CalendarEntry[] = [
        // Example data - replace with your data fetching logic
        {
            id: '1',
            day: '2024-08-30',
            image: '/images/sample.jpg',
            title: 'Event Title 1',
        },
        // Add more entries as needed
    ];

    return {
        props: {
            calendarEntries,
        },
    };
}
