## Beyond passwords

The truth is that today, even if you forced all your users to use complex passwords, it would simply not be enough.
Every day new techniques are being developed to compromise users' accounts,
and there's not really anything a secure password can do for a user,
if the password is phished or leaked from another service.

In this section, we'll be pointing out concrete measures you can take to increase your users' account security.

_keep in mind when reading through this, that you may implement multiple of the below techniques together, to achieve a massively increased level of user account security._

### Third-party providers

The outright easiest way to massively increase your users' account security, is to implement a third-party login provider.
Today providers like Google and Facebook provide a login flow that is both convenient to users and developers alike.
If you can, use this option as the primary recommended login method for all your users.

### Rate limiting

One of the simplest measures you can take to increase account security is rate limiting the amount of login attempts any single IP can make in a certain amount of time.
Most users wouldn't ever notice a rate limit of 5 attempts every 20 seconds, but will have a massive effect on [brute-force attacks](https://en.wikipedia.org/wiki/Brute-force_attack) if the password is not very common.

Pitfalls:

- An attacker might have a lot of IPs at their disposal. To mitigate this, you can have a tiered denylist for your rate limiting, like so:
  - 5 attempts every 20 secs
  - 20 attempts every hour
  - 50 attempts every day
- If an attacker knows the user's password or the user uses a very common password, this is going to do nothing to prevent the user's account getting compromised.

### 2-factor authentication (aka. 2FA)

This is great addition to increase your users' account security, making it incredibly impractical for attackers to hack your users.

You can implement this to integrate with authenticator apps, or by sending the user a message via email og SMS, or even better allow for any of these options to be picked by the user.

Pitfalls:

- Though this kind of authentication is gaining traction, it is still very confusing for the average non-tech user. Even being sent the 2FA code in a message to the user's inbox or phone, can be too complicated for some users to understand.
- This will still be vulnerable to attacks where the attacker creates a visual replica of your login site to compromise the user's account.
