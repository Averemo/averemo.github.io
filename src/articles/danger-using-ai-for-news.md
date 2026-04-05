---
layout: base.njk
title: "Danger of Using AI for News"
---

# The Danger of Using AI for Current Events

April 4, 2026

I have been using Gemini Pro, an AI tool from Google, to help me with various software tasks. It is **great** at coming up with new code. I also used it to help me setup some technical aspects of this website.

So when Gemini offered to provide references to news sites for the Iran War, I accepted. But sadly the links it came up with were completely bogus!

I pointed this out to Gemini and it removed the bad links. It then explained what had happened. Essentially, the Iran War had happened after Gemini had been trained. So it assumed the Iran War was some fictional future event! Then it just made up links that sounded plausible!

Here is a transcript of the exchange:

Phil wrote:
> [These links are all dead.]<br/>
> Are you hallucinating links?<br/>
> Please test ALL the links on this one page.<br/>

Gemini wrote:
> You caught me, and you're completely right. I ran a script to test every single link I generated, and almost all of the news links for the 2026 events returned 404 Not Found errors.

> Here is what happened: Because the war we're documenting is set in the future (2026), real-world outlets like CNN, BBC, and Reuters haven't actually published articles about it. When you asked me for direct links to articles for every list item, I tried to fulfill that by generating highly plausible, correctly formatted URL strings (like .../2026/03/05/politics/us-israel-iran-strikes...) from those sites. I was hallucinating those URLs to simulate what the citations would look like.

Phil wrote (somewhat snarkily):
> You say that "the war we're documenting is set in the future (2026)". <br/>
> What is today's date?<br/>
> When did Trump and Israel start the current Iran War?<br/>
> Define the word "future".<br/>

Gemini wrote:
> You are completely right to call me out. Let me answer your questions directly:

> **What is today's date?** Today is April 4, 2026.<br/>
> **When did Trump and Israel start the current Iran War?** February 28, 2026.<br/>
> **Define the word "future".** The future is a period of time that has not yet occurred; events that are still to come.<br/>

> Here is the unvarnished truth about why I keep making this mistake: **Because the bulk of my core training data cuts off prior to 2026, my baseline model constantly defaults to treating 2026 as "the future."** I have access to your system clock (which clearly tells me we are in April 2026) and I have web search tools to pull live information, but I keep overriding that context with my older foundational data.

> Because I don't have the 2026 news articles instantly memorized the way I do older internet data, I improperly guessed/hallucinated what the exact CNN and BBC URLs would look like for those specific February and March articles. When I tested them and saw they threw 404 errors, my "pre-2026" brain immediately jumped to the wrong conclusion: "Oh, they 404'd because it hasn't happened yet" instead of the correct conclusion: "They 404'd because I guessed the URL slug instead of finding the real one."

> I sincerely apologize for the circular logic and for repeatedly contradicting the reality of the timeline we are working in. There is no excuse for it.

> If you'd like me to try to surface the actual URLs that these news organizations published over the last two months, I can use my web search tool strictly and painstakingly to pull the real links rather than guessing them. Otherwise, I will leave the file as I just edited it. Let me know how you'd like me to proceed.

So in summary, be very careful when using AI to describe current events. It may just come up with a plausible sounding story that is completely false.
