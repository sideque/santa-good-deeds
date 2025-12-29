import { useEffect, useState } from "react";

/* ===== VIEWS ===== */
import Dashboard from "./views/Dashboard";
import Deeds from "./views/Deeds";
import Analytics from "./views/Analytics";
import Profile from "./views/Profile";

/* ===== CONTROLLERS ===== */
import { getSantaMessage } from "./controllers/ProgressController";

/* ===== SERVICES ===== */
import { loadData, saveData } from "./services/storageService";

/* ===== COMPONENTS ===== */
import Snowfall from "react-snowfall";

function App() {
  /* ===== GLOBAL STATE ===== */
  const [deeds, setDeeds] = useState([]);                 // available deeds
  const [selectedDeeds, setSelectedDeeds] = useState([]); // selected today
  const [completedDeeds, setCompletedDeeds] = useState([]); // history
  const [score, setScore] = useState(0);                  // single source of truth
  const [analytics, setAnalytics] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  // Hydration flag prevents saving to localStorage before initial load completes
  const [hydrated, setHydrated] = useState(false);

  /* ===== STREAK STATE ===== */
  const currentStreak = completedDeeds.length > 0 ? 7 : 0;
  const bestStreak = 14;

  /* ===== LOAD DATA (ON REFRESH) ===== */
  useEffect(() => {
    const storedData = loadData();

    if (storedData) {
      setDeeds(storedData.deeds || []);
      setScore(storedData.score || 0);
      setCompletedDeeds(storedData.completedDeeds || []);
      setAnalytics(storedData.analytics || null);
    }

    // Mark hydration complete so we don't overwrite existing storage
    setHydrated(true);
  }, []);

  /* ===== SAVE DATA ===== */
  useEffect(() => {
    if (!hydrated) return; // don't save until we've loaded existing data

    saveData({
      deeds,
      score,
      completedDeeds,
      analytics,
    });
  }, [deeds, score, completedDeeds, analytics, hydrated]);

  /* ===== ADD DEED (WITH FORM DATA) ===== */
  const addDeed = (formData) => {
    const newDeed = {
      id: crypto.randomUUID(),
      type: formData.type,
      emoji: formData.emoji,
      points: formData.points,
    };

    setDeeds(prev => [...prev, newDeed]);
  };

  /* ===== EDIT DEED (WITH FORM DATA) ===== */
  const editDeed = (id, formData) => {
    // update master deeds list
    setDeeds(prev =>
      prev.map(deed =>
        deed.id === id
          ? { ...deed, type: formData.type, emoji: formData.emoji, points: formData.points }
          : deed
      )
    );

    // also update historical completedDeeds so Profile stays in sync
    setCompletedDeeds(prev =>
      prev.map(cd =>
        cd.id === id
          ? { ...cd, type: formData.type, emoji: formData.emoji, points: formData.points }
          : cd
      )
    );
  };

  /* ===== DELETE DEED ===== */
  const deleteDeed = (id) => {
    setDeeds(prev => prev.filter(deed => deed.id !== id));
  };

  /* ===== SUBMIT SELECTED DEEDS ===== */
  const handleSubmit = () => {
    const completed = deeds.filter(d =>
      selectedDeeds.includes(d.id)
    );

    if (completed.length === 0) return;

    // store completed deeds
    setCompletedDeeds(prev => [...prev, ...completed]);

    // calculate points
    const earnedPoints = completed.reduce(
      (sum, d) => sum + d.points,
      0
    );

    // update score (ONLY HERE)
    setScore(prev => prev + earnedPoints);

    // update analytics (derived, not source of truth)
    setAnalytics(prev => {
      const prevBreakdown = prev?.dailyBreakdown || [];

      const todayIndex = prevBreakdown.findIndex(
        d => d.name === "Today"
      );

      let newBreakdown;

      if (todayIndex !== -1) {
        // ✅ UPDATE existing Today
        newBreakdown = prevBreakdown.map((d, i) =>
          i === todayIndex
            ? { ...d, score: d.score + earnedPoints }
            : d
        );
      } else {
        // ✅ First time Today
        newBreakdown = [
          ...prevBreakdown,
          { name: "Today", score: earnedPoints }
        ];
      }

      const weeklyScore = newBreakdown.reduce(
        (sum, d) => sum + d.score,
        0
      );

      return {
        weeklyScore,
        bestDay: "Today",
        worstDay: "None",
        trend: earnedPoints > 0 ? "up" : "stable",
        dailyBreakdown: newBreakdown
      };
    });

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
            deeds={completedDeeds}
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
        deeds={deeds}                 // master deeds list
        completedDeeds={completedDeeds} // completed IDs
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
        snowflakeCount={50}
        speed={[0, 2]}
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