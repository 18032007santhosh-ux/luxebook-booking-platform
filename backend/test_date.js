const testDates = [
  { date: "Friday, October 04, 2024", time: "09:00 AM" },
  { date: "Monday, June 20, 2026", time: "02:30 PM" }
];

testDates.forEach(b => {
  let parsedDate;
  try {
    if (b.date && b.date.includes(",")) {
        const withoutWeekday = b.date.split(", ").slice(1).join(", ");
        parsedDate = new Date(`${withoutWeekday} ${b.time}`);
    } else {
        parsedDate = new Date(b.date);
    }
  } catch(e) {
    parsedDate = new Date();
  }
  console.log(`${b.date} ${b.time} ->`, parsedDate, parsedDate < new Date() ? "Past" : "Future");
});
