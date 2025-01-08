import { gql } from '@apollo/client';
import GoToTop from '@component/goToTop/GoToTop';
import Navbar from '@component/navbar/Navbar';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import Image from 'next/image';
import AppLayout from '../components/layout/AppLayout';
import client from '../config/ApolloClient';

const HomePage = ({ clients, categories, featuredCategories }) => {
  return (
    <>
      <main>
        <GoToTop showBelow={250} />
        <Navbar navListOpen={true} height={400} categories={categories} />
        {/* hero section start */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-img">
              <Swiper navigation={false} pagination={false} loop={true}>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/1-Bakery-Equipment-nobarun.webp"
                    alt="hero Image one"
                    className="desktop-banner"
                  />
                  <Image
                    src="/assets/images/banners/mobile/1-Bakery-Equipment-nobarun.jpg"
                    width={550}
                    height={245}
                    alt="hero Mobile Image one"
                    className="mobile-banner"
                    priority
                    layout="responsive"
                  />
                  {/* <img
                    src="/assets/images/banners/mobile/1-Bakery-Equipment-nobarun.webp"
                    alt="hero Mobile Image one"
                    className="mobile-banner"
                  /> */}
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/2-Slaughterhouse-Equipment-4.webp"
                    alt="hero Image two"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/2-Slaughterhouse-Equipment-4.webp"
                    alt="hero Mobile Image two"
                    className="mobile-banner"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/3-Supermarket-Equipment-with-logo.webp"
                    alt="hero Image Three"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/3-Supermarket-Equipment-with-logo.webp"
                    alt="hero Mobile Image Three"
                    className="mobile-banner"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/4-Slaughterhouse-Equipment.webp"
                    alt="hero Image Four"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/4-Slaughterhouse-Equipment.webp"
                    alt="hero Mobile Image Four"
                    className="mobile-banner"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/5-Metal-Detector-&-Scanning-System.webp"
                    alt="hero Image Five"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/5-Metal-Detector-&-Scanning-System.webp"
                    alt="hero Mobile Image Five"
                    className="mobile-banner"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/6-Slaughterhouse-Equipment-nobarun.webp"
                    alt="hero Image Six"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/6-Slaughterhouse-Equipment-nobarun.webp"
                    alt="hero Mobile Image Six"
                    className="mobile-banner"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        {/* hero section end */}

        {/* out clients section start */}
        <section className="our-clients-section">
          <div className="container">
            <div className="client-heading">
              <h2>Our Clients</h2>
              <Link href={`/clients`}>
                <a>
                  <span>View All</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="clients-main-wrap">
              {clients
                .filter((item, index) => item && index < 8)
                .map((item, index) => (
                  <Link href="#" key={index}>
                    <a>
                      <div className="client-box">
                        <img
                          src={process.env.NEXT_PUBLIC_IMAGE_URL + item.imgUrl}
                          alt={`Image for ${item.title} client`}
                          className="lazyload"
                          loading="lazy"
                        />
                        <p>{item.title}</p>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </section>
        {/* out clients section end */}

        {/* featured categories section start */}
        <section className="featured-categories-section">
          <div className="container">
            <div className="client-heading text-begin">
              <h3>Featured Categories</h3>
            </div>
            <div className="category-main-wrap">
              {featuredCategories.map((category, index) => (
                <Link key={index} href={`/category/${category.slug}`}>
                  <a>
                    <div className="category-box">
                      <div className="img-placee">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL + category.image
                          }
                          alt={`Thumbnail for ${category.name} featured category`}
                        />
                      </div>
                      <h4>{category.name}</h4>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* featured categories section end */}
      </main>
    </>
  );
};
HomePage.layout = AppLayout;

export async function getStaticProps() {
  let categories = [];
  let clients = [];
  let count = null;
  let collections = [];
  let featuredCategories = [];
  try {
    categories = await useAllProductCategories();
    categories = JSON.parse(JSON.stringify(categories));
    featuredCategories = categories.filter((category) => category.isFeatured);
  } catch (e) {}
  try {
    let { data } = await client.query({
      query: gql`
        query getFeaturedClients {
          getAllFeaturedClients {
            id
            title: clientName
            imgUrl: logo
          }
        }
      `,
    });
    clients = data.getAllFeaturedClients;
  } catch (e) {}
  try {
    let { data } = await client.query({
      query: gql`
        query getCollectionWiseProduct {
          getAllPopulatedCollection {
            name
            slug
            products {
              product {
                id: slug
                productName
                discount
                featured
                populatedCategory {
                  name
                  icon
                }
              }
              reviewCount
              ratingAverage
            }
          }
        }
      `,
    });
    collections = data.getAllPopulatedCollection;
  } catch (e) {
  } finally {
    return {
      props: {
        clients,
        categories,
        featuredCategories,
        collections,
        count,
      },
      revalidate: 10,
    };
  }
}

export default HomePage;
