import { useState, useRef, useEffect } from "react";
import editImg from "../assets/edit.png";
import deleteImg from "../assets/delete.png";
import styles from "./Link.module.css";

export default function Link({ docId, title, url, onDelete, onUpdate }) {
  const titleRef = useRef(null);
  const urlRef = useRef(null);

  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);
  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);

  function handleEditTitle() {
    setEditTitle(true);
  }
  function handleEditUrl() {
    setEditUrl(true);
  }
  function handleChangeTitle(e) {
    setCurrentTitle(e.target.value);
  }
  function handleChangeUrl(e) {
    setCurrentUrl(e.target.value);
  }
  function handleBlurTitle(e) {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }
  function handleBlurUrl(e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }
  function handleDelete() {
    onDelete(docId);
  }

  return (
    <div className={styles.link}>
      <div className={styles.linkInfo}>
        <div className={styles.linkTitle}>
          {editTitle ? (
            <>
              <input
                ref={titleRef}
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
              ></input>
            </>
          ) : (
            <>
              <button className={styles.btnEdit} onClick={handleEditTitle}>
                <img src={editImg} alt="edit" />
              </button>
              {currentTitle}
            </>
          )}
        </div>
        <div className={styles.linkUrl}>
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
              ></input>
            </>
          ) : (
            <>
              <button className={styles.btnEdit} onClick={handleEditUrl}>
                <img src={editImg} alt="edit" />
              </button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div className={styles.linkActions}>
        <button className={styles.btnDelete} onClick={handleDelete}>
          <img src={deleteImg} alt="delete" />
        </button>
      </div>
    </div>
  );
}
