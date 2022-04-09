import Upload from '../components/Upload';
import Infos from '../components/Infos';
import Content from '../components/Content';
import CatContent from '../components/CatContent';
import Context from "../context/Context";
import { useContext } from "react";
import '../styles/profile.css';

function Profile() {

  const { categories, videos } = useContext(Context);
  
  return (
    <div className='profile-container'>
        <div className="profile-title">Profile infos</div>
        <Infos/>

        <div className="profile-title">Upload new content</div>
        <Upload />

        {videos.length > 0 && (
          <>
            <div className="profile-title">Manage existing content</div>
              <Content />
          </>
        )}

        {categories.length > 0 && (
          <>
            <div className="profile-title">Manage categories</div>
              <CatContent />
          </>
        )}
    </div>
  )
}

export default Profile