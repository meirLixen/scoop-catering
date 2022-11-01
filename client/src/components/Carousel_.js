import React, { useEffect } from 'react';
import iamge from '../data/imges/foodCategories/shabat.png'
import iamge1 from '../data/imges/foodCategories/mainCourses.png'
import Carousel from 'react-bootstrap/Carousel'

function Carousel_() {
  useEffect(() => {

  }, []);

  return (

    <Carousel fade className='my-5'>
      <Carousel.Item interval={1000} style={{ height: '500px' }}>
        <img
          className="d-block w-100 h-100"
          src={iamge}
          alt="First slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000} style={{ height: '500px' }}>
        <img
          className="d-block w-100 h-100"
          src={iamge1}
          alt="Second slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '500px' }}>
        <img
          className="d-block w-100 h-100"
          src={iamge}
          alt="Third slide"
        />
        <Carousel.Caption >

        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
export default Carousel_