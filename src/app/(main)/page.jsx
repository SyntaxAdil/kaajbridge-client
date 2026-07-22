import { FAQ } from "../../pages/home/FAQ"
import { FeaturedCompanies } from "../../pages/home/FeaturedCompanies"
import { FeaturedJobs } from "../../pages/home/FeaturedJobs"
import Banner from "../../section/Banner"


const Home = () => {
  return (
    <div>
      <Banner/>
      <FeaturedJobs/>
      <FeaturedCompanies/>
      <FAQ/>
    </div>
  )
}

export default Home