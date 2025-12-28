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
  const [deeds, setDeeds] = useState([]);
  const [selectedDeeds, setSelectedDeeds] = useState([]);
  const [score, setScore] = useState(0);
  const [analytics, setAnalytics] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

  /* ===== STREAK STATE ===== */
  const currentStreak = deeds.length > 0 ? 7 : 0;
  const bestStreak = 14;

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

  /* ===== ADD DEED ===== */
  const addDeed = () => {
    const newDeed = {
      id: crypto.randomUUID(),
      type: "New Good Deed",
      emoji: "✨",
      points: 5,
    };

    const updated = [...deeds, newDeed];
    setDeeds(updated);
    setScore(calculateScore(updated));
  };

  /* ===== EDIT DEED ===== */
  const editDeed = (id) => {
    const newName = prompt("Edit deed name");
    if (!newName) return;

    const updated = deeds.map((deed) =>
      deed.id === id ? { ...deed, type: newName } : deed
    );

    setDeeds(updated);
    setScore(calculateScore(updated));
  };

  /* ===== DELETE DEED ===== */
  const deleteDeed = (id) => {
    const updated = deeds.filter((deed) => deed.id !== id);
    setDeeds(updated);
    setScore(calculateScore(updated));
  };

  /* ===== SUBMIT SELECTED DEEDS ===== */
  const handleSubmit = () => {
  // selectedDeeds.forEach((id) => {
  //   const deed = deeds.find((d) => d.id === id);
  //   if (deed) {
  //     setDeeds((prev) => [...prev, deed]); // ❌ duplicate add
  //   }
  // });

  setSelectedDeeds([]);
};

  const santaMessage = getSantaMessage(score);

  /* ===== PAGE RENDER ===== */
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            score={score}
            deeds={deeds} 
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
            selectedDeeds={selectedDeeds}
            setSelectedDeeds={setSelectedDeeds}
            onSubmit={handleSubmit}
            activePage={activePage}
            setActivePage={setActivePage}
            addDeed={addDeed}
            editDeed={editDeed}
            deleteDeed={deleteDeed}
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
