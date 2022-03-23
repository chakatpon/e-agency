import React from 'react';
import bannerImg from '../../assets/img/IntrolandingPage_2020.jpg'
import bannerImg2 from '../../assets/img/banner_covid_protect_vstore_ad.png'
import bannerImg3 from '../../assets/img/banner_covid_vstore_ad.png'



import { Carousel } from 'react-bootstrap';
var listOfImagesFullSize = [];
var listOfImagesResSize = [];
function importAll(r) {
  return r.keys().map(r);
}
function componentWillMount() {
  listOfImagesFullSize = importAll(require.context('../../assets/img/Banner/1540x430px', false, /\.(png|jpe?g|svg|jpg)$/));
  listOfImagesResSize = importAll(require.context('../../assets/img/Banner/650x430px', false, /\.(png|jpe?g|svg|jpg)$/));
 // console.log(listOfImagesResSize);
}
function Banner() {
  componentWillMount();
  return (
    <div>
      <div className="banner_fullsize">
        <Carousel>
          {listOfImagesFullSize.map(
            (image, index) =>
              <Carousel.Item interval={2000} key={index} >
                <div className="banner" >
                  <img
                    className="banner-img"
                    src={image.default}
                    alt="First slide"
                  />
                </div>
              </Carousel.Item>
          )}

        </Carousel>
      </div>
      <div className="banner_ressize">
        <Carousel>          
          {listOfImagesResSize.map(
            (image, index) =>
              <Carousel.Item interval={2000} key={index} >
                <div className="banner" >
                  <img
                    className="banner-img"
                    src={image.default}
                    alt="First slide"
                  />
                </div>
              </Carousel.Item>
          )}
        </Carousel>
      </div>
    </div>

    //  <BannerImgLoop></BannerImgLoop>
    // <div className="wrapper d-none d-sm-block" >
    //     <div className="banner" >
    //         <img src={bannerImg} className="banner-img" />
    //     </div>
    //     <div className="welcome-message" >
    //         <h3 className="welcome-text" >{"Welcome to "}<span className="welcome-label" >{"e-agency System"}</span></h3>
    //     </div>
    // </div>  

    // <Carousel id="banner_full">
    //   <Carousel.Item interval={2000}>
    //     <div className="banner" >
    //       <img
    //         className="banner-img"
    //         src={bannerImg}
    //         alt="First slide"
    //       />
    //     </div>
    //     <Carousel.Caption>

    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item interval={2000}>
    //     <div className="banner" >
    //       <img
    //         className="banner-img"
    //         src={bannerImg2}
    //         alt="First slide"
    //       />
    //     </div>

    //     <Carousel.Caption>

    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item interval={2000}>
    //     <div className="banner" >
    //       <img
    //         className="banner-img"
    //         src={bannerImg3}
    //         alt="First slide"
    //       />
    //     </div>

    //     <Carousel.Caption>

    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
  )
}

export default Banner;