import { gql } from '@apollo/client';
import GoToTop from '@component/goToTop/GoToTop';
import Navbar from '@component/navbar/Navbar';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import AppLayout from '../components/layout/AppLayout';
import client from '../config/ApolloClient';

const HomePage = ({ categories }) => {
  return (
    <>
      <main>
        <GoToTop showBelow={250} />
        <Navbar navListOpen={true} height={400} categories={categories} />
        {/* hero section start */}
        <section className="hero-section">
          <div className="gio-container">
            <div className="hero-img">
              <img
                src="/assets/images/banners/1-Bakery-Equipment-nobarun.webp"
                alt="hero"
              />
            </div>
          </div>
        </section>
        {/* hero section end */}

        {/* out clients section start */}
        <section className="our-clients-section">
          <div className="container">
            <div className="client-heading">
              <h2>Our Clients</h2>
              <a href="#">
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
            </div>
            <div className="clients-main-wrap">
              {/* box */}
              <div className="client-box">
                <img src="/assets/images/clients/akij.webp" alt="Creative It" />
                <h6>Creative IT</h6>
              </div>
              {/* box */}
              {/* box */}
              <div className="client-box">
                <img src="/assets/images/clients/akij.webp" alt="Creative It" />
                <h6>Creative IT</h6>
              </div>
              {/* box */}
              {/* box */}
              <div className="client-box">
                <img src="/assets/images/clients/akij.webp" alt="Creative It" />
                <h6>Creative IT</h6>
              </div>
              {/* box */}
              {/* box */}
              <div className="client-box">
                <img src="/assets/images/clients/akij.webp" alt="Creative It" />
                <h6>Creative IT</h6>
              </div>
              {/* box */}
              {/* box */}
              <div className="client-box">
                <img src="/assets/images/clients/akij.webp" alt="Creative It" />
                <h6>Creative IT</h6>
              </div>
              {/* box */}
              {/* box */}
              <div className="client-box">
                <img src="/assets/images/clients/akij.webp" alt="Creative It" />
                <h6>Creative IT</h6>
              </div>
              {/* box */}
              {/* box */}
              <div className="client-box">
                <img src="/assets/images/clients/akij.webp" alt="Creative It" />
                <h6>Creative IT</h6>
              </div>
              {/* box */}
              {/* box */}
              <div className="client-box">
                <img src="/assets/images/clients/akij.webp" alt="Creative It" />
                <h6>Creative IT</h6>
              </div>
              {/* box */}
            </div>
          </div>
        </section>
        {/* out clients section end */}
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
      revalidate: 30,
    };
  }
}

export default HomePage;