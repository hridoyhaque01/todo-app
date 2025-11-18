import ProfileForm from "@/components/auth/ProfileForm";

function Profile() {
  return (
    <div className="py-6 px-20">
      <div className="bg-white py-5 px-7 rounded-2xl">
        <h2 className="title">Account Information</h2>
        <ProfileForm />
      </div>
    </div>
  );
}

export default Profile;
