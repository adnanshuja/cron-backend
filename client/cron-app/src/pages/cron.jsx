import Navbar from "../components/navbar";

function CronPage() {
    return (
        <div className="main-wrapp">
            <Navbar/>
            <div className="content-wrap">
            <section className="section-space">
                    <div className="heading-title text-left">
                        <h2>Cron Jobs</h2>
                    </div>
            </section>
            </div>
        </div>
    );
}

export default CronPage;