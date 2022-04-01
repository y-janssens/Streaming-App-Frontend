import Upload from '../components/Upload';
//import Infos from '../components/Infos';
import Content from '../components/Content';
import CatContent from '../components/CatContent';
//import Delete from '../components/Delete';
import '../styles/profile.css';

function Profile() {
  return (
    <div className='profile-container'>
        {/* <div className="profile-title">Profile infos</div>
        <Infos /> */}

        <div className="profile-title">Upload new content</div>
        <Upload />

        <div className="profile-title">Manage existing content</div>
        <Content />

        <div className="profile-title">Manage categories</div>
        <CatContent />

        {/* <div className="profile-title">Delete profile</div>
        <Delete /> */}
    </div>
  )
}

export default Profile