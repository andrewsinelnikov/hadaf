import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useAppSelector } from "../utils/hooks";
import UserLayout from "../components/layouts/UserLayout";
import UserInfo from "../components/profile/UserInfo";
import TimeReminder from "../components/workboard/TimeReminder";
import JournalList from "../components/workboard/JournalList";
import Footer from "../components/global/Footer";
import AreaInput from "../components/workboard/AreaInput";
import { IJournalNote } from "../utils/TypeScript";

const Journal = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.access_token) navigate("/login");
  }, [auth.access_token, navigate]);

  const [note, setNote] = useState<string>("");
  const [notes, setNotes] = useState<Array<IJournalNote>>([]);

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();

    if (note) {
      setNotes([...notes, { _id: Date.now(), title: "Day", text: note }]);
      setNote("");
    }
  };

  return (
    <UserLayout navbarType={1}>
      <div className='profile'>
        <UserInfo />
        <div className='profile-content'>
          <div className='content'>
            <TimeReminder
              action='actions'
              message='Keep the memories in your book and Move on'
            />
            <JournalList notes={notes} setNotes={setNotes} />
          </div>
          <Footer />
        </div>
        <AreaInput note={note} setNote={setNote} handleAdd={addNote} />
      </div>
    </UserLayout>
  );
};

export default Journal;
