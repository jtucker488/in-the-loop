import React from 'react';
import Slider from 'react-slick';
import EventCard from './event-card';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const events = [
  {
    image: "https://picsum.photos/200",
    title: "Event 1",
    date: "2024-08-08",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    description: "This is a description for event 1.",
    organizer: "John Doe",
    organizerImage: "https://picsum.photos/50",
    location: "New York, NY",
    id: "0909765",
  },
  {
    image: "https://picsum.photos/201",
    title: "Event 2",
    date: "2024-08-09",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    description: "This is a description for event 2.",
    organizer: "Jane Smith",
    organizerImage: "https://picsum.photos/51",
    location: "Los Angeles, CA",
    id: "187398",
  },
  {
    image: "https://picsum.photos/200",
    title: "Event 1",
    date: "2024-08-08",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    description: "This is a description for event 1.",
    organizer: "John Doe",
    organizerImage: "https://picsum.photos/50",
    location: "New York, NY",
    id: "0909765",
  },
  {
    image: "https://picsum.photos/201",
    title: "Event 2",
    date: "2024-08-09",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    description: "This is a description for event 2.",
    organizer: "Jane Smith",
    organizerImage: "https://picsum.photos/51",
    location: "Los Angeles, CA",
    id: "187398",
  },
  {
    image: "https://picsum.photos/200",
    title: "Event 1",
    date: "2024-08-08",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    description: "This is a description for event 1.",
    organizer: "John Doe",
    organizerImage: "https://picsum.photos/50",
    location: "New York, NY",
    id: "0909765",
  },
  {
    image: "https://picsum.photos/201",
    title: "Event 2",
    date: "2024-08-09",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    description: "This is a description for event 2.",
    organizer: "Jane Smith",
    organizerImage: "https://picsum.photos/51",
    location: "Los Angeles, CA",
    id: "187398",
  },
  // Add more events as needed
];

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {events.map((event, index) => (
        <div className = "px-2"key={index}>
          <EventCard event={event} />
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;