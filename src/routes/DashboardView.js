import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuid } from "uuid";
import styles from "./DashboardView.module.css";
import stylesLink from "../components/Link.module.css";
import {
  getLinks,
  insertNewLink,
  updateLink,
  deleteLink,
} from "../firebase/firebase";
import Link from "../components/Link";

export default function DashboardView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(0);
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn(user) {
    navigate("/login");
  }
  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        <div>loading...</div>
      </AuthProvider>
    );
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    addLink();
  }
  function addLink(e) {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuid(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }
  function handleOnChange(e) {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }
    if (e.target.name === "url") {
      setUrl(value);
    }
  }
  async function handleDeleteLink(docId) {
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);
    setLinks([...tmp]);
  }
  async function handleUpdateLink(docId, title, url) {
    const link = links.find((link) => link.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  }
  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>
        <form
          className={styles.entryContainer}
          action=""
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="title">Title</label>
          <input
            className="input"
            type="text"
            name="title"
            onChange={handleOnChange}
          />

          <label htmlFor="url">Url</label>
          <input
            className="input"
            type="text"
            name="url"
            onChange={handleOnChange}
          />

          <input className="btn" type="submit" value="Create new link" />
        </form>
        <div className={stylesLink.linksContainer}>
          {links.map((e) => (
            <Link
              key={e.id}
              docId={e.docId}
              url={e.url}
              title={e.title}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            ></Link>
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
}
