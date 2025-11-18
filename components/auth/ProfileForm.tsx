"use client";
import { HomeIcon } from "@/constants";
import { useAuth } from "@/contexts";
import Input from "../shared/Input";

function ProfileForm() {
  const {
    profileState: state,
    isUpdating: isPending,
    updateErrors: actionErrors,
    handleImageChange,
    HandlerUpdateProfile: handleSubmit,
    profileDispatch: dispatch,
  } = useAuth();

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      {/* Profile Image */}
      <div className="w-full max-w-[365px] border border-black-700/60 rounded-2xl px-6 py-4 flex items-center gap-6 relative">
        <div
          className="size-24 rounded-full bg-black-600 shrink-0 relative"
          style={{
            background: state.profile_image
              ? `url(${state.profile_image}) center/cover no-repeat`
              : "",
          }}
        >
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
        <input
          type="file"
          name="profile_image"
          id="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
      </div>

      {/* Form Fields */}
      <div className="border border-black-700/60 py-6 px-12 rounded-2xl mt-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <Input
            label="First Name"
            name="first_name"
            value={state.first_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
            }
            errorMessage={actionErrors?.first_name?.[0]}
          />
          <Input
            label="Last Name"
            name="last_name"
            value={state.last_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
            }
            errorMessage={actionErrors?.last_name?.[0]}
          />
          <Input
            label="Email"
            type="email"
            wrapper="col-span-2"
            name="email"
            value={state.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            errorMessage={actionErrors?.email?.[0]}
          />
          <Input
            label="Address"
            name="address"
            value={state.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_ADDRESS", payload: e.target.value })
            }
            errorMessage={actionErrors?.address?.[0]}
          />
          <Input
            label="Contact Number"
            name="contact_number"
            value={state.contact_number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_CONTACT_NUMBER", payload: e.target.value })
            }
            errorMessage={actionErrors?.contact_number?.[0]}
          />
          <Input
            type="date"
            label="Birthday"
            wrapper="col-span-2"
            name="birthday"
            value={state.birthday || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_BIRTHDAY", payload: e.target.value })
            }
            errorMessage={actionErrors?.birthday?.[0]}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center max-w-[416px] mx-auto mt-12 gap-4">
          <button
            type="submit"
            className="btn btn_primary"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="btn btn_primary bg-blue-200!">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;
