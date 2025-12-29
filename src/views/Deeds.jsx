import React, { useState } from "react";
import "../style.css";

const Deeds = ({
  deeds,
  selectedDeeds,
  setSelectedDeeds,
  onSubmit,
  activePage,
  setActivePage,
  addDeed,
  editDeed,
  deleteDeed
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [currentDeed, setCurrentDeed] = useState(null);
  const [formData, setFormData] = useState({ type: '', emoji: '', points: 5 });

  const handleToggle = (deedId) => {
    setSelectedDeeds((prev) =>
      prev.includes(deedId)
        ? prev.filter((id) => id !== deedId)
        : [...prev, deedId]
    );
  };

  // Open modals
  const handleEdit = (e, deedId) => {
    e.stopPropagation();
    const deed = deeds.find(d => d.id === deedId);
    setCurrentDeed(deed);
    setFormData({ type: deed.type, emoji: deed.emoji, points: deed.points });
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (e, deedId) => {
    e.stopPropagation();
    const deed = deeds.find(d => d.id === deedId);
    setCurrentDeed(deed);
    setModalType('delete');
    setShowModal(true);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    setFormData({ type: '', emoji: '✨', points: 5 });
    setModalType('add');
    setShowModal(true);
  };

  // Handle modal actions
  const handleModalConfirm = () => {
    if (modalType === 'add') {
      if (formData.type.trim()) {
        addDeed(formData);
        setShowModal(false);
      }
    } else if (modalType === 'edit') {
      if (formData.type.trim()) {
        editDeed(currentDeed.id, formData);
        setShowModal(false);
      }
    } else if (modalType === 'delete') {
      deleteDeed(currentDeed.id);
      setShowModal(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentDeed(null);
  };

  // Modal content based on type
  const renderModalContent = () => {
    if (modalType === 'delete') {
      return (
        <>
          <div className="modal-icon-container delete-modal">
            <span className="modal-icon-emoji">🗑️</span>
          </div>
          <h2 className="modal-title">Delete Good Deed?</h2>
          <p className="modal-description">
            Are you sure you want to delete "<strong>{currentDeed?.type}</strong>"? 
            This action cannot be undone.
          </p>
          <div className="modal-actions">
            <button className="modal-btn modal-btn-cancel" onClick={handleModalClose}>
              <span>Cancel</span>
            </button>
            <button className="modal-btn modal-btn-delete" onClick={handleModalConfirm}>
              <span>Delete</span>
            </button>
          </div>
        </>
      );
    }

    // Add or Edit form
    return (
      <>
        <div className="modal-icon-container">
          <span className="modal-icon-emoji">{modalType === 'add' ? '➕' : '✏️'}</span>
        </div>
        <h2 className="modal-title">
          {modalType === 'add' ? 'Add New Good Deed' : 'Edit Good Deed'}
        </h2>
        <p className="modal-description">
          {modalType === 'add' 
            ? 'Create a new good deed to add to your list of kind actions.'
            : 'Update the details of your good deed.'}
        </p>
        
        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleModalConfirm(); }}>
          <div className="form-group">
            <label className="form-label" htmlFor="deed-name">
              <span className="label-icon">📝</span>
              Deed Name
            </label>
            <input
              id="deed-name"
              type="text"
              className="form-input"
              placeholder="e.g., Helped someone carry groceries"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              autoFocus
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="deed-emoji">
                <span className="label-icon">😊</span>
                Emoji
              </label>
              <input
                id="deed-emoji"
                type="text"
                className="form-input form-input-emoji"
                placeholder="✨"
                value={formData.emoji}
                onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                maxLength="2"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="deed-points">
                <span className="label-icon">⭐</span>
                Points
              </label>
              <input
                id="deed-points"
                type="number"
                className="form-input"
                min="1"
                max="100"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 5 })}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-btn modal-btn-cancel" onClick={handleModalClose}>
              <span>Cancel</span>
            </button>
            <button type="submit" className="modal-btn modal-btn-confirm">
              <span>{modalType === 'add' ? 'Add Deed' : 'Save Changes'}</span>
              <span className="btn-shine"></span>
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className="app">
      {/* Animated starfield background */}
      <div className="starfield">
        {Array.from({ length: 50 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 2 + Math.random() * 2
        })).map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Floating ornaments */}
      <div className="ornament ornament-1">🎄</div>
      <div className="ornament ornament-2">⭐</div>
      <div className="ornament ornament-3">🎁</div>

      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-glow"></div>
          <nav className="sidebar-nav" aria-label="Main navigation">
            <ul className="sidebar-menu">
              {[
                { id: 'dashboard', icon: '🎁', label: 'Dashboard' },
                { id: 'deeds', icon: '⭐', label: 'Deeds' },
                { id: 'analytics', icon: '📊', label: 'Analytics' },
                { id: 'profile', icon: '👤', label: 'Profile' }
              ].map((item, index) => (
                <li key={item.id} className="menu-item" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <button
                    className={`menu-link ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => setActivePage(item.id)}
                    aria-current={activePage === item.id ? 'page' : undefined}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className="menu-shine"></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content" role="main">
          <section className="deeds-container">
            <h1 className="deeds-title">
              <span className="title-sparkle">✨</span>
              <span className="title-text">Select Your Good Deeds</span>
              <span className="title-sparkle">✨</span>
            </h1>

            <p className="deeds-subtitle">
              Choose the acts of kindness you've done today and spread some Christmas magic! ✨
            </p>

            {/* ADD BUTTON */}
            <div className="add-deed-container">
              <button onClick={handleAdd} className="btn-add">
                <span className="add-icon">➕</span>
                <span className="add-text">Add New Deed</span>
                <span className="add-shine"></span>
              </button>
            </div>

            {/* Deeds Grid */}
            <div className="deeds-list">
              {deeds.map((deed, index) => (
                <article
                  key={deed.id}
                  className={`deed-card ${selectedDeeds.includes(deed.id) ? "active" : ""}`}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="deed-card-glow"></div>
                  
                  {/* Main clickable area for selection */}
                  <div
                    className="deed-card-content"
                    onClick={() => handleToggle(deed.id)}
                  >
                    <div className="deed-icon-container">
                      <span className="deed-emoji">{deed.emoji}</span>
                      {selectedDeeds.includes(deed.id) && (
                        <div className="deed-checkmark">✓</div>
                      )}
                    </div>
                    <h3 className="deed-name">{deed.type}</h3>
                    <p className="deed-points">+{deed.points} pts</p>
                  </div>

                  {/* ACTION BUTTONS - Separate from selection area */}
                  <div className="deed-actions">
                    <button 
                      className="deed-action-btn edit-btn"
                      onClick={(e) => handleEdit(e, deed.id)}
                      title="Edit deed"
                      aria-label="Edit deed"
                    >
                      <span>✏️</span>
                    </button>
                    <button 
                      className="deed-action-btn delete-btn"
                      onClick={(e) => handleDelete(e, deed.id)}
                      title="Delete deed"
                      aria-label="Delete deed"
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Submit Button */}
            <div className="submit-container">
              <button
                className="submit-btn"
                onClick={onSubmit}
                disabled={selectedDeeds.length === 0}
              >
                <span className="submit-icon">🎁</span>
                <span className="submit-text">
                  Submit {selectedDeeds.length > 0 ? `(${selectedDeeds.length})` : ''} Good Deeds
                </span>
                <span className="submit-shine"></span>
              </button>
              
              {selectedDeeds.length > 0 && (
                <p className="submit-hint">
                  You'll earn {deeds
                    .filter(d => selectedDeeds.includes(d.id))
                    .reduce((sum, d) => sum + d.points, 0)} points! 🌟
                </p>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleModalClose} aria-label="Close modal">
              ✕
            </button>
            <div className="modal-content">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deeds;