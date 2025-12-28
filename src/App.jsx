import { useEffect, useState } from "react";

/* ===== VIEWS ===== */
import Dashboard from "./views/Dashboard";
import Deeds from "./views/Deeds";
import Analytics from "./views/Analytics";
import Profile from "./views/Profile";

/* ===== CONTROLLERS ===== */
import { calculateScore } from "./controllers/DeedController";
import { getSantaMessage } from "./controllers/ProgressController";

/* ===== SERVICES ===== */
import { loadData, saveData } from "./services/storageService";

/* ===== COMPONENTS ===== */
import Snowfall from "react-snowfall";

function App() {
  /* ===== GLOBAL STATE ===== */
  const [selectedDeeds, setSelectedDeeds] = useState([]);
  const [deeds, setDeeds] = useState([]);  
  const [score, setScore] = useState(0);
  const [analytics, setAnalytics] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

  /* ===== STREAK STATE (TEMP – CAN IMPROVE LATER) ===== */
  const currentStreak = deeds.length > 0 ? 7 : 0;
  const bestStreak = 14;

  const addDeed = () => {
  const newDeed = {
    id: Date.now(),
    type: "New Good Deed",
    emoji: "✨",
    points: 5,
  };

  const deleteDeed = (id) => {
  setDeeds((prev) => prev.filter((deed) => deed.id !== id));
};


  setDeeds((prev) => [...prev, newDeed]);
};

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    const storedData = loadData();
    if (storedData) {
      setDeeds(storedData.deeds || []);
      setScore(storedData.score || 0);
    }
  }, []);

  /* ===== SAVE DATA ===== */
  useEffect(() => {
    saveData({ deeds, score });
  }, [deeds, score]);

  /* ===== ADD DEED HANDLER ===== */
  const handleAddDeed = (deed) => {
    const updatedDeeds = [...deeds, deed];
    const newScore = calculateScore(updatedDeeds);

    setDeeds(updatedDeeds);
    setScore(newScore);
  };

  const santaMessage = getSantaMessage(score);

  /* ===== PAGE RENDER ===== */
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            score={score}
            currentStreak={currentStreak}
            bestStreak={bestStreak}
            message={santaMessage}
            analytics={analytics}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        );

      case "deeds":
        return (
    <Deeds
      deeds={deeds}
      addDeed={addDeed}
      deleteDeed={deleteDeed}
      selectedDeeds={selectedDeeds}
      setSelectedDeeds={setSelectedDeeds}
      onSubmit={() => {
        selectedDeeds.forEach((id) => {
          const deed = deeds.find((d) => d.id === id);
          if (deed) handleAddDeed(deed);
        });
        setSelectedDeeds([]);
      }}
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );

      case "analytics":
        return (
    <Analytics
      analytics={analytics}
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );

      case "profile":
  return (
    <Profile
      score={score}
      deeds={deeds}
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );


      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* <Navbar activePage={activePage} setActivePage={setActivePage} /> */}

      <main className="main-content">{renderPage()}</main>

      {/* ❄️ Snow Effect */}
      <Snowfall
        color="white"
        snowflakeCount={200}
        speed={[3, 2]}
        radius={[1, 4]}
        wind={[0, 1]}
        opacity={[0.3, 0.9]}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </div>
  );
}

export default App;

