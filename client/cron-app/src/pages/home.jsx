import Navbar from "../components/navbar";

function HomePage() {
    return (
        <div className="main-wrapp">
            <Navbar/>
            <div className="content-wrap">
            <section className="section-space">
                    <div className="heading-title text-left">
                        <h2>Home page, visible to all users</h2>
                    </div>
            </section>
            </div>
        </div>
    );
}

export default HomePage;