import Navbar from "../components/navbar/"
import Hero from "../components/hero/"

const Home = () => {
    return (
        <div className="w-[100%] h-[100%] flex flex-col  overflow-hidden ">
            <Navbar />
            <Hero />
        </div>
    )
}

export default Home