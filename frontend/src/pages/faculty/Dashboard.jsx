import DashboardCards from "../../components/faculty/Dashboard/DashboardCards";
import Charts from "../../components/faculty/Dashboard/Charts";

import "./Dashboard.css";

const Dashboard = () => {

    return (

        <div className="dashboard">

            <DashboardCards/>

            <Charts />
        
        </div>

    );

};

export default Dashboard;