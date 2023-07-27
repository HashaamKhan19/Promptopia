"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { SphereSpinner } from "react-spinners-kit";

const PromptCardList = ({ data, handleTagClick, searchText }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (post) =>
          post?.prompt?.toLowerCase().includes(searchText.toLowerCase()) ||
          post?.tag?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  return (
    <div className="mt-16 prompt_layout">
      {filteredData.map((post) => (
        <PromptCard
          key={post?._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      {loading && (
        <div className="flex mt-12">
          <SphereSpinner size={50} color="#FF5722" />
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="flex mt-12">
          <p className="text-lg font-inter">
            No prompts available at the moment. Feel free to add one!
          </p>
        </div>
      )}

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
        searchText={searchText}
      />
    </section>
  );
};

export default Feed;
