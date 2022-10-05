import Card from "../components/card";
import Dispense from "../img/card/medicine.png";
import Stocks from "../img/card/packages.png";
import Info from "../img/card/information.png";
import SideBar from "../components/sideBar.js";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<div className="sidebar">
				<SideBar />
			</div>
			<div className="dashboard-actions">
				<Card title="Dispense Meds" icon={Dispense} />
				<Card title="Manage Stocks" icon={Stocks} />
				<Card title="Information Sheets" icon={Info} />
			</div>
		</div>
	);
};

export default Dashboard;
