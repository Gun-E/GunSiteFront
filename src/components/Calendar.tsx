// import styles from '@/styles/Calendar.module.css';  // CSS 모듈을 가져옵니다.
//
// // CalendarEntry 인터페이스 정의
// interface CalendarEntry {
//     id: string;
//     day: string;
//     image: string;
//     title: string;
// }
//
// interface CalendarProps {
//     calendarEntries: CalendarEntry[];
// }
//
// const Calendar: React.FC<CalendarProps> = ({ calendarEntries }) => {
//     // 날짜를 "월 년도" 형식으로 포맷팅하는 함수
//     function formatMonthYear(dateString: string): string {
//         const date = new Date(dateString);
//         const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
//         return new Intl.DateTimeFormat('en-US', options).format(date);
//     }
//
//     return (
//         <>
//             {/* 타이틀 섹션 */}
//             <div id="title" className="center">
//                 <h1 className="month-year">{formatMonthYear(calendarEntries[0]?.day)}</h1>
//             </div>
//
//             {/* 캘린더 프레임 */}
//             <div className={`${styles.calendarFrame} center`}>
//                 {calendarEntries.map((entry) => (
//                     <a
//                         key={entry.id}
//                         href={`/${entry.id}`}
//                         className={`${styles.dayFrame} ${styles.real}`}
//                         style={{ backgroundImage: `url(${entry.image})` }}  // 중복된 'style' 사용에 유의
//                     >
//                         <div className={styles.vinylRecord}></div>
//                         <h2 className={styles.dayNumber}>
//                             {new Date(entry.day).getDate()}
//                         </h2>
//                         <div className={`${styles.dayLabel} center`}>{entry.title}</div>
//                     </a>
//                 ))}
//             </div>
//         </>
//     );
// };
//
// export default Calendar;
