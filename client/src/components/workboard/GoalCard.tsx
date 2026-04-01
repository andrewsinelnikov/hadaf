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

  const handleUpdate = () => {
    if (!text.trim() || text === item.text) return setEditing(false);
    dispatch(updateGoal({ ...item, text }));
    setEditing(false);
  };

  const handleDelete = () => {
    if (!auth.access_token) return;
    dispatch(deleteGoal(item._id!));
  };

  return (
    <div className="goal-card">

      {/* ── Number ── */}
      <span className="goal-card-num">{String(index + 1).padStart(2, "0")}</span>

      {/* ── Body ── */}
      <div className="goal-card-body">
        {editing ? (
          <div className="goal-card-edit">
            <input
              className="goal-card-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              autoFocus
              maxLength={200}
            />
            <div className="goal-card-edit-actions">
              <button className="goal-card-action-btn goal-card-confirm" onClick={handleUpdate}>
                Save
              </button>
              <button className="goal-card-action-btn" onClick={() => { setText(item.text); setEditing(false); }}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="goal-card-text">{item.text}</p>
        )}

        {/* ── Progress ── */}
        <div className="goal-card-progress">
          <div className="goal-card-track">
            <div className="goal-card-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="goal-card-pct">{pct}%</span>
        </div>
      </div>

      {/* ── Actions ── */}
      {!editing && (
        <div className="goal-card-actions">
          <Link to={`/plan/${item._id}`} className="goal-card-cta">
            Plan out →
          </Link>
          <button className="goal-card-action-btn" onClick={() => setEditing(true)}>
            Edit
          </button>
          {confirmDelete ? (
            <>
              <button className="goal-card-action-btn goal-card-danger" onClick={handleDelete}>
                Confirm
              </button>
              <button className="goal-card-action-btn" onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="goal-card-action-btn" onClick={() => setConfirmDelete(true)}>
              Delete
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default GoalCard;