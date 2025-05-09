const API_BASE = "https://graph.facebook.com/v18.0";
const accessToken = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const userId = import.meta.env.INSTAGRAM_USER_ID;
const targetHashtag = "ardoisedujour";

if (!accessToken || !userId) {
  console.error(
    "Missing one or more required environment variables: INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID.",
  );
}

export interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  timestamp: string;
  data_url?: string;
}

export interface InstagramAccountInfo {
  username: string | null;
  profile_picture_url: string | null;
  avatar_data_url: string | null;
}

export async function fetchPostsUsingPredefinedHashtagId(): Promise<
  InstagramPost[]
> {
  const fields = ["id", "caption", "media_url", "timestamp"].join(",");
  const url = `${API_BASE}/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=10`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error(
      `[fetchPostsUsingPredefinedHashtagId] Error: ${res.statusText}`,
    );
    return [];
  }

  const json = await res.json();
  const allPosts = json.data ?? [];

  const hashtagPosts = allPosts.filter((post: InstagramPost) => {
    if (!post.caption) return false;
    return post.caption.includes(`#${targetHashtag}`);
  });

  return hashtagPosts.length > 0 ? [hashtagPosts[0]] : [];
}

export async function fetchInstagramAccountInfo(): Promise<InstagramAccountInfo | null> {
  try {
    const fields = ["username", "profile_picture_url"].join(",");
    const url = `${API_BASE}/${userId}?fields=${fields}&access_token=${accessToken}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[fetchInstagramAccountInfo] Error: ${res.statusText}`);
      return null;
    }

    const accountInfo = await res.json();

    if (accountInfo.profile_picture_url) {
      try {
        const imageResponse = await fetch(accountInfo.profile_picture_url);
        if (imageResponse.ok) {
          const arrayBuffer = await imageResponse.arrayBuffer();
          const contentType =
            imageResponse.headers.get("content-type") || "image/jpeg";
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          accountInfo.avatar_data_url = `data:${contentType};base64,${base64}`;
        }
      } catch (error) {
        console.error("Failed to fetch avatar image:", error);
      }
    }

    return {
      username: accountInfo.username || null,
      profile_picture_url: accountInfo.profile_picture_url || null,
      avatar_data_url: accountInfo.avatar_data_url || null,
    };
  } catch (error) {
    console.error("Error fetching Instagram account info:", error);
    return null;
  }
}
