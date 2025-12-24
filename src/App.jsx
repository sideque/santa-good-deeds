import { useEffect, useState } from "react";

/* ===== VIEWS ===== */
import Dashboard from "./views/Dashboard";
import Deeds from "./views/Deeds";
import Analytics from "./views/Analytics";
import Profile from "./views/Profile";

/* ===== CONTROLLERS ===== */
import { calculateScore } from "./controllers/DeedController";
import { getSantaMessage } from "./controllers/ProgressController";
import { computeWeeklyAnalytics } from "./controllers/AnalyticsController";

/* ===== SERVICES ===== */
import { loadData, saveData } from "./services/storageService";

/* ===== COMPONENTS ===== */
import Navbar from "./components/Navbar";

function App() {
  /* ===== GLOBAL STATE (MODEL DATA) ===== */
  const [deeds, setDeeds] = useState([]);
  const [score, setScore] = useState(0);
  const [analytics, setAnalytics] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

  /* ===== LOAD DATA ON APP START ===== */
  useEffect(() => {
    const storedData = loadData();

    if (storedData) {
      setDeeds(storedData.deeds);
      setScore(storedData.score);
    }
  }, []);

  /* ===== SAVE DATA WHENEVER STATE CHANGES ===== */
  useEffect(() => {
    saveData({ deeds, score });
    setAnalytics(computeWeeklyAnalytics(deeds));
  }, [deeds, score]);

  /* ===== CONTROLLER HANDLERS ===== */
  const handleAddDeed = (deedType) => {
    const updatedDeeds = [...deeds, deedType];
    const newScore = calculateScore(updatedDeeds);

    setDeeds(updatedDeeds);
    setScore(newScore);
  };

  const santaMessage = getSantaMessage(score);

  /* ===== PAGE RENDER LOGIC ===== */
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            score={score}
            message={santaMessage}
            analytics={analytics}
          />
        );
      case "deeds":
        return <Deeds onAddDeed={handleAddDeed} />;
      case "analytics":
        return <Analytics analytics={analytics} />;
      case "profile":
        return <Profile score={score} deeds={deeds} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <Profile score={score} deeds={deeds} />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
