import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../redux/store";
import { updateGoal, deleteGoal } from "../../redux/actions/goalAction";
import { IItem } from "../../types";

interface IProps {
  item: IItem;
  index: number;
}

const DONE_THRESHOLD = 0.9;

const GoalCard: React.FC<IProps> = ({ item, index }) => {
  const [editing, setEditing]             = useState(false);
  const [text, setText]                   = useState(item.text);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { auth } = useAppSelector((state: RootState) => state);
  const dispatch  = useAppDispatch();

  const count        = item.count  ?? 1;
  const completeness = item.completeness ?? 1;
  const pct          = Math.round((completeness / count) * 100);
  const doneCount    = Math.round(completeness);
  const isDone       = !!item.isDone;
  const nearDone     = !isDone && pct >= DONE_THRESHOLD * 100;
  const numLabel     = String(index + 1).padStart(2, "0");

  const handleUpdate = () => {
    if (!text.trim() || text === item.text) return setEditing(false);
    dispatch(updateGoal({ ...item, text }));
    setEditing(false);
  };

  const handleMarkDone = () => dispatch(updateGoal({ ...item, isDone: true }));
  const handleReopen   = () => dispatch(updateGoal({ ...item, isDone: false }));

  const handleDelete = () => {
    if (!auth.access_token) return;
    dispatch(deleteGoal(item._id!));
  };

  return (
    <div
      className={`goal-card${isDone ? " goal-card--done" : ""}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <span className="goal-card-ghost">{numLabel}</span>

      {/* ── Main ── */}
      <div className="goal-card-main">
        <div className="goal-card-top">
          {editing ? (
            <input
              className="goal-card-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")  handleUpdate();
                if (e.key === "Escape") { setText(item.text); setEditing(false); }
              }}
              onBlur={handleUpdate}
              autoFocus
              maxLength={200}
            />
          ) : (
            <p className="goal-card-text">{item.text}</p>
          )}

          <span className={`goal-card-badge${isDone ? " goal-card-badge--done" : " goal-card-badge--active"}`}>
            {isDone ? "Done" : "Active"}
          </span>
        </div>

        {!isDone && (
          <div className="goal-card-bottom">
            <div className="goal-card-bar-wrap">
              <div className="goal-card-track">
                <div className="goal-card-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="goal-card-pct">{pct}%</span>
            </div>
            {count > 1 && (
              <div className="goal-card-meta">
                <span>{count} step{count !== 1 ? "s" : ""}</span>
                {doneCount > 0 && (
                  <>
                    <span className="goal-card-meta-dot" />
                    <span>{doneCount} done</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Actions column ── */}
      <div className="goal-card-actions">
        {isDone ? (
          <button className="goal-card-act goal-card-act--reopen" onClick={handleReopen}>
            Reopen
          </button>
        ) : (
          <>
            <Link to={`/plan/${item._id}`} className="goal-card-act goal-card-act--plan">
              Plan
            </Link>
            {nearDone && (
              <button className="goal-card-act goal-card-act--done" onClick={handleMarkDone}>
                Done
              </button>
            )}
            {!editing && (
              <button className="goal-card-act" onClick={() => setEditing(true)}>
                Edit
              </button>
            )}
            {confirmDelete ? (
              <>
                <button className="goal-card-act goal-card-act--danger" onClick={handleDelete}>
                  Confirm
                </button>
                <button className="goal-card-act" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="goal-card-act goal-card-act--delete"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GoalCard;