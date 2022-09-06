import { useState, useRef, useEffect } from "react";

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
    <div key={docId}>
      <div>
        <div>
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
              <button onClick={handleEditTitle}>Edit</button>
              {currentTitle}
            </>
          )}
        </div>
        <div>
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
              <button onClick={handleEditUrl}>Edit</button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
