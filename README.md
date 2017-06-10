# Feynweb [Feynman Web] Retain What You Learn.
### Algorithm for Learning Faster and More Comprehensively

There are a LOT of things to learn if you're a developer.  Sometimes when you go off and learn something new, you leave some things unused and they get "rusty," or worse, forgotten entirely.  That's where Feynweb comes in.

Feynweb uses a simple algorithm to keep the rust off what you learn.  For each node, each "thing," Feynweb asks you to briefly (and simply!) explain:
1. What it is
2. What it's used for, or how it fits into the larger picture
3. What are at least three practical examples of it in use.

Once you feel you can answer all three of those questions easily, you know the node!  Feynweb then keeps track of when you've proven that you know the node, and reports back when a certain amount of time has passed (if it's your first answer, it will report back the next day; then once a week after that; then once a month after that.)

### FAQ

##### What happens if I can't explain the concept in 300 characters or less?

Try dividing the concept into smaller pieces, and then explaining those "sub-concepts."  After you've explained the sub-concepts, you can then use them to explain the larger "parent concept." For example, **closures** have notoriously been a difficult concept for JavaScript newcomers to grasp.  I'm going to give a shameless plug from Kyle Simpson's [*You Don't Know JS*](https://github.com/getify/You-Dont-Know-JS) series for our definition; I've yet to come across an explanation that better meets our criteria of **simple and concise**:

> Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

To understand this simple definition, we need to understand **executing functions** and **lexical scope**.  To understand these two sub-concepts, we need to understand **functions** themselves, as well as **scope**. 

You're using concepts you already know as pieces to explain bigger, seemingly more complicated concepts. You're using abstraction, just like a program! Essentially we're saying "to understand [parent concept], you first need to understand these X [child concepts]."

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
