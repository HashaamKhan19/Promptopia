import { SphereSpinner } from "react-spinners-kit";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {loading && (
          <div className="mt-12 mx-auto flex-center">
            <SphereSpinner size={50} color="#FF5722" />
          </div>
        )}

        {!loading && data.length === 0 && (
          <div className="flex mt-12">
            <p className="text-lg font-inter">
              No prompts added by you yet. Feel free to add one!
            </p>
          </div>
        )}

        {data.map((post) => (
          <PromptCard
            key={post?._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
