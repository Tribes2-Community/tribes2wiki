---
title: 'Editing'
description: 'On this page you''ll find some useful reading material. If you''re new to Wiki editing, you''ll find all of it useful. If you are a pro at Wiki editing, you sho...'
categories: []
source:
  url: 'http://www.tribes2wiki.com/wiki/Help:Editing'
  archived: 'https://web.archive.org/web/20110828204447id_/http://www.tribes2wiki.com:80/wiki/Help:Editing'
  lastModified: '2010-01-06T23:29:00.000Z'
---
On this page you'll find some useful reading material. If you're new to Wiki editing, you'll find all of it useful. If you are a pro at Wiki editing, you should still view the [guidelines section](#Guidelines), as we might have very different rules than what you're used to.

## Editing

For those of you not familiar with editing Wikis, here are some really common things.

### Creating a page

-   To create a new page, either click on a red link to that page, or type the exact page name you want to create into the search bar and click "Go".
-   When it comes to capitalization, the general rule is **if there is any doubt, then leave it lowercase**.
-   Be thorough with the wording. Avoid abbreviations in article titles at all costs. Notice how the browser's page is tribe and warrior browser. Also notice that [browser](/reference/browser "Browser") redirects to tribe and warrior browser automatically.
-   To create a "redirect" as above, which is useful to have all alternate names of a subject point to one page, use the code `#REDIRECT [[pagename]]`. You'll create a page with the alternate name, and the only thing in the code of the page will be that bit of code. _Example_: [browser](/reference/browser "Browser") contains only the line `#REDIRECT [[tribe and warrior browser]]`.

### Links

-   To link to a page, enter `[[pagename]]`. Capitalization _does_ count beyond the first letter. The first letter of any article name is automatically capitalized, so you don't have to worry about it. _Example_: `[[spinfusor]]` → [spinfusor](/weapons/spinfusor "Spinfusor")
-   You can have letters appear immediately after the bracket with no space, and it will tag them onto the link word, but won't affect the link URL. This should be used any time you are referring to things in plural, when the article describing them is singular. _Example_: `[[mod]]s` → [mods](/scripting/mod "Mod")
-   To have a link appear with different text than the name of the page, use `[[pagename|text]]`. _Example_: `[[sensor jammer pack|SJ]]` → SJ
-   To link to an external site, enclose the link in single brackets: `[http://www.themellin.com]` would show [\[1\]](http://www.themellin.com). If you want, you can also change the text displayed by putting it inside the brackets after the URL: `[http://www.themellin.com Parent Site]` will display [Parent Site](http://www.themellin.com).
-   Generally, if you ever need to link to an outside website in the middle of an article, it should be done using references (these will be explained shortly). For links to a website as a whole, you should clump them all together at the bottom of the page under a `==External links==` header, rather than have them scattered throughout the text of the page.

### Formatting and organization

-   For bold and italic text, enclose the text in single quotes as such: `'''bold text here'''` and `''italic text here''`. This will produce **bold text here** and _italic text here_ respectively.
-   Headers (text in big letters that divide the page into sections) are denoted by surrounding the header in = signs. Start with `==Header==` for the largest header, then move on to `===Sub-header===` for sub-headers of that header, and so on. A table of contents will automatically be created on the page if there are four or more headers on it, unless you have `__NOTOC__` somewhere in the code of the page. _Example_: `===Formatting and organization===` yields the title of this section.

### References

-   To make references, use the `<ref></ref>` tags. Anything you put inside those tags - which can be any normal wiki text - will be stored to be displayed later, and a small reference number will appear in its place. _Example_: `TribalWar says this.<ref>TribalWar. [http://www.tribalwar.com We say that.]</ref>` → TribalWar says this.[\[1\]](#cite_note-0)
-   If any references are used on the page, then you should have a `==References==` header somewhere on the page toward the end that contains only the `<references/>` tag. That tag will output all of the references used on the page denoted by `<ref></ref>` tags. _Example_:
    1.  [↑](#cite_ref-0) TribalWar. [We say that.](http://www.tribalwar.com)

### Templates

-   If you see text enclosed inside `{{ }}` in the source of a page, that is what's called a template or inclusion. `{{Tribes2Wiki:News}}` means that the content of [Tribes2Wiki:News](/project/news "Tribes2Wiki:News") is being copied, or included, at that point in the current page.
-   When creating a page that will be included onto other pages, you can use the `<noinclude></noinclude>` and `<includeonly></includeonly>` tags to give yourself more control over what goes on.
    -   `<noinclude>This text will not appear if this page is included onto another page.</noinclude>`
    -   `<includeonly>This text will only appear when this page is included onto another page. It will not appear if someone visits this page explicitly.</includeonly>`

### Other tips

-   You can always view the source text of a page by clicking the "edit" (or sometimes "view source") link up top if you want to see how someone else did something.
-   If you need any more info, go to the [MediaWiki help page](http://www.mediawiki.org/wiki/Help:Contents). Many HTML features have a Wiki code equivalent that you should use instead of actual HTML.
-   Remember to always _preview_ your changes before saving them. It's very easy to make tiny mistakes, and if you save before fixing them, you'll just end up cluttering the recent changes page.

## Guidelines

### Content

#### If it exists, we want to know about it

We encourage users to create pages and discuss things regarding absolutely any aspect of Tribes 2 in the entire history of the game. No matter how insignificant it seems, we still would love to have a page for it - or at least part of a page. If this means creating a page for yourself where you talk about your history and achievements as a Tribes 2 player, then have at it. If it means creating a page about a map that no one played more than 10 times, then have at that as well. If there is a problem where one name can refer to two different things, and one of them is significantly more common/important than the other, then use parenthesis to distinguish them. The less important thing should be marked with the parenthesis. _Example_: chaingun (player) as opposed to [chaingun](/weapons/chaingun "Chaingun").

#### Stick to the facts - or close to them, at least

If you do make a page about yourself - or anything for that matter - just don't lie about things. If you try to say you're a member of Team 5150, or that you are the best player in the game with the [shocklance](/weapons/shocklance "Shocklance"), we will get on your case about that. On a side note, please don't create pages of players just to defame them. Negative _facts_ are allowed, but things like "this guy is an incredibly terrible and clueless newbie who has no idea how to play the game, let alone run a server that doesn't suck" are not a very good idea. Then again, I can think of some people where that statement is actually true. Even so, please avoid that kind of blatant libel (subtle libel may be acceptable).

#### Not everything needs its own page

Back to the point, also try to determine whether the subject you are discussing would do better as its own page, or inside another page. If your subject is only relevant to one specific thing in Tribes 2, you should probably just add it to the page for that one specific thing rather than create a new page. You can always create the page as a redirect page to the other article. _Example_: chainwhore points to a paragraph inside the [chaingun](/weapons/chaingun "Chaingun") page.

### Bias and opinions

This wiki is two things:

1.  An in-depth guide to all information about everything in Tribes 2 (or at least, that's our goal).
2.  A commentary on various aspects of the game as they are viewed by highly experienced players.

The first is expected, but the second is something that is uncommon for most wikis. This wiki is operated and reviewed by several of the most experienced players in the history of the game, and through our experience, we have come to view things a certain way. We know what it takes to develop your skills, we know what makes a player good, we have been around the block a few times and tried just about everything there is to try in this game. As a result, the "commentary" referred to above will be designed to guide readers in the direction of learning to become good players. When we discuss things that we know to be detrimental to someone's playing ability, we will do so with a negative bias. When we come across a subject that is disputed between good/experienced players and bad/inexperienced players, we will criticize the viewpoint of the inexperienced players in a way that presents as much of both sides as possible, while explaining why our side is the more significant one. We will do this solely to aid readers, in the hopes that they will one day become one of Tribes 2's finest. It has everything to do with presenting information in the most helpful way possible. Think of it this way - if you want to know something about being a doctor, would you rather hear it from a medical school student, or a real doctor? This wiki is the equivalent of the real doctor's opinion.
