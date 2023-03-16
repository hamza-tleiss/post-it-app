import React, { useEffect, useState } from "react";
import "./Card.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import Post from "./post/Post";
export default function Card({
  isMobile,
  show,
  free,
  setShowAddCard,
  setcurrentId,
  searchPosts,
  setsearchPosts,
  reducer,
  isSort,
}) {
  const [isPressedForCopy, setisPressedForCopy] = useState({ value: false });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSearch = queryParams.get("search");
  let sortedProducts = [];
  useEffect(() => {
    setsearchPosts(isSearch);
  }, [isSearch, setsearchPosts]);
  let Cards = [];
  const state = useSelector((state) =>
    reducer === "Favorite"
      ? state.favorite
      : reducer === "Trash"
      ? state.trash
      : state.post
  );
  Cards =
    searchPosts || isSearch
      ? state.filter(
          (post) =>
            post.title.toLowerCase().includes(searchPosts) ||
            post.Text?.split(",").some((text) =>
              text.toLowerCase().includes(searchPosts)
            )
        )
      : state;
  if (isSort === "desc")
    sortedProducts = Cards.sort((p1, p2) =>
      p1.date < p2.date ? 1 : p1.date > p2.date ? -1 : 0
    );
  else
    sortedProducts = Cards.sort((p1, p2) =>
      p1.date > p2.date ? 1 : p1.date < p2.date ? -1 : 0
    );
  return (
    <div
      id="card"
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingTop: "50px",
        height: window.innerHeight,
        width: window.innerWidth,
        position: "relative",
        // overflow: "hidden",
        padding: "0px",
        marginLeft: isMobile ? (show ? "70px" : "0px") : "200px",
        marginTop: "70px",
      }}
    >
      {sortedProducts?.map((card, index) => (
        <Post
          isPressedForCopy={isPressedForCopy}
          setisPressedForCopy={setisPressedForCopy}
          key={index}
          index={index}
          card={card}
          setShowAddCard={setShowAddCard}
          isMobile={isMobile}
          setcurrentId={setcurrentId}
          free={free}
        />
      ))}
    </div>
  );
}
