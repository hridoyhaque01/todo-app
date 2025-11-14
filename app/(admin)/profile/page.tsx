import Input from "@/components/shared/Input";
import { HomeIcon } from "@/constants";

function Profile() {
  return (
    <div className="py-6 px-20">
      <div className="bg-white py-5 px-7 rounded-2xl">
        <h2 className="title">Account Information</h2>
        <form action="" className="mt-8">
          <div className="w-full max-w-[365px] border border-black-700/60 rounded-2xl px-6 py-4 flex items-center gap-6 relative">
            <div className="size-24 rounded-full bg-black-600 shrink-0 relative">
              <label
                htmlFor="file"
                className="flex items-center justify-center size-8 bg-blue-500 rounded-full absolute bottom-0 right-0 cursor-pointer"
              >
                <HomeIcon className="size-4 text-white" />
              </label>
            </div>
            <label htmlFor="file" className="btn btn_primary gap-2">
              <HomeIcon className="size-4" />
              <span className="font-normal">Upload New Photo</span>
            </label>
            <input type="file" name="file" id="file" hidden />
          </div>
          <div className="border border-black-700/60 py-6 px-12 rounded-2xl mt-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Input label="First Name" />
              <Input label="Last Name" />
              <Input label="Email" wrapper="col-span-2" />
              <Input label="Address" />
              <Input label="Contact Number" />
              <Input type="date" label="Email" wrapper="col-span-2" />
            </div>
            <div className="flex items-center max-w-[416px] mx-auto mt-12 gap-4">
              <button type="button" className="btn btn_primary">
                Save Changes
              </button>
              <button type="button" className="btn btn_primary bg-blue-200!">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
