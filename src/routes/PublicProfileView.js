import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./PublicProfileView.module.css";
import stylesLinks from "../components/PublicLink.module.css";

import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";
import PublicLink from "../components/PublicLink";

export default function PublicProfileView() {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    getProfile();
    async function getProfile() {
      const username = params.username;
      try {
        const userUid = await existsUsername(username);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
        } else {
          setState(7);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [params]);
  if (state === 7) {
    return (
      <div>
        <h1>Username doesn't exist</h1>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePicture}>
        <img src={url} alt="img-contact" />
      </div>
      <h2>{profile?.profileInfo.username}</h2>
      <h3>{profile?.profileInfo.displayName}</h3>
      <div className={stylesLinks.publicLinksContainer}>
        {profile?.linksInfo.map((link) => (
          <PublicLink
            key={link.docId}
            url={link.url}
            title={link.title}
          ></PublicLink>
        ))}
      </div>
    </div>
  );
}
