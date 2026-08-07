"use client";

import { useQuery } from "@tanstack/react-query";
import Showcase from "../Showcase/Showcase";
import { useState } from "react";
import { useRef } from "react";
import { fetchShowcaseData } from "../../../utils/fetchShowcaseData";
import { cardLabels, showcaseLabels, tabsLabels } from "../../../data/labels";

type Movie = { id: number; url: string; title: string; date: string };

export default function ShowcaseQueryFetch() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["showcase-movies"],
    queryFn: fetchShowcaseData,
  });

  const [activeTab, setActiveTab] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  if (error) {
    return (
      <p>{error instanceof Error ? error.message : "Something went wrong"}</p>
    );
  }

  const tabMovies: Record<number, Movie[] | undefined> = {
    1: data?.streaming,
    2: data?.rent,
    3: data?.theater,
  };

  const movies = tabMovies[activeTab] ?? [];

  return (
    <Showcase
      movies={movies}
      isLoading={isLoading}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      ref={wrapperRef}
      heading={showcaseLabels.heading}
      emptyLabel={showcaseLabels.empty}
      loadingLabel={cardLabels.loading}
      optionsPromptLabel={cardLabels.optionsPrompt}
      loginLabel={cardLabels.login}
      notAMemberLabel={cardLabels.notAMember}
      signUpLabel={cardLabels.signUp}
      mobileListAriaLabel={tabsLabels.mobileListAriaLabel}
      tabs={showcaseLabels.tabs}
    />
  );
}
