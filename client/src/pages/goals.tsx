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

const MAX_ACTIVE = 3;

const Goals = () => {
  const initialState: IItem = {
    user: "", text: "", count: 1,
    completeness: 1, isDone: false,
    createdAt: new Date().toISOString(),
  };

  const { auth, goals } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [inputText, setInputText]         = useState("");
  const [addOpen, setAddOpen]             = useState(false);
  const [storeOpen, setStoreOpen]         = useState(false);
  const [storeInput, setStoreInput]       = useState("");
  const [storeAddOpen, setStoreAddOpen]   = useState(false);
  const [storeGoals, setStoreGoals]       = useState<string[]>([]);

  const inputRef      = useRef<HTMLInputElement>(null);
  const storeInputRef = useRef<HTMLInputElement>(null);
  const season        = getSeason(new Date());

  const activeGoals = goals.filter((g) => !g.isDone).slice(0, MAX_ACTIVE);
  const doneGoals   = goals.filter((g) => g.isDone);
  const slotsLeft   = MAX_ACTIVE - activeGoals.length;
  const hasSlot     = slotsLeft > 0;

  useEffect(() => {
    if (addOpen) inputRef.current?.focus();
  }, [addOpen]);

  useEffect(() => {
    if (storeAddOpen) storeInputRef.current?.focus();
  }, [storeAddOpen]);

  const handleOpen  = () => setAddOpen(true);
  const handleClose = () => { setAddOpen(false); setInputText(""); };

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

  const addToStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeInput.trim()) return;
    setStoreGoals([...storeGoals, storeInput.trim()]);
    setStoreInput("");
    setStoreAddOpen(false);
  };

  const promoteFromStore = (text: string) => {
    if (!auth.access_token || !hasSlot) return;
    const goalData: IItem = { ...initialState, text };
    const check = validateItem(goalData, "Please type your goal");
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    dispatch(createGoal(goalData));
    setStoreGoals(storeGoals.filter((g) => g !== text));
  };

  const removeFromStore = (text: string) =>
    setStoreGoals(storeGoals.filter((g) => g !== text));

  const slotLabel = slotsLeft === 1
    ? "1 slot left this season"
    : `${slotsLeft} slots left this season`;

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

          {/* ── Store toggle ── */}
          <div className="goals-store-toggle">
            <button
              className={`goals-store-btn${storeOpen ? " goals-store-btn--open" : ""}`}
              onClick={() => setStoreOpen((v) => !v)}
            >
              Goal store
              {storeGoals.length > 0 && (
                <span className="goals-store-count">{storeGoals.length}</span>
              )}
            </button>
          </div>

          {/* ── Store panel ── */}
          {storeOpen && (
            <div className="goals-store-panel">
              <div className="goals-store-header">
                <span className="goals-store-title">
                  Promote a goal when a slot opens
                </span>
                <button
                  className="goals-store-close"
                  onClick={() => setStoreOpen(false)}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M2 2l8 8M10 2l-8 8"/>
                  </svg>
                </button>
              </div>

              {storeGoals.length === 0 && !storeAddOpen && (
                <p className="goals-store-empty">
                  Save ideas here — promote them to active when a slot opens.
                </p>
              )}

              {storeGoals.map((text) => (
                <div key={text} className="goals-store-item">
                  <span className="goals-store-item-text">{text}</span>
                  <div className="goals-store-item-actions">
                    {hasSlot && (
                      <button
                        className="goals-store-promote"
                        onClick={() => promoteFromStore(text)}
                      >
                        Promote
                      </button>
                    )}
                    <button
                      className="goals-store-remove"
                      onClick={() => removeFromStore(text)}
                      title="Remove"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M1.5 1.5l7 7M8.5 1.5l-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {storeAddOpen ? (
                <form className="goals-store-add-form" onSubmit={addToStore}>
                  <input
                    ref={storeInputRef}
                    className="goals-store-add-input"
                    value={storeInput}
                    onChange={(e) => setStoreInput(e.target.value)}
                    placeholder="Goal idea..."
                    maxLength={200}
                    onKeyDown={(e) => e.key === "Escape" && setStoreAddOpen(false)}
                  />
                  <button
                    type="submit"
                    className="goals-store-add-submit"
                    disabled={!storeInput.trim()}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="goals-store-add-cancel"
                    onClick={() => { setStoreAddOpen(false); setStoreInput(""); }}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  className="goals-store-add-trigger"
                  onClick={() => setStoreAddOpen(true)}
                >
                  Add to store
                </button>
              )}
            </div>
          )}

          {/* ── Goals list ── */}
          <main className="goals-list-area">
            {activeGoals.length === 0 && !addOpen ? (
              <div className="goals-empty">
                <p className="goals-empty-text">
                  What do you want to<br />
                  accomplish this {season.toLowerCase()}?
                </p>
                <p className="goals-empty-sub">Up to 3 goals. Make them count.</p>
              </div>
            ) : (
              <div className="goals-list">
                {activeGoals.map((item, index) => (
                  <GoalCard key={item._id} item={item} index={index} />
                ))}

                {hasSlot && (
                  addOpen ? (
                    <form className="goals-inline-form" onSubmit={addGoal}>
                      <input
                        ref={inputRef}
                        className="goals-inline-input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="What do you want to achieve this season?"
                        autoComplete="off"
                        maxLength={200}
                        onKeyDown={(e) => e.key === "Escape" && handleClose()}
                      />
                      <div className="goals-inline-actions">
                        <button
                          type="submit"
                          className="goals-inline-act goals-inline-act--add"
                          disabled={!inputText.trim()}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="goals-inline-act"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button className="goals-inline-trigger" onClick={handleOpen}>
                      <span className="goals-inline-trigger-icon">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M4.5 1v7M1 4.5h7"/>
                        </svg>
                      </span>
                      <span className="goals-inline-trigger-label">
                        Add goal
                        <span className="goals-inline-trigger-hint">
                          · {slotLabel}
                        </span>
                      </span>
                    </button>
                  )
                )}
              </div>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </UserLayout>
  );
};

export default Goals;