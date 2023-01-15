import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from 'react'

//moment.locale("en-GB");
//momentLocalizer(moment);

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 0,
    title: "Porsche",
    start: new Date(2023, 0, 10, 9, 0, 0),
    end: new Date(2023, 0, 20, 13, 0, 0),
    resourceId: 1
  },
  {
    id: 1,
    title: "Limusen",
    allDay: true,
    start: new Date(2023, 0, 11, 14, 0, 0),
    end: new Date(2023, 0, 21, 16, 30, 0),
    resourceId: 2
  },
  {
    id: 2,
    title: "Prius",
    start: new Date(2023, 0, 12, 8, 30, 0),
    end: new Date(2023, 0, 22, 12, 30, 0),
    resourceId: 3
  },
  {
    id: 11,
    title: "Porter",
    start: new Date(2023, 0, 13, 7, 0, 0),
    end: new Date(2023, 0, 23, 10, 30, 0),
    resourceId: 4
  }
];

const resourceMap = [
  { resourceId: 1, resourceTitle: "Porsche" },
  { resourceId: 2, resourceTitle: "Limusen" },
  { resourceId: 3, resourceTitle: "Prius" },
  { resourceId: 4, resourceTitle: "Porter" },
  { resourceId: 4, resourceTitle: "Lada" }
];

const styles = {
  container: {
    width: "70wh",
    height: "70vh",
    margin: "1em"
  }
};

export default function CustomCalendar() {
  const [cars, SetCars] = useState([]);

  useEffect(() => {
    async function fetchCabs() {
      const res = await fetch('http://localhost:5000/api/getcar');
      const data = await res.json();
      SetCars(data);
    }
    fetchCabs();
  }, []);
  console.log("cars: ", cars);

  let carid = 1;
  const mappedCars = cars.map(event => {
    return {
      resourceId: carid++,
      resourceTitle: event.carmodel
    }
  })
  console.log("mappedCars: ", mappedCars);

  const [books, setCabs] = useState([]);

  useEffect(() => {
    async function fetchCabs() {
      const res = await fetch('http://localhost:5000/api/getbook');
      const data = await res.json();
      setCabs(data);
    }
    fetchCabs();
  }, []);

  console.log("books", books);

  let currentId = 1;
  const mappedEvents = books.map(event => {
    const carmodel = event.bookcarmodel;
    console.log("carmodel: ", carmodel);

    let resource = Object.values(mappedCars).find(value => value.resourceTitle === carmodel);
    console.log("resource: ", resource);
    return {
      id: currentId++,
      title: "Хэрэглэгч: " + event.bookuser + " - " + "Машин: " + carmodel + " - " + "Төлөв: " + event.bookstatus,
      start: event.bookstart,
      end: event.bookend,
      resourceId: resource.resourceId
    }
  })

  console.log("mappedEvents: ", mappedEvents);

  return (
    <div style={styles.container}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={mappedEvents}
        defaultView={Views.MONTH}
        views={[Views.MONTH]}
        steps={60}
        defaultDate={new Date(2023, 0, 1)}
        resources={mappedCars}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
      />
    </div>
  );
}
