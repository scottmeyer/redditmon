redditmon
=========

A Reddit title link monitor written in Node.js

After filling out the config variables, you'll receive a similar email to the following:

[snow]
        http://www.reddit.com/r/Dallas/comments/16m8en/i_love_snow_but_facebook_needs_to_calm_down/
        http://www.reddit.com/r/Dallas/comments/16m7rw/it_is_snowing_in_mesquite_theres_more_snow_now/
        http://www.reddit.com/r/Dallas/comments/16mdly/second_snow_in_one_year_in_north_texas_the_end/
        http://www.reddit.com/r/Dallas/comments/16mbfe/two_snow_storms_already/
[facebook]
        http://www.reddit.com/r/Dallas/comments/16m8en/i_love_snow_but_facebook_needs_to_calm_down/
        http://www.reddit.com/r/Dallas/comments/16j42z/dallas_facebook_group/


Configuration
----------

- **subreddit** the subreddit to monitor
- **wordsToMonitor** the words to monitor titles for
- **sendTo** the email address to send the results to
- **interval** the interval to poll the subreddit
- **debug** show debug messages
- **username** the gmail account used to send emails
- **password** the gmail account password

