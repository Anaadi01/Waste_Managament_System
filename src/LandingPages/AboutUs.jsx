import React from 'react'
import { Link } from 'react-router-dom'


export default function LandingPage() {
  return (
      <div>
          <section id="about" className="py-5" data-aos="fade-up">
  <div className="container">
    <h5>About Our Waste Management Business</h5>
    <p>
      Welcome to Hindustan Multi Group, where we are dedicated to sustainable waste management solutions. Our mission is to contribute to a cleaner environment by responsibly handling plastic waste. With a focus on recycling and innovative processes, we aim to make a positive impact on our planet.
    </p>
    <p>
      At Hindustan Multi Group, we specialize in the collection, processing, and recycling of plastic materials, including beads and grains. Our team is committed to reducing plastic pollution and promoting a circular economy.
    </p>
  </div>
</section>


      <section id="products" className="py-5" data-aos="fade-up">
  <div className="container">
    <h5> <Link to={'/products'}> Explore Our Plastic Beads and Grains </Link></h5>
    <p>
      Discover high-quality plastic beads and grains produced by Hindustan Multi Group. Our products are crafted from recycled plastics, ensuring both quality and sustainability. Whether you are in the manufacturing industry or need raw materials for your projects, our plastic beads and grains are the eco-friendly choice.
    </p>
    <p>
      We offer a range of colors, sizes, and specifications to meet the diverse needs of our customers. Join us in creating a greener future with our recycled plastic materials.
    </p>
  </div>
</section>


      <section id="blogs" className="py-5" data-aos="fade-up">
  <div className="container">
    <h5> <Link to={'/blog'}> Read Our Latest Blogs </Link></h5>
    <p>
      Stay informed about the latest trends, innovations, and news in the waste management and recycling industry. Our blogs cover a wide range of topics, including sustainable practices, recycling technologies, and updates on plastic waste reduction initiatives.
    </p>
    <p>
      Explore our blog section to gain insights into how Hindustan Multi Group, is contributing to a cleaner, greener planet through responsible waste management.
    </p>
  </div>
      </section>
      
       
      <footer className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-left">
              <p>Waste Management Plan.</p>
            </div>
            <div className="col-md-6 text-center text-md-right">
              <p>Contact Us:</p>
              <p>Phone no. : 7410809998</p>
              <p>Email: harshitsuman820@gmail.com</p>
              <p>&copy; 2023 Hindustan Multi Group. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
</div>
  )
}
