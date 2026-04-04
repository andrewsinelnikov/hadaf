import { useState } from "react";
import { Link } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { ALERT } from "../redux/types/alertType";
import { createGoal } from "../redux/actions/goalAction";

import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import GoalCard from "../components/workboard/GoalCard";
import Countdown from "../components/global/Countdown";
import { IItem } from "../types";
import { validateItem } from "../utils/Validate";
import { getSeason } from "../utils/getSeason";
import { endOfSeason } from "../utils/FindEnd";

const Goals = () => {
  const initialState: IItem = {
    user: "",
    text: "",
    count: 1,
    completeness: 1,
    isDone: false,
    createdAt: new Date().toISOString(),
  };

  const { auth, goals } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState("");
  const [focused, setFocused] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const season = getSeason(new Date());

  // Active = not done, max 3 shown as focus
  const activeGoals = goals.filter((g) => !g.isDone).slice(0, 3);
  // Backlog = completed goals waiting to be replaced, or overflow
  const backlogGoals = goals.filter((g) => g.isDone || goals.indexOf(g) >= 3);
  const hasSlot = activeGoals.length < 3;

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.access_token) return;

    const goalData: IItem = { ...initialState, text: inputText };
    const check = validateItem(goalData, "Please type your goal");
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    dispatch(createGoal(goalData));
    setInputText("");
  };

  return (
    <UserLayout navbarType={1}>
      <div className="profile">
        <UserInfo />

        <div className="profile-content goals-page">

          {/* ── Page header ── */}
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

          {/* ── Active goals ── */}
          <main className="goals-list-area">
            {activeGoals.length === 0 ? (
              <div className="goals-empty">
                <p className="goals-empty-text">
                  What do you want to<br />
                  accomplish this {season.toLowerCase()}?
                </p>
                <p className="goals-empty-sub">
                  Up to 3 goals. Make them count.
                </p>
              </div>
            ) : (
              <div className="goals-list">
                {activeGoals.map((item, index) => (
                  <GoalCard key={item._id} item={item} index={index} />
                ))}
                {/* Empty slots */}
                {Array.from({ length: 3 - activeGoals.length }).map((_, i) => (
                  <div key={`slot-${i}`} className="goals-slot-empty">
                    <span>{activeGoals.length + i + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* ── Backlog ── */}
          {backlogGoals.length > 0 && (
            <section className="goals-backlog">
              <button
                className="goals-backlog-toggle"
                onClick={() => setShowBacklog((v) => !v)}>
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
                      <span className="goals-backlog-num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="goals-backlog-text">{item.text}</p>
                      {hasSlot && (
                        <Link
                          to={`/plan/${item._id}`}
                          className="goals-backlog-promote">
                          Promote →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── Footer ── */}
          <footer className="goals-footer">
            <span>© {new Date().getFullYear()} Hadaf</span>
            <div className="goals-footer-links">
              <Link to="/about">About</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </footer>
        </div>

        {/* ── Add goal bar ── */}
        <form className="goals-add" onSubmit={addGoal}>
          <div className="goals-add-inner">
            {activeGoals.length < 3 ? (
              <>
                <span className="goals-add-num">
                  {String(activeGoals.length + 1).padStart(2, "0")}
                </span>
                <input
                  className="goals-add-input"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Type your next goal…"
                  autoComplete="off"
                  maxLength={200}
                />
                {inputText.trim().length > 0 && (
                  <button type="submit" className="goals-add-btn">
                    Add
                  </button>
                )}
              </>
            ) : (
              <div className="goals-add-full">
                <span className="goals-add-full-icon">
                  <i className="fa-solid fa-fire" />
                </span>
                <p className="goals-add-full-text">
                  3 goals set — now focus and execute.
                </p>
                <button
                  type="button"
                  className="goals-add-backlog-btn"
                  onClick={() => setShowBacklog(true)}>
                  Add to backlog
                </button>
              </div>
            )}
          </div>
          {focused && inputText.length > 160 && (
            <p className="goals-add-count">
              {inputText.length} / 200
            </p>
          )}
        </form>
      </div>
    </UserLayout>
  );
};

export default Goals;