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

const GoalCard: React.FC<IProps> = ({ item, index }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { auth } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const pct = item.completeness === 1
    ? 1
    : Math.round((item.completeness! * 100) / item.count!);

  const isDone = item.isDone;

  const handleUpdate = () => {
    if (!text.trim() || text === item.text) return setEditing(false);
    dispatch(updateGoal({ ...item, text }));
    setEditing(false);
  };

  const handleToggleDone = () => {
    dispatch(updateGoal({ ...item, isDone: !isDone }));
  };

  const handleDelete = () => {
    if (!auth.access_token) return;
    dispatch(deleteGoal(item._id!));
  };

  return (
    <div
      className={`goal-card${isDone ? " goal-card--done" : ""}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* ── Top row: identity + primary action ── */}
      <div className="goal-card-top">
        <div className="goal-card-identity">
          <button
            className="goal-card-check"
            type="button"
            onClick={handleToggleDone}
            aria-label={isDone ? "Mark as active" : "Mark as done"}
          >
            {isDone
              ? <i className="fa-solid fa-circle-check" />
              : <i className="fa-regular fa-circle" />
            }
          </button>
          <span className="goal-card-num">{String(index + 1).padStart(2, "0")}</span>
        </div>
        {!isDone && !editing && (
          <Link to={`/plan/${item._id}`} className="goal-card-plan-cta">
            Plan →
          </Link>
        )}
      </div>

      {/* ── Body: text or edit form ── */}
      <div className="goal-card-body">
        {editing ? (
          <div className="goal-card-edit">
            <input
              className="goal-card-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdate();
                if (e.key === "Escape") { setText(item.text); setEditing(false); }
              }}
              autoFocus
              maxLength={200}
            />
            <div className="goal-card-edit-actions">
              <button className="goal-card-btn goal-card-btn--primary" onClick={handleUpdate}>
                Save
              </button>
              <button className="goal-card-btn" onClick={() => { setText(item.text); setEditing(false); }}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="goal-card-text">{item.text}</p>
        )}
      </div>

      {/* ── Progress ── */}
      {!isDone && !editing && (
        <div className="goal-card-progress">
          <div className="goal-card-track">
            <div className="goal-card-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="goal-card-pct">{pct}%</span>
        </div>
      )}

      {/* ── Footer actions ── */}
      {!editing && (
        <div className="goal-card-actions">
          <button className="goal-card-btn" onClick={() => setEditing(true)}>
            Edit
          </button>
          <span className="goal-card-dot">·</span>
          {confirmDelete ? (
            <>
              <button className="goal-card-btn goal-card-btn--danger" onClick={handleDelete}>
                Confirm delete
              </button>
              <span className="goal-card-dot">·</span>
              <button className="goal-card-btn" onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="goal-card-btn goal-card-btn--delete" onClick={() => setConfirmDelete(true)}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalCard;
