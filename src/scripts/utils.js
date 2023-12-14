export function formatBlogPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { pubDate } = post.frontmatter;
    // filterOutDrafts if true

    // filterOutFuturePosts if true
    if (new Date(pubDate) > new Date()) return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, []);

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate)
    );
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}



/* 
import { formatBlogPosts } from '../../js/utils'
const allPosts = await Astro.glob('./*.md')
const formattedPosts = formatBlogPosts(allPosts)


*/


/* 

// utils imports
import { formatBlogPosts } from "../js/utils";

const allPosts = await Astro.glob("./blog/*.md");
const formattedPosts = formatBlogPosts(allPosts, {
  limit: 3,
});

*/