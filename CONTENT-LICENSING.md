# Content licensing

There is **no single site-wide licence** for the content of this wiki. Material here comes
from several places on different terms, so each page carries its own.

Site code and import scripts are separate and are MIT licensed — see [LICENSE](LICENSE).

## The three kinds of content here

### 1. Recovered from the original tribes2wiki.com

Most articles. Written by the original wiki's community between 2008 and 2011 and
recovered from the Internet Archive.

The original wiki **declared no content licence** — its footer carried no copyright or
licence statement, which is what MediaWiki does when `$wgRightsText` is left unset. Those
authors keep their copyright in what they wrote. This project republishes their work as an
archival restoration, with attribution: every recovered page records the
capture it came from in its `source:` frontmatter and links back to it in the page footer,
and contributors are credited in [AUTHORS.md](AUTHORS.md) and in the git history.

If you wrote for the original wiki and don't want your work republished here,
[open an issue](https://github.com/Tribes2-Community/tribes2wiki/issues) and it will be
removed.

### 2. Material from other authors

Guides, forum posts and images written by people outside this project. **Those authors
keep their copyright.** Where such material appears here, the page credits it:

```yaml
attribution:
  - source: "TribesNEXT: A newbie's guide"
    author: WiiMote
    url: https://www.tribesnext.com/forum/discussion/340/a-newbie-039-s-guide
    extent: Adapted
```

That block renders as a credit in the page footer.

The safest approach by far is not to copy at all: read a source, then write what you know
in your own words. That is always fine, because facts about how a game plays aren't
anyone's property — only the particular words used to describe them are.

If an author asks for their material to be removed from this wiki,
[open an issue](https://github.com/Tribes2-Community/tribes2wiki/issues) and it will be.

### 3. Written fresh for this wiki

New articles by contributors to this project.

> **Open question:** this project has not yet settled what licence new contributions are
> offered under. Until it does, contributors retain their own copyright in what they write.
> If you care about how your writing may be reused, say so on your pull request.
>
> This should be decided before the wiki is widely promoted — without a default, reusers
> have no way to know what they may do with an article.

## Trademarks and game assets

*Tribes 2* is a trademark of its respective rights holders. This is an unofficial,
non-commercial community project, not affiliated with or endorsed by them. Screenshots and
game imagery illustrate articles about the game; see
[the image credits](src/assets/images/CREDITS.md).
