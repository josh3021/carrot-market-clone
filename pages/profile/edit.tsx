import type { NextPage } from "next";
import { Button } from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";

const EditProfile: NextPage = () => {
  return (
    <Layout title="내 정보 편집" isGoBack>
      <div className="px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-400" />
          <label
            htmlFor="picture"
            className="cursor-pointer border border-gray-300 rounded-md px-2 py-2 hover:bg-gray-50 active:bg-gray-100 shadow-sm"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input required label="Email address" name="email" type="email" />
        <Input
          required
          label="Phone number"
          name="phone"
          type="tel"
          kind="phone"
        />
        <Button text="Update profile" />
      </div>
    </Layout>
  );
};

export default EditProfile;
