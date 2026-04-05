import { useState, useRef, useEffect } from "react";

import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { ALERT } from "../redux/types/alertType";
import { createGoal } from "../redux/actions/goalAction";

import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import GoalCard from "../components/workboard/GoalCard";
import Footer from "../components/global/Footer";
import Countdown from "../components/global/Countdown";
import { IItem } from "../types";
import { validateItem } from "../utils/Validate";
import { getSeason } from "../utils/getSeason";
import { endOfSeason } from "../utils/FindEnd";

const Goals = () => {
  const initialState: IItem = {
    user: "", text: "", count: 1,
    completeness: 1, isDone: false,
    createdAt: new Date().toISOString(),
  };

  const { auth, goals } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const season = getSeason(new Date());

  const activeGoals = goals.filter((g) => !g.isDone).slice(0, 3);
  const backlogGoals = goals.filter((g) => g.isDone || goals.indexOf(g) >= 3);
  const hasSlot = activeGoals.length < 3;

  useEffect(() => {
    if (addOpen) inputRef.current?.focus();
  }, [addOpen]);

  const handleOpen = () => setAddOpen(true);

  const handleClose = () => {
    setAddOpen(false);
    setInputText("");
  };

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.access_token) return;
    const goalData: IItem = { ...initialState, text: inputText };
    const check = validateItem(goalData, "Please type your goal");
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    dispatch(createGoal(goalData));
    setInputText("");
    setAddOpen(false);
  };

  return (
    <UserLayout navbarType={1}>
      <div className="profile">
        <UserInfo />
        <div className="profile-content goals-page">

          {/* ── Header ── */}
          <header className="goals-page-header">
            <div className="goals-page-title">
              <p className="goals-page-eyebrow">Season goals</p>
              <h2 className="goals-page-season">{season}</h2>
            </div>
            <div className="goals-page-timer">
              <p className="goals-page-timer-label">Season ends in</p>
              <Countdown date={endOfSeason()} showDays={true} showLabels={true} />
            </div>
          </header>

          {/* ── Goals list ── */}
          <main className="goals-list-area">
            {activeGoals.length === 0 && !addOpen ? (
              <div className="goals-empty">
                <p className="goals-empty-text">
                  What do you want to<br />
                  accomplish this {season.toLowerCase()}?
                </p>
                <p className="goals-empty-sub">Up to 3 goals. Make them count.</p>
                <button className="goals-inline-trigger" onClick={handleOpen}>
                  <span className="goals-inline-trigger-icon">
                    <i className="fa-solid fa-plus" />
                  </span>
                  <span className="goals-inline-trigger-label">
                    Add goal
                    <span className="goals-inline-trigger-hint">3 slots left</span>
                  </span>
                </button>
              </div>
            ) : (
              <div className="goals-list">
                {activeGoals.map((item, index) => (
                  <GoalCard key={item._id} item={item} index={index} />
                ))}

                {/* ── Inline add form ── */}
                {hasSlot && (
                  <div className={`goals-inline-add${addOpen ? " goals-inline-add--open" : ""}`}>
                    {addOpen ? (
                      <form className="goals-inline-form" onSubmit={addGoal}>
                        <span className="goals-inline-num">
                          {String(activeGoals.length + 1).padStart(2, "0")}
                        </span>
                        <input
                          ref={inputRef}
                          className="goals-inline-input"
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="What do you want to achieve?"
                          autoComplete="off"
                          maxLength={200}
                          onKeyDown={(e) => e.key === "Escape" && handleClose()}
                        />
                        <div className="goals-inline-actions">
                          <button
                            type="submit"
                            className="goals-inline-submit"
                            disabled={!inputText.trim()}>
                            Add
                          </button>
                          <button
                            type="button"
                            className="goals-inline-cancel"
                            onClick={handleClose}>
                            <i className="fa-solid fa-xmark" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button className="goals-inline-trigger" onClick={handleOpen}>
                        <span className="goals-inline-trigger-icon">
                          <i className="fa-solid fa-plus" />
                        </span>
                        <span className="goals-inline-trigger-label">
                          Add goal
                          <span className="goals-inline-trigger-hint">
                            {3 - activeGoals.length} slot{3 - activeGoals.length !== 1 ? "s" : ""} left
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                )}

                {/* Empty slots (when not adding) */}
                {!addOpen && Array.from({ length: Math.max(0, 2 - activeGoals.length) }).map((_, i) => (
                  <div key={`slot-${i}`} className="goals-slot-empty">
                    <span>{activeGoals.length + i + 2}</span>
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* ── Backlog ── */}
          {backlogGoals.length > 0 && (
            <section className="goals-backlog">
              <button className="goals-backlog-toggle" onClick={() => setShowBacklog(v => !v)}>
                <span>Backlog</span>
                <span className="goals-backlog-count">{backlogGoals.length}</span>
                <i className={`fa-solid fa-chevron-${showBacklog ? "up" : "down"}`} />
              </button>
              {showBacklog && (
                <div className="goals-backlog-list">
                  <p className="goals-backlog-hint">
                    Complete an active goal to promote one from the backlog.
                  </p>
                  {backlogGoals.map((item, index) => (
                    <div key={item._id} className="goals-backlog-item">
                      <span className="goals-backlog-num">{String(index + 1).padStart(2, "0")}</span>
                      <p className="goals-backlog-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          <Footer />
        </div>
      </div>
    </UserLayout>
  );
};

export default Goals;
