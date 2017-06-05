# Feynman Web [FeynWeb] (Retain What You Learn)
### Algorithm for Learning Faster and More Comprehensively

Typically when we learn a new language, new concept, new skill, or even a new word, we tend to lose that knowledge to some degree if we don't keep up on it.  Cramming all night for an exam may get you a good grade, but without using that knowledge regularly after that exam, it's clear to your brain that it just isn't important anymore.  That's because our brains are amazingly efficient, and only keep what is "necessary."  If we don't use it, we lose it.

This usually isn't a problem if we use what we learn on a regular basis.  Neural pathways stay strong, and only get stronger with time and contant use.  In the case of software developers, the knowledge and skillset needed to stay on the cutting edge keeps growing, shifting and evolving every day.  The next logical step is to figure out a simple, efficient way to use every piece of important knowledge you learn on a regular basis, to avoid losing what you learn.

Feyman Network is my first attempt at this algorithm.


## User Stories
- users can log in with Facebook, Twitter, Github, or Google
- users can link their social media accounts together with a single account
- site acts as both a blog (for info about upcoming FeynWeb features, changes, best practices, etc.) and the network for FeynWeb itself
- upon login, user is brought to their profile page, with:
1. current nodes they've mastered (default 0)
2. their username for how they logged in on the top navbar [Hello, \<username>]
3. a dynamically-generated web of nodes (most are gray, but green ones at the bottom for any nodes they can start on)

- when user clicks on an available node:
    - that node's page is generated;
    - user is asked to fill out the three areas necessary for any Feynman Node:
        - what is it/what is it for?
        - how does it fit into the greater scope/codebase?
        - give at least 3 examples
    - answers must be kept short to show a firm grasp on the concept
    - once they fill out the node, their node is shown side-by-side with the community's top-voted answer for that node (as well as the user's last entry for that node if this isn't their first time filling it out)
    - they have the option of repeating the node until they are satisfied, then they submit the node; the node is logged and timestamped, and they fill it out next week; then after next week, they fill it out once a month after that
    - FeynWeb keeps track of what nodes you've answered and when, so whenever the user logs into their account, an inbox will contain all of the nodes they need to "sharpen"

- until I have a firm grasp on data visualization, the site will be very basic; no charts, just bland forms and pages until then; just get the proof-of-concept up and running

#### Programming and developing as a whole seems to be very bloated in terms of concepts; making things hard to understand, even accidentally, creates a frustrating barrier to entry that keeps a lot of people out.  Most people I try to talk to about computer science, even in a rudimentary sense, are very adament that "they aren't smart enough for that sort of thing."  Hearing this is heartbraking; Programming is one of my favorite passtimes, certainly one of the most useful, and I'm not able to share it with people close to me because they see it as "only for smart people."

### License

MIT License.
