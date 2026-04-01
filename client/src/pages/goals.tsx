import { useState } from "react";

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
    user: "",
    text: "",
    count: 1,
    completeness: 1,
    isDone: false,
    createdAt: new Date().toISOString(),
  };

  const { auth, goals } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [goal, setGoal] = useState<IItem>(initialState);
  const [inputText, setInputText] = useState("");
  const [focused, setFocused] = useState(false);
  const season = getSeason(new Date());

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.access_token) return;

    const check = validateItem({ ...goal, text: inputText }, "Please type your goal");
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    dispatch(createGoal({ ...goal, text: inputText }));
    setInputText("");
    setGoal(initialState);
  };

  const canAdd = goals.length < 3;

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

          {/* ── Goals list ── */}
          <main className="goals-list-area">
            {goals.length === 0 ? (
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
                {goals.map((item, index) => (
                  <GoalCard key={item._id} item={item} index={index} />
                ))}
                {/* Slot indicators */}
                {Array.from({ length: 3 - goals.length }).map((_, i) => (
                  <div key={`slot-${i}`} className="goals-slot-empty">
                    <span>{goals.length + i + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </main>

          <Footer />
        </div>

        {/* ── Add goal bar ── */}
        {canAdd && (
          <form className="goals-add" onSubmit={addGoal}>
            <div className="goals-add-inner">
              <span className="goals-add-num">{goals.length + 1}</span>
              <input
                className="goals-add-input"
                type="text"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setGoal((g) => ({ ...g, text: e.target.value }));
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Type your goal…"
                autoComplete="off"
                maxLength={200}
              />
              {inputText.length > 0 && (
                <button type="submit" className="goals-add-btn">
                  Add goal
                </button>
              )}
            </div>
            {focused && inputText.length > 0 && (
              <p className="goals-add-count">
                {inputText.length} / 200
              </p>
            )}
          </form>
        )}
      </div>
    </UserLayout>
  );
};

export default Goals;