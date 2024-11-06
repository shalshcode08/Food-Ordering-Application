import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileFrom"

const UserProfilePage = () => {
  const {updateUser, isLoading : isUpdateLoading} = useUpdateMyUser();
  const {currentUser, isLoading : isGetLoading} = useGetMyUser();

  if(isGetLoading){
    return <span>Loading...</span>
  }
  return (
    <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} />
  )
}

export default UserProfilePage