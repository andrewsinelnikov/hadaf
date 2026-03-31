import { Link, useLocation } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useAppSelector } from "../../utils/hooks";
import NotFound from "../global/NotFound";

const UserInfo = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const { pathname } = useLocation();

  const actions = [
    { label: "Goals",   step: "01", path: "/goals" },
    { label: "Plans",   step: "02", path: "/plans" },
    { label: "Actions", step: "03", path: "/actions" },
  ];

  const tools = [
    { label: "Journal", path: "/journal", icon: "fa-file-pen" },
    { label: "Friends", path: "/friends", icon: "fa-users" },
    { label: "History", path: "/history", icon: "fa-book" },
  ];

  const isActiveAction = (pn: string) => pathname === pn ? "action-active" : "";
  const isActiveTool   = (pn: string) => pathname === pn ? "tool-active"   : "";

  if (!auth.user) return <NotFound />;

  return (
    <aside className="profile-info">

      {/* ── Avatar ── */}
      <div className="info-avatar">
        <div className="info-avatar-frame">
          <img src={auth.user.image} alt={auth.user.name} />
        </div>
      </div>

      {/* ── User data ── */}
      <div className="info-data">
        <div className="info-data-left">
          <p className="data-name">{auth.user.name}</p>
          <div className="data-links">
            {auth.user.usta && (
              <a href={auth.user.usta} target="_blank" rel="noreferrer">Usta</a>
            )}
            {auth.user.bbook && (
              <a href={auth.user.bbook} target="_blank" rel="noreferrer">BBook</a>
            )}
          </div>
        </div>
        <Link to={`/profile/${auth.user._id}/edit`} className="data-edit-btn">
          <i className="fa-solid fa-pen" />
        </Link>
      </div>

      {/* ── Main navigation ── */}
      <nav className="info-actions">
        {actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className={`info-action-link ${isActiveAction(action.path)}`}>
            <span className="action-step">{action.step}</span>
            <span className="action-label">{action.label}</span>
            <span className="action-arrow">
              <i className="fa-solid fa-arrow-right" />
            </span>
          </Link>
        ))}
      </nav>

      {/* ── Tools ── */}
      <div className="info-tools">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className={`info-tool-link ${isActiveTool(tool.path)}`}>
            <i className={`fa-solid ${tool.icon}`} />
            <span>{tool.label}</span>
          </Link>
        ))}
      </div>

    </aside>
  );
};

export default UserInfo;